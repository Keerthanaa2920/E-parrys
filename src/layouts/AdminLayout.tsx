import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiUsers, FiCheckSquare, FiFolder,
  FiPieChart, FiArrowLeft, FiMenu, FiBox,
  FiChevronDown, FiRefreshCw, FiLogOut, FiUserCheck
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

  const [adminName, setAdminName] = useState('Arun Kumar');
  const [adminEmail, setAdminEmail] = useState('admin@eparrys.com');

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth');
    if (!isAuth) {
      navigate('/admin-login');
    } else {
      const storedName = localStorage.getItem('admin_name');
      const storedEmail = localStorage.getItem('admin_email');
      if (storedName) setAdminName(storedName);
      if (storedEmail) setAdminEmail(storedEmail);
    }
  }, [navigate]);

  const adminInitials = adminName.substring(0, 2).toUpperCase();

  const menuItems = [
    { name: 'Admin Dashboard', icon: FiGrid, path: '/admin' },
    { name: 'Vendor Onboarding', icon: FiUserCheck, path: '/admin/vendor-onboarding' },
    { name: 'Vendor Ledger', icon: FiUsers, path: '/admin/vendors' },
    { name: 'Product Approvals', icon: FiCheckSquare, path: '/admin/products' },
    { name: 'Global Inventory', icon: FiBox, path: '/admin/inventory' },
    { name: 'Category Configuration', icon: FiFolder, path: '/admin/categories' },
    { name: 'Reports & Analytics', icon: FiPieChart, path: '/admin/reports' }
  ];

  return (
    <div className="flex min-h-screen bg-orange-50/30">
      {/* Mobile Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-orange-100 bg-white transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-orange-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 font-bold text-white shadow-lg shadow-orange-500/20">
              EP
            </div>
            {sidebarOpen && (
              <span className="font-bold tracking-wider text-gray-900 uppercase truncate text-sm">
                E-Parrys <span className="text-orange-500 text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-orange-50 border border-orange-100 ml-1">Admin</span>
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
                    ? 'bg-orange-50 text-orange-600 border-l-2 border-orange-500'
                    : 'text-gray-500 hover:bg-orange-50/50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                {sidebarOpen && <span className="truncate text-left">{item.name}</span>}
              </Link>
            );
          })}

          <div className="h-px bg-orange-100 my-4" />

          {/* Back to main marketplace */}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-orange-50/50 hover:text-gray-900 group"
          >
            <FiArrowLeft className="h-4.5 w-4.5 text-gray-400 group-hover:text-gray-600 transition" />
            {sidebarOpen && <span>Marketplace</span>}
          </Link>
        </nav>

        {/* Admin Stats */}
        {sidebarOpen && (
          <div className="p-4 border-t border-orange-100 bg-orange-50/50">
            <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold mb-1">
              <span>SYSTEM LOAD HEALTH</span>
              <span className="text-orange-500">99.8%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-orange-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
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
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-orange-100 bg-white/90 px-4 backdrop-blur-md md:px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-100 bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition focus:outline-none"
            >
              <FiMenu className="h-5 w-5" />
            </button>
            <span className="text-xs font-extrabold tracking-widest text-gray-700 uppercase hidden sm:inline-block">
              Admin Tower Center
            </span>

            {/* Diagnostic Toggles */}
            <div className="hidden lg:flex items-center gap-1 rounded-lg border border-orange-100 bg-orange-50/50 p-1">
              <button
                onClick={onTriggerLoading}
                className="rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-500 hover:text-orange-600 hover:bg-orange-100 transition"
              >
                Mock Load
              </button>
              <div className="h-2.5 w-px bg-orange-200"></div>
              <button
                onClick={onTriggerError}
                className="rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
              >
                Mock Error
              </button>
              <div className="h-2.5 w-px bg-orange-200"></div>
              <button
                onClick={onReseedData}
                className="flex items-center gap-1 rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-500 hover:text-orange-600 hover:bg-orange-100 transition"
              >
                <FiRefreshCw className="h-2.5 w-2.5" />
                Reset
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg border border-orange-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-orange-600 hover:border-orange-300 transition shadow-sm"
            >
              Exit Panel
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2.5 rounded-lg border border-orange-200 bg-white p-1.5 text-left text-gray-700 hover:bg-orange-50 transition focus:outline-none shadow-sm"
              >
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-gradient-to-tr from-orange-400 to-orange-600 text-xs font-bold text-white uppercase">
                  {adminInitials}
                </div>
                <div className="hidden flex-col text-[10px] md:flex pr-1 uppercase tracking-wider font-bold">
                  <span className="text-gray-900">{adminName}</span>
                  <span className="text-[8px] text-gray-500">Super Admin</span>
                </div>
                <FiChevronDown className="h-4 w-4 text-gray-400 hidden md:block" />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-orange-100 bg-white p-2 shadow-xl z-50 text-gray-800"
                  >
                    <div className="px-3 py-2 border-b border-orange-50">
                      <p className="text-xs text-gray-500">Control center portal</p>
                      <p className="text-xs font-semibold text-gray-900 truncate">{adminEmail}</p>
                    </div>
                    <div className="border-t border-orange-50 pt-1 mt-1">
                      <button
                        onClick={() => {
                          localStorage.removeItem('admin_auth');
                          localStorage.removeItem('admin_name');
                          localStorage.removeItem('admin_email');
                          navigate('/admin-login');
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition text-left font-semibold"
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
