import React, { useMemo } from 'react';
import { mockDbService } from '../../services/mockDbService';
import { FiShoppingBag, FiDollarSign, FiClock, FiAlertTriangle, FiTrendingUp, FiEye } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
  const vendorName = "Birla Cement Hub";

  const data = useMemo(() => {
    const products = mockDbService.getProducts().filter(p => p.vendorName === vendorName);
    const orders = mockDbService.getOrders().filter(o => o.vendorName === vendorName);
    
    const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const lowStockAlerts = products.filter(p => {
      const min = p.minOrderQty || 10;
      return p.quantity < min * 2; // Arbitrary low stock condition
    }).length;

    // Mock trend data
    const salesTrend = [
      { name: 'Mon', sales: 4000 },
      { name: 'Tue', sales: 3000 },
      { name: 'Wed', sales: 12000 },
      { name: 'Thu', sales: 8500 },
      { name: 'Fri', sales: 15200 },
      { name: 'Sat', sales: 23100 },
      { name: 'Sun', sales: 18000 },
    ];

    return { products, orders, totalSales, pendingOrders, lowStockAlerts, salesTrend };
  }, []);

  const stats = [
    { title: 'Revenue (This Month)', value: `₹${data.totalSales.toLocaleString('en-IN')}`, desc: '+14% from last month', icon: FiDollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Today Orders', value: `12 Orders`, desc: '₹45,200 total value', icon: FiShoppingBag, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Pending Dispatch', value: `${data.pendingOrders} Orders`, desc: 'Requires immediate action', icon: FiClock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Low Stock Alerts', value: `${data.lowStockAlerts} Items`, desc: 'Below critical threshold', icon: FiAlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-parrys-charcoal font-serif">Vendor Dashboard</h1>
          <p className="text-xs text-parrys-muted mt-1 font-semibold">Overview of your sales, orders, and inventory status.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-parrys-surface-dim hover:border-parrys-terracotta text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-custom shadow-sm transition">
          <FiEye className="h-4 w-4" />
          Storefront Preview
        </button>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="rounded-custom border border-parrys-surface-dim bg-white p-5 space-y-3 shadow-sm hover:border-parrys-terracotta/40 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">{stat.title}</span>
                <div className={`rounded-full p-2 ${stat.bg} ${stat.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-parrys-charcoal tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-bold text-parrys-muted mt-1 flex items-center gap-1">
                  {stat.title.includes('Revenue') && <FiTrendingUp className="text-emerald-500" />}
                  {stat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 rounded-custom border border-parrys-surface-dim bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal font-serif border-b border-parrys-surface-dim/60 pb-3 flex items-center gap-2">
            <FiTrendingUp className="text-parrys-terracotta" />
            Weekly Sales Trend
          </h3>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#78716C', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#78716C', fontWeight: 600 }} dx={-10} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e7e5e4', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#A9441D" strokeWidth={3} dot={{ r: 4, fill: '#A9441D', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts Compact List */}
        <div className="rounded-custom border border-parrys-surface-dim bg-white p-5 shadow-sm space-y-4 flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal font-serif border-b border-parrys-surface-dim/60 pb-3 flex items-center gap-2">
            <FiAlertTriangle className="text-rose-500" />
            Critical Stock Action
          </h3>
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {data.products.filter(p => p.quantity < (p.minOrderQty || 10) * 2).slice(0, 5).map(product => (
              <div key={product.id} className="p-3 bg-rose-50/50 border border-rose-100 rounded-lg flex justify-between items-center group cursor-pointer hover:bg-rose-50 transition">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-parrys-charcoal group-hover:text-parrys-terracotta transition">{product.productName}</h4>
                  <p className="text-[10px] font-mono font-medium text-rose-600">Stock: {product.quantity} {product.unitMeasure || 'units'}</p>
                </div>
                <button className="text-[10px] font-bold uppercase text-rose-600 border border-rose-200 bg-white px-2 py-1 rounded hover:bg-rose-600 hover:text-white transition">Restock</button>
              </div>
            ))}
            {data.products.length > 0 && data.lowStockAlerts === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
                  <FiShoppingBag />
                </div>
                <p className="text-xs font-bold text-parrys-charcoal">Inventory Healthy</p>
                <p className="text-[10px] text-parrys-muted">All products are above minimums.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Recent Orders Table */}
      <div className="rounded-custom border border-parrys-surface-dim bg-white overflow-hidden shadow-sm">
        <div className="p-5 border-b border-parrys-surface-dim/60 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal font-serif">
            Recent Orders
          </h3>
          <button className="text-[11px] font-bold text-parrys-terracotta hover:underline">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-parrys-cream/50 text-[10px] font-bold uppercase tracking-wider text-parrys-muted border-b border-parrys-surface-dim/40">
                <th className="p-4 whitespace-nowrap">Order ID</th>
                <th className="p-4">Product / Item</th>
                <th className="p-4 whitespace-nowrap">Buyer Details</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {data.orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="border-b border-parrys-surface-dim/40 hover:bg-parrys-cream/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-parrys-charcoal whitespace-nowrap">{ord.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-parrys-charcoal line-clamp-1">{ord.productName}</p>
                    <p className="text-[10px] text-parrys-muted font-medium mt-0.5">Qty: {ord.quantity} units</p>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <p className="font-bold text-parrys-charcoal">{ord.buyerName || 'Retail Customer'}</p>
                    <p className="text-[10px] text-parrys-muted font-medium mt-0.5">{ord.date}</p>
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-parrys-charcoal">
                    ₹{ord.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-block rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider
                      ${ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : ''}
                      ${ord.status === 'shipped' ? 'bg-blue-50 text-blue-700 border border-blue-200' : ''}
                      ${ord.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' : ''}
                      ${ord.status === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
                    `}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[11px] font-bold text-parrys-terracotta hover:underline border border-transparent hover:border-parrys-terracotta/20 px-2 py-1 rounded transition">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {data.orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-parrys-muted">
                    No recent orders found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

