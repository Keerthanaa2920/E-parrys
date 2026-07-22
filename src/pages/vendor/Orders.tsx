import React, { useState } from 'react';
import { mockDbService } from '../../services/mockDbService';
import type { IMarketplaceOrder } from '../../services/mockDbService';
import { FiCheckCircle, FiTrash2, FiTruck, FiCheck } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Orders: React.FC = () => {
  const vendorName = "Birla Cement Hub";
  const [orders, setOrders] = useState<IMarketplaceOrder[]>(() => 
    mockDbService.getOrders().filter(o => o.vendorName === vendorName)
  );
  
  const [toast, setToast] = useState('');

  const handleUpdateStatus = (id: string, newStatus: IMarketplaceOrder['status']) => {
    mockDbService.updateOrderStatus(id, newStatus);
    setOrders(mockDbService.getOrders().filter(o => o.vendorName === vendorName));
    
    setToast(`Order ${id} status updated to ${newStatus}.`);
    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Customer Purchase Orders</h1>
        <p className="text-xs text-slate-400 mt-1">Review builder supply orders, track delivery milestones, and dispatch shipments.</p>
      </div>

      {/* Orders table */}
      <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-[var(--color-brand-border)] text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Buyer Account</th>
                <th className="py-3.5 px-4">Material Details</th>
                <th className="py-3.5 px-4 text-center">Volume Qty</th>
                <th className="py-3.5 px-4 text-center">Total Price</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right w-44">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/30 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-450">{ord.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-200">{ord.buyerName}</td>
                  <td className="py-3 px-4 text-slate-400">{ord.productName}</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-300">{ord.quantity} units</td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-slate-200">
                    ₹{ord.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border
                      ${ord.status === 'delivered' ? 'bg-emerald-950/20 text-emerald-450 border-emerald-500/20' : ''}
                      ${ord.status === 'shipped' ? 'bg-cyan-950/20 text-cyan-455 border-cyan-500/20' : ''}
                      ${ord.status === 'pending' ? 'bg-amber-950/20 text-amber-450 border-amber-500/20 animate-pulse' : ''}
                      ${ord.status === 'cancelled' ? 'bg-rose-950/20 text-rose-455 border-rose-500/20' : ''}
                    `}>
                      <span className="capitalize">{ord.status}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {ord.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, 'shipped')}
                          className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition focus:outline-none"
                          title="Mark Shipped / In-Transit"
                        >
                          <FiTruck className="h-3.5 w-3.5" />
                        </button>
                      )}
                      
                      {ord.status === 'shipped' && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, 'delivered')}
                          className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-450 transition focus:outline-none"
                          title="Mark Delivered / Completed"
                        >
                          <FiCheck className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {ord.status !== 'cancelled' && ord.status !== 'delivered' && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, 'cancelled')}
                          className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-400 hover:border-rose-500/30 hover:text-rose-400 transition focus:outline-none"
                          title="Cancel Order"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
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
