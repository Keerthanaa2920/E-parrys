import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDbService } from '../../services/mockDbService';
import { FiArrowLeft, FiCheckCircle, FiInfo, FiLayers, FiMapPin, FiMessageSquare, FiSend } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [enqName, setEnqName] = useState('');
  const [enqEmail, setEnqEmail] = useState('');
  const [enqQty, setEnqQty] = useState(10);
  const [enqMsg, setEnqMsg] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const product = useMemo(() => {
    return mockDbService.getProducts().find(p => p.id === id);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex min-h-[400px] flex-col items-center justify-center text-center">
        <FiInfo className="h-10 w-10 text-slate-400 mb-4" />
        <h3 className="text-lg font-bold text-parrys-charcoal font-serif mb-2">Product Not Found</h3>
        <p className="text-sm text-parrys-muted max-w-sm mb-6">The product listing might have been removed by the supplier or admin.</p>
        <Link to="/products" className="rounded-custom bg-white border border-parrys-surface-dim px-4 py-2 text-xs font-bold text-parrys-charcoal hover:bg-parrys-cream btn-transition">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enqName || !enqEmail || enqQty <= 0) return;

    mockDbService.addEnquiry({
      productId: product.id,
      productName: product.productName,
      vendorName: product.vendorName,
      senderName: enqName,
      senderEmail: enqEmail,
      quantity: enqQty,
      message: enqMsg || `Requesting details for ${product.productName}.`
    });

    setSuccessToast(true);
    setEnqName('');
    setEnqEmail('');
    setEnqMsg('');
    setEnqQty(10);

    setTimeout(() => {
      setSuccessToast(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-semibold text-parrys-muted hover:text-parrys-terracotta transition-colors btn-transition">
        <FiArrowLeft className="h-4 w-4" />
        <span>Back to Catalogue</span>
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Product Specifications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-custom border border-parrys-surface-dim/60 bg-white p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-parrys-muted">{product.category}</span>
              <h1 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif mt-1">{product.productName}</h1>
              <p className="text-xs text-parrys-muted font-mono mt-1">Listing Ref: {product.id} | SKU: {product.sku}</p>
            </div>

            <div className="border-t border-b border-parrys-surface-dim/40 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs text-parrys-muted uppercase block">Estimated Price</span>
                <span className="text-2xl font-bold text-parrys-charcoal font-mono">
                  ₹{product.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-parrys-muted">Availability:</span>
                <span className={`rounded-custom border px-2.5 py-1 text-xs font-bold uppercase tracking-wider
                  ${product.stockStatus === 'in-stock' ? 'bg-emerald-55/20 text-emerald-700 border-emerald-500/20' : ''}
                  ${product.stockStatus === 'low-stock' ? 'bg-amber-55/20 text-amber-700 border-amber-500/20' : ''}
                  ${product.stockStatus === 'out-of-stock' ? 'bg-rose-55/20 text-rose-700 border-rose-500/20' : ''}
                `}>
                  {product.stockStatus.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Technical grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-parrys-muted">Listing Specifications</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-custom border border-parrys-surface-dim/30 bg-parrys-cream/35 p-4 space-y-1">
                  <span className="text-[10px] font-bold text-parrys-muted uppercase flex items-center gap-1.5">
                    <FiMapPin className="text-parrys-terracotta" />
                    <span>Warehouse Yard Location</span>
                  </span>
                  <p className="text-xs font-semibold text-parrys-charcoal">{product.warehouse}</p>
                </div>
                
                <div className="rounded-custom border border-parrys-surface-dim/30 bg-parrys-cream/35 p-4 space-y-1">
                  <span className="text-[10px] font-bold text-parrys-muted uppercase flex items-center gap-1.5">
                    <FiLayers className="text-parrys-terracotta" />
                    <span>Active Stock Quantity</span>
                  </span>
                  <p className="text-xs font-semibold text-parrys-charcoal font-mono">
                    {product.quantity.toLocaleString('en-IN')} units available
                  </p>
                </div>

                <div className="rounded-custom border border-parrys-surface-dim/30 bg-parrys-cream/35 p-4 space-y-1">
                  <span className="text-[10px] font-bold text-parrys-muted uppercase">Material Specification</span>
                  <p className="text-xs font-semibold text-parrys-charcoal">{product.specGrade}</p>
                </div>

                <div className="rounded-custom border border-parrys-surface-dim/30 bg-parrys-cream/35 p-4 space-y-1">
                  <span className="text-[10px] font-bold text-parrys-muted uppercase">Vendor Supplier</span>
                  <p className="text-xs font-semibold text-parrys-charcoal">{product.vendorName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Builder Enquiry Quote Form */}
        <div className="space-y-6">
          <div className="rounded-custom border border-parrys-surface-dim/60 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-parrys-charcoal font-serif">
              <FiMessageSquare className="h-4.5 w-4.5 text-parrys-terracotta" />
              <span>Submit RFQ / Enquiry</span>
            </div>
            
            <p className="text-xs text-parrys-muted leading-normal">
              Enter your project procurement credentials to receive quotes directly from <strong className="text-parrys-charcoal">{product.vendorName}</strong>.
            </p>

            <form onSubmit={handleSubmitEnquiry} className="space-y-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Contact Person</label>
                <input
                  type="text"
                  required
                  value={enqName}
                  onChange={(e) => setEnqName(e.target.value)}
                  placeholder="e.g. Arun Kumar"
                  className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Email Address</label>
                <input
                  type="email"
                  required
                  value={enqEmail}
                  onChange={(e) => setEnqEmail(e.target.value)}
                  placeholder="e.g. procurement@eparrys.com"
                  className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Requested Volume</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={enqQty}
                  onChange={(e) => setEnqQty(parseInt(e.target.value))}
                  placeholder="e.g. 50"
                  className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Inquiry Message</label>
                <textarea
                  value={enqMsg}
                  onChange={(e) => setEnqMsg(e.target.value)}
                  rows={4}
                  placeholder="Describe your site delivery schedule, payment terms, or custom grade requests..."
                  className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={product.stockStatus === 'out-of-stock'}
                className="flex w-full items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta py-2.5 text-xs font-bold text-white shadow-lg disabled:opacity-35 disabled:cursor-not-allowed hover:from-cyan-500 hover:to-indigo-550 transition-all"
              >
                <FiSend className="h-3.5 w-3.5" />
                <span>Submit Quote Request</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-500/20 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-205 shadow-2xl backdrop-blur-md"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>Inquiry Quote Request submitted successfully to vendor.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ProductDetails;
