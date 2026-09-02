import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";

type SSEEvent =
  | { readonly type: "chunk"; text: string }
  | { readonly type: "reset"; ok: boolean }
  | { readonly type: "status"; message: string }
  | { readonly type: "attribution"; message: string }
  | { readonly type: "done"; ok: boolean }
  | { readonly type: "error"; message: string };

// Ordered by measured health, fastest-working first, because every model that
// fails costs its own latency plus a backoff before the next one is tried.
// Probed 2026-09-02 against a free-tier key:
//   gemini-2.5-flash          200, ~7s   <- pinned, healthy
//   gemini-flash-lite-latest  200, ~22s  <- works, slow
//   gemini-flash-latest       503        <- alias, transient high demand
//   gemini-2.5-flash-lite     404        <- "no longer available to new users"
//   gemini-2.5-pro            404        <- "no longer available to new users"
// The two 404s are kept as trailing fallbacks: they are an access restriction
// on newer keys, not a removed endpoint, so a self-hosted older key may still
// reach them. gemini-1.5-flash was dropped — it is not served on the v1beta
// path this SDK uses, so it can never succeed here.
const FREE_TIER_MODELS = [
  "gemini-2.5-flash",
  "gemini-flash-lite-latest",
  "gemini-flash-latest",
  "gemini-2.5-flash-lite",
  "gemini-2.5-pro",
] as const;

// The default serverless limit (10s) is not enough to survive one failed
// model plus a backoff plus a real generation. Hobby plans allow up to 60s.
export const maxDuration = 60;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

function humanizeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  const idx = msg.indexOf(":");
  return idx !== -1 ? msg.slice(idx + 1).trim() : msg;
}

/**
 * Abortable delay. Removes its own listener on every exit path — the previous
 * inline version attached one per retry and never detached them, so a request
 * that fell through the whole chain left listeners on the signal.
 */
function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error("aborted"));
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
      reject(new Error("aborted"));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal.addEventListener("abort", onAbort);
  });
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function describeAxis(
  name: string,
  v: number,
  low: string,
  mid: string,
  high: string
): string {
  const score = clamp(v, 1, 10);
  switch (true) {
    case score <= 3:
      return `${name} ${score}/10 — ${low}`;
    case score <= 7:
      return `${name} ${score}/10 — ${mid}`;
    default:
      return `${name} ${score}/10 — ${high}`;
  }
}

function buildSystemPrompt(formality: number, friendliness: number): string {
  const f = clamp(formality, 1, 10);
  const w = clamp(friendliness, 1, 10);

  const tone = describeAxis(
    "formality",
    f,
    "extremely casual, slangy, and relaxed",
    "balanced and neutral",
    "highly formal, precise, and professional"
  );
  const warmth = describeAxis(
    "friendliness",
    w,
    "direct, terse, and matter-of-fact",
    "balanced and polite",
    "warm, encouraging, and empathetic"
  );

  return [
    "You are a professional writing assistant that refines a user's rough, messy message into a polished version.",
    "You ONLY return the rewritten message. No explanations, no headings, no quotes around the output.",
    "",
    `Target tone: ${tone}.`,
    `Target warmth: ${warmth}.`,
    `Formality score (1-10): ${f}.`,
    `Friendliness score (1-10): ${w}.`,
    "",
    "Rules:",
    "- Preserve the user's original meaning, intent, and any key facts or names.",
    "- Fix grammar, spelling, and punctuation.",
    "- Do not add new information that was not implied by the original.",
    "- Keep the length roughly similar to the original unless clarity demands otherwise.",
  ].join("\n");
}

async function* runStreamWithFallback(
  promptText: string,
  formality: number,
  friendliness: number,
  signal: AbortSignal
): AsyncGenerator<SSEEvent> {
  const systemInstruction = buildSystemPrompt(formality, friendliness);

  for (let modelIdx = 0; modelIdx < FREE_TIER_MODELS.length; modelIdx++) {
    const model = FREE_TIER_MODELS[modelIdx];
    let session: ChatSession | null = null;
    // Hoisted so the catch block knows whether this model already sent text
    // to the client before it failed.
    let streamed = false;

    try {
      if (modelIdx > 0) {
        await sleep(Math.min(modelIdx * 700, 4000), signal);
        if (signal.aborted) return;
      }

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
      const generativeModel = genAI.getGenerativeModel({ model });
      const systemInstructionContent = { role: "user", parts: [{ text: systemInstruction }] };
      session = generativeModel.startChat({
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        systemInstruction: systemInstructionContent,
      });

      const { stream } = await session.sendMessageStream(promptText);

      try {
        for await (const chunk of stream) {
          if (signal.aborted) return;
          const text = chunk.text();
          if (!text) continue;
          streamed = true;
          yield { type: "chunk", text };
        }
      } finally {
        session = null;
      }

      if (streamed) {
        // Attribution is its own event, not a `status`: `done` clears the
        // transient progress message, and previously wiped this in the same
        // tick so the user never saw which model produced the result.
        yield { type: "attribution", message: `via ${model}` };
        yield { type: "done", ok: true };
        return;
      }

      yield {
        type: "error",
        message: `Model ${model} returned no content.`,
      };
      return;
    } catch (err) {
      if (signal.aborted) return;

      // This model already streamed text, so the client is holding a partial
      // sentence. Tell it to drop that before the next model appends to it.
      if (streamed) {
        yield { type: "reset", ok: true };
      }

      yield {
        type: "status",
        message: `Model ${model} failed — switching… (${humanizeError(err)})`,
      };

      if (modelIdx === FREE_TIER_MODELS.length - 1) {
        yield {
          type: "error",
          message: "All available AI models failed to process the request. Please try again.",
        };
        return;
      }

      continue;
    } finally {
      session = null;
    }
  }
}

export async function POST(request: Request) {
  let body: { text: string; formality: number; friendliness: number };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return new Response(JSON.stringify({ error: "invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (typeof body.text !== "string" || body.text.trim() === "") {
    return new Response(JSON.stringify({ error: "text must not be empty" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const formality = clamp(body.formality ?? 5, 1, 10);
  const friendliness = clamp(body.friendliness ?? 5, 1, 10);

  if (
    body.formality < 1 ||
    body.formality > 10 ||
    body.friendliness < 1 ||
    body.friendliness > 10
  ) {
    return new Response(
      JSON.stringify({ error: "scores must be between 1 and 10" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Own an abort controller: `request.signal` is an AbortSignal, so the old
  // `signal.abort()` cast threw a TypeError and the abort never propagated —
  // Gemini kept generating, and billing free-tier quota, after the user had
  // pressed Stop. Both the request signal and the stream's own cancel()
  // (which fires when the client disconnects) feed this controller.
  const abortStream = new AbortController();
  const onRequestAbort = () => abortStream.abort();
  if (request.signal.aborted) abortStream.abort();
  else request.signal.addEventListener("abort", onRequestAbort, { once: true });

  const streamGen = runStreamWithFallback(
    body.text,
    formality,
    friendliness,
    abortStream.signal
  );

  const encoder = new TextEncoder();

  const bodyStream = new ReadableStream({
    async pull(streamController) {
      try {
        const { value, done } = await streamGen.next();
        if (done) {
          streamController.close();
          return;
        }

        const ev = value;
        const payload = encoder.encode(
          `event: ${ev.type}\ndata: ${JSON.stringify(ev)}\n\n`
        );
        streamController.enqueue(payload);
      } catch {
        streamController.close();
      }
    },
    async cancel() {
      abortStream.abort();
      request.signal.removeEventListener("abort", onRequestAbort);
      // Let the generator run its finally blocks and release the session.
      await streamGen.return(undefined as never);
    },
  });

  return new Response(bodyStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function GET() {
  return new Response(JSON.stringify({ error: "method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
