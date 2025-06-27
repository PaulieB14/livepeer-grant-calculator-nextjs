import React from 'react';
import { Zap } from 'lucide-react';
import { CalculationResult, RoundingOption } from '@/types';
import { formatCurrency, formatLPT } from '@/lib/utils';
import RoundingOptions from './RoundingOptions';

interface CalculationResultsProps {
  calculation: CalculationResult;
  selectedRounding: RoundingOption;
  onRoundingChange: (option: RoundingOption) => void;
  getAmountForRounding: (option: RoundingOption) => number;
  getSelectedAmount: () => number;
  getRoundingLabel: (option: RoundingOption) => string;
  getRoundingDescription: (option: RoundingOption) => string;
}

export default function CalculationResults({
  calculation,
  selectedRounding,
  onRoundingChange,
  getAmountForRounding,
  getSelectedAmount,
  getRoundingLabel,
  getRoundingDescription
}: CalculationResultsProps) {
  const selectedAmount = getSelectedAmount();

  return (
    <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl p-8 border border-green-500/20 animate-slide-up">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-green-500/20 rounded-xl">
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Required LPT Amount</h3>
        </div>
        
        {/* Rounding Options */}
        <RoundingOptions
          calculation={calculation}
          selectedRounding={selectedRounding}
          onRoundingChange={onRoundingChange}
          getAmountForRounding={getAmountForRounding}
          getRoundingLabel={getRoundingLabel}
          getRoundingDescription={getRoundingDescription}
        />
        
        {/* Selected Amount Display */}
        <div className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          {formatLPT(selectedAmount, selectedRounding === 'exact' ? 4 : 0)} LPT
        </div>
        
        {/* Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-gray-400 text-sm mb-1">Grant Amount</div>
            <div className="text-white text-xl font-semibold">
              {formatCurrency(calculation.usdAmount)}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-gray-400 text-sm mb-1">Average Price (60d)</div>
            <div className="text-white text-xl font-semibold">
              {formatCurrency(calculation.averagePrice)}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-gray-400 text-sm mb-1">Rounding Method</div>
            <div className="text-white text-xl font-semibold">
              {getRoundingLabel(selectedRounding)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
