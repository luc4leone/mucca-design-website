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

## Script manuale per popolare Program in home
> npm run generate:program

Requisiti: nel tuo ambiente devono essere presenti:
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
tipicamente in .env.local (lo script prova a caricarlo automaticamente)