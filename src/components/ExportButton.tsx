import React from 'react';
import { Share2, Printer } from 'lucide-react';
import { isMobile } from '@/lib/utils';

interface ExportButtonProps {
  onClick: () => void;
  hasCalculation?: boolean;
  className?: string;
}

export default function ExportButton({ 
  onClick, 
  hasCalculation = false,
  className = ""
}: ExportButtonProps) {
  const mobile = isMobile();
  
  return (
    <div className={`text-center ${className}`}>
      <button 
        onClick={onClick}
        className={`
          bg-gradient-to-r font-semibold px-8 py-3 rounded-xl 
          transition-all duration-200 shadow-lg hover:shadow-xl 
          flex items-center gap-2 mx-auto
          ${hasCalculation 
            ? 'from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600' 
            : 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          }
          text-white
        `}
      >
        {mobile ? (
          <Share2 className="w-5 h-5" />
        ) : (
          <Printer className="w-5 h-5" />
        )}
        <span className="hidden sm:inline">
          {hasCalculation ? 'Print/Export Documentation' : 'Print/Export Report'}
        </span>
        <span className="sm:hidden">
          {hasCalculation ? 'Export Results' : 'Export Report'}
        </span>
      </button>
      <p className="text-sm text-gray-400 mt-2">
        <span className="hidden sm:inline">
          {hasCalculation 
            ? 'Generate complete grant calculation proof' 
            : 'Generate timestamped price documentation'
          }
        </span>
        <span className="sm:hidden">
          Multiple export options available
        </span>
      </p>
    </div>
  );
}
