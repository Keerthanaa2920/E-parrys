import React from 'react';
import { FiLock, FiBell, FiShield, FiGlobe, FiSave } from 'react-icons/fi';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-parrys-charcoal font-serif">Portal Settings</h1>
        <p className="text-xs text-parrys-muted mt-1 font-semibold">Configure your account preferences and security.</p>
      </div>

      <div className="space-y-6">
        {/* Notifications Config */}
        <section className="rounded-custom border border-parrys-surface-dim bg-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold text-parrys-charcoal border-b border-parrys-surface-dim/60 pb-3 mb-4">
            <FiBell className="text-parrys-terracotta" /> Notification Preferences
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-semibold text-parrys-charcoal group-hover:text-parrys-terracotta transition">Email alerts for new orders</span>
              <input type="checkbox" defaultChecked className="toggle-checkbox accent-parrys-terracotta w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-semibold text-parrys-charcoal group-hover:text-parrys-terracotta transition">SMS alerts for critical stock</span>
              <input type="checkbox" defaultChecked className="toggle-checkbox accent-parrys-terracotta w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-semibold text-parrys-charcoal group-hover:text-parrys-terracotta transition">Weekly digest reports</span>
              <input type="checkbox" className="toggle-checkbox accent-parrys-terracotta w-4 h-4" />
            </label>
          </div>
        </section>

        {/* Security Config */}
        <section className="rounded-custom border border-parrys-surface-dim bg-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold text-parrys-charcoal border-b border-parrys-surface-dim/60 pb-3 mb-4">
            <FiShield className="text-parrys-terracotta" /> Security & Login
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-parrys-charcoal">Password</p>
                <p className="text-[10px] font-medium text-parrys-muted">Last changed 3 months ago</p>
              </div>
              <button className="text-xs text-parrys-terracotta font-bold border border-parrys-terracotta/30 px-3 py-1.5 rounded hover:bg-parrys-terracotta/10 transition">Change</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-parrys-charcoal">Two-Factor Authentication (2FA)</p>
                <p className="text-[10px] font-medium text-parrys-muted">Add an extra layer of security</p>
              </div>
              <button className="text-xs text-parrys-muted font-bold border border-parrys-surface-dim px-3 py-1.5 rounded hover:bg-parrys-surface-dim/20 hover:text-parrys-charcoal transition">Enable</button>
            </div>
          </div>
        </section>
        
        {/* Save/Action */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-custom bg-parrys-terracotta px-6 py-2.5 text-xs font-bold text-white hover:bg-parrys-terracotta-dark transition shadow-sm hover:shadow-md btn-transition">
            <FiSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
