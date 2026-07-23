import type { Product } from '../types/api.types';
import { mockDbService } from '../services/mockDbService';

/**
 * Products API Client
 */
export const productsApi = {
  /**
   * Get list of all approved products
   */
  getProducts: async (_filters?: any): Promise<Product[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Product[] }>(ENDPOINTS.PRODUCTS, { params: _filters })).data.data;
    
    // Fallback to active mock storage to keep UI interactive
    return mockDbService.getProducts() as Product[];
  },

  /**
   * Get single product detail specification
   */
  getProductById: async (id: string): Promise<Product> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Product }>(ENDPOINTS.PRODUCT_DETAILS(id))).data.data;
    
    const prd = mockDbService.getProducts().find(p => p.id === id);
    if (!prd) {
      throw new Error(`Product ${id} not found`);
    }
    return prd as Product;
  },

  /**
   * Search for products matching custom query terms
   */
  searchProducts: async (query: string): Promise<Product[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Product[] }>(ENDPOINTS.PRODUCT_SEARCH, { params: { q: query } })).data.data;
    
    const q = query.toLowerCase();
    return mockDbService.getProducts().filter(p => 
      p.productName.toLowerCase().includes(q) ||
      p.vendorName.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    ) as Product[];
  },

  /**
   * Create new product listing (Vendor/Supplier portal)
   */
  createProduct: async (productData: Omit<Product, 'id' | 'date'>): Promise<Product> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: Product }>(ENDPOINTS.PRODUCTS, productData)).data.data;
    
    const newPrd = {
      ...productData,
      id: `SH-MP-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0]
    } as Product;
    mockDbService.addProduct(newPrd);
    return newPrd;
  },

  /**
   * Update existing product properties
   */
  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: Product }>(`${ENDPOINTS.PRODUCTS}/${id}`, updates)).data.data;
    
    const prdList = mockDbService.getProducts();
    const existing = prdList.find(p => p.id === id);
    if (!existing) {
      throw new Error(`Product ${id} not found`);
    }
    const updated = { ...existing, ...updates } as Product;
    mockDbService.updateProduct(updated);
    return updated;
  },

  /**
   * Delete specific product listing
   */
  deleteProduct: async (id: string): Promise<void> => {
    // TODO: Replace placeholder with actual backend API invocation
    // await apiClient.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
    
    const prdList = mockDbService.getProducts().filter(p => p.id !== id);
    mockDbService.saveProducts(prdList);
  }
};
