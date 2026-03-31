"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

import { HEADER_NAV_LINKS } from "@/components/ui/Header/constants";

export type NavLinksListProps = {
  id?: string;
  /** Nom accessible du groupe de liens. */
  ariaLabel: string;
  gap: string;
  direction?: "row" | "column";
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
};

export function NavLinksList({
  id,
  ariaLabel,
  gap,
  direction = "row",
  alignItems = "center",
  justifyContent = "center",
}: NavLinksListProps) {
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
        {HEADER_NAV_LINKS.map((item) => {
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
