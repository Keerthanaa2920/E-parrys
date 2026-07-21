import React, { useState } from 'react';
import { FiAlertOctagon, FiRefreshCw, FiChevronRight, FiChevronDown, FiLifeBuoy } from 'react-icons/fi';

interface ErrorStateProps {
  title?: string;
  message?: string;
  errorDetails?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Marketplace API Connection Failed",
  message = "We encountered a timeout issue connecting to the E-Parrys product inventory server. Please verify your VPN state and retry connection.",
  errorDetails = "Error Code: [504 GATEWAY_TIMEOUT] - Server Address: api-marketplace.eparrys.com/v1/inventory/listings - Connection attempts exceeded: 5.",
  onRetry
}) => {
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  return (
    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-custom border border-rose-550/20 bg-white p-6 text-center max-w-2xl mx-auto shadow-xl">
      {/* Icon Area */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-55/40 text-rose-600 mb-6 border border-rose-200">
        <FiAlertOctagon className="h-8 w-8" />
      </div>

      {/* Text Area */}
      <h3 className="text-lg font-bold text-parrys-charcoal font-serif mb-2">{title}</h3>
      <p className="text-sm text-parrys-muted max-w-md mx-auto leading-relaxed mb-6">
        {message}
      </p>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-custom bg-parrys-terracotta px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-parrys-terracotta-dark transition-all btn-transition"
        >
          <FiRefreshCw className="h-3.5 w-3.5" />
          <span>Retry System Sync</span>
        </button>
        
        <a
          href="https://status.eparrys.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-custom border border-parrys-surface-dim bg-white px-5 py-2.5 text-xs font-bold text-parrys-charcoal hover:bg-parrys-cream transition btn-transition"
        >
          <FiLifeBuoy className="h-3.5 w-3.5" />
          <span>Check Status Page</span>
        </a>
      </div>

      {/* Diagnostics Dropdown */}
      <div className="w-full text-left border-t border-parrys-surface-dim/40 pt-4">
        <button
          onClick={() => setShowDiagnostics(!showDiagnostics)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-parrys-terracotta focus:outline-none"
        >
          {showDiagnostics ? (
            <FiChevronDown className="h-4 w-4" />
          ) : (
            <FiChevronRight className="h-4 w-4" />
          )}
          <span>System Diagnostics Log</span>
        </button>

        {showDiagnostics && (
          <pre className="mt-3 w-full overflow-x-auto rounded-custom border border-parrys-surface-dim bg-parrys-cream/35 p-3 text-[10px] font-mono text-rose-700 leading-normal whitespace-pre-wrap">
            {errorDetails}
          </pre>
        )}
      </div>
    </div>
  );
};
export default ErrorState;
