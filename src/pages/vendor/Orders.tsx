import React, { useState } from 'react';
import { mockDbService } from '../../services/mockDbService';
import type { IMarketplaceOrder } from '../../services/mockDbService';
import { FiCheckCircle, FiTrash2, FiTruck, FiCheck, FiDownload, FiCreditCard, FiPackage } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Orders: React.FC = () => {
  const vendorName = "Birla Cement Hub";
  const [orders, setOrders] = useState<IMarketplaceOrder[]>(() => 
    mockDbService.getOrders().filter(o => o.vendorName === vendorName)
  );
  
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'shipped' | 'delivered'>('all');

  const filteredOrders = orders.filter(o => activeTab === 'all' || o.status === activeTab);

  const handleUpdateStatus = (id: string, newStatus: IMarketplaceOrder['status']) => {
    mockDbService.updateOrderStatus(id, newStatus);
    setOrders(mockDbService.getOrders().filter(o => o.vendorName === vendorName));
    
    setToast(`Order ${id} status updated to ${newStatus.toUpperCase()}.`);
    setTimeout(() => {
      setToast('');
    }, 4000);
  };

  const downloadInvoice = (id: string) => {
    setToast(`Generating PDF Invoice for ${id}...`);
    setTimeout(() => {
      setToast('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Order Management</h1>
          <p className="text-xs text-parrys-muted mt-1 font-semibold">Track fulfillment pipelines, process dispatches, and download tax invoices.</p>
        </div>

        <div className="flex bg-parrys-cream border border-parrys-surface-dim rounded-custom p-1">
          {['all', 'pending', 'shipped', 'delivered'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-custom transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-parrys-terracotta text-white shadow-sm' 
                  : 'text-parrys-muted hover:text-parrys-charcoal hover:bg-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders flow list */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center bg-white border border-parrys-surface-dim rounded-custom border-dashed">
            <FiPackage className="h-10 w-10 text-parrys-muted mb-4 opacity-50" />
            <h3 className="text-sm font-bold text-parrys-charcoal">No Orders Found</h3>
            <p className="text-xs text-parrys-muted max-w-sm mt-1">There are no orders matching the selected status.</p>
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div key={ord.id} className="rounded-custom border border-parrys-surface-dim bg-white shadow-sm hover:shadow-md hover:border-parrys-terracotta/40 transition-all duration-300 overflow-hidden group">
              <div className="p-5 flex flex-col md:flex-row gap-6">
                
                {/* Left col: Order Meta */}
                <div className="md:w-1/3 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted font-mono">{ord.date}</span>
                      <h3 className="text-sm font-bold font-mono text-parrys-terracotta">{ord.id}</h3>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold border uppercase tracking-wider
                      ${ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                      ${ord.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      ${ord.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' : ''}
                      ${ord.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                    `}>
                      <span className="capitalize">{ord.status}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-parrys-charcoal">Buyer: {ord.buyerName || 'Retail Customer'}</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 uppercase border border-emerald-200">
                        <FiCreditCard /> Paid via UPI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle col: Product Details */}
                <div className="md:w-1/3 flex flex-col justify-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-parrys-surface-dim/60 py-4 md:py-0 md:px-6 gap-2">
                  <h4 className="text-sm font-bold text-parrys-charcoal">{ord.productName}</h4>
                  <div className="flex justify-between text-xs text-parrys-muted">
                    <span>Order Volume:</span>
                    <span className="font-bold text-parrys-charcoal">{ord.quantity} units</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-parrys-charcoal font-mono border-t border-parrys-surface-dim/40 pt-2 mt-1">
                    <span>Total Value:</span>
                    <span>₹{ord.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* Right col: Actions */}
                <div className="md:w-1/3 flex flex-col justify-center gap-3">
                  
                  {ord.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(ord.id, 'shipped')}
                      className="flex w-full items-center justify-center gap-2 rounded bg-parrys-terracotta py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-parrys-terracotta/20 hover:bg-parrys-terracotta-dark transition cursor-pointer"
                    >
                      <FiTruck className="h-4 w-4" />
                      Dispatch Shipment
                    </button>
                  )}
                  
                  {ord.status === 'shipped' && (
                    <button
                      onClick={() => handleUpdateStatus(ord.id, 'delivered')}
                      className="flex w-full items-center justify-center gap-2 rounded bg-blue-600 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-blue-900/20 hover:bg-blue-700 transition cursor-pointer"
                    >
                      <FiCheck className="h-4 w-4" />
                      Mark Delivered
                    </button>
                  )}

                  <div className="flex gap-2">
                    <button 
                      onClick={() => downloadInvoice(ord.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded border border-parrys-surface-dim bg-parrys-cream py-2 text-[10px] font-bold uppercase tracking-wider text-parrys-charcoal hover:bg-white hover:border-parrys-terracotta transition cursor-pointer"
                    >
                      <FiDownload className="h-3 w-3" /> Invoice
                    </button>
                    
                    {ord.status !== 'cancelled' && ord.status !== 'delivered' && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, 'cancelled')}
                        className="flex items-center justify-center rounded border border-rose-200 bg-rose-50 px-3 py-2 text-rose-600 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                        title="Cancel Order"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* Progress Bar indicator (Status Flow) */}
              <div className="bg-parrys-cream/50 px-5 py-2.5 border-t border-parrys-surface-dim/40 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider w-full">
                  <div className={`flex-1 h-1.5 rounded-l-full ${['pending', 'approved', 'shipped', 'delivered'].includes(ord.status) ? 'bg-parrys-terracotta' : 'bg-parrys-surface-dim'}`} />
                  <div className={`flex-1 h-1.5 ${['shipped', 'delivered'].includes(ord.status) ? 'bg-parrys-terracotta' : 'bg-parrys-surface-dim'}`} />
                  <div className={`flex-1 h-1.5 rounded-r-full ${ord.status === 'delivered' ? 'bg-emerald-500' : 'bg-parrys-surface-dim'}`} />
                </div>
                <div className="text-[9px] font-bold uppercase text-parrys-muted whitespace-nowrap ml-4">
                  {ord.status === 'pending' ? 'Preparing' : ord.status === 'shipped' ? 'In Transit' : ord.status === 'delivered' ? 'Completed' : 'Cancelled'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-500/20 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

