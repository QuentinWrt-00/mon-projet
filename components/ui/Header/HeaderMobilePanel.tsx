"use client";

import type { RefObject } from "react";

import { NavLinksList } from "@/components/ui/Header/NavLinksList";

export type HeaderMobilePanelProps = {
  mobilePanelRef: RefObject<HTMLDivElement | null>;
  mobileMenuOpen: boolean;
  mobileNavId: string;
};

export function HeaderMobilePanel({
  mobilePanelRef,
  mobileMenuOpen,
  mobileNavId,
}: HeaderMobilePanelProps) {
  return (
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
  );
}
