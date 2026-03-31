"use client";

import { ButtonDot } from "./ButtonDot";

/** Bloc secondary label + prix + règle (Figma). */
export function SecondaryPriceStack({
  label,
  price,
}: {
  label: string;
  price: string;
}) {
  return (
    <span className="ds-button__secondary-price-stack">
      <span className="ds-button__secondary-price-row">
        <span className="ds-button__on-surface">{label}</span>
        <ButtonDot />
        <span className="ds-button__on-surface">{price}</span>
      </span>
      <span className="ds-button__secondary-price-rule" aria-hidden />
    </span>
  );
}
