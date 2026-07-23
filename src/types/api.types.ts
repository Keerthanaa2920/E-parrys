import type { IMarketplaceItem } from './dashboard';
import type { IMarketplaceOrder, IEnquiry } from '../services/mockDbService';

/**
 * Enterprise B2B Building Materials Marketplace Type Definitions
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vendor' | 'client';
  phone?: string;
  companyName?: string;
  token?: string;
}

export interface Product extends IMarketplaceItem {
  minQty?: number;
  unit?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  description?: string;
  imageUrl?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  categoryCount?: number;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  gstin?: string;
  status: 'active' | 'pending' | 'suspended';
  address?: string;
}

export interface Order extends IMarketplaceOrder {
  deliveryAddress?: string;
  deliveryArea?: string;
  deliveryDate?: string;
  buyerPhone?: string;
}

export interface Quotation extends IEnquiry {
  status?: 'pending' | 'responded' | 'closed';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  title: string; // e.g. "Primary Site", "Head Office"
  addressLine: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  date: string;
}

export interface DashboardStats {
  totalRevenue: number;
  orderCount: number;
  vendorCount: number;
  pendingApprovals: number;
  recentOrders: Order[];
}
