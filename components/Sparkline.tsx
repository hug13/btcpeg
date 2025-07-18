import React from 'react';

interface SparklineProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Sparkline({ width = 400, height = 80, className = '' }: SparklineProps) {
  // Generate a flat line with subtle variations - "1 BTC = 1 BTC" concept
  const centerY = height / 2;
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - 40;
  
  // Create a flat line with very subtle fake variations that average to 1.0
  const points = [];
  const numPoints = 20;
  for (let i = 0; i <= numPoints; i++) {
    const x = padding + (i * chartWidth / numPoints);
    const y = centerY + (Math.sin(i * 0.23) * 1); // Very subtle variation
    points.push(`${x},${y}`);
  }
  const flatLine = `M ${points.join(' L ')}`;
  
  // Grid lines
  const gridLines = [];
  const numGridLines = 4;
  for (let i = 0; i <= numGridLines; i++) {
    const y = 20 + (i * chartHeight / numGridLines);
    gridLines.push(`M ${padding} ${y} L ${width - padding} ${y}`);
  }
  
  return (
    <div className={`w-full terminal-border bg-black p-4 ${className}`}>
      <div className="text-muted text-xs mb-2 text-center">BTC/BTC • 24H</div>
      <svg width="100%" height={height} className="block" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="bitcoinGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid lines */}
        {gridLines.map((line, index) => (
          <path
            key={index}
            d={line}
            stroke="#1e1e1e"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        ))}
        
        {/* X-axis labels */}
        <text x={padding} y={height - 5} className="text-xs fill-muted" textAnchor="start">00:00</text>
        <text x={width - padding} y={height - 5} className="text-xs fill-muted" textAnchor="end">24:00</text>
        
        {/* Main flat line */}
        <path
          d={flatLine}
          stroke="#ff8c00"
          strokeWidth="2"
          fill="none"
          filter="url(#bitcoinGlow)"
          className="matrix-flicker"
        />
        
        {/* Data points */}
        {points.slice(0, -1).map((point, index) => {
          const [x, y] = point.split(',').map(Number);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill="#ff8c00"
              opacity="0.6"
            />
          );
        })}
      </svg>
      
      {/* Chart footer */}
      <div className="flex justify-between items-center mt-2 text-xs text-muted">
        <span>Volume: N/A</span>
        <span>Change: 0.00%</span>
      </div>
    </div>
  );
} 