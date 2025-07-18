// lib/supa.ts
type PricePt = { month: string; btc_value: string };

export async function fetchMonthlyHistory(asset: string): Promise<PricePt[]> {
  const url =
    `${process.env.SUPABASE_URL}/rest/v1/prices_monthly` +
    `?asset=eq.${asset}&select=month,btc_value&order=month`;
  
  const r = await fetch(url, {
    headers: { 
      apikey: process.env.SUPABASE_ANON_KEY || '',
      'Content-Type': 'application/json'
    },
    // cache one day – data moves daily
    next: { revalidate: 86_400 }
  });

  if (!r.ok) {
    console.error(`Failed to fetch monthly history for ${asset}:`, r.status);
    return [];
  }

  return r.json();
} 