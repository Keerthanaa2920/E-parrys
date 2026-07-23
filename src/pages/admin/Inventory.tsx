import React, { useState } from 'react';
import { FiBox, FiCheckCircle, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Inventory: React.FC = () => {
  const [inventory] = useState([
    { id: "INV-101", sku: "SKU-99201", product: "Tata Tiscon Fe 550D", vendor: "Tata Steel Distributors", warehouse: "Visakhapatnam Depot", stock: 1250, status: "Healthy" },
    { id: "INV-102", sku: "SKU-99202", product: "Birla Cement 53 Grade", vendor: "Birla Cement Hub", warehouse: "Chennai Main Yard", stock: 80, status: "Low" },
    { id: "INV-103", sku: "SKU-99203", product: "Kajaria Vitrified Tiles", vendor: "Kajaria Tile Gallery", warehouse: "Mumbai South Godown", stock: 0, status: "Out of Stock" },
    { id: "INV-104", sku: "SKU-99204", product: "Finolex 2.5 sqmm Wire", vendor: "Finolex Cables India", warehouse: "Coimbatore Yard", stock: 4500, status: "Healthy" },
  ]);

  const [toast, setToast] = useState('');

  const handleSync = () => {
    setToast('Inventory synced with vendor warehouses.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Global Inventory Tracking</h1>
          <p className="text-xs text-gray-500 mt-1">Monitor cross-warehouse stock levels and reorder warnings.</p>
        </div>
        <button
          onClick={handleSync}
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-orange-200 bg-white px-4 text-xs font-semibold text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition shadow-sm"
        >
          <FiRefreshCw className="h-4 w-4" />
          <span>Sync Stock DB</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-orange-100 bg-white shadow-sm p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <FiBox className="text-orange-500" />
            <span>Total Tracked SKUs</span>
          </div>
          <p className="text-xl font-bold text-gray-900">1,204 Active</p>
        </div>
        <div className="rounded-xl border border-orange-100 bg-white shadow-sm p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <FiAlertTriangle className="text-amber-500" />
            <span>Low Stock Warnings</span>
          </div>
          <p className="text-xl font-bold text-gray-900">12 Items</p>
        </div>
        <div className="rounded-xl border border-orange-100 bg-white shadow-sm p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <FiAlertTriangle className="text-red-500" />
            <span>Out of Stock</span>
          </div>
          <p className="text-xl font-bold text-gray-900">4 Items</p>
        </div>
      </div>

      <div className="rounded-xl border border-orange-100 bg-white overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-50/50 border-b border-orange-100 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                <th className="py-3.5 px-4">Tracking ID</th>
                <th className="py-3.5 px-4">SKU / Product</th>
                <th className="py-3.5 px-4">Vendor & Location</th>
                <th className="py-3.5 px-4 text-right">Available Stock</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50 text-xs text-gray-700">
              {inventory.map((inv) => (
                <tr key={inv.id} className="hover:bg-orange-50/30 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-orange-600">{inv.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{inv.product}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{inv.sku}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900">{inv.vendor}</span>
                      <span className="text-[10px] text-gray-500">{inv.warehouse}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-700">{inv.stock.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border
                      ${inv.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''}
                      ${inv.status === 'Low' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                      ${inv.status === 'Out of Stock' ? 'bg-red-50 text-red-600 border-red-200' : ''}
                    `}>
                      <span className="capitalize">{inv.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-xs font-semibold text-gray-800 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-500" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
