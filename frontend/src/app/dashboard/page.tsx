'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, Users, CheckCircle2, Clock,
  LayoutGrid, Map, Activity, Plus, RefreshCw, ChevronRight
} from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { HeatmapPanel } from '@/components/dashboard/heatmap';
import { KanbanBoard } from '@/components/dashboard/kanban-board';
import { AnalyticsPanel } from '@/components/dashboard/analytics-panel';
import { PriorityList } from '@/components/dashboard/priority-list';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type View = 'overview' | 'kanban' | 'map';

const VIEWS = [
  { id: 'overview', label: 'Overview',   icon: Activity },
  { id: 'kanban',   label: 'Task Board', icon: LayoutGrid },
  { id: 'map',      label: 'Heatmap',    icon: Map },
] as const;

export default function DashboardPage() {
  const [view, setView] = useState<View>('overview');
  const [refreshing, setRefreshing] = useState(false);

  const refreshAction = () => { 
    setRefreshing(true); 
    setTimeout(() => setRefreshing(false), 800); 
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F1A] text-white">
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          title="NGO Dashboard"
          subtitle="Delhi Relief Fund · Real-time status"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm"
                icon={<RefreshCw style={{ width: 14, height: 14 }} className={refreshing ? 'animate-spin' : ''} />}
                onClick={refreshAction} />
              <Button variant="primary" size="sm" icon={<Plus style={{ width: 14, height: 14 }} />}>
                New Task
              </Button>
            </div>
          }
        />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
            {/* ── Stats ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Critical Needs"    value="2"  change={-33} icon={<AlertTriangle style={{ width: 18, height: 18 }} />} />
              <StatCard label="Active Volunteers" value="47" change={12}  icon={<Users         style={{ width: 18, height: 18 }} />} />
              <StatCard label="Resolved Today"    value="18" change={28}  icon={<CheckCircle2  style={{ width: 18, height: 18 }} />} />
              <StatCard label="Avg Response"      value="38" unit="min" change={-15} icon={<Clock style={{ width: 18, height: 18 }} />} />
            </div>

            {/* ── Tabs ── */}
            <div className="flex items-center gap-2 border-b border-[#1F2937]">
              {VIEWS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setView(id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px',
                    view === id
                      ? 'border-[#3B82F6] text-[#3B82F6]'
                      : 'border-transparent text-gray-500 hover:text-white'
                  )}>
                  <Icon style={{ width: 15, height: 15 }} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* ── View Content ── */}
            <AnimatePresence mode="wait">
              {view === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="space-y-6">
                  
                  {/* Main Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-[420px] bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
                      <HeatmapPanel />
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="h-[240px] bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
                        <AnalyticsPanel />
                      </div>
                      
                      {/* Volunteers Card */}
                      <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-semibold">Top Performers</p>
                          <ChevronRight style={{ width: 16, height: 16 }} className="text-gray-500" />
                        </div>
                        <div className="space-y-3">
                          {[
                            { name: 'Riya Sharma',  score: 96, skills: 'Medical' },
                            { name: 'Arjun Mehta',  score: 88, skills: 'Logistics' },
                          ].map(v => (
                            <div key={v.name} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#0B0F1A] border border-[#1F2937] flex items-center justify-center text-xs font-bold text-gray-300">
                                {v.name[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{v.name}</p>
                                <p className="text-[11px] text-gray-500">{v.skills}</p>
                              </div>
                              <span className="text-xs font-bold text-emerald-400">{v.score}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Priority List Fixed Width below grid */}
                  <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
                    <PriorityList />
                  </div>
                </motion.div>
              )}

              {view === 'kanban' && (
                <motion.div key="kanban" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="h-[600px]">
                  <KanbanBoard />
                </motion.div>
              )}

              {view === 'map' && (
                <motion.div key="map" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                  <div className="lg:col-span-2 bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
                    <HeatmapPanel />
                  </div>
                  <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
                    <PriorityList />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
