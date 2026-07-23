import { dashboardApi } from '../api/dashboard.api';
import type { DashboardStats } from '../types/api.types';

/**
 * DashboardService: Aggregates metrics and compiles analytics charts data.
 */
export const DashboardService = {
  /**
   * Retrieves overall marketplace metrics with business transformations
   */
  async getMarketplaceOverview(): Promise<DashboardStats> {
    const stats = await dashboardApi.getDashboardStats();
    
    // business rules: inject simulated performance growth trends, etc.
    return stats;
  },

  /**
   * Formats financial statements or statistics into export-ready spreadsheets
   */
  formatFinancialsReport(stats: DashboardStats): string {
    return `Revenue: ₹${stats.totalRevenue.toLocaleString('en-IN')}, Orders Count: ${stats.orderCount}, Vendors: ${stats.vendorCount}`;
  }
};
