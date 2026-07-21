import React, { useState } from 'react';
import { mockDbService } from '../../services/mockDbService';
import type { IMarketplaceItem } from '../../types/dashboard';
import { FiPlus, FiMinus, FiSave, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Inventory: React.FC = () => {
  const vendorName = "Birla Cement Hub";
  const [products, setProducts] = useState<IMarketplaceItem[]>(() => 
    mockDbService.getProducts().filter(p => p.vendorName === vendorName)
  );
  
  const [toast, setToast] = useState('');

  const handleStockAdjust = (id: string, amount: number) => {
    setProducts(prev => 
      prev.map(p => {
        if (p.id === id) {
          const newQty = Math.max(0, p.quantity + amount);
          let newStockStatus: IMarketplaceItem['stockStatus'] = 'in-stock';
          if (newQty === 0) newStockStatus = 'out-of-stock';
          else if (newQty < 100) newStockStatus = 'low-stock';

          const updated = {
            ...p,
            quantity: newQty,
            stockStatus: newStockStatus
          };
          
          // Save immediately to DB
          mockDbService.updateProduct(updated);
          return updated;
        }
        return p;
      })
    );
  };

  const handleManualQtyChange = (id: string, val: string) => {
    const qty = parseInt(val);
    if (isNaN(qty) || qty < 0) return;

    setProducts(prev => 
      prev.map(p => {
        if (p.id === id) {
          let newStockStatus: IMarketplaceItem['stockStatus'] = 'in-stock';
          if (qty === 0) newStockStatus = 'out-of-stock';
          else if (qty < 100) newStockStatus = 'low-stock';

          const updated = {
            ...p,
            quantity: qty,
            stockStatus: newStockStatus
          };

          mockDbService.updateProduct(updated);
          return updated;
        }
        return p;
      })
    );
  };

  const triggerSaveNotification = () => {
    setToast("Inventory stock levels synchronized successfully.");
    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Stock Inventory</h1>
          <p className="text-xs text-slate-400 mt-1">Monitor, restock, and update stock counts for active listings.</p>
        </div>

        <button
          onClick={triggerSaveNotification}
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-650 px-4 text-xs font-bold text-white shadow-lg hover:from-emerald-500 hover:to-indigo-550 transition"
        >
          <FiSave className="h-4 w-4" />
          <span>Sync Stock DB</span>
        </button>
      </div>

      {/* Inventory table */}
      <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-[var(--color-brand-border)] text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">SKU / ID</th>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Spec Specification</th>
                <th className="py-3.5 px-4">Yard Location</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center w-48">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
              {products.map((prd) => (
                <tr key={prd.id} className="hover:bg-slate-900/30 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-450">{prd.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-200">{prd.productName}</td>
                  <td className="py-3 px-4 text-slate-400">{prd.specGrade}</td>
                  <td className="py-3 px-4 text-slate-400">{prd.warehouse}</td>
                  
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border
                      ${prd.stockStatus === 'in-stock' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20' : ''}
                      ${prd.stockStatus === 'low-stock' ? 'bg-amber-950/20 text-amber-450 border-amber-500/20' : ''}
                      ${prd.stockStatus === 'out-of-stock' ? 'bg-rose-950/20 text-rose-450 border-rose-500/20' : ''}
                    `}>
                      <span className={`h-1.5 w-1.5 rounded-full
                        ${prd.stockStatus === 'in-stock' ? 'bg-emerald-400' : ''}
                        ${prd.stockStatus === 'low-stock' ? 'bg-amber-400' : ''}
                        ${prd.stockStatus === 'out-of-stock' ? 'bg-rose-400' : ''}
                      `} />
                      <span className="capitalize">{prd.stockStatus.replace('-', ' ')}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStockAdjust(prd.id, -10)}
                        className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition focus:outline-none"
                        title="-10 units"
                      >
                        <FiMinus className="h-3 w-3" />
                      </button>
                      
                      <input
                        type="number"
                        value={prd.quantity}
                        onChange={(e) => handleManualQtyChange(prd.id, e.target.value)}
                        className="w-16 rounded border border-slate-700 bg-slate-950 text-center py-1 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />

                      <button
                        onClick={() => handleStockAdjust(prd.id, 10)}
                        className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition focus:outline-none"
                        title="+10 units"
                      >
                        <FiPlus className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-500/20 bg-slate-950 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
