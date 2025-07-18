import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  className?: string;
}

export default function StatCard({ title, value, unit, className = '' }: StatCardProps) {
  return (
    <div className={`terminal-border p-2 md:p-4 bg-black focus-outline ${className}`} tabIndex={0}>
      <div className="text-muted text-xs mb-1 uppercase tracking-wider">
        {title}
      </div>
      <div className="text-matrix-bright text-xs md:text-sm lg:text-xl font-mono terminal-glow">
        {value}
        {unit && <span className="text-muted text-xs md:text-sm lg:text-lg ml-1">{unit}</span>}
      </div>
    </div>
  );
} 