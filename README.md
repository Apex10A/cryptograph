# CryptoFlow

Live crypto terminal demo — CoinGecko market snapshots, Binance WebSocket trades, and a violet command-deck dashboard built with Vue 3.

**Demo:** open `/terminal` after `npm run dev`  
**Repo:** [github.com/Apex10A/cryptograph](https://github.com/Apex10A/cryptograph)

---

## Features

- **Live data** — CoinGecko REST on load + Binance `aggTrade` WebSocket stream
- **Dashboard terminal** — sidebar command deck, bento-grid charts, metric cards with sparklines
- **Charts** — line, area, bar, and candlestick (ECharts), filtered by timeframe
- **Activity feed** — large trades ($25k+) via TanStack Table
- **Aurora Ink theme** — light/dark modes, uncommon typography, glass panels
- **Extras** — onboarding tour, optional trade sounds, Oracle Mode (night cryptic copy)

---

## Stack

| Layer | Tech |
|-------|------|
| UI | Vue 3, TypeScript, Tailwind CSS 4 |
| State | Pinia, VueUse |
| Charts | ECharts, vue-echarts |
| Table | TanStack Vue Table |
| Build | Vite |

---

## Routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/features` | Feature breakdown |
| `/about` | About + disclaimer |
| `/terminal` | Live dashboard |
| `/dashboard` | Redirect → `/terminal` |

---

## Development

**Requirements:** Node.js `^20.19` or `>=22.12`

```sh
npm install
npm run dev
```

Visit `http://localhost:5173`.

### Scripts

```sh
npm run dev       # dev server + HMR
npm run build     # type-check + production build
npm run preview   # preview production build
npm run lint      # ESLint + oxlint
```

### Data in dev

Vite proxies CoinGecko at `/coingecko` to avoid CORS during local development. Binance WebSocket connects directly from the browser.

---

## Keyboard shortcuts (`/terminal`)

| Key | Action |
|-----|--------|
| `1` – `6` | Toggle coin on charts |
| `Space` | Pause / resume stream |
| `R` | Reset view |
| `?` | Show shortcuts overlay |

---

## Deploy

See [docs/DEPLOY.md](docs/DEPLOY.md) for Vercel/Netlify static hosting notes.

---

## Disclaimer

CryptoFlow is for **education and demonstration only**. Not financial advice. Prices may be delayed or inaccurate.

---

## License

MIT (or your chosen license — update as needed)
