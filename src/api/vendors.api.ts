import type { Vendor } from '../types/api.types';

/**
 * Vendors API Client
 */
export const vendorsApi = {
  /**
   * Get list of all registered vendor profiles
   */
  getVendors: async (): Promise<Vendor[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Vendor[] }>(ENDPOINTS.VENDORS)).data.data;
    
    return [
      { id: 'VND-MOCK-001', name: 'Birla Cement Hub', email: 'sales@birlacementhub.com', phone: '+91 94440 12345', companyName: 'Birla Cement Hub', status: 'active', gstin: '33AAAAA1111A1Z1' },
      { id: 'VND-MOCK-002', name: 'Tata Steel Distributors', email: 'orders@tatasteeldist.com', phone: '+91 94440 54321', companyName: 'Tata Steel Distributors', status: 'active', gstin: '33BBBBB2222B2Z2' },
      { id: 'VND-MOCK-003', name: 'Kajaria Tile Gallery', email: 'inquiry@tilegallery.com', phone: '+91 98840 99999', companyName: 'Kajaria Tile Gallery', status: 'pending', gstin: '33CCCCC3333C3Z3' }
    ];
  },

  /**
   * Approve or suspend vendor account (Admin portal control tower)
   */
  updateVendorStatus: async (id: string, status: 'active' | 'suspended'): Promise<Vendor> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: Vendor }>(`${ENDPOINTS.VENDORS}/${id}/status`, { status })).data.data;
    
    return {
      id,
      name: 'Kajaria Tile Gallery',
      email: 'inquiry@tilegallery.com',
      phone: '+91 98840 99999',
      companyName: 'Kajaria Tile Gallery',
      gstin: '33CCCCC3333C3Z3',
      status: status
    };
  }
};
