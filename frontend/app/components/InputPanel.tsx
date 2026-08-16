"use client";

import ToneSlider from "./ToneSlider";

interface InputPanelProps {
  text: string;
  onTextChange: (text: string) => void;
  formality: number;
  onFormalityChange: (value: number) => void;
  friendliness: number;
  onFriendlinessChange: (value: number) => void;
  disabled?: boolean;
  onSubmit: () => void;
  onStop: () => void;
  streaming: boolean;
}

export default function InputPanel({
  text,
  onTextChange,
  formality,
  onFormalityChange,
  friendliness,
  onFriendlinessChange,
  disabled = false,
  onSubmit,
  onStop,
  streaming,
}: InputPanelProps) {
  const canSubmit = text.trim().length > 0 && !streaming;

  return (
    <div className="rounded-2xl border border-border bg-panel p-6 transition-colors">
      <label className="block text-sm font-medium text-text-secondary tracking-wide mb-2" htmlFor="input">
        Your message
      </label>
      <textarea
        id="input"
        placeholder="e.g. hey can u send me the doc asap thx"
        value={text}
        disabled={disabled}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full min-h-[160px] resize-y rounded-xl border border-border bg-panel-2 p-3 text-sm text-text leading-relaxed outline-none transition-all duration-fast ease-out placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
      />

      <div className="mt-6 space-y-6">
        <ToneSlider
          label="Formality"
          value={formality}
          onChange={onFormalityChange}
          disabled={disabled}
          lowLabel="Casual"
          midLabel="Balanced"
          highLabel="Formal"
        />
        <ToneSlider
          label="Friendliness"
          value={friendliness}
          onChange={onFriendlinessChange}
          disabled={disabled}
          lowLabel="Direct"
          midLabel="Polite"
          highLabel="Warm"
        />
      </div>

      <div className="mt-6">
        {!streaming ? (
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-bg transition-all duration-fast ease-out hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 sm:w-auto"
          >
            Refine
          </button>
        ) : (
          <button
            onClick={onStop}
            className="w-full rounded-xl border border-danger/40 bg-danger-bg px-4 py-3 text-sm font-semibold text-danger transition-all duration-fast ease-out hover:bg-danger/20 active:scale-[0.98] sm:w-auto"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
