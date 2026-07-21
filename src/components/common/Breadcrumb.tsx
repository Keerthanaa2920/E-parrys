import React from 'react';
import { FiHome, FiChevronRight } from 'react-icons/fi';

interface BreadcrumbProps {
  items: string[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold text-parrys-muted mb-6" aria-label="Breadcrumb">
      <div className="flex items-center gap-1 hover:text-parrys-terracotta transition cursor-pointer">
        <FiHome className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">E-Parrys</span>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <FiChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span 
            className={`capitalize truncate max-w-[120px] sm:max-w-none
              ${index === items.length - 1 
                ? 'text-parrys-terracotta font-bold' 
                : 'hover:text-parrys-charcoal transition cursor-pointer'
              }
            `}
          >
            {item.replace(/_/g, ' ')}
          </span>
        </div>
      ))}
    </nav>
  );
};
