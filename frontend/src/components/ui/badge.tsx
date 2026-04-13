'use client';

import { cn } from '@/lib/utils';
import type { UrgencyLevel } from '@/types';
import { urgencyConfig } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'urgency';
  urgency?: UrgencyLevel;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = 'default', urgency, className, dot }: BadgeProps) {
  if (variant === 'urgency' && urgency) {
    const cfg = urgencyConfig[urgency];
    return (
      <span className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-semibold border',
        cfg.bg, cfg.color, cfg.border, className
      )}>
        {dot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', cfg.dot)} />}
        {children}
      </span>
    );
  }
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-medium',
      variant === 'outline'
        ? 'border border-[#1F2937] text-[#9CA3AF]'
        : 'bg-[#1F2937] text-[#9CA3AF]',
      className
    )}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />}
      {children}
    </span>
  );
}
