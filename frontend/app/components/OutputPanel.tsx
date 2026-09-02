"use client";

interface OutputPanelProps {
  output: string;
  streaming: boolean;
  status: string | null;
  attribution: string | null;
  error: string | null;
  copied: boolean;
  copyFailed: boolean;
  onCopy: () => void;
}

export default function OutputPanel({
  output,
  streaming,
  status,
  attribution,
  error,
  copied,
  copyFailed,
  onCopy,
}: OutputPanelProps) {
  /* One polite announcer for the whole panel. Announcing every streamed token
     would mutate a live region dozens of times per result and bury the user in
     partial sentences, so this reports milestones instead: that refining
     started, and that a finished result is ready to read. While streaming, the
     string is constant, so no repeat announcements fire. */
  const announcement = streaming
    ? "Refining your message…"
    : copied
      ? "Refined text copied to clipboard"
      : output
        ? `Refined message ready, ${output.length} characters.${attribution ? ` ${attribution}.` : ""}`
        : "";

  return (
    <div className="rounded-panel border border-border bg-panel p-6 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span
          id="output-label"
          className="block text-sm font-medium text-text-secondary tracking-wide"
        >
          Refined output
        </span>
        {output && !streaming && (
          <span className="text-label font-mono text-text-tertiary tabular-nums">
            {output.length} characters
          </span>
        )}
      </div>

      {/* A named region so assistive tech can jump straight to the result,
          rather than a live region that narrates it token by token. */}
      <div
        role="region"
        aria-labelledby="output-label"
        aria-busy={streaming}
        className="min-h-[160px] rounded-control border border-border-subtle bg-panel-2 p-3 text-sm text-text leading-relaxed whitespace-pre-wrap break-words"
      >
        {output ? (
          <span>
            {output}
            {streaming && (
              <span
                aria-hidden="true"
                className="inline-block w-[8px] h-[1.1em] bg-accent ml-[2px] align-text-bottom animate-caret"
              />
            )}
          </span>
        ) : (
          <span className="text-text-tertiary">
            Your polished message will appear here…
          </span>
        )}
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onCopy}
          disabled={!output || streaming}
          className="rounded-control border border-border-strong bg-panel-2 px-4 py-3 text-sm font-semibold text-text transition-all duration-fast ease-out hover:border-accent hover:text-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border-strong disabled:hover:text-text"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Progress is visible-only: the announcer above covers it for AT, and a
          second live region would queue against it. */}
      {status && (
        <div className="mt-3 rounded-control border border-accent/70 bg-accent-bg p-3 text-sm text-accent">
          {status}
        </div>
      )}

      {attribution && !error && (
        <div className="mt-3 flex items-center gap-2 text-label font-mono text-text-tertiary">
          <span
            aria-hidden="true"
            className="inline-block h-[6px] w-[6px] rounded-full bg-accent-2"
          />
          {attribution}
        </div>
      )}

      {copyFailed && (
        <div
          role="alert"
          className="mt-3 rounded-control border border-danger/60 bg-danger-bg p-3 text-sm text-danger"
        >
          Couldn’t reach your clipboard. Select the text above and copy it
          manually.
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-3 rounded-control border border-danger/60 bg-danger-bg p-3 text-sm text-danger"
        >
          {error}
        </div>
      )}
    </div>
  );
}
