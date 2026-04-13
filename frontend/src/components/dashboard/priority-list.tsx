'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Clock, ChevronDown, ArrowRight } from 'lucide-react';
import { cn, urgencyConfig, categoryConfig, formatRelativeTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/stores/app-store';
import type { Need } from '@/types';

function NeedRow({ need, index }: { need: Need; index: number }) {
  const { selectedNeed, setSelectedNeed } = useAppStore();
  const [open, setOpen] = useState(false);
  const cfg    = urgencyConfig[need.urgency];
  const catCfg = categoryConfig[need.category];
  const isSel  = selectedNeed?.id === need.id;

  const progressColor = need.urgency === 'critical' ? 'red'
    : need.urgency === 'high' ? 'amber'
    : need.urgency === 'medium' ? 'amber'
    : 'green';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        'border rounded-xl overflow-hidden transition-all duration-150',
        isSel
          ? 'border-[#3B82F6]/40 bg-[#3B82F6]/5'
          : 'border-white/[0.04] bg-[#18181B] hover:border-white/[0.08]'
      )}
    >
      <button
        className="w-full flex items-center gap-4 p-4 text-left"
        onClick={() => { setSelectedNeed(isSel ? null : need); setOpen(v => !v); }}
      >
        {/* Rank */}
        <span className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.04] flex items-center justify-center text-[10px] font-bold text-[#A1A1AA] flex-shrink-0">
          {index + 1}
        </span>

        {/* Category emoji */}
        <span className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-[18px] flex-shrink-0', cfg.bg)}>
          {catCfg.icon}
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="urgency" urgency={need.urgency} dot>{cfg.label}</Badge>
            <span className="text-xs text-[#A1A1AA] truncate hidden sm:block">{catCfg.label}</span>
          </div>
          <p className="text-sm font-medium text-white line-clamp-1 leading-snug tracking-tight">{need.description}</p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className={cn('text-xl font-black tabular-nums', cfg.color)}>{need.urgencyScore}</span>
          <div className="w-14">
            <Progress value={need.urgencyScore} color={progressColor as any} size="xs" animated={false} />
          </div>
        </div>

        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} className="flex-shrink-0">
          <ChevronDown style={{ width: 16, height: 16 }} className="text-[#6B7280]" />
        </motion.div>
      </button>

      {/* Expanded */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-white/[0.04]">
              <p className="text-sm text-[#A1A1AA] leading-relaxed mt-4 mb-4">{need.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#A1A1AA] mb-4">
                <span className="flex items-center gap-1.5"><MapPin style={{ width: 12, height: 12 }} />{need.location.name}</span>
                <span className="flex items-center gap-1.5"><Users style={{ width: 12, height: 12 }} />{need.affectedCount.toLocaleString()} affected</span>
                <span className="flex items-center gap-1.5"><Clock style={{ width: 12, height: 12 }} />{formatRelativeTime(need.reportedAt)}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {need.tags.map(t => (
                  <span key={t} className="px-2 py-1 bg-white/[0.02] border border-white/[0.04] rounded-md text-xs font-medium text-[#A1A1AA]">{t}</span>
                ))}
              </div>
              <button className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3B82F6] hover:underline">
                Create task <ArrowRight style={{ width: 13, height: 13 }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PriorityList() {
  const { needs } = useAppStore();
  const sorted = [...needs].sort((a, b) => b.urgencyScore - a.urgencyScore);
  const critCount = sorted.filter(n => n.urgency === 'critical').length;

  return (
    <div className="h-full bg-[#18181B] border border-white/[0.04] rounded-2xl flex flex-col overflow-hidden min-h-0">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-[#EF4444] rounded-full shadow-[0_0_12px_rgba(239,68,68,0.4)]" />
          <span className="text-sm font-semibold text-white tracking-tight">Priority Queue</span>
          {critCount > 0 && (
            <span className="text-[11px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-semibold">
              {critCount} critical
            </span>
          )}
        </div>
        <span className="text-[12px] text-[#6B7280]">{sorted.length} needs</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {sorted.map((n, i) => <NeedRow key={n.id} need={n} index={i} />)}
      </div>
    </div>
  );
}
