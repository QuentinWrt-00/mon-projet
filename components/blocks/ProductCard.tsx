"use client";

import Image from "next/image";
import Link from "next/link";

import Badge from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { TertiaryNoIcon } from "@/components/ui/Button/TertiaryNoIcon";
import type { CSSProperties } from "react";

/**
 * Product card vertical (Figma : `product-card-vertical` — variante « Link with dots » / Desktop).
 *
 * Écarts / éléments absents du design system (à traiter séparément) :
 * - **Largeur carte 300px** : pas de jeton dédié ; aligné sur la maquette Figma.
 * - **Badge** sur média : `Badge` variante `white` par défaut (`badgeVariant`).
 * - **Icône gravure** (engraving) : absente du repo — `TertiaryNoIcon` 16×16 en attendant l’asset officiel.
 * - **Quaternary « pilule »** (rayon 999px dans Figma) : le `Button` quaternary utilise `--radius-extra-small`, pas une pilule pleine.
 * - **Illustration produit** : URL média (ex. catalogue) + `next/image` avec `remotePatterns`.
 */
export type ProductCardProps = {
  imageSrc: string;
  imageAlt: string;
  badge?: string | null;
  /** Variante du badge média (défaut : `white`). */
  badgeVariant?: BadgeVariant;
  /** Titre principal (label-medium/alt). */
  productName: string;
  /** Sous-titre catégorie (label-small/regular), espacé de `--spacing-small-xs` (2px). */
  productCategory: string;
  description: string;
  sizeLabel: string;
  /** ex. « +1 model » — texte secondaire */
  extraModelsLabel?: string | null;
  price: string;
  /** Action « Personnaliser » (bouton quaternary, cadre + icônes). */
  quaternaryLabel?: string | null;
  onQuaternaryClick?: () => void;
  ctaLabel: string;
  onCtaClick?: () => void;
  /** Lien optionnel sur le titre (navigation produit). */
  productHref?: string;
};

const mediaStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "3 / 4",
  overflow: "hidden",
  backgroundColor: "var(--color-background-tertiary)",
};

const badgePositionStyle: CSSProperties = {
  position: "absolute",
  top: "var(--spacing-small-xl)",
  left: "var(--spacing-small-xl)",
  zIndex: "var(--z-badge)",
};

const quaternaryWrapStyle: CSSProperties = {
  position: "absolute",
  right: "var(--spacing-small-l)",
  bottom: "var(--spacing-small-l)",
  zIndex: "var(--z-badge)",
};

const bodyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "stretch",
  gap: "var(--spacing-small-xl)",
  padding: "var(--spacing-small-xl)",
  boxSizing: "border-box",
};

const titleHeadingStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "var(--spacing-small-xs)",
};

const productNameStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  textAlign: "center",
  color: "var(--color-content-primary)",
  fontFamily: "var(--typography-label-medium-alt-font-family)",
  fontWeight: "var(--typography-label-medium-alt-font-weight)",
  fontSize: "var(--typography-label-medium-alt-font-size)",
  lineHeight: "var(--typography-label-medium-alt-line-height)",
  letterSpacing: "var(--typography-label-medium-alt-letter-spacing)",
};

const productCategoryStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  textAlign: "center",
  color: "var(--color-content-secondary)",
  fontFamily: "var(--typography-label-small-regular-font-family)",
  fontWeight: "var(--typography-label-small-regular-font-weight)",
  fontSize: "var(--typography-label-small-regular-font-size)",
  lineHeight: "var(--typography-label-small-regular-line-height)",
  letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
};

const priceStyle: CSSProperties = {
  margin: 0,
  color: "var(--color-content-primary)",
  fontFamily: "var(--typography-label-medium-regular-font-family)",
  fontWeight: "var(--typography-label-medium-regular-font-weight)",
  fontSize: "var(--typography-label-medium-regular-font-size)",
  lineHeight: "var(--typography-label-medium-regular-line-height)",
  letterSpacing: "var(--typography-label-medium-regular-letter-spacing)",
  textAlign: "center",
};

const sizeRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--spacing-small-s)",
};

const sizePrimaryStyle: CSSProperties = {
  margin: 0,
  color: "var(--color-content-primary)",
  fontFamily: "var(--typography-label-small-regular-font-family)",
  fontWeight: "var(--typography-label-small-regular-font-weight)",
  fontSize: "var(--typography-label-small-regular-font-size)",
  lineHeight: "var(--typography-label-small-regular-line-height)",
  letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
};

const sizeSecondaryStyle: CSSProperties = {
  ...sizePrimaryStyle,
  color: "var(--color-content-secondary)",
};

export default function ProductCard({
  imageSrc,
  imageAlt,
  badge = null,
  badgeVariant = "white",
  productName,
  productCategory,
  description,
  sizeLabel,
  extraModelsLabel = null,
  price,
  quaternaryLabel = null,
  onQuaternaryClick,
  ctaLabel,
  onCtaClick,
  productHref,
}: ProductCardProps) {
  const titleInner = (
    <>
      <span style={productNameStyle}>{productName}</span>
      <span style={productCategoryStyle}>{productCategory}</span>
    </>
  );

  const titleEl = (
    <h2 style={titleHeadingStyle}>
      {productHref ? (
        <Link
          href={productHref}
          className="ds-focus-visible ds-radius-small"
          style={{
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-small-xs)",
            width: "100%",
          }}
        >
          {titleInner}
        </Link>
      ) : (
        titleInner
      )}
    </h2>
  );

  return (
    <article
      className="ds-product-card"
      style={{
        boxSizing: "border-box",
        width: "100%",
        minWidth: 0,
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "var(--color-background-primary)",
      }}
    >
      <div style={mediaStyle}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 300px) 100vw, 300px"
          style={{ objectFit: "cover" }}
        />
        {badge !== null && badge !== undefined && badge !== "" ? (
          <Badge
            label={badge}
            variant={badgeVariant}
            style={badgePositionStyle}
          />
        ) : null}
        {quaternaryLabel ? (
          <div style={quaternaryWrapStyle}>
            <Button
              type="button"
              variant="quaternary"
              size="large"
              label={quaternaryLabel}
              onClick={onQuaternaryClick}
              leadingIcon={<TertiaryNoIcon size={16} />}
              trailingIcon={null}
            />
          </div>
        ) : null}
      </div>

      <div style={bodyStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "stretch",
            gap: "var(--spacing-small-xl)",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignSelf: "stretch",
              gap: "var(--spacing-small-m)",
            }}
          >
            {titleEl}
            <p className="ds-sr-only">{description}</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "stretch",
              alignItems: "center",
              gap: "var(--spacing-small-s)",
            }}
          >
            <div style={sizeRowStyle}>
              <span style={sizePrimaryStyle}>{sizeLabel}</span>
              {extraModelsLabel ? (
                <span style={sizeSecondaryStyle}>{extraModelsLabel}</span>
              ) : null}
            </div>
            <p style={priceStyle}>{price}</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            type="button"
            variant="secondary"
            size="large"
            label={ctaLabel}
            onClick={onCtaClick}
          />
        </div>
      </div>
    </article>
  );
}
