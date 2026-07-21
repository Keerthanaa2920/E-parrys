import React, { useMemo } from 'react';
import { mockDbService } from '../../services/mockDbService';
import { FiUsers, FiCheckSquare, FiCreditCard, FiActivity } from 'react-icons/fi';

export const Dashboard: React.FC = () => {
  const data = useMemo(() => {
    const products = mockDbService.getProducts();
    const orders = mockDbService.getOrders();
    const enquiries = mockDbService.getEnquiries();

    const approvedCount = products.filter(p => p.status === 'approved').length;
    const pendingCount = products.filter(p => p.status === 'pending').length;
    const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);

    // Hardcoded unique vendors for simplicity
    const uniqueVendors = Array.from(new Set(products.map(p => p.vendorName))).length;

    return { approvedCount, pendingCount, totalSales, uniqueVendors, enquiriesCount: enquiries.length };
  }, []);

  const stats = [
    { title: 'Total Platform Trade', value: `₹${(data.totalSales / 100000).toFixed(2)} Lakh`, desc: 'Value of transactions routed', icon: FiCreditCard, color: 'text-cyan-400' },
    { title: 'Approved Materials', value: `${data.approvedCount} Items`, desc: 'Live approved listings in catalog', icon: FiCheckSquare, color: 'text-emerald-400' },
    { title: 'Verified Supplier Vendors', value: `${data.uniqueVendors} Vendors`, desc: 'Active manufacturing partners', icon: FiUsers, color: 'text-indigo-400' },
    { title: 'Approval Queue', value: `${data.pendingCount} Pending`, desc: 'New submissions awaiting audit', icon: FiActivity, color: 'text-amber-450' }
  ];

  const recentVendors = [
    { name: "Jindal Steel Depot", email: "onboarding@jindal.com", category: "Steel", date: "2026-07-21", status: "Verified" },
    { name: "Supreme Pipe Solutions", email: "supply@supreme.com", category: "Pipes", date: "2026-07-20", status: "Verified" },
    { name: "Asian Paints Emporium", email: "retail@asianpaints.com", category: "Paints", date: "2026-07-18", status: "Verified" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Marketplace Admin Tower</h1>
        <p className="text-xs text-slate-400 mt-1">Global audit ledger, listing approvals, and wholesale onboarding control center.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 p-5 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.title}</span>
                <div className={`rounded-lg bg-slate-900 border border-slate-800 p-2 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xl font-bold text-slate-100 tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-slate-500">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Onboarding */}
        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/40 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            Recent Supplier Onboardings
          </h3>

          <div className="space-y-3">
            {recentVendors.map((vnd, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-900 bg-slate-950/40 p-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-200">{vnd.name}</h4>
                  <p className="text-[10px] text-slate-500">{vnd.email} | Sector: {vnd.category}</p>
                </div>
                <div className="text-right space-y-0.5 shrink-0">
                  <span className="block text-[10px] text-slate-455 font-mono">{vnd.date}</span>
                  <span className="inline-block rounded bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 text-[9px] font-semibold">
                    {vnd.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global audit warning notifications */}
        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/40 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            System Operations Log
          </h3>
          
          <div className="space-y-3 text-xs text-slate-400 leading-normal">
            <div className="rounded-lg bg-amber-955/10 border border-amber-500/10 p-3 flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1.5 animate-pulse" />
              <p>Product Listing <strong>SH-MP-003</strong> requires chemical test certifications check before approved live state.</p>
            </div>
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-cyan-500 shrink-0 mt-1.5" />
              <p>Supplier <strong>Birla Cement Hub</strong> stock sync complete. Updated stock counts across 3 items.</p>
            </div>
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-slate-500 shrink-0 mt-1.5" />
              <p>Platform billing reconciliation audit for Q2 completed. Total trade value matches database ledgers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
