import React from 'react';
import { RoundingOption, CalculationResult } from '@/types';
import { formatLPT, cn } from '@/lib/utils';

interface RoundingOptionsProps {
  calculation: CalculationResult;
  selectedRounding: RoundingOption;
  onRoundingChange: (option: RoundingOption) => void;
  getAmountForRounding: (option: RoundingOption) => number;
  getRoundingLabel: (option: RoundingOption) => string;
  getRoundingDescription: (option: RoundingOption) => string;
}

export default function RoundingOptions({
  calculation,
  selectedRounding,
  onRoundingChange,
  getAmountForRounding,
  getRoundingLabel,
  getRoundingDescription
}: RoundingOptionsProps) {
  const roundingOptions: RoundingOption[] = ['exact', 'round', 'buffer'];

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-white mb-3">Choose Rounding Option:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roundingOptions.map((option) => {
          const amount = getAmountForRounding(option);
          const isSelected = selectedRounding === option;
          
          return (
            <button
              key={option}
              onClick={() => onRoundingChange(option)}
              className={cn(
                "border rounded-xl p-4 transition-all duration-200 cursor-pointer",
                "hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-green-500",
                isSelected 
                  ? "bg-green-500/10 border-green-500 shadow-lg shadow-green-500/10" 
                  : "border-white/20 hover:border-white/30"
              )}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-1">
                  {formatLPT(amount, option === 'exact' ? 4 : 0)} LPT
                </div>
                <div className="text-sm text-gray-400 mb-1">
                  {getRoundingLabel(option)}
                </div>
                <div className="text-xs text-gray-500">
                  {getRoundingDescription(option)}
                </div>
              </div>
              {isSelected && (
                <div className="mt-2 flex justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
