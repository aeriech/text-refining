"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CopyStatus = "idle" | "copied" | "failed";

/**
 * Legacy path for insecure contexts. `execCommand` returns a boolean that must
 * be honoured — ignoring it reports success for a copy that never happened.
 */
function legacyCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.left = "0";
  ta.style.opacity = "0";
  ta.style.pointerEvents = "none";
  document.body.appendChild(ta);

  try {
    ta.focus();
    ta.select();
    // iOS ignores select() on a readonly textarea without an explicit range.
    ta.setSelectionRange(0, text.length);
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(ta);
  }
}

/**
 * Copies text to the clipboard and exposes a transient status for UI feedback.
 * Failure is reported, never swallowed: the clipboard is this product's exit
 * path, so a user who believes they copied and did not loses the whole result.
 */
export function useClipboard(resetMs = 1800) {
  const [status, setStatus] = useState<CopyStatus>("idle");
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
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          ok = true;
        } else {
          ok = legacyCopy(text);
        }
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

  return {
    status,
    copied: status === "copied",
    failed: status === "failed",
    copy,
  };
}
