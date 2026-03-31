"use client";

import {
  DefaultLabelDots,
  PrimaryLabelOnlyWithDots,
  QuaternaryIconBlock,
  SecondaryLabelOnlyMotion,
  TertiaryLinkBlock,
} from "@/components/ui/Button/ButtonLabel";
import { SecondaryPriceStack } from "@/components/ui/Button/ButtonPrice";
import type { ButtonPresentation } from "@/components/ui/Button/types";

export function ButtonInnerContent(p: ButtonPresentation) {
  switch (p.contentBranch) {
    case "secondary-label-only":
      return (
        <SecondaryLabelOnlyMotion
          label={p.label}
          gapTarget={p.gapTarget}
          secondaryRowTransition={p.secondaryRowTransition}
        />
      );
    case "secondary-price":
      return (
        <SecondaryPriceStack label={p.label} price={p.price} />
      );
    case "quaternary":
      return (
        <QuaternaryIconBlock
          label={p.label}
          leadingIcon={p.leadingIcon}
          trailingIcon={p.trailingIcon}
        />
      );
    case "tertiary":
      return (
        <TertiaryLinkBlock
          label={p.label}
          leadingIcon={p.leadingIcon}
          trailingIcon={p.trailingIcon}
        />
      );
    case "primary-dots":
      return (
        <PrimaryLabelOnlyWithDots
          label={p.label}
          primaryLeadingX={p.primaryLeadingX}
          primaryTrailingX={p.primaryTrailingX}
          gapMotionTransition={p.gapMotionTransition}
        />
      );
    default:
      return (
        <DefaultLabelDots
          effectiveHasPrice={p.effectiveHasPrice}
          label={p.label}
          price={p.price}
        />
      );
  }
}
