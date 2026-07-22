import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiGrid, FiUsers, FiCheckSquare, FiFolder, 
  FiPieChart, FiArrowLeft, FiMenu, 
  FiChevronDown, FiRefreshCw, FiLogOut 
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

interface AdminLayoutProps {
  onReseedData: () => void;
  onTriggerError: () => void;
  onTriggerLoading: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  onReseedData,
  onTriggerError,
  onTriggerLoading
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    { name: 'Admin Dashboard', icon: FiGrid, path: '/admin' },
    { name: 'Vendor Ledger', icon: FiUsers, path: '/admin/vendors' },
    { name: 'Product Approvals', icon: FiCheckSquare, path: '/admin/products' },
    { name: 'Category Configuration', icon: FiFolder, path: '/admin/categories' },
    { name: 'Reports & Analytics', icon: FiPieChart, path: '/admin/reports' }
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-brand-dark)]">
      {/* Mobile Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-[var(--color-brand-border)] bg-[#0b0a09] transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-[var(--color-brand-border)]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-[var(--color-brand-cyan)] to-[var(--color-brand-indigo)] font-bold text-white shadow-lg shadow-parrys-terracotta/20">
              EP
            </div>
            {sidebarOpen && (
              <span className="font-bold tracking-wider text-slate-100 uppercase truncate text-sm">
                E-Parrys <span className="text-[var(--color-brand-cyan)] text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ml-1">Admin</span>
              </span>
            )}
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all group relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-parrys-terracotta/25 to-transparent text-[var(--color-brand-cyan)] border-l-2 border-[var(--color-brand-cyan)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  }
                `}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-[var(--color-brand-cyan)]' : 'text-slate-400 group-hover:text-slate-200'}`} />
                {sidebarOpen && <span className="truncate text-left">{item.name}</span>}
              </Link>
            );
          })}
          
          <div className="h-px bg-slate-800/40 my-4" />
          
          {/* Back to main marketplace */}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:bg-white/5 hover:text-slate-100 group"
          >
            <FiArrowLeft className="h-4.5 w-4.5 text-slate-400 group-hover:text-slate-200 transition" />
            {sidebarOpen && <span>Marketplace</span>}
          </Link>
        </nav>

        {/* Admin Stats */}
        {sidebarOpen && (
          <div className="p-4 border-t border-[var(--color-brand-border)] bg-black/10">
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold mb-1">
              <span>SYSTEM LOAD HEALTH</span>
              <span className="text-[var(--color-brand-cyan)]">99.8%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-indigo)]"
                style={{ width: '99.8%' }}
              />
            </div>
          </div>
        )}
      </aside>

      {/* Main workspace container */}
      <div 
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}
        `}
      >
        {/* Header toolbar */}
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[var(--color-brand-border)] bg-[#0b0a09]/90 px-4 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-brand-border)] bg-[#12100f] text-slate-400 hover:bg-[#1a1715] hover:text-white transition focus:outline-none"
            >
              <FiMenu className="h-5 w-5" />
            </button>
            <span className="text-xs font-extrabold tracking-widest text-slate-300 uppercase hidden sm:inline-block">
              Admin Tower Center
            </span>

            {/* Diagnostic Toggles */}
            <div className="hidden lg:flex items-center gap-1 rounded-lg border border-[var(--color-brand-border)] bg-black/20 p-1">
              <button
                onClick={onTriggerLoading}
                className="rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-[#1a1715] transition"
              >
                Mock Load
              </button>
              <div className="h-2.5 w-px bg-slate-800"></div>
              <button
                onClick={onTriggerError}
                className="rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-rose-450 hover:bg-rose-950/20 transition"
              >
                Mock Error
              </button>
              <div className="h-2.5 w-px bg-slate-800"></div>
              <button
                onClick={onReseedData}
                className="flex items-center gap-1 rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-[var(--color-brand-cyan)] hover:bg-[#1a1715] transition"
              >
                <FiRefreshCw className="h-2.5 w-2.5" />
                Reset
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-450 hover:text-white hover:border-slate-500 transition"
            >
              Exit Panel
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2.5 rounded-lg border border-[var(--color-brand-border)] bg-slate-900/50 p-1.5 text-left text-slate-350 hover:bg-slate-800 transition focus:outline-none"
              >
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-gradient-to-tr from-[var(--color-brand-cyan)] to-[var(--color-brand-indigo)] text-xs font-bold text-white uppercase">
                  AD
                </div>
                <div className="hidden flex-col text-[10px] md:flex pr-1 uppercase tracking-wider font-bold">
                  <span className="text-slate-205">Arun Kumar</span>
                  <span className="text-[8px] text-slate-500">Super Admin</span>
                </div>
                <FiChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-[var(--color-brand-border)] bg-slate-950 p-2 shadow-2xl z-50 text-slate-300"
                  >
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-500">Control center portal</p>
                      <p className="text-xs font-semibold text-slate-200 truncate">admin@eparrys.com</p>
                    </div>
                    <div className="border-t border-slate-800 pt-1">
                      <button 
                        onClick={() => navigate('/')}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-450 hover:bg-rose-950/20 transition text-left"
                      >
                        <FiLogOut className="h-4 w-4" />
                        <span>Logout Panel</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic content view */}
        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
