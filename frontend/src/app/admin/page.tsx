'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Database, Activity, RefreshCw, BarChart2
} from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { OCRValidator } from '@/components/admin/ocr-validator';
import { DataTable } from '@/components/admin/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AdminView = 'ocr' | 'data' | 'metrics';

const TABS: { id: AdminView; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: 'ocr',     label: 'OCR Validator',   icon: FileText, badge: '1' },
  { id: 'data',    label: 'Data Management', icon: Database },
  { id: 'metrics', label: 'System Metrics',  icon: BarChart2 },
];

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('ocr');

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F1A] text-white">
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          title="Admin Panel"
          subtitle="Data validation & system oversight"
          actions={
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-400">All Systems OK</span>
              </div>
              <Button variant="ghost" size="sm" icon={<RefreshCw style={{ width: 14, height: 14 }} />} />
            </div>
          }
        />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
            
            {/* ── View Selection ── */}
            <div className="flex items-center gap-2 border-b border-[#1F2937]">
              {TABS.map(({ id, label, icon: Icon, badge }) => (
                <button key={id} onClick={() => setView(id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px',
                    view === id
                      ? 'border-[#3B82F6] text-[#3B82F6]'
                      : 'border-transparent text-gray-500 hover:text-white'
                  )}>
                  <Icon style={{ width: 16, height: 16 }} />
                  <span>{label}</span>
                  {badge && (
                    <span className="w-5 h-5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-[10px] font-bold flex items-center justify-center ml-1">{badge}</span>
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {view === 'ocr' && (
                <motion.div key="ocr" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  <OCRValidator />
                </motion.div>
              )}
              {view === 'data' && (
                <motion.div key="data" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
                  <DataTable />
                </motion.div>
              )}
              {view === 'metrics' && (
                <motion.div key="metrics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard label="Reports Processed" value="1,284" change={18}  icon={<FileText      style={{ width: 18, height: 18 }} />} />
                    <StatCard label="OCR Accuracy"      value="91.4"  unit="%" change={2}  icon={<BarChart2  style={{ width: 18, height: 18 }} />} />
                    <StatCard label="Review Queue"      value="3"     change={-25} icon={<Activity     style={{ width: 18, height: 18 }} />} />
                    <StatCard label="Success Rate"      value="99.9"  unit="%" change={0}   icon={<CheckCircle style={{ width: 18, height: 18 }} />} />
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

function CheckCircle({ style, className }: any) {
  return (
    <svg style={style} className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  );
}
