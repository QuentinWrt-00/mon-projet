"use client";

import { motion, type Transition } from "framer-motion";
import { useMemo, useState } from "react";

import { TertiaryNoIcon } from "@/components/ui/Button/TertiaryNoIcon";
import { type MotionConflictingButtonProps } from "@/components/ui/Button/ButtonSurfaces";

export type ButtonRoundedVisualState =
  | "enable"
  | "hover"
  | "pressed"
  | "disabled";

export type ButtonRoundedSize = "large" | "small";

export type ButtonRoundedProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | MotionConflictingButtonProps | "aria-label"
> & {
  size?: ButtonRoundedSize;
  /** Contenu du cercle (par défaut `noIcon`). */
  children?: React.ReactNode;
  /** État forcé (preview) ou désactivé. */
  state?: Exclude<ButtonRoundedVisualState, "disabled"> | "disabled";
  /**
   * Nom accessible obligatoire : le bouton n’affiche pas de texte lisible dans le flux
   * (icône seule) — les lecteurs d’écran s’appuient sur ce libellé pour identifier l’action.
   */
  "aria-label": string;
};

/**
 * Bouton circulaire : zone cliquable fixe, fond + bordure sur l’anneau animé uniquement.
 * Au hover / pressed : diamètre = taille au repos − `--spacing-button-offset`.
 */
export default function ButtonRounded({
  size = "large",
  "aria-label": ariaLabel,
  disabled = false,
  state,
  className,
  style,
  children,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...rest
}: ButtonRoundedProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const visualState: ButtonRoundedVisualState =
    state ??
    (disabled
      ? "disabled"
      : isPressed
        ? "pressed"
        : isHovered
          ? "hover"
          : "enable");

  const sizing =
    size === "large"
      ? {
          rest: "var(--spacing-medium-l)",
          hover:
            "calc(var(--spacing-medium-l) - var(--spacing-button-offset))",
          iconPx: 20,
        }
      : {
          rest: "var(--spacing-medium-m)",
          hover:
            "calc(var(--spacing-medium-m) - var(--spacing-button-offset))",
          iconPx: 16,
        };

  const useCompactRing =
    !disabled &&
    state !== "disabled" &&
    visualState !== "disabled" &&
    (visualState === "hover" || visualState === "pressed");

  const ringDiameter = useCompactRing ? sizing.hover : sizing.rest;

  /** Ressort doux, peu de rebond — plus fluide qu’un tween fixe sur largeur/hauteur. */
  const ringTransition = useMemo<Transition>(
    () => ({
      type: "spring",
      stiffness: 200,
      damping: 26,
      mass: 0.85,
      restDelta: 0.15,
      restSpeed: 0.15,
    }),
    [],
  );

  const mergedClassName = [
    "ds-focus-visible",
    "ds-button",
    "ds-button-rounded",
    size === "large" ? "ds-button-rounded--large" : "ds-button-rounded--small",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      disabled={disabled || state === "disabled"}
      aria-label={ariaLabel}
      className={mergedClassName}
      data-button-state={visualState}
      data-rounded-size={size}
      onPointerEnter={(e) => {
        if (!disabled && state !== "disabled") setIsHovered(true);
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setIsHovered(false);
        setIsPressed(false);
        onPointerLeave?.(e);
      }}
      onPointerDown={(e) => {
        if (!disabled) setIsPressed(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        setIsPressed(false);
        onPointerUp?.(e);
      }}
      onPointerCancel={(e) => {
        setIsPressed(false);
        onPointerCancel?.(e);
      }}
      style={{
        cursor:
          disabled || state === "disabled" ? "default" : "pointer",
        pointerEvents:
          disabled || state === "disabled" ? "none" : "auto",
        ...style,
      }}
      {...rest}
    >
      <motion.span
        aria-hidden
        className="ds-button-rounded__ring"
        initial={{
          width: sizing.rest,
          height: sizing.rest,
        }}
        animate={{
          width: ringDiameter,
          height: ringDiameter,
        }}
        transition={ringTransition}
      />
      <span className="ds-button-rounded__icon-slot ds-button__on-surface">
        {children ?? <TertiaryNoIcon size={sizing.iconPx} />}
      </span>
    </button>
  );
}
