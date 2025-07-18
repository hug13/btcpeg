'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { fmtBTC } from '../lib/format';

interface PriceChartProps {
  data: Array<{
    month: string;
    value: number;
    fullDate: string;
  }>;
}

export default function PriceChart({ data }: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-muted text-center">
          <div className="text-4xl mb-4">📊</div>
          <div>No historical data available</div>
          <div className="text-sm">Check back later for updates</div>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis 
          dataKey="month" 
          tick={{ fill: '#888', fontSize: 12 }}
          axisLine={{ stroke: '#333' }}
          tickLine={{ stroke: '#333' }}
        />
        <YAxis 
          tick={{ fill: '#888', fontSize: 12 }}
          axisLine={{ stroke: '#333' }}
          tickLine={{ stroke: '#333' }}
          tickFormatter={(value) => fmtBTC(value.toString())}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#000', 
            border: '1px solid #333',
            borderRadius: '4px',
            color: '#fff'
          }}
          formatter={(value: number) => [fmtBTC(value.toString()) + ' BTC', 'Price']}
          labelStyle={{ color: '#888' }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#22ff55"
          strokeWidth={2}
          dot={{ fill: '#22ff55', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#22ff55', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
} 