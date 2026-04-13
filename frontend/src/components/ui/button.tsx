'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variants = {
  primary:   'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/20',
  secondary: 'bg-[#1F2937] hover:bg-[#374151] text-[#E5E7EB] border border-[#374151]',
  ghost:     'hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#E5E7EB]',
  danger:    'bg-red-500/10 hover:bg-red-500/15 text-red-400 border border-red-500/30',
  success:   'bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  outline:   'border border-[#1F2937] hover:border-[#3B82F6]/40 text-[#E5E7EB] hover:bg-[#3B82F6]/5',
};

const sizes = {
  xs: 'h-7 px-2.5 text-[12px] rounded-lg gap-1.5',
  sm: 'h-8 px-3   text-[13px] rounded-xl gap-2',
  md: 'h-9 px-4   text-[13px] rounded-xl gap-2',
  lg: 'h-11 px-5  text-[14px] rounded-xl gap-2',
};

export function Button({
  children, variant = 'secondary', size = 'md',
  loading, icon, iconRight, className, disabled, ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant], sizes[size], className
      )}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading
        ? <Loader2 style={{ width: 14, height: 14 }} className="animate-spin flex-shrink-0" />
        : icon
          ? <span className="flex-shrink-0 flex">{icon}</span>
          : null
      }
      {children}
      {iconRight && !loading && <span className="flex-shrink-0 flex">{iconRight}</span>}
    </motion.button>
  );
}
