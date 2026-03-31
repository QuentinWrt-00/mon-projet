"use client";

import type { CSSProperties } from "react";

const DOT_MASK_STYLE: CSSProperties = {
  display: "inline-block",
  flexShrink: 0,
  width: "var(--spacing-small-xl)",
  height: "var(--spacing-small-xl)",
  maskImage: "url(/icons/dot.svg)",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  maskSize: "contain",
  WebkitMaskImage: "url(/icons/dot.svg)",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  WebkitMaskSize: "contain",
};

/** Couleur via `var(--btn-state-on-surface)` (classe `ds-button__dot` dans globals.css). */
export function ButtonDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={["ds-button__dot", className].filter(Boolean).join(" ")}
      style={DOT_MASK_STYLE}
    />
  );
}
