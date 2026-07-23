import React, { useState, useMemo, useEffect } from 'react';
import type { IMarketplaceItem, IFilterState, IPagination } from '../../types/dashboard';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { SearchInput } from '../../components/common/SearchInput';
import { Filters } from '../../components/common/Filters';
import { Pagination } from '../../components/common/Pagination';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';
import { MetricsGrid } from '../../components/dashboard/MetricsGrid';
import { DataTable } from '../../components/dashboard/DataTable';
import { DetailModal } from '../../components/dashboard/DetailModal';
import { FiPlus, FiRefreshCw, FiDownloadCloud, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { mockDbService } from '../../services/mockDbService';

interface ProductsProps {
  viewState: 'data' | 'loading' | 'error';
  setViewState: (state: 'data' | 'loading' | 'error') => void;
}

const DEFAULT_FILTERS: IFilterState = {
  search: '',
  status: 'All Statuses',
  priority: 'All Priorities',
  category: 'All Categories',
  stockStatus: 'All Stock States',
  minAmount: null,
  maxAmount: null,
  sortBy: 'date',
  sortOrder: 'desc'
};

export const Products: React.FC<ProductsProps> = ({
  viewState,
  setViewState
}) => {
  const [ordersList, setOrdersList] = useState<IMarketplaceItem[]>(() => mockDbService.getProducts());
  const [filters, setFilters] = useState<IFilterState>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [activeDetailOrder, setActiveDetailOrder] = useState<IMarketplaceItem | null>(null);
  const [syncSpinner, setSyncSpinner] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with DB service on mount & database resets
  const refreshFromDb = () => {
    setOrdersList(mockDbService.getProducts());
  };

  useEffect(() => {
    refreshFromDb();
  }, [viewState]);

  // Trigger temporary toasts
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, pageSize]);

  // Handle reload simulation
  const handleReload = () => {
    setSyncSpinner(true);
    setViewState('loading');
    setTimeout(() => {
      refreshFromDb();
      setViewState('data');
      setSyncSpinner(false);
      triggerToast("Catalogue approvals list updated.");
    }, 800);
  };

  // Perform filtering and sorting of marketplace items
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...ordersList];

    // 1. Text Search Filter
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter(o => 
        o.id.toLowerCase().includes(query) ||
        o.productName.toLowerCase().includes(query) ||
        o.vendorName.toLowerCase().includes(query) ||
        o.sku.toLowerCase().includes(query)
      );
    }

    // 2. Dropdown Filter: Category
    if (filters.category !== 'All Categories') {
      result = result.filter(o => o.category === filters.category);
    }

    // 3. Dropdown Filter: Status
    if (filters.status !== 'All Statuses') {
      result = result.filter(o => o.status === filters.status);
    }

    // 4. Dropdown Filter: Priority
    if (filters.priority !== 'All Priorities') {
      result = result.filter(o => o.priority === filters.priority);
    }

    // 5. Dropdown Filter: Stock Status
    if (filters.stockStatus !== 'All Stock States') {
      result = result.filter(o => o.stockStatus === filters.stockStatus);
    }

    // 6. Pricing boundary limits
    if (filters.minAmount !== null) {
      result = result.filter(o => o.amount >= (filters.minAmount as number));
    }
    if (filters.maxAmount !== null) {
      result = result.filter(o => o.amount <= (filters.maxAmount as number));
    }

    // 7. Dynamic Sorting
    result.sort((a, b) => {
      let fieldA = a[filters.sortBy];
      let fieldB = b[filters.sortBy];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return filters.sortOrder === 'asc' 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return filters.sortOrder === 'asc' 
          ? fieldA - fieldB 
          : fieldB - fieldA;
      }

      return 0;
    });

    return result;
  }, [ordersList, filters]);

  // Compute stats metrics dynamically from active filters
  const computedMetrics = useMemo(() => {
    const totalVolume = filteredAndSortedOrders.reduce((sum, o) => sum + o.quantity, 0);
    const totalRevenue = filteredAndSortedOrders.reduce((sum, o) => sum + o.amount, 0);
    
    const inStockOrders = filteredAndSortedOrders.filter(o => o.stockStatus === 'in-stock').length;
    const stockPercentage = filteredAndSortedOrders.length > 0 
      ? (inStockOrders / filteredAndSortedOrders.length) * 100 
      : 0;
    
    const incidentCount = filteredAndSortedOrders.filter(o => o.stockStatus === 'out-of-stock' || o.priority === 'critical').length;
    
    return [
      {
        title: "Marketplace Material Vol.",
        value: `${totalVolume.toLocaleString('en-IN')} Units`,
        change: 14.8,
        changeType: "increase" as const,
        icon: "FiBox",
        subtext: `Matched: ${filteredAndSortedOrders.length} listings`,
        trendData: [45, 52, 49, 62, 58, 65, Math.min(85, Math.max(10, totalVolume / 150))]
      },
      {
        title: "In-Stock Ratio",
        value: `${stockPercentage.toFixed(1)}%`,
        change: 1.2,
        changeType: "increase" as const,
        icon: "FiCheckCircle",
        subtext: `Target threshold: 95%`,
        trendData: [90.5, 91.2, 91.0, 91.8, 92.0, 92.1, Math.max(10, stockPercentage)]
      },
      {
        title: "Total Listings Value",
        value: `₹${(totalRevenue / 100000).toFixed(2)} Lakh`,
        change: -4.3,
        changeType: "decrease" as const,
        icon: "FiCreditCard",
        subtext: `Sum price of listings`,
        trendData: [110, 108, 105, 101, 98, 100, Math.min(120, Math.max(5, totalRevenue / 12000))]
      },
      {
        title: "Unresolved Material Audits",
        value: `${incidentCount} Listings`,
        change: 0,
        changeType: "neutral" as const,
        icon: "FiAlertTriangle",
        subtext: `Out of stock or critical reviews`,
        trendData: [4, 6, 5, 5, 7, 5, Math.max(1, incidentCount)]
      }
    ];
  }, [filteredAndSortedOrders]);

  // Paginated subset of orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedOrders, currentPage, pageSize]);

  // Pagination config stats
  const pagination: IPagination = {
    currentPage,
    pageSize,
    totalItems: filteredAndSortedOrders.length,
    totalPages: Math.ceil(filteredAndSortedOrders.length / pageSize)
  };

  // Sort callback
  const handleSort = (column: keyof IMarketplaceItem) => {
    setFilters(prev => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Reset filters callback
  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    triggerToast("Catalogue filters cleared.");
  };

  // Create new listing modal simulation
  const handleCreateOrder = () => {
    const newId = `EP-MP-${(ordersList.length + 1).toString().padStart(3, '0')}`;
    const newOrder: IMarketplaceItem = {
      id: newId,
      productName: "Tata Tiscon MS Wire Rods",
      vendorName: "Tata Steel Distributors",
      date: new Date().toISOString().split('T')[0],
      status: "pending",
      amount: 49800.00,
      priority: "high",
      category: "Steel & Reinforcement",
      stockStatus: "in-stock",
      sku: `SKU-${Math.floor(1000000 + Math.random() * 9000000)}-MP`,
      warehouse: "Visakhapatnam Depot",
      quantity: 120,
      specGrade: "Fe 550D Carbon Steel"
    };

    mockDbService.addProduct(newOrder);
    refreshFromDb();
    triggerToast(`Created new product listing: ${newId}`);
  };

  // Bulk / Row action trigger simulation
  const handleActionTriggered = (action: string, ids: string[]) => {
    const products = mockDbService.getProducts();
    const updated = products.map(order => {
      if (ids.includes(order.id)) {
        if (action === 'cancel') {
          return { ...order, status: 'cancelled' as const, stockStatus: 'out-of-stock' as const };
        } else if (action === 'process') {
          return { ...order, status: 'approved' as const };
        }
      }
      return order;
    });

    mockDbService.saveProducts(updated);
    refreshFromDb();
    setSelectedOrderIds([]);

    if (action === 'cancel') {
      triggerToast(`Rejected ${ids.length} product listings.`);
    } else if (action === 'process') {
      triggerToast(`Approved ${ids.length} product listings.`);
    } else if (action === 'report') {
      alert(`Exporting product catalog manifest for: ${ids.join(', ')}...`);
      triggerToast(`Exported ${ids.length} catalogue documents.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Control Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumb items={["Control Tower", "Catalogue Ledger"]} />
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl mt-[-16px]">
            Product Approval Ledger
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Review listed materials proposals, verify specifications compliance, and trigger catalog approvals.
          </p>
        </div>

        {/* Dashboard Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            disabled={syncSpinner}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-orange-200 bg-white px-4 text-xs font-semibold text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-50 transition shadow-sm"
          >
            <FiRefreshCw className={`h-4 w-4 ${syncSpinner ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Force Sync</span>
          </button>
          
          <button
            onClick={() => {
              alert("Downloading master catalog database sheet (Mock)...");
              triggerToast("Catalog database sheet download initiated.");
            }}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-orange-200 bg-white px-4 text-xs font-semibold text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition shadow-sm"
          >
            <FiDownloadCloud className="h-4 w-4" />
            <span className="hidden sm:inline">Export XLS</span>
          </button>

          <button
            onClick={handleCreateOrder}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 text-xs font-bold text-white shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-orange-500 transition"
          >
            <FiPlus className="h-4.5 w-4.5" />
            <span>Add Material</span>
          </button>
        </div>
      </div>

      {/* Main conditional display states */}
      {viewState === 'loading' && <LoadingState />}
      
      {viewState === 'error' && (
        <ErrorState onRetry={handleReload} />
      )}

      {viewState === 'data' && (
        <>
          {/* Analytics Statistics Panel */}
          <MetricsGrid metrics={computedMetrics} />

          {/* Search, Filter Toolbar Panel */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <SearchInput 
                value={filters.search} 
                onChange={(val) => setFilters(prev => ({ ...prev, search: val }))} 
              />
              
              <div className="text-xs text-gray-500">
                Found <span className="font-semibold text-gray-900">{filteredAndSortedOrders.length}</span> matching product listings
              </div>
            </div>

            <Filters 
              filters={filters} 
              onChange={setFilters} 
              onReset={handleResetFilters} 
            />
          </div>

          {/* Data Table Grid List */}
          {filteredAndSortedOrders.length === 0 ? (
            <EmptyState onClearFilters={handleResetFilters} />
          ) : (
            <div className="space-y-4">
              <DataTable 
                orders={paginatedOrders}
                onViewDetails={setActiveDetailOrder}
                selectedOrderIds={selectedOrderIds}
                setSelectedOrderIds={setSelectedOrderIds}
                onSort={handleSort}
                sortBy={filters.sortBy}
                sortOrder={filters.sortOrder}
                onActionTriggered={handleActionTriggered}
              />

              {/* Navigation State controls */}
              <Pagination 
                pagination={pagination}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          )}
        </>
      )}

      {/* Side drawer detail overlays */}
      <AnimatePresence>
        {activeDetailOrder && (
          <DetailModal 
            order={activeDetailOrder} 
            onClose={() => setActiveDetailOrder(null)} 
          />
        )}
      </AnimatePresence>

      {/* Action System Notification Toasts */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-200 bg-white/95 px-4 py-3 text-xs font-semibold text-gray-800 shadow-2xl backdrop-blur-md"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-500" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
