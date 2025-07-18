import React from 'react';
import { upstash } from '../lib/upstash';
import { fmtHashrate, fmtDifficulty } from '../lib/format';
import StatCard from '../components/StatCard';
import Sparkline from '../components/Sparkline';
import PriceRowClient from '../components/PriceRowClient';
import Message from '../components/Message';


export const revalidate = 0;      // Always fetch fresh data

export default async function Home() {
  const [lastPrices, btcNetwork, crudeOil, dailyMessage] = await Promise.all([
    upstash.getLastPrices(),   // wrapper uses fetch()
    upstash.getBtcNetwork(),
    upstash.getCrudeOil(),
    upstash.getDailyMessage(),
  ]);

  // Fiat currencies to display
  const fiatCurrencies = ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'CNY'];
  
  // Commodities to display
  const commodities = ['XAU', 'XAG'];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-[640px] md:max-w-none mx-auto">
        
        {/* Header */}
        <header className="text-center py-8">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-mono terminal-glow mb-4">
              1 BTC = 1 BTC
            </h1>
            <div className="flex justify-center mb-4">
              <Sparkline width={600} height={130} />
            </div>
          </div>
          <p className="text-muted text-sm">
            1 BTC ≈ {lastPrices?.btc_to_kg_gold || '0.00'} kg of GOLD
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="md:grid md:grid-cols-2 md:gap-8 space-y-6 md:space-y-0">
          
          {/* Left Column: Network + Fiat */}
          <div className="space-y-6">
            {/* Network Stats */}
            <section>
              <h2 className="section-title">
                Network Status
              </h2>
              <div className="flex gap-2">
                <StatCard
                  title="Hashrate"
                  value={btcNetwork ? fmtHashrate(btcNetwork.hashrate_eh) : '0 EH/s'}
                  className="flex-1 p-2"
                />
                <StatCard
                  title="Difficulty"
                  value={btcNetwork ? fmtDifficulty(btcNetwork.difficulty_t) : '0 T'}
                  className="flex-1 p-2"
                />
                <StatCard
                  title="Avg Fees"
                  value={btcNetwork ? btcNetwork.avg_fee_satvB.toString() : '0'}
                  unit="sat/vB"
                  className="flex-1 p-2"
                />
              </div>
            </section>

            {/* Fiat Currencies */}
            <section>
              <h2 className="section-title">
                Fiat Currencies
              </h2>
              <div className="space-y-0">
                {fiatCurrencies.map((currency) => {
                  const priceKey = `${currency}BTC` as keyof typeof lastPrices;
                  const price = lastPrices?.[priceKey];
                  return (
                    <PriceRowClient
                      key={currency}
                      currency={currency}
                      btcPrice={price || '0'}
                    />
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Commodities + Message */}
          <div className="space-y-6">
            {/* Commodities */}
            <section>
              <h2 className="section-title">
                Commodities
              </h2>
              <div className="space-y-0">
                {commodities.map((commodity) => {
                  const priceKey = `${commodity}BTC` as keyof typeof lastPrices;
                  const price = lastPrices?.[priceKey];
                  return (
                    <PriceRowClient
                      key={commodity}
                      currency={commodity}
                      btcPrice={price || '0'}
                    />
                  );
                })}
                
                {/* Oil Prices */}
                {crudeOil && (
                  <>
                    <PriceRowClient
                      currency="WTI"
                      btcPrice={(1 / crudeOil.WTI_price_usd * parseFloat(lastPrices?.USDBTC || '0')).toFixed(8)}
                      changePercent={crudeOil.WTI_change_pct}
                    />
                    <PriceRowClient
                      currency="BRENT"
                      btcPrice={(1 / crudeOil.BRENT_price_usd * parseFloat(lastPrices?.USDBTC || '0')).toFixed(8)}
                      changePercent={crudeOil.BRENT_change_pct}
                    />
                  </>
                )}
              </div>
            </section>

            {/* Daily Message */}
            {dailyMessage && (
              <section>
                <Message
                  text={dailyMessage.text}
                  timestamp={dailyMessage.ts}
                />
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-muted text-xs">
          <p>Fix the money, fix the world.</p>
        </footer>
      </div>
    </div>
  );
} 