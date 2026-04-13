'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  size?: 'xs' | 'sm' | 'md';
  animated?: boolean;
}

const colors = {
  blue:   'bg-[#3B82F6]',
  green:  'bg-[#10B981]',
  amber:  'bg-[#F59E0B]',
  red:    'bg-[#EF4444]',
  purple: 'bg-[#8B5CF6]',
};

const sizes = { xs: 'h-1', sm: 'h-1.5', md: 'h-2' };

export function Progress({ value, max = 100, className, color = 'blue', size = 'md', animated = true }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('w-full rounded-full bg-[#1F2937] overflow-hidden', sizes[size], className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: animated ? 0.7 : 0, ease: 'easeOut' }}
        className={cn('h-full rounded-full', colors[color])}
      />
    </div>
  );
}
