import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Login: React.FC = () => {
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
      navigate('/');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[450px]">
      <div className="w-full max-w-sm rounded-custom border border-parrys-surface-dim/60 bg-white p-6 md:p-8 space-y-6 shadow-xl">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-parrys-charcoal font-serif">Sign in to E-Parrys</h2>
          <p className="text-xs text-parrys-muted">Enter your credentials to access your account dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Corporate Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. procurement@eparrys.com"
                className="w-full rounded-custom border border-parrys-surface-dim bg-white pl-10 pr-3 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
              />
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Password</label>
              <button type="button" className="text-[10px] text-parrys-terracotta hover:underline">
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
            className="flex w-full items-center justify-center gap-1.5 rounded-custom bg-parrys-terracotta py-2.5 text-xs font-bold text-white shadow-lg hover:bg-parrys-terracotta-dark transition-all shadow-parrys-terracotta/10"
          >
            <FiLogIn className="h-4 w-4" />
            <span>Sign In</span>
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
            <span>Sign in authorized successfully. Redirecting...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Login;
