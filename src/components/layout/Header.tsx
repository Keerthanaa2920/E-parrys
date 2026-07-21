import React, { useState } from 'react';
import { FiMenu, FiBell, FiChevronDown, FiSettings, FiLogOut, FiCheckCircle, FiActivity, FiRefreshCw } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onReseedData: () => void;
  onTriggerError: () => void;
  onTriggerLoading: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onReseedData,
  onTriggerError,
  onTriggerLoading
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "SH-MP-003: Critical quality audit alert for vitrified tiles", time: "5 mins ago", unread: true },
    { id: 2, text: "SH-MP-015: Product listing approved for Astral CPVC", time: "1 hour ago", unread: false },
    { id: 3, text: "System Update: Vendor price indices synced", time: "4 hours ago", unread: false }
  ];

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[var(--color-brand-border)] bg-[#070a13]/85 px-4 backdrop-blur-md md:px-6">
      {/* Left side: Hamburger & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-brand-border)] bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-all focus:outline-none lg:hidden"
          aria-label="Toggle Sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-cyan)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-brand-cyan)]"></span>
          </span>
          <span className="text-lg font-bold tracking-wider text-slate-100 uppercase hidden sm:inline-block">
            E-Parrys
          </span>
          <span className="text-sm font-bold tracking-wider text-[var(--color-brand-cyan)] uppercase sm:hidden">
            EP
          </span>
        </div>
      </div>

      {/* Center: System Status & Diagnostic Controllers */}
      <div className="hidden md:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 px-3 py-1 text-emerald-400">
          <FiCheckCircle className="h-3.5 w-3.5" />
          <span>All Nodes Online (SLA 99.9%)</span>
        </div>

        {/* Demo simulation controllers */}
        <div className="flex items-center gap-1 rounded-lg border border-[var(--color-brand-border)] bg-slate-900/30 p-1">
          <button
            onClick={onTriggerLoading}
            className="rounded px-2.5 py-1 text-[10px] font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Simulate Loading Page"
          >
            Mock Load
          </button>
          <div className="h-3 w-px bg-slate-700"></div>
          <button
            onClick={onTriggerError}
            className="rounded px-2.5 py-1 text-[10px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition"
            title="Simulate Error State"
          >
            Mock Error
          </button>
          <div className="h-3 w-px bg-slate-700"></div>
          <button
            onClick={onReseedData}
            className="flex items-center gap-1 rounded px-2.5 py-1 text-[10px] font-medium text-slate-400 hover:text-[var(--color-brand-cyan)] hover:bg-cyan-950/20 transition"
            title="Reseed Data and reset filters"
          >
            <FiRefreshCw className="h-2.5 w-2.5 animate-pulse" />
            Reset
          </button>
        </div>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileDropdown(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-brand-border)] bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-all focus:outline-none"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-rose-500"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 rounded-xl border border-[var(--color-brand-border)] bg-slate-950 p-2 shadow-2xl z-50"
              >
                <div className="border-b border-slate-800 px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Notifications
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {notifications.map((notif) => (
                    <button
                      key={notif.id}
                      className="w-full text-left rounded-lg p-2.5 hover:bg-slate-900/80 transition flex flex-col gap-1 focus:outline-none"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-xs ${notif.unread ? 'text-slate-100 font-medium' : 'text-slate-400'}`}>
                          {notif.text}
                        </span>
                        {notif.unread && (
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1"></span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{notif.time}</span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-800 pt-2 pb-1 text-center">
                  <button className="text-xs text-[var(--color-brand-cyan)] hover:underline">
                    Mark all as read
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Info & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-brand-border)] bg-slate-900/50 p-1.5 text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all focus:outline-none"
          >
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-gradient-to-tr from-[var(--color-brand-cyan)] to-[var(--color-brand-indigo)] text-xs font-bold text-white uppercase">
              AK
            </div>
            <div className="hidden flex-col text-xs md:flex pr-1">
              <span className="font-semibold text-slate-200">Arun Kumar</span>
              <span className="text-[10px] text-slate-500">Marketplace Manager</span>
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
                  <p className="text-xs text-slate-500">Logged in as</p>
                  <p className="text-xs font-semibold text-slate-200 truncate">arun.k@eparrys.com</p>
                </div>
                <div className="py-1">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-slate-900 hover:text-white transition text-left">
                    <FiActivity className="h-4 w-4 text-slate-400" />
                    <span>User Activity Log</span>
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-slate-900 hover:text-white transition text-left">
                    <FiSettings className="h-4 w-4 text-slate-400" />
                    <span>System Settings</span>
                  </button>
                </div>
                <div className="border-t border-slate-800 pt-1">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/20 transition text-left">
                    <FiLogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
