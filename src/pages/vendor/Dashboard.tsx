import React, { useMemo } from 'react';
import { mockDbService } from '../../services/mockDbService';
import { FiShoppingBag, FiDollarSign, FiMessageSquare } from 'react-icons/fi';

export const Dashboard: React.FC = () => {
  const vendorName = "Birla Cement Hub";

  const data = useMemo(() => {
    const products = mockDbService.getProducts().filter(p => p.vendorName === vendorName);
    const enquiries = mockDbService.getEnquiries().filter(e => e.vendorName === vendorName);
    const orders = mockDbService.getOrders().filter(o => o.vendorName === vendorName);
    
    const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);

    return { products, enquiries, orders, totalSales };
  }, []);

  const stats = [
    { title: 'Total Sales Revenue', value: `₹${data.totalSales.toLocaleString('en-IN')}`, desc: 'Earned from completed dispatches', icon: FiDollarSign, color: 'text-emerald-450' },
    { title: 'Listed Products', value: `${data.products.length} Items`, desc: 'Active approved material lines', icon: FiShoppingBag, color: 'text-cyan-400' },
    { title: 'Customer Quotes', value: `${data.enquiries.length} Enquiries`, desc: 'Pending RFQs awaiting callback', icon: FiMessageSquare, color: 'text-indigo-400' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Welcome back, Birla Cement</h1>
        <p className="text-xs text-slate-400 mt-1">Here is the active ledger status for your building material supplies.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 p-5 space-y-3 shadow-md hover:border-cyan-500/10 transition">
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

      {/* Orders and enquiries log */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customer RFQs */}
        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/40 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            Recent Enquiries (RFQs)
          </h3>

          {data.enquiries.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">No quote enquiries found for your catalog items.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
              {data.enquiries.map((enq) => (
                <div key={enq.id} className="rounded-lg border border-slate-900 bg-slate-950/40 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-slate-300">{enq.senderName} ({enq.senderEmail})</span>
                    <span className="text-slate-500">{enq.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[var(--color-brand-cyan)]">{enq.productName}</h4>
                  <p className="text-[11px] text-slate-400 italic">" {enq.message} "</p>
                  <div className="text-[10px] text-slate-500 font-medium">Requested Volume: {enq.quantity} bags</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customer orders */}
        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/40 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            Incoming Orders
          </h3>

          {data.orders.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">No dispatch orders received yet.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
              {data.orders.map((ord) => (
                <div key={ord.id} className="flex items-center justify-between rounded-lg border border-slate-900 bg-slate-950/40 p-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200 font-mono">{ord.id}</span>
                      <span className="text-[10px] text-slate-500">{ord.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-350">{ord.productName}</h4>
                    <p className="text-[10px] text-slate-500">Qty: {ord.quantity} units | Buyer: {ord.buyerName}</p>
                  </div>

                  <div className="text-right space-y-1 shrink-0">
                    <span className="block text-xs font-bold font-mono text-slate-300">₹{ord.amount.toLocaleString('en-IN')}</span>
                    <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider
                      ${ord.status === 'delivered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : ''}
                      ${ord.status === 'shipped' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/20' : ''}
                      ${ord.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-500/20 animate-pulse' : ''}
                      ${ord.status === 'cancelled' ? 'bg-rose-950 text-rose-400 border border-rose-500/20' : ''}
                    `}>
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
