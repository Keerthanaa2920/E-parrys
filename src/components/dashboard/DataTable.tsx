import React from 'react';
import type { IMarketplaceItem } from '../../types/dashboard';
import { 
  FiArrowUp, FiArrowDown, FiEye, 
  FiTrash2, FiFileText, FiCheckCircle 
} from 'react-icons/fi';

interface DataTableProps {
  orders: IMarketplaceItem[]; // Renders list of marketplace items
  onViewDetails: (order: IMarketplaceItem) => void;
  selectedOrderIds: string[];
  setSelectedOrderIds: (ids: string[]) => void;
  onSort: (column: keyof IMarketplaceItem) => void;
  sortBy: keyof IMarketplaceItem;
  sortOrder: 'asc' | 'desc';
  onActionTriggered: (action: string, ids: string[]) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  orders,
  onViewDetails,
  selectedOrderIds,
  setSelectedOrderIds,
  onSort,
  sortBy,
  sortOrder,
  onActionTriggered
}) => {
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrderIds(orders.map(o => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedOrderIds([...selectedOrderIds, id]);
    } else {
      setSelectedOrderIds(selectedOrderIds.filter(item => item !== id));
    }
  };

  const isAllSelected = orders.length > 0 && selectedOrderIds.length === orders.length;
  const isSomeSelected = selectedOrderIds.length > 0 && selectedOrderIds.length < orders.length;

  const renderSortIcon = (column: keyof IMarketplaceItem) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' 
      ? <FiArrowUp className="ml-1 h-3 w-3 inline text-orange-500" /> 
      : <FiArrowDown className="ml-1 h-3 w-3 inline text-orange-500" />;
  };

  return (
    <div className="relative rounded-xl border border-orange-100 bg-white shadow-sm overflow-hidden">
      
      {/* Floating Action Bar for Bulk Selection */}
      {selectedOrderIds.length > 0 && (
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between bg-orange-50/95 border-b border-orange-200 px-4 py-2 text-xs text-gray-800 transition-all duration-300 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-orange-600">{selectedOrderIds.length}</span>
            <span>listings selected</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onActionTriggered('process', selectedOrderIds)}
              className="flex items-center gap-1.5 rounded-md bg-white border border-orange-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 px-2.5 py-1.5 font-medium transition shadow-sm"
            >
              <FiCheckCircle className="h-3.5 w-3.5" />
              <span>Approve Listings</span>
            </button>
            <button
              onClick={() => onActionTriggered('report', selectedOrderIds)}
              className="flex items-center gap-1.5 rounded-md bg-white border border-orange-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 px-2.5 py-1.5 font-medium transition shadow-sm"
            >
              <FiFileText className="h-3.5 w-3.5" />
              <span>Export Catalog</span>
            </button>
            <button
              onClick={() => onActionTriggered('cancel', selectedOrderIds)}
              className="flex items-center gap-1.5 rounded-md bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 px-2.5 py-1.5 font-medium transition"
            >
              <FiTrash2 className="h-3.5 w-3.5" />
              <span>Reject Listings</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Table Element */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-orange-50/50 border-b border-orange-100 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 px-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={el => {
                    if (el) {
                      el.indeterminate = isSomeSelected;
                    }
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-orange-200 bg-white text-orange-500 focus:ring-orange-500 focus:ring-offset-white transition"
                />
              </th>
              
              <th 
                onClick={() => onSort('id')} 
                className="py-3.5 px-4 cursor-pointer hover:text-gray-700 transition"
              >
                Listing ID {renderSortIcon('id')}
              </th>
              
              <th 
                onClick={() => onSort('productName')} 
                className="py-3.5 px-4 cursor-pointer hover:text-gray-700 transition"
              >
                Product Details {renderSortIcon('productName')}
              </th>
              
              <th 
                onClick={() => onSort('date')} 
                className="py-3.5 px-4 cursor-pointer hover:text-gray-700 transition"
              >
                Date Listed {renderSortIcon('date')}
              </th>
              
              <th 
                onClick={() => onSort('category')} 
                className="py-3.5 px-4 cursor-pointer hover:text-gray-700 transition"
              >
                Category {renderSortIcon('category')}
              </th>
              
              <th 
                onClick={() => onSort('priority')} 
                className="py-3.5 px-4 cursor-pointer hover:text-gray-700 transition"
              >
                Urgency {renderSortIcon('priority')}
              </th>
              
              <th 
                onClick={() => onSort('amount')} 
                className="py-3.5 px-4 cursor-pointer hover:text-gray-700 transition"
              >
                Listing Price (₹) {renderSortIcon('amount')}
              </th>
              
              <th 
                onClick={() => onSort('status')} 
                className="py-3.5 px-4 cursor-pointer hover:text-gray-700 transition"
              >
                Approval Status {renderSortIcon('status')}
              </th>
              
              <th 
                onClick={() => onSort('stockStatus')} 
                className="py-3.5 px-4 cursor-pointer hover:text-gray-700 transition"
              >
                Inventory Stock {renderSortIcon('stockStatus')}
              </th>
              
              <th className="py-3.5 px-4 text-right w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-50 text-xs text-gray-700">
            {orders.map((order) => {
              const isSelected = selectedOrderIds.includes(order.id);

              return (
                <tr 
                  key={order.id}
                  className={`hover:bg-orange-50/30 transition-colors
                    ${isSelected ? 'bg-orange-50 hover:bg-orange-100' : ''}
                  `}
                >
                  {/* Select Row Checkbox */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectRow(order.id, e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-orange-200 bg-white text-orange-500 focus:ring-orange-500 focus:ring-offset-white transition"
                    />
                  </td>

                  {/* ID */}
                  <td className="py-3 px-4 font-mono font-semibold text-orange-600">
                    {order.id}
                  </td>

                  {/* Product & Vendor Name */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{order.productName}</span>
                      <span className="text-[10px] text-gray-500">{order.vendorName}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-gray-600">
                    {order.date}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-gray-600 text-[11px]">
                    {order.category}
                  </td>

                  {/* Priority */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border
                      ${order.priority === 'critical' ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse' : ''}
                      ${order.priority === 'high' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                      ${order.priority === 'medium' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                      ${order.priority === 'low' ? 'bg-gray-100 text-gray-600 border-gray-200' : ''}
                    `}>
                      {order.priority}
                    </span>
                  </td>

                  {/* Price Amount */}
                  <td className="py-3 px-4 font-mono font-semibold text-gray-900">
                    ₹{order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Approval Status */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border
                      ${order.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''}
                      ${order.status === 'review' ? 'bg-cyan-50 text-cyan-600 border-cyan-200' : ''}
                      ${order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                      ${order.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-200' : ''}
                    `}>
                      <span className={`h-1.5 w-1.5 rounded-full
                        ${order.status === 'approved' ? 'bg-emerald-500' : ''}
                        ${order.status === 'review' ? 'bg-cyan-500' : ''}
                        ${order.status === 'pending' ? 'bg-amber-500' : ''}
                        ${order.status === 'cancelled' ? 'bg-rose-500' : ''}
                      `} />
                      <span className="capitalize">{order.status === 'review' ? 'Under Review' : order.status}</span>
                    </span>
                  </td>

                  {/* Inventory Stock Status */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border
                      ${order.stockStatus === 'in-stock' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''}
                      ${order.stockStatus === 'low-stock' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                      ${order.stockStatus === 'out-of-stock' ? 'bg-rose-50 text-rose-600 border-rose-200' : ''}
                    `}>
                      <span className="capitalize">{order.stockStatus.replace('-', ' ')}</span>
                    </span>
                  </td>

                  {/* Actions column */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewDetails(order)}
                        className="flex h-7 w-7 items-center justify-center rounded border border-orange-200 bg-white text-gray-500 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition focus:outline-none shadow-sm"
                        title="View Details"
                      >
                        <FiEye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onActionTriggered('cancel', [order.id])}
                        disabled={order.status === 'cancelled'}
                        className="flex h-7 w-7 items-center justify-center rounded border border-orange-200 bg-white text-gray-400 hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition focus:outline-none shadow-sm"
                        title="Reject Listing"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
