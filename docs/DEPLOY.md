# Deploying CryptoFlow

CryptoFlow is a static Vue SPA. Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

---

## Build

```sh
npm install
npm run build
```

Output: `dist/` — upload or connect to your host.

---

## Vercel (recommended)

1. Import the GitHub repo in [Vercel](https://vercel.com).
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

### SPA routing

Add `vercel.json` at the repo root if client-side routes 404 on refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`

Add `_redirects` in `public/`:

```
/*    /index.html   200
```

---

## Production data APIs

| Source | Dev | Production |
|--------|-----|------------|
| **CoinGecko** | `/coingecko` Vite proxy | Direct `api.coingecko.com` (see `src/api/coingecko.ts`) |
| **Binance WS** | Direct | Direct (`wss://stream.binance.com`) |

CoinGecko free tier has **rate limits**. If production hits 429 errors, add a serverless proxy or cache layer.

Binance public streams require no API key.

---

## Environment variables

None required for the default setup. Optional future vars:

| Variable | Purpose |
|----------|---------|
| `VITE_COINGECKO_BASE` | Override CoinGecko base URL in production |

---

## Post-deploy checklist

- [ ] `/` landing loads
- [ ] `/terminal` dashboard loads and stream connects
- [ ] Dark/light toggle works
- [ ] CoinGecko prices load (check network tab)
- [ ] Hard refresh on `/terminal` does not 404
