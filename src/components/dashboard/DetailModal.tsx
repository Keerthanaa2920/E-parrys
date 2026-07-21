import React from 'react';
import type { IMarketplaceItem } from '../../types/dashboard';
import { FiX, FiMapPin, FiLayers, FiCreditCard, FiAnchor, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface DetailModalProps {
  order: IMarketplaceItem | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  // Visual milestone steps for a product listing approval workflow
  const steps = [
    { name: 'Draft SKU', done: true, desc: 'SKU listing drafted by Vendor' },
    { name: 'Under Review', done: order.status !== 'pending' && order.status !== 'cancelled', desc: 'Submitted for quality & spec checks' },
    { name: 'Approved', done: order.status === 'approved', desc: 'Listing approved by marketplace admin' },
    { name: 'Live', done: order.status === 'approved', desc: 'Listed live on E-Parrys client catalog' }
  ];

  return (
    <>
      {/* Dark blur backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Container */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full flex-col border-l border-[var(--color-brand-border)] bg-[#070a13] shadow-2xl sm:max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--color-brand-border)] px-6 bg-slate-900/20">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Marketplace Detail View</span>
            <h3 id="drawer-title" className="text-sm font-semibold text-[var(--color-brand-cyan)] font-mono">{order.id}</h3>
          </div>
          
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white transition focus:outline-none"
            aria-label="Close details"
          >
            <FiX className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* Main summary panel */}
          <div className="rounded-xl border border-[var(--color-brand-border)] bg-slate-900/30 p-4 space-y-3">
            <div className="flex flex-col gap-0.5 border-b border-slate-800/40 pb-2">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Product Description</span>
              <span className="text-xs font-semibold text-slate-100">{order.productName}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Vendor Account</span>
              <span className="font-semibold text-slate-200">{order.vendorName}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Listing Price</span>
              <span className="font-mono font-bold text-slate-200">
                ₹{order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Material Category</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-350">{order.category}</span>
            </div>
          </div>

          {/* Product Technical Properties */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800/60 pb-2">
              Technical Specifications
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-900 bg-slate-950 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                  <FiMapPin className="h-3 w-3 text-[var(--color-brand-cyan)]" />
                  <span>WAREHOUSE YARD</span>
                </div>
                <p className="text-xs font-semibold text-slate-200">{order.warehouse}</p>
              </div>

              <div className="rounded-lg border border-slate-900 bg-slate-950 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                  <FiLayers className="h-3 w-3 text-[var(--color-brand-indigo)]" />
                  <span>STOCK LEVEL</span>
                </div>
                <p className="text-xs font-semibold text-slate-200">
                  {order.quantity.toLocaleString('en-IN')} Units
                </p>
              </div>

              <div className="rounded-lg border border-slate-900 bg-slate-950 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                  <FiActivity className="h-3 w-3 text-emerald-450" />
                  <span>SPEC / GRADE</span>
                </div>
                <p className="text-xs font-semibold text-slate-200 truncate">{order.specGrade}</p>
              </div>

              <div className="rounded-lg border border-slate-900 bg-slate-950 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                  <FiAnchor className="h-3 w-3 text-amber-500" />
                  <span>SKU IDENTIFIER</span>
                </div>
                <p className="text-xs font-mono font-semibold text-slate-200 truncate">{order.sku}</p>
              </div>
            </div>
          </div>

          {/* Approval Milestone Track */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800/60 pb-2">
              Listing Approvals Milestones
            </h4>

            {order.status === 'cancelled' ? (
              <div className="rounded-xl border border-rose-500/20 bg-rose-950/15 p-4 text-center">
                <p className="text-xs font-semibold text-rose-450">Listing Rejected</p>
                <p className="text-[10px] text-slate-400 mt-1">This product listing was rejected and removed from active marketplace catalog.</p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {steps.map((step, index) => (
                  <div key={index} className="relative flex flex-col gap-0.5">
                    {/* Node Dot */}
                    <div 
                      className={`absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all
                        ${step.done 
                          ? 'bg-[var(--color-brand-cyan)] border-[var(--color-brand-cyan)] shadow-md shadow-cyan-500/50' 
                          : 'bg-[#070a13] border-slate-800'
                        }
                      `}
                    />
                    
                    <span className={`text-xs font-semibold ${step.done ? 'text-slate-200' : 'text-slate-500'}`}>
                      {step.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {step.desc}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="border-t border-[var(--color-brand-border)] bg-slate-900/10 p-6 space-y-2.5">
          <button 
            onClick={() => alert(`Opening technical specifications editor for ${order.id}...`)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:text-white transition focus:outline-none"
          >
            <FiCreditCard className="h-4 w-4" />
            <span>Edit Specifications</span>
          </button>
          
          <button 
            onClick={onClose}
            className="w-full text-center py-2 text-[11px] font-medium text-slate-500 hover:text-slate-400 transition focus:outline-none"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </>
  );
};
