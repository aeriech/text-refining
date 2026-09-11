"use client";

import { useId } from "react";

interface ToneSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  lowLabel: string;
  midLabel: string;
  highLabel: string;
}

export default function ToneSlider({
  label,
  value,
  onChange,
  disabled = false,
  lowLabel,
  midLabel,
  highLabel,
}: ToneSliderProps) {
  const id = useId();
  const description =
    value <= 3 ? lowLabel : value <= 7 ? midLabel : highLabel;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-secondary tracking-wide"
        >
          {label}
        </label>
        <span
          aria-hidden="true"
          className="rounded-badge border border-border bg-panel-2 px-2 py-1 text-xs font-mono text-text tabular-nums min-w-[34px] text-center"
        >
          {value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={1}
        max={10}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${value} of 10 — ${description}`}
        className="w-full accent-accent cursor-pointer rounded-control outline-none transition-shadow duration-fast ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel disabled:cursor-not-allowed"
      />
      <div className="flex justify-between text-label text-text-tertiary">
        <span>{lowLabel}</span>
        <span className="text-accent font-medium">{description}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
