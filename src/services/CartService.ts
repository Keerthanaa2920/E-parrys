import { cartApi } from '../api/cart.api';
import type { CartItem, Product } from '../types/api.types';

/**
 * CartService: Implements client-side wholesale procurement cart logic.
 */
export const CartService = {
  /**
   * Retrieve active cart items
   */
  async getCartItems(): Promise<CartItem[]> {
    return await cartApi.getCart();
  },

  /**
   * Calculates subtotal of items in cart
   */
  calculateSubtotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.product.amount * item.quantity), 0);
  },

  /**
   * Adds product with business validations (Minimum quantity requirements, stock limits)
   */
  async add(product: Product, quantity: number): Promise<CartItem[]> {
    const minQty = product.minQty || 1;
    if (quantity < minQty) {
      throw new Error(`Minimum order quantity for this item is ${minQty} ${product.unit || 'units'}.`);
    }

    await cartApi.addToCart(product.id, quantity);
    console.log(`CartService: Added ${quantity} of ${product.productName} to cart.`);
    return await cartApi.getCart();
  },

  /**
   * Remove item from cart
   */
  async remove(productId: string): Promise<CartItem[]> {
    await cartApi.removeFromCart(productId);
    return await cartApi.getCart();
  }
};
