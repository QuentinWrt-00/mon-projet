"use client";

import Image from "next/image";
import Link from "next/link";

import { BagButton } from "@/components/ui/Header/BagButton";
import { HeaderIconButton } from "@/components/ui/Header/HeaderIconButton";
import { NavLinksList } from "@/components/ui/Header/NavLinksList";

export function HeaderDesktop() {
  return (
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
  );
}
