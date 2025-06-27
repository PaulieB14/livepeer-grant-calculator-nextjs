import React, { useEffect } from 'react';
import { X, Printer, Copy, Share2, Mail, Info } from 'lucide-react';
import { CalculationResult, PriceData, RoundingOption } from '@/types';

interface MobileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => Promise<void>;
  onShare: () => Promise<void>;
  onEmail: () => void;
  onPrint: () => void;
  hasCalculation: boolean;
}

export default function MobileExportModal({
  isOpen,
  onClose,
  onCopy,
  onShare,
  onEmail,
  onPrint,
  hasCalculation
}: MobileExportModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className=\"fixed inset-0 z-50 bg-black/80 backdrop-blur-sm no-print\">
      <div className=\"fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 shadow-2xl transform transition-transform duration-300 ease-out\">
        <div className=\"p-6\">
          <div className=\"flex justify-between items-center mb-6\">
            <h3 className=\"text-xl font-bold text-white\">Export Options</h3>
            <button 
              onClick={onClose}
              className=\"text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10\"
            >
              <X className=\"w-6 h-6\" />
            </button>
          </div>
          
          <div className=\"space-y-3 mb-6\">
            {/* Desktop Print */}
            <button 
              onClick={onPrint}
              className=\"w-full flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors\"
            >
              <Printer className=\"w-6 h-6 text-blue-400\" />
              <div className=\"text-left\">
                <div className=\"text-white font-medium\">Print Document</div>
                <div className=\"text-gray-400 text-sm\">Open print dialog (Desktop/Android)</div>
              </div>
            </button>
            
            {/* Copy Text */}
            <button 
              onClick={onCopy}
              className=\"w-full flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors\"
            >
              <Copy className=\"w-6 h-6 text-green-400\" />
              <div className=\"text-left\">
                <div className=\"text-white font-medium\">Copy Details</div>
                <div className=\"text-gray-400 text-sm\">Copy calculation to clipboard</div>
              </div>
            </button>
            
            {/* Share */}
            <button 
              onClick={onShare}
              className=\"w-full flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors\"
            >
              <Share2 className=\"w-6 h-6 text-purple-400\" />
              <div className=\"text-left\">
                <div className=\"text-white font-medium\">Share Results</div>
                <div className=\"text-gray-400 text-sm\">Share via apps (iOS/Android)</div>
              </div>
            </button>
            
            {/* Email */}
            <button 
              onClick={onEmail}
              className=\"w-full flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors\"
            >
              <Mail className=\"w-6 h-6 text-yellow-400\" />
              <div className=\"text-left\">
                <div className=\"text-white font-medium\">Email Results</div>
                <div className=\"text-gray-400 text-sm\">Send via email app</div>
              </div>
            </button>
          </div>
          
          {/* iOS Screenshot Tip */}
          <div className=\"p-4 bg-blue-500/10 rounded-lg border border-blue-500/20\">
            <div className=\"flex items-start gap-3\">
              <Info className=\"w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0\" />
              <div className=\"text-sm\">
                <div className=\"text-blue-300 font-medium mb-1\">iOS Screenshot Tip:</div>
                <div className=\"text-blue-200\">
                  Take a screenshot, then tap \"Full Page\" in the preview to capture the complete calculation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
