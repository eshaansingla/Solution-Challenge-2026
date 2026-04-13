import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { UrgencyLevel, NeedCategory, VolunteerSkill } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateStr: string): string {
  const diff    = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  if (minutes < 1)  return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24)   return `${hours}h ago`;
  return `${days}d ago`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/* ── Urgency ─────────────────────────────────────────── */
export const urgencyConfig: Record<UrgencyLevel, {
  label: string;
  color: string;        /* text color */
  bg: string;           /* fill bg */
  border: string;       /* border */
  dot: string;          /* bg dot / bar */
  hex: string;          /* raw hex for SVG / inline */
}> = {
  critical: {
    label: 'Critical',
    color:  'text-red-400',
    bg:     'bg-red-500/10',
    border: 'border-red-500/30',
    dot:    'bg-red-500',
    hex:    '#EF4444',
  },
  high: {
    label: 'High',
    color:  'text-amber-400',
    bg:     'bg-amber-500/10',
    border: 'border-amber-500/30',
    dot:    'bg-amber-500',
    hex:    '#F59E0B',
  },
  medium: {
    label: 'Medium',
    color:  'text-yellow-400',
    bg:     'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    dot:    'bg-yellow-500',
    hex:    '#EAB308',
  },
  low: {
    label: 'Low',
    color:  'text-emerald-400',
    bg:     'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    dot:    'bg-emerald-500',
    hex:    '#10B981',
  },
};

/* ── Category ────────────────────────────────────────── */
export const categoryConfig: Record<NeedCategory, { label: string; icon: string; color: string }> = {
  food:          { label: 'Food',          icon: '🍱', color: 'text-orange-400' },
  shelter:       { label: 'Shelter',       icon: '🏠', color: 'text-sky-400'    },
  medical:       { label: 'Medical',       icon: '🏥', color: 'text-red-400'    },
  education:     { label: 'Education',     icon: '📚', color: 'text-violet-400' },
  water:         { label: 'Water',         icon: '💧', color: 'text-cyan-400'   },
  sanitation:    { label: 'Sanitation',    icon: '🚿', color: 'text-teal-400'   },
  clothing:      { label: 'Clothing',      icon: '👗', color: 'text-pink-400'   },
  mental_health: { label: 'Mental Health', icon: '🧠', color: 'text-purple-400' },
};

/* ── Skill ───────────────────────────────────────────── */
export const skillConfig: Record<VolunteerSkill, { label: string; color: string }> = {
  medical:      { label: 'Medical',      color: 'text-red-400'     },
  teaching:     { label: 'Teaching',     color: 'text-blue-400'    },
  logistics:    { label: 'Logistics',    color: 'text-orange-400'  },
  counseling:   { label: 'Counseling',   color: 'text-violet-400'  },
  construction: { label: 'Construction', color: 'text-yellow-400'  },
  cooking:      { label: 'Cooking',      color: 'text-amber-400'   },
  driving:      { label: 'Driving',      color: 'text-cyan-400'    },
  translation:  { label: 'Translation',  color: 'text-emerald-400' },
};

export function getUrgencyFromScore(score: number): UrgencyLevel {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}
