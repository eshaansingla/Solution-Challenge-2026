'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, CheckCircle2, Camera,
  MessageSquare, Navigation, ChevronRight, Loader2, Flag
} from 'lucide-react';
import { cn, urgencyConfig, formatDuration } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/stores/app-store';

export function ActiveTask() {
  const { activeTask, toggleChecklist } = useAppStore();
  const [completing, setCompleting] = useState(false);
  const [uploading,  setUploading]  = useState(false);

  if (!activeTask) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-18 h-18 rounded-2xl bg-[#1F2937] flex items-center justify-center mb-5">
          <Flag style={{ width: 32, height: 32 }} className="text-[#374151]" />
        </div>
        <p className="text-[15px] font-semibold text-[#E5E7EB]">No active task</p>
        <p className="text-[13px] text-[#6B7280] mt-1.5">Accept a task from your feed to get started</p>
      </div>
    );
  }

  const cfg       = urgencyConfig[activeTask.urgency];
  const completed = activeTask.checklist.filter(i => i.completed).length;
  const total     = activeTask.checklist.length;
  const progress  = total > 0 ? (completed / total) * 100 : 0;
  const allDone   = completed === total && total > 0;

  const handleComplete = () => {
    setCompleting(true);
    setTimeout(() => setCompleting(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* ── Task header ──────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden">
        <div className={cn('h-0.5 w-full', cfg.dot)} />
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className={cn('text-[11px] font-bold uppercase tracking-widest', cfg.color)}>{cfg.label} Priority</span>
                <span className="w-1 h-1 rounded-full bg-[#374151]" />
                <span className="text-[11px] text-[#6B7280]">In Progress</span>
              </div>
              <h2 className="text-[17px] font-bold text-[#E5E7EB] leading-tight">{activeTask.title}</h2>
            </div>
            <div className={cn('flex-shrink-0 px-3.5 py-2 rounded-xl border text-[11px] font-bold', cfg.bg, cfg.border, cfg.color)}>
              ACTIVE
            </div>
          </div>

          <p className="text-[13px] text-[#9CA3AF] leading-relaxed mb-6">{activeTask.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { icon: MapPin,    label: 'Location', value: activeTask.location.name, sub: activeTask.location.area },
              { icon: Clock,     label: 'Duration',  value: formatDuration(activeTask.estimatedDuration), sub: 'Estimated' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="bg-[#1F2937] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon style={{ width: 14, height: 14 }} className="text-[#6B7280]" />
                  <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">{label}</span>
                </div>
                <p className="text-[13px] font-bold text-[#E5E7EB]">{value}</p>
                <p className="text-[11px] text-[#6B7280] mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-between p-4 bg-[#3B82F6]/8 border border-[#3B82F6]/20 rounded-xl hover:bg-[#3B82F6]/12 transition-colors">
            <div className="flex items-center gap-3">
              <Navigation style={{ width: 17, height: 17 }} className="text-[#3B82F6]" />
              <span className="text-[13px] font-semibold text-[#3B82F6]">Navigate to Location</span>
            </div>
            <ChevronRight style={{ width: 15, height: 15 }} className="text-[#3B82F6]" />
          </button>
        </div>
      </motion.div>

      {/* ── Progress ─────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[14px] font-semibold text-[#E5E7EB]">Task Progress</p>
            <p className="text-[11px] text-[#6B7280] mt-1">Complete all steps to finish</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-[#E5E7EB] tabular-nums leading-none">{Math.round(progress)}%</p>
            <p className="text-[11px] text-[#6B7280] mt-1">{completed}/{total} done</p>
          </div>
        </div>
        <Progress value={progress} color={allDone ? 'green' : progress > 50 ? 'blue' : 'amber'} />
      </motion.div>

      {/* ── Checklist ────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1F2937]">
          <p className="text-[14px] font-semibold text-[#E5E7EB]">Checklist</p>
        </div>
        <div className="p-3.5 space-y-1.5">
          <AnimatePresence>
            {activeTask.checklist.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => toggleChecklist(activeTask.id, item.id)}
                className={cn(
                  'w-full flex items-center gap-3.5 p-4 rounded-xl transition-all text-left',
                  item.completed
                    ? 'bg-emerald-500/5 border border-emerald-500/20'
                    : 'hover:bg-[#1F2937] border border-transparent'
                )}
              >
                <motion.div
                  animate={{ scale: item.completed ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.18 }}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                    item.completed ? 'bg-[#10B981]' : 'border-2 border-[#374151]'
                  )}
                >
                  {item.completed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 style={{ width: 13, height: 13 }} className="text-white" />
                    </motion.div>
                  )}
                </motion.div>
                <span className={cn('text-[13px] font-medium leading-relaxed flex-1',
                  item.completed ? 'line-through text-[#6B7280]' : 'text-[#E5E7EB]')}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Evidence ─────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6">
        <p className="text-[14px] font-semibold text-[#E5E7EB] mb-5">Evidence & Notes</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Camera,       label: 'Add Photo', action: () => setUploading(true), loading: uploading },
            { icon: MessageSquare, label: 'Add Note', action: () => {},                 loading: false      },
          ].map(({ icon: Icon, label, action, loading }) => (
            <button key={label} onClick={action}
              className="flex flex-col items-center gap-3 p-5 border-2 border-dashed border-[#1F2937] rounded-xl hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/5 transition-all group">
              {loading
                ? <Loader2 style={{ width: 22, height: 22 }} className="text-[#3B82F6] animate-spin" />
                : <Icon   style={{ width: 22, height: 22 }} className="text-[#6B7280] group-hover:text-[#3B82F6] transition-colors" />
              }
              <span className="text-[12px] text-[#9CA3AF] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Complete CTA ─────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleComplete} disabled={!allDone || completing}
          className={cn(
            'w-full h-13 rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2.5 transition-all',
            allDone && !completing
              ? 'bg-[#10B981] hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-[#1F2937] text-[#6B7280] border border-[#374151] cursor-not-allowed'
          )}>
          {completing
            ? <><Loader2 style={{ width: 17, height: 17 }} className="animate-spin" /> Submitting…</>
            : <><Flag    style={{ width: 17, height: 17 }} />{allDone ? 'Mark as Complete' : `${total - completed} steps remaining`}</>
          }
        </motion.button>
      </motion.div>
    </div>
  );
}
