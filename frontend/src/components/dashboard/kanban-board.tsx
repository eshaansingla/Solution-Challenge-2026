'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, MoreHorizontal, Plus, CheckCircle2, Flame, TrendingUp } from 'lucide-react';
import { cn, urgencyConfig, formatRelativeTime, formatDuration } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/stores/app-store';
import type { Task, TaskStatus } from '@/types';

const COL_META: Record<string, { icon: React.ElementType; desc: string }> = {
  open:        { icon: Flame,         desc: 'Awaiting assignment' },
  assigned:    { icon: Users,         desc: 'Volunteer assigned'  },
  in_progress: { icon: TrendingUp,    desc: 'Currently active'    },
  completed:   { icon: CheckCircle2,  desc: 'Successfully done'   },
};

function TaskCard({ task }: { task: Task }) {
  const [exp, setExp] = useState(false);
  const cfg     = urgencyConfig[task.urgency];
  const done    = task.checklist.filter(i => i.completed).length;
  const total   = task.checklist.length;
  const pct     = total > 0 ? (done / total) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="bg-[#18181B] border border-white/[0.04] rounded-2xl p-5 hover:border-white/[0.08] transition-colors group drag-handle shadow-sm"
    >
      {/* top stripe */}
      <div className={cn('h-1 -mx-5 -mt-5 mb-4 rounded-t-2xl opacity-80', cfg.dot)} />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="urgency" urgency={task.urgency} dot>{cfg.label}</Badge>
          <span className="text-[10px] text-[#A1A1AA] font-mono font-medium">#{task.id.toUpperCase()}</span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-md hover:bg-white/[0.04] flex items-center justify-center transition-all">
          <MoreHorizontal style={{ width: 16, height: 16 }} className="text-[#A1A1AA]" />
        </button>
      </div>

      <h4
        onClick={() => setExp(v => !v)}
        className="text-sm font-semibold text-white leading-snug mb-3 cursor-pointer hover:text-[#3B82F6] transition-colors tracking-tight"
      >
        {task.title}
      </h4>

      <AnimatePresence>
        {exp && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-[11px] text-[#9CA3AF] mb-3 leading-relaxed overflow-hidden"
          >
            {task.description}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5"><MapPin style={{ width: 12, height: 12 }} />{task.location.area}</span>
          <span className="flex items-center gap-1.5"><Clock style={{ width: 12, height: 12 }} />{formatDuration(task.estimatedDuration)}</span>
        </div>
        <span className="text-[10px]">{formatRelativeTime(task.updatedAt)}</span>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="mb-5 bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
          <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-2 font-medium">
            <span>Task Checklist</span>
            <span className="font-bold text-white tracking-widest">{done}/{total}</span>
          </div>
          <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={cn('h-full rounded-full', cfg.dot)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 mt-auto">
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0 pr-2">
          {task.requiredSkills.slice(0, 2).map(s => (
            <span key={s} className="px-2 py-1 rounded-md text-[10px] font-bold bg-white/[0.04] text-[#A1A1AA] capitalize truncate max-w-full tracking-wide">
              {s}
            </span>
          ))}
          {task.requiredSkills.length > 2 && (
            <span className="text-[10px] text-[#71717A] font-bold tracking-wide">+{task.requiredSkills.length - 2}</span>
          )}
        </div>
        {task.assignedVolunteer && (
          <div className="flex items-center gap-2 pl-3 border-l border-white/[0.04] flex-shrink-0" title={`Assigned to ${task.assignedVolunteer.name}`}>
            <span className="text-[10px] text-[#71717A] font-semibold hidden sm:inline-block">Assigned</span>
            <div className="w-6 h-6 rounded-md bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center text-xs font-bold border border-[#3B82F6]/20">
              {task.assignedVolunteer.name[0]}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function KanbanBoard() {
  const { kanbanColumns, moveTask } = useAppStore();
  const [drag, setDrag] = useState<{ id: string; from: string } | null>(null);

  return (
    <div className="h-full flex gap-5 overflow-x-auto pb-2">
      {kanbanColumns.map((col, ci) => {
        const Meta = COL_META[col.id] ?? { icon: Flame, desc: '' };
        return (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.07 }}
            onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
            onDrop={e => {
              e.preventDefault();
              if (drag && drag.from !== col.id) moveTask(drag.id, drag.from, col.id);
              setDrag(null);
            }}
            className="flex-shrink-0 w-[280px] flex flex-col"
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                  style={{ background: `${col.color}15`, border: `1px solid ${col.color}30` }}>
                  <Meta.icon style={{ width: 14, height: 14, color: col.color }} />
                </div>
                <span className="text-sm font-semibold text-white tracking-tight">{col.title}</span>
                <span className="w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center tracking-widest"
                  style={{ background: `${col.color}20`, color: col.color }}>
                  {col.tasks.length}
                </span>
              </div>
              <button className="w-8 h-8 rounded-md hover:bg-white/[0.04] flex items-center justify-center text-[#A1A1AA] hover:text-[#3B82F6] transition-colors">
                <Plus style={{ width: 16, height: 16 }} />
              </button>
            </div>

            {/* Tasks list */}
            <div className="flex-1 overflow-y-auto space-y-3.5 min-h-[80px]">
              <AnimatePresence mode="popLayout">
                {col.tasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDrag({ id: task.id, from: col.id })}
                    onDragEnd={() => setDrag(null)}
                  >
                    <TaskCard task={task} />
                  </div>
                ))}
              </AnimatePresence>

              {col.tasks.length === 0 && (
                <div className="border-2 border-dashed border-[#1F2937] rounded-xl p-10 text-center">
                  <p className="text-[12px] text-[#6B7280]">Drop tasks here</p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
