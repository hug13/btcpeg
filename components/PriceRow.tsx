import React from 'react';
import { fmtBTC, fmtCurrency, getPercentColor } from '../lib/format';

interface PriceRowProps {
  currency: string;
  btcPrice: string;
  changePercent?: number;
  onClick?: () => void;
  className?: string;
}

export default function PriceRow({ 
  currency, 
  btcPrice, 
  changePercent, 
  onClick,
  className = '' 
}: PriceRowProps) {
  return (
    <div 
      className={`
        flex items-center justify-between p-3 
        terminal-border terminal-bg 
        hover:bg-matrix-dark hover:bg-opacity-10 
        cursor-pointer transition-colors
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="text-matrix-bright font-mono text-sm font-semibold">
          {currency}
        </div>
        <div className="text-matrix-dim text-xs">
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
        
        <div className="text-matrix-dim text-xs">
          →
        </div>
      </div>
    </div>
  );
} 