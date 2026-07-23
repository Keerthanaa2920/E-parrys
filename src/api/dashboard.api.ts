import type { DashboardStats } from '../types/api.types';
import { mockDbService } from '../services/mockDbService';

/**
 * Dashboard API Client
 */
export const dashboardApi = {
  /**
   * Fetch core dashboard metrics (Admin / Marketplace operator)
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: DashboardStats }>(ENDPOINTS.DASHBOARD)).data.data;
    
    const orders = mockDbService.getOrders();
    const products = mockDbService.getProducts();
    
    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const pendingApprovals = products.filter(p => p.status === 'pending' || p.status === 'review').length;
    
    return {
      totalRevenue,
      orderCount: orders.length,
      vendorCount: 14,
      pendingApprovals,
      recentOrders: orders.slice(0, 5) as any[]
    };
  },

  /**
   * Fetch vendor specific store performance stats
   */
  getVendorDashboardStats: async (vendorName: string): Promise<Partial<DashboardStats>> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Partial<DashboardStats> }>(`${ENDPOINTS.DASHBOARD}/vendor`, { params: { vendorName } })).data.data;
    
    const vendorOrders = mockDbService.getOrders().filter(o => o.vendorName === vendorName);
    const vendorRevenue = vendorOrders.reduce((sum, o) => sum + o.amount, 0);
    
    return {
      totalRevenue: vendorRevenue,
      orderCount: vendorOrders.length,
      recentOrders: vendorOrders.slice(0, 5) as any[]
    };
  }
};
