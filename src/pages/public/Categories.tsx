import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockDbService } from '../../services/mockDbService';
import { CATEGORIES } from '../../data/dummyData';
import { 
  FiTrendingUp, FiTrendingDown, FiChevronRight 
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const CATEGORY_METADATA: Record<string, {
  index: string;
  priceTrend: string;
  priceDirection: 'up' | 'down';
  pricePercent: string;
  imageUrl: string;
  subcategories: string[];
  featuredItems: { name: string; supplier: string; stock: string; price: string }[];
  filters: { label: string; query: string }[];
}> = {
  "Cement & Aggregates": {
    index: "01",
    priceTrend: "Upward trend due to regional logistical surcharges",
    priceDirection: "up",
    pricePercent: "+2.4%",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800",
    subcategories: [
      "OPC 53 Grade Cement",
      "PPC Brand Sacks",
      "M-Sand Aggregates",
      "Blue Metal Gravel"
    ],
    featuredItems: [
      { name: "Birla Chetak OPC 53 Cement", supplier: "Birla Cement Hub", stock: "In-Stock (350 bags)", price: "₹450/bag" },
      { name: "Birla Super PPC Cement", supplier: "Birla Cement Hub", stock: "In-Stock (500 bags)", price: "₹430/bag" }
    ],
    filters: [
      { label: "Sourcing SLA", query: "stockStatus=in-stock" },
      { label: "Bulk Deals", query: "priceTier=bulk" },
      { label: "View All", query: "category=Cement%20%26%20Aggregates" }
    ]
  },
  "Steel & Reinforcement": {
    index: "02",
    priceTrend: "Index retraction from increased domestic production",
    priceDirection: "down",
    pricePercent: "-1.2%",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800",
    subcategories: [
      "Fe 550D TMT Rebars",
      "Heavy Load I-Beams",
      "MS Angle Sections",
      "Binding Wire Coils"
    ],
    featuredItems: [
      { name: "Tata Tiscon TMT Steel Rebars", supplier: "Tata Steel Distributors", stock: "In-Stock (15 tonnes)", price: "₹87,500/t" },
      { name: "Jindal Panther Fe 550D Rebars", supplier: "Jindal Steel Depot", stock: "Low Stock (2 tonnes)", price: "₹89,200/t" }
    ],
    filters: [
      { label: "TMT Rebars", query: "search=TMT" },
      { label: "In-Stock", query: "stockStatus=in-stock" },
      { label: "View All", query: "category=Steel%20%26%20Reinforcement" }
    ]
  },
  "Ceramics & Flooring": {
    index: "03",
    priceTrend: "Stable market price index for vitrified tiles",
    priceDirection: "up",
    pricePercent: "+0.8%",
    imageUrl: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=800",
    subcategories: [
      "Glazed Vitrified (GVT)",
      "Double Charged Tiles",
      "Anti-skid Ceramic Tiles",
      "Marble Flooring Slabs"
    ],
    featuredItems: [
      { name: "Kajaria Vitrified Floor Tiles", supplier: "Kajaria Tile Gallery", stock: "Low Stock (600 sq ft)", price: "₹45/sq ft" },
      { name: "RAK Ceramics Vitrified Slabs", supplier: "RAK Distributor Hub", stock: "In-Stock (1200 sq ft)", price: "₹65/sq ft" }
    ],
    filters: [
      { label: "Double Charged", query: "search=Double" },
      { label: "Anti-skid Range", query: "search=Anti-skid" },
      { label: "View All", query: "category=Ceramics%20%26%20Flooring" }
    ]
  },
  "Electricals & Pipes": {
    index: "04",
    priceTrend: "Elevated indices on global raw copper price hikes",
    priceDirection: "up",
    pricePercent: "+4.1%",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800",
    subcategories: [
      "Single Core Copper Wire",
      "CPVC Plumbing Pipes",
      "Modular switches",
      "Rigid PVC Conduit Pipes"
    ],
    featuredItems: [
      { name: "Finolex 3-Core Copper Wire", supplier: "Finolex Cables India", stock: "In-Stock (12 coils)", price: "₹4,400/coil" },
      { name: "Ashirvad CPVC Ball Valves", supplier: "Ashirvad Sourcing Depot", stock: "In-Stock (80 units)", price: "₹210/unit" }
    ],
    filters: [
      { label: "Copper Wiring", query: "search=Copper" },
      { label: "CPVC Plumbing", query: "search=CPVC" },
      { label: "View All", query: "category=Electricals%20%26%20Pipes" }
    ]
  },
  "Paints & Wall Finishes": {
    index: "05",
    priceTrend: "Marginal price dip heading into monsoon season",
    priceDirection: "down",
    pricePercent: "-0.5%",
    imageUrl: "https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=800",
    subcategories: [
      "Exterior Emulsions",
      "Premium Interior Matt",
      "Waterproofing Putty",
      "Metal Anti-rust Primers"
    ],
    featuredItems: [
      { name: "Asian Paints Apex Ultima White", supplier: "Asian Paints Emporium", stock: "Out-of-Stock (0 L)", price: "₹1,725/bucket" },
      { name: "Berger Weathercoat Shield", supplier: "Berger Paint Center", stock: "In-Stock (40 L)", price: "₹1,650/bucket" }
    ],
    filters: [
      { label: "Exterior Paint", query: "search=Exterior" },
      { label: "Waterproofing", query: "search=Putty" },
      { label: "View All", query: "category=Paints%20%26%20Wall%20Finishes" }
    ]
  }
};

export const Categories: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<any>(null);

  const activeIndex = lockedIndex !== null ? lockedIndex : hoveredIndex;

  const products = useMemo(() => {
    return mockDbService.getProducts().filter(p => p.status === 'approved');
  }, []);

  const categoryCards = useMemo(() => {
    return CATEGORIES.filter(cat => cat !== 'All Categories').map(cat => {
      const count = products.filter(p => p.category === cat).length;
      let desc = '';
      if (cat === 'Cement & Aggregates') desc = 'OPC/PPC bags, sand aggregates, and concrete mixtures.';
      if (cat === 'Steel & Reinforcement') desc = 'High tensile TMT bars, structural beams, and channel sections.';
      if (cat === 'Ceramics & Flooring') desc = 'Double charged floor tiles, glazed vitrified tiles, and marble slabs.';
      if (cat === 'Electricals & Pipes') desc = 'Single core copper wire, CPVC pipes, and modular switches.';
      if (cat === 'Paints & Wall Finishes') desc = 'Exterior weathercoat emulsions and interior primers.';
      
      return { name: cat, count, desc };
    });
  }, [products]);

  const handleMouseEnter = (idx: number) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredIndex(idx);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setHoveredIndex(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleCardClick = (idx: number) => {
    if (lockedIndex === idx) {
      setLockedIndex(null);
    } else {
      setLockedIndex(idx);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] md:max-h-[calc(100vh-80px)] overflow-hidden bg-slate-950 flex flex-col relative">
      {/* Page Header (Floating absolute positioned overlay!) */}
      <div className="absolute top-8 left-8 z-30 pointer-events-none hidden md:block">
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-serif drop-shadow-md">
          Material Explorer
        </h1>
        <p className="text-[10px] text-slate-300 font-extrabold uppercase tracking-widest mt-1 drop-shadow">
          Drag / Click side columns to inspect live aggregates pricing
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden w-full h-full relative">
        {categoryCards.map((card, idx) => {
          const meta = CATEGORY_METADATA[card.name as keyof typeof CATEGORY_METADATA];
          const isActive = activeIndex === idx;

          return (
            <div 
              key={card.name}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(idx)}
              className={`flex-shrink-0 transition-all duration-500 ease-in-out relative border-b md:border-b-0 md:border-r border-slate-800/60 overflow-hidden cursor-pointer group select-none
                ${lockedIndex === idx ? 'ring-1 ring-parrys-terracotta/40' : ''}
              `}
              style={{
                flexGrow: isActive ? 3.5 : (activeIndex !== null ? 0.6 : 1),
                flexShrink: 1,
                flexBasis: '0%',
                willChange: 'flex-grow, height',
                height: window.innerWidth < 768 
                  ? (isActive ? '360px' : (activeIndex !== null ? '90px' : '140px'))
                  : '100%'
              }}
            >
              {meta && (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out scale-100 group-hover:scale-105"
                  style={{ backgroundImage: `url(${meta.imageUrl})` }}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 z-10" />

              {activeIndex !== null && activeIndex !== idx && (
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] transition-all duration-500 z-20 pointer-events-none" />
              )}

              <div className="absolute inset-0 p-6 pt-20 md:pt-28 flex flex-col justify-between z-20 text-white">
                <div className="flex justify-between items-start">
                  {meta && (
                    <span className="text-3xl font-mono font-extrabold text-white/20">
                      {meta.index}
                    </span>
                  )}
                  {meta && (
                    <span className={`inline-flex items-center gap-0.5 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border bg-black/40 backdrop-blur-sm ${
                      meta.priceDirection === 'up' ? 'text-emerald-400 border-emerald-500/30' : 'text-red-400 border-red-500/30'
                    }`}>
                      {meta.priceDirection === 'up' ? <FiTrendingUp className="inline mr-0.5" /> : <FiTrendingDown className="inline mr-0.5" />}
                      {meta.pricePercent}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2 group-hover:text-parrys-terracotta transition duration-300 whitespace-nowrap">
                      {card.name}
                      <FiChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 hidden md:inline-block" />
                      {lockedIndex === idx && (
                        <span className="text-[8px] font-extrabold uppercase tracking-widest text-parrys-terracotta bg-parrys-terracotta/10 px-2 py-0.5 rounded border border-parrys-terracotta/20">Locked</span>
                      )}
                    </h3>
                    <p className={`text-[11px] text-slate-300 leading-relaxed font-semibold mt-1 transition-all duration-500 ${
                      activeIndex !== null && !isActive ? 'opacity-0 select-none' : 'opacity-100'
                    }`}>
                      {card.desc}
                    </p>
                  </div>

                  <AnimatePresence>
                    {isActive && meta && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4 pt-3 border-t border-white/10 overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-1.5">
                          {meta.subcategories.slice(0, 3).map((sub, sIdx) => (
                            <span key={sIdx} className="bg-white/10 border border-white/5 rounded px-2 py-0.5 text-[9px] font-bold text-slate-300">
                              {sub}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <p className="text-[9px] font-extrabold uppercase text-parrys-terracotta tracking-wider">Clickable Live Stock</p>
                          <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                            {meta.featuredItems.map((item, itemIdx) => (
                              <Link
                                key={itemIdx}
                                to={`/products?search=${encodeURIComponent(item.name)}`}
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 bg-black/40 border border-white/10 rounded hover:border-parrys-terracotta hover:bg-black/60 transition duration-200 flex items-center justify-between text-left gap-2 text-[10px]"
                              >
                                <div className="truncate">
                                  <p className="font-bold text-white truncate">{item.name}</p>
                                  <p className="text-[9px] text-slate-400 truncate">{item.supplier}</p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="font-bold text-parrys-terracotta">{item.price}</p>
                                  <p className="text-[8px] text-emerald-400 font-semibold">{item.stock.split(' ')[0]}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {meta.filters.map((filter, filterIdx) => (
                            <Link
                              key={filterIdx}
                              to={`/products?${filter.query}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 text-center bg-parrys-terracotta hover:bg-parrys-terracotta-dark text-white rounded py-2 text-[9px] font-bold uppercase tracking-wider transition select-none hover:text-white"
                            >
                              {filter.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
