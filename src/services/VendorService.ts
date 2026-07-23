import { vendorsApi } from '../api/vendors.api';
import { productsApi } from '../api/products.api';
import type { Vendor, Product } from '../types/api.types';

/**
 * VendorService: Implements vendor lifecycle and listing approvals business logic.
 */
export const VendorService = {
  /**
   * Fetch onboarding and registered suppliers
   */
  async getRegisteredVendors(): Promise<Vendor[]> {
    return await vendorsApi.getVendors();
  },

  /**
   * Approve new distributor account
   */
  async approveVendor(id: string): Promise<Vendor> {
    const vendor = await vendorsApi.updateVendorStatus(id, 'active');
    console.log(`VendorService: Vendor ${vendor.companyName} has been approved.`);
    return vendor;
  },

  /**
   * Fetch all items listed under specific vendor name
   */
  async getVendorMaterials(vendorName: string): Promise<Product[]> {
    const allProducts = await productsApi.getProducts();
    return allProducts.filter(p => p.vendorName === vendorName);
  }
};
