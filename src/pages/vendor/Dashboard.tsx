import React, { useMemo } from 'react';
import { mockDbService } from '../../services/mockDbService';
import { FiTrendingUp, FiShoppingBag, FiInbox, FiDollarSign, FiMessageSquare } from 'react-icons/fi';

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
        <h1 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Welcome back, Birla Cement</h1>
        <p className="text-xs text-parrys-muted mt-1 font-semibold">Here is the active ledger status for your building material supplies.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="rounded-custom border border-parrys-surface-dim bg-white p-5 space-y-3 shadow-sm hover:border-parrys-terracotta/40 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">{stat.title}</span>
                <div className={`rounded bg-parrys-cream border border-parrys-surface-dim/40 p-2 ${stat.color.replace('400', '600').replace('450', '600')}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xl font-bold text-parrys-charcoal tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-medium text-parrys-muted">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Orders and enquiries log */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customer RFQs */}
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-parrys-muted border-b border-parrys-surface-dim/60 pb-2">
            Recent Enquiries (RFQs)
          </h3>

          {data.enquiries.length === 0 ? (
            <p className="text-xs font-medium text-parrys-muted text-center py-8">No quote enquiries found for your catalog items.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
              {data.enquiries.map((enq) => (
                <div key={enq.id} className="rounded border border-parrys-surface-dim/60 bg-parrys-cream p-3 space-y-2 hover:bg-parrys-surface-dim/10 transition">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-parrys-charcoal">{enq.senderName} <span className="font-medium text-parrys-muted">({enq.senderEmail})</span></span>
                    <span className="font-medium text-parrys-muted">{enq.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-parrys-terracotta">{enq.productName}</h4>
                  <p className="text-[11px] text-parrys-charcoal italic font-serif">" {enq.message} "</p>
                  <div className="text-[10px] text-parrys-muted font-bold">Requested Volume: <span className="text-parrys-charcoal">{enq.quantity} units</span></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customer orders */}
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-parrys-muted border-b border-parrys-surface-dim/60 pb-2">
            Incoming Orders
          </h3>

          {data.orders.length === 0 ? (
            <p className="text-xs font-medium text-parrys-muted text-center py-8">No dispatch orders received yet.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
              {data.orders.map((ord) => (
                <div key={ord.id} className="flex items-center justify-between rounded border border-parrys-surface-dim/60 bg-parrys-cream p-3 hover:bg-parrys-surface-dim/10 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-parrys-charcoal font-mono">{ord.id}</span>
                      <span className="text-[10px] font-medium text-parrys-muted">{ord.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-parrys-terracotta">{ord.productName}</h4>
                    <p className="text-[10px] font-medium text-parrys-muted">Qty: <span className="font-bold text-parrys-charcoal">{ord.quantity} units</span> | Buyer: <span className="font-bold text-parrys-charcoal">{ord.buyerName}</span></p>
                  </div>

                  <div className="text-right space-y-1 shrink-0">
                    <span className="block text-xs font-bold font-mono text-parrys-charcoal">₹{ord.amount.toLocaleString('en-IN')}</span>
                    <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider
                      ${ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : ''}
                      ${ord.status === 'shipped' ? 'bg-blue-50 text-blue-700 border border-blue-200' : ''}
                      ${ord.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse' : ''}
                      ${ord.status === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
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
