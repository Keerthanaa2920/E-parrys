import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDbService } from '../../services/mockDbService';
import { useCart } from '../../context/CartContext';
import { 
  FiArrowLeft, FiCheckCircle, FiInfo, FiLayers, FiMapPin, 
  FiMessageSquare, FiSend, FiShoppingBag 
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = useMemo(() => {
    return mockDbService.getProducts().find(p => p.id === id);
  }, [id]);

  const minQty = product ? ((product as any).minQty || 10) : 10;
  const unit = product ? ((product as any).unit || 'unit') : 'unit';

  // RFQ Enquiry form states
  const [enqName, setEnqName] = useState('');
  const [enqEmail, setEnqEmail] = useState('');
  const [enqQty, setEnqQty] = useState(minQty);
  const [enqMsg, setEnqMsg] = useState('');
  
  // Direct Add to Cart states
  const [detailQty, setDetailQty] = useState(minQty);
  const [detailAdded, setDetailAdded] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  const handleDetailQtyChange = (val: number) => {
    setDetailQty(Math.max(minQty, val));
  };

  const handleAddToCartDetail = () => {
    addToCart(product, detailQty);
    setDetailAdded(true);
    setToastMessage(`Added ${detailQty} ${unit}s of ${product.productName} to your cart.`);
    setSuccessToast(true);
    
    setTimeout(() => {
      setDetailAdded(false);
    }, 2000);

    setTimeout(() => {
      setSuccessToast(false);
    }, 4000);
  };

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

    setToastMessage(`Direct Enquiry Quote Request submitted successfully to ${product.vendorName}.`);
    setSuccessToast(true);
    
    // Clear form
    setEnqName('');
    setEnqEmail('');
    setEnqMsg('');
    setEnqQty(minQty);

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
          <div className="rounded-custom border border-parrys-surface-dim/30 bg-white p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-parrys-muted font-mono bg-parrys-cream px-2 py-1 rounded border border-parrys-surface-dim/30">{product.category}</span>
              <h1 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif mt-3">{product.productName}</h1>
              <p className="text-xs text-parrys-muted font-mono mt-1">Listing Ref: {product.id} | SKU: {product.sku}</p>
            </div>

            <div className="border-t border-b border-parrys-surface-dim/30 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] text-parrys-muted uppercase block font-bold tracking-wider">Estimated Price</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-parrys-terracotta font-mono">
                    ₹{product.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-parrys-muted font-bold font-sans">/ {unit}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-parrys-muted font-bold">Availability:</span>
                <span className={`rounded-custom border px-3 py-1 text-xs font-bold uppercase tracking-wider
                  ${product.stockStatus === 'in-stock' ? 'bg-emerald-50 text-emerald-700 border-emerald-500/20' : ''}
                  ${product.stockStatus === 'low-stock' ? 'bg-amber-50 text-amber-700 border-amber-500/20' : ''}
                  ${product.stockStatus === 'out-of-stock' ? 'bg-rose-50 text-rose-700 border-rose-500/20' : ''}
                `}>
                  {product.stockStatus.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Quick Sourcing / Add to Cart Section */}
            <div className="bg-parrys-cream/40 border border-parrys-surface-dim/20 p-5 rounded-custom flex flex-col sm:flex-row justify-between items-center gap-4 shadow-inner">
              <div className="text-[10px] font-bold text-parrys-charcoal uppercase tracking-wider">
                Direct Cart Sourcing (Min. {minQty} {unit}s)
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-custom border border-parrys-surface-dim/50 bg-white p-1">
                  <button
                    onClick={() => handleDetailQtyChange(detailQty - 1)}
                    className="px-3 py-1 text-slate-500 hover:text-parrys-charcoal disabled:opacity-30 text-xs font-bold cursor-pointer transition-colors"
                    disabled={detailQty <= minQty}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={detailQty}
                    onChange={(e) => handleDetailQtyChange(parseInt(e.target.value) || minQty)}
                    className="w-12 text-center bg-transparent border-0 text-xs font-bold font-mono focus:ring-0 p-0"
                  />
                  <button
                    onClick={() => handleDetailQtyChange(detailQty + 1)}
                    className="px-3 py-1 text-slate-500 hover:text-parrys-charcoal text-xs font-bold cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCartDetail}
                  className={`px-6 py-3 rounded-custom text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.02]
                    ${detailAdded
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-parrys-terracotta hover:bg-parrys-terracotta-dark text-white'
                    }
                  `}
                >
                  <FiShoppingBag />
                  <span>{detailAdded ? 'Added ✓' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>

            {/* Technical grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-parrys-muted font-sans">Listing Specifications</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-custom border border-parrys-surface-dim/20 bg-[#FAF8F5] p-5 space-y-1.5 shadow-[0_2px_8px_-4px_rgba(169,68,29,0.04)] hover:border-parrys-terracotta/40 transition-all duration-300">
                  <span className="text-[10px] font-bold text-parrys-muted uppercase flex items-center gap-1.5 font-sans tracking-wider">
                    <FiMapPin className="text-parrys-terracotta" />
                    <span>Warehouse Location</span>
                  </span>
                  <p className="text-xs font-bold text-parrys-charcoal">{product.warehouse}</p>
                </div>
                
                <div className="rounded-custom border border-parrys-surface-dim/20 bg-[#FAF8F5] p-5 space-y-1.5 shadow-[0_2px_8px_-4px_rgba(169,68,29,0.04)] hover:border-parrys-terracotta/40 transition-all duration-300">
                  <span className="text-[10px] font-bold text-parrys-muted uppercase flex items-center gap-1.5 font-sans tracking-wider">
                    <FiLayers className="text-parrys-terracotta" />
                    <span>Stock Capacity</span>
                  </span>
                  <p className="text-xs font-bold text-parrys-charcoal font-mono">
                    {product.quantity.toLocaleString('en-IN')} {unit}s
                  </p>
                </div>

                <div className="rounded-custom border border-parrys-surface-dim/20 bg-[#FAF8F5] p-5 space-y-1.5 shadow-[0_2px_8px_-4px_rgba(169,68,29,0.04)] hover:border-parrys-terracotta/40 transition-all duration-300">
                  <span className="text-[10px] font-bold text-parrys-muted uppercase font-sans tracking-wider">Material Specification</span>
                  <p className="text-xs font-bold text-parrys-charcoal">{product.specGrade}</p>
                </div>

                <div className="rounded-custom border border-parrys-surface-dim/20 bg-[#FAF8F5] p-5 space-y-1.5 shadow-[0_2px_8px_-4px_rgba(169,68,29,0.04)] hover:border-parrys-terracotta/40 transition-all duration-300">
                  <span className="text-[10px] font-bold text-parrys-muted uppercase font-sans tracking-wider">Vendor Partner</span>
                  <p className="text-xs font-bold text-parrys-charcoal">{product.vendorName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Builder Enquiry Quote Form */}
        <div className="space-y-6">
          <div className="rounded-custom border border-parrys-surface-dim/35 bg-white p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-parrys-charcoal border-b border-parrys-surface-dim/20 pb-3">
              <FiMessageSquare className="h-4.5 w-4.5 text-parrys-terracotta" />
              <span>Submit RFQ / Enquiry</span>
            </div>
            
            <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
              Enter your project procurement credentials to receive quotes directly from <strong className="text-parrys-charcoal">{product.vendorName}</strong>.
            </p>

            <form onSubmit={handleSubmitEnquiry} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Contact Person</label>
                <input
                  type="text"
                  required
                  value={enqName}
                  onChange={(e) => setEnqName(e.target.value)}
                  placeholder="e.g. Arun Kumar"
                  className="w-full rounded-custom border border-parrys-surface-dim/70 bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:ring-2 focus:ring-parrys-terracotta/5 focus:outline-none transition-all duration-300 font-semibold"
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
                  className="w-full rounded-custom border border-parrys-surface-dim/70 bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:ring-2 focus:ring-parrys-terracotta/5 focus:outline-none transition-all duration-300 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Requested Volume ({unit}s)</label>
                <input
                  type="number"
                  required
                  min={minQty}
                  value={enqQty}
                  onChange={(e) => setEnqQty(parseInt(e.target.value) || minQty)}
                  placeholder={`Min. ${minQty}`}
                  className="w-full rounded-custom border border-parrys-surface-dim/70 bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:ring-2 focus:ring-parrys-terracotta/5 focus:outline-none transition-all duration-300 font-mono font-bold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Inquiry Message</label>
                <textarea
                  value={enqMsg}
                  onChange={(e) => setEnqMsg(e.target.value)}
                  rows={4}
                  placeholder="Describe your site delivery schedule, payment terms, or custom grade requests..."
                  className="w-full rounded-custom border border-parrys-surface-dim/70 bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:ring-2 focus:ring-parrys-terracotta/5 focus:outline-none transition-all duration-300 resize-none font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={product.stockStatus === 'out-of-stock'}
                className="flex w-full items-center justify-center gap-2 rounded-custom bg-parrys-terracotta py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-parrys-terracotta/10 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-parrys-terracotta-dark hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <FiSend className="h-4 w-4" />
                <span>Submit RFQ</span>
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
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ProductDetails;
