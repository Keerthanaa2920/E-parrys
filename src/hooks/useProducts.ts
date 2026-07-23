import { useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/ProductService';
import type { Product } from '../types/api.types';

/**
 * useProducts: Custom hook to fetch catalogue products with query filters.
 */
export const useProducts = (filters?: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ProductService.getProducts(filters);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData: Omit<Product, 'id' | 'date'>) => {
    try {
      const newProduct = await ProductService.addProduct(productData);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err: any) {
      setError(err.message || 'Failed to add product');
      throw err;
    }
  };

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    addProduct
  };
};
