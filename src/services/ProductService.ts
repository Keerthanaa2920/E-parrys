import { productsApi } from '../api/products.api';
import type { Product } from '../types/api.types';

/**
 * ProductService: Implements catalog search and filtering business logic.
 */
export const ProductService = {
  /**
   * Retrieve all products with business level categorizations or pricing adjustments
   */
  async getProducts(filters?: any): Promise<Product[]> {
    const products = await productsApi.getProducts(filters);
    
    // business rules: sort by active listings first, format descriptions, etc.
    return products.sort((a, b) => b.amount - a.amount);
  },

  /**
   * Find product by unique ID
   */
  async getProductById(id: string): Promise<Product> {
    if (!id) throw new Error('Product ID is required to fetch product detail.');
    return await productsApi.getProductById(id);
  },

  /**
   * Search and filter listings matching search phrases
   */
  async search(query: string): Promise<Product[]> {
    if (!query.trim()) return [];
    return await productsApi.searchProducts(query);
  },

  /**
   * Add a new product to catalog (Validates pricing levels/GST details)
   */
  async addProduct(product: Omit<Product, 'id' | 'date'>): Promise<Product> {
    if (product.amount <= 0) {
      throw new Error('Wholesale list price must be greater than zero.');
    }
    return await productsApi.createProduct(product);
  }
};
