"use client";

import { useMemo } from "react";

/**
 * Lit une durée définie en millisecondes sur `:root` (ex. `--motion-duration-hover-ms: 400;`)
 * et renvoie la valeur en secondes pour Framer Motion ou `transition` JS.
 */
export function useMotionDurationS(
  varName: string,
  fallbackMs: number,
): number {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return fallbackMs / 1000;
    }
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    const ms = Number.parseFloat(raw);
    if (Number.isFinite(ms) && ms >= 0) {
      return ms / 1000;
    }
    return fallbackMs / 1000;
  }, [varName, fallbackMs]);
}
