import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiLock, FiLogIn, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const VendorLogin: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ emailOrPhone?: string; password?: string }>({});
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const tempErrors: { emailOrPhone?: string; password?: string } = {};

    if (!emailOrPhone.trim()) {
      tempErrors.emailOrPhone = 'Email or Mobile Number is required';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setToast(true);

    // Derive name for display
    let displayName = 'Vendor User';
    if (emailOrPhone === 'demo-vendor@eparrys.com') {
      displayName = 'Demo Vendor Depot';
    } else if (emailOrPhone.includes('@')) {
      displayName = emailOrPhone.split('@')[0];
    } else {
      displayName = 'User ' + emailOrPhone.substring(0, 4);
    }

    setTimeout(() => {
      setToast(false);
      localStorage.setItem('vendor_auth', 'true');
      localStorage.setItem('vendor_name', displayName);
      localStorage.setItem('vendor_email', emailOrPhone);
      navigate('/vendor'); // Navigate to vendor dashboard
    }, 1500);
  };

  const fillDemoCredentials = () => {
    setEmailOrPhone('demo-vendor@eparrys.com');
    setPassword('vendor123');
    setErrors({});
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-slate-50">
      <div className="w-full max-w-md rounded-custom border border-parrys-surface-dim/40 bg-white p-8 md:p-10 space-y-7 shadow-2xl relative z-10 overflow-hidden">

        <div className="absolute top-0 right-0 w-32 h-32 bg-parrys-terracotta/5 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2 relative z-10">
          <div className="mx-auto w-12 h-12 bg-parrys-cream border border-parrys-surface-dim/50 rounded-full flex items-center justify-center text-parrys-terracotta mb-4">
            <FiBriefcase className="h-6 w-6" />
          </div>
          <span className="text-[9px] font-bold text-parrys-terracotta uppercase tracking-widest font-sans">
            Vendor Portal
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif">
            Vendor Login
          </h2>
          <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
            Access your wholesale dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
              Email or Mobile
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => {
                  setEmailOrPhone(e.target.value);
                  if (errors.emailOrPhone) setErrors(prev => ({ ...prev, emailOrPhone: undefined }));
                }}
                placeholder="vendor@company.com"
                className={`w-full rounded-custom border bg-white pl-10 pr-3 py-3 text-xs font-semibold text-parrys-charcoal placeholder-slate-400 focus:ring-2 focus:ring-parrys-terracotta/5 focus:outline-none transition-all duration-300 ${errors.emailOrPhone ? 'border-red-500 focus:border-red-500' : 'border-parrys-surface-dim/70 focus:border-parrys-terracotta'
                  }`}
              />
              <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
            </div>
            {errors.emailOrPhone && (
              <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.emailOrPhone}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Password</label>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                }}
                placeholder="••••••••"
                className={`w-full rounded-custom border bg-white pl-10 pr-3 py-3 text-xs font-semibold text-parrys-charcoal focus:ring-2 focus:ring-parrys-terracotta/5 focus:outline-none transition-all duration-300 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-parrys-surface-dim/70 focus:border-parrys-terracotta'
                  }`}
              />
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
            </div>
            {errors.password && (
              <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.password}</span>
            )}
          </div>

          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full py-2 text-xs font-bold text-parrys-terracotta bg-parrys-cream hover:bg-parrys-cream/70 rounded-custom border border-parrys-surface-dim transition-all"
          >
            Use Demo Credentials
          </button>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-custom bg-parrys-terracotta py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg hover:bg-parrys-terracotta-dark hover:scale-[1.01] transition-all duration-300 shadow-parrys-terracotta/10 cursor-pointer mt-2"
          >
            <FiLogIn className="h-4.5 w-4.5" />
            <span>Login to Dashboard</span>
          </button>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-500/20 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>Login successful. Redirecting...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorLogin;
