"use client";

import { motion, type Transition } from "framer-motion";
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  DefaultLabelDots,
  PrimaryLabelOnlyWithDots,
  QuaternaryIconBlock,
  SecondaryLabelOnlyMotion,
  TertiaryLinkBlock,
} from "@/components/ui/Button/ButtonLabel";
import { SecondaryPriceStack } from "@/components/ui/Button/ButtonPrice";
import { type MotionConflictingButtonProps } from "@/components/ui/Button/ButtonSurfaces";
import { useMotionDurationS } from "@/hooks/use-motion-duration-s";
import {
  MOTION_EASE_FALLBACK_BOTH,
  useMotionEaseCubic,
} from "@/hooks/use-motion-ease-cubic";
import { useTokenPx } from "@/hooks/use-token-px";

export type ButtonSize = "large" | "small";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "quaternary";
export type ButtonVisualState = "enable" | "hover" | "pressed" | "disabled";

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | MotionConflictingButtonProps
> & {
  /** Primary = plein ; secondary = souligné ; tertiary = lien + trait ; quaternary = cadre compact + icônes. */
  variant?: ButtonVariant;
  /** Taille du CTA (hauteur, typo). */
  size?: ButtonSize;
  /** Variante avec libellé + prix (ignoré si `tertiary` ou `quaternary`). Primary : fond `--color-background-quaternary` + onDark. */
  hasPrice?: boolean;
  /** Texte principal. */
  label: string;
  /** Prix affiché à droite si `hasPrice`. */
  price?: string;
  /** Force un état visuel (preview design) ou `disabled`. */
  state?: Exclude<ButtonVisualState, "disabled"> | "disabled";
  /**
   * Tertiary / quaternary. Icônes 12×12 en `quaternary`.
   * `undefined` → placeholder `noIcon` ; `null` → ne pas afficher ce côté.
   */
  leadingIcon?: React.ReactNode | null;
  trailingIcon?: React.ReactNode | null;
};

export default function Button({
  variant = "primary",
  size = "large",
  hasPrice = false,
  label,
  price = "100EUR",
  disabled = false,
  state,
  style,
  className,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  leadingIcon,
  trailingIcon,
  ...rest
}: ButtonProps) {
  const isSecondary = variant === "secondary";
  /** Lien texte + trait (ex-quaternary). */
  const isLinkButton = variant === "tertiary";
  /** Cadre compact + icônes (ex-tertiary). */
  const isIconFrameButton = variant === "quaternary";
  const effectiveHasPrice = hasPrice && !isIconFrameButton && !isLinkButton;
  const hoverDurationS = useMotionDurationS("--motion-duration-hover-ms", 400);
  const pressedDurationS = useMotionDurationS("--motion-duration-pressed-ms", 320);
  /** Fallback = valeurs par défaut de `--motion-ease-both` dans globals.css */
  const easeBoth = useMotionEaseCubic("--motion-ease-both", MOTION_EASE_FALLBACK_BOTH);

  const transitionHoverGapBase = useMemo(
    () => ({ type: "tween" as const, ease: easeBoth }),
    [easeBoth],
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const visualState: ButtonVisualState =
    state ??
    (disabled
      ? "disabled"
      : isPressed
        ? "pressed"
        : isHovered
          ? "hover"
          : "enable");

  const stylingState: Exclude<ButtonVisualState, "hover"> | "enable" =
    visualState === "hover" ? "enable" : visualState;

  const prevVisualStateRef = useRef<ButtonVisualState>(visualState);

  const isSmall = size === "small" && !effectiveHasPrice;

  const horizontalPadding = isSecondary || isLinkButton
    ? "var(--spacing-null)"
    : isIconFrameButton
      ? "var(--spacing-small-m)"
      : effectiveHasPrice
        ? "var(--spacing-medium-s)"
        : isSmall
          ? "var(--spacing-small-l)"
          : "var(--spacing-medium-s)";

  const gapRestPrimary =
    size === "small" ? "var(--spacing-small-xs)" : "var(--spacing-small-s)";

  /** Secondary label + prix : gap 2px entre les cellules (Figma). Label seul : même écart que primary (xs / s). */
  const gapRest =
    isSecondary && effectiveHasPrice
      ? "var(--spacing-small-xs)"
      : gapRestPrimary;

  const labelOnlyGapCollapsed =
    !effectiveHasPrice &&
    stylingState !== "disabled" &&
    (visualState === "hover" || visualState === "pressed");

  const gapTarget = labelOnlyGapCollapsed
    ? "var(--spacing-null)"
    : gapRest;

  /** Primary label seul : rails à largeur fixe + translation interne des dots. */
  const primaryLabelOnly =
    !isSecondary && !isIconFrameButton && !isLinkButton && !effectiveHasPrice;

  /** Déplacement des dots = `--spacing-small-xs` (small) / `--spacing-small-s` (large) ; lu en px pour Framer. */
  const primaryDotShiftToken = isSmall
    ? "--spacing-small-xs"
    : "--spacing-small-s";
  const primaryDotShiftPx = useTokenPx(primaryDotShiftToken, isSmall ? 2 : 4);
  const gapMotionTransition = useMemo(() => {
    if (stylingState === "disabled") return { duration: 0 };
    if (visualState === "pressed") {
      return { ...transitionHoverGapBase, duration: pressedDurationS };
    }
    if (visualState === "hover") {
      return { ...transitionHoverGapBase, duration: hoverDurationS };
    }
    // Ref = dernier état commité ; lu ici pour la durée Framer (pressed → enable).
    // eslint-disable-next-line react-hooks/refs -- besoin de l’état précédent avant le prochain useLayoutEffect
    if (prevVisualStateRef.current === "pressed") {
      return { ...transitionHoverGapBase, duration: pressedDurationS };
    }
    return { ...transitionHoverGapBase, duration: hoverDurationS };
  }, [
    hoverDurationS,
    pressedDurationS,
    stylingState,
    visualState,
    transitionHoverGapBase,
  ]);

  useLayoutEffect(() => {
    prevVisualStateRef.current = visualState;
  });

  /** Label seul : animation du gap (secondary : ligne flex interne). */
  const animateGap = !effectiveHasPrice;

  const secondaryRowTransition = useMemo<Transition>(() => {
    if (!animateGap) return {};
    const gapTrans =
      stylingState === "disabled"
        ? { duration: 0 }
        : gapMotionTransition;
    return { gap: gapTrans };
  }, [animateGap, gapMotionTransition, stylingState]);

  const primaryLeadingX = labelOnlyGapCollapsed ? primaryDotShiftPx : 0;
  const primaryTrailingX = labelOnlyGapCollapsed ? -primaryDotShiftPx : 0;

  const mergedClassName = [
    "ds-focus-visible",
    "ds-button",
    isSecondary
      ? "ds-button--secondary"
      : isLinkButton
        ? "ds-button--tertiary"
        : isIconFrameButton
          ? "ds-button--quaternary"
          : "ds-button--primary",
    effectiveHasPrice ? "ds-button--price" : "ds-button--label-only",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const typoSmallAlt =
    !isLinkButton &&
    !isIconFrameButton &&
    (size === "small" || (isSecondary && effectiveHasPrice));
  const typoLinkLarge = isLinkButton && size === "large";
  const typoLinkSmall = isLinkButton && size === "small";

  return (
    <motion.button
      type="button"
      disabled={disabled || state === "disabled"}
      className={mergedClassName}
      onPointerEnter={(event) => {
        if (!disabled && state !== "disabled") setIsHovered(true);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setIsHovered(false);
        setIsPressed(false);
        onPointerLeave?.(event);
      }}
      onPointerDown={(event) => {
        if (!disabled) setIsPressed(true);
        onPointerDown?.(event);
      }}
      onPointerUp={(event) => {
        setIsPressed(false);
        onPointerUp?.(event);
      }}
      onPointerCancel={(event) => {
        setIsPressed(false);
        onPointerCancel?.(event);
      }}
      data-button-state={visualState}
      data-size={size}
      style={{
        display: "inline-flex",
        alignItems:
          isSecondary && !effectiveHasPrice ? "flex-start" : "center",
        justifyContent: "center",
        ...(effectiveHasPrice && !isSecondary ? { gap: gapRest } : {}),
        ...(isIconFrameButton ? { gap: "var(--spacing-null)" } : {}),
        ...(isLinkButton ? { gap: "var(--spacing-small-xs)" } : {}),
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        ...(isSecondary && !effectiveHasPrice
          ? { border: "none" }
          : isLinkButton || isIconFrameButton
            ? { border: "none" }
            : !isSecondary && effectiveHasPrice
              ? { border: "none" }
              : !isSecondary && !effectiveHasPrice
                ? {
                    borderStyle: "solid",
                    borderTopWidth: "var(--border-width-extra-small)",
                    borderRightWidth: "var(--border-width-extra-small)",
                    borderLeftWidth: "var(--border-width-extra-small)",
                    borderBottomWidth: "var(--border-width-large)",
                  }
                : {}),
        fontFamily: isIconFrameButton || typoLinkSmall
          ? "var(--typography-label-small-regular-font-family)"
          : typoLinkLarge || typoSmallAlt
            ? "var(--typography-label-small-alt-font-family)"
            : "var(--typography-label-medium-alt-font-family)",
        fontWeight: isIconFrameButton || typoLinkSmall
          ? "var(--typography-label-small-regular-font-weight)"
          : typoLinkLarge || typoSmallAlt
            ? "var(--typography-label-small-alt-font-weight)"
            : "var(--typography-label-medium-alt-font-weight)",
        fontSize: isIconFrameButton || typoLinkSmall
          ? "var(--typography-label-small-regular-font-size)"
          : typoLinkLarge || typoSmallAlt
            ? "var(--typography-label-small-alt-font-size)"
            : "var(--typography-label-medium-alt-font-size)",
        lineHeight: isIconFrameButton || typoLinkSmall
          ? "var(--typography-label-small-regular-line-height)"
          : typoLinkLarge || typoSmallAlt
            ? "var(--typography-label-small-alt-line-height)"
            : "var(--typography-label-medium-alt-line-height)",
        letterSpacing: isIconFrameButton || typoLinkSmall
          ? "var(--typography-label-small-regular-letter-spacing)"
          : typoLinkLarge || typoSmallAlt
            ? "var(--typography-label-small-alt-letter-spacing)"
            : "var(--typography-label-medium-alt-letter-spacing)",
        cursor: stylingState === "disabled" ? "default" : "pointer",
        pointerEvents: stylingState === "disabled" ? "none" : "auto",
        ...style,
      }}
      {...rest}
      {...(variant === "primary" && effectiveHasPrice
        ? { "data-theme": "onDark" as const }
        : {})}
    >
      {isSecondary && !effectiveHasPrice ? (
        <SecondaryLabelOnlyMotion
          label={label}
          gapTarget={gapTarget}
          secondaryRowTransition={secondaryRowTransition}
        />
      ) : isSecondary && effectiveHasPrice ? (
        <SecondaryPriceStack label={label} price={price} />
      ) : isIconFrameButton ? (
        <QuaternaryIconBlock
          label={label}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
        />
      ) : isLinkButton ? (
        <TertiaryLinkBlock
          label={label}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
        />
      ) : primaryLabelOnly ? (
        <PrimaryLabelOnlyWithDots
          label={label}
          primaryLeadingX={primaryLeadingX}
          primaryTrailingX={primaryTrailingX}
          gapMotionTransition={gapMotionTransition}
        />
      ) : (
        <DefaultLabelDots
          effectiveHasPrice={effectiveHasPrice}
          label={label}
          price={price}
        />
      )}
    </motion.button>
  );
}
