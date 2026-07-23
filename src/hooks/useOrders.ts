import { useState, useEffect } from 'react';
import { ordersApi } from '../api/orders.api';
import type { Order } from '../types/api.types';

/**
 * useOrders: Custom hook to fetch procurement proposals and active orders.
 */
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await ordersApi.getOrders();
      setOrders(items);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const createOrder = async (orderData: Omit<Order, 'id' | 'date'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const newOrder = await ordersApi.createOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err: any) {
      setError(err.message || 'Failed to submit order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Order['status']) => {
    try {
      const updated = await ordersApi.updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? updated : o));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update order status');
      throw err;
    }
  };

  return {
    orders,
    isLoading,
    error,
    createOrder,
    updateStatus,
    refetch: fetchOrders
  };
};
