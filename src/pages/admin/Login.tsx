import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield, FiLock, FiLogIn, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const AdminLogin: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ emailOrPhone?: string; password?: string }>({});
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const tempErrors: { emailOrPhone?: string; password?: string } = {};

    if (!emailOrPhone.trim()) {
      tempErrors.emailOrPhone = 'Email or ID is required';
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
    let displayName = 'System Admin';
    if (emailOrPhone === 'admin@eparrys.com') {
      displayName = 'Super Admin';
    } else if (emailOrPhone.includes('@')) {
      displayName = emailOrPhone.split('@')[0];
    }
    
    setTimeout(() => {
      setToast(false);
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_name', displayName);
      localStorage.setItem('admin_email', emailOrPhone);
      navigate('/admin'); // Navigate to admin dashboard
    }, 1500);
  };

  const fillDemoCredentials = () => {
    setEmailOrPhone('admin@eparrys.com');
    setPassword('admin123');
    setErrors({});
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-orange-50">
      <div className="absolute inset-0 w-full h-full">
        {/* Light theme background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-400 opacity-20 blur-[100px]"></div>
      </div>
      
      <div className="w-full max-w-md rounded-custom border border-orange-100 bg-white/90 backdrop-blur-xl p-8 md:p-10 space-y-7 shadow-2xl shadow-orange-900/5 relative z-10 overflow-hidden">
        
        <div className="text-center space-y-2 relative z-10">
          <div className="mx-auto w-12 h-12 bg-orange-50 border border-orange-200 rounded-full flex items-center justify-center text-orange-500 mb-4">
            <FiShield className="h-6 w-6" />
          </div>
          <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest font-sans">
            Secure Access
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-serif">
            Admin Portal
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Manage vendors, products, and platform settings
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Admin Email / ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => {
                  setEmailOrPhone(e.target.value);
                  if (errors.emailOrPhone) setErrors(prev => ({ ...prev, emailOrPhone: undefined }));
                }}
                placeholder="admin@eparrys.com"
                className={`w-full rounded-custom border bg-white pl-10 pr-3 py-3 text-xs font-semibold text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300 ${
                  errors.emailOrPhone ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
                }`}
              />
              <FiShield className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-4.5 w-4.5" />
            </div>
            {errors.emailOrPhone && (
              <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.emailOrPhone}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Password</label>
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
                className={`w-full rounded-custom border bg-white pl-10 pr-3 py-3 text-xs font-semibold text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300 ${
                  errors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
                }`}
              />
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-4.5 w-4.5" />
            </div>
            {errors.password && (
              <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.password}</span>
            )}
          </div>

          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full py-2 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-custom border border-orange-200 transition-all"
          >
            Use Demo Admin Credentials
          </button>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-custom bg-orange-500 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 hover:scale-[1.01] transition-all duration-300 mt-2"
          >
            <FiLogIn className="h-4.5 w-4.5" />
            <span>Login to Admin Portal</span>
          </button>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-500/20 bg-white px-4 py-3 text-xs font-semibold text-gray-800 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-500" />
            <span>Authentication successful. Initializing portal...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLogin;
