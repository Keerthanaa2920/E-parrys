import { useState, useEffect } from 'react';
import { DashboardService } from '../services/DashboardService';
import type { DashboardStats } from '../types/api.types';

/**
 * useDashboard: Custom hook to aggregate core analytics performance metrics.
 */
export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await DashboardService.getMarketplaceOverview();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics metrics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchDashboardStats
  };
};
