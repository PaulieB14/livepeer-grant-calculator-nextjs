import { useState, useEffect, useCallback } from 'react';
import { PriceData, CalculationResult, RoundingOption } from '@/types';
import { priceService } from '@/lib/priceService';

export function usePriceData() {
  const [priceData, setPriceData] = useState<PriceData>({
    currentPrice: 0,
    averagePrice60Day: 0,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchPrices = useCallback(async () => {
    try {
      setPriceData(prev => ({ ...prev, loading: true, error: null }));
      const data = await priceService.fetchAllPriceData();
      setPriceData(data);
    } catch (error) {
      setPriceData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch price data',
      }));
    }
  }, []);

  const refreshPrices = useCallback(() => {
    priceService.clearCache();
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return {
    priceData,
    refreshPrices,
    isLoading: priceData.loading,
    hasError: !!priceData.error,
  };
}

export function useCalculation(averagePrice: number) {
  const [usdAmount, setUsdAmount] = useState<string>('');
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);

  const updateCalculation = useCallback((amount: string) => {
    const numAmount = parseFloat(amount);
    
    if (!amount || isNaN(numAmount) || numAmount <= 0 || averagePrice <= 0) {
      setCalculation(null);
      return;
    }

    const exactLPT = numAmount / averagePrice;
    const roundedLPT = Math.ceil(exactLPT);
    const bufferedLPT = Math.ceil(exactLPT * 1.05);

    setCalculation({
      usdAmount: numAmount,
      exactLPT,
      roundedLPT,
      bufferedLPT,
      averagePrice,
    });
  }, [averagePrice]);

  const setUsdAmountAndCalculate = useCallback((amount: string) => {
    setUsdAmount(amount);
    updateCalculation(amount);
  }, [updateCalculation]);

  useEffect(() => {
    updateCalculation(usdAmount);
  }, [usdAmount, updateCalculation]);

  return {
    usdAmount,
    setUsdAmount: setUsdAmountAndCalculate,
    calculation,
    hasCalculation: !!calculation,
  };
}

export function useRounding(calculation: CalculationResult | null) {
  const [selectedRounding, setSelectedRounding] = useState<RoundingOption>('round');

  const getAmountForRounding = useCallback((type: RoundingOption): number => {
    if (!calculation) return 0;
    
    switch (type) {
      case 'exact':
        return calculation.exactLPT;
      case 'round':
        return calculation.roundedLPT;
      case 'buffer':
        return calculation.bufferedLPT;
      default:
        return 0;
    }
  }, [calculation]);

  const getSelectedAmount = useCallback(() => {
    return getAmountForRounding(selectedRounding);
  }, [getAmountForRounding, selectedRounding]);

  const getRoundingLabel = useCallback((type: RoundingOption): string => {
    switch (type) {
      case 'exact':
        return 'Exact Amount';
      case 'round':
        return 'Round to Whole';
      case 'buffer':
        return 'Round Up + 5%';
      default:
        return '';
    }
  }, []);

  const getRoundingDescription = useCallback((type: RoundingOption): string => {
    switch (type) {
      case 'exact':
        return 'Precise calculation';
      case 'round':
        return 'Clean grant amount';
      case 'buffer':
        return 'Price protection';
      default:
        return '';
    }
  }, []);

  return {
    selectedRounding,
    setSelectedRounding,
    getAmountForRounding,
    getSelectedAmount,
    getRoundingLabel,
    getRoundingDescription,
  };
}

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const generateReportText = useCallback((
    calculation: CalculationResult | null,
    priceData: PriceData,
    roundingMethod: RoundingOption,
    selectedAmount: number
  ): string => {
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    
    const formatCurrency = (amount: number) => 
      new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(amount);
    
    const formatLPT = (amount: number, decimals = 4) => 
      new Intl.NumberFormat('en-US', { 
        minimumFractionDigits: decimals > 0 ? 2 : 0,
        maximumFractionDigits: decimals 
      }).format(amount);

    if (calculation) {
      const roundingLabels = {
        exact: 'Exact Amount',
        round: 'Round to Whole',
        buffer: 'Round Up + 5%'
      };

      return `🎬 LIVEPEER GRANT CALCULATOR REPORT
Generated: ${timestamp}

💰 GRANT CALCULATION:
• Request Amount: ${formatCurrency(calculation.usdAmount)}
• Current LPT Price: ${formatCurrency(priceData.currentPrice)}
• 60-Day Average: ${formatCurrency(calculation.averagePrice)}
• Exact LPT Required: ${formatLPT(calculation.exactLPT, 4)} LPT
• Recommended Amount: ${formatLPT(selectedAmount, roundingMethod === 'exact' ? 4 : 0)} LPT
• Rounding Method: ${roundingLabels[roundingMethod]}

📊 METHODOLOGY:
• Uses 60-day historical average for stability
• Reduces price volatility impact
• Industry-standard DAO approach
• Data from CoinGecko API

🔗 Calculator: https://github.com/PaulieB14/livepeer-grant-calculator-nextjs

This calculation provides transparent, volatility-adjusted pricing for Livepeer grant proposals.`;
    } else {
      return `🎬 LIVEPEER PRICE REFERENCE
Generated: ${timestamp}

💰 CURRENT PRICING:
• Live LPT Price: ${formatCurrency(priceData.currentPrice)}
• 60-Day Average: ${formatCurrency(priceData.averagePrice60Day)}
• Data Source: CoinGecko API

📊 FOR GRANT APPLICATIONS:
Use the 60-day average for stable, fair pricing in your Livepeer grant proposals.

🔗 Calculator: https://github.com/PaulieB14/livepeer-grant-calculator-nextjs`;
    }
  }, []);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      }
    } catch (err) {
      console.error('Copy failed:', err);
      return false;
    }
  }, []);

  const shareViaNavigator = useCallback(async (text: string, url: string): Promise<boolean> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Livepeer Grant Calculator Results',
          text: text,
          url: url
        });
        return true;
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
        return false;
      }
    }
    return false;
  }, []);

  const openEmailClient = useCallback((text: string) => {
    const subject = encodeURIComponent('Livepeer Grant Calculator Results');
    const body = encodeURIComponent(text);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }, []);

  const printDocument = useCallback(() => {
    try {
      window.print();
    } catch (e) {
      console.error('Print failed:', e);
      return false;
    }
    return true;
  }, []);

  return {
    isExporting,
    setIsExporting,
    showMobileModal,
    setShowMobileModal,
    generateReportText,
    copyToClipboard,
    shareViaNavigator,
    openEmailClient,
    printDocument,
  };
}
