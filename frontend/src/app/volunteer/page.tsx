'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Star, MapPin, History, CheckCircle2, TrendingUp,
  Award, Clock, Target
} from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { TaskFeed } from '@/components/volunteer/task-feed';
import { ActiveTask } from '@/components/volunteer/active-task';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';
import { mockVolunteers } from '@/lib/mock-data';

const volunteer = mockVolunteers[0];

const historyItems = [
  { id: 'h1', title: 'Food Distribution — Sector 3', date: 'Apr 11', dur: '4h 30m', rating: 5, impact: '340 fed' },
  { id: 'h2', title: 'Medical Camp — Laxmi Nagar',   date: 'Apr 9',  dur: '6h',     rating: 5, impact: '89 tested' },
  { id: 'h3', title: 'Shelter Setup — East Delhi',   date: 'Apr 6',  dur: '8h',     rating: 4, impact: '12 families' },
];

export default function VolunteerPage() {
  const { volunteerView, setVolunteerView, activeTask } = useAppStore();

  const tabs: { id: 'feed' | 'active' | 'history'; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'feed',    label: 'Task Feed', icon: Zap },
    { id: 'active',  label: 'Active',    icon: Target, badge: activeTask ? '1' : undefined },
    { id: 'history', label: 'History',   icon: History },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F1A]">
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title="Volunteer App" subtitle={`Logged in as ${volunteer.name}`} />

        <div className="flex-1 overflow-hidden flex min-h-0">
          {/* Main feed area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Profile banner */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 mb-5">
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-black flex-shrink-0">
                  {volunteer.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-[15px] font-bold text-white">{volunteer.name}</h2>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} style={{ width: 12, height: 12 }}
                          className={cn(i < Math.floor(volunteer.rating) ? 'text-amber-400 fill-amber-400' : 'text-[#374151]')} />
                      ))}
                      <span className="text-[11px] text-[#9CA3AF] ml-1">{volunteer.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B7280]">
                    <span className="flex items-center gap-1"><MapPin style={{ width: 12, height: 12 }} />{volunteer.location.area}</span>
                    <span className="flex items-center gap-1"><CheckCircle2 style={{ width: 12, height: 12 }} className="text-emerald-400" /><span className="text-emerald-400">{volunteer.completedTasks} completed</span></span>
                  </div>
                </div>
                <div className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold border flex-shrink-0',
                  volunteer.status === 'available'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                )}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', volunteer.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500')} />
                  {volunteer.status === 'available' ? 'Available' : 'Busy'}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {volunteer.skills.map(s => (
                  <span key={s} className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[11px] font-medium capitalize">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 bg-[#111827] border border-[#1F2937] rounded-xl p-1.5 mb-5">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setVolunteerView(tab.id)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[12px] font-semibold transition-all',
                    volunteerView === tab.id
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-[#6B7280] hover:text-[#9CA3AF]'
                  )}>
                  <tab.icon style={{ width: 14, height: 14 }} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.badge && (
                    <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">{tab.badge}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {volunteerView === 'feed' && (
                <motion.div key="feed" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}>
                  <TaskFeed />
                </motion.div>
              )}
              {volunteerView === 'active' && (
                <motion.div key="active" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}>
                  <ActiveTask />
                </motion.div>
              )}
              {volunteerView === 'history' && (
                <motion.div key="history" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }} className="space-y-3">
                  {historyItems.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-white mb-1.5">{item.title}</p>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B7280]">
                            <span>{item.date}</span>
                            <span className="flex items-center gap-1"><Clock style={{ width: 11, height: 11 }} />{item.dur}</span>
                            <span className="flex items-center gap-1 text-emerald-400"><TrendingUp style={{ width: 11, height: 11 }} />{item.impact}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} style={{ width: 12, height: 12 }}
                              className={cn(i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-[#374151]')} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right panel (xl+) */}
          <div className="hidden xl:flex w-[320px] flex-col gap-4 p-5 border-l border-[#1F2937] overflow-y-auto flex-shrink-0">
            {/* Impact */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Award style={{ width: 14, height: 14 }} className="text-amber-400" />
                </div>
                <p className="text-[13px] font-semibold text-white">Your Impact</p>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'People helped',    value: '1,240' },
                  { label: 'Hours volunteered', value: '186h' },
                  { label: 'Tasks completed',   value: '47' },
                  { label: 'Avg rating',        value: '4.9/5' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b border-[#1F2937] last:border-0">
                    <span className="text-[11px] text-[#9CA3AF]">{s.label}</span>
                    <span className="text-[12px] font-bold text-[#E5E7EB] tabular-nums">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* This week */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
              <p className="text-[13px] font-semibold text-white mb-4">This Week</p>
              <div className="space-y-4">
                {[
                  { label: 'Hours',       current: 12, max: 20,  color: 'blue' as const },
                  { label: 'Tasks',       current: 4,  max: 10,  color: 'purple' as const },
                  { label: 'Match Score', current: 96, max: 100, color: 'green' as const },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-[#9CA3AF]">{item.label}</span>
                      <span className="text-[11px] font-semibold text-[#E5E7EB] tabular-nums">
                        {item.current}{item.label === 'Match Score' ? '%' : `/${item.max}`}
                      </span>
                    </div>
                    <Progress value={item.current} max={item.max} size="sm" color={item.color} />
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
              <p className="text-[13px] font-semibold text-white mb-4">Achievements</p>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { emoji: '🏆', label: 'Top Volunteer' },
                  { emoji: '⚡', label: 'Fast Responder' },
                  { emoji: '🎯', label: 'Perfect Match' },
                  { emoji: '🌟', label: '5-Star Rated' },
                  { emoji: '💪', label: '50 Tasks' },
                  { emoji: '🤝', label: 'Team Player' },
                ].map(b => (
                  <div key={b.label} className="flex flex-col items-center gap-1.5 p-3 bg-[#0B0F1A] rounded-lg border border-[#1F2937] hover:border-[#374151] transition-colors" title={b.label}>
                    <span className="text-lg">{b.emoji}</span>
                    <span className="text-[9px] text-[#6B7280] text-center leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
