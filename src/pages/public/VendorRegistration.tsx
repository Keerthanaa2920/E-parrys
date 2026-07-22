import React, { useState } from 'react';
import { FiBriefcase, FiSend, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const VendorRegistration: React.FC = () => {
  const [name, setName] = useState('');
  const [gstin, setGstin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [toast, setToast] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !gstin || !email) return;

    setToast(true);
    setName('');
    setGstin('');
    setEmail('');
    setPhone('');
    setAddress('');

    setTimeout(() => {
      setToast(false);
    }, 4000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-custom border border-parrys-surface-dim/60 bg-white p-6 md:p-8 space-y-6 shadow-xl">
        <div className="text-center space-y-1.5 border-b border-parrys-surface-dim/40 pb-4">
          <FiBriefcase className="h-8 w-8 text-parrys-terracotta mx-auto" />
          <h2 className="text-xl font-bold tracking-tight text-parrys-charcoal font-serif">Supplier Vendor Onboarding</h2>
          <p className="text-xs text-parrys-muted">Submit wholesale supplier licenses, warehouse yards, and tax credentials.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Corporate Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Birla Cement Hub"
              className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">GSTIN Registration Code</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                placeholder="e.g. 33AABCB1234C1Z0"
                className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal font-mono focus:border-parrys-terracotta focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Sales Contact Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 44 2534 8833"
                className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Primary Sales Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. dealer-inquiries@supplier.com"
              className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Primary Warehousing Address</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Enter complete shipping yard address, pickup coordinates, and loading capacity details..."
              className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta py-2.5 text-xs font-bold text-white shadow-lg hover:bg-parrys-terracotta-dark transition-all shadow-parrys-terracotta/10"
          >
            <FiSend className="h-3.5 w-3.5" />
            <span>Submit Supplier Application</span>
          </button>
        </form>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-500/20 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-205 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>Registration submitted successfully. Compliance audit starts in 24 hours.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default VendorRegistration;
