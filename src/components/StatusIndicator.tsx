import React from 'react';
import { PriceData } from '@/types';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  priceData: PriceData;
  className?: string;
}

export default function StatusIndicator({ priceData, className }: StatusIndicatorProps) {
  const { loading, error, lastUpdated } = priceData;

  const getStatusColor = () => {
    if (loading) return 'bg-yellow-400';
    if (error) return 'bg-orange-400';
    return 'bg-green-400';
  };

  const getStatusText = () => {
    if (loading) return 'Loading price data...';
    if (error) return 'Using fallback prices';
    return 'Live price data';
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <div className={cn('w-2 h-2 rounded-full animate-pulse', getStatusColor())} />
      <span className="text-sm text-gray-500">{getStatusText()}</span>
      {lastUpdated && !loading && (
        <span className="text-xs text-gray-600 ml-2">
          Updated {lastUpdated.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
