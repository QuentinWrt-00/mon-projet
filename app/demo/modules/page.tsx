"use client";

import Header from "@/components/ui/Header";
import type { CSSProperties } from "react";

const titleStyle: CSSProperties = {
  fontFamily: "var(--typography-headline-small-regular-font-family)",
  color: "var(--color-content-primary)",
  fontSize: "var(--typography-headline-small-regular-font-size)",
  lineHeight: "var(--typography-headline-small-regular-line-height)",
  letterSpacing:
    "var(--typography-headline-small-regular-letter-spacing)",
  fontWeight: "var(--typography-headline-small-regular-font-weight)",
  margin: 0,
};

const bodyStyle: CSSProperties = {
  fontFamily: "var(--typography-body-medium-light-font-family)",
  color: "var(--color-content-secondary)",
  fontSize: "var(--typography-body-medium-light-font-size)",
  lineHeight: "var(--typography-body-medium-light-line-height)",
  letterSpacing: "var(--typography-body-medium-light-letter-spacing)",
  fontWeight: "var(--typography-body-medium-light-font-weight)",
  maxWidth: "70ch",
  margin: 0,
};

export default function DemoModulesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-background-primary)",
      }}
    >
      <Header />
      <main
        id="main-content"
        style={{
          maxWidth: "var(--layout-max-width-content)",
          marginInline: "auto",
          paddingInline: "var(--spacing-medium-l)",
          paddingBlock: "var(--spacing-large-m)",
          display: "grid",
          gap: "var(--spacing-medium-l)",
        }}
      >
        <h1 style={titleStyle}>Démo — Modules</h1>
        <p style={bodyStyle}>
          Espace réservé aux modules (compositions de blocs, features métier,
          etc.). Contenu à venir.
        </p>
      </main>
    </div>
  );
}
