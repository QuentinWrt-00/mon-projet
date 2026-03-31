"use client";

import Image from "next/image";

import { HeaderIconButton } from "@/components/ui/Header/HeaderIconButton";

export function BagButton() {
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
