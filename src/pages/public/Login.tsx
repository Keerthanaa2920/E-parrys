import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiCheckCircle, FiUser, FiBriefcase } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<'retail' | 'vendor'>('retail');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setToast(true);
    setEmail('');
    setPassword('');

    setTimeout(() => {
      setToast(false);
      if (loginType === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/');
      }
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center min-h-[500px]">
      <div className="w-full max-w-md rounded-custom border border-parrys-surface-dim/60 bg-white p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
        
        {/* Aesthetic background accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-parrys-terracotta/5 rounded-full blur-xl pointer-events-none" />
        
        <div className="text-center space-y-1.5 relative z-10">
          <span className="text-[10px] font-bold text-parrys-terracotta uppercase tracking-widest font-mono">
            E-Parrys Account
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Customer Login</h2>
          <p className="text-xs text-parrys-muted">Access your customized sourcing catalog or seller desk</p>
        </div>

        {/* Retail vs Vendor Switcher */}
        <div className="grid grid-cols-2 p-1 bg-parrys-cream border border-parrys-surface-dim/40 rounded-custom relative z-10">
          <button
            type="button"
            onClick={() => setLoginType('retail')}
            className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-custom transition-all duration-300 cursor-pointer
              ${loginType === 'retail'
                ? 'bg-parrys-terracotta text-white shadow-md'
                : 'text-parrys-muted hover:text-parrys-charcoal'
              }
            `}
          >
            <FiUser className="h-3.5 w-3.5" />
            <span>Retail Buyer</span>
          </button>
          <button
            type="button"
            onClick={() => setLoginType('vendor')}
            className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-custom transition-all duration-300 cursor-pointer
              ${loginType === 'vendor'
                ? 'bg-parrys-terracotta text-white shadow-md'
                : 'text-parrys-muted hover:text-parrys-charcoal'
              }
            `}
          >
            <FiBriefcase className="h-3.5 w-3.5" />
            <span>Vendor Partner</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
              {loginType === 'vendor' ? 'Corporate Email' : 'Email Address'}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={loginType === 'vendor' ? 'e.g. distributor@eparrys.com' : 'e.g. arun@gmail.com'}
                className="w-full rounded-custom border border-parrys-surface-dim bg-white pl-10 pr-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
              />
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Password</label>
              <button type="button" className="text-[10px] text-parrys-terracotta hover:underline font-semibold cursor-pointer">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-custom border border-parrys-surface-dim bg-white pl-10 pr-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
              />
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta py-3 text-xs font-bold text-white shadow-lg hover:bg-parrys-terracotta-dark btn-transition shadow-parrys-terracotta/10 cursor-pointer"
          >
            <FiLogIn className="h-4 w-4" />
            <span>Sign In as {loginType === 'vendor' ? 'Vendor' : 'Buyer'}</span>
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
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-500/20 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>
              {loginType === 'vendor' ? 'Vendor Desk' : 'Retail Profile'} authorized. Redirecting...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
