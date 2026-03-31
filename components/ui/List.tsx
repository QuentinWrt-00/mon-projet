import type { ElementType, HTMLAttributes, ReactNode } from "react";

export type ListProps = Omit<HTMLAttributes<HTMLUListElement>, "children"> & {
  children: ReactNode;
};

export type ListTitleProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  /** Libellé (label-medium/regular). */
  label: string;
  /** Slot 20×20 (ex. `noIcon.svg`). */
  icon?: ReactNode;
  /** Balise sémantique du libellé (défaut : `p`). */
  labelAs?: ElementType;
};

/**
 * Titre de liste — rangée icône optionnelle + libellé.
 * [Figma — Icon + Label](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=3701-3296).
 */
export function ListTitle({
  label,
  icon,
  labelAs: LabelTag = "p",
  className,
  ...rest
}: ListTitleProps) {
  const showIcon = icon != null && icon !== false;

  return (
    <div
      className={["ds-list-title", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <div className="ds-list-title__row">
        {showIcon ? (
          <span className="ds-list-title__icon" aria-hidden>
            {icon}
          </span>
        ) : null}
        <LabelTag className="ds-list-title__text">{label}</LabelTag>
      </div>
    </div>
  );
}

/**
 * Liste verticale — conteneur pour {@link ListItem}.
 * [Figma — Icon + Label / liste](https://www.figma.com/design/HGOf3iVWisa3IaMsmcz6I1/Module-Library--Copy-?node-id=247-4911).
 */
export function List({ children, className, ...rest }: ListProps) {
  return (
    <ul
      role="list"
      className={["ds-list", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </ul>
  );
}

export type ListItemProps = Omit<HTMLAttributes<HTMLLIElement>, "children"> & {
  /** Libellé principal (label-medium/regular). */
  label: string;
  /** Ligne au-dessus (label-small/light). */
  topLabel?: string;
  /** Ligne en dessous (label-small/regular). */
  secondaryLabel?: string;
  /** Slot 20×20 (ex. SVG). */
  icon?: ReactNode;
};

/**
 * Ligne de liste : icône optionnelle + bloc texte (top / principal / secondaire optionnels sauf `label`).
 */
export function ListItem({
  label,
  topLabel,
  secondaryLabel,
  icon,
  className,
  ...rest
}: ListItemProps) {
  const showIcon = icon != null && icon !== false;

  return (
    <li
      className={["ds-list-item", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {showIcon ? (
        <span className="ds-list-item__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <div className="ds-list-item__body">
        {topLabel != null && topLabel !== "" ? (
          <div className="ds-list-item__titles">
            <p className="ds-list-item__top-label">{topLabel}</p>
            <p className="ds-list-item__label">{label}</p>
          </div>
        ) : (
          <p className="ds-list-item__label">{label}</p>
        )}
        {secondaryLabel != null && secondaryLabel !== "" ? (
          <p className="ds-list-item__secondary-label">{secondaryLabel}</p>
        ) : null}
      </div>
    </li>
  );
}
