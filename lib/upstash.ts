const UPSTASH_REST_URL = process.env.UPSTASH_REST_URL!;
const UPSTASH_REST_TOKEN = process.env.UPSTASH_REST_TOKEN!;

export interface LastPrices {
  USDBTC: string;
  EURBTC: string;
  GBPBTC: string;
  CHFBTC: string;
  JPYBTC: string;
  CNYBTC: string;
  XAUBTC: string;
  XAGBTC: string;
  btc_to_kg_gold: string;
}

export interface BtcNetwork {
  hashrate_eh: number;
  difficulty_t: number;
  avg_fee_satvB: number;
}

export interface CrudeOil {
  WTI_price_usd: number;
  WTI_change_pct: number;
  BRENT_price_usd: number;
  BRENT_change_pct: number;
}

export interface DailyMessage {
  text: string;
  ts: number;
}

export interface HistoryPoint {
  t: string;
  v: number;
}

class UpstashClient {
  private async fetchFromUpstash<T>(key: string): Promise<T | null> {
    // Return mock data if environment variables are not set properly
    if (!UPSTASH_REST_URL || !UPSTASH_REST_TOKEN || UPSTASH_REST_URL.includes('mock')) {
      console.log(`[DEBUG] Using mock data for ${key} - env vars not set`);
      return this.getMockData<T>(key);
    }

    try {
      const response = await fetch(`${UPSTASH_REST_URL}/get/${key}`, {
        headers: {
          'Authorization': `Bearer ${UPSTASH_REST_TOKEN}`,
        },
        cache: 'no-store', // Ensure fresh data
        next: {
          revalidate: 0, // No caching at Next.js level
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch ${key}:`, response.status);
        return this.getMockData<T>(key);
      }

      const data = await response.json();
      
      // Upstash returns {"result": "json_string"} format
      if (data.result === null) {
        console.log(`[DEBUG] No data found for ${key}`);
        return null;
      }

      const parsedData = JSON.parse(data.result);
      console.log(`[DEBUG] Fetched fresh data for ${key}:`, parsedData);
      return parsedData;
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      return this.getMockData<T>(key);
    }
  }

  private getMockData<T>(key: string): T | null {
    const mockData: Record<string, any> = {
      'last-prices': {
        USDBTC: '0.00001835',
        EURBTC: '0.00001973',
        GBPBTC: '0.00002156',
        CHFBTC: '0.00001892',
        JPYBTC: '0.00000012',
        CNYBTC: '0.00000256',
        XAUBTC: '0.0279568',
        XAGBTC: '0.0003169',
        btc_to_kg_gold: '1.11',
      },
      'btc-network': {
        hashrate_eh: 930.1,
        difficulty_t: 126.27,
        avg_fee_satvB: 4,
      },
      'last-crudeoil': {
        WTI_price_usd: 66.72,
        WTI_change_pct: 0.3,
        BRENT_price_usd: 68.79,
        BRENT_change_pct: 0.12,
      },
      'message': {
        text: 'Fix the money, fix the world.',
        ts: Math.floor(Date.now() / 1000),
      },
    };

    return mockData[key] || null;
  }

  async getLastPrices(): Promise<LastPrices | null> {
    return this.fetchFromUpstash<LastPrices>('last-prices');
  }

  async getBtcNetwork(): Promise<BtcNetwork | null> {
    return this.fetchFromUpstash<BtcNetwork>('btc-network');
  }

  async getCrudeOil(): Promise<CrudeOil | null> {
    return this.fetchFromUpstash<CrudeOil>('last-crudeoil');
  }

  async getDailyMessage(): Promise<DailyMessage | null> {
    return this.fetchFromUpstash<DailyMessage>('message');
  }

  async getHistory(asset: string): Promise<HistoryPoint[] | null> {
    return this.fetchFromUpstash<HistoryPoint[]>(`history:${asset}`);
  }
}

export const upstash = new UpstashClient(); 