import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiGrid, FiShoppingBag, FiPackage, FiList, 
  FiUser, FiArrowLeft, FiMenu, FiBell, 
  FiChevronDown, FiLogOut, FiSettings,
  FiTag, FiMessageSquare, FiPieChart
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
    { name: 'Categories', icon: FiTag, path: '/vendor/categories' },
    { name: 'Stock Inventory', icon: FiPackage, path: '/vendor/inventory' },
    { name: 'Customer Orders', icon: FiList, path: '/vendor/orders' },
    { name: 'Enquiries', icon: FiMessageSquare, path: '/vendor/enquiries' },
    { name: 'Reports', icon: FiPieChart, path: '/vendor/reports' },
    { name: 'Supplier Profile', icon: FiUser, path: '/vendor/profile' },
    { name: 'Notifications', icon: FiBell, path: '/vendor/notifications' },
    { name: 'Settings', icon: FiSettings, path: '/vendor/settings' }
  ];

  return (
    <div className="flex min-h-screen bg-parrys-cream">
      {/* Mobile Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-parrys-charcoal/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-parrys-surface-dim bg-white transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-parrys-surface-dim bg-white">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-custom bg-parrys-terracotta font-bold text-white shadow-md shadow-parrys-terracotta/10">
              EP
            </div>
            {sidebarOpen && (
              <span className="font-semibold tracking-wider text-parrys-charcoal font-serif uppercase truncate">
                E-Parrys <span className="text-parrys-terracotta text-xs font-sans">Seller</span>
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
                className={`flex items-center gap-3 rounded-custom px-3 py-2.5 text-sm font-semibold transition-all group relative btn-transition
                  ${isActive 
                    ? 'bg-parrys-surface-dim/20 text-parrys-terracotta border-l-2 border-parrys-terracotta' 
                    : 'text-parrys-muted hover:bg-parrys-surface-dim/10 hover:text-parrys-charcoal'
                  }
                `}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-parrys-terracotta' : 'text-parrys-muted group-hover:text-parrys-charcoal'}`} />
                {sidebarOpen && <span className="truncate text-left">{item.name}</span>}
              </Link>
            );
          })}
          
          <div className="h-px bg-parrys-surface-dim/50 my-4" />
          
          {/* Back to main marketplace */}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-custom px-3 py-2.5 text-sm font-semibold text-parrys-muted hover:bg-parrys-surface-dim/10 hover:text-parrys-charcoal group btn-transition"
          >
            <FiArrowLeft className="h-4.5 w-4.5 text-parrys-muted group-hover:text-parrys-charcoal transition" />
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
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-parrys-surface-dim bg-parrys-cream/90 px-4 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-custom border border-parrys-surface-dim bg-white text-parrys-muted hover:bg-parrys-surface-dim/20 focus:outline-none btn-transition"
            >
              <FiMenu className="h-5 w-5" />
            </button>
            <span className="text-sm font-bold tracking-wider text-parrys-charcoal font-serif uppercase hidden sm:inline-block">
              Vendor Console Tower
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="rounded-custom border border-parrys-surface-dim bg-white px-3 py-1.5 text-xs font-semibold text-parrys-muted hover:text-parrys-terracotta hover:border-parrys-surface-dim transition"
            >
              Exit Console
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 rounded-custom border border-parrys-surface-dim bg-white p-1.5 text-left text-parrys-charcoal hover:bg-parrys-surface-dim/10 transition focus:outline-none btn-transition"
              >
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded bg-parrys-terracotta text-xs font-bold text-white uppercase">
                  VD
                </div>
                <div className="hidden flex-col text-xs md:flex pr-1">
                  <span className="font-semibold text-parrys-charcoal">Birla Cement Depot</span>
                  <span className="text-[10px] text-parrys-muted">Premium Supplier</span>
                </div>
                <FiChevronDown className="h-4 w-4 text-parrys-muted hidden md:block" />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-custom border border-parrys-surface-dim bg-white p-2 shadow-xl shadow-parrys-charcoal/5 z-50 text-parrys-charcoal"
                  >
                    <div className="px-3 py-2 border-b border-parrys-surface-dim/50">
                      <p className="text-xs text-parrys-muted font-semibold">Supplier portal</p>
                      <p className="text-xs font-bold text-parrys-charcoal truncate">wholesale@birlacement.com</p>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={() => navigate('/vendor/profile')}
                        className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs font-semibold hover:bg-parrys-surface-dim/20 hover:text-parrys-terracotta transition text-left"
                      >
                        <FiSettings className="h-4 w-4" />
                        <span>Store Settings</span>
                      </button>
                    </div>
                    <div className="border-t border-parrys-surface-dim/50 pt-1">
                      <button 
                        onClick={() => navigate('/')}
                        className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition text-left"
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
