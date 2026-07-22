import React, { useState } from 'react';
import { FiBriefcase, FiSave, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Profile: React.FC = () => {
  const [storeName, setStoreName] = useState('Birla Cement Hub');
  const [email, setEmail] = useState('wholesale@birlacement.com');
  const [phone, setPhone] = useState('+91 44 2534 8833');
  const [address, setAddress] = useState('Plot 12A, SIDCO Industrial Estate, Chennai, TN - 600098');
  const [gstin, setGstin] = useState('33AABCB1234C1Z0');
  const [toast, setToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Supplier Profile Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Manage vendor contact info, shipping yards, and wholesale tax credentials.</p>
      </div>

      <form onSubmit={handleSave} className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 p-6 space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-1.5">
          <FiBriefcase className="text-[var(--color-brand-cyan)]" />
          <span>Vendor Company Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Corporate Store Name</label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Billing GSTIN ID</label>
            <input
              type="text"
              required
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2.5 text-xs text-slate-300 font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Primary Sales Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Corporate Phone Number</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Primary Shipping Yard Address</label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none resize-none"
          />
        </div>

        <div className="flex justify-end border-t border-slate-800/60 pt-4">
          <button
            type="submit"
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-650 px-5 text-xs font-bold text-white shadow-lg hover:from-emerald-500 hover:to-indigo-550 transition"
          >
            <FiSave className="h-4 w-4" />
            <span>Update Store Details</span>
          </button>
        </div>
      </form>

      {/* Success Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-500/20 bg-slate-950 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>Supplier profile modifications saved.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
