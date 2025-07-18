# BTC PEG – Front‑End Build Brief

### Purpose

Deliver a minimalist, mobile‑first “ retro futurist terminal‑looking” webapp that makes users rethink value by denominating **everything** in BTC. Back‑end workflows already populate Upstash Redis with the live data; your job is to consume those keys and present them elegantly.

---

## 1. Current data layer (Upstash)

| Key                        | TTL           | Example Payload                                                                                                              |
| -------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `last-prices`              | 2300 secondes | `{ "USDBTC":"0.00000835…", "EURBTC":"0.00000973…", …, "XAUBTC":"0.0279568", "XAGBTC":"0.0003169", "btc_to_kg_gold":"1.11" }` |
| `btc-network`              | 3330 secondes | `{ "hashrate_eh":930.1, "difficulty_t":126.27, "avg_fee_satvB":4 }`                                                          |
| `last-crudeoil`            | 6660 secondes | `{ "WTI_price_usd":66.72, "WTI_change_pct":0.3, "BRENT_price_usd":68.79, "BRENT_change_pct":0.12 }`                          |
| (future) `message`         | 24 h          | `{ "text":"Fix the money, fix the world.", "ts":... }`                                                                       |
| (future) `history:<asset>` | none          | `[ {"t":"2020-01-01","v":0.00012}, … ]`                                                                                      |

*All values are **********strings********** in Redis → parse JSON once fetched.*

### Access pattern

Edge‑runtime fetch → `GET {UPSTASH_REST_URL}/get/<key>` with `Authorization: Bearer {UPSTASH_REST_TOKEN}`. No body.

---

## 2. Target stack & coding guard‑rails

| Layer      | Choice                                                     | Notes                                           |
| ---------- | ---------------------------------------------------------- | ----------------------------------------------- |
| Framework  | **Next.js 15** (App Router, RSC, TypeScript strict)        | Edge runtime only—no Node APIs.                 |
| Styling    | **Tailwind CSS** + IBM Plex Mono                           | “Matrix” monochrome palette (#0f0, #0a0, #090). |
| Charts     | **Recharts**                                               | SSR‑friendly, lightweight.                      |
| State      | React Server Components + hooks; no Redux.                 |                                                 |
| Data fetch | `fetch()` from Upstash REST; cache with `revalidate: 300`. |                                                 |

### Folder sketch

```
/app
  layout.tsx
  page.tsx                  # landing
  chart/[asset]/page.tsx     # SSR chart route
/components
  StatCard.tsx
  Sparkline.tsx
  PriceRow.tsx
  Message.tsx
/lib
  upstash.ts        # thin fetch wrapper
  format.ts         # helpers (fmtBTC, fmtPercent)
```

---

## 3. UX / UI requirements

| Zone              | Behaviour                                                                                         | Data                                  |                                                         |                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------- | ------------------------------------- |
| **Header**        | “1 BTC = 1 BTC” + **flat** sparkline (straight SVG line, no history fetch) ; subtitle “≈ X kg Au” | `btc_to_kg_gold` (from `last-prices`) | “1 BTC = 1 BTC” + small sparkline; subtitle “≈ X kg Au” | `btc_to_kg_gold` (from `last-prices`) |
| **Network stats** | 3 StatCards: *Hashrate EH/s*, *Difficulty T*, *Avg fee sat/vB*                                    | `btc-network`                         |                                                         |                                       |
| **Fiat list**     | Table rows USD, EUR, GBP, CHF, JPY, CNY in BTC; tap opens `/chart/[asset]`                        | `last-prices` + `history:*`           |                                                         |                                       |
| **Commodities**   | Similar rows XAU, XAG, WTI, Brent; tap → chart                                                    | same                                  |                                                         |                                       |
| **Daily message** | Green italics, bottom of page                                                                     | `message`                             |                                                         |                                       |

*All tap interactions should open a full‑width modal on mobile; desktop >770 px can navigate to dedicated route.*
