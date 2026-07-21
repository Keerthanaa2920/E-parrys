import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading marketplace listings">
      {/* Metrics Card Skeletons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-custom border border-parrys-surface-dim/60 bg-white p-5 space-y-3 animate-pulse shadow-sm">
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 rounded bg-parrys-surface-dim/40" />
              <div className="h-8 w-8 rounded-custom bg-parrys-surface-dim/40" />
            </div>
            <div className="h-6 w-36 rounded bg-parrys-surface-dim/50" />
            <div className="h-2 w-full rounded bg-parrys-surface-dim/20" />
            <div className="h-3 w-40 rounded bg-parrys-surface-dim/30" />
          </div>
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="rounded-custom border border-parrys-surface-dim/60 bg-white p-4 space-y-4 animate-pulse shadow-sm">
        <div className="h-4 w-40 rounded bg-parrys-surface-dim/40" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 rounded-custom bg-parrys-surface-dim/30" />
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-custom border border-parrys-surface-dim/60 bg-white overflow-hidden animate-pulse shadow-sm">
        <div className="h-12 bg-parrys-cream/35 border-b border-parrys-surface-dim/40" />
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-2">
              <div className="h-4.5 w-1/12 rounded bg-parrys-surface-dim/30" />
              <div className="h-4.5 w-3/12 rounded bg-parrys-surface-dim/30" />
              <div className="h-4.5 w-1/12 rounded bg-parrys-surface-dim/40 animate-pulse" />
              <div className="h-4.5 w-2/12 rounded bg-parrys-surface-dim/30" />
              <div className="h-4.5 w-1/12 rounded bg-parrys-surface-dim/30" />
              <div className="h-4.5 w-2/12 rounded bg-parrys-surface-dim/30" />
            </div>
          ))}
        </div>
        <div className="h-12 bg-parrys-cream/20 border-t border-parrys-surface-dim/40" />
      </div>
    </div>
  );
};
export default LoadingState;
