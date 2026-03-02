# Istruzioni per AI Assistant

Questo file contiene le regole e checklist da seguire quando lavori su questo progetto.

## 📚 Documentation Structure

### File da leggere prima di ogni task

1. **`AI_INSTRUCTIONS.md`** (questo file) - Processi, workflow, checklist
2. **`STYLE_GUIDE.md`** - Spacing, colors, typography, icons, convenzioni CSS
3. **`ROUGH_NOTATION.md`** - Documentazione libreria per annotazioni hand-drawn

## Struttura Progetto

```
/website
├── index.html              ← Home page
├── designsystem.html       ← Catalogo componenti (entry point design system)
├── /components/{nome}/     ← Ogni componente in cartella dedicata
│   ├── {nome}.css          ← Stili del componente
│   ├── demo.html           ← Pagina demo
│   └── {nome}.js           ← (opzionale) JavaScript
├── /reference/             ← Pagine di riferimento (colors, icons, type)
├── /styles/                ← Stili globali (variables, base, typography)
└── /docs/                  ← Documentazione
```

## Checklist Pre-Modifica

### 📖 Documentazione

- [ ] Ho letto `AI_INSTRUCTIONS.md`
- [ ] Ho letto `STYLE_GUIDE.md`

### ✅ Verifica tecnica

- [ ] Uso valori dal design system (`var(--spacing-*)`, `var(--grey-*)`)
- [ ] Non sto cambiando `display` di componenti base
- [ ] Componenti NON hanno margin esterni
- [ ] Uso `gap` invece di margin tra elementi
- [ ] Uso `align-items: baseline` per testo, `center` per icone

## Regole Critiche

### 1. Display Property è Sacro

```css
/* ❌ MAI */
.existing-component { display: block; }

/* ✅ Usa wrapper */
<div class="block"><div class="existing-component"></div></div>
```

### 2. Margin Management

```css
/* ❌ SBAGLIATO - margin su componente */
.badge { margin-left: 8px; }

/* ✅ CORRETTO - gap sul container */
.container { display: flex; gap: 8px; }
```

**Eccezioni**: heading e paragraph mantengono margin-bottom semantico.

### 3. Allineamento Verticale

```css
/* Testo + Testo/Badge */
.container { align-items: baseline; }

/* Icona + Testo */
.container { align-items: center; }
```

### 4. Posizionamento Absolute

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

## Template Demo Componenti

### Struttura HTML

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NomeComponente</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../styles/variables.css" />
    <link rel="stylesheet" href="../../styles/base.css" />
    <link rel="stylesheet" href="../../styles/typography.css" />
    <link rel="stylesheet" href="./{nome}.css" />
    <link rel="stylesheet" href="../link/link.css" />
    <link rel="stylesheet" href="../breadcrumb/breadcrumb.css" />
  </head>
  <body>
    <nav class="breadcrumb">
      <a href="../../designsystem.html" class="link">home</a>
      <span class="breadcrumb__separator">&lt;</span>
      <span class="breadcrumb__current">nome-componente</span>
    </nav>

    <!-- Componente demo -->
    <div class="componente">...</div>

    <script>
      // Auto-hide navigation quando embedded
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("embedded") === "true") {
        document.querySelector(".breadcrumb").style.display = "none";
      }
    </script>
  </body>
</html>
```

### Regole Demo

1. **❌ MAI titoli h1/h2/h3** - il breadcrumb identifica la componente
2. **✅ Breadcrumb standard**: `home < nome-componente`
3. **✅ Componenti inline**: wrappali in un div

## Processo di Modifica

### Step 1: Analisi

1. Identificare tutti i file dove la componente è usata
2. Capire il problema (spacing? allineamento? posizionamento?)
3. Identificare la causa root

### Step 2: Soluzione

Priorità (dalla migliore alla peggiore):

1. Utility class esistente
2. Nuova utility class
3. Modificare componente base (se non rompe altro)
4. Context override (ultimo resort)

### Step 3: Verifica

- [ ] Rispetta STYLE_GUIDE.md?
- [ ] Usa variabili CSS?
- [ ] Se nuova componente: aggiornato `designsystem.html`?

## Red Flags

Se stai facendo una di queste cose, **FERMATI**:

- ⛔ Aggiungendo margin esterni a componenti base
- ⛔ Cambiando `display` senza verificare tutti gli usi
- ⛔ Usando valori hardcoded invece di variabili
- ⛔ Creando override con 3+ livelli di specificità
- ⛔ Aggiungendo `!important`

## Response Format

Dopo una modifica:

```
✅ Ho risolto [problema] modificando [file]

**Problema**: [causa root]
**Soluzione**: [cosa è stato fatto]
**Verifica**: [cosa controllare]
```

## Rough Notation

Libreria per creare annotazioni hand-drawn (underline, circle, box, highlight, etc.).

### Setup

```html
<script src="https://unpkg.com/rough-notation/lib/rough-notation.iife.js"></script>
```

### Uso Base

```javascript
// Wrappa il testo da annotare in uno span con id
// <span id="mio-elemento">testo</span>

const elemento = document.querySelector('#mio-elemento');
const annotation = RoughNotation.annotate(elemento, {
  type: 'circle',    // underline, box, circle, highlight, strike-through, crossed-off, bracket
  animate: false,    // true per animazione
  color: 'currentColor'
});
annotation.show();
```

### Tipi disponibili

- `underline` - sottolineatura sketchy
- `box` - box attorno all'elemento
- `circle` - cerchio attorno all'elemento
- `highlight` - effetto evidenziatore
- `strike-through` - linea orizzontale che attraversa
- `crossed-off` - X sull'elemento
- `bracket` - parentesi (configurabile: left, right, top, bottom)

### Opzioni comuni

| Opzione | Default | Descrizione |
|---------|---------|-------------|
| `animate` | `true` | Abilita/disabilita animazione |
| `animationDuration` | `800` | Durata animazione in ms |
| `color` | `currentColor` | Colore del tratto |
| `strokeWidth` | `1` | Spessore del tratto |
| `padding` | `5` | Padding in px (o array [top, right, bottom, left]) |

Per documentazione completa: `docs/ROUGH_NOTATION.md`

## Escalation

Se la modifica richiede cambiamenti a 5+ file o refactoring sostanziale, **CHIEDI** prima all'utente.
