import React from 'react';
import PriceRowClient from './PriceRowClient';
import { fetchMonthlyHistory } from '../lib/supa';

interface PriceRowWithSparklineProps {
  currency: string;
  btcPrice: string;
  changePercent?: number;
  className?: string;
}

export default async function PriceRowWithSparkline({ 
  currency, 
  btcPrice, 
  changePercent,
  className = '' 
}: PriceRowWithSparklineProps) {
  // Fetch sparkline data from Supabase
  let sparklineData: { btc: number }[] = [];
  
  try {
    const raw = await fetchMonthlyHistory(currency.toLowerCase());
    sparklineData = raw.map(r => ({ btc: parseFloat(r.btc_value) }));
  } catch (error) {
    console.error(`Failed to fetch sparkline data for ${currency}:`, error);
    // Continue without sparkline data
  }

  return (
    <PriceRowClient
      currency={currency}
      btcPrice={btcPrice}
      changePercent={changePercent}
      sparklineData={sparklineData}
      className={className}
    />
  );
} 