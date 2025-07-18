# BTC PEG

A Bitcoin price tracking application with real-time sparklines and historical data.

## Features

- Real-time Bitcoin price tracking across multiple currencies and commodities
- Historical price sparklines powered by Supabase
- Interactive charts with detailed price history
- Responsive design with terminal-themed UI

## Environment Variables

The application requires the following environment variables:

### Redis/Upstash (for real-time data)
- `UPSTASH_REST_URL` - Upstash Redis REST URL
- `UPSTASH_REST_TOKEN` - Upstash Redis REST token

### Supabase (for historical data and sparklines)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key

The Supabase database should have a `prices_monthly` table with the following structure:

```sql
CREATE TABLE prices_monthly (
  month DATE NOT NULL,           -- YYYY-MM-01 (UTC)
  asset TEXT NOT NULL,           -- 'usd','eur','xau','wti','brent', etc.
  btc_value NUMERIC(20,13) NOT NULL,  -- price of ONE unit expressed in BTC
  PRIMARY KEY (month, asset)
);
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

This project uses:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Supabase for historical data storage

## License

MIT 