"use client";

import { useCallback, useRef, useState } from "react";
import { type SSEEvent, streamSSE } from "@/lib/sseClient";
import { useClipboard } from "@/lib/useClipboard";
import InputPanel from "./components/InputPanel";
import OutputPanel from "./components/OutputPanel";

const API_URL = "/api/draft";

interface Scores {
  formality: number;
  friendliness: number;
}

export default function RefinePanel() {
  const [text, setText] = useState("");
  const [scores, setScores] = useState<Scores>({
    formality: 5,
    friendliness: 5,
  });
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);

  const { copied, failed: copyFailed, copy } = useClipboard();
  const abortRef = useRef<AbortController | null>(null);

  const handleEvent = useCallback((ev: SSEEvent) => {
    switch (ev.type) {
      case "chunk":
        setOutput((prev) => prev + ev.text);
        break;
      case "reset":
        // A model failed after already streaming; drop its partial text so the
        // replacement result does not get appended to a half sentence.
        setOutput("");
        break;
      case "status":
        setStatus(ev.message);
        break;
      case "attribution":
        setAttribution(ev.message);
        break;
      case "done":
        setStreaming(false);
        setStatus(null);
        break;
      case "error":
        setError(ev.message);
        setStreaming(false);
        setStatus(null);
        break;
    }
  }, []);

  const onSubmit = useCallback(async () => {
    setError(null);
    setAttribution(null);
    setStatus("Refining…");
    setOutput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await streamSSE(API_URL, { text, formality: scores.formality, friendliness: scores.friendliness }, { onEvent: handleEvent, signal: controller.signal });
      // The stream can end without a `done`/`error` event (maxDuration kill, a
      // proxy closing cleanly). Those events clear both in the normal case;
      // this only sweeps up the transient banner they never got to clear.
      setStreaming(false);
      setStatus((s) => (s === "Refining…" ? null : s));
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setStatus("Cancelled.");
      } else {
        setError("Network error — is the backend running?");
      }
      setStreaming(false);
    }
  }, [text, scores, handleEvent]);

  const onStop = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
    setStatus("Cancelled.");
  }, []);

  // Stable identities so the memoized input panel is skipped while streaming.
  const onFormalityChange = useCallback(
    (v: number) => setScores((s) => ({ ...s, formality: v })),
    []
  );
  const onFriendlinessChange = useCallback(
    (v: number) => setScores((s) => ({ ...s, friendliness: v })),
    []
  );
  const onCopy = useCallback(() => copy(output), [copy, output]);

  return (
    <div className="mx-auto max-w-[880px] px-6 py-12 sm:py-16">
      <header className="mb-8 border-l-2 border-accent pl-3">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Refine Text
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Polish messy messages with adjustable tone. Results stream in real time.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputPanel
          text={text}
          onTextChange={setText}
          formality={scores.formality}
          onFormalityChange={onFormalityChange}
          friendliness={scores.friendliness}
          onFriendlinessChange={onFriendlinessChange}
          onSubmit={onSubmit}
          onStop={onStop}
          streaming={streaming}
        />
        <OutputPanel
          output={output}
          streaming={streaming}
          status={status}
          attribution={attribution}
          error={error}
          copied={copied}
          copyFailed={copyFailed}
          onCopy={onCopy}
        />
      </div>
    </div>
  );
}
