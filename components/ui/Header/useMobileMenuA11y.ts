"use client";

import { type RefObject, useEffect, useRef } from "react";

type Params = {
  mobileMenuOpen: boolean;
  panelRef: RefObject<HTMLDivElement | null>;
  burgerButtonRef: RefObject<HTMLButtonElement | null>;
  closeMenu: () => void;
};

/**
 * Piège de focus, Escape, focus initial dans le panneau, restauration sur le burger à la fermeture.
 */
export function useMobileMenuA11y({
  mobileMenuOpen,
  panelRef,
  burgerButtonRef,
  closeMenu,
}: Params) {
  const prevMobileMenuOpen = useRef(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !panel.contains(active)) return;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, closeMenu, panelRef]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const id = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>("a[href], button:not([disabled])");
      first?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileMenuOpen, panelRef]);

  useEffect(() => {
    if (prevMobileMenuOpen.current && !mobileMenuOpen) {
      burgerButtonRef.current?.focus();
    }
    prevMobileMenuOpen.current = mobileMenuOpen;
  }, [mobileMenuOpen, burgerButtonRef]);
}
