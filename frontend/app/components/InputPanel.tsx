"use client";

import { memo, useEffect, useState } from "react";
import ToneSlider from "./ToneSlider";

interface InputPanelProps {
  text: string;
  onTextChange: (text: string) => void;
  formality: number;
  onFormalityChange: (value: number) => void;
  friendliness: number;
  onFriendlinessChange: (value: number) => void;
  onSubmit: () => void;
  onStop: () => void;
  streaming: boolean;
}

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel";

function InputPanel({
  text,
  onTextChange,
  formality,
  onFormalityChange,
  friendliness,
  onFriendlinessChange,
  onSubmit,
  onStop,
  streaming,
}: InputPanelProps) {
  const canSubmit = text.trim().length > 0 && !streaming;

  /* Resolved after mount: the modifier glyph depends on the OS, and rendering
     a guess on the server would either flash the wrong key or break hydration. */
  const [modifier, setModifier] = useState<string | null>(null);
  useEffect(() => {
    const apple = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
    setModifier(apple ? "⌘" : "Ctrl");
  }, []);

  return (
    <div className="rounded-panel border border-border bg-panel p-6 transition-colors">
      <label className="block text-sm font-medium text-text-secondary tracking-wide mb-2" htmlFor="input">
        Your message
      </label>
      <textarea
        id="input"
        placeholder="e.g. hey can u send me the doc asap thx"
        value={text}
        disabled={streaming}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canSubmit) {
            e.preventDefault();
            onSubmit();
          }
        }}
        aria-describedby="submit-hint"
        aria-keyshortcuts="Meta+Enter Control+Enter"
        className="w-full min-h-[160px] resize-y rounded-control border border-border-strong bg-panel-2 p-3 text-sm text-text leading-relaxed caret-accent outline-none transition-all duration-fast ease-out placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
      />

      <div className="mt-6 space-y-6">
        <ToneSlider
          label="Formality"
          value={formality}
          onChange={onFormalityChange}
          disabled={streaming}
          lowLabel="Casual"
          midLabel="Balanced"
          highLabel="Formal"
        />
        <ToneSlider
          label="Friendliness"
          value={friendliness}
          onChange={onFriendlinessChange}
          disabled={streaming}
          lowLabel="Direct"
          midLabel="Polite"
          highLabel="Warm"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        {!streaming ? (
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`w-full rounded-control bg-accent px-4 py-3 text-sm font-semibold text-bg transition-all duration-fast ease-out hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 sm:w-auto ${FOCUS_RING}`}
          >
            Refine
          </button>
        ) : (
          <button
            onClick={onStop}
            className={`w-full rounded-control border border-danger/60 bg-danger-bg px-4 py-3 text-sm font-semibold text-danger transition-all duration-fast ease-out hover:bg-danger/20 active:scale-[0.98] sm:w-auto ${FOCUS_RING}`}
          >
            Stop
          </button>
        )}
        <span id="submit-hint" className="text-label text-text-tertiary">
          {modifier ? `${modifier} + Enter to refine` : " "}
        </span>
      </div>
    </div>
  );
}

/* Memoized so the streamed output does not re-render the textarea and both
   sliders on every token. All of this panel's props are stable while a
   stream is running, so this skips the subtree entirely. */
export default memo(InputPanel);
