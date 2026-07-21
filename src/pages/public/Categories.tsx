import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockDbService } from '../../services/mockDbService';
import { CATEGORIES } from '../../data/dummyData';
import { FiArrowRight, FiLayers } from 'react-icons/fi';

export const Categories: React.FC = () => {
  const products = useMemo(() => {
    return mockDbService.getProducts().filter(p => p.status === 'approved');
  }, []);

  const categoryCards = useMemo(() => {
    return CATEGORIES.filter(cat => cat !== 'All Categories').map(cat => {
      const count = products.filter(p => p.category === cat).length;
      let desc = '';
      if (cat === 'Cement & Aggregates') desc = 'OPC/PPC bags, sand aggregates, blue metals, and waterproofing concrete mixtures.';
      if (cat === 'Steel & Reinforcement') desc = 'High tensile TMT bars, structural beams, channel sections, and wire binding bundles.';
      if (cat === 'Ceramics & Flooring') desc = 'Double charged floor tiles, glazed ceramic vitrified tiles, marble slabs, and antiskid matt surfaces.';
      if (cat === 'Electricals & Pipes') desc = 'Single core copper wire, conduit pipes, Cpvc piping ball valves, and switch modular grids.';
      if (cat === 'Paints & Wall Finishes') desc = 'Weathercoat smooth emulsions, luxury acrylic interior primers, anti-dust wall coatings.';
      
      return { name: cat, count, desc };
    });
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif">Material Categories</h1>
        <p className="text-xs text-parrys-muted mt-1">Explore specialized building material classes from certified supplier networks.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryCards.map((card) => (
          <Link
            key={card.name}
            to={`/products?category=${encodeURIComponent(card.name)}`}
            className="flex flex-col justify-between rounded-custom border border-parrys-surface-dim/60 bg-white p-6 hover:border-parrys-terracotta hover:shadow-lg transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-custom bg-parrys-cream text-parrys-muted group-hover:text-white group-hover:bg-parrys-terracotta transition-all duration-300">
                  <FiLayers className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-parrys-cream px-3 py-1 text-xs font-bold text-parrys-terracotta border border-parrys-surface-dim/20">
                  {card.count} {card.count === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-parrys-charcoal font-serif group-hover:text-parrys-terracotta transition">
                  {card.name}
                </h3>
                <p className="mt-2 text-xs text-parrys-muted leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end border-t border-parrys-surface-dim/20 pt-4 text-xs font-semibold text-parrys-terracotta group-hover:underline">
              <span className="mr-1">Browse Category</span>
              <FiArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Categories;
