import React from 'react';
import { upstash } from '../../../lib/upstash';
import { fmtBTC, fmtCurrency } from '../../../lib/format';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartPageProps {
  params: Promise<{
    asset: string;
  }>;
}

export default async function ChartPage({ params }: ChartPageProps) {
  const { asset } = await params;
  
  // Fetch current price and history
  const [lastPrices, history] = await Promise.all([
    upstash.getLastPrices(),
    upstash.getHistory(asset),
  ]);

  // Get current price for this asset
  const priceKey = `${asset.toUpperCase()}BTC` as keyof typeof lastPrices;
  const currentPrice = lastPrices?.[priceKey];

  // Generate mock data if no history available
  const chartData = history?.map((point) => ({
    date: new Date(point.t).toLocaleDateString(),
    value: parseFloat(point.v.toString()),
  })) || [
    { date: '2024-01-01', value: parseFloat(currentPrice || '0') },
    { date: '2024-01-02', value: parseFloat(currentPrice || '0') },
    { date: '2024-01-03', value: parseFloat(currentPrice || '0') },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-[640px] md:max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-mono terminal-glow">
              {asset.toUpperCase()} / BTC
            </h1>
            <a 
              href="/"
              className="terminal-border bg-black px-4 py-2 text-matrix-bright hover-overlay focus-outline transition-colors inline-block"
            >
              ← Back
            </a>
          </div>
          <p className="text-muted text-sm">
            {fmtCurrency(asset.toUpperCase())} denominated in Bitcoin
          </p>
        </header>

        {/* Current Price */}
        <div className="terminal-border bg-black p-6 mb-6 focus-outline" tabIndex={0}>
          <div className="text-muted text-sm mb-2">Current Price</div>
          <div className="text-matrix-bright text-3xl font-mono terminal-glow">
            {fmtBTC(currentPrice || '0')} BTC
          </div>
        </div>

        {/* Chart */}
        <div className="terminal-border bg-black p-6 focus-outline" tabIndex={0}>
          <div className="text-muted text-sm mb-4">Price History</div>
          <div className="h-96 flex items-center justify-center">
            <div className="text-muted text-center">
              <div className="text-4xl mb-4">📊</div>
              <div>Chart visualization</div>
              <div className="text-sm">Coming soon...</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="terminal-border bg-black p-4 focus-outline" tabIndex={0}>
            <div className="text-muted text-sm mb-2">24h High</div>
            <div className="text-matrix-bright text-xl font-mono">
              {fmtBTC(currentPrice || '0')} BTC
            </div>
          </div>
          <div className="terminal-border bg-black p-4 focus-outline" tabIndex={0}>
            <div className="text-muted text-sm mb-2">24h Low</div>
            <div className="text-matrix-bright text-xl font-mono">
              {fmtBTC(currentPrice || '0')} BTC
            </div>
          </div>
          <div className="terminal-border bg-black p-4 focus-outline" tabIndex={0}>
            <div className="text-muted text-sm mb-2">24h Volume</div>
            <div className="text-matrix-bright text-xl font-mono">
              N/A
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-muted text-xs">
          <p>1 BTC = 1 BTC</p>
        </footer>
      </div>
    </div>
  );
} 