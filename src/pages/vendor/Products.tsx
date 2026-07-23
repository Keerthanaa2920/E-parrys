import React, { useMemo, useState } from 'react';
import { mockDbService } from '../../services/mockDbService';
import type { IMarketplaceItem, ITierPricing } from '../../types/dashboard';
import { FiPlus, FiInbox, FiCheckCircle, FiX, FiTrash2, FiUpload, FiEdit2, FiCopy, FiFolder } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Products: React.FC = () => {
  const vendorName = "Birla Cement Hub";
  const [products, setProducts] = useState<IMarketplaceItem[]>(() => 
    mockDbService.getProducts().filter(p => p.vendorName === vendorName)
  );

  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [categories] = useState([
    { id: 1, name: 'Cement & Aggregates', status: 'Approved', products: 24 },
    { id: 2, name: 'Steel & TMT', status: 'Approved', products: 12 },
    { id: 3, name: 'Bricks & Blocks', status: 'Pending Approval', products: 0 },
  ]);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newSku, setNewSku] = useState('');
  
  // New bulk material properties
  const [newUnitMeasure, setNewUnitMeasure] = useState<IMarketplaceItem['unitMeasure']>('bags');
  const [newMinOrderQty, setNewMinOrderQty] = useState('10');
  const [newPincodes, setNewPincodes] = useState('');
  const [pricingTiers, setPricingTiers] = useState<ITierPricing[]>([{ minQty: 10, price: 0 }]);

  const [toast, setToast] = useState('');

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(p => 
      p.productName.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }, [products, search]);

  const handleAddTier = () => {
    setPricingTiers([...pricingTiers, { minQty: 1, price: 0 }]);
  };

  const handleUpdateTier = (index: number, field: keyof ITierPricing, value: number) => {
    const updated = [...pricingTiers];
    updated[index] = { ...updated[index], [field]: value };
    setPricingTiers(updated);
  };

  const handleRemoveTier = (index: number) => {
    if (pricingTiers.length > 1) {
      setPricingTiers(pricingTiers.filter((_, i) => i !== index));
    }
  };

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
      specGrade: newGrade || 'Standard Building Grade',
      unitMeasure: newUnitMeasure,
      minOrderQty: parseInt(newMinOrderQty) || 1,
      pricingTiers: pricingTiers,
      serviceablePincodes: newPincodes.split(',').map(p => p.trim()).filter(Boolean)
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
    setNewUnitMeasure('bags');
    setNewMinOrderQty('10');
    setNewPincodes('');
    setPricingTiers([{ minQty: 10, price: 0 }]);

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
          <h1 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">
            {activeTab === 'products' ? 'My Product Listings' : 'Category Management'}
          </h1>
          <p className="text-xs text-parrys-muted mt-1 font-semibold">
            {activeTab === 'products' ? 'Manage wholesale inventory listings and view approval status.' : 'Manage categories you sell products under.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'products' ? (
            <>
              <button className="flex h-10 items-center justify-center gap-1.5 rounded-custom border border-parrys-surface-dim bg-white px-4 text-xs font-bold text-parrys-charcoal shadow-sm hover:border-parrys-terracotta hover:text-parrys-terracotta transition btn-transition">
                <FiUpload className="h-4 w-4" />
                <span className="hidden sm:inline">Bulk Upload CSV</span>
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex h-10 items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta px-4 text-xs font-bold text-white shadow-sm hover:bg-parrys-terracotta-dark hover:shadow-md transition btn-transition"
              >
                <FiPlus className="h-4.5 w-4.5" />
                <span>New Listing</span>
              </button>
            </>
          ) : (
            <button className="flex h-10 items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta px-4 text-xs font-bold text-white shadow-sm hover:bg-parrys-terracotta-dark hover:shadow-md transition btn-transition">
              <FiPlus className="h-4.5 w-4.5" />
              <span>Request Category</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-parrys-surface-dim">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-3 text-sm font-bold transition-colors ${activeTab === 'products' ? 'text-parrys-terracotta border-b-2 border-parrys-terracotta' : 'text-parrys-muted hover:text-parrys-charcoal'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-3 text-sm font-bold transition-colors ${activeTab === 'categories' ? 'text-parrys-terracotta border-b-2 border-parrys-terracotta' : 'text-parrys-muted hover:text-parrys-charcoal'}`}
        >
          Categories
        </button>
      </div>

      {activeTab === 'products' ? (
        <>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="w-full rounded-custom border border-parrys-surface-dim bg-white px-4 py-2 text-xs text-parrys-charcoal placeholder-parrys-muted focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition shadow-sm"
          />
        </div>
        <select 
          className="rounded-custom border border-parrys-surface-dim bg-white px-4 py-2 text-xs font-bold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none cursor-pointer shadow-sm"
        >
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="review">In Review</option>
          <option value="rejected">Rejected</option>
        </select>
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
                
                <div className="flex flex-col gap-1.5 text-xs text-parrys-muted bg-parrys-cream/50 p-2.5 rounded border border-parrys-surface-dim/40">
                  <div className="flex justify-between">
                    <span>Stock:</span>
                    <span className="font-bold text-parrys-charcoal">{prd.quantity} {prd.unitMeasure || 'units'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MOQ:</span>
                    <span className="font-bold text-parrys-charcoal">{prd.minOrderQty || 1} {prd.unitMeasure || 'units'}</span>
                  </div>
                  {prd.pricingTiers && prd.pricingTiers.length > 0 && (
                    <div className="flex justify-between pt-1.5 mt-1.5 border-t border-parrys-surface-dim/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Bulk Offer:</span>
                      <span className="font-mono font-bold text-emerald-600">
                        ₹{Math.min(...prd.pricingTiers.map(t => t.price)).toLocaleString('en-IN')} (max discount)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <div className="flex items-center justify-between border-t border-parrys-surface-dim/60 pt-3 pb-3 text-sm font-mono font-bold text-parrys-charcoal">
                  <span>₹{prd.amount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-parrys-muted font-sans font-medium">{prd.date}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex justify-center items-center gap-1 bg-parrys-cream border border-parrys-surface-dim text-parrys-charcoal text-[10px] font-bold uppercase py-1.5 rounded hover:bg-white hover:border-parrys-terracotta transition cursor-pointer">
                    <FiEdit2 className="h-3 w-3" /> Edit
                  </button>
                  <button className="flex-1 flex justify-center items-center gap-1 bg-parrys-cream border border-parrys-surface-dim text-parrys-charcoal text-[10px] font-bold uppercase py-1.5 rounded hover:bg-white hover:border-parrys-terracotta transition cursor-pointer">
                    <FiCopy className="h-3 w-3" /> Duplicate
                  </button>
                  <button className="flex justify-center items-center bg-rose-50 border border-rose-100 text-rose-500 text-[10px] py-1.5 px-3 rounded hover:bg-rose-500 hover:text-white transition cursor-pointer">
                    <FiTrash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {categories.map((cat) => (
            <div key={cat.id} className="rounded-custom border border-parrys-surface-dim bg-white p-5 space-y-3 shadow-sm hover:shadow-md hover:border-parrys-terracotta/40 transition btn-transition">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-parrys-cream text-parrys-terracotta">
                  <FiFolder className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-parrys-charcoal">{cat.name}</h3>
                  <p className="text-[10px] font-medium text-parrys-muted">{cat.products} Active Products</p>
                </div>
              </div>
              
              <div className="pt-3 mt-1 border-t border-parrys-surface-dim/60 flex justify-between items-center">
                <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider border
                  ${cat.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}
                `}>
                  {cat.status}
                </span>
                <button className="text-xs font-semibold text-parrys-muted hover:text-parrys-terracotta transition">View Details</button>
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
              className="fixed inset-x-4 top-10 sm:top-20 md:max-w-2xl md:mx-auto z-50 rounded-custom border border-parrys-surface-dim bg-white p-6 shadow-2xl shadow-parrys-charcoal/10 space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
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
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Base Price per unit (₹)</label>
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
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Stock Qty</label>
                    <input
                      type="number"
                      required
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Unit Measure</label>
                    <select
                      value={newUnitMeasure}
                      onChange={(e) => setNewUnitMeasure(e.target.value as any)}
                      className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition cursor-pointer"
                    >
                      <option value="kg">Kilograms (kg)</option>
                      <option value="tonnes">Metric Tons</option>
                      <option value="bags">Bags (50kg)</option>
                      <option value="pieces">Pieces / Units</option>
                      <option value="brass">Brass / Volume</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Min Order Qty</label>
                    <input
                      type="number"
                      required
                      value={newMinOrderQty}
                      onChange={(e) => setNewMinOrderQty(e.target.value)}
                      placeholder="e.g. 50"
                      className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Serviceable Pincodes (comma separated)</label>
                  <input
                    type="text"
                    value={newPincodes}
                    onChange={(e) => setNewPincodes(e.target.value)}
                    placeholder="e.g. 600001, 600002 (Leave blank for all zones)"
                    className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
                  />
                </div>

                <div className="border border-parrys-surface-dim rounded p-4 bg-parrys-cream/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Bulk Tiered Pricing</label>
                    <button type="button" onClick={handleAddTier} className="text-[10px] font-bold text-parrys-terracotta hover:underline">
                      + Add Tier
                    </button>
                  </div>
                  {pricingTiers.map((tier, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input type="number" placeholder="Min Qty" value={tier.minQty || ''} onChange={(e) => handleUpdateTier(idx, 'minQty', parseInt(e.target.value) || 0)} className="w-1/3 rounded border border-parrys-surface-dim px-2 py-1.5 text-xs focus:border-parrys-terracotta focus:outline-none" />
                      <span className="text-xs text-parrys-muted">-</span>
                      <input type="number" placeholder="Max (Opt)" value={tier.maxQty || ''} onChange={(e) => handleUpdateTier(idx, 'maxQty', parseInt(e.target.value) || 0)} className="w-1/3 rounded border border-parrys-surface-dim px-2 py-1.5 text-xs focus:border-parrys-terracotta focus:outline-none" />
                      <span className="text-xs text-parrys-muted">₹</span>
                      <input type="number" placeholder="Price" value={tier.price || ''} onChange={(e) => handleUpdateTier(idx, 'price', parseInt(e.target.value) || 0)} className="w-1/3 rounded border border-parrys-surface-dim px-2 py-1.5 text-xs focus:border-parrys-terracotta focus:outline-none" />
                      {pricingTiers.length > 1 && (
                        <button type="button" onClick={() => handleRemoveTier(idx)} className="text-rose-500 hover:text-rose-700">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
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
