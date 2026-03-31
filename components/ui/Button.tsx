"use client";

import { motion } from "framer-motion";
import { ButtonInnerContent } from "@/components/ui/Button/ButtonInnerContent";
import type { ButtonProps } from "@/components/ui/Button/types";
import { useButtonPresentation } from "@/components/ui/Button/useButtonPresentation";

export type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonVisualState,
} from "@/components/ui/Button/types";

/**
 * Bouton CTA du design system (primary → quaternary, prix optionnel, états motion).
 */
export function Button({
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
  const pres = useButtonPresentation({
    variant,
    size,
    hasPrice,
    label,
    price,
    disabled,
    state,
    className,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    leadingIcon,
    trailingIcon,
  });

  return (
    <motion.button
      type="button"
      disabled={pres.disabledOrForced}
      className={pres.mergedClassName}
      {...pres.pointerHandlers}
      data-button-state={pres.visualState}
      data-size={size}
      style={{
        ...pres.motionStyle,
        ...style,
      }}
      {...rest}
      {...(pres.dataThemeOnDark ? { "data-theme": "onDark" as const } : {})}
    >
      <ButtonInnerContent {...pres} />
    </motion.button>
  );
}

export default Button;
