"use client";

import Button from "@/components/ui/Button";
import type { HTMLAttributes } from "react";

type BlockButtonsBase = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type BlockButtonsProps =
  | (BlockButtonsBase & {
      variant: "primary-tertiary";
      primaryLabel: string;
      onPrimaryClick?: () => void;
      tertiaryLabel?: string | null;
      onTertiaryClick?: () => void;
    })
  | (BlockButtonsBase & {
      variant: "secondary-tertiary";
      secondaryLabel: string;
      onSecondaryClick?: () => void;
      tertiaryLabel?: string | null;
      onTertiaryClick?: () => void;
    })
  | (BlockButtonsBase & {
      variant: "tertiary";
      tertiaryLabel: string;
      onTertiaryClick?: () => void;
    });

function hasTertiary(
  label: string | null | undefined,
): label is string {
  return label !== null && label !== undefined && label !== "";
}

/**
 * Bloc CTA aligné sur Figma `block-cta` :
 * - [Primary + Link](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=252-5294) : `button-primary` (32px top) + `link` (20px top).
 * - [Secondary + Link](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=294-12752) : racine 24px top, Secondary direct + `link` 20px top.
 * - [Link seul](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=294-12780) : racine 20px top + gap 20px (jeton).
 */
export default function BlockButtons(props: BlockButtonsProps) {
  if (props.variant === "primary-tertiary") {
    const {
      variant: _variant,
      className,
      primaryLabel,
      onPrimaryClick,
      tertiaryLabel,
      onTertiaryClick,
      ...divProps
    } = props;
    const rootClass = ["ds-block-buttons", className].filter(Boolean).join(" ");
    return (
      <div className={rootClass} {...divProps}>
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

  if (props.variant === "secondary-tertiary") {
    const {
      variant: _variant,
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
      <div className={rootClass} {...divProps}>
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

  const {
    variant: _variant,
    className,
    tertiaryLabel,
    onTertiaryClick,
    ...divProps
  } = props;
  const rootClass = [
    "ds-block-buttons",
    "ds-block-buttons--link-only",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={rootClass} {...divProps}>
      <Button
        variant="tertiary"
        size="large"
        label={tertiaryLabel}
        onClick={onTertiaryClick}
      />
    </div>
  );
}
