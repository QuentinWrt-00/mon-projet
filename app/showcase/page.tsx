"use client";

import type {
  ComponentProps,
  CSSProperties,
  ReactElement,
  ReactNode,
} from "react";
import { cloneElement, useState } from "react";
import Image from "next/image";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ButtonRounded from "@/components/ui/ButtonRounded";
import Header from "@/components/ui/Header";
import { List, ListItem, ListTitle } from "@/components/ui/List";

type ButtonProps = ComponentProps<typeof Button>;
type ButtonRoundedProps = ComponentProps<typeof ButtonRounded>;

type ShowcasePreviewButton =
  | ReactElement<ButtonProps>
  | ReactElement<ButtonRoundedProps>;

type PreviewState = "hover" | "pressed" | "disabled";

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  color: "var(--color-content-primary)",
  fontFamily: "var(--typography-label-medium-alt-font-family)",
  fontWeight: "var(--typography-label-medium-alt-font-weight)",
  fontSize: "var(--typography-label-medium-alt-font-size)",
  lineHeight: "var(--typography-label-medium-alt-line-height)",
  letterSpacing: "var(--typography-label-medium-alt-letter-spacing)",
};

const demoFieldLabelStyle: CSSProperties = {
  margin: 0,
  color: "var(--color-content-secondary)",
  fontFamily: "var(--typography-label-small-regular-font-family)",
  fontSize: "var(--typography-label-small-regular-font-size)",
  lineHeight: "var(--typography-label-small-regular-line-height)",
  letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
  fontWeight: "var(--typography-label-small-regular-font-weight)",
};

const demoInputStyle: CSSProperties = {
  width: "100%",
  maxWidth: "min(100%, 28rem)",
  boxSizing: "border-box",
  paddingBlock: "var(--spacing-small-s)",
  paddingInline: "var(--spacing-small-m)",
  borderRadius: "var(--radius-small)",
  border: "var(--border-width-extra-small) solid var(--color-border-secondary)",
  backgroundColor: "var(--color-background-primary)",
  color: "var(--color-content-primary)",
  fontFamily: "var(--typography-body-medium-light-font-family)",
  fontSize: "var(--typography-body-medium-light-font-size)",
  lineHeight: "var(--typography-body-medium-light-line-height)",
};

const showcaseNavLinkStyle: CSSProperties = {
  color: "var(--color-content-secondary)",
  fontFamily: "var(--typography-label-small-regular-font-family)",
  fontSize: "var(--typography-label-small-regular-font-size)",
  fontWeight: "var(--typography-label-small-regular-font-weight)",
  lineHeight: "var(--typography-label-small-regular-line-height)",
  letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
  textDecoration: "none",
};

/** Carte de prévisualisation (même principe que `ButtonColumn` / `BadgeShowcaseColumn`). */
const showcasePreviewBlockStyle: CSSProperties = {
  border:
    "var(--border-width-extra-small) solid var(--color-border-secondary)",
  borderRadius: "var(--radius-small)",
  padding: "var(--spacing-small-xl)",
  backgroundColor: "var(--color-background-primary)",
  display: "grid",
  gap: "var(--spacing-small-l)",
  alignContent: "start",
  justifyItems: "stretch",
  width: "100%",
  boxSizing: "border-box",
};

const showcasePreviewColumnTitleStyle: CSSProperties = {
  margin: 0,
  color: "var(--color-content-primary)",
  fontFamily: "var(--typography-label-small-regular-font-family)",
  fontSize: "var(--typography-label-small-regular-font-size)",
  lineHeight: "var(--typography-label-small-regular-line-height)",
  letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
  fontWeight: "var(--typography-label-small-regular-font-weight)",
};

export default function ShowcasePage() {
  const [labelPrimary, setLabelPrimary] = useState("Label");
  const [labelSecondary, setLabelSecondary] = useState("Label");
  const [labelTertiary, setLabelTertiary] = useState("Label");
  const [labelQuaternary, setLabelQuaternary] = useState("Label");
  const [ariaRounded, setAriaRounded] = useState("Action rounded");

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
        <h1
          style={{
            fontFamily: "var(--typography-headline-small-regular-font-family)",
            color: "var(--color-content-primary)",
            fontSize: "var(--typography-headline-small-regular-font-size)",
            lineHeight: "var(--typography-headline-small-regular-line-height)",
            letterSpacing:
              "var(--typography-headline-small-regular-letter-spacing)",
            fontWeight: "var(--typography-headline-small-regular-font-weight)",
          }}
        >
          Composants
        </h1>
        <nav
          aria-label="Sections de la page Composants"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--spacing-small-m) var(--spacing-medium-s)",
            paddingBlock: "var(--spacing-small-s)",
          }}
        >
          <a
            href="#showcase-buttons"
            className="ds-focus-visible ds-radius-small"
            style={showcaseNavLinkStyle}
          >
            Buttons
          </a>
          <a
            href="#showcase-badge"
            className="ds-focus-visible ds-radius-small"
            style={showcaseNavLinkStyle}
          >
            Badge
          </a>
          <a
            href="#showcase-list"
            className="ds-focus-visible ds-radius-small"
            style={showcaseNavLinkStyle}
          >
            List
          </a>
        </nav>
        <ShowcaseCard id="showcase-buttons">
          <h2 style={sectionTitleStyle}>Buttons — Primary</h2>
          <DemoLabelField
            id="demo-label-primary"
            value={labelPrimary}
            onChange={setLabelPrimary}
          />
          <ShowcaseGrid>
            <ButtonColumn
              title="Label only / Large"
              alignPreview="center"
              button={<Button size="large" label={labelPrimary} />}
            />
            <ButtonColumn
              title="Label only / Small"
              alignPreview="center"
              button={<Button size="small" label={labelPrimary} />}
            />
            <ButtonColumn
              title="Label + Prix / Large"
              alignPreview="center"
              button={
                <Button
                  size="large"
                  hasPrice
                  label={labelPrimary}
                  price="100€"
                />
              }
            />
          </ShowcaseGrid>
          <h2
            style={{
              ...sectionTitleStyle,
              marginTop: "var(--spacing-medium-m)",
            }}
          >
            Buttons — Secondary
          </h2>
          <DemoLabelField
            id="demo-label-secondary"
            value={labelSecondary}
            onChange={setLabelSecondary}
          />
          <ShowcaseGrid alignRowItems="stretch">
            <ButtonColumn
              title="Label only / Large"
              alignPreview="center"
              balanceHeight
              button={
                <Button
                  variant="secondary"
                  size="large"
                  label={labelSecondary}
                />
              }
            />
            <ButtonColumn
              title="Label only / Small"
              alignPreview="center"
              balanceHeight
              button={
                <Button
                  variant="secondary"
                  size="small"
                  label={labelSecondary}
                />
              }
            />
            <ButtonColumn
              title="Label + Prix (small alt)"
              alignPreview="center"
              balanceHeight
              button={
                <Button
                  variant="secondary"
                  size="large"
                  hasPrice
                  label={labelSecondary}
                  price="100€"
                />
              }
            />
          </ShowcaseGrid>
          <h2
            style={{
              ...sectionTitleStyle,
              marginTop: "var(--spacing-medium-m)",
            }}
          >
            Buttons — Quaternary
          </h2>
          <DemoLabelField
            id="demo-label-quaternary"
            value={labelQuaternary}
            onChange={setLabelQuaternary}
          />
          <ShowcaseGrid>
            <ButtonColumn
              title="Double icônes"
              alignPreview="center"
              button={<Button variant="quaternary" label={labelQuaternary} />}
            />
            <ButtonColumn
              title="Leading seulement"
              alignPreview="center"
              button={
                <Button
                  variant="quaternary"
                  label={labelQuaternary}
                  trailingIcon={null}
                />
              }
            />
            <ButtonColumn
              title="Trailing seulement"
              alignPreview="center"
              button={
                <Button
                  variant="quaternary"
                  label={labelQuaternary}
                  leadingIcon={null}
                />
              }
            />
          </ShowcaseGrid>
          <h2
            style={{
              ...sectionTitleStyle,
              marginTop: "var(--spacing-medium-m)",
            }}
          >
            Buttons — Tertiary
          </h2>
          <DemoLabelField
            id="demo-label-tertiary"
            value={labelTertiary}
            onChange={setLabelTertiary}
          />
          <ShowcaseGrid>
            <ButtonColumn
              title="Large"
              alignPreview="center"
              button={
                <Button
                  variant="tertiary"
                  size="large"
                  label={labelTertiary}
                />
              }
            />
            <ButtonColumn
              title="Small"
              alignPreview="center"
              button={
                <Button
                  variant="tertiary"
                  size="small"
                  label={labelTertiary}
                />
              }
            />
          </ShowcaseGrid>
          <h2
            style={{
              ...sectionTitleStyle,
              marginTop: "var(--spacing-medium-m)",
            }}
          >
            Buttons — Rounded
          </h2>
          <DemoRoundedAriaField
            id="demo-aria-rounded"
            value={ariaRounded}
            onChange={setAriaRounded}
          />
          <ShowcaseGrid>
            <ButtonColumn
              title="Large"
              alignPreview="center"
              button={
                <ButtonRounded
                  size="large"
                  aria-label={ariaRounded}
                />
              }
            />
            <ButtonColumn
              title="Small"
              alignPreview="center"
              button={
                <ButtonRounded
                  size="small"
                  aria-label={ariaRounded}
                />
              }
            />
          </ShowcaseGrid>
        </ShowcaseCard>
        <ShowcaseCard id="showcase-list">
          <h2 style={sectionTitleStyle}>List</h2>
          <ShowcaseGrid>
            <article style={showcasePreviewBlockStyle}>
              <h3 style={showcasePreviewColumnTitleStyle}>Lignes de liste</h3>
              <List>
                <ListItem
                  topLabel="Top label"
                  label="Label"
                  secondaryLabel="Secondary label"
                  icon={
                    <Image
                      src="/icons/noIcon.svg"
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden
                    />
                  }
                />
              </List>
            </article>
            <article style={showcasePreviewBlockStyle}>
              <h3 style={showcasePreviewColumnTitleStyle}>Titres de liste</h3>
              <ListTitle
                label="Label"
                icon={
                  <Image
                    src="/icons/noIcon.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                  />
                }
              />
            </article>
          </ShowcaseGrid>
        </ShowcaseCard>
        <ShowcaseCard id="showcase-badge">
          <h2 style={sectionTitleStyle}>Badge</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(var(--layout-min-width-button-preview), 1fr))",
              gap: "var(--spacing-medium-s)",
            }}
          >
            <BadgeShowcaseColumn title="Ghost" variant="ghost" />
            <BadgeShowcaseColumn title="Black" variant="black" />
            <BadgeShowcaseColumn title="White" variant="white" surface="dark" />
          </div>
        </ShowcaseCard>
      </main>
    </div>
  );
}

function DemoLabelField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--spacing-small-s)",
        padding: "var(--spacing-small-l)",
        borderRadius: "var(--radius-small)",
        border:
          "var(--border-width-extra-small) dashed var(--color-border-secondary)",
        backgroundColor: "var(--color-background-primary)",
      }}
    >
      <label htmlFor={id} style={demoFieldLabelStyle}>
        Libellé (démo)
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={demoInputStyle}
        autoComplete="off"
      />
    </div>
  );
}

function DemoRoundedAriaField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--spacing-small-s)",
        padding: "var(--spacing-small-l)",
        borderRadius: "var(--radius-small)",
        border:
          "var(--border-width-extra-small) dashed var(--color-border-secondary)",
        backgroundColor: "var(--color-background-primary)",
      }}
    >
      <label htmlFor={id} style={demoFieldLabelStyle}>
        aria-label (démo — bouton icône seul)
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={demoInputStyle}
        autoComplete="off"
      />
    </div>
  );
}

function BadgeShowcaseColumn({
  title,
  variant,
  surface = "default",
}: {
  title: string;
  variant: "ghost" | "black" | "white";
  surface?: "default" | "dark";
}) {
  return (
    <article
      style={{
        border: "var(--border-width-extra-small) solid var(--color-border-secondary)",
        borderRadius: "var(--radius-small)",
        padding: "var(--spacing-small-xl)",
        backgroundColor: "var(--color-background-primary)",
        display: "grid",
        gap: "var(--spacing-small-l)",
        alignContent: "start",
        justifyItems: "center",
        width: "100%",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "var(--color-content-primary)",
          fontFamily: "var(--typography-label-small-regular-font-family)",
          fontSize: "var(--typography-label-small-regular-font-size)",
          lineHeight: "var(--typography-label-small-regular-line-height)",
          letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
          fontWeight: "var(--typography-label-small-regular-font-weight)",
        }}
      >
        {title}
      </h3>
      <div
        style={
          surface === "dark"
            ? {
                display: "inline-flex",
                padding: "var(--spacing-small-xl)",
                borderRadius: "var(--radius-small)",
                backgroundColor: "var(--color-black-300)",
              }
            : undefined
        }
      >
        <Badge variant={variant} label="Label" />
      </div>
    </article>
  );
}

function ShowcaseCard({
  children,
  padding = "var(--spacing-medium-m)",
  id,
}: {
  children: ReactNode;
  padding?: string;
  id?: string;
}) {
  return (
    <article
      id={id}
      style={{
        display: "grid",
        gap: "var(--spacing-medium-l)",
        border: "var(--border-width-extra-small) solid var(--color-border-secondary)",
        borderRadius: "var(--radius-small)",
        padding,
        backgroundColor: "var(--color-background-secondary)",
        ...(id !== undefined
          ? { scrollMarginTop: "var(--spacing-large-m)" }
          : {}),
      }}
    >
      {children}
    </article>
  );
}

function ShowcaseGrid({
  children,
  alignRowItems = "start",
}: {
  children: ReactNode;
  /**
   * `stretch` : toutes les cartes d’une même ligne ont la hauteur de la plus haute.
   * `start` : hauteur au contenu par colonne (évite des cartes vides étirées).
   */
  alignRowItems?: "start" | "stretch";
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(var(--layout-min-width-button-preview), 1fr))",
        gap: "var(--spacing-medium-s)",
        justifyItems: "center",
        alignItems: alignRowItems,
      }}
    >
      {children}
    </div>
  );
}

function ButtonColumn({
  title,
  button,
  alignPreview = "start",
  balanceHeight = false,
}: {
  title?: string;
  button: ShowcasePreviewButton;
  alignPreview?: "start" | "center";
  /**
   * Avec une grille parente en `stretch` : remplit la hauteur et répartit
   * les lignes d’états dans l’espace vertical (évite tout le bloc collé en haut).
   */
  balanceHeight?: boolean;
}) {
  return (
    <article
      style={{
        border: "var(--border-width-extra-small) solid var(--color-border-secondary)",
        borderRadius: "var(--radius-small)",
        padding: "var(--spacing-small-xl)",
        backgroundColor: "var(--color-background-primary)",
        display: "grid",
        gap: "var(--spacing-small-l)",
        alignContent: balanceHeight ? "stretch" : "start",
        justifyItems: alignPreview,
        width: "100%",
        ...(balanceHeight
          ? {
              height: "100%",
              minHeight: 0,
              gridTemplateRows: title ? "auto 1fr" : "1fr",
            }
          : {}),
      }}
    >
      {title ? (
        <h3
          style={{
            margin: 0,
            color: "var(--color-content-primary)",
            fontFamily: "var(--typography-label-small-regular-font-family)",
            fontSize: "var(--typography-label-small-regular-font-size)",
            lineHeight: "var(--typography-label-small-regular-line-height)",
            letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
            fontWeight: "var(--typography-label-small-regular-font-weight)",
          }}
        >
          {title}
        </h3>
      ) : null}
      <div
        style={{
          display: "grid",
          gap: "var(--spacing-small-m)",
          justifyItems: alignPreview,
          ...(balanceHeight
            ? {
                minHeight: 0,
                alignContent: "space-evenly",
              }
            : {}),
        }}
      >
        <StateRow label="Enable" alignPreview={alignPreview}>
          {button}
        </StateRow>
        <StateRow label="Hover" alignPreview={alignPreview}>
          {cloneButton(button, "hover")}
        </StateRow>
        <StateRow label="Pressed" alignPreview={alignPreview}>
          {cloneButton(button, "pressed")}
        </StateRow>
        <StateRow label="Disabled" alignPreview={alignPreview}>
          {cloneButton(button, "disabled")}
        </StateRow>
      </div>
    </article>
  );
}

function StateRow({
  label,
  children,
  alignPreview = "start",
}: {
  label: string;
  children: ReactNode;
  alignPreview?: "start" | "center";
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--spacing-small-s)",
        justifyItems: alignPreview,
      }}
    >
      <span
        style={{
          color: "var(--color-content-secondary)",
          fontFamily: "var(--typography-label-small-regular-font-family)",
          fontSize: "var(--typography-label-small-regular-font-size)",
          lineHeight: "var(--typography-label-small-regular-line-height)",
          letterSpacing: "var(--typography-label-small-regular-letter-spacing)",
          fontWeight: "var(--typography-label-small-regular-font-weight)",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

type PreviewCloneProps = {
  state?: ButtonProps["state"] | ButtonRoundedProps["state"];
  disabled?: boolean;
};

function cloneButton(
  button: ShowcasePreviewButton,
  state: PreviewState,
): ShowcasePreviewButton {
  return cloneElement(button as ReactElement<PreviewCloneProps>, {
    state,
    disabled: state === "disabled",
  }) as ShowcasePreviewButton;
}
