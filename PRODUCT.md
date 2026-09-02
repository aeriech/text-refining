# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary user has a rough draft in hand — a Slack message, an email, a comment — and wants it presentable before sending. They arrive with the text already written and mid-task in some other tool; Refine Text is a detour, not a destination. They are not writers seeking a workshop, and they are not prompt engineers: they will not compose instructions, iterate on wording, or read documentation first.

A confirmed secondary audience evaluates the project as engineering evidence — recruiters, hiring managers, and other developers who will try the tool briefly and then read the source. Their needs are served by the tool being genuinely good, not by explaining the tool. Design decisions resolve in favor of the person with a draft to fix.

## Product Purpose

Refine Text rewrites messy input into a polished version with the tone the user chooses, streamed back as it is generated. Success is a completed round trip: paste, refine, copy, leave. The user should never have to prompt, retry, or reformat the result by hand.

## Positioning

Zero-friction refining is the durable position. No prompt to write, no account, no database, no retry loop — paste, refine, copy. The absence of setup is the product, and future work must not add a step between the user's draft and the polished result.

Two supporting mechanisms exist and are real, but they serve the position rather than being it: continuous formality and friendliness dials (1–10, mapped deterministically into the system prompt) instead of tone presets, and visible token-by-token streaming with model fallbacks surfaced as honest status.

## Operating Context

- Single-session, single-shot use. The user brings text from elsewhere and takes the result back to elsewhere; the clipboard is the real integration surface at both ends.
- One page, no navigation, no routes beyond `/` and `POST /api/draft`.
- Runs on Vercel; the deployed instance is public and unauthenticated at `aeriech-refine-text.vercel.app`.
- Free-tier model quota is a live operating condition, not an edge case. Quota exhaustion and mid-request model switches happen during normal use and are shown to the user as status.

## Capabilities and Constraints

Confirmed capabilities:

- Rewrite arbitrary pasted or typed text into a polished version, preserving original meaning, intent, facts, and names; no new information is added.
- Two tone axes, each 1–10: formality (casual → formal) and friendliness (direct → warm). Server-side clamped and validated.
- Server-Sent Events streaming over Fetch Streams: `chunk`, `status`, `done`, `error`, plus internal `completed` / `aborted`.
- Sequential free-tier Gemini model fallback with backoff; each switch is surfaced as a `status` event.
- Mid-stream cancellation via `AbortController`.
- Copy to clipboard with transient confirmation.
- Responsive two-panel layout that stacks on narrow viewports.

Binding constraints (confirmed):

- **No auth, no database, no persistence.** Stays a single stateless `POST /api/draft`. Nothing is stored server-side; nothing survives a refresh. This rules out accounts, cross-session history, and any analytics on user text.
- **Free-tier Gemini only.** The app must keep working on free-tier quota, so the model-fallback chain and visible 429 degradation are permanent facts of the product, not temporary scaffolding.
- **Dark-only interface.** No light mode and no theme toggle is required.

Terminology as used in product and UI: *refine* (never "generate" or "improve"), *tone*, *formality*, *friendliness*, *stream*.

Explicitly undecided:

- The README roadmap (history panel, prompt presets, diff view, multi-model comparison, export) is **aspirational only**. None of it is committed; future design work owes it no structural room, and dropping any item is fine.
- Whether the MIT license and self-hostability in the README are product commitments was raised and not confirmed as binding. The license exists in the repository; treat it as a repository fact, not as a promise design work must protect.

## Brand Commitments

- Name: **Refine Text**. No logo, wordmark, or brand assets exist.
- Voice in shipped copy is plain, concrete, and low-ceremony: "Your message", "Refined output", "Refine", "Stop", "Copy". Failure and degradation are stated honestly rather than softened.
- No visual brand direction has been established or made binding beyond the dark-only constraint above.

## Evidence on Hand

- A working deployed instance at `https://aeriech-refine-text.vercel.app` — the strongest available proof, and directly demonstrable.
- Source code as evidence for the secondary audience: [frontend/app/api/draft/route.ts](frontend/app/api/draft/route.ts) (SSE framing, prompt construction, fallback chain), [frontend/lib/sseClient.ts](frontend/lib/sseClient.ts) (dependency-free SSE parser).
- A detailed [README.md](README.md) covering architecture, the SSE event contract, and setup.

Absences that future work must not fabricate: there are **no** users, usage numbers, testimonials, case studies, press mentions, customers, benchmarks, latency claims, quality comparisons against other tools, pricing, or team. The product has no adoption story. Do not invent one, and do not imply scale, endorsement, or a track record that does not exist.

## Product Principles

1. **The draft is already written.** Every interaction assumes the user arrives with text. Nothing may come before pasting it, and nothing may stand between the result and the clipboard.
2. **Never ask the user to prompt.** Tone control is the entire configuration surface. Any feature that requires composing instructions violates the position.
3. **Degradation is shown, not hidden.** Model switches, quota limits, and failures are surfaced in the user's own terms. Honest status is preferable to a spinner that conceals what is happening.
4. **Statelessness is a feature.** Nothing is stored, so nothing must be managed, trusted, or cleaned up. Design should let the user feel that their text went nowhere.
5. **The craft argues for itself.** The secondary audience is served by a tool that is genuinely well-made, never by copy that explains how well-made it is.

## Accessibility & Inclusion

No accessibility standard has been established for this project, and none was claimed. Future work should not assert WCAG conformance that has not been verified. Ordinary web accessibility practice still applies as a floor — keyboard operability, visible focus, and adequate contrast — but no audited standard is a confirmed product requirement.
