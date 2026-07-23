import { authApi } from '../api/auth.api';
import type { User } from '../types/api.types';

/**
 * AuthService: Implements authorization and authentication business logic.
 */
export const AuthService = {
  /**
   * Log in user, run business validations, and store token locally.
   */
  async login(credentials: any): Promise<User> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password credentials are required.');
    }
    
    // Call API endpoint layer
    const user = await authApi.login(credentials);
    
    // Trigger side-effects (analytics tracking, persistent session sync, etc.)
    console.log(`AuthService: User ${user.email} successfully authenticated.`);
    return user;
  },

  /**
   * Register a new marketplace customer/supplier account.
   */
  async register(registrationData: any): Promise<User> {
    if (registrationData.password !== registrationData.confirmPassword) {
      throw new Error('Passwords do not match.');
    }
    
    const user = await authApi.register(registrationData);
    console.log(`AuthService: New account created for ${user.email}.`);
    return user;
  },

  /**
   * Perform logout cleanups.
   */
  async logout(): Promise<void> {
    await authApi.logout();
    console.log('AuthService: User session terminated.');
  },

  /**
   * Check if user is currently authenticated.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('eparrys_auth_token');
  }
};
