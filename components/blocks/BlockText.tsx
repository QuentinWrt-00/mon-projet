import type { HTMLAttributes } from "react";

export type BlockTextAlign = "center" | "left";

export type BlockTextProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  /** Figma : `Alignement=Center` | `Alignement=Left`. */
  align?: BlockTextAlign;
  overtitle?: string | null;
  /** Titre principal — `headline-medium/regular`. */
  headline?: string | null;
  subtitle?: string | null;
  /** Corps — `body-large/light`. */
  body?: string | null;
  supportingLabel?: string | null;
};

/**
 * Bloc texte informatif (Figma `block-text` — [Module Library](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=251-5059)).
 * Styles : `globals.css` (`.ds-block-text`, hors `@layer` pour les typos sur `h2` / `p`).
 * Pas de CTA : les règles de hiérarchie des boutons du DESIGN-SYSTEM ne s’appliquent pas.
 */
export default function BlockText({
  align = "center",
  overtitle = null,
  headline = null,
  subtitle = null,
  body = null,
  supportingLabel = null,
  className,
  ...rest
}: BlockTextProps) {
  const rootClass = ["ds-block-text", className].filter(Boolean).join(" ");

  return (
    <div className={rootClass} data-align={align} {...rest}>
      {overtitle !== null && overtitle !== undefined && overtitle !== "" ? (
        <p className="ds-block-text__overtitle">{overtitle}</p>
      ) : null}
      {headline !== null && headline !== undefined && headline !== "" ? (
        <h2 className="ds-block-text__headline">{headline}</h2>
      ) : null}
      {subtitle !== null && subtitle !== undefined && subtitle !== "" ? (
        <p className="ds-block-text__subtitle">{subtitle}</p>
      ) : null}
      {body !== null && body !== undefined && body !== "" ? (
        <p className="ds-block-text__body">{body}</p>
      ) : null}
      {supportingLabel !== null &&
      supportingLabel !== undefined &&
      supportingLabel !== "" ? (
        <p className="ds-block-text__supporting">{supportingLabel}</p>
      ) : null}
    </div>
  );
}
