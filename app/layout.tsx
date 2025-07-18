import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BTC PEG - Rethink Value',
  description: 'A retro-futurist terminal for denominating everything in Bitcoin',
  keywords: ['bitcoin', 'btc', 'cryptocurrency', 'terminal', 'retro', 'futurist'],
  authors: [{ name: 'BTC PEG' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff8c00',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono bg-black text-matrix-bright min-h-screen">
        <div className="min-h-screen bg-black">
          {children}
        </div>
      </body>
    </html>
  );
} 