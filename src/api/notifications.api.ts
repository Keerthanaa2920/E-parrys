import type { Notification } from '../types/api.types';

/**
 * Notifications API Client
 */
export const notificationsApi = {
  /**
   * Fetch user notifications list
   */
  getNotifications: async (): Promise<Notification[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Notification[] }>(ENDPOINTS.NOTIFICATIONS)).data.data;
    
    try {
      const saved = localStorage.getItem('eparrys_notifications');
      if (saved) return JSON.parse(saved);
      
      const defaultNotifications: Notification[] = [
        { id: 'NTF-001', title: 'Order Sourced', message: 'Tata Steel TMT Rebars proposal has been dispatched from depot.', type: 'success', read: false, date: new Date().toISOString() },
        { id: 'NTF-002', title: 'New RFQ Received', message: 'A client has requested a quote for 500 bags of Birla Cement.', type: 'info', read: false, date: new Date(Date.now() - 3600000).toISOString() },
        { id: 'NTF-003', title: 'Low Stock Alert', message: 'Kajaria Floor tiles inventory counts is low in Chennai warehouse.', type: 'warning', read: true, date: new Date(Date.now() - 86400000).toISOString() }
      ];
      localStorage.setItem('eparrys_notifications', JSON.stringify(defaultNotifications));
      return defaultNotifications;
    } catch {
      return [];
    }
  },

  /**
   * Mark specific notification as read
   */
  markNotificationRead: async (id: string): Promise<Notification> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: Notification }>(`${ENDPOINTS.NOTIFICATIONS}/${id}/read`)).data.data;
    
    const notifications = await notificationsApi.getNotifications();
    const existing = notifications.find(n => n.id === id);
    if (!existing) {
      throw new Error(`Notification ${id} not found`);
    }
    const updated = { ...existing, read: true };
    const updatedList = notifications.map(n => n.id === id ? updated : n);
    localStorage.setItem('eparrys_notifications', JSON.stringify(updatedList));
    return updated;
  },

  /**
   * Mark all notifications as read
   */
  markAllNotificationsRead: async (): Promise<Notification[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: Notification[] }>(`${ENDPOINTS.NOTIFICATIONS}/read-all`)).data.data;
    
    const notifications = await notificationsApi.getNotifications();
    const updatedList = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem('eparrys_notifications', JSON.stringify(updatedList));
    return updatedList;
  }
};
