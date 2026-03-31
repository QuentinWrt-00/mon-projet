"use client";

import type { HTMLAttributes } from "react";

import Button from "@/components/ui/Button";

type BlockButtonsBase = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type BlockButtonsProps =
  | (BlockButtonsBase & {
      /** Primary plein + lien tertiary optionnel. */
      variant: "primary-tertiary";
      primaryLabel: string;
      onPrimaryClick?: () => void;
      tertiaryLabel?: string | null;
      onTertiaryClick?: () => void;
    })
  | (BlockButtonsBase & {
      /** Secondary + lien tertiary optionnel. */
      variant: "secondary-tertiary";
      secondaryLabel: string;
      onSecondaryClick?: () => void;
      tertiaryLabel?: string | null;
      onTertiaryClick?: () => void;
    })
  | (BlockButtonsBase & {
      /** Lien tertiary seul. */
      variant: "tertiary";
      tertiaryLabel: string;
      onTertiaryClick?: () => void;
    });

function hasTertiary(
  label: string | null | undefined,
): label is string {
  return label !== null && label !== undefined && label !== "";
}

function BlockButtonsPrimaryTertiary(
  props: Extract<BlockButtonsProps, { variant: "primary-tertiary" }>,
) {
  const {
    variant,
    className,
    primaryLabel,
    onPrimaryClick,
    tertiaryLabel,
    onTertiaryClick,
    ...divProps
  } = props;
  const rootClass = ["ds-block-buttons", className].filter(Boolean).join(" ");
  return (
    <div
      className={rootClass}
      data-block-variant={variant}
      {...divProps}
    >
      <div className="ds-block-buttons__primary">
        <Button
          variant="primary"
          size="large"
          label={primaryLabel}
          onClick={onPrimaryClick}
        />
      </div>
      {hasTertiary(tertiaryLabel) ? (
        <div className="ds-block-buttons__link">
          <Button
            variant="tertiary"
            size="large"
            label={tertiaryLabel}
            onClick={onTertiaryClick}
          />
        </div>
      ) : null}
    </div>
  );
}

function BlockButtonsSecondaryTertiary(
  props: Extract<BlockButtonsProps, { variant: "secondary-tertiary" }>,
) {
  const {
    variant,
    className,
    secondaryLabel,
    onSecondaryClick,
    tertiaryLabel,
    onTertiaryClick,
    ...divProps
  } = props;
  const rootClass = [
    "ds-block-buttons",
    "ds-block-buttons--secondary-link",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      className={rootClass}
      data-block-variant={variant}
      {...divProps}
    >
      <Button
        variant="secondary"
        size="large"
        label={secondaryLabel}
        onClick={onSecondaryClick}
      />
      {hasTertiary(tertiaryLabel) ? (
        <div className="ds-block-buttons__link">
          <Button
            variant="tertiary"
            size="large"
            label={tertiaryLabel}
            onClick={onTertiaryClick}
          />
        </div>
      ) : null}
    </div>
  );
}

function BlockButtonsTertiaryOnly(
  props: Extract<BlockButtonsProps, { variant: "tertiary" }>,
) {
  const { variant, className, tertiaryLabel, onTertiaryClick, ...divProps } =
    props;
  const rootClass = [
    "ds-block-buttons",
    "ds-block-buttons--link-only",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      className={rootClass}
      data-block-variant={variant}
      {...divProps}
    >
      <Button
        variant="tertiary"
        size="large"
        label={tertiaryLabel}
        onClick={onTertiaryClick}
      />
    </div>
  );
}

/**
 * Bloc CTA aligné sur Figma `block-cta` :
 * - [Primary + Link](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=252-5294) : `button-primary` (32px top) + `link` (20px top).
 * - [Secondary + Link](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=294-12752) : racine 24px top, Secondary direct + `link` 20px top.
 * - [Link seul](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=294-12780) : racine 20px top + gap 20px (jeton).
 */
export function BlockButtons(props: BlockButtonsProps) {
  switch (props.variant) {
    case "primary-tertiary":
      return <BlockButtonsPrimaryTertiary {...props} />;
    case "secondary-tertiary":
      return <BlockButtonsSecondaryTertiary {...props} />;
    default:
      return <BlockButtonsTertiaryOnly {...props} />;
  }
}

export default BlockButtons;
