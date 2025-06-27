export interface PriceData {
  currentPrice: number;
  averagePrice60Day: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface CalculationResult {
  usdAmount: number;
  exactLPT: number;
  roundedLPT: number;
  bufferedLPT: number;
  averagePrice: number;
}

export type RoundingOption = 'exact' | 'round' | 'buffer';

export interface RoundingDisplayOption {
  value: RoundingOption;
  label: string;
  description: string;
  amount: number;
}

export interface ExportData {
  calculation: CalculationResult;
  priceData: PriceData;
  roundingMethod: RoundingOption;
  timestamp: Date;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface CoinGeckoCurrentPriceResponse {
  livepeer: {
    usd: number;
    usd_24h_change?: number;
  };
}

export interface CoinGeckoHistoricalResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}
