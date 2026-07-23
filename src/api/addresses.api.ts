import type { Address } from '../types/api.types';

/**
 * Site Addresses API Client
 */
export const addressesApi = {
  /**
   * Fetch all saved delivery site addresses for client
   */
  getAddresses: async (): Promise<Address[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Address[] }>(ENDPOINTS.ADDRESSES)).data.data;
    
    try {
      const saved = localStorage.getItem('eparrys_addresses');
      return saved ? JSON.parse(saved) : [
        { id: 'ADD-001', title: 'Ponniammanmedu Site', addressLine: '12, Gandhi Street, Ponniammanmedu', area: 'Ponniammanmedu', city: 'Chennai', pincode: '600110', landmark: 'Near Murugan Temple' },
        { id: 'ADD-002', title: 'Adyar Office', addressLine: 'Plot 45, Kasturibai Nagar, 3rd Cross', area: 'Adyar', city: 'Chennai', pincode: '600020' }
      ];
    } catch {
      return [];
    }
  },

  /**
   * Save a new construction site address
   */
  createAddress: async (addressData: Omit<Address, 'id'>): Promise<Address> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: Address }>(ENDPOINTS.ADDRESSES, addressData)).data.data;
    
    const newAddress = {
      ...addressData,
      id: `ADD-${Math.floor(100 + Math.random() * 900)}`
    };
    
    const addresses = await addressesApi.getAddresses();
    localStorage.setItem('eparrys_addresses', JSON.stringify([...addresses, newAddress]));
    return newAddress;
  },

  /**
   * Update saved site address details
   */
  updateAddress: async (id: string, updates: Partial<Address>): Promise<Address> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: Address }>(`${ENDPOINTS.ADDRESSES}/${id}`, updates)).data.data;
    
    const addresses = await addressesApi.getAddresses();
    const existing = addresses.find(a => a.id === id);
    if (!existing) {
      throw new Error(`Address ${id} not found`);
    }
    const updated = { ...existing, ...updates };
    const updatedList = addresses.map(a => a.id === id ? updated : a);
    localStorage.setItem('eparrys_addresses', JSON.stringify(updatedList));
    return updated;
  },

  /**
   * Delete specific site address record
   */
  deleteAddress: async (id: string): Promise<void> => {
    // TODO: Replace placeholder with actual backend API invocation
    // await apiClient.delete(`${ENDPOINTS.ADDRESSES}/${id}`);
    
    const addresses = await addressesApi.getAddresses();
    const filtered = addresses.filter(a => a.id !== id);
    localStorage.setItem('eparrys_addresses', JSON.stringify(filtered));
  }
};
