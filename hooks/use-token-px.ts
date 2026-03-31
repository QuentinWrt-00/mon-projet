"use client";

import { useMemo } from "react";

/**
 * Lit une longueur en px sur `:root` (ex. `--spacing-small-xs` → `2`).
 * Permet d’aligner Framer Motion (nombres) sur les tokens sans dupliquer les valeurs.
 */
export function useTokenPx(
  cssVarName: string,
  fallbackPx: number,
): number {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return fallbackPx;
    }
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVarName)
      .trim();
    const n = parseFloat(raw);
    if (Number.isFinite(n)) {
      return n;
    }
    return fallbackPx;
  }, [cssVarName, fallbackPx]);
}
