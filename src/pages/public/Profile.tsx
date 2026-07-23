import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiUser, FiBriefcase, FiMail, FiPhone, FiMapPin,
  FiPackage, FiMessageSquare, FiLogOut, FiCheckCircle,
  FiShield, FiClock, FiTruck, FiArrowRight, FiGrid,
  FiCalendar, FiTag
} from 'react-icons/fi';
import { mockDbService } from '../../services/mockDbService';
import type { IMarketplaceOrder, IEnquiry } from '../../services/mockDbService';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [orders, setOrders] = useState<IMarketplaceOrder[]>([]);
  const [enquiries, setEnquiries] = useState<IEnquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'enquiries'>('profile');

  useEffect(() => {
    const token = localStorage.getItem('eparrys_auth_token');
    const userStr = localStorage.getItem('eparrys_user');
    if (!token || !userStr) {
      navigate('/login');
      return;
    }
    try {
      const parsedUser = JSON.parse(userStr);
      setCurrentUser(parsedUser);
      const allOrders = mockDbService.getOrders();
      setOrders(allOrders);
      const allEnquiries = mockDbService.getEnquiries();
      const userEnquiries = allEnquiries.filter(
        e => e.senderEmail === parsedUser.email || parsedUser.email === 'customer@parrys.com'
      );
      setEnquiries(userEnquiries);
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('eparrys_auth_token');
    localStorage.removeItem('eparrys_user');
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parrys-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-parrys-terracotta" />
      </div>
    );
  }

  const initials = currentUser.name
    ? currentUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const totalSpend = orders.reduce((s, o) => s + o.amount, 0);

  const TABS = [
    { key: 'profile', label: 'Account', icon: <FiUser className="h-4 w-4" /> },
    { key: 'orders', label: `Orders (${orders.length})`, icon: <FiPackage className="h-4 w-4" /> },
    { key: 'enquiries', label: `Quotes (${enquiries.length})`, icon: <FiMessageSquare className="h-4 w-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-parrys-cream">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 right-0 w-72 h-72 bg-parrys-terracotta opacity-10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-parrys-terracotta text-white flex items-center justify-center text-2xl font-extrabold font-serif shadow-xl border-2 border-white/10">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center">
                <FiCheckCircle className="h-2.5 w-2.5 text-white" />
              </div>
            </div>

            {/* Identity */}
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white font-serif">{currentUser.name}</h1>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-parrys-terracotta bg-parrys-terracotta/10 border border-parrys-terracotta/30 px-2.5 py-1 rounded-full">
                  Verified Buyer
                </span>
              </div>
              <p className="text-sm text-slate-300 font-semibold">{currentUser.email}</p>
              {currentUser.companyName && (
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <FiBriefcase className="h-3.5 w-3.5" /> {currentUser.companyName}
                </p>
              )}
            </div>

            {/* Quick Stats Row */}
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-xl font-extrabold text-white font-mono">{orders.length}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Orders</p>
              </div>
              <div className="border-l border-white/10 pl-6">
                <p className="text-xl font-extrabold text-parrys-terracotta font-mono">
                  ₹{totalSpend.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total Spend</p>
              </div>
              <div className="border-l border-white/10 pl-6">
                <p className="text-xl font-extrabold text-white font-mono">{enquiries.length}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Active RFQs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ─── Left Sidebar ─── */}
          <div className="lg:col-span-1 space-y-5">

            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-parrys-surface-dim shadow-sm p-6 space-y-5">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-parrys-terracotta border-b border-parrys-cream pb-2">
                Contact Details
              </h3>
              <div className="space-y-3.5 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-parrys-cream flex items-center justify-center text-parrys-terracotta shrink-0">
                    <FiMail className="h-4 w-4" />
                  </div>
                  <span className="truncate">{currentUser.email}</span>
                </div>
                {currentUser.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-parrys-cream flex items-center justify-center text-parrys-terracotta shrink-0">
                      <FiPhone className="h-4 w-4" />
                    </div>
                    <span>{currentUser.phone}</span>
                  </div>
                )}
                {currentUser.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-parrys-cream flex items-center justify-center text-parrys-terracotta shrink-0 mt-0.5">
                      <FiMapPin className="h-4 w-4" />
                    </div>
                    <span className="leading-relaxed">{currentUser.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Buyer Status Card */}
            <div className="bg-white rounded-2xl border border-parrys-surface-dim shadow-sm p-6 space-y-4">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-parrys-terracotta border-b border-parrys-cream pb-2">
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-700">
                  <FiShield className="h-4 w-4 text-emerald-500 shrink-0" />
                  GST Verified Buyer
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                  <FiTruck className="h-4 w-4 text-parrys-terracotta shrink-0" />
                  Same-Day Delivery Eligible
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                  <FiClock className="h-4 w-4 text-parrys-terracotta shrink-0" />
                  2-Hour Confirmation SLA
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                  <FiGrid className="h-4 w-4 text-parrys-terracotta shrink-0" />
                  Commercial Wholesale Access
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-parrys-surface-dim shadow-sm p-6 space-y-3">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-parrys-terracotta border-b border-parrys-cream pb-2">
                Quick Actions
              </h3>
              <Link
                to="/products"
                className="flex items-center justify-between w-full text-xs font-bold text-slate-600 hover:text-parrys-terracotta py-2 transition-colors group"
              >
                <span>Browse Products</span>
                <FiArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="flex items-center justify-between w-full text-xs font-bold text-slate-600 hover:text-parrys-terracotta py-2 transition-colors group border-t border-parrys-cream"
              >
                <span>How It Works</span>
                <FiArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-between w-full text-xs font-bold text-slate-600 hover:text-parrys-terracotta py-2 transition-colors group border-t border-parrys-cream"
              >
                <span>Contact Support</span>
                <FiArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Sign Out */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 text-red-600 bg-white hover:bg-red-50 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm"
            >
              <FiLogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>

          {/* ─── Right Panel ─── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl border border-parrys-surface-dim shadow-sm p-1.5 flex gap-1">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-parrys-terracotta text-white shadow-md'
                      : 'text-slate-500 hover:text-parrys-charcoal hover:bg-parrys-cream'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Panel */}
            <div className="bg-white rounded-2xl border border-parrys-surface-dim shadow-sm overflow-hidden">

              {/* ── Profile Tab ── */}
              {activeTab === 'profile' && (
                <div className="p-8 space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-parrys-charcoal font-serif">Corporate Profile</h2>
                    <p className="text-xs text-parrys-muted mt-1 font-semibold">
                      Your registered commercial procurement account details and platform privileges.
                    </p>
                  </div>

                  {/* Profile Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Full Name', value: currentUser.name, icon: <FiUser /> },
                      { label: 'Email Address', value: currentUser.email, icon: <FiMail /> },
                      { label: 'Phone Number', value: currentUser.phone || 'Not provided', icon: <FiPhone /> },
                      { label: 'Company / Firm', value: currentUser.companyName || 'Individual Contractor', icon: <FiBriefcase /> },
                      { label: 'Operating Region', value: 'Chennai Metro, Kanchipuram, Thiruvallur', icon: <FiMapPin /> },
                      { label: 'Sourcing Type', value: 'Commercial Contractor & Real Estate Developer', icon: <FiGrid /> },
                      { label: 'Delivery Terms', value: 'Direct to Site (Same-Day / Scheduled)', icon: <FiTruck /> },
                      { label: 'Member Since', value: '2024', icon: <FiCalendar /> },
                    ].map(item => (
                      <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-parrys-cream/40 border border-parrys-surface-dim/60">
                        <div className="w-8 h-8 rounded-lg bg-white border border-parrys-surface-dim flex items-center justify-center text-parrys-terracotta shrink-0 text-sm">
                          {item.icon}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{item.label}</p>
                          <p className="text-xs font-bold text-parrys-charcoal truncate">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verification Badge */}
                  <div className="flex items-center gap-4 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <FiShield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-emerald-800">Verified Commercial Purchaser</p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        GST Registered · Wholesale Pricing Active · Priority Dispatch Queue
                      </p>
                    </div>
                    <FiCheckCircle className="h-5 w-5 text-emerald-500 ml-auto shrink-0" />
                  </div>
                </div>
              )}

              {/* ── Orders Tab ── */}
              {activeTab === 'orders' && (
                <div className="p-8 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-parrys-charcoal font-serif">Order History</h2>
                      <p className="text-xs text-parrys-muted mt-1 font-semibold">
                        All bulk material orders dispatched from direct distributors across Chennai.
                      </p>
                    </div>
                    {orders.length > 0 && (
                      <div className="shrink-0 text-right">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total Spend</p>
                        <p className="text-lg font-extrabold text-parrys-terracotta font-mono">
                          ₹{totalSpend.toLocaleString('en-IN')}
                        </p>
                      </div>
                    )}
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center mx-auto text-parrys-muted">
                        <FiPackage className="h-6 w-6" />
                      </div>
                      <p className="text-xs text-parrys-muted font-semibold">No orders yet.</p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-parrys-terracotta text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase hover:bg-parrys-terracotta-dark transition"
                      >
                        Browse Products <FiArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {orders.map((ord, idx) => {
                        const statusConfig: Record<string, { bg: string; text: string; border: string; bar: string; steps: number }> = {
                          pending:   { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  bar: 'bg-amber-400',  steps: 1 },
                          shipped:   { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   bar: 'bg-blue-500',   steps: 2 },
                          delivered: { bg: 'bg-emerald-50',text: 'text-emerald-700',border: 'border-emerald-200',bar: 'bg-emerald-500',steps: 3 },
                          cancelled: { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    bar: 'bg-red-400',    steps: 0 },
                        };
                        const cfg = statusConfig[ord.status] ?? statusConfig['pending'];
                        const STEPS = ['Ordered', 'Shipped', 'Delivered'];

                        return (
                          <div
                            key={ord.id}
                            className="bg-white rounded-2xl border border-parrys-surface-dim shadow-sm hover:shadow-md hover:border-parrys-terracotta/40 transition-all duration-300 overflow-hidden group"
                          >
                            {/* Card Top Accent */}
                            <div className={`h-1 w-full ${cfg.bar}`} />

                            <div className="p-5 space-y-4">
                              {/* Row 1: Order ID + Status */}
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[11px] font-extrabold text-parrys-terracotta bg-parrys-terracotta/5 border border-parrys-terracotta/20 px-2.5 py-1 rounded-lg">
                                  {ord.id}
                                </span>
                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-extrabold border uppercase tracking-widest ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                                  {ord.status}
                                </span>
                              </div>

                              {/* Row 2: Product Name */}
                              <div>
                                <p className="text-sm font-extrabold text-parrys-charcoal font-serif leading-snug group-hover:text-parrys-terracotta transition-colors">
                                  {ord.productName}
                                </p>
                                <p className="text-[11px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1.5">
                                  <FiBriefcase className="h-3 w-3" /> {ord.vendorName}
                                </p>
                              </div>

                              {/* Row 3: Qty + Amount */}
                              <div className="flex items-center justify-between bg-parrys-cream/50 rounded-xl px-4 py-3">
                                <div className="text-center">
                                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Qty</p>
                                  <p className="text-sm font-extrabold text-parrys-charcoal font-mono">{ord.quantity}</p>
                                </div>
                                <div className="w-px h-8 bg-parrys-surface-dim" />
                                <div className="text-center">
                                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Amount</p>
                                  <p className="text-sm font-extrabold text-parrys-terracotta font-mono">
                                    ₹{ord.amount.toLocaleString('en-IN')}
                                  </p>
                                </div>
                                <div className="w-px h-8 bg-parrys-surface-dim" />
                                <div className="text-center">
                                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Order #</p>
                                  <p className="text-sm font-extrabold text-parrys-charcoal font-mono">{String(idx + 1).padStart(2, '0')}</p>
                                </div>
                              </div>

                              {/* Row 4: Progress Track */}
                              {ord.status !== 'cancelled' ? (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                    {STEPS.map(s => <span key={s}>{s}</span>)}
                                  </div>
                                  <div className="relative h-1.5 bg-parrys-cream rounded-full overflow-hidden">
                                    <div
                                      className={`absolute h-full rounded-full transition-all duration-500 ${cfg.bar}`}
                                      style={{ width: `${(cfg.steps / 3) * 100}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between">
                                    {STEPS.map((_, i) => (
                                      <div key={i} className={`w-2.5 h-2.5 rounded-full border-2 ${
                                        i < cfg.steps
                                          ? `${cfg.bar} border-white shadow-sm`
                                          : 'bg-parrys-cream border-parrys-surface-dim'
                                      }`} />
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                  <span>⊘</span> Order Cancelled — Contact support for assistance
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ── Enquiries Tab ── */}
              {activeTab === 'enquiries' && (
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-parrys-charcoal font-serif">Request For Quotes (RFQs)</h2>
                    <p className="text-xs text-parrys-muted mt-1 font-semibold">
                      Active wholesale enquiries sent directly to manufacturers for regional volume price negotiations.
                    </p>
                  </div>

                  {enquiries.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center mx-auto text-parrys-muted">
                        <FiMessageSquare className="h-6 w-6" />
                      </div>
                      <p className="text-xs text-parrys-muted font-semibold">No active quotes found.</p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-parrys-terracotta text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase hover:bg-parrys-terracotta-dark transition"
                      >
                        Enquire on Products <FiArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enquiries.map(enq => (
                        <div key={enq.id} className="p-5 rounded-2xl border border-parrys-surface-dim bg-parrys-cream/20 space-y-4">
                          {/* Enquiry Header */}
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <FiCalendar className="h-3.5 w-3.5 text-slate-400" />
                                <span className="text-[10px] font-bold text-slate-400 font-mono">{enq.date}</span>
                              </div>
                              <h4 className="text-sm font-bold text-parrys-charcoal font-serif">{enq.productName}</h4>
                              <p className="text-[11px] text-parrys-muted flex items-center gap-1">
                                <FiBriefcase className="h-3 w-3" /> Supplier: {enq.vendorName}
                              </p>
                            </div>
                            <span className="text-[10px] font-extrabold text-parrys-terracotta font-mono bg-white px-3 py-1.5 rounded-lg border border-parrys-surface-dim shrink-0">
                              {enq.id}
                            </span>
                          </div>

                          {/* Message Body */}
                          <div className="text-xs text-slate-600 bg-white border border-parrys-surface-dim/60 rounded-xl p-4 leading-relaxed">
                            <p className="font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-1">
                              <FiMessageSquare className="h-3 w-3" /> Your Message
                            </p>
                            <p className="font-semibold">"{enq.message}"</p>
                          </div>

                          {/* Enquiry Footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                              <FiTag className="h-3.5 w-3.5 text-parrys-terracotta" />
                              Requested: <span className="text-parrys-charcoal">{enq.quantity} bags / units</span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
                              <FiClock className="h-3 w-3" /> Awaiting Vendor Proposal
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
