# BTC PEG - Retro Futurist Bitcoin Terminal

A minimalist, mobile-first webapp that makes users rethink value by denominating **everything** in Bitcoin. Built with Next.js 15 and featuring a "Matrix" retro-futurist terminal aesthetic.

## Features

- **Bitcoin-denominated everything**: All prices shown in BTC
- **Real-time data**: Fetches live data from Upstash Redis
- **Retro terminal design**: Matrix-style green-on-black theme
- **Mobile-first**: Responsive design optimized for mobile devices
- **Network stats**: Bitcoin hashrate, difficulty, and fee information
- **Multi-asset support**: Fiat currencies, precious metals, and commodities
- **Interactive charts**: Click any asset to view detailed price history

## Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Styling**: Tailwind CSS + IBM Plex Mono
- **Charts**: Recharts
- **Data**: Upstash Redis
- **Runtime**: Edge Runtime (Vercel/Cloudflare compatible)

## Quick Start

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd btc-peg
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your Upstash Redis credentials:
   ```
   UPSTASH_REST_URL=https://your-upstash-redis-url.upstash.io
   UPSTASH_REST_TOKEN=your-upstash-redis-token
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Data Structure

The app expects these Redis keys populated by backend workflows:

| Key | TTL | Description |
|-----|-----|-------------|
| `last-prices` | 2300s | Exchange rates (USDBTC, EURBTC, etc.) |
| `btc-network` | 3330s | Network stats (hashrate, difficulty, fees) |
| `last-crudeoil` | 6660s | Oil prices (WTI, Brent) |
| `message` | 24h | Daily message |
| `history:<asset>` | none | Price history for charts |

## Design Philosophy

- **"1 BTC = 1 BTC"**: Bitcoin as the unit of account
- **Terminal aesthetic**: Green-on-black Matrix theme
- **Mobile-first**: Optimized for mobile interaction
- **Minimalist**: Clean, focused interface
- **Performance**: Edge runtime, cached data fetching

## Deployment

Built for edge deployment on Vercel, Cloudflare Pages, or similar platforms:

```bash
npm run build
npm run start
```

## Project Structure

```
/app                 # Next.js App Router pages
  layout.tsx         # Root layout
  page.tsx           # Main landing page
  chart/[asset]/     # Dynamic chart routes
/components          # Reusable UI components
  StatCard.tsx       # Network statistics cards
  Sparkline.tsx      # Header sparkline (flat line)
  PriceRow.tsx       # Price display rows
  Message.tsx        # Daily message component
/lib                 # Utility functions
  upstash.ts         # Redis client wrapper
  format.ts          # Formatting helpers
```

## Contributing

1. Follow the existing code style
2. Test on mobile devices
3. Maintain the terminal aesthetic
4. Keep the Bitcoin-first philosophy

---

*"Fix the money, fix the world."* 