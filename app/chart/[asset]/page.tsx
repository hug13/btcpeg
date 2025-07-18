import React from 'react';
import { fetchMonthlyHistory } from '../../../lib/supa';
import { fmtBTC, fmtCurrency } from '../../../lib/format';
import PriceChart from '../../../components/PriceChart';

interface ChartPageProps {
  params: Promise<{
    asset: string;
  }>;
}

export default async function ChartPage({ params }: ChartPageProps) {
  const { asset } = await params;
  
  // Fetch historical data from Supabase
  const historyData = await fetchMonthlyHistory(asset);
  
  // Transform data for chart
  const chartData = historyData.map((point) => ({
    month: new Date(point.month).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    }),
    value: parseFloat(point.btc_value),
    fullDate: point.month
  }));

  // Get current price (latest value)
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].value : 0;

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
            {fmtBTC(currentPrice.toString())} BTC
          </div>
        </div>

        {/* Chart */}
        <div className="terminal-border bg-black p-6 focus-outline" tabIndex={0}>
          <div className="text-muted text-sm mb-4">Price History</div>
          <div className="h-64 md:h-80">
            <PriceChart data={chartData} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="terminal-border bg-black p-4 focus-outline" tabIndex={0}>
            <div className="text-muted text-sm mb-2">Latest Price</div>
            <div className="text-matrix-bright text-xl font-mono">
              {fmtBTC(currentPrice.toString())} BTC
            </div>
          </div>
          <div className="terminal-border bg-black p-4 focus-outline" tabIndex={0}>
            <div className="text-muted text-sm mb-2">Data Points</div>
            <div className="text-matrix-bright text-xl font-mono">
              {chartData.length}
            </div>
          </div>
          <div className="terminal-border bg-black p-4 focus-outline" tabIndex={0}>
            <div className="text-muted text-sm mb-2">Timeframe</div>
            <div className="text-matrix-bright text-xl font-mono">
              Monthly
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