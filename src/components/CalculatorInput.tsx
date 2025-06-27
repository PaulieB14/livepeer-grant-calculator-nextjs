import React from 'react';
import { DollarSign } from 'lucide-react';
import { sanitizeUSDInput } from '@/lib/utils';

interface CalculatorInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function CalculatorInput({ 
  value, 
  onChange, 
  placeholder = "Enter USD amount (e.g., 10000)",
  disabled = false 
}: CalculatorInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeUSDInput(e.target.value);
    onChange(sanitizedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent entering invalid characters
    const invalidChars = ['e', 'E', '+', '-'];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <label className="block text-lg font-semibold text-white mb-3">
        Grant Amount (USD)
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <DollarSign className="w-6 h-6 text-gray-400 group-focus-within:text-green-400 transition-colors" />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full pl-14 pr-6 py-4 
            bg-white/5 border border-white/20 rounded-2xl 
            text-white text-xl placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent 
            transition-all duration-200
            hover:border-white/30
            disabled:opacity-50 disabled:cursor-not-allowed
            ${disabled ? '' : 'group-hover:bg-white/10'}
          `}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 to-blue-500/0 group-focus-within:from-green-500/5 group-focus-within:to-blue-500/5 transition-all duration-200 pointer-events-none" />
      </div>
      <p className="text-sm text-gray-400 mt-2">
        Enter the USD amount you need for your grant proposal
      </p>
    </div>
  );
}
