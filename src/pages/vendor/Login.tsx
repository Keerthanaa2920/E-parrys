import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiLock, FiLogIn, FiCheckCircle, FiSmartphone } from 'react-icons/fi';
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
      {/* Faint Brick Mortar Pattern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brick-pattern" width="80" height="48" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 80 0 M 0 24 L 80 24 M 0 0 L 0 24 M 40 24 L 40 48" fill="none" stroke="currentColor" className="text-parrys-terracotta" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brick-pattern)" />
        </svg>
      </div>

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
              <button type="button" className="text-[10px] font-bold text-parrys-terracotta hover:text-parrys-terracotta-dark transition-colors">
                Forgot Password? (OTP)
              </button>
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

          <div className="relative flex items-center py-2 mt-4">
            <div className="flex-grow border-t border-parrys-surface-dim"></div>
            <span className="flex-shrink-0 mx-4 text-[9px] font-bold text-parrys-muted uppercase tracking-widest">
              Or Continue With
            </span>
            <div className="flex-grow border-t border-parrys-surface-dim"></div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-custom border border-parrys-surface-dim bg-white hover:bg-slate-50 transition-colors text-xs font-bold text-parrys-charcoal"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.58c2.1-1.92 3.31-4.74 3.31-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-custom border border-parrys-surface-dim bg-white hover:bg-slate-50 transition-colors text-xs font-bold text-parrys-charcoal"
            >
              <FiSmartphone className="w-4 h-4 text-slate-500" />
              <span>Phone</span>
            </button>
          </div>
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
