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
        <aside className="w-full md:w-64 shrink-0 rounded-custom border border-parrys-surface-dim/60 bg-white p-4 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-parrys-surface-dim/40 pb-3 text-sm font-semibold text-parrys-charcoal">
            <FiSliders className="h-4.5 w-4.5 text-parrys-terracotta" />
            <span className="font-serif">Categories</span>
          </div>
          
          <div className="flex flex-col gap-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-left rounded-custom px-3 py-2 text-xs font-semibold transition-all btn-transition
                    ${isSelected 
                      ? 'bg-parrys-cream text-parrys-terracotta border-l-2 border-parrys-terracotta font-bold' 
                      : 'text-parrys-muted hover:bg-parrys-cream/50 hover:text-parrys-terracotta'
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
                  className="flex flex-col rounded-custom border border-parrys-surface-dim/60 bg-white p-5 justify-between hover:border-parrys-terracotta hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-[9px] font-bold text-parrys-muted uppercase">
                      <span>{prd.category}</span>
                      <span className="text-parrys-terracotta font-mono">{prd.sku}</span>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-parrys-charcoal group-hover:text-parrys-terracotta transition leading-snug font-serif">
                      {prd.productName}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-parrys-muted mt-1 pt-2 border-t border-parrys-surface-dim/10">
                      <span>Vendor:</span>
                      <span className="font-semibold text-parrys-charcoal truncate max-w-[140px]">{prd.vendorName}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-parrys-muted">
                      <span>Specs:</span>
                      <span className="text-parrys-charcoal font-medium truncate max-w-[140px]">{prd.specGrade}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-parrys-surface-dim/40 mt-4 pt-3">
                    <span className="text-sm font-bold font-mono text-parrys-charcoal">
                      ₹{prd.amount.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[10px] font-bold uppercase
                      ${prd.stockStatus === 'in-stock' ? 'text-emerald-600' : ''}
                      ${prd.stockStatus === 'low-stock' ? 'text-amber-600' : ''}
                      ${prd.stockStatus === 'out-of-stock' ? 'text-rose-600' : ''}
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
