"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copies text to the clipboard and exposes a transient status for UI feedback.
 * Failure is reported, never swallowed: the clipboard is this product's exit
 * path, so a user who believes they copied and did not loses the whole result.
 */
export function useClipboard(resetMs = 1800) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (timerRef.current) clearTimeout(timerRef.current);

      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        ok = false;
      }

      setStatus(ok ? "copied" : "failed");
      // A failure needs longer on screen than a confirmation: the user has to
      // read it and act on it.
      timerRef.current = setTimeout(
        () => setStatus("idle"),
        ok ? resetMs : resetMs * 3
      );
      return ok;
    },
    [resetMs]
  );

  return { copied: status === "copied", failed: status === "failed", copy };
}
