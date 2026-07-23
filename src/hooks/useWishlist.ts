import { useState, useEffect } from 'react';
import { wishlistApi } from '../api/wishlist.api';
import type { Product } from '../types/api.types';

/**
 * useWishlist: Custom hook to manage saved materials wishlist.
 */
export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await wishlistApi.getWishlist();
      setWishlist(items);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await wishlistApi.addToWishlist(productId);
      setWishlist(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to save item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await wishlistApi.removeFromWishlist(productId);
      setWishlist(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to remove item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    wishlist,
    isLoading,
    error,
    addToWishlist,
    removeFromWishlist,
    refetch: fetchWishlist
  };
};
