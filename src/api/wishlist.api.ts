import type { Product } from '../types/api.types';

/**
 * Wishlist / Saved Items API Client
 */
export const wishlistApi = {
  /**
   * Fetch current items in the user's wishlist
   */
  getWishlist: async (): Promise<Product[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Product[] }>(ENDPOINTS.WISHLIST)).data.data;
    
    try {
      const saved = localStorage.getItem('eparrys_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  /**
   * Add a product to the user's saved wishlist items list
   */
  addToWishlist: async (_productId: string): Promise<Product[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: Product[] }>(ENDPOINTS.WISHLIST, { productId: _productId })).data.data;
    
    return wishlistApi.getWishlist();
  },

  /**
   * Remove a specific product from the wishlist
   */
  removeFromWishlist: async (_productId: string): Promise<Product[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.delete<{ data: Product[] }>(`${ENDPOINTS.WISHLIST}/${_productId}`)).data.data;
    
    return wishlistApi.getWishlist();
  }
};
