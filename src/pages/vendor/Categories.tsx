import React, { useState } from 'react';
import { FiPlus, FiFolder } from 'react-icons/fi';

export const Categories: React.FC = () => {
  const [categories] = useState([
    { id: 1, name: 'Cement & Aggregates', status: 'Approved', products: 24 },
    { id: 2, name: 'Steel & TMT', status: 'Approved', products: 12 },
    { id: 3, name: 'Bricks & Blocks', status: 'Pending Approval', products: 0 },
  ]);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-parrys-charcoal font-serif">Category Management</h1>
          <p className="text-xs text-parrys-muted mt-1 font-semibold">Manage categories you sell products under.</p>
        </div>
        <button className="flex h-9 items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta px-4 text-xs font-bold text-white hover:bg-parrys-terracotta-dark hover:shadow-md shadow-sm transition btn-transition">
          <FiPlus /> Request Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-custom border border-parrys-surface-dim bg-white p-5 space-y-3 shadow-sm hover:shadow-md hover:border-parrys-terracotta/40 transition btn-transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-parrys-cream text-parrys-terracotta">
                <FiFolder className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-parrys-charcoal">{cat.name}</h3>
                <p className="text-[10px] font-medium text-parrys-muted">{cat.products} Active Products</p>
              </div>
            </div>
            
            <div className="pt-3 mt-1 border-t border-parrys-surface-dim/60 flex justify-between items-center">
              <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider border
                ${cat.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}
              `}>
                {cat.status}
              </span>
              <button className="text-xs font-semibold text-parrys-muted hover:text-parrys-terracotta transition">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
