"use client";

import type { Dispatch, RefObject, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import { BagButton } from "@/components/ui/Header/BagButton";
import { BurgerIcon } from "@/components/ui/Header/BurgerIcon";
import { HeaderIconButton } from "@/components/ui/Header/HeaderIconButton";

export type HeaderMobileProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  mobileNavId: string;
  burgerButtonRef: RefObject<HTMLButtonElement | null>;
};

export function HeaderMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
  mobileNavId,
  burgerButtonRef,
}: HeaderMobileProps) {
  return (
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
  );
}
