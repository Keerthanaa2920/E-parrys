import React, { useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search products, vendors, SKUs..."
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full max-w-md shadow-sm rounded-custom">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
        <FiSearch className="h-4.5 w-4.5" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-custom border border-parrys-surface-dim bg-white py-2.5 pl-10 pr-10 text-sm text-parrys-charcoal placeholder-slate-400 transition-all outline-none focus:border-parrys-terracotta focus:ring-1 focus:ring-parrys-terracotta/25 font-sans"
      />
      {value ? (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center text-slate-450 hover:text-parrys-terracotta transition focus:outline-none"
          title="Clear search"
        >
          <FiX className="h-4 w-4" />
        </button>
      ) : (
        <div className="absolute inset-y-0 right-3 hidden items-center pointer-events-none sm:flex">
          <kbd className="rounded border border-parrys-surface-dim bg-parrys-cream px-1.5 py-0.5 text-[9px] font-bold text-parrys-muted">
            Ctrl K
          </kbd>
        </div>
      )}
    </div>
  );
};
export default SearchInput;
