"use client";

import { forwardRef, type ReactNode } from "react";

export type HeaderIconButtonProps = {
  /** Libellé accessible du bouton (icône seule). */
  label: string;
  children: ReactNode;
  /** Pour le menu mobile : état du panneau. */
  ariaExpanded?: boolean;
  /** `id` du panneau contrôlé (menu). */
  ariaControls?: string;
  onClick?: () => void;
};

export const HeaderIconButton = forwardRef<
  HTMLButtonElement,
  HeaderIconButtonProps
>(function HeaderIconButton(
  { label, children, ariaExpanded, ariaControls, onClick },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onClick={onClick}
      className="ds-focus-visible"
      style={{
        width: "var(--spacing-medium-s)",
        height: "var(--spacing-medium-s)",
        color: "var(--color-content-primary)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        border: "none",
        padding: 0,
        position: "relative",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
});
