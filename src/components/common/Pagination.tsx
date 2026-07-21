import React from 'react';
import type { IPagination } from '../../types/dashboard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  pagination: IPagination;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onPageSizeChange
}) => {
  const { currentPage, pageSize, totalItems, totalPages } = pagination;

  // Calculate limits
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers
  const pageNumbers: (number | string)[] = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 py-4 border-t border-parrys-surface-dim/40 bg-white">
      {/* Left side: Results Count Summary */}
      <div className="text-xs text-parrys-muted text-center sm:text-left">
        Showing <span className="font-semibold text-parrys-charcoal">{startItem}</span> to{' '}
        <span className="font-semibold text-parrys-charcoal">{endItem}</span> of{' '}
        <span className="font-semibold text-parrys-terracotta font-mono">{totalItems}</span> entries
      </div>

      {/* Right side: Page Navigation + Size Selector */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
        {/* Page size selector */}
        <div className="flex items-center gap-2 text-xs text-parrys-muted">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
            className="rounded-custom border border-parrys-surface-dim bg-white px-2 py-1 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-custom border border-parrys-surface-dim bg-white text-parrys-charcoal hover:bg-parrys-cream disabled:opacity-30 disabled:hover:bg-white disabled:cursor-not-allowed transition btn-transition"
            aria-label="Previous Page"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>

          {/* Number Buttons */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((num, idx) => {
              if (num === '...') {
                return (
                  <span key={idx} className="px-2 text-xs text-parrys-muted">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={idx}
                  onClick={() => onPageChange(num as number)}
                  className={`h-8 w-8 rounded-custom text-xs font-semibold transition-all btn-transition
                    ${currentPage === num 
                      ? 'bg-parrys-terracotta text-white font-bold shadow-md shadow-parrys-terracotta/10' 
                      : 'border border-parrys-surface-dim bg-white text-parrys-muted hover:bg-parrys-cream hover:text-parrys-charcoal'
                    }
                  `}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex h-8 w-8 items-center justify-center rounded-custom border border-parrys-surface-dim bg-white text-parrys-charcoal hover:bg-parrys-cream disabled:opacity-30 disabled:hover:bg-white disabled:cursor-not-allowed transition btn-transition"
            aria-label="Next Page"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
