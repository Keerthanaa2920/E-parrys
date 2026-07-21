import React from 'react';
import type { IFilterState } from '../../types/dashboard';
import { CATEGORIES, STATUSES, PRIORITIES, STOCK_STATUSES } from '../../data/dummyData';
import { FiSliders, FiRotateCcw, FiChevronDown } from 'react-icons/fi';

interface FiltersProps {
  filters: IFilterState;
  onChange: (filters: IFilterState) => void;
  onReset: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onChange,
  onReset
}) => {
  const handleSelectChange = (key: keyof IFilterState, value: string) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

  const handleAmountChange = (key: 'minAmount' | 'maxAmount', value: string) => {
    const numVal = value === '' ? null : parseFloat(value);
    onChange({
      ...filters,
      [key]: isNaN(numVal as number) ? null : numVal
    });
  };

  const hasActiveFilters = 
    filters.status !== 'All Statuses' ||
    filters.priority !== 'All Priorities' ||
    filters.category !== 'All Categories' ||
    filters.stockStatus !== 'All Stock States' ||
    filters.minAmount !== null ||
    filters.maxAmount !== null;

  return (
    <div className="rounded-custom border border-parrys-surface-dim/60 bg-white p-4 md:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-parrys-charcoal">
          <FiSliders className="h-4.5 w-4.5 text-parrys-terracotta" />
          <span className="font-serif">Marketplace Filter Panel</span>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-custom border border-parrys-surface-dim bg-white px-3 py-1.5 text-xs text-parrys-charcoal hover:bg-parrys-cream transition btn-transition font-semibold"
          >
            <FiRotateCcw className="h-3 w-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Category Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Material Category</label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleSelectChange('category', e.target.value)}
              className="w-full appearance-none rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Approval Status</label>
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => handleSelectChange('status', e.target.value)}
              className="w-full appearance-none rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'All Statuses' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Priority Urgency</label>
          <div className="relative">
            <select
              value={filters.priority}
              onChange={(e) => handleSelectChange('priority', e.target.value)}
              className="w-full appearance-none rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
            >
              {PRIORITIES.map((prio) => (
                <option key={prio} value={prio}>
                  {prio === 'All Priorities' ? prio : prio.charAt(0).toUpperCase() + prio.slice(1)}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Inventory Status Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Inventory Status</label>
          <div className="relative">
            <select
              value={filters.stockStatus}
              onChange={(e) => handleSelectChange('stockStatus', e.target.value)}
              className="w-full appearance-none rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
            >
              {STOCK_STATUSES.map((stock) => (
                <option key={stock} value={stock}>
                  {stock === 'All Stock States' ? stock : stock.replace('-', ' ').toUpperCase()}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Numerical Filter Range */}
      <div className="mt-4 pt-4 border-t border-parrys-surface-dim/40">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Price Range Filter (₹)</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minAmount ?? ''}
              onChange={(e) => handleAmountChange('minAmount', e.target.value)}
              placeholder="Min Price"
              className="w-28 rounded-custom border border-parrys-surface-dim bg-white px-3 py-1.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
            />
            <span className="text-slate-400 text-xs">—</span>
            <input
              type="number"
              value={filters.maxAmount ?? ''}
              onChange={(e) => handleAmountChange('maxAmount', e.target.value)}
              placeholder="Max Price"
              className="w-28 rounded-custom border border-parrys-surface-dim bg-white px-3 py-1.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filters;
