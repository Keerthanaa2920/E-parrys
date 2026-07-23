import { useState, useEffect, useCallback } from 'react';
import { VendorService } from '../services/VendorService';
import type { Vendor, Product } from '../types/api.types';

/**
 * useVendor: Custom hook to fetch active vendor directory and materials listing catalogs.
 */
export const useVendor = (vendorName?: string) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendorData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (vendorName) {
        const products = await VendorService.getVendorMaterials(vendorName);
        setVendorProducts(products);
      } else {
        const directory = await VendorService.getRegisteredVendors();
        setVendors(directory);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch vendor directory');
    } finally {
      setIsLoading(false);
    }
  }, [vendorName]);

  useEffect(() => {
    fetchVendorData();
  }, [fetchVendorData]);

  const approve = async (id: string) => {
    try {
      const approved = await VendorService.approveVendor(id);
      setVendors(prev => prev.map(v => v.id === id ? approved : v));
      return approved;
    } catch (err: any) {
      setError(err.message || 'Failed to approve vendor');
      throw err;
    }
  };

  return {
    vendors,
    vendorProducts,
    isLoading,
    error,
    approve,
    refetch: fetchVendorData
  };
};
