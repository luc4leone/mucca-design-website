# Lanciare il progetto in locale

## Prima volta (setup)

Da root del progetto (`/Users/luca/Sync/_BREVE/mucca/website`):

```bash
npm install
```

## Avvio in sviluppo

```bash
npm run dev
```

Poi apri:

- `http://localhost:3000`

## Note utili

- **La landing `/`** viene servita da `public/index.html` (rewrite in `next.config.js`), quindi la vedrai direttamente su `http://localhost:3000/`.
- Se vuoi una install “pulita” e riproducibile (quando c’è un lockfile), puoi usare:
  ```bash
  npm ci
  ```
  al posto di `npm install`.
