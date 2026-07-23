/**
 * Centralized API endpoint path constants.
 * These correspond to routes on the backend API server.
 */
export const ENDPOINTS = {
  // Authentication
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',

  // Products
  PRODUCTS: '/products',
  PRODUCT_DETAILS: (id: string) => `/products/${id}`,
  PRODUCT_SEARCH: '/products/search',

  // Categories
  CATEGORIES: '/categories',

  // Brands
  BRANDS: '/brands',

  // Vendors
  VENDORS: '/vendors',

  // Cart
  CART: '/cart',

  // Wishlist
  WISHLIST: '/wishlist',

  // Quotations / RFQs
  QUOTATIONS: '/quotations',

  // Orders
  ORDERS: '/orders',

  // User Profile & Sites
  USERS: '/users',
  ADDRESSES: '/addresses',

  // Notifications
  NOTIFICATIONS: '/notifications',

  // Dashboard Metrics
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
};
