import React, { useState } from 'react';
import { FiClock, FiSearch } from 'react-icons/fi';

export const Enquiries: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const enquiries = [
    { id: 'ENQ-993', customer: 'Ramesh Const.', subject: 'Bulk quote for Grade 53', date: '2 hrs ago', status: 'New' },
    { id: 'ENQ-992', customer: 'L&T Infra', subject: 'Availability for next month', date: '1 day ago', status: 'Replied' },
    { id: 'ENQ-990', customer: 'Sri Builders', subject: 'Delivery terms negotiation', date: '3 days ago', status: 'Closed' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-parrys-charcoal font-serif">Enquiry Management</h1>
        <p className="text-xs text-parrys-muted mt-1 font-semibold">Respond to customer queries and quote requests.</p>
      </div>

      <div className="flex max-w-md items-center bg-white border border-parrys-surface-dim rounded-custom px-3 py-2 shadow-sm focus-within:border-parrys-terracotta focus-within:ring-1 focus-within:ring-parrys-terracotta/20 transition">
        <FiSearch className="text-parrys-muted mr-2" />
        <input 
          type="text" 
          placeholder="Search enquiries..." 
          className="bg-transparent text-sm text-parrys-charcoal outline-none w-full placeholder-parrys-muted"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-custom border border-parrys-surface-dim bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-parrys-charcoal">
          <thead className="bg-parrys-cream text-xs uppercase text-parrys-muted border-b border-parrys-surface-dim">
            <tr>
              <th className="px-6 py-3 font-bold tracking-wider">Enquiry ID</th>
              <th className="px-6 py-3 font-bold tracking-wider">Customer</th>
              <th className="px-6 py-3 font-bold tracking-wider">Subject</th>
              <th className="px-6 py-3 font-bold tracking-wider">Date</th>
              <th className="px-6 py-3 font-bold tracking-wider">Status</th>
              <th className="px-6 py-3 font-bold tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-parrys-surface-dim/60 text-sm">
            {enquiries.map((enq) => (
              <tr key={enq.id} className="hover:bg-parrys-surface-dim/10 transition">
                <td className="px-6 py-4 font-mono font-bold text-parrys-terracotta text-xs">{enq.id}</td>
                <td className="px-6 py-4 font-bold text-parrys-charcoal">{enq.customer}</td>
                <td className="px-6 py-4 text-parrys-muted font-medium">{enq.subject}</td>
                <td className="px-6 py-4 text-xs font-semibold text-parrys-muted flex items-center gap-1.5"><FiClock className="text-parrys-muted" /> {enq.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border
                    ${enq.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                    ${enq.status === 'Replied' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                    ${enq.status === 'Closed' ? 'bg-parrys-cream text-parrys-muted border-parrys-surface-dim/50' : ''}
                  `}>
                    {enq.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-parrys-terracotta hover:text-parrys-terracotta-dark text-xs font-bold transition">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
