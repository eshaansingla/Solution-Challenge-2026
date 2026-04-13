'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  MapPin, Clock, CheckCircle, X, ChevronRight,
  Zap, ArrowRight, Filter, CheckCircle2
} from 'lucide-react';
import { cn, urgencyConfig, categoryConfig, skillConfig, formatDuration, formatRelativeTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/app-store';
import type { Task } from '@/types';

function MatchRing({ score }: { score: number }) {
  const color = score >= 90 ? '#10B981' : score >= 75 ? '#3B82F6' : score >= 60 ? '#F59E0B' : '#6B7280';
  const C = 2 * Math.PI * 18;
  const offset = C * (1 - score / 100);
  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      <svg viewBox="0 0 44 44" className="w-14 h-14 -rotate-90">
        <circle cx="22" cy="22" r="18" fill="none" stroke="#1F2937" strokeWidth="3" />
        <motion.circle cx="22" cy="22" r="18" fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={C} initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: offset }} transition={{ duration: 0.9, ease: 'easeOut' }}
          strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[12px] font-black" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

function TaskCard({ task, onAccept, onDecline }: { task: Task; onAccept: (id: string) => void; onDecline: (id: string) => void }) {
  const [deciding, setDeciding] = useState<'accept' | 'decline' | null>(null);
  const [expanded, setExpanded] = useState(false);
  const cfg    = urgencyConfig[task.urgency];
  const catCfg = categoryConfig[task.checklist ? 'food' : 'food'];

  const go = (action: 'accept' | 'decline') => {
    setDeciding(action);
    setTimeout(() => action === 'accept' ? onAccept(task.id) : onDecline(task.id), 280);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: deciding ? 0 : 1, x: deciding === 'accept' ? 80 : deciding === 'decline' ? -80 : 0, scale: deciding ? 0.96 : 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22 }}
      className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden hover:border-[#374151] transition-colors"
    >
      {/* Urgency stripe */}
      <div className={cn('h-0.5 w-full', cfg.dot)} />

      <div className="p-6">
        {/* Top row */}
        <div className="flex items-start gap-4 mb-4">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0', cfg.bg)}>
            {catCfg.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5">
              <Badge variant="urgency" urgency={task.urgency} dot>{cfg.label}</Badge>
              <span className="text-[11px] text-[#6B7280]">{formatRelativeTime(task.createdAt)}</span>
            </div>
            <h3 className="text-[15px] font-bold text-[#E5E7EB] leading-snug">{task.title}</h3>
          </div>
          {task.assignedVolunteer?.matchScore && <MatchRing score={task.assignedVolunteer.matchScore} />}
        </div>

        <p className="text-[13px] text-[#9CA3AF] leading-relaxed mb-5 line-clamp-2">{task.description}</p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {[
            { icon: MapPin, label: task.location.area },
            { icon: Clock,  label: formatDuration(task.estimatedDuration) },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-[#1F2937] rounded-xl px-3.5 py-2 text-[12px] text-[#9CA3AF]">
              <Icon style={{ width: 13, height: 13 }} />
              {label}
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {task.requiredSkills.map(skill => (
            <span key={skill} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1F2937] border border-[#374151] text-[11px] font-medium', skillConfig[skill].color)}>
              <Zap style={{ width: 10, height: 10 }} /> {skillConfig[skill].label}
            </span>
          ))}
        </div>

        {/* Checklist expand */}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-5">
              <div className="bg-[#0B0F1A] border border-[#1F2937] rounded-xl p-5 space-y-3">
                <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">Checklist</p>
                {task.checklist.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className={cn('w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0',
                      item.completed ? 'bg-[#10B981]' : 'border border-[#374151]')}>
                      {item.completed && <CheckCircle2 style={{ width: 11, height: 11 }} className="text-white" />}
                    </div>
                    <span className={cn('text-[12px]', item.completed ? 'line-through text-[#6B7280]' : 'text-[#9CA3AF]')}>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-1.5 text-[12px] text-[#3B82F6] hover:underline mb-6">
          {expanded ? 'Hide checklist' : 'View checklist'}
          <ChevronRight style={{ width: 13, height: 13 }} className={cn('transition-transform', expanded && 'rotate-90')} />
        </button>

        {/* Actions */}
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => go('decline')}
            className="flex-1 h-11 rounded-xl border border-red-500/30 bg-red-500/8 text-red-400 text-[13px] font-semibold flex items-center justify-center gap-2.5 hover:bg-red-500/15 transition-colors">
            <X style={{ width: 15, height: 15 }} /> Decline
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => go('accept')}
            className="flex-[2] h-11 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[13px] font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-lg shadow-blue-500/20">
            <CheckCircle style={{ width: 15, height: 15 }} /> Accept Task <ArrowRight style={{ width: 14, height: 14 }} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

const FILTERS = [
  { id: 'all',      label: 'All'      },
  { id: 'critical', label: 'Critical' },
  { id: 'nearby',   label: 'Nearby'   },
] as const;

export function TaskFeed() {
  const { tasks, acceptTask, declineTask } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'critical' | 'nearby'>('all');
  const open = tasks.filter(t => t.status === 'open');
  const filtered = filter === 'critical' ? open.filter(t => t.urgency === 'critical' || t.urgency === 'high') : open;

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="flex items-center gap-2.5">
        <Filter style={{ width: 15, height: 15 }} className="text-[#6B7280] flex-shrink-0" />
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={cn(
              'px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all',
              filter === f.id
                ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30'
                : 'bg-[#111827] text-[#6B7280] border-[#1F2937] hover:border-[#374151]'
            )}>
            {f.label}{f.id === 'all' && ` (${open.length})`}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle style={{ width: 28, height: 28 }} className="text-emerald-400" />
            </div>
            <p className="text-[15px] font-semibold text-[#E5E7EB]">All caught up!</p>
            <p className="text-[13px] text-[#6B7280] mt-1.5">No pending tasks match your filters</p>
          </motion.div>
        ) : (
          filtered.map(task => (
            <TaskCard key={task.id} task={task} onAccept={acceptTask} onDecline={declineTask} />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
