import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiCheckCircle, FiUser, FiBriefcase } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<'retail' | 'vendor'>('retail');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ emailOrMobile?: string; password?: string }>({});
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const tempErrors: { emailOrMobile?: string; password?: string } = {};
    const trimmedInput = emailOrMobile.trim();

    if (!trimmedInput) {
      tempErrors.emailOrMobile = 'Email Address or Mobile Number is required';
    } else {
      const isEmail = trimmedInput.includes('@');
      if (isEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedInput)) {
          tempErrors.emailOrMobile = 'Please enter a valid email address';
        }
      } else {
        const cleanPhone = trimmedInput.replace(/[-\s+]/g, '');
        const phoneRegex = /^[0-9]{10,12}$/;
        if (!phoneRegex.test(cleanPhone)) {
          tempErrors.emailOrMobile = 'Please enter a valid 10-digit mobile number';
        }
      }
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setToast(true);
    const savedLoginType = loginType;
    setEmailOrMobile('');
    setPassword('');
    setErrors({});

    setTimeout(() => {
      setToast(false);
      if (savedLoginType === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/');
      }
    }, 2000);
  };

  const handleGoogleLogin = () => {
    // Placeholder as per instructions
    setToast(true);
    setTimeout(() => {
      setToast(false);
      if (loginType === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/');
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          {/* Subtle architectural / abstract minimal video placeholder (using reliable test URL) */}
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
        </video>
        {/* The Mandatory UX Readability Layer */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }} />
      </div>

      <div className="w-full max-w-md rounded-custom border border-parrys-surface-dim/40 bg-white/95 backdrop-blur-md p-8 md:p-10 space-y-7 shadow-2xl relative z-10 overflow-hidden">
        
        {/* Aesthetic background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-parrys-terracotta/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="text-center space-y-2 relative z-10">
          <span className="text-[9px] font-bold text-parrys-terracotta uppercase tracking-widest font-sans">
            E-Parrys B2B Hub
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif">
            {loginType === 'vendor' ? 'Wholesale Vendor Login' : 'Customer Login'}
          </h2>
          <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
            Access your customized sourcing catalog or seller desk
          </p>
        </div>

        {/* Customer vs Wholesale Vendor Switcher */}
        <div className="grid grid-cols-2 p-1 bg-parrys-cream border border-parrys-surface-dim/40 rounded-custom relative z-10">
          <button
            type="button"
            onClick={() => {
              setLoginType('retail');
              setErrors({});
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider rounded-custom transition-all duration-300 cursor-pointer
              ${loginType === 'retail'
                ? 'bg-parrys-terracotta text-white shadow-md'
                : 'text-parrys-muted hover:text-parrys-charcoal'
              }
            `}
          >
            <FiUser className="h-4 w-4" />
            <span>Customer Login</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginType('vendor');
              setErrors({});
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider rounded-custom transition-all duration-300 cursor-pointer
              ${loginType === 'vendor'
                ? 'bg-parrys-terracotta text-white shadow-md'
                : 'text-parrys-muted hover:text-parrys-charcoal'
              }
            `}
          >
            <FiBriefcase className="h-4 w-4" />
            <span>Vendor Login</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
              Email Address or Mobile Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOrMobile}
                onChange={(e) => {
                  setEmailOrMobile(e.target.value);
                  if (errors.emailOrMobile) setErrors(prev => ({ ...prev, emailOrMobile: undefined }));
                }}
                placeholder={loginType === 'vendor' ? 'corporate@company.com or 9876543210' : 'customer@email.com or 9876543210'}
                className={`w-full rounded-custom border bg-white pl-10 pr-3 py-3 text-xs font-semibold text-parrys-charcoal placeholder-slate-400 focus:ring-2 focus:ring-parrys-terracotta/5 focus:outline-none transition-all duration-300 ${
                  errors.emailOrMobile ? 'border-red-500 focus:border-red-500' : 'border-parrys-surface-dim/70 focus:border-parrys-terracotta'
                }`}
              />
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
            </div>
            {errors.emailOrMobile && (
              <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.emailOrMobile}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Password</label>
              <button 
                type="button" 
                onClick={() => alert("Password reset link sent to your verified credentials.")}
                className="text-[10px] text-parrys-terracotta hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Forgot password?
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
                className={`w-full rounded-custom border bg-white pl-10 pr-3 py-3 text-xs font-semibold text-parrys-charcoal focus:ring-2 focus:ring-parrys-terracotta/5 focus:outline-none transition-all duration-300 ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-parrys-surface-dim/70 focus:border-parrys-terracotta'
                }`}
              />
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
            </div>
            {errors.password && (
              <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-custom bg-parrys-terracotta py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg hover:bg-parrys-terracotta-dark hover:scale-[1.01] transition-all duration-300 shadow-parrys-terracotta/10 cursor-pointer mt-2"
          >
            <FiLogIn className="h-4.5 w-4.5" />
            <span>Sign In as {loginType === 'vendor' ? 'Vendor' : 'Customer'}</span>
          </button>
        </form>

        <div className="relative flex py-1 items-center z-10">
          <div className="flex-grow border-t border-parrys-surface-dim/40"></div>
          <span className="flex-shrink mx-4 text-[9px] font-bold text-parrys-muted uppercase tracking-wider">Or</span>
          <div className="flex-grow border-t border-parrys-surface-dim/40"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-custom border border-parrys-surface-dim/60 bg-white py-3 text-xs font-bold uppercase tracking-widest text-parrys-charcoal hover:bg-parrys-cream/50 transition-all duration-300 cursor-pointer z-10"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <div className="text-center pt-2 border-t border-parrys-surface-dim/20 z-10 relative">
          <p className="text-xs text-parrys-muted font-semibold">
            Don't have an account?{' '}
            <Link
              to="/vendor-registration"
              className="text-parrys-terracotta hover:underline font-bold uppercase tracking-wider text-[10px]"
            >
              Sign Up
            </Link>
          </p>
        </div>
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
              {loginType === 'vendor' ? 'Vendor Desk' : 'Customer Profile'} authorized. Redirecting...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
