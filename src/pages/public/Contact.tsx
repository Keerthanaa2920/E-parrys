import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [role, setRole] = useState('builder');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [toast, setToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    // Simulate contact form submission
    setToast(true);
    setName('');
    setEmail('');
    setMsg('');
    
    setTimeout(() => {
      setToast(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif">Contact Marketplace Sales</h1>
        <p className="text-xs text-parrys-muted">Reach out to request vendor registration or get support on bulk orders.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        {/* Info Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-custom border border-parrys-surface-dim/60 bg-white p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal font-serif border-b border-parrys-surface-dim/40 pb-2">HQ Contact Details</h3>
            
            <div className="space-y-3.5 text-xs text-parrys-muted">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="h-4.5 w-4.5 text-parrys-terracotta shrink-0 mt-0.5" />
                <span>E-Parrys, Parrys Corner, Chennai, Tamil Nadu - 600001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail className="h-4.5 w-4.5 text-parrys-terracotta shrink-0" />
                <span>support@eparrys.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="h-4.5 w-4.5 text-parrys-terracotta shrink-0" />
                <span>+91 44 2534 0099</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="rounded-custom border border-parrys-surface-dim/60 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 rounded-custom border border-parrys-surface-dim bg-parrys-cream/35 p-1 w-full max-w-xs">
              <button
                type="button"
                onClick={() => setRole('builder')}
                className={`flex-1 rounded-custom py-1.5 text-[10px] font-bold uppercase transition-all
                  ${role === 'builder' 
                    ? 'bg-parrys-terracotta text-white' 
                    : 'text-parrys-muted hover:text-parrys-charcoal'
                  }
                `}
              >
                Builder / Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole('vendor')}
                className={`flex-1 rounded-custom py-1.5 text-[10px] font-bold uppercase transition-all
                  ${role === 'vendor' 
                    ? 'bg-parrys-terracotta text-white' 
                    : 'text-parrys-muted hover:text-parrys-charcoal'
                  }
                `}
              >
                Wholesale Vendor
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arun Kumar"
                className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Corporate Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. procurement@eparrys.com"
                className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Inquiry Message</label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={4}
                required
                placeholder={role === 'vendor' 
                  ? "Describe your manufacturing capacity, products, and location details..."
                  : "Detail your active construction projects, monthly aggregates requirements, or site specifications..."
                }
                className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta py-2.5 text-xs font-bold text-white hover:bg-parrys-terracotta-dark transition-all shadow-lg shadow-parrys-terracotta/10"
            >
              <FiSend className="h-3.5 w-3.5" />
              <span>Submit Registration Request</span>
            </button>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-500/20 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>Support request submitted successfully. Our operations team will contact you.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Contact;
