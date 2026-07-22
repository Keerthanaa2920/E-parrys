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
          <h1 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">My Product Listings</h1>
          <p className="text-xs text-parrys-muted mt-1 font-semibold">Manage wholesale inventory listings and view approval status.</p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex h-10 items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta px-4 text-xs font-bold text-white shadow-sm hover:bg-parrys-terracotta-dark hover:shadow-md transition btn-transition"
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
          className="w-full rounded-custom border border-parrys-surface-dim bg-white px-4 py-2 text-xs text-parrys-charcoal placeholder-parrys-muted focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
        />
      </div>

      {/* Grid list */}
      {filteredProducts.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center bg-white border border-parrys-surface-dim rounded-custom border-dashed">
          <FiInbox className="h-10 w-10 text-parrys-muted mb-4 opacity-50" />
          <h3 className="text-sm font-bold text-parrys-charcoal">No Listings Matched</h3>
          <p className="text-xs text-parrys-muted max-w-sm mt-1">Try adding a new material product listing to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((prd) => (
            <div
              key={prd.id}
              className="flex flex-col rounded-custom border border-parrys-surface-dim bg-white p-5 justify-between hover:border-parrys-terracotta/40 hover:shadow-md transition relative overflow-hidden btn-transition shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-parrys-muted">
                  <span className="font-mono text-parrys-terracotta">{prd.sku}</span>
                  <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-bold uppercase tracking-wider border
                    ${prd.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                    ${prd.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                    ${prd.status === 'review' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                    ${prd.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                  `}>
                    {prd.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-parrys-charcoal">{prd.productName}</h3>
                
                <div className="flex items-center justify-between text-xs text-parrys-muted">
                  <span>Stock level:</span>
                  <span className="font-bold text-parrys-charcoal">{prd.quantity} bags</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-parrys-muted">
                  <span>Spec Grade:</span>
                  <span className="font-bold text-parrys-charcoal truncate max-w-[150px]">{prd.specGrade}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-parrys-surface-dim/60 mt-4 pt-3 text-sm font-mono font-bold text-parrys-charcoal">
                <span>₹{prd.amount.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-parrys-muted font-sans font-medium">{prd.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal Form Overlay */}
      <AnimatePresence>
        {showAddForm && (
          <>
            <div className="fixed inset-0 z-50 bg-parrys-charcoal/40 backdrop-blur-sm" onClick={() => setShowAddForm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed inset-x-4 top-10 sm:top-20 md:max-w-lg md:mx-auto z-50 rounded-custom border border-parrys-surface-dim bg-white p-6 shadow-2xl shadow-parrys-charcoal/10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-parrys-surface-dim/60 pb-3">
                <h3 className="text-sm font-bold text-parrys-charcoal font-serif">New Materials Listing Request</h3>
                <button onClick={() => setShowAddForm(false)} className="text-parrys-muted hover:text-parrys-charcoal transition focus:outline-none">
                  <FiX className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleAddListing} className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Material Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Birla Chetak OPC 53 Grade"
                    className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Price per unit (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. 450"
                      className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Stock Qty (Bags)</label>
                    <input
                      type="number"
                      required
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">SKU Ref Code</label>
                  <input
                    type="text"
                    required
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="e.g. SKU-834928"
                    className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Technical Specs / Grade</label>
                  <textarea
                    rows={2}
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    placeholder="e.g. Grade 53 IS-12269. Detail your product specifications here."
                    className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
                  />
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Product Images</label>
                  <div className="border-2 border-dashed border-parrys-surface-dim bg-parrys-cream/50 rounded p-6 text-center cursor-pointer hover:border-parrys-terracotta hover:bg-parrys-cream transition flex flex-col items-center justify-center">
                    <FiInbox className="h-6 w-6 text-parrys-muted mb-2" />
                    <span className="text-xs text-parrys-charcoal font-bold">Click or drag product images to upload</span>
                    <span className="text-[10px] text-parrys-muted mt-1 font-medium">PNG, JPG up to 5MB</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-custom bg-parrys-terracotta py-2.5 text-xs font-bold text-white shadow-sm hover:bg-parrys-terracotta-dark hover:shadow-md transition btn-transition"
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
