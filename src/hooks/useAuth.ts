import { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import { authApi } from '../api/auth.api';
import type { User } from '../types/api.types';

/**
 * useAuth: Custom hook to manage user auth state and login/logout handlers.
 */
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      setIsLoading(true);
      authApi.getMe()
        .then(user => setCurrentUser(user))
        .catch(err => setError(err.message || 'Failed to authenticate'))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const login = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await AuthService.login(credentials);
      setCurrentUser(user);
      return user;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await AuthService.register(userData);
      setCurrentUser(user);
      return user;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setCurrentUser(null);
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    error,
    login,
    register,
    logout
  };
};
