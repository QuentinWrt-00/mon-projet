import type { HTMLAttributes } from "react";

export type BadgeVariant = "ghost" | "black" | "white";

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** Texte informatif (label-small/regular). */
  label: string;
  /** Ghost : fond transparent ; Black : `--color-background-quaternary` + `color-content-primary` onDark ; White : fond primary + `color-content-secondary`. */
  variant?: BadgeVariant;
};

/**
 * Pastille informative — pas d’état, non interactive (pas de CTA).
 * Variante `black` : `data-theme="onDark"` local pour `--color-content-primary` sur fond quaternary (comme le primary « label + prix »).
 * Variantes [Figma — Badge](https://www.figma.com/design/O0RjfK08tBUV4ZlOr8t5m5/Fake-Fondation---Components?node-id=274-3714).
 */
export default function Badge({
  label,
  variant = "ghost",
  className,
  ...rest
}: BadgeProps) {
  const variantClass =
    variant === "black"
      ? "ds-badge--black"
      : variant === "white"
        ? "ds-badge--white"
        : "ds-badge--ghost";

  return (
    <span
      className={["ds-badge", variantClass, className].filter(Boolean).join(" ")}
      {...rest}
      {...(variant === "black" ? { "data-theme": "onDark" as const } : {})}
    >
      {label}
    </span>
  );
}
