"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

import { ButtonDot } from "./ButtonDot";
import { TertiaryNoIcon } from "./TertiaryNoIcon";

/** Secondary label seul : ligne flex + règle, gap animé. */
export function SecondaryLabelOnlyMotion({
  label,
  gapTarget,
  secondaryRowTransition,
}: {
  label: string;
  gapTarget: string;
  secondaryRowTransition: Transition;
}) {
  return (
    <motion.span
      className="ds-button__secondary-label-row-inner"
      animate={{ gap: gapTarget }}
      transition={secondaryRowTransition}
      style={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ButtonDot className="ds-button__secondary-dot-left" />
      <span className="ds-button__on-surface ds-button__secondary-grid-label ds-button__secondary-label-with-rule">
        {label}
        <span className="ds-button__secondary-rule" aria-hidden />
      </span>
      <ButtonDot className="ds-button__secondary-dot-right" />
    </motion.span>
  );
}

/** `variant="tertiary"` — lien, icônes 12×12 + label + trait. */
export function TertiaryLinkBlock({
  label,
  leadingIcon,
  trailingIcon,
}: {
  label: string;
  leadingIcon: ReactNode | null | undefined;
  trailingIcon: ReactNode | null | undefined;
}) {
  return (
    <span className="ds-button__tertiary-row">
      {leadingIcon !== null && (
        <span className="ds-button__tertiary-icon-slot ds-button__on-surface">
          {leadingIcon !== undefined ? leadingIcon : <TertiaryNoIcon size={12} />}
        </span>
      )}
      <span className="ds-button__on-surface ds-button__tertiary-label-with-rule">
        {label}
        <span className="ds-button__tertiary-rule" aria-hidden />
      </span>
      {trailingIcon !== null && (
        <span className="ds-button__tertiary-icon-slot ds-button__on-surface">
          {trailingIcon !== undefined ? trailingIcon : <TertiaryNoIcon size={12} />}
        </span>
      )}
    </span>
  );
}

/** `variant="quaternary"` — cadre compact + icônes + label. */
export function QuaternaryIconBlock({
  label,
  leadingIcon,
  trailingIcon,
}: {
  label: string;
  leadingIcon: ReactNode | null | undefined;
  trailingIcon: ReactNode | null | undefined;
}) {
  return (
    <>
      {leadingIcon !== null && (
        <span className="ds-button__quaternary-icon-slot ds-button__on-surface">
          {leadingIcon !== undefined ? leadingIcon : <TertiaryNoIcon />}
        </span>
      )}
      <span className="ds-button__quaternary-label-wrap">
        <span className="ds-button__on-surface">{label}</span>
      </span>
      {trailingIcon !== null && (
        <span className="ds-button__quaternary-icon-slot ds-button__on-surface">
          {trailingIcon !== undefined ? trailingIcon : <TertiaryNoIcon />}
        </span>
      )}
    </>
  );
}

/** Primary label seul : rails + translation des dots. */
export function PrimaryLabelOnlyWithDots({
  label,
  primaryLeadingX,
  primaryTrailingX,
  gapMotionTransition,
}: {
  label: string;
  primaryLeadingX: number;
  primaryTrailingX: number;
  gapMotionTransition: Transition;
}) {
  return (
    <>
      <span className="ds-button__primary-dot-rail ds-button__primary-dot-rail--leading">
        <motion.span
          className="ds-button__primary-dot-motion"
          animate={{ x: primaryLeadingX }}
          transition={gapMotionTransition}
        >
          <ButtonDot />
        </motion.span>
      </span>
      <span className="ds-button__on-surface">{label}</span>
      <span className="ds-button__primary-dot-rail ds-button__primary-dot-rail--trailing">
        <motion.span
          className="ds-button__primary-dot-motion"
          animate={{ x: primaryTrailingX }}
          transition={gapMotionTransition}
        >
          <ButtonDot />
        </motion.span>
      </span>
    </>
  );
}

/** Primary / secondary par défaut : dots + label [+ prix]. */
export function DefaultLabelDots({
  effectiveHasPrice,
  label,
  price,
}: {
  effectiveHasPrice: boolean;
  label: string;
  price: string;
}) {
  return (
    <>
      {!effectiveHasPrice && <ButtonDot />}
      <span className="ds-button__on-surface">{label}</span>
      {effectiveHasPrice ? (
        <>
          <ButtonDot />
          <span className="ds-button__on-surface">{price}</span>
        </>
      ) : (
        <ButtonDot />
      )}
    </>
  );
}
