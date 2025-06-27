import { 
  PriceData, 
  CoinGeckoCurrentPriceResponse, 
  CoinGeckoHistoricalResponse 
} from '@/types';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const FALLBACK_CURRENT_PRICE = 6.25;
const FALLBACK_60DAY_AVERAGE = 5.85;
const REQUEST_TIMEOUT = 15000; // 15 seconds

class PriceService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private createTimeoutSignal(timeout: number): AbortSignal {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller.signal;
  }

  private isValidCacheEntry(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private getCache(key: string): any | null {
    const entry = this.cache.get(key);
    if (entry && this.isValidCacheEntry(entry.timestamp)) {
      return entry.data;
    }
    return null;
  }

  async fetchCurrentPrice(): Promise<number> {
    const cacheKey = 'current-price';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/simple/price?ids=livepeer&vs_currencies=usd&include_24hr_change=true`,
        { 
          signal: this.createTimeoutSignal(REQUEST_TIMEOUT),
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CoinGeckoCurrentPriceResponse = await response.json();
      
      if (!data.livepeer?.usd) {
        throw new Error('Invalid price data structure');
      }

      const price = data.livepeer.usd;
      this.setCache(cacheKey, price);
      return price;

    } catch (error) {
      console.warn('Failed to fetch current price, using fallback:', error);
      return FALLBACK_CURRENT_PRICE;
    }
  }

  async fetch60DayAverage(): Promise<number> {
    const cacheKey = '60day-average';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/livepeer/market_chart?vs_currency=usd&days=60&interval=daily`,
        { 
          signal: this.createTimeoutSignal(REQUEST_TIMEOUT),
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CoinGeckoHistoricalResponse = await response.json();
      
      if (!data.prices || !Array.isArray(data.prices) || data.prices.length === 0) {
        throw new Error('Invalid historical data structure');
      }

      // Calculate 60-day average
      const sum = data.prices.reduce((acc, [, price]) => acc + price, 0);
      const average = sum / data.prices.length;

      this.setCache(cacheKey, average);
      return average;

    } catch (error) {
      console.warn('Failed to fetch 60-day average, using fallback:', error);
      return FALLBACK_60DAY_AVERAGE;
    }
  }

  async fetchAllPriceData(): Promise<PriceData> {
    const startTime = Date.now();
    
    try {
      const [currentPrice, averagePrice60Day] = await Promise.all([
        this.fetchCurrentPrice(),
        this.fetch60DayAverage()
      ]);

      const hasLiveData = currentPrice !== FALLBACK_CURRENT_PRICE || 
                          averagePrice60Day !== FALLBACK_60DAY_AVERAGE;

      return {
        currentPrice,
        averagePrice60Day,
        loading: false,
        error: hasLiveData ? null : 'Using fallback prices - API unavailable',
        lastUpdated: new Date()
      };

    } catch (error) {
      console.error('Failed to fetch price data:', error);
      
      return {
        currentPrice: FALLBACK_CURRENT_PRICE,
        averagePrice60Day: FALLBACK_60DAY_AVERAGE,
        loading: false,
        error: 'Network error - using fallback prices',
        lastUpdated: new Date()
      };
    }
  }

  // Method to clear cache (useful for testing or manual refresh)
  clearCache(): void {
    this.cache.clear();
  }

  // Method to get cache status
  getCacheStatus(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

// Create singleton instance
export const priceService = new PriceService();

// Export individual methods for easier testing
export const { 
  fetchCurrentPrice, 
  fetch60DayAverage, 
  fetchAllPriceData,
  clearCache,
  getCacheStatus
} = priceService;

export default priceService;
