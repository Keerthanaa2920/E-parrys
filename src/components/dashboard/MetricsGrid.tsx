import React from 'react';
import type { IMetricCard } from '../../types/dashboard';
import { FiBox, FiCheckCircle, FiCreditCard, FiAlertTriangle, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface MetricsGridProps {
  metrics: IMetricCard[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FiBox,
  FiCheckCircle,
  FiCreditCard,
  FiAlertTriangle
};

// SVG Sparkline path helper
const getSparklinePath = (data: number[], width: number, height: number): string => {
  if (data.length === 0) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  
  return data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    // Pad margins slightly (2px)
    const y = (height - 4) - ((val - min) / range) * (height - 8) + 2;
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
};

const getAreaPath = (data: number[], width: number, height: number): string => {
  const linePath = getSparklinePath(data, width, height);
  if (!linePath) return '';
  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
};

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6"
    >
      {metrics.map((metric, idx) => {
        const IconComponent = iconMap[metric.icon] || FiBox;
        const width = 120;
        const height = 40;
        const sparklinePath = getSparklinePath(metric.trendData, width, height);
        const areaPath = getAreaPath(metric.trendData, width, height);

        // Determine color based on trend/change direction
        let trendColor = "text-slate-400";
        let sparkColor = "#94a3b8"; // Slate-400
        let gradId = `grad-${idx}`;

        if (metric.changeType === 'increase') {
          trendColor = "text-emerald-400";
          sparkColor = "#10b981"; // Emerald-500
        } else if (metric.changeType === 'decrease') {
          trendColor = "text-rose-400";
          sparkColor = "#f43f5e"; // Rose-500
        }

        return (
          <motion.div
            key={metric.title}
            variants={cardVariants}
            className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 p-5 flex flex-col justify-between shadow-md relative overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/5 group"
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-400 transition">
                {metric.title}
              </span>
              <div className="rounded-lg border border-[var(--color-brand-border)] bg-slate-900/60 p-2 text-slate-300 group-hover:text-[var(--color-brand-cyan)] group-hover:border-cyan-500/30 transition-all">
                <IconComponent className="h-5 w-5" />
              </div>
            </div>

            {/* Middle row: Big Value & Sparkline */}
            <div className="flex items-end justify-between mt-4">
              <div>
                <span className="text-2xl font-bold text-slate-100 tracking-tight">
                  {metric.value}
                </span>
                
                {/* Trend Info */}
                <div className="flex items-center gap-1 mt-1">
                  {metric.change !== 0 && (
                    <span className={`flex items-center text-xs font-semibold ${trendColor}`}>
                      {metric.changeType === 'increase' ? (
                        <FiArrowUpRight className="h-3 w-3 shrink-0 mr-0.5" />
                      ) : (
                        <FiArrowDownRight className="h-3 w-3 shrink-0 mr-0.5" />
                      )}
                      {Math.abs(metric.change)}%
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500">
                    {metric.subtext}
                  </span>
                </div>
              </div>

              {/* Custom SVG Sparkline widget */}
              <div className="w-[120px] h-[40px] shrink-0 pointer-events-none" aria-hidden="true">
                <svg className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={sparkColor} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={sparkColor} stopOpacity={0.00} />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area */}
                  {areaPath && (
                    <path
                      d={areaPath}
                      fill={`url(#${gradId})`}
                      stroke="none"
                    />
                  )}
                  
                  {/* Highlight Line */}
                  {sparklinePath && (
                    <path
                      d={sparklinePath}
                      fill="none"
                      stroke={sparkColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>
            </div>
            
            {/* Tiny accent bar hover glow */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-brand-cyan)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
