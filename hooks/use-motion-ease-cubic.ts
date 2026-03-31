"use client";

import { useMemo } from "react";

/** Aligné sur `--motion-ease-both` dans globals.css — référence stable pour `useMotionEaseCubic`. */
export const MOTION_EASE_FALLBACK_BOTH: [number, number, number, number] = [
  0.33, 1, 0.68, 1,
];

/** Aligné sur `--motion-ease-in-out` dans globals.css — référence stable pour `useMotionEaseCubic`. */
export const MOTION_EASE_FALLBACK_IN_OUT: [number, number, number, number] = [
  0.4, 0, 0.2, 1,
];

/**
 * Lit `--motion-ease-*` sur `:root` (4 nombres séparés par des virgules, sans `cubic-bezier()`).
 * Pour Framer Motion : `ease: tuple`.
 */
export function useMotionEaseCubic(
  varName: string,
  fallback: [number, number, number, number],
): [number, number, number, number] {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return fallback;
    }
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    const parts = raw.split(",").map((p) => Number.parseFloat(p.trim()));
    if (parts.length === 4 && parts.every(Number.isFinite)) {
      return parts as [number, number, number, number];
    }
    return fallback;
  }, [varName, fallback]);
}
