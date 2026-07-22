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
          <h1 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Stock Inventory</h1>
          <p className="text-xs text-parrys-muted mt-1 font-semibold">Monitor, restock, and update stock counts for active listings.</p>
        </div>

        <button
          onClick={triggerSaveNotification}
          className="flex h-10 items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta px-4 text-xs font-bold text-white shadow-sm hover:bg-parrys-terracotta-dark hover:shadow-md transition btn-transition"
        >
          <FiSave className="h-4 w-4" />
          <span>Sync Stock DB</span>
        </button>
      </div>

      {/* Inventory table */}
      <div className="rounded-custom border border-parrys-surface-dim bg-white shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-parrys-cream border-b border-parrys-surface-dim text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
                <th className="py-3.5 px-4">SKU / ID</th>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Spec Specification</th>
                <th className="py-3.5 px-4">Yard Location</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center w-48">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parrys-surface-dim/60 text-xs text-parrys-charcoal">
              {products.map((prd) => (
                <tr key={prd.id} className="hover:bg-parrys-surface-dim/10 transition">
                  <td className="py-3 px-4 font-mono font-bold text-parrys-terracotta">{prd.id}</td>
                  <td className="py-3 px-4 font-bold text-parrys-charcoal">{prd.productName}</td>
                  <td className="py-3 px-4 text-parrys-muted font-medium">{prd.specGrade}</td>
                  <td className="py-3 px-4 text-parrys-muted font-medium">{prd.warehouse}</td>
                  
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wider
                      ${prd.stockStatus === 'in-stock' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                      ${prd.stockStatus === 'low-stock' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                      ${prd.stockStatus === 'out-of-stock' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                    `}>
                      <span className={`h-1.5 w-1.5 rounded-full
                        ${prd.stockStatus === 'in-stock' ? 'bg-emerald-500' : ''}
                        ${prd.stockStatus === 'low-stock' ? 'bg-amber-500' : ''}
                        ${prd.stockStatus === 'out-of-stock' ? 'bg-red-500' : ''}
                      `} />
                      <span>{prd.stockStatus.replace('-', ' ')}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStockAdjust(prd.id, -10)}
                        className="flex h-7 w-7 items-center justify-center rounded border border-parrys-surface-dim bg-parrys-cream text-parrys-muted hover:text-parrys-terracotta hover:border-parrys-terracotta/50 transition focus:outline-none"
                        title="-10 units"
                      >
                        <FiMinus className="h-3 w-3" />
                      </button>
                      
                      <input
                        type="number"
                        value={prd.quantity}
                        onChange={(e) => handleManualQtyChange(prd.id, e.target.value)}
                        className="w-16 rounded border border-parrys-surface-dim bg-white text-center py-1 text-xs font-bold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20"
                      />

                      <button
                        onClick={() => handleStockAdjust(prd.id, 10)}
                        className="flex h-7 w-7 items-center justify-center rounded border border-parrys-surface-dim bg-parrys-cream text-parrys-muted hover:text-parrys-terracotta hover:border-parrys-terracotta/50 transition focus:outline-none"
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
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-200 bg-white px-4 py-3 text-xs font-bold text-parrys-charcoal shadow-xl shadow-emerald-900/5"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-600" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
