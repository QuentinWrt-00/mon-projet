"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

import { HeaderDesktop } from "@/components/ui/Header/HeaderDesktop";
import { HeaderMobile } from "@/components/ui/Header/HeaderMobile";
import { HeaderMobilePanel } from "@/components/ui/Header/HeaderMobilePanel";
import { useMobileMenuA11y } from "@/components/ui/Header/useMobileMenuA11y";
import { useScrollHeaderVisibility } from "@/components/ui/Header/useScrollHeaderVisibility";
import { useMotionDurationS } from "@/hooks/use-motion-duration-s";
import {
  MOTION_EASE_FALLBACK_IN_OUT,
  useMotionEaseCubic,
} from "@/hooks/use-motion-ease-cubic";

/**
 * En-tête sticky : navigation desktop, barre + menu mobile (focus piégé, Escape).
 */
export function Header() {
  const isVisible = useScrollHeaderVisibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileNavId = useId();
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const headerDurationS = useMotionDurationS("--duration-slow", 600);
  const headerEase = useMotionEaseCubic(
    "--motion-ease-in-out",
    MOTION_EASE_FALLBACK_IN_OUT,
  );

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useMobileMenuA11y({
    mobileMenuOpen,
    panelRef: mobilePanelRef,
    burgerButtonRef,
    closeMenu,
  });

  return (
    <>
      <a href="#main-content" className="ds-skip-link ds-focus-visible">
        Aller au contenu
      </a>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: headerDurationS, ease: headerEase }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: "var(--z-header)",
          width: "100%",
          backgroundColor: "var(--color-background-primary)",
        }}
      >
        <HeaderDesktop />
        <HeaderMobile
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          mobileNavId={mobileNavId}
          burgerButtonRef={burgerButtonRef}
        />
        <HeaderMobilePanel
          mobilePanelRef={mobilePanelRef}
          mobileMenuOpen={mobileMenuOpen}
          mobileNavId={mobileNavId}
        />
      </motion.header>
    </>
  );
}

export default Header;
