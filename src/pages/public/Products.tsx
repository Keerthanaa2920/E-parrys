import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockDbService } from '../../services/mockDbService';
import { CATEGORIES } from '../../data/dummyData';
import { SearchInput } from '../../components/common/SearchInput';
import { FiInbox, FiSliders } from 'react-icons/fi';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Categories';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  // Sync category when URL search parameters change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All Categories');
  }, [searchParams]);

  const products = useMemo(() => {
    let result = mockDbService.getProducts().filter(p => p.status === 'approved');

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.productName.toLowerCase().includes(q) ||
        p.vendorName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All Categories') {
      result = result.filter(p => p.category === selectedCategory);
    }

    return result;
  }, [search, selectedCategory]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All Categories') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif">Material Catalogue</h1>
        <p className="text-xs text-parrys-muted mt-1">Browse, filter, and procure wholesale construction materials listed by certified suppliers.</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row items-start">
        {/* Left Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 rounded-custom border border-parrys-surface-dim/40 bg-white p-5 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-parrys-surface-dim/30 pb-3.5 text-xs font-bold uppercase tracking-wider text-parrys-charcoal">
            <FiSliders className="h-4 w-4 text-parrys-terracotta" />
            <span>Filter Materials</span>
          </div>
          
          <div className="flex flex-col gap-1.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-left rounded-custom px-3.5 py-2.5 text-xs font-semibold transition-all duration-300 cursor-pointer
                    ${isSelected 
                      ? 'bg-parrys-cream text-parrys-terracotta border-l-2 border-parrys-terracotta font-bold shadow-[0_2px_8px_-4px_rgba(169,68,29,0.1)]' 
                      : 'text-parrys-muted hover:bg-parrys-cream/40 hover:text-parrys-terracotta'
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Listings Section */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search concrete, rebars, wiring, Asian paints..." 
            />
            
            <div className="text-xs text-parrys-muted shrink-0">
              Showing <span className="font-semibold text-parrys-charcoal font-mono">{products.length}</span> verified materials
            </div>
          </div>

          {products.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-custom border border-parrys-surface-dim bg-white p-6 text-center max-w-md mx-auto shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parrys-cream border border-parrys-surface-dim text-parrys-muted mb-5">
                <FiInbox className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-parrys-charcoal font-serif mb-1">No Materials Matched</h3>
              <p className="text-xs text-parrys-muted leading-relaxed mb-4">
                We couldn't find any approved marketplace items matching your search query or category filters.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  handleCategorySelect('All Categories');
                }}
                className="rounded-custom border border-parrys-surface-dim bg-white px-4 py-2 text-xs font-bold text-parrys-charcoal hover:bg-parrys-cream btn-transition"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((prd) => (
                <Link
                  key={prd.id}
                  to={`/product/${prd.id}`}
                  className="flex flex-col rounded-custom p-6 justify-between luxury-card group shadow-[0_4px_20px_-10px_rgba(169,68,29,0.05)]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[9px] font-bold text-parrys-muted uppercase tracking-widest">
                      <span>{prd.category}</span>
                      <span className="text-parrys-terracotta font-mono bg-parrys-cream px-2 py-0.5 rounded border border-parrys-surface-dim/30">{prd.sku}</span>
                    </div>
                    
                    <h3 className="text-sm font-bold text-parrys-charcoal group-hover:text-parrys-terracotta transition duration-300 leading-snug font-serif">
                      {prd.productName}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-parrys-muted mt-1 pt-2.5 border-t border-parrys-surface-dim/10">
                      <span>Vendor:</span>
                      <span className="font-bold text-parrys-charcoal truncate max-w-[140px]">{prd.vendorName}</span>
                    </div>
 
                    <div className="flex items-center justify-between text-xs text-parrys-muted">
                      <span>Specs:</span>
                      <span className="text-parrys-charcoal font-semibold truncate max-w-[140px]">{prd.specGrade}</span>
                    </div>
                  </div>
 
                  <div className="flex items-center justify-between border-t border-parrys-surface-dim/40 mt-4 pt-3.5">
                    <span className="text-sm font-extrabold font-mono text-parrys-terracotta">
                      ₹{prd.amount.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border
                      ${prd.stockStatus === 'in-stock' ? 'bg-emerald-50 text-emerald-700 border-emerald-500/10' : ''}
                      ${prd.stockStatus === 'low-stock' ? 'bg-amber-50 text-amber-700 border-amber-500/10' : ''}
                      ${prd.stockStatus === 'out-of-stock' ? 'bg-rose-50 text-rose-700 border-rose-500/10' : ''}
                    `}>
                      {prd.stockStatus.replace('-', ' ')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Products;
