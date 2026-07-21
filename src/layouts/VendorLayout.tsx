import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiGrid, FiShoppingBag, FiPackage, FiList, 
  FiUser, FiArrowLeft, FiMenu, FiBell, 
  FiChevronDown, FiLogOut, FiSettings, FiRefreshCw 
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const VendorLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    { name: 'Vendor Dashboard', icon: FiGrid, path: '/vendor' },
    { name: 'My Products', icon: FiShoppingBag, path: '/vendor/products' },
    { name: 'Stock Inventory', icon: FiPackage, path: '/vendor/inventory' },
    { name: 'Customer Orders', icon: FiList, path: '/vendor/orders' },
    { name: 'Supplier Profile', icon: FiUser, path: '/vendor/profile' }
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
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-[var(--color-brand-border)] bg-[#070a13] transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-[var(--color-brand-border)]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-[var(--color-brand-indigo)] font-bold text-white shadow-lg shadow-emerald-500/10">
              EP
            </div>
            {sidebarOpen && (
              <span className="font-semibold tracking-wider text-slate-100 uppercase truncate">
                E-Parrys <span className="text-emerald-400 text-xs">Seller</span>
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900/50 text-emerald-400 border-l-2 border-emerald-500' 
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-100'
                  }
                `}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                {sidebarOpen && <span className="truncate text-left">{item.name}</span>}
              </Link>
            );
          })}
          
          <div className="h-px bg-slate-800 my-4" />
          
          {/* Back to main marketplace */}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-900/40 hover:text-slate-100 group"
          >
            <FiArrowLeft className="h-4.5 w-4.5 text-slate-400 group-hover:text-slate-250 transition" />
            {sidebarOpen && <span>Marketplace</span>}
          </Link>
        </nav>
      </aside>

      {/* Main workspace container */}
      <div 
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}
        `}
      >
        {/* Header toolbar */}
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[var(--color-brand-border)] bg-[#070a13]/85 px-4 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-brand-border)] bg-slate-900/50 text-slate-350 hover:bg-slate-800 focus:outline-none"
            >
              <FiMenu className="h-5 w-5" />
            </button>
            <span className="text-sm font-bold tracking-wider text-slate-200 uppercase hidden sm:inline-block">
              Vendor Console Tower
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:border-slate-500 transition"
            >
              Exit Console
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-brand-border)] bg-slate-900/50 p-1.5 text-left text-slate-355 hover:bg-slate-800 transition focus:outline-none"
              >
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-gradient-to-tr from-emerald-500 to-[var(--color-brand-indigo)] text-xs font-bold text-white uppercase">
                  VD
                </div>
                <div className="hidden flex-col text-xs md:flex pr-1">
                  <span className="font-semibold text-slate-200">Birla Cement Depot</span>
                  <span className="text-[10px] text-slate-500">Premium Supplier</span>
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
                      <p className="text-xs text-slate-500">Supplier portal</p>
                      <p className="text-xs font-semibold text-slate-200 truncate">wholesale@birlacement.com</p>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={() => navigate('/vendor/profile')}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-slate-900 hover:text-white transition text-left"
                      >
                        <FiSettings className="h-4 w-4 text-slate-400" />
                        <span>Store Settings</span>
                      </button>
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
