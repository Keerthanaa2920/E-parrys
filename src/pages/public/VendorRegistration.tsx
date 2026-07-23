import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  FiUser, FiBriefcase, FiArrowLeft, FiCheckCircle, 
  FiFileText, FiChevronDown, FiSend
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const PRODUCT_CATEGORIES = [
  'Cement', 'Steel', 'Sand', 'Tiles', 'Paints', 
  'Plumbing', 'Electrical', 'Hardware', 'Tools'
];

interface FileUploadProps {
  label: string;
  required?: boolean;
  fileName: string | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUploadField: React.FC<FileUploadProps> = ({ label, required, fileName, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`relative border border-dashed rounded-custom p-3 bg-parrys-cream/35 flex items-center justify-between transition ${
        error ? 'border-red-500 bg-red-50/10' : 'border-parrys-surface-dim hover:border-parrys-terracotta'
      }`}>
        <span className="text-xs text-parrys-muted truncate max-w-[200px] font-medium">
          {fileName ? fileName : 'No file selected'}
        </span>
        <label className="bg-white border border-parrys-surface-dim/75 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-custom hover:bg-parrys-cream cursor-pointer select-none">
          Choose File
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              onChange(file);
            }}
          />
        </label>
      </div>
      {error && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{error}</span>}
    </div>
  );
};

export const VendorRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'vendor' | null>(() => {
    if (roleParam === 'customer' || roleParam === 'vendor') {
      return roleParam;
    }
    return null;
  });

  useEffect(() => {
    if (roleParam === 'customer' || roleParam === 'vendor') {
      setSelectedRole(roleParam);
    }
  }, [roleParam]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ----------------------------------------------------
  // Customer Form State
  // ----------------------------------------------------
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [custConfirmPassword, setCustConfirmPassword] = useState('');
  const [custState, setCustState] = useState('');
  const [custCity, setCustCity] = useState('');
  const [custPincode, setCustPincode] = useState('');
  const [custCategories, setCustCategories] = useState<string[]>([]);
  const [custTerms, setCustTerms] = useState(false);

  // ----------------------------------------------------
  // Wholesale Vendor Form State
  // ----------------------------------------------------
  // Personal Info
  const [vendName, setVendName] = useState('');
  const [vendEmail, setVendEmail] = useState('');
  const [vendPhone, setVendPhone] = useState('');
  const [vendPassword, setVendPassword] = useState('');
  const [vendConfirmPassword, setVendConfirmPassword] = useState('');
  
  // Business Info
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('Wholesaler');
  const [gstNumber, setGstNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [vendState, setVendState] = useState('');
  const [vendCity, setVendCity] = useState('');
  const [vendPincode, setVendPincode] = useState('');
  const [vendCategories, setVendCategories] = useState<string[]>([]);
  const [serviceAreas, setServiceAreas] = useState('');

  // Document Upload
  const [gstCert, setGstCert] = useState<File | null>(null);
  const [regCert, setRegCert] = useState<File | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [catalogue, setCatalogue] = useState<File | null>(null);
  
  // Terms check
  const [vendTerms, setVendTerms] = useState(false);

  // ----------------------------------------------------
  // Toggle Categories Helper
  // ----------------------------------------------------
  const handleCategoryToggle = (cat: string, type: 'customer' | 'vendor') => {
    if (type === 'customer') {
      setCustCategories(prev => 
        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
    } else {
      setVendCategories(prev => 
        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
      if (errors.categories) {
        setErrors(prev => ({ ...prev, categories: '' }));
      }
    }
  };

  // ----------------------------------------------------
  // Customer Validation & Submit
  // ----------------------------------------------------
  const validateCustomer = () => {
    const tempErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pinRegex = /^[0-9]{6}$/;

    if (!custName.trim()) tempErrors.fullName = 'Full Name is required';
    
    if (!custEmail.trim()) {
      tempErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(custEmail.trim())) {
      tempErrors.email = 'Enter a valid email address';
    }

    const cleanPhone = custPhone.replace(/[-\s+]/g, '');
    if (!custPhone.trim()) {
      tempErrors.phone = 'Mobile Number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      tempErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (!custPassword) {
      tempErrors.password = 'Password is required';
    } else if (custPassword.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (custPassword !== custConfirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    if (!custState.trim()) tempErrors.state = 'State is required';
    if (!custCity.trim()) tempErrors.city = 'City is required';
    
    if (!custPincode.trim()) {
      tempErrors.pincode = 'Pincode is required';
    } else if (!pinRegex.test(custPincode.trim())) {
      tempErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!custTerms) {
      tempErrors.terms = 'You must accept the terms & conditions';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCustomer()) return;

    setToast(true);
    setTimeout(() => {
      setToast(false);
      navigate('/');
    }, 2000);
  };

  // ----------------------------------------------------
  // Vendor Validation & Submit
  // ----------------------------------------------------
  const validateVendor = () => {
    const tempErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pinRegex = /^[0-9]{6}$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    // Personal Info
    if (!vendName.trim()) tempErrors.vendName = 'Full Name is required';
    
    if (!vendEmail.trim()) {
      tempErrors.vendEmail = 'Email Address is required';
    } else if (!emailRegex.test(vendEmail.trim())) {
      tempErrors.vendEmail = 'Enter a valid email address';
    }

    const cleanPhone = vendPhone.replace(/[-\s+]/g, '');
    if (!vendPhone.trim()) {
      tempErrors.vendPhone = 'Mobile Number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      tempErrors.vendPhone = 'Enter a valid 10-digit mobile number';
    }

    if (!vendPassword) {
      tempErrors.vendPassword = 'Password is required';
    } else if (vendPassword.length < 6) {
      tempErrors.vendPassword = 'Password must be at least 6 characters';
    }

    if (vendPassword !== vendConfirmPassword) {
      tempErrors.vendConfirmPassword = 'Passwords do not match';
    }

    // Business Info
    if (!companyName.trim()) tempErrors.companyName = 'Company Name is required';
    if (!businessType.trim()) tempErrors.businessType = 'Business Type is required';
    
    const formattedGST = gstNumber.trim().toUpperCase();
    if (!gstNumber.trim()) {
      tempErrors.gstNumber = 'GST Number is required';
    } else if (!gstRegex.test(formattedGST)) {
      tempErrors.gstNumber = 'Enter a valid 15-digit GSTIN (e.g. 33AABCB1234C1Z0)';
    }

    if (panNumber.trim()) {
      const formattedPAN = panNumber.trim().toUpperCase();
      if (!panRegex.test(formattedPAN)) {
        tempErrors.panNumber = 'Enter a valid 10-digit PAN (e.g. ABCDE1234F)';
      }
    }

    if (!yearEstablished.trim()) {
      tempErrors.yearEstablished = 'Year established is required';
    } else {
      const year = parseInt(yearEstablished);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1800 || year > currentYear) {
        tempErrors.yearEstablished = `Enter a valid year between 1800 and ${currentYear}`;
      }
    }

    if (!vendState.trim()) tempErrors.vendState = 'State is required';
    if (!vendCity.trim()) tempErrors.vendCity = 'City is required';
    
    if (!vendPincode.trim()) {
      tempErrors.vendPincode = 'Pincode is required';
    } else if (!pinRegex.test(vendPincode.trim())) {
      tempErrors.vendPincode = 'Pincode must be 6 digits';
    }

    if (vendCategories.length === 0) {
      tempErrors.categories = 'Select at least one product category';
    }

    if (!serviceAreas.trim()) {
      tempErrors.serviceAreas = 'Service Areas details are required';
    }

    // Document uploads
    if (!gstCert) tempErrors.gstCert = 'GST Certificate is required';
    if (!regCert) tempErrors.regCert = 'Business Registration Certificate is required';
    if (!companyLogo) tempErrors.companyLogo = 'Company Logo is required';

    if (!vendTerms) {
      tempErrors.vendTerms = 'You must accept the terms & conditions';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateVendor()) {
      // Scroll to top of the card to show validation errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsSuccess(true);
  };

  // Google Login Placeholder
  const handleGoogleSignup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
      if (selectedRole === 'vendor') {
        setIsSuccess(true);
      } else {
        navigate('/');
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. Account Selection Screen */}
      {selectedRole === null && (
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-8 md:p-12 space-y-8 shadow-xl max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-parrys-terracotta/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center space-y-2.5">
            <span className="text-[10px] font-bold text-parrys-terracotta uppercase tracking-widest block font-sans">
              Onboarding Gateway
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-parrys-charcoal font-serif">Who are you?</h2>
            <p className="text-xs text-parrys-muted font-semibold max-w-md mx-auto">
              Select your profile type to register an account with E-Parrys commercial sourcing networks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {/* Customer option card */}
            <button
              onClick={() => {
                setSelectedRole('customer');
                setErrors({});
              }}
              className="flex flex-col text-left rounded-custom border border-parrys-surface-dim hover:border-parrys-terracotta hover:bg-parrys-cream/35 p-6 space-y-4 group transition duration-300 shadow-sm hover:shadow-md cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center text-parrys-terracotta group-hover:bg-parrys-terracotta group-hover:text-white transition duration-300">
                <FiUser className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-parrys-charcoal font-serif group-hover:text-parrys-terracotta transition">
                  Customer / Developer
                </h3>
                <p className="text-[11px] text-parrys-muted leading-relaxed font-medium">
                  For builders, real estate developers, contractors, and individuals sourcing materials in volume.
                </p>
              </div>
            </button>

            {/* Wholesale Vendor option card */}
            <button
              onClick={() => {
                setSelectedRole('vendor');
                setErrors({});
              }}
              className="flex flex-col text-left rounded-custom border border-parrys-surface-dim hover:border-parrys-terracotta hover:bg-parrys-cream/35 p-6 space-y-4 group transition duration-300 shadow-sm hover:shadow-md cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center text-parrys-terracotta group-hover:bg-parrys-terracotta group-hover:text-white transition duration-300">
                <FiBriefcase className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-parrys-charcoal font-serif group-hover:text-parrys-terracotta transition">
                  Wholesale Vendor
                </h3>
                <p className="text-[11px] text-parrys-muted leading-relaxed font-medium">
                  For manufacturer brands, bulk distributors, dealers, and regional suppliers listing bulk aggregates.
                </p>
              </div>
            </button>
          </div>

          <div className="text-center pt-4 border-t border-parrys-surface-dim/20">
            <p className="text-xs text-parrys-muted font-semibold">
              Already have an account?{' '}
              <Link to="/login" className="text-parrys-terracotta hover:underline font-bold uppercase tracking-wider text-[10px]">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* 2. Success screen for Wholesale Vendor */}
      {selectedRole === 'vendor' && isSuccess && (
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-8 md:p-12 text-center space-y-6 shadow-xl max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <FiCheckCircle className="h-8 w-8" />
          </div>

          <div className="space-y-2.5">
            <h2 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Application Submitted</h2>
            <p className="text-xs text-parrys-muted leading-relaxed font-medium px-4">
              Thank you for registering with E-Parrys. Your account has been submitted for verification. You will be able to access the Vendor Dashboard after admin approval.
            </p>
          </div>

          <div className="pt-6 border-t border-parrys-surface-dim/20 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-parrys-terracotta text-white px-8 py-3 rounded-custom text-xs font-bold uppercase tracking-wider hover:bg-parrys-terracotta-dark hover:scale-[1.01] transition duration-200 text-center"
            >
              Back to Home Page
            </Link>
            <Link
              to="/login"
              className="border border-parrys-surface-dim bg-white hover:bg-parrys-cream text-parrys-charcoal px-8 py-3 rounded-custom text-xs font-bold uppercase tracking-wider hover:scale-[1.01] transition duration-200 text-center"
            >
              Go to Login page
            </Link>
          </div>
        </div>
      )}

      {/* 3. Customer Registration Form */}
      {selectedRole === 'customer' && (
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-6 md:p-10 space-y-7 shadow-xl relative">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-parrys-surface-dim/40 pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Customer Sourcing Account</h2>
              <p className="text-xs text-parrys-muted font-medium">Create a builder account to get direct wholesale aggregates quotes.</p>
            </div>
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-1.5 text-[10px] font-bold text-parrys-terracotta uppercase border border-parrys-surface-dim/50 rounded-custom px-3 py-1.5 hover:bg-parrys-cream transition cursor-pointer"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomerSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Full Name *</label>
                <input
                  type="text"
                  value={custName}
                  onChange={(e) => {
                    setCustName(e.target.value);
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="e.g. Ramanathan K"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.fullName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.fullName && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.fullName}</span>}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Email Address *</label>
                <input
                  type="email"
                  value={custEmail}
                  onChange={(e) => {
                    setCustEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  placeholder="e.g. procure@builders.com"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.email && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.email}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Phone */}
              <div className="flex flex-col gap-1 sm:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Mobile (OTP ready) *</label>
                <input
                  type="text"
                  value={custPhone}
                  onChange={(e) => {
                    setCustPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  placeholder="e.g. 9876543210"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.phone && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.phone}</span>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1 sm:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Password *</label>
                <input
                  type="password"
                  value={custPassword}
                  onChange={(e) => {
                    setCustPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.password && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1 sm:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Confirm Password *</label>
                <input
                  type="password"
                  value={custConfirmPassword}
                  onChange={(e) => {
                    setCustConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.confirmPassword && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* State */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">State *</label>
                <input
                  type="text"
                  value={custState}
                  onChange={(e) => {
                    setCustState(e.target.value);
                    if (errors.state) setErrors(prev => ({ ...prev, state: '' }));
                  }}
                  placeholder="e.g. Tamil Nadu"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.state ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.state && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.state}</span>}
              </div>

              {/* City */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">City *</label>
                <input
                  type="text"
                  value={custCity}
                  onChange={(e) => {
                    setCustCity(e.target.value);
                    if (errors.city) setErrors(prev => ({ ...prev, city: '' }));
                  }}
                  placeholder="e.g. Chennai"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.city ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.city && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.city}</span>}
              </div>

              {/* Pincode */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Pincode *</label>
                <input
                  type="text"
                  maxLength={6}
                  value={custPincode}
                  onChange={(e) => {
                    setCustPincode(e.target.value);
                    if (errors.pincode) setErrors(prev => ({ ...prev, pincode: '' }));
                  }}
                  placeholder="e.g. 600001"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.pincode ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.pincode && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.pincode}</span>}
              </div>
            </div>

            {/* Optional Categories */}
            <div className="flex flex-col gap-1.5 pt-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Interested Categories (Optional)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-parrys-cream/40 border border-parrys-surface-dim/40 rounded-custom p-4">
                {PRODUCT_CATEGORIES.map(cat => {
                  const isChecked = custCategories.includes(cat);
                  return (
                    <label key={cat} className="flex items-center gap-2 text-xs font-semibold text-parrys-charcoal cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(cat, 'customer')}
                        className="accent-parrys-terracotta h-3.5 w-3.5 border-parrys-surface-dim rounded focus:ring-0"
                      />
                      <span>{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="flex items-start gap-2.5 text-xs font-semibold text-parrys-charcoal cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={custTerms}
                  onChange={(e) => {
                    setCustTerms(e.target.checked);
                    if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                  }}
                  className="accent-parrys-terracotta h-4 w-4 border-parrys-surface-dim rounded focus:ring-0 mt-0.5"
                />
                <span>I accept the general E-Parrys buyer terms, pricing verification guidelines, and warehousing dispatches logs rules.</span>
              </label>
              {errors.terms && <span className="text-[10px] text-red-500 font-bold tracking-wide">{errors.terms}</span>}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-parrys-surface-dim/20">
              <button
                type="submit"
                className="flex-1 bg-parrys-terracotta text-white py-3.5 rounded-custom font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-parrys-terracotta-dark shadow-lg shadow-parrys-terracotta/10 transition cursor-pointer"
              >
                <FiSend className="h-4 w-4" />
                <span>Create Customer Account</span>
              </button>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex-1 border border-parrys-surface-dim/60 bg-white text-parrys-charcoal py-3.5 rounded-custom font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-parrys-cream/50 transition cursor-pointer"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Wholesale Vendor Registration Form */}
      {selectedRole === 'vendor' && !isSuccess && (
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-6 md:p-10 space-y-8 shadow-xl relative">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-parrys-surface-dim/40 pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Wholesale Supplier Onboarding</h2>
              <p className="text-xs text-parrys-muted font-medium">Verify company licenses, yard dispatches capacity, and tax audits.</p>
            </div>
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-1.5 text-[10px] font-bold text-parrys-terracotta uppercase border border-parrys-surface-dim/50 rounded-custom px-3 py-1.5 hover:bg-parrys-cream transition cursor-pointer"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          </div>

          <form onSubmit={handleVendorSubmit} className="space-y-6">
            
            {/* Segment: Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-parrys-surface-dim/20 pb-2">
                <FiUser className="text-parrys-terracotta h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal">1. Corporate Sales Officer Personal Info</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Full Name *</label>
                  <input
                    type="text"
                    value={vendName}
                    onChange={(e) => {
                      setVendName(e.target.value);
                      if (errors.vendName) setErrors(prev => ({ ...prev, vendName: '' }));
                    }}
                    placeholder="e.g. Suresh Kumar"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.vendName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.vendName && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendName}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Corporate Email Address *</label>
                  <input
                    type="email"
                    value={vendEmail}
                    onChange={(e) => {
                      setVendEmail(e.target.value);
                      if (errors.vendEmail) setErrors(prev => ({ ...prev, vendEmail: '' }));
                    }}
                    placeholder="e.g. sales@tata-steel.com"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.vendEmail ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.vendEmail && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendEmail}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Mobile */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Mobile (OTP ready) *</label>
                  <input
                    type="text"
                    value={vendPhone}
                    onChange={(e) => {
                      setVendPhone(e.target.value);
                      if (errors.vendPhone) setErrors(prev => ({ ...prev, vendPhone: '' }));
                    }}
                    placeholder="e.g. 9876543210"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.vendPhone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.vendPhone && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendPhone}</span>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Password *</label>
                  <input
                    type="password"
                    value={vendPassword}
                    onChange={(e) => {
                      setVendPassword(e.target.value);
                      if (errors.vendPassword) setErrors(prev => ({ ...prev, vendPassword: '' }));
                    }}
                    placeholder="••••••••"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.vendPassword ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.vendPassword && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendPassword}</span>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Confirm Password *</label>
                  <input
                    type="password"
                    value={vendConfirmPassword}
                    onChange={(e) => {
                      setVendConfirmPassword(e.target.value);
                      if (errors.vendConfirmPassword) setErrors(prev => ({ ...prev, vendConfirmPassword: '' }));
                    }}
                    placeholder="••••••••"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.vendConfirmPassword ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.vendConfirmPassword && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendConfirmPassword}</span>}
                </div>
              </div>
            </div>

            {/* Segment: Business Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-parrys-surface-dim/20 pb-2">
                <FiBriefcase className="text-parrys-terracotta h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal">2. Core Business Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Company / Brand Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (errors.companyName) setErrors(prev => ({ ...prev, companyName: '' }));
                    }}
                    placeholder="e.g. Tata Steel Ltd"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.companyName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.companyName && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.companyName}</span>}
                </div>

                {/* Business Type */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Business Structure *</label>
                  <div className="relative">
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full rounded-custom border border-parrys-surface-dim bg-white pl-3.5 pr-10 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none appearance-none font-bold"
                    >
                      <option value="Manufacturer">Manufacturer / Mill Brand</option>
                      <option value="Wholesaler">Wholesaler Depot</option>
                      <option value="Distributor">Primary Distributor</option>
                      <option value="Dealer">Certified Dealer</option>
                      <option value="Retail Supplier">Retail Supplier Yard</option>
                    </select>
                    <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-parrys-muted pointer-events-none h-4.5 w-4.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* GSTIN */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">GST Number *</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => {
                      setGstNumber(e.target.value);
                      if (errors.gstNumber) setErrors(prev => ({ ...prev, gstNumber: '' }));
                    }}
                    placeholder="e.g. 33AABCB1234C1Z0"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal font-mono focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.gstNumber ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.gstNumber && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.gstNumber}</span>}
                </div>

                {/* PAN (Optional) */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">PAN Card Number (Optional)</label>
                  <input
                    type="text"
                    value={panNumber}
                    onChange={(e) => {
                      setPanNumber(e.target.value);
                      if (errors.panNumber) setErrors(prev => ({ ...prev, panNumber: '' }));
                    }}
                    placeholder="e.g. ABCDE1234F"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal font-mono focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.panNumber ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.panNumber && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.panNumber}</span>}
                </div>

                {/* Year Established */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Year Established *</label>
                  <input
                    type="text"
                    value={yearEstablished}
                    onChange={(e) => {
                      setYearEstablished(e.target.value);
                      if (errors.yearEstablished) setErrors(prev => ({ ...prev, yearEstablished: '' }));
                    }}
                    placeholder="e.g. 1998"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.yearEstablished ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.yearEstablished && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.yearEstablished}</span>}
                </div>
              </div>

              {/* Address State, City, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Business State *</label>
                  <input
                    type="text"
                    value={vendState}
                    onChange={(e) => {
                      setVendState(e.target.value);
                      if (errors.vendState) setErrors(prev => ({ ...prev, vendState: '' }));
                    }}
                    placeholder="e.g. Karnataka"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.vendState ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.vendState && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendState}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Business City *</label>
                  <input
                    type="text"
                    value={vendCity}
                    onChange={(e) => {
                      setVendCity(e.target.value);
                      if (errors.vendCity) setErrors(prev => ({ ...prev, vendCity: '' }));
                    }}
                    placeholder="e.g. Bangalore"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.vendCity ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.vendCity && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendCity}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Pincode *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={vendPincode}
                    onChange={(e) => {
                      setVendPincode(e.target.value);
                      if (errors.vendPincode) setErrors(prev => ({ ...prev, vendPincode: '' }));
                    }}
                    placeholder="e.g. 560001"
                    className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.vendPincode ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.vendPincode && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendPincode}</span>}
                </div>
              </div>

              {/* Service Areas */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Service/Logistics Delivery Areas *</label>
                <input
                  type="text"
                  value={serviceAreas}
                  onChange={(e) => {
                    setServiceAreas(e.target.value);
                    if (errors.serviceAreas) setErrors(prev => ({ ...prev, serviceAreas: '' }));
                  }}
                  placeholder="e.g. Bangalore Urban, Chennai Ring Road, Mysore Sourcing depots"
                  className={`w-full rounded-custom border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                    errors.serviceAreas ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-parrys-surface-dim'
                  }`}
                />
                {errors.serviceAreas && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.serviceAreas}</span>}
              </div>

              {/* Product Categories */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Product Sourcing Sectors (Select at least one) *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-parrys-cream/40 border border-parrys-surface-dim/40 rounded-custom p-4">
                  {PRODUCT_CATEGORIES.map(cat => {
                    const isChecked = vendCategories.includes(cat);
                    return (
                      <label key={cat} className="flex items-center gap-2 text-xs font-semibold text-parrys-charcoal cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(cat, 'vendor')}
                          className="accent-parrys-terracotta h-3.5 w-3.5 border-parrys-surface-dim rounded focus:ring-0"
                        />
                        <span>{cat}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.categories && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.categories}</span>}
              </div>
            </div>

            {/* Segment: Document Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-parrys-surface-dim/20 pb-2">
                <FiFileText className="text-parrys-terracotta h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal">3. Document License Uploads</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FileUploadField
                  label="GSTIN Audit Registration Certificate *"
                  required
                  fileName={gstCert ? gstCert.name : null}
                  onChange={(file) => {
                    setGstCert(file);
                    if (errors.gstCert) setErrors(prev => ({ ...prev, gstCert: '' }));
                  }}
                  error={errors.gstCert}
                />
                
                <FileUploadField
                  label="Business Registration Certificate / MSME License *"
                  required
                  fileName={regCert ? regCert.name : null}
                  onChange={(file) => {
                    setRegCert(file);
                    if (errors.regCert) setErrors(prev => ({ ...prev, regCert: '' }));
                  }}
                  error={errors.regCert}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FileUploadField
                  label="Corporate Logo File *"
                  required
                  fileName={companyLogo ? companyLogo.name : null}
                  onChange={(file) => {
                    setCompanyLogo(file);
                    if (errors.companyLogo) setErrors(prev => ({ ...prev, companyLogo: '' }));
                  }}
                  error={errors.companyLogo}
                />

                <FileUploadField
                  label="Detailed Product Catalogue (Optional)"
                  fileName={catalogue ? catalogue.name : null}
                  onChange={(file) => setCatalogue(file)}
                />
              </div>
            </div>

            {/* Vendor Terms Checkbox */}
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="flex items-start gap-2.5 text-xs font-semibold text-parrys-charcoal cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={vendTerms}
                  onChange={(e) => {
                    setVendTerms(e.target.checked);
                    if (errors.vendTerms) setErrors(prev => ({ ...prev, vendTerms: '' }));
                  }}
                  className="accent-parrys-terracotta h-4 w-4 border-parrys-surface-dim rounded focus:ring-0 mt-0.5"
                />
                <span>I accept E-Parrys verified supplier dispatch logistics conditions, GST invoicing guarantees, and zero middleman pricing terms.</span>
              </label>
              {errors.vendTerms && <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{errors.vendTerms}</span>}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-parrys-surface-dim/20">
              <button
                type="submit"
                className="flex-1 bg-parrys-terracotta text-white py-3.5 rounded-custom font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-parrys-terracotta-dark shadow-lg shadow-parrys-terracotta/10 transition cursor-pointer"
              >
                <FiSend className="h-4 w-4" />
                <span>Register as Wholesale Vendor</span>
              </button>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex-1 border border-parrys-surface-dim/60 bg-white text-parrys-charcoal py-3.5 rounded-custom font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-parrys-cream/50 transition cursor-pointer"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toast Alert Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-custom border border-emerald-500/20 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-205 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>Registration processed. Sourcing profile dashboard active.</span>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default VendorRegistration;
