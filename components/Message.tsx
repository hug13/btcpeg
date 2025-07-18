import React from 'react';
import { fmtDate, fmtTime } from '../lib/format';

interface MessageProps {
  text: string;
  timestamp?: number;
  className?: string;
}

export default function Message({ text, timestamp, className = '' }: MessageProps) {
  return (
    <div className={`terminal-border bg-black p-3 md:p-4 focus-outline ${className}`} tabIndex={0}>
      <div className="text-matrix-bright italic text-sm leading-relaxed">
        {text}
      </div>
      {timestamp && (
        <div className="text-muted text-xs mt-2">
          {fmtDate(timestamp)} at {fmtTime(timestamp)}
        </div>
      )}
    </div>
  );
} 