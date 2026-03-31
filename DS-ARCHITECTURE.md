# DS-ARCHITECTURE.md — Architecture du Design System

> Fichier réutilisable sur tous les projets.
> Définit la structure des tokens, collections Figma,
> et la convention de nommage Figma → CSS.
> Pour les règles d'usage spécifiques au projet,
> voir DESIGN-RULES.md.

---

## ⚠️ RÈGLES DE CRÉATION — OBLIGATOIRES

### Ordre des collections
Les collections doivent être créées dans cet ordre exact :
```javascript
const collections = [
  "Fondations",
  "Typographie",
  "Theme-color",
  "Effets"
];
```

### Nommage des variables
```javascript
// ❌ INTERDIT — crée un chemin dupliqué
// Collection "Fondations" + variable "Fondations/colors/black"
// → génère Fondations/Fondations/colors/black

// ✅ CORRECT
// Collection "Fondations" + variable "colors/black"
// → génère Fondations/colors/black
```

---

## 1. Fondations

Valeurs atomiques brutes. Jamais utilisées
directement dans les composants.

### Colors
```javascript
// Nommage : "color/neutral-[valeur]"
// Ramp du plus sombre (0) au plus clair (600)
const colors = {
  "color/neutral-0":   "#000000",
  "color/neutral-100": "#333333",
  "color/neutral-200": "#666666",
  "color/neutral-250": "#595959",  // intermédiaire — disabled bg
  "color/neutral-300": "#9E9E9E",
  "color/neutral-350": "#BDBDBD",  // intermédiaire — disabled label
  "color/neutral-400": "#C8C8C8",
  "color/neutral-500": "#F8F8F8",
  "color/neutral-600": "#FFFFFF",
  // Sémantiques
  "color/green": "#03A536",
  "color/red":   "#D13037",
  "color/alert": "#F59E0B"
};
// scopes: ["ALL_FILLS"]
```

### Spacing
```javascript
// Nommage : "spacing/[taille]-[nuance]"
const spacing = {
  "spacing/small-xs":  2,
  "spacing/small-s":   4,
  "spacing/small-m":   8,
  "spacing/small-l":   12,
  "spacing/small-xl":  16,
  "spacing/medium-xs": 20,
  "spacing/medium-s":  24,
  "spacing/medium-m":  32,
  "spacing/medium-l":  40,
  "spacing/medium-xl": 48,
  "spacing/large-xs":  56,
  "spacing/large-s":   64,
  "spacing/large-m":   80,
  "spacing/large-l":   120,
  "spacing/large-xl":  160
};
// scopes: ["WIDTH_HEIGHT", "GAP"]
```

### Border width
```javascript
// Nommage : "border-width/[nom]"
const borderWidth = {
  "border-width/extra-small": 1,
  "border-width/small":       1.5,
  "border-width/medium":      2,
  "border-width/large":       3,
  "border-width/extra-large": 4
};
// scopes: ["STROKE_WEIGHT"]
```

### Border radius
```javascript
// Nommage : "border-radius/[nom]"
const borderRadius = {
  "border-radius/small": 4,
  "border-radius/full":  999
};
// scopes: ["CORNER_RADIUS"]
```

### Opacity
```javascript
// Nommage : "opacity/[nom]"
const opacity = {
  "opacity/opaque":      1,
  "opacity/very-high":   0.95,
  "opacity/high":        0.75,
  "opacity/medium":      0.5,
  "opacity/low":         0.25,
  "opacity/very-low":    0.1,
  "opacity/transparent": 0
};
// scopes: ["OPACITY"]
```

### Motion
```javascript
// Nommage : "motion/duration/[nom]" et "motion/ease/[nom]"
const motion = {
  "motion/duration/fast":    200,
  "motion/duration/default": 400,
  "motion/duration/slow":    600,
  "motion/ease/in":          "cubic-bezier(0.76, 0, 1, 1)",
  "motion/ease/out":         "cubic-bezier(0, 0, 0.24, 1)",
  "motion/ease/in-out":      "cubic-bezier(0.76, 0, 0.24, 1)",
  "motion/ease/both":        "cubic-bezier(0.31, 0, 0.13, 1)"
};
// scopes: ["ALL_SCOPES"]
```

---

## 2. Typographie

Styles composites — valeurs brutes directement dans
la collection, y compris font-family.
Jamais de référence vers Fondations.
```javascript
// Nommage : "[style]/[propriété]"
// Styles : headline-xl/l/m/s — body-l/m/s — label-l/m/s
// Propriétés : size, weight, line-height, letter-spacing, family
// Font family : "family/[nom]"
```

### Convention CSS (OBLIGATOIRE)
Les variables CSS générées pour Typographie utilisent le préfixe
`--font-` (et non `--typo-`).

```css
/* ✅ CORRECT */
--font-body-m-size: 16px;
--font-body-m-weight: 400;
--font-body-m-line-height: 24px;
--font-body-m-letter-spacing: 0;
--font-body-m-family: var(--font-family-principale);

/* ❌ INTERDIT */
--typo-body-m-size: 16px;
```

---

## 3. Theme-color

Une seule collection, deux modes : onLight / onDark.
Pas de sous-catégorie supplémentaire — groupes directement
à la racine du mode.

### Un seul attribut de contexte

| Attribut | Valeurs | Usage |
|---|---|---|
| `data-context` | `onLight` / `onDark` | Sur `<html>` (global) ou sur une section (local) |

> ⚠️ Il n'existe qu'un seul `data-theme`. Les modes CSS sont
> pilotés **uniquement** par `data-context="onLight"` et
> `data-context="onDark"`. Ne pas générer de sélecteur
> `[data-theme="light"]` / `[data-theme="dark"]`.

### Variables et scopes
```javascript
// Content — scopes: ["TEXT_FILL", "SHAPE_FILL"]
"content/primary"
"content/secondary"
"content/tertiary"

// Border — scopes: ["STROKE_COLOR"]
"border/primary"
"border/secondary"
"border/tertiary"

// Background — scopes: ["FRAME_FILL"]
"background/primary"
"background/secondary"
"background/tertiary"
"background/quaternary"

// Overlay — scopes: ["ALL_FILLS", "OPACITY"]
"overlay/soft"
"overlay/medium"
"overlay/strong"

// State — background/couleur du composant interactif — scopes: ["TEXT_FILL", "SHAPE_FILL", "FRAME_FILL"]
"state/enable"
"state/hover"
"state/pressed"
"state/disabled"

// On-state — contenu posé sur le composant interactif — scopes: ["TEXT_FILL", "SHAPE_FILL"]
"on-state/enable"
"on-state/hover"
"on-state/pressed"
"on-state/disabled"

// Sémantiques — scopes: ["TEXT_FILL", "SHAPE_FILL", "FRAME_FILL"]
"state/approved"
"state/alert"
"state/error"
```

### Convention de nommage CSS — Fondations (OBLIGATOIRE)

Les variables CSS issues de la collection **Fondations** utilisent
directement le nom du token sans préfixer le nom de la collection.

```css
/* ✅ CORRECT — token "color/neutral-0" → --color-neutral-0 */
--color-neutral-0: #000000;

/* ❌ INTERDIT — le nom de collection ne doit PAS être préfixé */
--fondations-color-neutral-0: #000000;
```

La règle : `[collection]/[groupe]/[nom]` → `--[groupe]-[nom]`
(le segment `[collection]` est supprimé).

### Valeurs CSS générées
```css
[data-context="onLight"] {
  --content-primary:        var(--color-neutral-0);
  --content-secondary:      var(--color-neutral-200);
  --content-tertiary:       var(--color-neutral-300);
  --border-primary:         var(--color-neutral-0);
  --border-secondary:       var(--color-neutral-200);
  --border-tertiary:        var(--color-neutral-300);
  --background-primary:     var(--color-neutral-600);
  --background-secondary:   var(--color-neutral-500);
  --background-tertiary:    var(--color-neutral-400);
  --background-quaternary:  var(--color-neutral-350);
  --overlay-soft:           var(--opacity-low);
  --overlay-medium:         var(--opacity-medium);
  --overlay-strong:         var(--opacity-high);
  /* state */
  --state-enable:           var(--color-neutral-0);
  --state-hover:            var(--color-neutral-100);
  --state-pressed:          var(--color-neutral-200);
  --state-disabled:         var(--color-neutral-250);
  --state-approved:         var(--color-green);
  --state-alert:            var(--color-alert);
  --state-error:            var(--color-red);
  /* on-state */
  --on-state-enable:        var(--color-neutral-600);
  --on-state-hover:         var(--color-neutral-600);
  --on-state-pressed:       var(--color-neutral-600);
  --on-state-disabled:      var(--color-neutral-350);
}

[data-context="onDark"] {
  --content-primary:        var(--color-neutral-600);
  --content-secondary:      var(--color-neutral-400);
  --content-tertiary:       var(--color-neutral-300);
  --border-primary:         var(--color-neutral-600);
  --border-secondary:       var(--color-neutral-400);
  --border-tertiary:        var(--color-neutral-300);
  --background-primary:     var(--color-neutral-0);
  --background-secondary:   var(--color-neutral-100);
  --background-tertiary:    var(--color-neutral-200);
  --background-quaternary:  var(--color-neutral-250);
  --overlay-soft:           var(--opacity-low);
  --overlay-medium:         var(--opacity-medium);
  --overlay-strong:         var(--opacity-high);
  /* state */
  --state-enable:           var(--color-neutral-600);
  --state-hover:            var(--color-neutral-500);
  --state-pressed:          var(--color-neutral-400);
  --state-disabled:         var(--color-neutral-250);
  --state-approved:         var(--color-green);
  --state-alert:            var(--color-alert);
  --state-error:            var(--color-red);
  /* on-state */
  --on-state-enable:        var(--color-neutral-0);
  --on-state-hover:         var(--color-neutral-0);
  --on-state-pressed:       var(--color-neutral-0);
  --on-state-disabled:      var(--color-neutral-350);
}
```

---

## 4. Effets

Valeurs non contextuelles — identiques en onLight et onDark.
```javascript
// Nommage : "[type]/[nom]"
const effets = {
  "shadow/soft":   "...",
  "shadow/medium": "...",
  "shadow/strong": "...",
  "blur/soft":     "...",
  "blur/medium":   "...",
  "blur/strong":   "..."
};
```