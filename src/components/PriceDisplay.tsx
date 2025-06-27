import React from 'react';
import { TrendingUp, Calendar, Zap } from 'lucide-react';
import { PriceData } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface PriceDisplayProps {
  priceData: PriceData;
}

export default function PriceDisplay({ priceData }: PriceDisplayProps) {
  const { currentPrice, averagePrice60Day, loading, error } = priceData;

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Price Loading */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300 font-medium">Current Price</span>
            </div>
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
          <div className="animate-pulse bg-gray-700 h-8 rounded mb-2"></div>
          <p className="text-sm text-gray-400">Live market price</p>
        </div>

        {/* 60-Day Average Loading */}
        <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 font-medium">60-Day Average</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
          </div>
          <div className="animate-pulse bg-gray-700 h-8 rounded mb-2"></div>
          <p className="text-sm text-gray-400">Grant calculation basis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <p className="text-yellow-400 text-sm text-center">{error}</p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Price */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300 font-medium">Current Price</span>
            </div>
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {formatCurrency(currentPrice)}
          </div>
          <p className="text-sm text-gray-400">Live market price</p>
        </div>

        {/* 60-Day Average */}
        <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-2xl p-6 border border-green-500/20 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 font-medium">60-Day Average</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {formatCurrency(averagePrice60Day)}
          </div>
          <p className="text-sm text-gray-400">Grant calculation basis</p>
        </div>
      </div>
    </div>
  );
}
