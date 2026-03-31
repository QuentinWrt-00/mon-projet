"use client";

import BlockButtons from "@/components/blocks/BlockButtons";
import BlockText from "@/components/blocks/BlockText";
import ProductCard from "@/components/blocks/ProductCard";
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

const sectionHeadingStyle: CSSProperties = {
  margin: 0,
  color: "var(--color-content-primary)",
  fontFamily: "var(--typography-label-medium-alt-font-family)",
  fontWeight: "var(--typography-label-medium-alt-font-weight)",
  fontSize: "var(--typography-label-medium-alt-font-size)",
  lineHeight: "var(--typography-label-medium-alt-line-height)",
  letterSpacing: "var(--typography-label-medium-alt-letter-spacing)",
};

const blocPreviewSurfaceStyle: CSSProperties = {
  alignSelf: "flex-start",
  width: "min(380px, 100%)",
  minWidth: "160px",
  minHeight: "120px",
  maxWidth: "100%",
  padding: "var(--spacing-medium-m)",
  boxSizing: "border-box",
  backgroundColor: "var(--color-white-200)",
  borderRadius: "var(--radius-small)",
  border:
    "var(--border-width-extra-small) solid var(--color-border-secondary)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

/** Cartes de démo « Bloc boutons » : rangée horizontale avec retour à la ligne. */
const blocButtonsPreviewRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "var(--spacing-medium-s)",
  width: "100%",
  alignItems: "stretch",
};

/** Même surface que les autres blocs, sans `minHeight` imposé (hauteur type Figma hug). */
const blocButtonsPreviewCardStyle: CSSProperties = {
  alignSelf: "stretch",
  width: "min(380px, 100%)",
  minWidth: "min(260px, 100%)",
  maxWidth: "min(380px, 100%)",
  padding: "var(--spacing-medium-m)",
  boxSizing: "border-box",
  backgroundColor: "var(--color-white-200)",
  borderRadius: "var(--radius-small)",
  border:
    "var(--border-width-extra-small) solid var(--color-border-secondary)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "var(--spacing-small-l)",
  flex: "1 1 260px",
};

const blocButtonsPreviewBlockNameStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  textAlign: "center",
  color: "var(--color-content-secondary)",
  fontFamily: "var(--typography-label-small-regular-font-family)",
  fontSize: "var(--typography-label-small-regular-font-size)",
  lineHeight: "var(--typography-label-small-regular-line-height)",
  letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
  fontWeight: "var(--typography-label-small-regular-font-weight)",
};

export default function DemoBlocsPage() {
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
        <h1 style={titleStyle}>Blocs</h1>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-medium-m)",
          }}
        >
          <h2 style={sectionHeadingStyle}>Product card</h2>
          <div
            style={{
              ...blocPreviewSurfaceStyle,
              resize: "both",
              overflow: "auto",
            }}
          >
            <ProductCard
              imageSrc="https://www.diptyqueparis.com/media/catalog/product/d/i/diptyque-fleur-de-cerisier-cherry-blossom-190g-fdc190-1.jpg"
              imageAlt="Fleur de Cerisier — Bougie parfumée modèle classique 190g"
              badge="Label"
              productName="Fleur de Cerisier"
              productCategory="Bougie modèle classique"
              description="Le printemps est là. Dans l’air flottent les notes florales subtilement fruitées et musquées de la bougie parfumée Fleur de Cerisier."
              sizeLabel="190g"
              extraModelsLabel="+1 modèle"
              price="60 €"
              quaternaryLabel="Personnaliser"
              ctaLabel="Ajouter au panier"
              productHref="https://www.diptyqueparis.com/fr_fr/p/bougie-fleur-de-cerisier-190g.html"
              onQuaternaryClick={() => {}}
              onCtaClick={() => {}}
            />
          </div>
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-medium-m)",
          }}
        >
          <h2 style={sectionHeadingStyle}>Bloc texte</h2>
          <div style={blocPreviewSurfaceStyle}>
            <BlockText
              align="center"
              overtitle="Overtitle"
              headline="Headline"
              subtitle="Subtitle"
              body="Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              supportingLabel="supportingLabel"
            />
          </div>
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-medium-m)",
          }}
        >
          <h2 style={sectionHeadingStyle}>Bloc boutons</h2>
          <div style={blocButtonsPreviewRowStyle}>
            <div
              id="demo-bloc-button-primary"
              aria-labelledby="demo-bloc-button-primary-title"
              data-demo-block="primary"
              style={blocButtonsPreviewCardStyle}
            >
              <p
                id="demo-bloc-button-primary-title"
                style={blocButtonsPreviewBlockNameStyle}
              >
                bloc button Primary
              </p>
              <BlockButtons
                variant="primary-tertiary"
                primaryLabel="Label"
                tertiaryLabel="Label"
                onPrimaryClick={() => {}}
                onTertiaryClick={() => {}}
              />
            </div>
            <div
              id="demo-bloc-button-secondary"
              aria-labelledby="demo-bloc-button-secondary-title"
              data-demo-block="secondary"
              style={blocButtonsPreviewCardStyle}
            >
              <p
                id="demo-bloc-button-secondary-title"
                style={blocButtonsPreviewBlockNameStyle}
              >
                bloc button Secondary
              </p>
              <BlockButtons
                variant="secondary-tertiary"
                secondaryLabel="Label"
                tertiaryLabel="Label"
                onSecondaryClick={() => {}}
                onTertiaryClick={() => {}}
              />
            </div>
            <div
              id="demo-bloc-button-tertiary"
              aria-labelledby="demo-bloc-button-tertiary-title"
              data-demo-block="tertiary"
              style={blocButtonsPreviewCardStyle}
            >
              <p
                id="demo-bloc-button-tertiary-title"
                style={blocButtonsPreviewBlockNameStyle}
              >
                bloc button Tertiary
              </p>
              <BlockButtons
                variant="tertiary"
                tertiaryLabel="Label"
                onTertiaryClick={() => {}}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
