# Style Guide

Guida consolidata per il design system e le convenzioni CSS del progetto.

## Spacing System

Usa sempre e solo questi valori per margin, padding, gap:

| Token | Valore | Uso |
|-------|--------|-----|
| XS | `4px` | Spacing minimo tra elementi molto vicini |
| S | `8px` | Gap standard tra elementi inline correlati |
| M | `12px` | Padding interno componenti, gap tra gruppi piccoli |
| L | `16px` | Gap tra elementi in liste, spacing orizzontale standard |
| XL | `20px` | Margin-bottom default per paragrafi |
| XXL | `24px` | Separazione tra sezioni minori |
| XXXL | `40px` | Separazione tra sezioni principali |

**Regola**: Mai usare valori custom.

## Color System

### Grigi (strutturali)

- `--grey-900`: `#1e293b` - testi principali
- `--grey-700`: `#475569` - testi standard, bordi principali
- `--grey-600`: `#64748b` - testi secondari, icone
- `--grey-500`: `#94a3b8` - bordi secondari, separatori
- `--grey-300`: `#e2e8f0` - background badge
- `--grey-200`: `#f1f5f9` - background leggeri

### Blu (interattivi)

- `--blue-950`: `#0c1e3d` - hover su link
- `--blue-900`: `#1e3a5f` - link standard

### Neutri

- `--white`: `#ffffff` - background principali

## Typography

### Font Families

| Variabile | Font | Uso |
|-----------|------|-----|
| `--font-family-sans` | "Scorekard", sans-serif | Titles, links, UI |
| `--font-family-serif` | "Inter", sans-serif | Text, body content |

### Typography Classes (typography.css)

Usa queste classi per applicare stili tipografici coerenti:

#### Titles (font-sans)

| Classe | Size | Weight | Uso |
|--------|------|--------|-----|
| `.title` | 30px | 900 (black) | Titoli di sezione (h2) |
| `.title.title--md` | 24px | 700 (bold) | Titoli modal, h3 |
| `.title.title--sm` | 21px | 700 (bold) | Sottotitoli, h4 |

#### Text (font-serif)

| Classe | Size | Uso |
|--------|------|-----|
| `.text` | 18px | Corpo testo principale |
| `.text.text--sm` | 15px | Testi secondari, note |
| `.text.text--xs` | 13px | Disclaimer, metadata |

#### Altri

| Classe | Uso |
|--------|-----|
| `.caption` | Didascalie (15px, italic, grey-600) |
| `.label` | Etichette UI (15px, uppercase, grey-600) |

#### Modifiers

- `.text--muted` - Colore grigio-600
- `.text--bold` - Font-weight bold
- `.text--italic` - Italic

### Link Styles

- **Font**: `--font-family-sans`
- **Color**: blue-900, hover blue-950

## Icon System

### Icon Library

Usiamo **Material Symbols Outlined** (filled di default, impostato in `base.css`).

### Icon Sizing

Le icone usano la variabile di font-size **immediatamente superiore** al testo:

| Testo | Icone |
|-------|-------|
| 14px (small) | 16px |
| 16px (base) | 19px |
| 19px (large) | 24px |

### Icon Colors

- **Default**: `var(--grey-700)`
- **Hover**: `var(--grey-900)`
- **Interactive**: `var(--blue-900)`

## Component Heights

Componenti con altezza fissa:

- **Input**: `40px`
- **Button**: `40px` (con `--fixed-height`)
- **Dropdown**: `40px`
- **Badge**: `28px`

## Vertical Alignment

### Usa `align-items: baseline`

- ✅ Testo con testo
- ✅ Testo con badge

### Usa `align-items: center`

- ✅ Icona con testo
- ✅ Elementi di altezza fissa

## BEM Naming

```css
/* Block */
.dropdown { }

/* Element */
.dropdown__select { }
.dropdown__icon { }

/* Modifier */
.dropdown--disabled { }
```

## CSS Rules

### Margin Management

**REGOLA**: I componenti base NON devono MAI avere margin esterni.

```css
/* ❌ SBAGLIATO */
.badge { margin-left: 8px; }

/* ✅ CORRETTO - usa gap sul container */
.container { display: flex; gap: 8px; }
```

**Eccezioni**: heading e paragraph mantengono margin-bottom semantico.

### Display Property

Non sovrascrivere mai il `display` di un componente base nel contesto.

```css
/* ❌ MAI */
.wrapper .button { display: block; }

/* ✅ Usa utility o wrapper */
<div class="block"><button class="button">...</button></div>
```

### Absolute Positioning

Pattern per icone in componenti:

```css
.dropdown {
  position: relative;
  display: inline-block; /* Critico! */
}

.dropdown__icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
```

## Responsive Patterns

### Grid Proporzionali

```css
/* ❌ NO - pixel fissi */
grid-template-columns: 730px 330px;

/* ✅ YES - fr units */
grid-template-columns: 2.2fr 1fr;
```

### Container Responsive

```css
.modal {
  max-width: 1080px;
  width: calc(100% - 40px);
  margin: 20px;
}
```

### Input Flessibili

```css
.input {
  min-width: 150px;
  flex: 1;
}
```

## File Structure

### Ordine import CSS

```html
<!-- 1. Google Fonts -->
<!-- 2. Material Symbols -->
<!-- 3. styles/variables.css -->
<!-- 4. styles/base.css -->
<!-- 5. styles/typography.css -->
<!-- 6. Component CSS -->
```

### Struttura proprietà CSS

```css
.component {
  /* Layout */
  display: ...;
  position: ...;

  /* Box model */
  margin: ...;
  border: ...;
  padding: ...;
  width: ...;
  height: ...;

  /* Typography */
  font-family: ...;
  font-size: ...;
  color: ...;

  /* Visual */
  background-color: ...;
}
```

## Checklist Pre-Modifica

- [ ] Uso valori dal design system (spacing, colors)?
- [ ] Uso il corretto `align-items`?
- [ ] Non sto cambiando `display` di componenti base?
- [ ] Non sto aggiungendo margin esterni a componenti?
- [ ] Uso `gap` invece di margin tra elementi?

