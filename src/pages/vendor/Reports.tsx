import React from 'react';
import { FiTrendingUp, FiPieChart, FiDollarSign, FiDownload } from 'react-icons/fi';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-parrys-charcoal font-serif">Sales Reports & Analytics</h1>
          <p className="text-xs text-parrys-muted mt-1 font-semibold">Monitor your store's performance and revenue.</p>
        </div>
        <button className="flex items-center gap-2 rounded-custom bg-white border border-parrys-surface-dim px-4 py-2 text-xs font-bold text-parrys-muted hover:text-parrys-charcoal hover:bg-parrys-surface-dim/10 transition shadow-sm btn-transition">
          <FiDownload /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-5 shadow-sm hover:shadow-md transition btn-transition">
          <div className="flex items-center gap-3 text-parrys-muted mb-2">
            <FiDollarSign className="text-emerald-600" />
            <h3 className="text-sm font-bold">Total Revenue</h3>
          </div>
          <div className="text-2xl font-bold text-parrys-charcoal font-mono">₹24,50,000</div>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">+12% from last month</p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-5 shadow-sm hover:shadow-md transition btn-transition">
          <div className="flex items-center gap-3 text-parrys-muted mb-2">
            <FiTrendingUp className="text-blue-600" />
            <h3 className="text-sm font-bold">Orders Completed</h3>
          </div>
          <div className="text-2xl font-bold text-parrys-charcoal font-mono">342</div>
          <p className="text-[10px] text-blue-600 font-bold mt-1">Avg 12 per day</p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-5 shadow-sm hover:shadow-md transition btn-transition">
          <div className="flex items-center gap-3 text-parrys-muted mb-2">
            <FiPieChart className="text-amber-600" />
            <h3 className="text-sm font-bold">Top Category</h3>
          </div>
          <div className="text-2xl font-bold text-parrys-charcoal">Cement</div>
          <p className="text-[10px] text-amber-600 font-bold mt-1">75% of total volume</p>
        </div>
      </div>

      <div className="rounded-custom border border-parrys-surface-dim bg-white shadow-sm p-6 min-h-[300px] flex items-center justify-center">
        <div className="text-center text-parrys-muted">
          <FiPieChart className="h-10 w-10 mx-auto mb-3 opacity-30 text-parrys-terracotta" />
          <p className="text-sm font-bold">Detailed charts and graphs will populate here.</p>
        </div>
      </div>
    </div>
  );
};
