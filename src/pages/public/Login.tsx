import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiMail, FiLock, FiLogIn, FiCheckCircle, FiUser,
  FiSmartphone, FiSend, FiRefreshCw, FiInfo, FiKey
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// =========================================================================
// BACKEND OTP INTEGRATION SERVICE HOOKS (RESERVED FOR BACKEND DEVELOPERS)
// =========================================================================
// Replace these simulation hooks with your SMS gateway / Auth API endpoints:
// e.g. await fetch('/api/v1/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) });
// =========================================================================
export const sendPhoneOtpBackendApi = async (phone: string): Promise<{ success: boolean; message: string }> => {
  // TODO: Replace with real backend SMS service (Twilio / Fast2SMS / Firebase OTP)
  console.log(`[BACKEND HOOK] Requesting SMS OTP for phone: ${phone}`);
  return { success: true, message: `OTP sent successfully to ${phone}` };
};

export const verifyPhoneOtpBackendApi = async (phone: string, otp: string): Promise<{ success: boolean; token?: string }> => {
  // TODO: Replace with real backend verification endpoint
  console.log(`[BACKEND HOOK] Verifying OTP ${otp} for phone: ${phone}`);
  return { success: true, token: `jwt-otp-token-${Date.now()}` };
};

export const sendEmailOtpBackendApi = async (email: string): Promise<{ success: boolean }> => {
  // TODO: Replace with real backend Email Magic Link / OTP endpoint
  console.log(`[BACKEND HOOK] Sending Email Verification code to: ${email}`);
  return { success: true };
};

export const Login: React.FC = () => {
  const navigate = useNavigate();

  // Authentication Mode: 'password' | 'phone_otp' | 'email_otp'
  const [authMode, setAuthMode] = useState<'password' | 'phone_otp' | 'email_otp'>('password');

  // Form Input States
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailForOtp, setEmailForOtp] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // OTP Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    } else if (otpTimer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const handleOtpDigitChange = (index: number, value: string) => {
    if (value.length > 1) value = value.substring(value.length - 1);
    const updated = [...otpCode];
    updated[index] = value;
    setOtpCode(updated);

    // Auto-focus next input box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const [simulatedOtp, setSimulatedOtp] = useState<string>('482915');

  const handleSendPhoneOtp = async () => {
    const cleanPhone = phoneNumber.replace(/[-\s+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrors({ phone: 'Enter a valid 10-digit mobile number' });
      return;
    }
    setErrors({});
    setIsSendingOtp(true);

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(generated);

    const res = await sendPhoneOtpBackendApi(phoneNumber);
    setIsSendingOtp(false);
    if (res.success) {
      setOtpSent(true);
      setOtpTimer(30);
      setToast(`OTP Code sent to ${phoneNumber}. Your Code is ${generated}`);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const handleSendEmailOtp = async () => {
    if (!emailForOtp.trim() || !emailForOtp.includes('@')) {
      setErrors({ emailOtp: 'Enter a valid corporate email address' });
      return;
    }
    setErrors({});
    setIsSendingOtp(true);

    await sendEmailOtpBackendApi(emailForOtp);
    setIsSendingOtp(false);
    setOtpSent(true);
    setOtpTimer(30);
    setToast(`Verification code sent to ${emailForOtp}`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleVerifyOtpAndLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpCode.join('');
    if (fullOtp.length < 6) {
      setErrors({ otp: 'Please enter all 6 digits of the OTP' });
      return;
    }

    setToast('Verifying OTP code...');
    const targetContact = authMode === 'phone_otp' ? phoneNumber : emailForOtp;
    const res = await verifyPhoneOtpBackendApi(targetContact, fullOtp);

    if (res.success) {
      localStorage.setItem('eparrys_auth_token', res.token || 'jwt-mock-token-secret');
      const mockUser = {
        name: 'Ramanathan K',
        email: emailForOtp || 'customer@parrys.com',
        phone: phoneNumber || '9876543210',
        role: 'client'
      };
      localStorage.setItem('eparrys_user', JSON.stringify(mockUser));

      setTimeout(() => {
        setToast(null);
        navigate('/profile');
      }, 1200);
    }
  };

  const validatePasswordForm = () => {
    const tempErrors: Record<string, string> = {};
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

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setToast('Customer profile authorized. Redirecting...');
    setEmailOrMobile('');
    setPassword('');
    setErrors({});

    setTimeout(() => {
      setToast(null);
      navigate('/');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setToast('Authorizing Google Account...');
    setTimeout(() => {
      setToast(null);
      navigate('/');
    }, 1500);
  };

  const handleDemoLogin = () => {
    setToast('Demo Account authenticated!');
    localStorage.setItem('eparrys_auth_token', 'jwt-mock-token-secret-xyz-123');
    const mockUser = {
      name: 'Ramanathan K',
      email: 'customer@parrys.com',
      companyName: 'Shan Constructions',
      phone: '9876543210',
      address: 'No.135 A Block, Thanikachalam Nagar, 80FT Road, Ponniammanmedu, Chennai-600110',
      role: 'client'
    };
    localStorage.setItem('eparrys_user', JSON.stringify(mockUser));

    setTimeout(() => {
      setToast(null);
      navigate('/profile');
    }, 1200);
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
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.78)' }} />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-parrys-surface-dim/50 bg-white/95 backdrop-blur-md p-6 md:p-8 space-y-6 shadow-2xl relative z-10 overflow-hidden">
        
        {/* Header */}
        <div className="text-center space-y-1.5 relative z-10">
          <span className="text-[9px] font-bold text-parrys-terracotta uppercase tracking-widest font-sans">
            E-Parrys B2B Procurement Portal
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-parrys-charcoal font-serif">
            Sign In
          </h2>
          <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
            Choose your preferred authentication method
          </p>
        </div>

        {/* Authentication Mode Selector Pills */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-parrys-cream/80 rounded-xl border border-parrys-surface-dim/60 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setOtpSent(false);
              setErrors({});
            }}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              authMode === 'password'
                ? 'bg-white text-parrys-charcoal shadow-xs border border-parrys-surface-dim'
                : 'text-parrys-muted hover:text-parrys-charcoal'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('phone_otp');
              setOtpSent(false);
              setErrors({});
            }}
            className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              authMode === 'phone_otp'
                ? 'bg-white text-parrys-terracotta shadow-xs border border-parrys-surface-dim'
                : 'text-parrys-muted hover:text-parrys-charcoal'
            }`}
          >
            <FiSmartphone className="h-3 w-3" />
            <span>SMS OTP</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('email_otp');
              setOtpSent(false);
              setErrors({});
            }}
            className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              authMode === 'email_otp'
                ? 'bg-white text-parrys-terracotta shadow-xs border border-parrys-surface-dim'
                : 'text-parrys-muted hover:text-parrys-charcoal'
            }`}
          >
            <FiMail className="h-3 w-3" />
            <span>Email OTP</span>
          </button>
        </div>

        {/* 1. PASSWORD MODE */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4 relative z-10">
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
                    if (errors.emailOrMobile) setErrors(prev => ({ ...prev, emailOrMobile: '' }));
                  }}
                  placeholder="customer@email.com or 9876543210"
                  className={`w-full rounded-xl border bg-white pl-10 pr-3 py-2.5 text-xs font-semibold text-parrys-charcoal placeholder-slate-400 focus:outline-none transition-all ${
                    errors.emailOrMobile ? 'border-red-500' : 'border-parrys-surface-dim focus:border-parrys-terracotta'
                  }`}
                />
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              </div>
              {errors.emailOrMobile && (
                <span className="text-[10px] text-red-500 font-bold mt-0.5">{errors.emailOrMobile}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Password</label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link sent to your registered email.")}
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
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-white pl-10 pr-3 py-2.5 text-xs font-semibold text-parrys-charcoal focus:outline-none transition-all ${
                    errors.password ? 'border-red-500' : 'border-parrys-surface-dim focus:border-parrys-terracotta'
                  }`}
                />
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              </div>
              {errors.password && (
                <span className="text-[10px] text-red-500 font-bold mt-0.5">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-parrys-terracotta py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:bg-parrys-terracotta-dark transition-all cursor-pointer mt-2"
            >
              <FiLogIn className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          </form>
        )}

        {/* 2. PHONE OTP MODE */}
        {authMode === 'phone_otp' && (
          <div className="space-y-4 relative z-10">
            {!otpSent ? (
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
                    Mobile Number (SMS OTP)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full rounded-xl border bg-white pl-10 pr-3 py-2.5 text-xs font-mono font-bold text-parrys-charcoal focus:outline-none transition-all ${
                        errors.phone ? 'border-red-500' : 'border-parrys-surface-dim focus:border-parrys-terracotta'
                      }`}
                    />
                    <FiSmartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  </div>
                  {errors.phone && <span className="text-[10px] text-red-500 font-bold mt-0.5">{errors.phone}</span>}
                </div>

                <button
                  type="button"
                  onClick={handleSendPhoneOtp}
                  disabled={isSendingOtp}
                  className="w-full bg-parrys-terracotta text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-parrys-terracotta-dark transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSendingOtp ? (
                    <>
                      <FiRefreshCw className="h-4 w-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="h-4 w-4" />
                      <span>Send OTP Code</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* OTP Verification Form */
              <form onSubmit={handleVerifyOtpAndLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-parrys-charcoal">Enter 6-Digit OTP</span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[10px] text-parrys-terracotta hover:underline font-bold"
                    >
                      Change Number
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-parrys-muted font-mono bg-orange-50 p-2 rounded-xl border border-orange-200">
                    <span>Sent to <strong>{phoneNumber}</strong></span>
                    <span>OTP: <strong className="text-orange-600 font-bold bg-white px-1.5 py-0.5 rounded border border-orange-200">{simulatedOtp}</strong></span>
                  </div>

                  {/* 6 Digit Individual Inputs */}
                  <div className="flex gap-2 justify-between pt-1">
                    {otpCode.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-digit-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                        className="w-10 h-11 text-center font-mono font-bold text-base border border-parrys-surface-dim rounded-xl focus:border-parrys-terracotta focus:ring-1 focus:ring-parrys-terracotta outline-none bg-white text-parrys-charcoal"
                      />
                    ))}
                  </div>
                  {errors.otp && <span className="text-[10px] text-red-500 font-bold">{errors.otp}</span>}
                </div>

                <div className="flex justify-between items-center text-[11px] text-parrys-muted font-mono">
                  <span>Didn't receive code?</span>
                  {otpTimer > 0 ? (
                    <span>Resend in {otpTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendPhoneOtp}
                      className="text-parrys-terracotta font-bold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <FiKey className="h-4 w-4" />
                  <span>Verify OTP & Sign In</span>
                </button>
              </form>
            )}

            {/* Developer Backend Placeholder Callout */}
            <div className="bg-blue-50/70 border border-blue-200 p-2.5 rounded-xl text-[10px] text-blue-900 font-mono flex items-center gap-2">
              <FiInfo className="text-blue-600 h-4 w-4 shrink-0" />
              <span>SMS OTP Backend Hook Ready • Plug in Twilio / Fast2SMS / Firebase API</span>
            </div>
          </div>
        )}

        {/* 3. EMAIL OTP MODE */}
        {authMode === 'email_otp' && (
          <div className="space-y-4 relative z-10">
            {!otpSent ? (
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
                    Corporate Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={emailForOtp}
                      onChange={(e) => {
                        setEmailForOtp(e.target.value);
                        if (errors.emailOtp) setErrors(prev => ({ ...prev, emailOtp: '' }));
                      }}
                      placeholder="corporate@company.com"
                      className={`w-full rounded-xl border bg-white pl-10 pr-3 py-2.5 text-xs font-semibold text-parrys-charcoal focus:outline-none transition-all ${
                        errors.emailOtp ? 'border-red-500' : 'border-parrys-surface-dim focus:border-parrys-terracotta'
                      }`}
                    />
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  </div>
                  {errors.emailOtp && <span className="text-[10px] text-red-500 font-bold mt-0.5">{errors.emailOtp}</span>}
                </div>

                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={isSendingOtp}
                  className="w-full bg-parrys-terracotta text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-parrys-terracotta-dark transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSendingOtp ? (
                    <>
                      <FiRefreshCw className="h-4 w-4 animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="h-4 w-4" />
                      <span>Send Verification Code</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtpAndLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-parrys-charcoal">Enter 6-Digit Email Code</span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[10px] text-parrys-terracotta hover:underline font-bold"
                    >
                      Change Email
                    </button>
                  </div>
                  <p className="text-[11px] text-parrys-muted font-mono">
                    Code sent to <strong>{emailForOtp}</strong>
                  </p>

                  <div className="flex gap-2 justify-between pt-1">
                    {otpCode.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-digit-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                        className="w-10 h-11 text-center font-mono font-bold text-base border border-parrys-surface-dim rounded-xl focus:border-parrys-terracotta outline-none bg-white text-parrys-charcoal"
                      />
                    ))}
                  </div>
                  {errors.otp && <span className="text-[10px] text-red-500 font-bold">{errors.otp}</span>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <FiKey className="h-4 w-4" />
                  <span>Verify Code & Sign In</span>
                </button>
              </form>
            )}

            <div className="bg-blue-50/70 border border-blue-200 p-2.5 rounded-xl text-[10px] text-blue-900 font-mono flex items-center gap-2">
              <FiInfo className="text-blue-600 h-4 w-4 shrink-0" />
              <span>Email Magic Link / Code Hook Ready • NodeMailer / SendGrid Endpoint Reserved</span>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="relative flex py-1 items-center z-10">
          <div className="flex-grow border-t border-parrys-surface-dim/40"></div>
          <span className="flex-shrink mx-4 text-[9px] font-bold text-parrys-muted uppercase tracking-wider">Or</span>
          <div className="flex-grow border-t border-parrys-surface-dim/40"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-parrys-surface-dim/75 bg-white py-3 text-xs font-bold uppercase tracking-widest text-parrys-charcoal hover:bg-parrys-cream/50 transition-all duration-300 cursor-pointer z-10 shadow-xs"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <div className="relative flex py-1 items-center z-10">
          <div className="flex-grow border-t border-parrys-surface-dim/40"></div>
          <span className="flex-shrink mx-4 text-[9px] font-bold text-parrys-muted uppercase tracking-wider">Demo Access</span>
          <div className="flex-grow border-t border-parrys-surface-dim/40"></div>
        </div>

        {/* Quick Demo Login */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 hover:bg-black py-3 text-xs font-bold uppercase tracking-widest text-white transition-all cursor-pointer z-10 shadow-md"
        >
          <FiUser className="h-4 w-4" />
          <span>Quick Demo Login</span>
        </button>

        <div className="text-center pt-2 border-t border-parrys-surface-dim/20 z-10 relative">
          <p className="text-xs text-parrys-muted font-semibold">
            Don't have an account?{' '}
            <Link
              to="/vendor-registration?role=customer"
              className="text-parrys-terracotta hover:underline font-bold uppercase tracking-wider text-[10px]"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-500/20 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4 w-4 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
