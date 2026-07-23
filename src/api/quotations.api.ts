import type { Quotation } from '../types/api.types';
import { mockDbService } from '../services/mockDbService';

/**
 * Quotations / Wholesale Request For Quotations (RFQ) API Client
 */
export const quotationsApi = {
  /**
   * Fetch list of all quotations / RFQs
   */
  getQuotations: async (): Promise<Quotation[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: Quotation[] }>(ENDPOINTS.QUOTATIONS)).data.data;
    
    // Fallback to active mock storage to keep UI interactive
    return mockDbService.getEnquiries().map(enq => ({
      ...enq,
      status: 'pending'
    })) as Quotation[];
  },

  /**
   * Create a new wholesale materials quote request
   */
  createQuotation: async (quotationData: Omit<Quotation, 'id' | 'date'>): Promise<Quotation> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: Quotation }>(ENDPOINTS.QUOTATIONS, quotationData)).data.data;
    
    const newRFQ: Quotation = {
      productId: quotationData.productId,
      productName: quotationData.productName,
      vendorName: quotationData.vendorName,
      senderName: quotationData.senderName,
      senderEmail: quotationData.senderEmail,
      quantity: quotationData.quantity,
      message: quotationData.message,
      id: `RFQ-MOCK-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    const mockEnquiry = {
      productId: newRFQ.productId,
      productName: newRFQ.productName,
      vendorName: newRFQ.vendorName,
      senderName: newRFQ.senderName,
      senderEmail: newRFQ.senderEmail,
      quantity: newRFQ.quantity,
      message: newRFQ.message
    };

    mockDbService.addEnquiry(mockEnquiry);
    return newRFQ;
  },

  /**
   * Update quotation status (e.g. responded, closed)
   */
  updateQuotationStatus: async (id: string, status: 'pending' | 'responded' | 'closed'): Promise<Quotation> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: Quotation }>(`${ENDPOINTS.QUOTATIONS}/${id}`, { status })).data.data;
    
    const matched = mockDbService.getEnquiries().find(e => e.id === id);
    if (!matched) {
      throw new Error(`Quotation RFQ ${id} not found`);
    }
    return {
      ...matched,
      status
    } as Quotation;
  }
};
