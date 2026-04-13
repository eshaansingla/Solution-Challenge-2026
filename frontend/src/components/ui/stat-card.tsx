'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function StatCard({ label, value, change, unit, icon, delay = 0 }: StatCardProps) {
  const pos = change !== undefined && change > 0;
  const neg = change !== undefined && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 flex flex-col justify-between h-full group"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-sm font-medium text-gray-400">{label}</p>
        {icon && (
          <div className="text-gray-400 group-hover:text-white transition-colors">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-white tabular-nums tracking-tight">{value}</span>
          {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
        </div>
        {change !== undefined && (
          <span className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md',
            pos ? 'text-emerald-400 bg-emerald-500/10'
              : neg ? 'text-red-400 bg-red-500/10'
              : 'text-gray-400 bg-white/[0.04]'
          )}>
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </motion.div>
  );
}
