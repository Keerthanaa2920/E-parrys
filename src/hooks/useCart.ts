import { useState, useEffect } from 'react';
import { CartService } from '../services/CartService';
import type { CartItem, Product } from '../types/api.types';

/**
 * useCart: Custom hook to manage shopping cart items and procurement checkout pricing.
 * Note: The existing layout uses CartContext. This hook is prepared for raw backend migration.
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await CartService.getCartItems();
      setCartItems(items);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cart');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product, quantity: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await CartService.add(product, quantity);
      setCartItems(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to add item to cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await CartService.remove(productId);
      setCartItems(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to remove item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = CartService.calculateSubtotal(cartItems);

  return {
    cartItems,
    isLoading,
    error,
    subtotal,
    addToCart,
    removeFromCart,
    refetch: fetchCart
  };
};
