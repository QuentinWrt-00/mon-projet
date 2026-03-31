"use client";

import { type Transition } from "framer-motion";
import {
  type CSSProperties,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ButtonPresentation, ButtonProps, ButtonVisualState } from "@/components/ui/Button/types";
import { useMotionDurationS } from "@/hooks/use-motion-duration-s";
import {
  MOTION_EASE_FALLBACK_BOTH,
  useMotionEaseCubic,
} from "@/hooks/use-motion-ease-cubic";
import { useTokenPx } from "@/hooks/use-token-px";

type PresentationInput = Pick<
  ButtonProps,
  | "variant"
  | "size"
  | "hasPrice"
  | "label"
  | "price"
  | "disabled"
  | "state"
  | "className"
  | "leadingIcon"
  | "trailingIcon"
  | "onPointerEnter"
  | "onPointerLeave"
  | "onPointerDown"
  | "onPointerUp"
  | "onPointerCancel"
>;

export function useButtonPresentation({
  variant = "primary",
  size = "large",
  hasPrice = false,
  label,
  price = "100EUR",
  disabled = false,
  state,
  className,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  leadingIcon,
  trailingIcon,
}: PresentationInput): ButtonPresentation {
  const isSecondary = variant === "secondary";
  const isLinkButton = variant === "tertiary";
  const isIconFrameButton = variant === "quaternary";
  const effectiveHasPrice = hasPrice && !isIconFrameButton && !isLinkButton;
  const hoverDurationS = useMotionDurationS("--motion-duration-hover-ms", 400);
  const pressedDurationS = useMotionDurationS("--motion-duration-pressed-ms", 320);
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

  const primaryLabelOnly =
    !isSecondary && !isIconFrameButton && !isLinkButton && !effectiveHasPrice;

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

  const motionStyle: CSSProperties = {
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
  };

  let contentBranch: ButtonPresentation["contentBranch"];
  if (isSecondary && !effectiveHasPrice) contentBranch = "secondary-label-only";
  else if (isSecondary && effectiveHasPrice) contentBranch = "secondary-price";
  else if (isIconFrameButton) contentBranch = "quaternary";
  else if (isLinkButton) contentBranch = "tertiary";
  else if (primaryLabelOnly) contentBranch = "primary-dots";
  else contentBranch = "default-dots";

  return {
    mergedClassName,
    visualState,
    stylingState,
    disabledOrForced: disabled || state === "disabled",
    motionStyle,
    dataThemeOnDark: variant === "primary" && effectiveHasPrice,
    contentBranch,
    gapTarget,
    secondaryRowTransition,
    gapMotionTransition,
    primaryLeadingX,
    primaryTrailingX,
    label,
    price,
    leadingIcon,
    trailingIcon,
    effectiveHasPrice,
    pointerHandlers: {
      onPointerEnter: (event) => {
        if (!disabled && state !== "disabled") setIsHovered(true);
        onPointerEnter?.(event);
      },
      onPointerLeave: (event) => {
        setIsHovered(false);
        setIsPressed(false);
        onPointerLeave?.(event);
      },
      onPointerDown: (event) => {
        if (!disabled) setIsPressed(true);
        onPointerDown?.(event);
      },
      onPointerUp: (event) => {
        setIsPressed(false);
        onPointerUp?.(event);
      },
      onPointerCancel: (event) => {
        setIsPressed(false);
        onPointerCancel?.(event);
      },
    },
  };
}
