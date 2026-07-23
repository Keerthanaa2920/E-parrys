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
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reports & Diagnostics</h1>
        <p className="text-xs text-gray-500 mt-1">Export transaction histories, compliance check states, and warehouse parameters.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-orange-100 bg-white shadow-sm p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <FiTrendingUp className="text-orange-500" />
            <span>Avg Transaction Price</span>
          </div>
          <p className="text-xl font-bold text-gray-900">₹32,450.00</p>
        </div>

        <div className="rounded-xl border border-orange-100 bg-white shadow-sm p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <FiLayers className="text-emerald-500" />
            <span>Total Listings Count</span>
          </div>
          <p className="text-xl font-bold text-gray-900">50 Active</p>
        </div>

        <div className="rounded-xl border border-orange-100 bg-white shadow-sm p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <FiFileText className="text-indigo-500" />
            <span>Reconciliation Ratio</span>
          </div>
          <p className="text-xl font-bold text-gray-900">99.98% Match</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="rounded-xl border border-orange-100 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-orange-100 bg-orange-50/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">Available Reports</h3>
        </div>

        <div className="divide-y divide-orange-50">
          {reportTypes.map((rep) => (
            <div key={rep.title} className="flex items-center justify-between p-5 hover:bg-orange-50/30 transition">
              <div className="space-y-1 pr-4">
                <h4 className="text-xs font-bold text-gray-900">{rep.title}</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">{rep.desc}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono text-gray-500">{rep.size}</span>
                <button
                  onClick={() => handleDownload(rep.title)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-orange-200 bg-white text-gray-500 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition focus:outline-none shadow-sm"
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
              className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-xs font-semibold text-gray-800 shadow-2xl"
            >
              <FiCheckCircle className="h-4.5 w-4.5 text-emerald-500" />
              <span>{toast}</span>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
