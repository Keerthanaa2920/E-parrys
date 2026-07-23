import type { Order } from '../types/api.types';
import { mockDbService } from '../services/mockDbService';

/**
 * Orders API Client
 */
export const ordersApi = {
  /**
   * Fetch list of all orders / proposals
   */
  getOrders: async (): Promise<Order[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Order[] }>(ENDPOINTS.ORDERS)).data.data;
    
    // Fallback to active mock storage to keep UI interactive
    return mockDbService.getOrders() as Order[];
  },

  /**
   * Create a new order proposal from the shopping cart
   */
  createOrder: async (orderData: Omit<Order, 'id' | 'date'>): Promise<Order> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: Order }>(ENDPOINTS.ORDERS, orderData)).data.data;
    
    const newOrder: Order = {
      productId: orderData.productId,
      productName: orderData.productName,
      vendorName: orderData.vendorName,
      buyerName: orderData.buyerName,
      quantity: orderData.quantity,
      amount: orderData.amount,
      id: `EP-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      status: orderData.status || 'pending',
      deliveryAddress: orderData.deliveryAddress,
      deliveryArea: orderData.deliveryArea,
      deliveryDate: orderData.deliveryDate,
      buyerPhone: orderData.buyerPhone
    };

    const mockOrderPayload = {
      productId: newOrder.productId,
      productName: newOrder.productName,
      vendorName: newOrder.vendorName,
      buyerName: newOrder.buyerName,
      quantity: newOrder.quantity,
      amount: newOrder.amount
    };

    mockDbService.addOrder(mockOrderPayload);
    return newOrder;
  },

  /**
   * Update order shipping / dispatch status (Admin or Vendor)
   */
  updateOrderStatus: async (id: string, status: Order['status']): Promise<Order> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: Order }>(`${ENDPOINTS.ORDERS}/${id}`, { status })).data.data;
    
    const orders = mockDbService.getOrders();
    const existing = orders.find(o => o.id === id);
    if (!existing) {
      throw new Error(`Order ${id} not found`);
    }
    
    mockDbService.updateOrderStatus(id, status);
    
    return {
      ...existing,
      status
    } as Order;
  }
};
