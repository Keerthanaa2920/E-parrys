import React from 'react';
import type { IMarketplaceItem } from '../../types/dashboard';
import { 
  FiArrowUp, FiArrowDown, FiEye, 
  FiTrash2, FiFileText, FiCheckCircle, 
  FiBox 
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
      ? <FiArrowUp className="ml-1 h-3 w-3 inline text-[var(--color-brand-cyan)]" /> 
      : <FiArrowDown className="ml-1 h-3 w-3 inline text-[var(--color-brand-cyan)]" />;
  };

  return (
    <div className="relative rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 shadow-lg overflow-hidden">
      
      {/* Floating Action Bar for Bulk Selection */}
      {selectedOrderIds.length > 0 && (
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between bg-cyan-950/95 border-b border-[var(--color-brand-cyan)] px-4 py-2 text-xs text-slate-100 transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--color-brand-cyan)]">{selectedOrderIds.length}</span>
            <span>listings selected</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onActionTriggered('process', selectedOrderIds)}
              className="flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-700 hover:border-[var(--color-brand-cyan)] hover:text-white px-2.5 py-1.5 font-medium transition"
            >
              <FiCheckCircle className="h-3.5 w-3.5" />
              <span>Approve Listings</span>
            </button>
            <button
              onClick={() => onActionTriggered('report', selectedOrderIds)}
              className="flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-700 hover:border-[var(--color-brand-cyan)] hover:text-white px-2.5 py-1.5 font-medium transition"
            >
              <FiFileText className="h-3.5 w-3.5" />
              <span>Export Catalog</span>
            </button>
            <button
              onClick={() => onActionTriggered('cancel', selectedOrderIds)}
              className="flex items-center gap-1.5 rounded-md bg-rose-950/80 border border-rose-500/20 text-rose-300 hover:bg-rose-900 px-2.5 py-1.5 font-medium transition"
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
            <tr className="bg-slate-900/60 border-b border-[var(--color-brand-border)] text-[10px] font-bold uppercase tracking-wider text-slate-500">
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
                  className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-950 text-[var(--color-brand-cyan)] focus:ring-[var(--color-brand-cyan)] focus:ring-offset-slate-900"
                />
              </th>
              
              <th 
                onClick={() => onSort('id')} 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-300 transition"
              >
                Listing ID {renderSortIcon('id')}
              </th>
              
              <th 
                onClick={() => onSort('productName')} 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-300 transition"
              >
                Product Details {renderSortIcon('productName')}
              </th>
              
              <th 
                onClick={() => onSort('date')} 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-300 transition"
              >
                Date Listed {renderSortIcon('date')}
              </th>
              
              <th 
                onClick={() => onSort('category')} 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-300 transition"
              >
                Category {renderSortIcon('category')}
              </th>
              
              <th 
                onClick={() => onSort('priority')} 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-300 transition"
              >
                Urgency {renderSortIcon('priority')}
              </th>
              
              <th 
                onClick={() => onSort('amount')} 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-300 transition"
              >
                Listing Price (₹) {renderSortIcon('amount')}
              </th>
              
              <th 
                onClick={() => onSort('status')} 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-300 transition"
              >
                Approval Status {renderSortIcon('status')}
              </th>
              
              <th 
                onClick={() => onSort('stockStatus')} 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-300 transition"
              >
                Inventory Stock {renderSortIcon('stockStatus')}
              </th>
              
              <th className="py-3.5 px-4 text-right w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
            {orders.map((order) => {
              const isSelected = selectedOrderIds.includes(order.id);

              return (
                <tr 
                  key={order.id}
                  className={`hover:bg-slate-900/30 transition-colors
                    ${isSelected ? 'bg-cyan-950/15 hover:bg-cyan-950/20' : ''}
                  `}
                >
                  {/* Select Row Checkbox */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectRow(order.id, e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-950 text-[var(--color-brand-cyan)] focus:ring-[var(--color-brand-cyan)] focus:ring-offset-slate-900"
                    />
                  </td>

                  {/* ID */}
                  <td className="py-3 px-4 font-mono font-semibold text-[var(--color-brand-cyan)]">
                    {order.id}
                  </td>

                  {/* Product & Vendor Name */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200">{order.productName}</span>
                      <span className="text-[10px] text-slate-500">{order.vendorName}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-slate-400">
                    {order.date}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {order.category}
                  </td>

                  {/* Priority */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border
                      ${order.priority === 'critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse' : ''}
                      ${order.priority === 'high' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : ''}
                      ${order.priority === 'medium' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : ''}
                      ${order.priority === 'low' ? 'bg-slate-500/10 text-slate-400 border-slate-500/30' : ''}
                    `}>
                      {order.priority}
                    </span>
                  </td>

                  {/* Price Amount */}
                  <td className="py-3 px-4 font-mono font-semibold text-slate-200">
                    ₹{order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Approval Status */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border
                      ${order.status === 'approved' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20' : ''}
                      ${order.status === 'review' ? 'bg-cyan-950/20 text-cyan-400 border-cyan-500/20' : ''}
                      ${order.status === 'pending' ? 'bg-amber-950/20 text-amber-400 border-amber-500/20' : ''}
                      ${order.status === 'cancelled' ? 'bg-rose-950/20 text-rose-400 border-rose-500/20' : ''}
                    `}>
                      <span className={`h-1.5 w-1.5 rounded-full
                        ${order.status === 'approved' ? 'bg-emerald-400' : ''}
                        ${order.status === 'review' ? 'bg-cyan-400' : ''}
                        ${order.status === 'pending' ? 'bg-amber-400' : ''}
                        ${order.status === 'cancelled' ? 'bg-rose-400' : ''}
                      `} />
                      <span className="capitalize">{order.status === 'review' ? 'Under Review' : order.status}</span>
                    </span>
                  </td>

                  {/* Inventory Stock Status */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border
                      ${order.stockStatus === 'in-stock' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20' : ''}
                      ${order.stockStatus === 'low-stock' ? 'bg-amber-950/20 text-amber-450 border-amber-500/20' : ''}
                      ${order.stockStatus === 'out-of-stock' ? 'bg-rose-950/20 text-rose-400 border-rose-500/20' : ''}
                    `}>
                      <span className="capitalize">{order.stockStatus.replace('-', ' ')}</span>
                    </span>
                  </td>

                  {/* Actions column */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewDetails(order)}
                        className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900/60 text-slate-300 hover:border-[var(--color-brand-cyan)] hover:text-white transition focus:outline-none"
                        title="View Details"
                      >
                        <FiEye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onActionTriggered('cancel', [order.id])}
                        disabled={order.status === 'cancelled'}
                        className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900/60 text-slate-400 hover:border-rose-500/30 hover:text-rose-400 disabled:opacity-30 disabled:cursor-not-allowed transition focus:outline-none"
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
