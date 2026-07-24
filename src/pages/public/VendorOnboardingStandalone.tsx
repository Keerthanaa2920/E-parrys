import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUser, FiBriefcase, FiCheckCircle, FiFileText,
  FiArrowLeft, FiSend, FiInfo
} from 'react-icons/fi';
import { mockDbService } from '../../services/mockDbService';

const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const SOURCING_SECTORS = [
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
      <div className={`relative border border-dashed rounded-xl p-3 bg-parrys-cream/35 flex items-center justify-between transition ${
        error ? 'border-red-500 bg-red-50/10' : 'border-parrys-surface-dim hover:border-parrys-terracotta'
      }`}>
        <span className="text-xs text-parrys-muted truncate max-w-[200px] font-mono">
          {fileName ? fileName : 'No file selected'}
        </span>
        <label className="bg-white border border-parrys-surface-dim/75 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-parrys-cream cursor-pointer select-none">
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

export const VendorOnboardingStandalone: React.FC = () => {
  // Personal Info
  const [officerName, setOfficerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Core Business Info
  const [companyName, setCompanyName] = useState('');
  const [businessStructure, setBusinessStructure] = useState('Wholesaler Depot');
  const [gstin, setGstin] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [serviceAreas, setServiceAreas] = useState('');
  const [sectors, setSectors] = useState<string[]>([]);

  // Document Uploads
  const [gstCert, setGstCert] = useState<File | null>(null);
  const [businessRegCert, setBusinessRegCert] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [catalogueFile, setCatalogueFile] = useState<File | null>(null);

  // Terms & Submission State
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedReqId, setSubmittedReqId] = useState('');

  // Mobile OTP States
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [inputOtp, setInputOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleSendMobileOtp = () => {
    const cleanPhone = phone.replace(/[-\s+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrors(prev => ({ ...prev, phone: 'Enter a valid 10-digit mobile number first' }));
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setOtpError('');
  };

  const handleVerifyMobileOtp = () => {
    if (inputOtp === generatedOtp || inputOtp === '123456') {
      setIsPhoneVerified(true);
      setOtpError('');
      setErrors(prev => ({ ...prev, phone: '' }));
    } else {
      setOtpError('Invalid OTP code. Enter ' + (generatedOtp || '123456'));
    }
  };

  const toggleSector = (sector: string) => {
    setSectors(prev =>
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    );
    if (errors.sectors) {
      setErrors(prev => ({ ...prev, sectors: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pinRegex = /^[0-9]{6}$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    if (!officerName.trim()) tempErrors.officerName = 'Full Name is required';

    if (!email.trim()) {
      tempErrors.email = 'Corporate Email is required';
    } else if (!emailRegex.test(email.trim())) {
      tempErrors.email = 'Enter a valid corporate email';
    }

    const cleanPhone = phone.replace(/[-\s+]/g, '');
    if (!phone.trim()) {
      tempErrors.phone = 'Mobile Number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      tempErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    if (!companyName.trim()) tempErrors.companyName = 'Company Name is required';

    const formattedGST = gstin.trim().toUpperCase();
    if (!gstin.trim()) {
      tempErrors.gstin = 'GST Number is required';
    } else if (!gstRegex.test(formattedGST)) {
      tempErrors.gstin = 'Enter a valid 15-digit GSTIN (e.g. 33AABCB1234C1Z0)';
    }

    if (!yearEstablished.trim()) {
      tempErrors.yearEstablished = 'Year established is required';
    }

    if (!state.trim()) tempErrors.state = 'State is required';
    if (!city.trim()) tempErrors.city = 'City is required';

    if (!pincode.trim()) {
      tempErrors.pincode = 'Pincode is required';
    } else if (!pinRegex.test(pincode.trim())) {
      tempErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!serviceAreas.trim()) tempErrors.serviceAreas = 'Service Areas details are required';

    if (sectors.length === 0) tempErrors.sectors = 'Select at least one product sector';

    if (!gstCert) tempErrors.gstCert = 'GST Certificate is required';
    if (!businessRegCert) tempErrors.businessRegCert = 'Business Registration Certificate is required';

    if (!acceptedTerms) tempErrors.terms = 'You must accept the E-Parrys supplier terms';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const newReq = mockDbService.addVendorRequest({
      officerName,
      email,
      phone,
      companyName,
      businessStructure,
      gstin: gstin.toUpperCase(),
      panNumber: panNumber.toUpperCase(),
      yearEstablished,
      state,
      city,
      pincode,
      serviceAreas,
      sourcingSectors: sectors,
      gstCertFile: gstCert?.name || 'GSTIN_Audit_Cert.pdf',
      businessRegFile: businessRegCert?.name || 'MSME_License.pdf',
      logoFile: logoFile?.name || 'Company_Logo.png',
      catalogueFile: catalogueFile?.name || undefined
    });

    setSubmittedReqId(newReq.id);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-parrys-cream py-8 md:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Onboarding Confirmation View */}
        {isSuccess ? (
          <div className="bg-white rounded-2xl border border-parrys-surface-dim p-8 md:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <FiCheckCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold text-parrys-terracotta font-mono uppercase tracking-widest bg-parrys-cream px-3 py-1 rounded-md border border-parrys-surface-dim">
                Application Ref: {submittedReqId}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif pt-2">
                Wholesale Application Submitted!
              </h2>
              <p className="text-xs text-parrys-muted leading-relaxed font-medium max-w-lg mx-auto">
                Thank you for submitting your wholesale supplier details to E-Parrys. Your application has been queued for verification by our Admin Operations Team.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 text-left space-y-2 font-mono">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <FiInfo className="shrink-0" />
                <span>Next Step: Admin Review & Credentials Issuance</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-amber-900/80">
                <li>Admin will review your GSTIN audit, MSME licenses, and company profile.</li>
                <li>Upon Admin approval, your vendor account & login credentials will be generated.</li>
                <li>You will receive an email confirmation at <strong>{email}</strong> once approved.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-parrys-surface-dim/30 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-parrys-terracotta text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-parrys-terracotta-dark transition-colors text-center shadow-md"
              >
                Return to Storefront
              </Link>
              <Link
                to="/login"
                className="bg-white border border-parrys-surface-dim text-parrys-charcoal hover:bg-parrys-cream px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-center"
              >
                Go to Vendor Login
              </Link>
            </div>
          </div>
        ) : (
          /* Standalone Wholesale Supplier Onboarding Form */
          <div className="bg-white rounded-2xl border border-parrys-surface-dim p-6 md:p-10 space-y-8 shadow-xl relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-parrys-surface-dim/60 pb-5">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-parrys-charcoal font-serif">
                  Wholesale Supplier Onboarding
                </h2>
                <p className="text-xs text-parrys-muted font-medium mt-0.5">
                  Verify company licenses, yard dispatches capacity, and tax audits.
                </p>
              </div>
              <Link
                to="/"
                className="flex items-center gap-1.5 text-[10px] font-bold text-parrys-charcoal uppercase border border-parrys-surface-dim/75 rounded-lg px-3 py-1.5 hover:bg-parrys-cream transition cursor-pointer"
              >
                <FiArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Section 1: Corporate Sales Officer Personal Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-parrys-surface-dim/30 pb-2">
                  <FiUser className="text-parrys-terracotta h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal">
                    1. Corporate Sales Officer Personal Info
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Full Name *</label>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => {
                        setOfficerName(e.target.value);
                        if (errors.officerName) setErrors(prev => ({ ...prev, officerName: '' }));
                      }}
                      placeholder="e.g. Suresh Kumar"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.officerName ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.officerName && <span className="text-[10px] text-red-500 font-bold">{errors.officerName}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Corporate Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="e.g. sales@tata-steel.com"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.email ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.email && <span className="text-[10px] text-red-500 font-bold">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Mobile (OTP ready) *</label>
                      {isPhoneVerified && (
                        <span className="text-[10px] font-bold text-emerald-600 font-mono">✓ Verified</span>
                      )}
                    </div>
                    <div className="relative flex items-center gap-1.5">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setIsPhoneVerified(false);
                          setOtpSent(false);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder="e.g. 9876543210"
                        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                          errors.phone ? 'border-red-500' : isPhoneVerified ? 'border-emerald-500 bg-emerald-50/20' : 'border-parrys-surface-dim'
                        }`}
                      />
                      {!isPhoneVerified && (
                        <button
                          type="button"
                          onClick={handleSendMobileOtp}
                          className="bg-parrys-terracotta hover:bg-parrys-terracotta-dark text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2.5 rounded-xl shrink-0 transition cursor-pointer"
                        >
                          {otpSent ? 'Resend' : 'Get OTP'}
                        </button>
                      )}
                    </div>
                    {errors.phone && <span className="text-[10px] text-red-500 font-bold">{errors.phone}</span>}

                    {/* Inline OTP Verification Step */}
                    {otpSent && !isPhoneVerified && (
                      <div className="mt-2 p-2.5 bg-orange-50 border border-orange-200 rounded-xl space-y-2">
                        <div className="text-[10px] font-mono font-bold text-orange-900 flex justify-between items-center">
                          <span>SMS OTP Code: <strong className="text-orange-600 bg-white px-1.5 py-0.5 rounded border border-orange-200">{generatedOtp}</strong></span>
                        </div>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            maxLength={6}
                            value={inputOtp}
                            onChange={(e) => setInputOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="w-full bg-white border border-orange-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold outline-none focus:border-parrys-terracotta"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyMobileOtp}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg shrink-0 cursor-pointer"
                          >
                            Verify
                          </button>
                        </div>
                        {otpError && <span className="text-[10px] text-red-500 font-bold block">{otpError}</span>}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Password *</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                      }}
                      placeholder="••••••••"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.password ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.password && <span className="text-[10px] text-red-500 font-bold">{errors.password}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Confirm Password *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                      }}
                      placeholder="••••••••"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.confirmPassword ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.confirmPassword && <span className="text-[10px] text-red-500 font-bold">{errors.confirmPassword}</span>}
                  </div>
                </div>
              </div>

              {/* Section 2: Core Business Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-parrys-surface-dim/30 pb-2">
                  <FiBriefcase className="text-parrys-terracotta h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal">
                    2. Core Business Details
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.companyName ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.companyName && <span className="text-[10px] text-red-500 font-bold">{errors.companyName}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Business Structure *</label>
                    <select
                      value={businessStructure}
                      onChange={(e) => setBusinessStructure(e.target.value)}
                      className="w-full rounded-xl border border-parrys-surface-dim bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
                    >
                      <option value="Wholesaler Depot">Wholesaler Depot</option>
                      <option value="Manufacturer Brand">Manufacturer Brand</option>
                      <option value="Bulk Distributor">Bulk Distributor</option>
                      <option value="Regional Supplier">Regional Supplier</option>
                      <option value="Authorized Dealer">Authorized Dealer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">GST Number *</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => {
                        setGstin(e.target.value.toUpperCase());
                        if (errors.gstin) setErrors(prev => ({ ...prev, gstin: '' }));
                      }}
                      placeholder="e.g. 33AABCB1234C1Z0"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs font-mono uppercase text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.gstin ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.gstin && <span className="text-[10px] text-red-500 font-bold">{errors.gstin}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">PAN Card Number (Optional)</label>
                    <input
                      type="text"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. ABCDE1234F"
                      className="w-full rounded-xl border border-parrys-surface-dim bg-white px-3.5 py-2.5 text-xs font-mono uppercase text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none"
                    />
                  </div>

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
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.yearEstablished ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.yearEstablished && <span className="text-[10px] text-red-500 font-bold">{errors.yearEstablished}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Business State *</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        if (errors.state) setErrors(prev => ({ ...prev, state: '' }));
                      }}
                      placeholder="e.g. Karnataka"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.state ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.state && <span className="text-[10px] text-red-500 font-bold">{errors.state}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Business City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors(prev => ({ ...prev, city: '' }));
                      }}
                      placeholder="e.g. Bangalore"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.city ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.city && <span className="text-[10px] text-red-500 font-bold">{errors.city}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                        if (errors.pincode) setErrors(prev => ({ ...prev, pincode: '' }));
                      }}
                      placeholder="e.g. 560001"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs font-mono text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                        errors.pincode ? 'border-red-500' : 'border-parrys-surface-dim'
                      }`}
                    />
                    {errors.pincode && <span className="text-[10px] text-red-500 font-bold">{errors.pincode}</span>}
                  </div>
                </div>

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
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none transition ${
                      errors.serviceAreas ? 'border-red-500' : 'border-parrys-surface-dim'
                    }`}
                  />
                  {errors.serviceAreas && <span className="text-[10px] text-red-500 font-bold">{errors.serviceAreas}</span>}
                </div>

                {/* Sourcing Sectors */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">
                    Product Sourcing Sectors (Select at least one) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 bg-parrys-cream/40 border border-parrys-surface-dim/40 rounded-xl p-4">
                    {SOURCING_SECTORS.map(sector => {
                      const isChecked = sectors.includes(sector);
                      return (
                        <label key={sector} className="flex items-center gap-2 text-xs font-semibold text-parrys-charcoal cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSector(sector)}
                            className="accent-parrys-terracotta h-4 w-4 border-parrys-surface-dim rounded focus:ring-0"
                          />
                          <span>{sector}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.sectors && <span className="text-[10px] text-red-500 font-bold">{errors.sectors}</span>}
                </div>
              </div>

              {/* Section 3: Document License Uploads */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-parrys-surface-dim/30 pb-2">
                  <FiFileText className="text-parrys-terracotta h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal">
                    3. Document License Uploads
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUploadField
                    label="GSTIN Audit Registration Certificate *"
                    required
                    fileName={gstCert?.name || null}
                    onChange={setGstCert}
                    error={errors.gstCert}
                  />

                  <FileUploadField
                    label="Business Registration Certificate / MSME License *"
                    required
                    fileName={businessRegCert?.name || null}
                    onChange={setBusinessRegCert}
                    error={errors.businessRegCert}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUploadField
                    label="Corporate Logo File (Optional)"
                    fileName={logoFile?.name || null}
                    onChange={setLogoFile}
                  />

                  <FileUploadField
                    label="Detailed Product Catalogue (Optional)"
                    fileName={catalogueFile?.name || null}
                    onChange={setCatalogueFile}
                  />
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="flex items-start gap-2.5 text-xs font-semibold text-parrys-charcoal cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked);
                      if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                    }}
                    className="accent-parrys-terracotta h-4 w-4 border-parrys-surface-dim rounded focus:ring-0 mt-0.5"
                  />
                  <span>
                    I accept E-Parrys verified supplier dispatch logistics conditions, GST invoicing guarantees, and zero middleman pricing terms.
                  </span>
                </label>
                {errors.terms && <span className="text-[10px] text-red-500 font-bold">{errors.terms}</span>}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-parrys-surface-dim/30">
                <button
                  type="submit"
                  className="flex-1 bg-parrys-terracotta text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-parrys-terracotta-dark shadow-lg shadow-parrys-terracotta/20 transition cursor-pointer"
                >
                  <FiSend className="h-4 w-4" />
                  <span>Register as Wholesale Vendor</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("Google Sign Up for Wholesale Vendors is active. Fill company details to complete verification.")}
                  className="flex-1 border border-parrys-surface-dim/75 bg-white text-parrys-charcoal py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-parrys-cream/50 transition cursor-pointer"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOnboardingStandalone;
