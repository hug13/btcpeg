/**
 * Format a number as BTC with proper precision
 */
export function fmtBTC(value: string | number, precision = 8): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '0.00000000';
  
  // For very small values, show more precision
  if (numValue < 0.00001) {
    return numValue.toFixed(precision);
  }
  
  // For larger values, can show fewer decimals
  if (numValue >= 1) {
    return numValue.toFixed(2);
  }
  
  return numValue.toFixed(precision);
}

/**
 * Format a percentage with proper sign and color coding
 */
export function fmtPercent(value: number, precision = 2): string {
  if (isNaN(value)) return '0.00%';
  
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(precision)}%`;
}

/**
 * Format large numbers with appropriate suffixes (K, M, T, etc.)
 */
export function fmtLargeNumber(value: number, precision = 2): string {
  if (isNaN(value)) return '0';
  
  const suffixes = ['', 'K', 'M', 'T', 'P', 'E'];
  let suffixIndex = 0;
  let scaledValue = value;
  
  while (scaledValue >= 1000 && suffixIndex < suffixes.length - 1) {
    scaledValue /= 1000;
    suffixIndex++;
  }
  
  return `${scaledValue.toFixed(precision)}${suffixes[suffixIndex]}`;
}

/**
 * Format currency code for display
 */
export function fmtCurrency(code: string): string {
  const currencyNames: Record<string, string> = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    CHF: 'Swiss Franc',
    JPY: 'Japanese Yen',
    CNY: 'Chinese Yuan',
    XAU: 'Gold (oz)',
    XAG: 'Silver (oz)',
    WTI: 'WTI Oil',
    BRENT: 'Brent Oil',
  };
  
  return currencyNames[code] || code;
}

/**
 * Get color class based on percentage change
 */
export function getPercentColor(value: number): string {
  if (value > 0) return 'text-matrix-bright';
  if (value < 0) return 'text-red-400';
  return 'text-muted';
}

/**
 * Format timestamp to readable date
 */
export function fmtDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString();
}

/**
 * Format timestamp to readable time
 */
export function fmtTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString();
}

/**
 * Convert satoshis to BTC
 */
export function satsToBTC(sats: number): string {
  return fmtBTC(sats / 100000000);
}

/**
 * Format hashrate with proper units
 */
export function fmtHashrate(value: number): string {
  return `${fmtLargeNumber(value)} EH/s`;
}

/**
 * Format difficulty with proper units
 */
export function fmtDifficulty(value: number): string {
  return `${fmtLargeNumber(value)} T`;
} 