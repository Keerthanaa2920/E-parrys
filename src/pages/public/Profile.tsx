import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiBriefcase, FiMail, FiPhone, FiMapPin, FiPackage, FiMessageSquare, FiLogOut, FiCheckCircle } from 'react-icons/fi';
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
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userStr);
      setCurrentUser(parsedUser);

      // Load matching mock orders and enquiries
      const allOrders = mockDbService.getOrders();
      setOrders(allOrders);

      const allEnquiries = mockDbService.getEnquiries();
      // Filter enquiries to match this buyer's email if possible, or show all
      const userEnquiries = allEnquiries.filter(e => e.senderEmail === parsedUser.email || parsedUser.email === 'customer@parrys.com');
      setEnquiries(userEnquiries);
    } catch (e) {
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-parrys-terracotta"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-custom border border-parrys-surface-dim/40 bg-white p-6 shadow-md text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-parrys-terracotta" />
            
            <div className="w-20 h-20 rounded-full bg-parrys-cream border-2 border-parrys-surface-dim/80 text-parrys-terracotta flex items-center justify-center mx-auto mt-4 text-2xl font-bold shadow-sm">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            
            <h2 className="text-lg font-bold text-parrys-charcoal font-serif mt-4">{currentUser.name}</h2>
            <p className="text-[10px] font-bold text-parrys-terracotta uppercase tracking-wider bg-parrys-cream/80 px-2.5 py-1 rounded-full inline-block mt-1">
              Customer Account
            </p>
            
            <div className="border-t border-parrys-cream my-6" />
            
            <div className="space-y-4 text-left text-xs font-semibold text-slate-600">
              {currentUser.companyName && (
                <div className="flex items-center gap-2.5">
                  <FiBriefcase className="text-slate-400 shrink-0 h-4 w-4" />
                  <span className="truncate">{currentUser.companyName}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <FiMail className="text-slate-400 shrink-0 h-4 w-4" />
                <span className="truncate">{currentUser.email}</span>
              </div>
              {currentUser.phone && (
                <div className="flex items-center gap-2.5">
                  <FiPhone className="text-slate-400 shrink-0 h-4 w-4" />
                  <span>{currentUser.phone}</span>
                </div>
              )}
              {currentUser.address && (
                <div className="flex items-start gap-2.5">
                  <FiMapPin className="text-slate-400 shrink-0 h-4 w-4 mt-0.5" />
                  <span className="leading-relaxed">{currentUser.address}</span>
                </div>
              )}
            </div>

            <div className="border-t border-parrys-cream my-6" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-custom border border-red-200 text-red-600 bg-white hover:bg-red-50 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              <FiLogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Right Side: Details & Activity Panels */}
        <div className="lg:col-span-3 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex border-b border-parrys-surface-dim/40 gap-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-parrys-terracotta text-parrys-terracotta'
                  : 'border-transparent text-parrys-muted hover:text-parrys-charcoal'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FiUser className="h-4 w-4" />
                Business Info
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-parrys-terracotta text-parrys-terracotta'
                  : 'border-transparent text-parrys-muted hover:text-parrys-charcoal'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FiPackage className="h-4 w-4" />
                Sourcing Orders ({orders.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`pb-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition cursor-pointer ${
                activeTab === 'enquiries'
                  ? 'border-parrys-terracotta text-parrys-terracotta'
                  : 'border-transparent text-parrys-muted hover:text-parrys-charcoal'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FiMessageSquare className="h-4 w-4" />
                Active Quotes & RFQs ({enquiries.length})
              </span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="bg-white rounded-custom border border-parrys-surface-dim/40 p-6 shadow-md min-h-[400px]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-parrys-charcoal font-serif mb-2">Corporate Profile</h3>
                  <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
                    Manage your commercial constructor profile to receive optimized bulk material proposals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-parrys-cream">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Sourcing Type</p>
                    <p className="text-xs font-bold text-parrys-charcoal">Commercial Contractor & Real Estate Developer</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Operating Region</p>
                    <p className="text-xs font-bold text-parrys-charcoal">Chennai Metro, Kanchipuram, Thiruvallur</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Default Delivery Terms</p>
                    <p className="text-xs font-bold text-parrys-charcoal">Direct to Site Delivery (Same-Day / Scheduled)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Payment Verification</p>
                    <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <FiCheckCircle className="h-3.5 w-3.5 shrink-0" /> Verified Commercial Purchaser (GST Registered)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-parrys-charcoal font-serif mb-2">Order History</h3>
                  <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
                    Review and track all your bulk aggregate orders dispatched from direct distributors.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 text-xs text-parrys-muted border-t border-parrys-cream font-semibold">
                    No recent orders found. Add items to your cart and place an order to get started.
                  </div>
                ) : (
                  <div className="overflow-x-auto border-t border-parrys-cream">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-parrys-cream bg-parrys-cream/35 font-bold uppercase text-parrys-muted text-[10px]">
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Product</th>
                          <th className="p-4">Supplier</th>
                          <th className="p-4 text-center">Qty</th>
                          <th className="p-4 text-right">Amount</th>
                          <th className="p-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-parrys-cream font-semibold text-slate-700">
                        {orders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50 transition">
                            <td className="p-4 font-mono font-bold text-parrys-terracotta">{ord.id}</td>
                            <td className="p-4 font-bold text-parrys-charcoal">{ord.productName}</td>
                            <td className="p-4">{ord.vendorName}</td>
                            <td className="p-4 text-center">{ord.quantity}</td>
                            <td className="p-4 text-right font-mono font-bold text-parrys-charcoal">
                              ₹{ord.amount.toLocaleString('en-IN')}
                            </td>
                            <td className="p-4 text-center">
                              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold border uppercase tracking-wider
                                ${ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                ${ord.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                ${ord.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                ${ord.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                              `}>
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-parrys-charcoal font-serif mb-2">Request For Quotes (RFQs)</h3>
                  <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
                    Active wholesale inquiries sent directly to manufacturers for regional volume price negotiations.
                  </p>
                </div>

                {enquiries.length === 0 ? (
                  <div className="text-center py-12 text-xs text-parrys-muted border-t border-parrys-cream font-semibold">
                    No active quotes found. Enquire on products to view updates here.
                  </div>
                ) : (
                  <div className="space-y-4 border-t border-parrys-cream pt-6">
                    {enquiries.map((enq) => (
                      <div key={enq.id} className="p-4 rounded-custom border border-parrys-surface-dim bg-parrys-cream/20 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 font-mono">{enq.date}</span>
                            <h4 className="text-xs font-bold text-parrys-charcoal font-serif mt-0.5">{enq.productName}</h4>
                            <p className="text-[10px] text-parrys-muted mt-0.5">Supplier: {enq.vendorName}</p>
                          </div>
                          <span className="text-xs font-bold text-parrys-terracotta font-mono bg-white px-2.5 py-1 rounded border border-parrys-surface-dim">
                            {enq.id}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 bg-white border border-parrys-surface-dim/40 rounded p-3 leading-relaxed">
                          <p className="font-bold text-slate-400 text-[10px] uppercase mb-1">Your Message:</p>
                          "{enq.message}"
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <span>Requested Quantity: {enq.quantity} bags/units</span>
                          <span className="text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Waiting for Vendor Proposal
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
  );
};
