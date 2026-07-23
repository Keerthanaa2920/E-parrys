import type { Brand } from '../types/api.types';

/**
 * Brands API Client
 */
export const brandsApi = {
  /**
   * Get all partner manufacturers / brands
   */
  getBrands: async (): Promise<Brand[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Brand[] }>(ENDPOINTS.BRANDS)).data.data;
    
    return [
      { id: 'BR-001', name: 'Birla Cement', slug: 'birla-cement', categoryCount: 3, description: 'Premium Portland Pozzolana and OPC cement lines.' },
      { id: 'BR-002', name: 'Tata Steel', slug: 'tata-steel', categoryCount: 2, description: 'Fe 550D TMT reinforcement steel bars.' },
      { id: 'BR-003', name: 'Kajaria Tiles', slug: 'kajaria-tiles', categoryCount: 4, description: 'Premium vitrified flooring and digital glazed ceramics.' },
      { id: 'BR-004', name: 'Finolex Cables', slug: 'finolex-cables', categoryCount: 2, description: 'Heavy duty copper wiring coils and conduits.' },
      { id: 'BR-005', name: 'Asian Paints', slug: 'asian-paints', categoryCount: 5, description: 'Premium interior and exterior wall emulsions.' }
    ];
  }
};
