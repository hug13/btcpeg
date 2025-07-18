\### Task — add real sparklines to BTC PEG
*(all instructions in English for Cursor)*

---

#### 1. Data source

* Supabase table `prices_monthly`
* Shape :

```sql
month  | DATE  -- YYYY‑MM‑01  (UTC)
asset  | TEXT  -- 'usd','eur','xau','wti','brent',…
btc_value | NUMERIC(20,13)  -- price of ONE unit expressed in BTC
PRIMARY KEY (month, asset)
```

* Exactly **one row per month per asset** (latest quote wins, thanks to upsert).

---

#### 2. Fetching helper (server side)

```ts
// lib/supa.ts
type PricePt = { month: string; btc_value: string };

export async function fetchMonthlyHistory(asset: string): Promise<PricePt[]> {
  const url =
    `${process.env.SUPABASE_URL}/rest/v1/prices_monthly` +
    `?asset=eq.${asset}&select=month,btc_value&order=month`;
  const r = await fetch(url, {
    headers: { apikey: process.env.SUPABASE_ANON_KEY },
    // cache one day – data moves daily
    next: { revalidate: 86_400 }
  });
  return r.json();
}
```

*Returned list is chronologically ordered; each `btc_value` is a string we can
`parseFloat` on the client.*

---

#### 3. UI integration

| Where                     | What to render                                                |
| ------------------------- | ------------------------------------------------------------- |
| **/chart/\[asset]** route | Full‑width LineChart – height 260 px mobile, 360 px desktop.  |

###### Implementation details

```tsx
// components/Sparkline.tsx  (client)
'use client';
import { useMemo } from 'react';
import { LineChart, Line } from 'recharts';

export default function Sparkline({ data }: { data: { btc: number }[] }) {
  const points = useMemo(
    () => data.map((d, i) => ({ x: i, y: d.btc })),
    [data]
  );
  return (
    <LineChart width={80} height={20} data={points}>
      <Line
        type="monotone"
        dataKey="y"
        stroke="#22ff55"
        strokeWidth={1}
        dot={false}
      />
    </LineChart>
  );
}
```

*Server component wrapper*

```tsx
import Sparkline from '@/components/Sparkline';
import { fetchMonthlyHistory } from '@/lib/supa';

export async function PriceRow({ asset }: { asset: string }) {
  const raw = await fetchMonthlyHistory(asset);
  const data = raw.map(r => ({ btc: parseFloat(r.btc_value) }));
  const latest = data[data.length - 1].btc.toLocaleString('en-US', {
    maximumFractionDigits: 13
  });

  return (
    <tr className="group cursor-pointer">
      <td className="py-2">{asset.toUpperCase()}</td>
      <td className="text-right font-mono">{latest}</td>
      <td>
        <Sparkline data={data} />
      </td>
    </tr>
  );
}
```

*Row click navigates to `/chart/[asset]`.*

---
