import React from 'react';
import { FiBell, FiAlertCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';

export const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, type: 'alert', title: 'Low Stock Alert', desc: 'Birla OPC 53 Grade is running low (below 50 bags).', time: '1 hour ago' },
    { id: 2, type: 'success', title: 'Order Delivered', desc: 'Order #ORD-8822 has been marked as delivered by the customer.', time: '3 hours ago' },
    { id: 3, type: 'info', title: 'New Platform Policy', desc: 'Updated terms of service for bulk dispatch shipments.', time: '2 days ago' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <FiAlertCircle className="h-5 w-5 text-rose-500" />;
      case 'success': return <FiCheckCircle className="h-5 w-5 text-emerald-500" />;
      default: return <FiInfo className="h-5 w-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center border-b border-parrys-surface-dim/60 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-parrys-charcoal font-serif flex items-center gap-2">
            <FiBell className="text-parrys-terracotta" /> Notifications
          </h1>
          <p className="text-xs text-parrys-muted mt-1 font-semibold">Stay updated on your store's activity.</p>
        </div>
        <button className="text-xs font-bold text-parrys-muted hover:text-parrys-terracotta transition">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex gap-4 p-4 rounded-custom border border-parrys-surface-dim bg-white shadow-sm hover:shadow-md hover:border-parrys-terracotta/30 transition btn-transition">
            <div className="pt-1">{getIcon(notif.type)}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-parrys-charcoal">{notif.title}</h4>
                <span className="text-[10px] font-bold text-parrys-muted uppercase tracking-wider">{notif.time}</span>
              </div>
              <p className="text-xs font-medium text-parrys-muted mt-1">{notif.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
