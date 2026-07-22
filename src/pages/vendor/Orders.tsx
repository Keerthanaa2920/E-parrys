import React, { useState } from 'react';
import { mockDbService, type IMarketplaceOrder } from '../../services/mockDbService';
import { FiCheckCircle, FiTrash2, FiTruck, FiBox, FiCheck } from 'react-icons/fi';
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
        <h1 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Customer Purchase Orders</h1>
        <p className="text-xs text-parrys-muted mt-1 font-semibold">Review builder supply orders, track delivery milestones, and dispatch shipments.</p>
      </div>

      {/* Orders table */}
      <div className="rounded-custom border border-parrys-surface-dim bg-white shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-parrys-cream border-b border-parrys-surface-dim text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Buyer Account</th>
                <th className="py-3.5 px-4">Material Details</th>
                <th className="py-3.5 px-4 text-center">Volume Qty</th>
                <th className="py-3.5 px-4 text-center">Total Price</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right w-44">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parrys-surface-dim/60 text-xs text-parrys-charcoal">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-parrys-surface-dim/10 transition">
                  <td className="py-3 px-4 font-mono font-bold text-parrys-terracotta">{ord.id}</td>
                  <td className="py-3 px-4 font-bold text-parrys-charcoal">{ord.buyerName}</td>
                  <td className="py-3 px-4 text-parrys-muted font-medium">{ord.productName}</td>
                  <td className="py-3 px-4 text-center font-bold text-parrys-charcoal">{ord.quantity} units</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-parrys-charcoal">
                    ₹{ord.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wider
                      ${ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                      ${ord.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      ${ord.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' : ''}
                      ${ord.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                    `}>
                      <span className="capitalize">{ord.status}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {ord.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, 'shipped')}
                          className="flex h-7 w-7 items-center justify-center rounded border border-parrys-surface-dim bg-parrys-cream text-parrys-muted hover:border-blue-500/30 hover:text-blue-600 transition focus:outline-none"
                          title="Mark Shipped / In-Transit"
                        >
                          <FiTruck className="h-3.5 w-3.5" />
                        </button>
                      )}
                      
                      {ord.status === 'shipped' && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, 'delivered')}
                          className="flex h-7 w-7 items-center justify-center rounded border border-parrys-surface-dim bg-parrys-cream text-parrys-muted hover:border-emerald-500/30 hover:text-emerald-600 transition focus:outline-none"
                          title="Mark Delivered / Completed"
                        >
                          <FiCheck className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {ord.status !== 'cancelled' && ord.status !== 'delivered' && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, 'cancelled')}
                          className="flex h-7 w-7 items-center justify-center rounded border border-parrys-surface-dim bg-parrys-cream text-parrys-muted hover:border-red-500/30 hover:text-red-600 transition focus:outline-none"
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
