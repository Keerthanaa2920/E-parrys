import type { Category } from '../types/api.types';
import { CATEGORIES } from '../data/dummyData';

/**
 * Categories API Client
 */
export const categoriesApi = {
  /**
   * Get all registered product categories
   */
  getCategories: async (): Promise<Category[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Category[] }>(ENDPOINTS.CATEGORIES)).data.data;
    
    return CATEGORIES.map((cat, idx) => ({
      id: `CAT-MOCK-00${idx + 1}`,
      name: cat,
      slug: cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
      itemCount: 15 + idx * 4,
      description: `Wholesale procurement directory for ${cat} materials in Chennai.`
    }));
  },

  /**
   * Create new marketplace product category (Admin only)
   */
  createCategory: async (categoryData: Omit<Category, 'id' | 'itemCount'>): Promise<Category> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: Category }>(ENDPOINTS.CATEGORIES, categoryData)).data.data;
    
    return {
      ...categoryData,
      id: `CAT-MOCK-${Math.floor(Math.random() * 1000)}`,
      itemCount: 0
    };
  },

  /**
   * Delete specific category registry
   */
  deleteCategory: async (_id: string): Promise<void> => {
    // TODO: Replace placeholder with actual backend API invocation
    // await apiClient.delete(`${ENDPOINTS.CATEGORIES}/${_id}`);
  }
};
