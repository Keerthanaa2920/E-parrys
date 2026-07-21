import React from 'react';
import { FiInbox, FiRotateCcw } from 'react-icons/fi';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Matching Material Listings Found",
  message = "Your filter constraints (category, approval status, stock status, or price) did not yield any product listings. Try relaxing your filters.",
  onClearFilters
}) => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-custom border border-parrys-surface-dim bg-white p-6 text-center max-w-md mx-auto shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parrys-cream border border-parrys-surface-dim text-parrys-muted mb-5">
        <FiInbox className="h-6 w-6" />
      </div>
      
      <h3 className="text-sm font-semibold text-parrys-charcoal font-serif mb-1">{title}</h3>
      <p className="text-xs text-parrys-muted leading-relaxed mb-5">
        {message}
      </p>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1.5 rounded-custom border border-parrys-terracotta bg-parrys-cream/40 px-4 py-2 text-xs font-bold text-parrys-terracotta hover:bg-parrys-terracotta hover:text-white transition-all btn-transition"
        >
          <FiRotateCcw className="h-3.5 w-3.5" />
          <span>Clear Filter Criteria</span>
        </button>
      )}
    </div>
  );
};
export default EmptyState;
