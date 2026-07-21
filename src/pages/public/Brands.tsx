import React from 'react';
import { FiAward, FiCheck } from 'react-icons/fi';

export const Brands: React.FC = () => {
  const brands = [
    { name: "Tata Steel", category: "Steel & Reinforcement", desc: "India's pioneer steel maker supplying high strength Tata Tiscon TMT rebars and channels.", cert: "ISO 9001, ISI Certified" },
    { name: "Birla Cement", category: "Cement & Aggregates", desc: "Wholesale manufacturer of OPC 53 Grade and PPC Flyash cement variants.", cert: "ISI, ISO 14001 Certified" },
    { name: "Kajaria Ceramics", category: "Ceramics & Flooring", desc: "Leading brand in premium vitrified floor tiles and polished digital wall claddings.", cert: "ISO 9001 Certified" },
    { name: "Finolex Cables", category: "Electricals & Pipes", desc: "Industry standard copper wires, flexible cables, and heavy duty SWR sewerage conduits.", cert: "IS/IEC 60227, ISI Certified" },
    { name: "Asian Paints", category: "Paints & Wall Finishes", desc: "Anti-dust exterior emulsions and luxury interior luxury wall coatings.", cert: "ISO 9001 Certified" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif">Partner Manufacturer Brands</h1>
        <p className="text-xs text-parrys-muted mt-1">Explore verified top-tier brands supplying building materials across E-Parrys.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brd) => (
          <div
            key={brd.name}
            className="flex flex-col justify-between rounded-custom border border-parrys-surface-dim/60 bg-white p-6 hover:border-parrys-terracotta hover:shadow-lg transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">{brd.category}</span>
                <FiAward className="h-5 w-5 text-amber-600" />
              </div>

              <div>
                <h3 className="text-base font-bold text-parrys-charcoal font-serif group-hover:text-parrys-terracotta transition">
                  {brd.name}
                </h3>
                <p className="mt-2 text-xs text-parrys-muted leading-relaxed">
                  {brd.desc}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-parrys-surface-dim/40 pt-4 flex items-center gap-1.5 text-[10px] text-parrys-muted font-semibold">
              <FiCheck className="text-emerald-600 h-3.5 w-3.5" />
              <span>{brd.cert}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Brands;
