import { useState, useEffect } from 'react';
import { quotationsApi } from '../api/quotations.api';
import type { Quotation } from '../types/api.types';

/**
 * useQuotations: Custom hook to manage client and supplier RFQs/enquiries.
 */
export const useQuotations = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await quotationsApi.getQuotations();
      setQuotations(items);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch quotations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const createQuotation = async (quotationData: Omit<Quotation, 'id' | 'date'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const newRFQ = await quotationsApi.createQuotation(quotationData);
      setQuotations(prev => [newRFQ, ...prev]);
      return newRFQ;
    } catch (err: any) {
      setError(err.message || 'Failed to submit quote request');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    quotations,
    isLoading,
    error,
    createQuotation,
    refetch: fetchQuotations
  };
};
