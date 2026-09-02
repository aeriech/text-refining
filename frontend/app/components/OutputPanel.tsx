"use client";

interface OutputPanelProps {
  output: string;
  streaming: boolean;
  status: string | null;
  attribution: string | null;
  error: string | null;
  copied: boolean;
  onCopy: () => void;
}

export default function OutputPanel({
  output,
  streaming,
  status,
  attribution,
  error,
  copied,
  onCopy,
}: OutputPanelProps) {
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

      {/* The refined message is the whole deliverable, so it is announced as a
          polite live region: assertive would interrupt on every token. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="false"
        aria-busy={streaming}
        aria-labelledby="output-label"
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

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onCopy}
          disabled={!output || streaming}
          className="rounded-control border border-border-strong bg-panel-2 px-4 py-3 text-sm font-semibold text-text transition-all duration-fast ease-out hover:border-accent hover:text-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border-strong disabled:hover:text-text"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Copy confirmation is visual only on the button, so announce it once. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Refined text copied to clipboard" : ""}
      </span>

      {status && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 rounded-control border border-accent/40 bg-accent-bg p-3 text-sm text-accent"
        >
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
