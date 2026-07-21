import React, { useMemo, useState } from 'react';
import { mockDbService } from '../../services/mockDbService';
import type { IMarketplaceItem } from '../../types/dashboard';
import { FiPlus, FiInbox, FiCheckCircle, FiClock, FiX, FiCheck } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Products: React.FC = () => {
  const vendorName = "Birla Cement Hub";
  const [products, setProducts] = useState<IMarketplaceItem[]>(() => 
    mockDbService.getProducts().filter(p => p.vendorName === vendorName)
  );

  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newSku, setNewSku] = useState('');
  const [toast, setToast] = useState('');

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(p => 
      p.productName.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }, [products, search]);

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newQty || !newSku) return;

    const newPrd: IMarketplaceItem = {
      id: `SH-MP-${Math.floor(100 + Math.random() * 900)}`,
      productName: newName,
      vendorName: vendorName,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      amount: parseFloat(newPrice),
      priority: 'medium',
      category: 'Cement & Aggregates',
      stockStatus: 'in-stock',
      sku: newSku.startsWith('SKU-') ? newSku : `SKU-${newSku}-MP`,
      warehouse: 'Chennai Main Yard',
      quantity: parseInt(newQty),
      specGrade: newGrade || 'Standard Building Grade'
    };

    mockDbService.addProduct(newPrd);
    
    // Refresh state
    setProducts(mockDbService.getProducts().filter(p => p.vendorName === vendorName));
    setShowAddForm(false);
    
    setNewName('');
    setNewPrice('');
    setNewQty('');
    setNewGrade('');
    setNewSku('');

    setToast(`Listing ${newPrd.id} created and sent for Admin Approval.`);
    setTimeout(() => {
      setToast('');
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">My Product Listings</h1>
          <p className="text-xs text-slate-400 mt-1">Manage wholesale inventory listings and view approval status.</p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-650 px-4 text-xs font-bold text-white shadow-lg hover:from-emerald-500 hover:to-indigo-550 transition"
        >
          <FiPlus className="h-4.5 w-4.5" />
          <span>New Product Listing</span>
        </button>
      </div>

      {/* Search */}
      <div className="w-full max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name or SKU..."
          className="w-full rounded-xl border border-[var(--color-brand-border)] bg-slate-950 px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {/* Grid list */}
      {filteredProducts.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <FiInbox className="h-10 w-10 text-slate-650 mb-4" />
          <h3 className="text-sm font-bold text-slate-200">No Listings Matched</h3>
          <p className="text-xs text-slate-500 max-w-sm">Try adding a new material product listing to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((prd) => (
            <div
              key={prd.id}
              className="flex flex-col rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 p-5 justify-between hover:border-emerald-500/25 transition relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span className="font-mono text-emerald-500">{prd.sku}</span>
                  <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-bold uppercase tracking-wider border
                    ${prd.status === 'approved' ? 'bg-emerald-950/20 text-emerald-450 border-emerald-500/10' : ''}
                    ${prd.status === 'pending' ? 'bg-amber-950/20 text-amber-450 border-amber-500/10' : ''}
                    ${prd.status === 'review' ? 'bg-cyan-950/20 text-cyan-450 border-cyan-500/10' : ''}
                    ${prd.status === 'cancelled' ? 'bg-rose-950/20 text-rose-450 border-rose-500/10' : ''}
                  `}>
                    {prd.status}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-100">{prd.productName}</h3>
                
                <div className="flex items-center justify-between text-xs text-slate-450">
                  <span>Stock level:</span>
                  <span className="font-medium text-slate-350">{prd.quantity} bags</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-450">
                  <span>Spec Grade:</span>
                  <span className="font-medium text-slate-350 truncate max-w-[150px]">{prd.specGrade}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/60 mt-4 pt-3 text-sm font-mono font-bold text-slate-200">
                <span>₹{prd.amount.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-slate-500 font-sans font-normal">{prd.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal Form Overlay */}
      <AnimatePresence>
        {showAddForm && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddForm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed inset-x-4 top-10 sm:top-20 md:max-w-lg md:mx-auto z-50 rounded-2xl border border-[var(--color-brand-border)] bg-slate-950 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-200">New Materials Listing Request</h3>
                <button onClick={() => setShowAddForm(false)} className="text-slate-500 hover:text-white focus:outline-none">
                  <FiX className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleAddListing} className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Material Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Birla Chetak OPC 53 Grade"
                    className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2 text-xs text-slate-350 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Price per unit (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. 450"
                      className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2 text-xs text-slate-350 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Stock Qty (Bags)</label>
                    <input
                      type="number"
                      required
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2 text-xs text-slate-355 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">SKU Ref Code</label>
                  <input
                    type="text"
                    required
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="e.g. SKU-834928"
                    className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2 text-xs text-slate-350 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Technical Specs / Grade</label>
                  <input
                    type="text"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    placeholder="e.g. Grade 53 IS-12269"
                    className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2 text-xs text-slate-350 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-650 py-2.5 text-xs font-bold text-white shadow-lg hover:from-emerald-500 hover:to-indigo-550 transition"
                >
                  Submit Listing Proposal
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-500/20 bg-slate-950 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400 font-bold" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
