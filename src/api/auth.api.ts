import type { User } from '../types/api.types';

/**
 * Authentication API Client
 */
export const authApi = {
  /**
   * Log in user using email and password credentials
   */
  login: async (credentials: any): Promise<User> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: User }>(ENDPOINTS.AUTH_LOGIN, credentials)).data.data;
    
    // Simulating API response delay & logic using storage token placeholder
    localStorage.setItem('eparrys_auth_token', 'jwt-mock-token-secret-xyz-123');
    return {
      id: 'USR-MOCK-001',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'admin' : credentials.email.includes('vendor') ? 'vendor' : 'client',
      companyName: 'Apex Constructions Ltd.'
    };
  },

  /**
   * Register new supplier or builder account
   */
  register: async (userData: any): Promise<User> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.post<{ data: User }>(ENDPOINTS.AUTH_REGISTER, userData)).data.data;
    
    return {
      id: `USR-MOCK-${Math.floor(Math.random() * 1000)}`,
      name: userData.name || userData.companyName,
      email: userData.email,
      role: 'client',
      companyName: userData.companyName
    };
  },

  /**
   * Log out currently authenticated session
   */
  logout: async (): Promise<void> => {
    // TODO: Replace placeholder with actual backend API invocation
    // await apiClient.post(ENDPOINTS.AUTH_LOGOUT);
    
    localStorage.removeItem('eparrys_auth_token');
  },

  /**
   * Get user detail summary based on Active Auth Token
   */
  getMe: async (): Promise<User> => {
    // TODO: Replace placeholder with actual backend API invocation
    // return (await apiClient.get<{ data: User }>(`${ENDPOINTS.USERS}/me`)).data.data;
    
    return {
      id: 'USR-MOCK-001',
      name: 'Client User',
      email: 'builder@construct.in',
      role: 'client',
      companyName: 'Builder Group Chennai'
    };
  }
};
