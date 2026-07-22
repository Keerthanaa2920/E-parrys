import React, { useState } from 'react';
import { FiCheckCircle, FiShield, FiMapPin } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

interface IVendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstin: string;
  warehouse: string;
  listingCount: number;
  status: 'verified' | 'pending' | 'review';
}

export const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<IVendor[]>([
    { id: "VND-801", name: "Birla Cement Hub", email: "wholesale@birlacement.com", phone: "+91 44 2534 8833", gstin: "33AABCB1234C1Z0", warehouse: "Chennai Main Yard", listingCount: 6, status: 'verified' },
    { id: "VND-802", name: "Tata Steel Distributors", email: "onboarding@tatassteel.com", phone: "+91 44 2490 1199", gstin: "33AABCT9982D2Z1", warehouse: "Visakhapatnam Depot", listingCount: 8, status: 'verified' },
    { id: "VND-803", name: "Kajaria Tile Gallery", email: "sales@kajariaceramics.com", phone: "+91 22 2840 9011", gstin: "27AACKG2234P3Z3", warehouse: "Mumbai South Godown", listingCount: 7, status: 'verified' },
    { id: "VND-804", name: "Finolex Cables India", email: "dealer@finolex.com", phone: "+91 42 2253 9090", gstin: "33AAFCI1090Q4Z9", warehouse: "Coimbatore Yard", listingCount: 5, status: 'review' },
    { id: "VND-805", name: "Supreme Pipe Solutions", email: "supply@supreme.com", phone: "+91 11 2920 8877", gstin: "07AASPS9834L5Z5", warehouse: "Bengaluru Yard", listingCount: 4, status: 'pending' }
  ]);

  const [toast, setToast] = useState('');

  const handleToggleStatus = (id: string, nextStatus: IVendor['status']) => {
    setVendors(prev => 
      prev.map(v => v.id === id ? { ...v, status: nextStatus } : v)
    );
    
    setToast(`Vendor ${id} registration updated to ${nextStatus}.`);
    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Marketplace Suppliers</h1>
        <p className="text-xs text-slate-400 mt-1">Review vendor credentials, GST validations, and verification status.</p>
      </div>

      {/* Vendors Table */}
      <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-[var(--color-brand-border)] text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Supplier ID</th>
                <th className="py-3.5 px-4">Company Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">GSTIN Code</th>
                <th className="py-3.5 px-4 text-center">Listings</th>
                <th className="py-3.5 px-4 text-center">State</th>
                <th className="py-3.5 px-4 text-right w-44">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
              {vendors.map((vnd) => (
                <tr key={vnd.id} className="hover:bg-slate-900/30 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-[var(--color-brand-cyan)]">{vnd.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200">{vnd.name}</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <FiMapPin className="h-3 w-3 shrink-0" />
                        {vnd.warehouse}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-slate-300">{vnd.email}</span>
                      <span className="text-[10px] text-slate-500">{vnd.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-400">{vnd.gstin}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-300">{vnd.listingCount}</td>
                  
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border
                      ${vnd.status === 'verified' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20' : ''}
                      ${vnd.status === 'pending' ? 'bg-amber-950/20 text-amber-450 border-amber-500/20 animate-pulse' : ''}
                      ${vnd.status === 'review' ? 'bg-cyan-950/20 text-cyan-455 border-cyan-500/20' : ''}
                    `}>
                      <span className="capitalize">{vnd.status}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {vnd.status !== 'verified' && (
                        <button
                          onClick={() => handleToggleStatus(vnd.id, 'verified')}
                          className="flex items-center gap-1 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-semibold text-emerald-450 hover:border-emerald-500/30 hover:bg-emerald-950/10 transition focus:outline-none"
                          title="Verify Supplier"
                        >
                          <FiCheckCircle className="h-3 w-3" />
                          <span>Approve</span>
                        </button>
                      )}
                      
                      {vnd.status === 'verified' && (
                        <button
                          onClick={() => handleToggleStatus(vnd.id, 'review')}
                          className="flex items-center gap-1 rounded border border-slate-750 bg-slate-900 px-2 py-1 text-[10px] font-semibold text-amber-450 hover:border-amber-500/30 hover:bg-amber-950/10 transition focus:outline-none"
                          title="Flag Supplier for Review"
                        >
                          <FiShield className="h-3 w-3" />
                          <span>Flag</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-500/20 bg-slate-950 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
