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