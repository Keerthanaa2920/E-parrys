import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api.config';

/**
 * Custom API Error Base Class
 */
export class ApiError extends Error {
  public override message: string;
  public statusCode?: number;
  public rawError?: any;

  constructor(message: string, statusCode?: number, rawError?: any) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.rawError = rawError;
    this.name = 'ApiError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Validation Error (HTTP 400 or 422)
 */
export class ValidationError extends ApiError {
  public validationErrors?: Record<string, string[]>;

  constructor(message: string, statusCode?: number, validationErrors?: Record<string, string[]>, rawError?: any) {
    super(message, statusCode, rawError);
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Unauthorized Access Error (HTTP 401 or 403)
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string, statusCode?: number, rawError?: any) {
    super(message, statusCode, rawError);
    this.name = 'UnauthorizedError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Resource Not Found Error (HTTP 404)
 */
export class NotFoundError extends ApiError {
  constructor(message: string, statusCode?: number, rawError?: any) {
    super(message, statusCode, rawError);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Server Error (HTTP 500+)
 */
export class ServerError extends ApiError {
  constructor(message: string, statusCode?: number, rawError?: any) {
    super(message, statusCode, rawError);
    this.name = 'ServerError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Client Connection/Network Error
 */
export class NetworkError extends ApiError {
  constructor(message: string, rawError?: any) {
    super(message, undefined, rawError);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Instantiate reusable Axios Client with config parameters
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL ? `${API_CONFIG.BASE_URL}/api/${API_CONFIG.API_VERSION}` : '',
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach authentication token to header placeholders
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO: Connect this to actual backend authentication store
    const token = localStorage.getItem('eparrys_auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: any) => {
    return Promise.reject(new ApiError('Failed to initialize request', undefined, error));
  }
);

// Response Interceptor: Route error status codes to custom enterprise classes
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      // Network drops or no-response errors
      return Promise.reject(new NetworkError('Network connection issue. Please check your internet.', error));
    }

    const { status, data } = error.response;
    const responseMessage = (data as any)?.message || error.message || 'An error occurred';

    switch (status) {
      case 400:
      case 422:
        return Promise.reject(
          new ValidationError(
            responseMessage,
            status,
            (data as any)?.errors || undefined,
            error
          )
        );
      case 401:
      case 403:
        return Promise.reject(new UnauthorizedError(responseMessage, status, error));
      case 404:
        return Promise.reject(new NotFoundError(responseMessage, status, error));
      case 500:
      case 502:
      case 503:
      case 504:
        return Promise.reject(new ServerError('Internal Server Error. Please contact administrator.', status, error));
      default:
        return Promise.reject(new ApiError(responseMessage, status, error));
    }
  }
);

export default apiClient;
