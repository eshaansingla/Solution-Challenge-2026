'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover, glow, onClick, padding = 'md' }: CardProps) {
  const paddings = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6' };

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ y: -1, boxShadow: glow ? '0 0 30px rgba(79, 110, 247, 0.15)' : '0 8px 30px rgba(0,0,0,0.3)' }}
        transition={{ duration: 0.15 }}
        onClick={onClick}
        className={cn(
          'bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border))] rounded-xl',
          'transition-colors duration-150',
          onClick && 'cursor-pointer',
          paddings[padding],
          className
        )}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(
      'bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border))] rounded-xl',
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-sm font-semibold text-[rgb(var(--text-primary))]', className)}>
      {children}
    </h3>
  );
}
