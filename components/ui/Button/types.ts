import type { MotionConflictingButtonProps } from "@/components/ui/Button/ButtonSurfaces";
import type { Transition } from "framer-motion";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type ButtonSize = "large" | "small";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "quaternary";
export type ButtonVisualState = "enable" | "hover" | "pressed" | "disabled";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
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
  leadingIcon?: ReactNode | null;
  trailingIcon?: ReactNode | null;
};

/** Branch interne rendu par `Button` après `useButtonPresentation`. */
export type ButtonContentBranch =
  | "secondary-label-only"
  | "secondary-price"
  | "quaternary"
  | "tertiary"
  | "primary-dots"
  | "default-dots";

export interface ButtonPresentation {
  mergedClassName: string;
  visualState: ButtonVisualState;
  stylingState: Exclude<ButtonVisualState, "hover"> | "enable";
  disabledOrForced: boolean;
  motionStyle: CSSProperties;
  dataThemeOnDark: boolean;
  contentBranch: ButtonContentBranch;
  gapTarget: string;
  secondaryRowTransition: Transition;
  gapMotionTransition: Transition | { duration: number };
  primaryLeadingX: number;
  primaryTrailingX: number;
  label: string;
  price: string;
  leadingIcon?: ReactNode | null;
  trailingIcon?: ReactNode | null;
  effectiveHasPrice: boolean;
  pointerHandlers: {
    onPointerEnter: ButtonHTMLAttributes<HTMLButtonElement>["onPointerEnter"];
    onPointerLeave: ButtonHTMLAttributes<HTMLButtonElement>["onPointerLeave"];
    onPointerDown: ButtonHTMLAttributes<HTMLButtonElement>["onPointerDown"];
    onPointerUp: ButtonHTMLAttributes<HTMLButtonElement>["onPointerUp"];
    onPointerCancel: ButtonHTMLAttributes<HTMLButtonElement>["onPointerCancel"];
  };
}
