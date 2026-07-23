import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockDbService } from '../../services/mockDbService';
import { CATEGORIES } from '../../data/dummyData';
import { SearchInput } from '../../components/common/SearchInput';
import { FiInbox, FiSliders } from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

interface IEstimation {
  qty: number;
  unit: string;
  explanation: string;
}

const estimateProductQuantity = (category: string, productName: string, area: number): IEstimation => {
  const pName = productName.toLowerCase();
  const cat = category;

  if (cat === 'Cement & Aggregates') {
    if (pName.includes('sand')) {
      const qty = Math.ceil(area * 0.02);
      return {
        qty,
        unit: 'brass',
        explanation: '1 brass covers ~50 sq ft (2" thickness)'
      };
    } else if (pName.includes('brick') || pName.includes('block')) {
      const qty = Math.ceil(area * 4.5);
      return {
        qty,
        unit: 'units',
        explanation: 'Approx. 4.5 bricks per sq ft wall conversion'
      };
    } else {
      const qty = Math.ceil(area * 0.35);
      return {
        qty,
        unit: 'bags',
        explanation: 'Approx. 0.35 bags of cement per sq ft slab'
      };
    }
  } else if (cat === 'Steel & Reinforcement') {
    const qty = Math.ceil(area * 0.15);
    return {
      qty,
      unit: 'bundles',
      explanation: 'Approx. 1.5 - 2kg steel/sq ft (1 bundle ≈ 70kg)'
    };
  } else if (cat === 'Ceramics & Flooring') {
    const qty = Math.ceil(area / 16);
    return {
      qty,
      unit: 'boxes',
      explanation: '1 standard box of tiles covers ~16 sq ft'
    };
  } else if (cat === 'Paints & Wall Finishes') {
    const qty = Math.ceil(area / 70);
    return {
      qty,
      unit: 'litres',
      explanation: 'Double coat covers approx. 70 sq ft/L'
    };
  } else if (cat === 'Electricals & Pipes') {
    if (pName.includes('wire') || pName.includes('cable')) {
      const qty = Math.ceil(area * 0.08);
      return {
        qty,
        unit: 'coils',
        explanation: 'Approx. 0.08 coils of wire per sq ft layout'
      };
    } else {
      const qty = Math.ceil(area * 0.3);
      return {
        qty,
        unit: 'lengths',
        explanation: 'Approx. 0.3 pipe lengths (3m each) per sq ft'
      };
    }
  }

  const qty = Math.ceil(area * 0.1);
  return {
    qty,
    unit: 'units',
    explanation: 'General estimation of 0.1 units per sq ft'
  };
};

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Categories';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [activeBlueprintSector, setActiveBlueprintSector] = useState<'Foundation' | 'Framing' | 'MEP' | 'Finishing' | null>(null);

  // Room Size Estimator State
  const [roomLength, setRoomLength] = useState<string>('12');
  const [roomWidth, setRoomWidth] = useState<string>('10');
  const [activeCalcPrdId, setActiveCalcPrdId] = useState<string | null>(null);

  // Cart Sourcing Integration
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Custom adjusted quantities for each product on the grid
  const [customQuantities, setCustomQuantities] = useState<Record<string, number>>({});

  const handleAdjustQty = (prdId: string, diff: number, defaultQty: number) => {
    const currentVal = customQuantities[prdId] !== undefined ? customQuantities[prdId] : defaultQty;
    const newVal = Math.max(1, currentVal + diff);
    setCustomQuantities(prev => ({ ...prev, [prdId]: newVal }));
  };

  const area = useMemo(() => {
    const l = parseFloat(roomLength) || 0;
    const w = parseFloat(roomWidth) || 0;
    return l * w;
  }, [roomLength, roomWidth]);

  // Reset custom adjustments when dimensions change
  useEffect(() => {
    setCustomQuantities({});
  }, [area]);


  // Sync category when URL search parameters change
  useEffect(() => {
    const cat = searchParams.get('category') || 'All Categories';
    setSelectedCategory(cat);
    if (cat !== 'All Categories') {
      setActiveBlueprintSector(null);
    }
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

    if (activeBlueprintSector) {
      if (activeBlueprintSector === 'Foundation') {
        result = result.filter(p =>
          p.category === 'Cement & Aggregates' ||
          p.category === 'Steel & Reinforcement'
        );
      } else if (activeBlueprintSector === 'Framing') {
        result = result.filter(p =>
          p.category === 'Ceramics & Flooring' ||
          p.productName.toLowerCase().includes('brick') ||
          p.productName.toLowerCase().includes('block')
        );
      } else if (activeBlueprintSector === 'MEP') {
        result = result.filter(p => p.category === 'Electricals & Pipes');
      } else if (activeBlueprintSector === 'Finishing') {
        result = result.filter(p => p.category === 'Paints & Wall Finishes');
      }
    } else if (selectedCategory !== 'All Categories') {
      result = result.filter(p => p.category === selectedCategory);
    }

    return result;
  }, [search, selectedCategory, activeBlueprintSector]);

  const handleCategorySelect = (cat: string) => {
    setActiveBlueprintSector(null);
    setSelectedCategory(cat);
    if (cat === 'All Categories') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const activeSectorDetails = useMemo(() => {
    if (!activeBlueprintSector) return null;
    const details = {
      Foundation: {
        title: "Foundation Phase",
        desc: "Sourcing for site excavation, column footings, and structural concrete framing.",
        categories: ["Cement & Aggregates", "Steel & Reinforcement"],
        tip: "Check ISI certifications for Fe 550D TMT bars and OPC 53 Grade bags."
      },
      Framing: {
        title: "Framing & Walls",
        desc: "Materials for floor slabs, columns, masonry walls, and clay partitioning.",
        categories: ["Ceramics & Flooring"],
        tip: "Order bricks and structural reinforcement loads together to reduce transit logs."
      },
      MEP: {
        title: "MEP Systems",
        desc: "Mechanical, electrical, and plumbing logistics running through structural walls.",
        categories: ["Electricals & Pipes"],
        tip: "Conduits and copper wire capacities must comply with ISI fire-retardant standards."
      },
      Finishing: {
        title: "Roof & Finishing",
        desc: "Pitched roofing truss metal sheets, vitrified flooring, and emulsions.",
        categories: ["Paints & Wall Finishes"],
        tip: "Acrylic emulsions and tile grout dispatches are usually scheduled in final stages."
      }
    };
    return details[activeBlueprintSector];
  }, [activeBlueprintSector]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif">Material Catalogue</h1>
          <p className="text-xs text-parrys-muted mt-1">Browse, filter, and procure wholesale construction materials listed by certified suppliers.</p>
        </div>
        {activeBlueprintSector && (
          <button
            onClick={() => {
              setActiveBlueprintSector(null);
              setSelectedCategory('All Categories');
            }}
            className="text-[10px] font-bold uppercase tracking-wider text-parrys-terracotta bg-parrys-cream border border-parrys-surface-dim hover:bg-parrys-surface-dim/20 rounded-custom px-3 py-1.5 transition cursor-pointer self-start md:self-auto"
          >
            Clear Blueprint Filter
          </button>
        )}
      </div>

      {/* Blueprint Header Layout Visual Mapping */}
      <div className="bg-[#faf8f5] border border-parrys-surface-dim/70 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        {/* Architectural grid background decoration */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(var(--color-parrys-surface-dim) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">

          {/* Blueprint SVG Section */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-parrys-terracotta uppercase tracking-widest font-sans">
                Interactive Building Plan
              </span>
              <span className="text-[9px] text-parrys-muted font-semibold">
                Click a structural zone below to filter matching materials
              </span>
            </div>

            <div className="relative border border-parrys-surface-dim/40 rounded-xl bg-white p-2 shadow-inner flex items-center justify-center overflow-x-auto no-scrollbar">
              <svg viewBox="0 0 800 240" className="w-full min-w-[640px] h-[240px]" xmlns="http://www.w3.org/2000/svg">
                {/* SVG definitions */}
                <defs>
                  <pattern id="draft-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.8" fill="#e2d9cf" opacity="0.8" />
                  </pattern>
                </defs>

                {/* Internal layout background */}
                <rect width="100%" height="100%" fill="url(#draft-grid)" rx="6" />

                {/* Ground construction level line */}
                <line x1="40" y1="210" x2="760" y2="210" stroke="var(--color-parrys-surface-dim)" strokeWidth="2.5" />

                {/* Interactive Building Stage Groups */}

                {/* STAGE 1: Foundation */}
                <g
                  onClick={() => {
                    setActiveBlueprintSector('Foundation');
                    setSelectedCategory('All Categories');
                  }}
                  className="group cursor-pointer select-none"
                >
                  <rect
                    x="80" y="180" width="640" height="50"
                    className={`transition-all duration-300 ${activeBlueprintSector === 'Foundation'
                        ? 'fill-parrys-terracotta/15 stroke-1.5 stroke-parrys-terracotta'
                        : 'fill-transparent group-hover:fill-parrys-terracotta/5 stroke-0'
                      }`}
                  />
                  <line x1="80" y1="180" x2="720" y2="180" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <line x1="80" y1="210" x2="720" y2="210" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <path d="M140,210 L140,230 L180,230 L180,210 Z M380,210 L380,230 L420,230 L420,210 Z M620,210 L620,230 L660,230 L660,210 Z" fill="none" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <text x="400" y="200" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-wider fill-parrys-charcoal font-sans">
                    Foundation & Reinforcement Slab (Cement, Rebars, Sand)
                  </text>
                </g>

                {/* STAGE 2: Framing & Walls */}
                <g
                  onClick={() => {
                    setActiveBlueprintSector('Framing');
                    setSelectedCategory('All Categories');
                  }}
                  className="group cursor-pointer select-none"
                >
                  <path
                    d="M120,80 L390,80 L390,180 L120,180 Z"
                    className={`transition-all duration-300 ${activeBlueprintSector === 'Framing'
                        ? 'fill-parrys-terracotta/15 stroke-1.5 stroke-parrys-terracotta'
                        : 'fill-transparent group-hover:fill-parrys-terracotta/5 stroke-0'
                      }`}
                  />
                  <rect x="140" y="80" width="20" height="100" fill="none" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <rect x="370" y="80" width="20" height="100" fill="none" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <path d="M160,95 L370,95 M160,110 L370,110 M160,125 L370,125 M160,140 L370,140 M160,155 L370,155" stroke="var(--color-parrys-surface-dim)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="255" y="135" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-wider fill-parrys-charcoal font-sans">
                    Framing & Walls (Bricks, Tiles)
                  </text>
                </g>

                {/* STAGE 3: MEP Systems */}
                <g
                  onClick={() => {
                    setActiveBlueprintSector('MEP');
                    setSelectedCategory('All Categories');
                  }}
                  className="group cursor-pointer select-none"
                >
                  <path
                    d="M390,80 L680,80 L680,180 L390,180 Z"
                    className={`transition-all duration-300 ${activeBlueprintSector === 'MEP'
                        ? 'fill-parrys-terracotta/15 stroke-1.5 stroke-parrys-terracotta'
                        : 'fill-transparent group-hover:fill-parrys-terracotta/5 stroke-0'
                      }`}
                  />
                  <rect x="650" y="80" width="20" height="100" fill="none" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <path d="M410,95 Q450,115 500,100 T590,135 T640,105" fill="none" stroke="var(--color-parrys-terracotta)" strokeWidth="1.2" strokeDasharray="3 3" />
                  <path d="M410,145 Q470,130 530,155 T640,140" fill="none" stroke="var(--color-parrys-muted)" strokeWidth="1.5" />
                  <circle cx="500" cy="100" r="3.5" fill="none" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <circle cx="530" cy="155" r="3.5" fill="none" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <text x="535" y="135" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-wider fill-parrys-charcoal font-sans">
                    Electricals & Pipes (MEP)
                  </text>
                </g>

                {/* STAGE 4: Roof & Finishes */}
                <g
                  onClick={() => {
                    setActiveBlueprintSector('Finishing');
                    setSelectedCategory('All Categories');
                  }}
                  className="group cursor-pointer select-none"
                >
                  <path
                    d="M100,80 L400,20 L700,80 Z"
                    className={`transition-all duration-300 ${activeBlueprintSector === 'Finishing'
                        ? 'fill-parrys-terracotta/15 stroke-1.5 stroke-parrys-terracotta'
                        : 'fill-transparent group-hover:fill-parrys-terracotta/5 stroke-0'
                      }`}
                  />
                  <path d="M100,80 L700,80 L400,20 Z" fill="none" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <line x1="400" y1="20" x2="400" y2="80" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <line x1="250" y1="50" x2="400" y2="80" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <line x1="550" y1="50" x2="400" y2="80" stroke="var(--color-parrys-charcoal)" strokeWidth="1.5" />
                  <text x="400" y="55" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-wider fill-parrys-charcoal font-sans">
                    Roofing, Paints & Finishes
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Details Sidebar Card */}
          <div className="lg:col-span-4 flex flex-col h-full justify-between">
            {activeBlueprintSector && activeSectorDetails ? (
              <div className="rounded-xl border border-parrys-terracotta/20 bg-parrys-cream/50 p-5 space-y-4 shadow-inner flex flex-col justify-between h-full min-h-[220px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-parrys-charcoal font-serif tracking-wide">
                      {activeSectorDetails.title}
                    </h3>
                    <span className="text-[7.5px] bg-parrys-terracotta text-white font-bold uppercase px-2 py-0.5 rounded tracking-widest animate-pulse">
                      Active Filter
                    </span>
                  </div>
                  <p className="text-[11px] text-parrys-muted leading-relaxed font-semibold">
                    {activeSectorDetails.desc}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-parrys-surface-dim/35">
                  <div>
                    <span className="text-[8px] font-bold uppercase text-parrys-muted tracking-wider block mb-1">
                      Matched Categories
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {activeSectorDetails.categories.map(cat => (
                        <span key={cat} className="text-[8.5px] font-bold bg-white text-parrys-charcoal border border-parrys-surface-dim/60 px-2 py-0.5 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/80 p-2.5 rounded border border-parrys-surface-dim/30 text-[9.5px] text-parrys-muted font-semibold leading-relaxed">
                    💡 <span className="italic">{activeSectorDetails.tip}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-parrys-surface-dim/50 bg-white p-5 text-center flex flex-col items-center justify-center space-y-3 h-full min-h-[220px] shadow-inner">
                <div className="w-10 h-10 rounded-full bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center text-parrys-muted">
                  <FiInbox className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-parrys-charcoal">Visual Sourcing Stage</h3>
                  <p className="text-[10px] text-parrys-muted max-w-[200px] leading-relaxed font-semibold">
                    Click on different building zones in the blueprint drawing to filter materials matching specific structural staging phases.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
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
                  className="relative overflow-hidden flex flex-col rounded-custom p-6 justify-between luxury-card group shadow-[0_4px_20px_-10px_rgba(169,68,29,0.05)]"
                >
                  {/* Glassmorphic calculator overlay */}
                  {activeCalcPrdId === prd.id && (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="absolute inset-0 z-20 flex flex-col justify-between bg-parrys-cream/95 backdrop-blur-md rounded-custom p-5 border border-parrys-terracotta/20 animate-fade-in text-left"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-parrys-surface-dim/40 pb-2">
                          <div className="flex items-center gap-1.5 text-parrys-charcoal">
                            <FaCalculator className="w-3.5 h-3.5 text-parrys-terracotta" />
                            <span className="text-xs font-bold font-serif">Room Estimator</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveCalcPrdId(null);
                            }}
                            className="text-parrys-muted hover:text-parrys-terracotta text-xs font-bold px-1.5 py-0.5 rounded hover:bg-parrys-cream/85 transition cursor-pointer"
                          >
                            Close
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[8px] uppercase font-extrabold text-parrys-muted block mb-1">
                              Length (ft)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={roomLength}
                              onChange={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setRoomLength(e.target.value);
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onKeyDown={(e) => e.stopPropagation()}
                              className="w-full text-xs font-bold font-mono px-2.5 py-1.5 rounded border border-parrys-surface-dim bg-white text-parrys-charcoal focus:outline-none focus:border-parrys-terracotta"
                            />
                          </div>
                          <div>
                            <label className="text-[8px] uppercase font-extrabold text-parrys-muted block mb-1">
                              Width (ft)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={roomWidth}
                              onChange={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setRoomWidth(e.target.value);
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onKeyDown={(e) => e.stopPropagation()}
                              className="w-full text-xs font-bold font-mono px-2.5 py-1.5 rounded border border-parrys-surface-dim bg-white text-parrys-charcoal focus:outline-none focus:border-parrys-terracotta"
                            />
                          </div>
                        </div>

                        <div className="bg-[#FAF8F5] p-2.5 rounded border border-parrys-surface-dim/40 space-y-1.5 text-left">
                          <div className="flex items-center justify-between text-[10px] text-parrys-muted">
                            <span>Area:</span>
                            <span className="font-bold text-parrys-charcoal font-mono">{area.toFixed(1)} sq ft</span>
                          </div>

                          {(() => {
                            const est = estimateProductQuantity(prd.category, prd.productName, area);
                            const totalCost = est.qty * prd.amount;
                            return (
                              <>
                                <div className="flex items-center justify-between text-xs border-t border-parrys-surface-dim/20 pt-1.5">
                                  <span className="font-bold text-parrys-charcoal">Needed:</span>
                                  <span className="font-extrabold text-parrys-terracotta font-mono">
                                    {est.qty} {est.unit}
                                  </span>
                                </div>
                                <div className="text-[8.5px] text-parrys-muted italic leading-tight">
                                  {est.explanation}
                                </div>
                                <div className="flex items-center justify-between text-xs border-t border-parrys-surface-dim/20 pt-1.5">
                                  <span className="font-bold text-parrys-charcoal">Est. Cost:</span>
                                  <span className="font-extrabold text-parrys-terracotta font-mono">
                                    ₹{totalCost.toLocaleString('en-IN')}
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      <div className="space-y-2 mt-3 text-left">
                        {(() => {
                          const est = estimateProductQuantity(prd.category, prd.productName, area);
                          return (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(prd, est.qty);
                                setAddedProductId(prd.id);
                                setTimeout(() => {
                                  setAddedProductId(null);
                                  setActiveCalcPrdId(null);
                                }, 1500);
                              }}
                              className={`w-full text-center rounded-custom py-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm
                                ${addedProductId === prd.id
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                  : 'bg-parrys-terracotta hover:bg-parrys-terracotta-dark text-white'
                                }
                              `}
                            >
                              {addedProductId === prd.id ? 'Added ✓' : `Add ${est.qty} ${est.unit} to Cart`}
                            </button>
                          );
                        })()}

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveCalcPrdId(null);
                          }}
                          className="w-full text-center border border-parrys-surface-dim/70 hover:bg-parrys-cream hover:text-parrys-terracotta text-parrys-muted rounded-custom py-1.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                        >
                          Apply Room Size
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[9px] font-bold text-parrys-muted uppercase tracking-widest">
                      <span>{prd.category}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-parrys-terracotta font-mono bg-parrys-cream px-2 py-0.5 rounded border border-parrys-surface-dim/30">{prd.sku}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveCalcPrdId(prd.id);
                          }}
                          className="p-1 rounded bg-parrys-cream hover:bg-parrys-terracotta hover:text-white border border-parrys-surface-dim/30 text-parrys-terracotta transition cursor-pointer"
                          title="Open Room Estimator"
                        >
                          <FaCalculator className="w-3.5 h-3.5" />
                        </button>
                      </div>
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

                  <div>
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
                    {/* Explicit CTA Estimator trigger button (only shown if area is not set to make the calculator extremely obvious to users) */}
                    {area === 0 && activeCalcPrdId !== prd.id && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveCalcPrdId(prd.id);
                        }}
                        className="mt-3 w-full border border-parrys-terracotta/30 hover:bg-parrys-cream hover:border-parrys-terracotta text-parrys-terracotta rounded-custom py-2 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                      >
                        <FaCalculator className="w-3 h-3 text-parrys-terracotta" />
                        <span>Room Estimator</span>
                      </button>
                    )}

                    {/* Estimator Quick Badge with Add to Cart option */}
                    {area > 0 && activeCalcPrdId !== prd.id && (() => {
                      const est = estimateProductQuantity(prd.category, prd.productName, area);
                      const currentQty = customQuantities[prd.id] !== undefined ? customQuantities[prd.id] : est.qty;
                      const currentCost = currentQty * prd.amount;
                      return (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveCalcPrdId(prd.id);
                          }}
                          className="mt-3 p-2.5 rounded-lg bg-parrys-cream border border-parrys-terracotta/20 flex flex-col gap-2 hover:border-parrys-terracotta transition cursor-pointer text-left"
                        >
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-parrys-muted">
                                <FaCalculator className="w-3 h-3 text-parrys-terracotta shrink-0" />
                                <span>Est. ({roomLength}x{roomWidth} ft):</span>
                              </div>
                              
                              <div className="flex items-center gap-1.5 mt-0.5" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAdjustQty(prd.id, -1, est.qty);
                                  }}
                                  className="w-5 h-5 flex items-center justify-center rounded bg-white hover:bg-parrys-terracotta hover:text-white border border-parrys-surface-dim/50 text-xs font-bold text-parrys-charcoal transition cursor-pointer"
                                >
                                  -
                                </button>
                                
                                <span className="font-extrabold text-parrys-charcoal font-serif text-[13px] min-w-[16px] text-center">
                                  {currentQty}
                                </span>

                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAdjustQty(prd.id, 1, est.qty);
                                  }}
                                  className="w-5 h-5 flex items-center justify-center rounded bg-white hover:bg-parrys-terracotta hover:text-white border border-parrys-surface-dim/50 text-xs font-bold text-parrys-charcoal transition cursor-pointer"
                                >
                                  +
                                </button>
                                
                                <span className="text-[11px] font-medium text-parrys-muted lowercase">
                                  {est.unit}
                                </span>
                              </div>
                            </div>
                            <span className="font-extrabold text-parrys-terracotta font-mono text-xs">
                              ₹{currentCost.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(prd, currentQty);
                              setAddedProductId(prd.id);
                              setTimeout(() => setAddedProductId(null), 2000);
                            }}
                            className={`w-full text-center text-[10px] font-bold uppercase tracking-wider py-1.5 rounded transition-all duration-300
                              ${addedProductId === prd.id
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-parrys-terracotta hover:bg-parrys-terracotta-dark text-white'
                              }
                            `}
                          >
                            {addedProductId === prd.id ? 'Added ✓' : 'Add Est. Qty to Cart'}
                          </button>
                        </div>
                      );
                    })()}
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
