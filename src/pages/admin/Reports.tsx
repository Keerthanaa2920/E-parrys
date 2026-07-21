import React, { useState } from 'react';
import { FiDownload, FiCheckCircle, FiTrendingUp, FiLayers, FiFileText } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Reports: React.FC = () => {
  const [toast, setToast] = useState('');

  const handleDownload = (reportName: string) => {
    setToast(`Downloading ${reportName} sheet...`);
    setTimeout(() => setToast(''), 3000);
  };

  const reportTypes = [
    { title: "Marketplace Sales Ledger", size: "1.4 MB", desc: "Detailed timeline of completed platform trades and commissions." },
    { title: "Vendor Compliance Audit", size: "850 KB", desc: "GST validation statuses and listing safety compliance logs." },
    { title: "Inventory Turnover Sheet", size: "2.1 MB", desc: "Stock depletion cycles and average yard capacities." }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Reports & Diagnostics</h1>
        <p className="text-xs text-slate-400 mt-1">Export transaction histories, compliance check states, and warehouse parameters.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/40 p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <FiTrendingUp className="text-[var(--color-brand-cyan)]" />
            <span>Avg Transaction Price</span>
          </div>
          <p className="text-xl font-bold text-slate-200">₹32,450.00</p>
        </div>

        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/40 p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <FiLayers className="text-emerald-450" />
            <span>Total Listings Count</span>
          </div>
          <p className="text-xl font-bold text-slate-200">50 Active</p>
        </div>

        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/40 p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <FiFileText className="text-indigo-400" />
            <span>Reconciliation Ratio</span>
          </div>
          <p className="text-xl font-bold text-slate-200">99.98% Match</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--color-brand-border)] bg-slate-900/40">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Reports</h3>
        </div>

        <div className="divide-y divide-slate-800/40">
          {reportTypes.map((rep) => (
            <div key={rep.title} className="flex items-center justify-between p-5 hover:bg-slate-900/20 transition">
              <div className="space-y-1 pr-4">
                <h4 className="text-xs font-bold text-slate-200">{rep.title}</h4>
                <p className="text-[11px] text-slate-455 leading-relaxed">{rep.desc}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono text-slate-500">{rep.size}</span>
                <button
                  onClick={() => handleDownload(rep.title)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 hover:border-[var(--color-brand-cyan)] hover:text-white transition focus:outline-none"
                  title="Download Report"
                >
                  <FiDownload className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
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
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-450" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
