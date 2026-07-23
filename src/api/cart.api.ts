import type { CartItem } from '../types/api.types';

/**
 * Shopping Cart API Client
 */
export const cartApi = {
  /**
   * Fetch current items in the user's wholesale cart
   */
  getCart: async (): Promise<CartItem[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: CartItem[] }>(ENDPOINTS.CART)).data.data;
    
    try {
      const saved = localStorage.getItem('eparrys_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  /**
   * Add a product with quantity directly to the backend database cart
   */
  addToCart: async (_productId: string, _quantity: number): Promise<CartItem[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: CartItem[] }>(ENDPOINTS.CART, { productId: _productId, quantity: _quantity })).data.data;
    
    // Returning simulated updated cart items
    return cartApi.getCart();
  },

  /**
   * Remove a specific product from the cart
   */
  removeFromCart: async (_productId: string): Promise<CartItem[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.delete<{ data: CartItem[] }>(`${ENDPOINTS.CART}/${_productId}`)).data.data;
    
    return cartApi.getCart();
  },

  /**
   * Update quantity of a product in the cart
   */
  updateCartItemQuantity: async (_productId: string, _quantity: number): Promise<CartItem[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: CartItem[] }>(`${ENDPOINTS.CART}/${_productId}`, { quantity: _quantity })).data.data;
    
    return cartApi.getCart();
  }
};
