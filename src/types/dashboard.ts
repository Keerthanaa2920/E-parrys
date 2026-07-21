export interface IMarketplaceItem {
  id: string;
  productName: string;
  vendorName: string;
  date: string;
  status: 'approved' | 'pending' | 'review' | 'cancelled';
  amount: number; // Listing price / value (₹)
  priority: 'low' | 'medium' | 'high' | 'critical'; // Approval priority
  category: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  sku: string;
  warehouse: string;
  quantity: number; // Stock count
  specGrade: string; // e.g. "Fe 550D TMT", "OPC 53 Grade"
}

export interface IFilterState {
  search: string;
  status: string;
  priority: string;
  category: string;
  stockStatus: string;
  minAmount: number | null;
  maxAmount: number | null;
  sortBy: keyof IMarketplaceItem;
  sortOrder: 'asc' | 'desc';
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface IMetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  subtext: string;
  trendData: number[];
}
