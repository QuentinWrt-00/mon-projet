"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { useMotionDurationS } from "@/hooks/use-motion-duration-s";
import {
  MOTION_EASE_FALLBACK_IN_OUT,
  useMotionEaseCubic,
} from "@/hooks/use-motion-ease-cubic";

const navLinks = [
  { href: "/showcase", label: "Composants" },
  { href: "/demo/blocs", label: "Blocs" },
  { href: "/demo/modules", label: "Modules" },
];

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor" />
    </svg>
  );
}

const HeaderIconButton = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    children: React.ReactNode;
    ariaExpanded?: boolean;
    ariaControls?: string;
    onClick?: () => void;
  }
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

function BagButton() {
  return (
    <HeaderIconButton label="3 articles dans le panier">
      <Image src="/icons/bag.svg" alt="" aria-hidden width={24} height={24} />
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          minWidth: "var(--spacing-small-l)",
          height: "var(--spacing-small-m)",
          paddingInline: "var(--spacing-small-xs)",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-content-primary)",
          color: "var(--color-background-primary)",
          fontFamily: "var(--typography-label-small-regular-font-family)",
          fontSize: "var(--typography-label-small-regular-font-size)",
          lineHeight: "var(--typography-label-small-regular-line-height)",
          letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
          fontWeight: "var(--typography-label-small-regular-font-weight)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transform:
            "translate(var(--header-bag-badge-translate-x), var(--header-bag-badge-translate-y))",
        }}
      >
        3
      </span>
    </HeaderIconButton>
  );
}

function NavLinksList({
  id,
  ariaLabel,
  gap,
  direction = "row",
  alignItems = "center",
  justifyContent = "center",
}: {
  id?: string;
  ariaLabel: string;
  gap: string;
  direction?: "row" | "column";
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
}) {
  const pathname = usePathname();

  return (
    <nav id={id} aria-label={ariaLabel}>
      <ul
        style={{
          display: "flex",
          flexDirection: direction,
          alignItems,
          justifyContent,
          gap,
          margin: 0,
          padding: 0,
          listStyle: "none",
          flexWrap: "wrap",
        }}
      >
        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="ds-focus-visible ds-radius-small"
                aria-current={isActive ? "page" : undefined}
                style={{
                  color: "var(--color-content-primary)",
                  fontFamily:
                    "var(--typography-label-large-regular-font-family)",
                  fontWeight:
                    "var(--typography-label-large-regular-font-weight)",
                  fontSize: "var(--typography-label-large-regular-font-size)",
                  lineHeight:
                    "var(--typography-label-large-regular-line-height)",
                letterSpacing:
                  "var(--typography-label-large-regular-letter-spacing)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const mobileNavId = useId();
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const prevMobileMenuOpen = useRef(false);
  const headerDurationS = useMotionDurationS("--duration-slow", 600);
  const headerEase = useMotionEaseCubic(
    "--motion-ease-in-out",
    MOTION_EASE_FALLBACK_IN_OUT,
  );

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current <= 0) {
        setIsVisible(true);
        lastScrollY.current = 0;
        return;
      }

      if (current > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const panel = mobilePanelRef.current;
    if (!panel) return;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
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
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const id = requestAnimationFrame(() => {
      const panel = mobilePanelRef.current;
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>("a[href], button:not([disabled])");
      first?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (prevMobileMenuOpen.current && !mobileMenuOpen) {
      burgerButtonRef.current?.focus();
    }
    prevMobileMenuOpen.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

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
        <div
          className="hidden lg:flex"
          style={{
            minHeight: "var(--spacing-large-l)",
            paddingTop: "var(--spacing-medium-s)",
            paddingBottom: "var(--spacing-medium-s)",
            paddingLeft: "var(--spacing-medium-m)",
            paddingRight: "var(--spacing-medium-m)",
            gap: "var(--spacing-medium-xs)",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "100%",
              minHeight: "var(--spacing-medium-m)",
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifySelf: "start",
                gap: "var(--spacing-small-xl)",
              }}
            >
              <HeaderIconButton label="Search">
                <Image src="/icons/Search.svg" alt="" aria-hidden width={24} height={24} />
              </HeaderIconButton>
            </div>

            <Link
              href="/"
              aria-label="Homepage"
              className="ds-focus-visible ds-radius-small"
              style={{ display: "inline-flex", justifySelf: "center" }}
            >
              <Image
                src="/logo/Type=Wordmark.svg"
                alt="Wordmark"
                width={104}
                height={32}
                priority
              />
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifySelf: "end",
                gap: "var(--spacing-small-xl)",
              }}
            >
              <HeaderIconButton label="Account">
                <Image src="/icons/Account.svg" alt="" aria-hidden width={24} height={24} />
              </HeaderIconButton>
              <BagButton />
            </div>
          </div>

          <NavLinksList
            ariaLabel="Démos"
            gap="var(--spacing-medium-s)"
            direction="row"
            alignItems="center"
            justifyContent="center"
          />
        </div>

        <div
          className="grid lg:hidden"
          style={{
            minHeight: "var(--spacing-large-s)",
            paddingLeft: "var(--spacing-small-xl)",
            paddingRight: "var(--spacing-small-xl)",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifySelf: "start",
              gap: "var(--spacing-small-xl)",
            }}
          >
            <HeaderIconButton
              ref={burgerButtonRef}
              label="Menu"
              ariaExpanded={mobileMenuOpen}
              ariaControls={mobileNavId}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <BurgerIcon />
            </HeaderIconButton>
            <HeaderIconButton label="Search">
              <Image src="/icons/Search.svg" alt="" aria-hidden width={24} height={24} />
            </HeaderIconButton>
          </div>

          <Link
            href="/"
            aria-label="Homepage"
            className="ds-focus-visible ds-radius-small"
            style={{ display: "inline-flex", justifySelf: "center" }}
          >
            <Image src="/logo/Type=Wordmark.svg" alt="Wordmark" width={104} height={32} priority />
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifySelf: "end",
              gap: "var(--spacing-small-xl)",
            }}
          >
            <HeaderIconButton label="Account">
              <Image src="/icons/Account.svg" alt="" aria-hidden width={24} height={24} />
            </HeaderIconButton>
            <BagButton />
          </div>
        </div>

        <div
          ref={mobilePanelRef}
          hidden={!mobileMenuOpen}
          className="lg:hidden"
          style={{
            width: "100%",
            paddingLeft: "var(--spacing-small-xl)",
            paddingRight: "var(--spacing-small-xl)",
            paddingBottom: "var(--spacing-medium-s)",
            borderTop: "var(--border-width-extra-small) solid var(--color-border-secondary)",
            backgroundColor: "var(--color-background-primary)",
          }}
        >
          <NavLinksList
            id={mobileNavId}
            ariaLabel="Démos"
            gap="var(--spacing-small-l)"
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          />
        </div>
      </motion.header>
    </>
  );
}
