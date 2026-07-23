import type { User } from '../types/api.types';

/**
 * Users API Client
 */
export const usersApi = {
  /**
   * Get all registered users list (Admin only)
   */
  getUsers: async (): Promise<User[]> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: User[] }>(ENDPOINTS.USERS)).data.data;
    
    return [
      { id: 'USR-MOCK-001', name: 'Arun Kumar', email: 'arun@shanconstructions.com', role: 'client', companyName: 'SHAN Constructions' },
      { id: 'USR-MOCK-002', name: 'Tata Steel Rep', email: 'procure@tatasteel.com', role: 'vendor', companyName: 'Tata Steel Distributors' },
      { id: 'USR-MOCK-003', name: 'Admin Control', email: 'admin@eparrys.com', role: 'admin' },
    ];
  },

  /**
   * Get specific user detail profile
   */
  getUserById: async (id: string): Promise<User> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: User }>(`${ENDPOINTS.USERS}/${id}`)).data.data;
    
    return {
      id,
      name: 'Arun Kumar',
      email: 'arun@shanconstructions.com',
      role: 'client',
      companyName: 'SHAN Constructions',
      phone: '+91 91762 64711'
    };
  },

  /**
   * Update active user profile
   */
  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.patch<{ data: User }>(`${ENDPOINTS.USERS}/${id}`, updates)).data.data;
    
    return {
      id,
      name: updates.name || 'Arun Kumar',
      email: updates.email || 'arun@shanconstructions.com',
      role: updates.role || 'client',
      companyName: updates.companyName || 'SHAN Constructions',
      phone: updates.phone || '+91 91762 64711'
    };
  },

  /**
   * Delete specific user record (Admin only)
   */
  deleteUser: async (_id: string): Promise<void> => {
    // TODO: Replace placeholder with actual backend API invocation
    // await apiClient.delete(`${ENDPOINTS.USERS}/${_id}`);
  }
};
