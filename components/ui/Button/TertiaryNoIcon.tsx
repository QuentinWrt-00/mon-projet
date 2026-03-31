"use client";

/** Placeholder Figma `noIcon` — hérite de `color` (ex. `.ds-button__on-surface`). */
export function TertiaryNoIcon({
  className,
  size = 16,
  fill,
}: {
  className?: string;
  /** Taille en px (viewBox inchangé 16×16). */
  size?: number;
  /** Remplit le conteneur dimensionné (ex. 50 % du bouton rounded). */
  fill?: boolean;
}) {
  return (
    <svg
      width={fill ? "100%" : size}
      height={fill ? "100%" : size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M3 12V11.3333H3.66667V12C3.66667 12.1841 3.81591 12.3333 4 12.3333H4.66667V13H4C3.44772 13 3 12.5523 3 12ZM7.33333 12.3333V13H6V12.3333H7.33333ZM10 12.3333V13H8.66667V12.3333H10ZM12.3333 12V11.3333H13V12C13 12.5523 12.5523 13 12 13H11.3333V12.3333H12C12.1841 12.3333 12.3333 12.1841 12.3333 12ZM3.66667 8.66667V10H3V8.66667H3.66667ZM13 8.66667V10H12.3333V8.66667H13ZM3.66667 6V7.33333H3V6H3.66667ZM13 6V7.33333H12.3333V6H13ZM3 4C3 3.44772 3.44772 3 4 3H4.66667V3.66667H4C3.81591 3.66667 3.66667 3.81591 3.66667 4V4.66667H3V4ZM12.3333 4C12.3333 3.81591 12.1841 3.66667 12 3.66667H11.3333V3H12C12.5523 3 13 3.44772 13 4V4.66667H12.3333V4ZM7.33333 3V3.66667H6V3H7.33333ZM10 3V3.66667H8.66667V3H10Z"
        fill="currentColor"
      />
    </svg>
  );
}
