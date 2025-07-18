'use client';

import React from 'react';
import { fmtBTC, fmtCurrency, getPercentColor } from '../lib/format';

interface PriceRowClientProps {
  currency: string;
  btcPrice: string;
  changePercent?: number;
  className?: string;
}

export default function PriceRowClient({ 
  currency, 
  btcPrice, 
  changePercent,
  className = '' 
}: PriceRowClientProps) {
  const handleClick = () => {
    window.location.href = `/chart/${currency.toLowerCase()}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={`
        flex items-center justify-between p-3 
        terminal-border bg-black 
        hover-overlay focus-outline
        cursor-pointer transition-colors
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${currency} chart`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-matrix-bright font-mono text-sm font-semibold">
          {currency}
        </div>
        <div className="text-muted text-xs">
          {fmtCurrency(currency)}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="text-matrix-bright font-mono text-sm terminal-glow">
          {fmtBTC(btcPrice)} BTC
        </div>
        
        {changePercent !== undefined && (
          <div className={`text-xs font-mono ${getPercentColor(changePercent)}`}>
            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
          </div>
        )}
        
        <div className="text-muted text-xs">
          →
        </div>
      </div>
    </div>
  );
} 