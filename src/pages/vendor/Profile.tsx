import React, { useState } from 'react';
import { FiUser, FiMail, FiMapPin, FiBriefcase, FiSave, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Profile: React.FC = () => {
  const [storeName, setStoreName] = useState('Birla Cement Hub');
  const [email, setEmail] = useState('wholesale@birlacement.com');
  const [phone, setPhone] = useState('+91 44 2534 8833');
  const [address, setAddress] = useState('Plot 12A, SIDCO Industrial Estate, Chennai, TN - 600098');
  const [gstin, setGstin] = useState('33AABCB1234C1Z0');
  const [cin, setCin] = useState('U74999TN2015PTC101234');
  const [website, setWebsite] = useState('www.birlacementhub.com');
  const [yearEst, setYearEst] = useState('2015');
  const [toast, setToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-parrys-charcoal font-serif">Supplier Profile Settings</h1>
        <p className="text-xs text-parrys-muted mt-1 font-semibold">
          Manage vendor contact info and business details.
        </p>
      </div>

      <form onSubmit={handleSave} className="rounded-custom border border-parrys-surface-dim bg-white p-6 space-y-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-xs font-bold text-parrys-charcoal border-b border-parrys-surface-dim/60 pb-2">
          <FiBriefcase className="text-parrys-terracotta" /> Vendor Company Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Store Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-parrys-muted flex items-center gap-1">
              <FiUser /> Store Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-sm font-semibold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
            />
          </div>

          {/* GST */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-parrys-muted">GSTIN</label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-sm font-semibold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-parrys-muted flex items-center gap-1">
              <FiMail /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-sm font-semibold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-parrys-muted">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-sm font-semibold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
            />
          </div>

          {/* CIN */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-parrys-muted">Company Reg. Number (CIN)</label>
            <input
              type="text"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-sm font-semibold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-parrys-muted">Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-sm font-semibold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
            />
          </div>

          {/* Year Established */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-parrys-muted">Year Established</label>
            <input
              type="number"
              value={yearEst}
              onChange={(e) => setYearEst(e.target.value)}
              className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-sm font-semibold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-parrys-muted flex items-center gap-1">
            <FiMapPin /> Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full rounded border border-parrys-surface-dim bg-white px-3 py-2 text-sm font-semibold text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none focus:ring-1 focus:ring-parrys-terracotta/20 transition"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 bg-parrys-terracotta hover:bg-parrys-terracotta-dark px-6 py-2.5 rounded-custom text-white font-bold text-xs shadow-sm hover:shadow-md transition btn-transition">
            <FiSave /> Save Profile Changes
          </button>
        </div>
      </form>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-200 bg-white px-4 py-3 text-xs font-bold text-parrys-charcoal shadow-xl shadow-emerald-900/5"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-600" />
            <span>Profile settings saved successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};