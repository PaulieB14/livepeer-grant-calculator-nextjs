import React from 'react';
import { Video, Calendar, Info } from 'lucide-react';
import { usePriceData, useCalculation, useRounding, useExport } from '@/hooks';
import PriceDisplay from '@/components/PriceDisplay';
import CalculatorInput from '@/components/CalculatorInput';
import CalculationResults from '@/components/CalculationResults';
import ExportButton from '@/components/ExportButton';
import MobileExportModal from '@/components/MobileExportModal';
import StatusIndicator from '@/components/StatusIndicator';
import { isMobile, formatTimestamp } from '@/lib/utils';

export default function Home() {
  const { priceData, refreshPrices } = usePriceData();
  const { usdAmount, setUsdAmount, calculation, hasCalculation } = useCalculation(
    priceData.averagePrice60Day
  );
  const {
    selectedRounding,
    setSelectedRounding,
    getAmountForRounding,
    getSelectedAmount,
    getRoundingLabel,
    getRoundingDescription,
  } = useRounding(calculation);
  
  const {
    showMobileModal,
    setShowMobileModal,
    generateReportText,
    copyToClipboard,
    shareViaNavigator,
    openEmailClient,
    printDocument,
  } = useExport();

  const handleExport = () => {
    if (isMobile()) {
      setShowMobileModal(true);
    } else {
      printDocument();
    }
  };

  const handleMobileCopy = async () => {
    const text = generateReportText(calculation, priceData, selectedRounding, getSelectedAmount());
    const success = await copyToClipboard(text);
    if (success) {
      setTimeout(() => setShowMobileModal(false), 1000);
    }
  };

  const handleMobileShare = async () => {
    const text = generateReportText(calculation, priceData, selectedRounding, getSelectedAmount());
    const success = await shareViaNavigator(text, window.location.href);
    if (success) {
      setShowMobileModal(false);
    } else {
      // Fallback to copy
      await handleMobileCopy();
    }
  };

  const handleMobileEmail = () => {
    const text = generateReportText(calculation, priceData, selectedRounding, getSelectedAmount());
    openEmailClient(text);
    setShowMobileModal(false);
  };

  const handleMobilePrint = () => {
    printDocument();
    setShowMobileModal(false);
  };

  return (
    <>
      {/* Background Pattern */}
      <div className=\"no-print absolute inset-0 opacity-30 bg-pattern\" />
      
      {/* Print Header (only visible when printing) */}
      <div className=\"print-only p-6 border-b-2 border-gray-300\">
        <div className=\"text-center\">
          <h1 className=\"text-3xl font-bold text-gray-900 mb-2\">
            Livepeer LPT Grant Calculator
          </h1>
          <p className=\"text-lg text-gray-700\">Official Price Calculation Report</p>
          <p className=\"text-sm text-gray-600 mt-2\">
            Generated on {formatTimestamp(new Date())}
          </p>
        </div>
      </div>

      <div className=\"relative z-10 container mx-auto px-4 py-8 min-h-screen\">
        {/* Header */}
        <div className=\"text-center mb-12 no-print animate-fade-in\">
          <div className=\"flex items-center justify-center gap-3 mb-6\">
            <div className=\"p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg\">
              <Video className=\"w-8 h-8 text-white\" />
            </div>
            <h1 className=\"text-4xl md:text-5xl font-bold gradient-text\">
              Livepeer Grant Calculator
            </h1>
          </div>
          <p className=\"text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed\">
            Calculate LPT token amounts for grant proposals using the 60-day average price.
            Perfect for accurate USD-to-LPT conversions in your Livepeer grant applications.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className=\"max-w-4xl mx-auto\">
          <div className=\"glass-card rounded-3xl shadow-2xl overflow-hidden animate-slide-up\">
            {/* Card Header */}
            <div className=\"bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 border-b border-white/10\">
              <div className=\"flex items-center justify-between\">
                <div className=\"flex items-center gap-3\">
                  <svg className=\"w-6 h-6 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" />
                    <line x1=\"8\" y1=\"6\" x2=\"16\" y2=\"6\" />
                    <line x1=\"8\" y1=\"10\" x2=\"16\" y2=\"10\" />
                    <line x1=\"8\" y1=\"14\" x2=\"16\" y2=\"14\" />
                    <line x1=\"8\" y1=\"18\" x2=\"12\" y2=\"18\" />
                  </svg>
                  <h2 className=\"text-2xl font-bold text-white\">Grant Calculator</h2>
                </div>
                <div className=\"flex items-center gap-2 text-sm text-gray-400\">
                  <Calendar className=\"w-4 h-4\" />
                  <span>60-day average pricing</span>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className=\"p-6 border-b border-white/10\">
              <PriceDisplay priceData={priceData} />
            </div>

            {/* Calculator Form */}
            <div className=\"p-8 space-y-8\">
              {/* USD Input */}
              <CalculatorInput
                value={usdAmount}
                onChange={setUsdAmount}
                disabled={priceData.loading}
              />

              {/* Export Button (Always Visible) */}
              <ExportButton
                onClick={handleExport}
                hasCalculation={hasCalculation}
                className=\"no-print\"
              />

              {/* Calculation Results */}
              {hasCalculation && calculation && (
                <CalculationResults
                  calculation={calculation}
                  selectedRounding={selectedRounding}
                  onRoundingChange={setSelectedRounding}
                  getAmountForRounding={getAmountForRounding}
                  getSelectedAmount={getSelectedAmount}
                  getRoundingLabel={getRoundingLabel}
                  getRoundingDescription={getRoundingDescription}
                />
              )}
            </div>

            {/* Footer Info */}
            <div className=\"bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 border-t border-white/10\">
              <div className=\"flex items-start gap-3\">
                <Info className=\"w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0\" />
                <div className=\"text-sm text-gray-300 leading-relaxed\">
                  <p className=\"font-medium text-white mb-2\">How it works:</p>
                  <ul className=\"space-y-1 text-gray-400\">
                    <li>• Uses 60-day historical average price for stable calculations</li>
                    <li>• Reduces volatility impact on grant proposals</li>
                    <li>• Data sourced from CoinGecko API for accuracy</li>
                    <li>• Perfect for Livepeer ecosystem grant applications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Print Documentation Section (only visible when printing) */}
            <div className=\"print-only p-8 border-t-2 border-gray-300 bg-white\">
              <h3 className=\"text-2xl font-bold text-gray-900 mb-4\">Calculation Details</h3>
              <div className=\"grid grid-cols-2 gap-6 mb-6\">
                <div className=\"bg-gray-50 p-4 rounded-lg border\">
                  <h4 className=\"font-semibold text-gray-900 mb-2\">Price Data Sources</h4>
                  <p className=\"text-sm text-gray-700\">• CoinGecko API</p>
                  <p className=\"text-sm text-gray-700\">• 60-day historical average</p>
                  <p className=\"text-sm text-gray-700\">• Real-time market data</p>
                </div>
                <div className=\"bg-gray-50 p-4 rounded-lg border\">
                  <h4 className=\"font-semibold text-gray-900 mb-2\">Methodology</h4>
                  <p className=\"text-sm text-gray-700\">• USD Amount ÷ 60-day Average Price</p>
                  <p className=\"text-sm text-gray-700\">• Volatility-adjusted calculation</p>
                  <p className=\"text-sm text-gray-700\">• Industry-standard approach</p>
                </div>
              </div>
              
              {hasCalculation && calculation && (
                <div className=\"mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg\">
                  <h4 className=\"font-semibold text-gray-900 mb-2\">Calculation Summary</h4>
                  <div className=\"text-sm text-gray-700 space-y-1\">
                    <p><strong>Grant Amount:</strong> ${calculation.usdAmount.toLocaleString()}</p>
                    <p><strong>Current LPT Price:</strong> ${priceData.currentPrice.toFixed(2)}</p>
                    <p><strong>60-Day Average Price:</strong> ${calculation.averagePrice.toFixed(2)}</p>
                    <p><strong>Exact LPT Required:</strong> {calculation.exactLPT.toFixed(4)} LPT</p>
                    <p><strong>Recommended Amount:</strong> {getSelectedAmount().toLocaleString()} LPT</p>
                    <p><strong>Rounding Method:</strong> {getRoundingLabel(selectedRounding)}</p>
                  </div>
                </div>
              )}
              
              <div className=\"mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg\">
                <h4 className=\"font-semibold text-gray-900 mb-2\">Grant Application Notice</h4>
                <p className=\"text-sm text-gray-700\">
                  This calculation was generated on {formatTimestamp(new Date())} using
                  live market data and a 60-day historical average to provide a fair and stable
                  token amount for grant proposals. The methodology reduces the impact of
                  short-term price volatility on funding decisions.
                </p>
              </div>
              
              <div className=\"mt-6 text-center\">
                <p className=\"text-sm text-gray-500\">
                  Generated by Livepeer Grant Calculator •{' '}
                  https://github.com/PaulieB14/livepeer-grant-calculator-nextjs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className=\"text-center mt-12 no-print\">
          <p className=\"text-gray-400 mb-4\">
            Built for the Livepeer community • Powered by CoinGecko API
          </p>
          <StatusIndicator priceData={priceData} />
        </div>
      </div>

      {/* Mobile Export Modal */}
      <MobileExportModal
        isOpen={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        onCopy={handleMobileCopy}
        onShare={handleMobileShare}
        onEmail={handleMobileEmail}
        onPrint={handleMobilePrint}
        hasCalculation={hasCalculation}
      />
    </>
  );
}
