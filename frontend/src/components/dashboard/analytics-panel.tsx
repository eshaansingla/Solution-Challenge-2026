'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { BarChart2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockAnalytics } from '@/lib/mock-data';

const PIE_DATA = [
  { name: 'Critical', value: 2, color: '#EF4444' },
  { name: 'High',     value: 3, color: '#F59E0B' },
  { name: 'Medium',   value: 4, color: '#EAB308' },
  { name: 'Low',      value: 2, color: '#10B981' },
];

const TIP = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl px-3.5 py-2.5 shadow-xl">
      <p className="text-[12px] font-semibold text-[#E5E7EB] mb-2">{label}</p>
      {payload.map((e: any) => (
        <div key={e.name} className="flex items-center gap-2 text-[11px]">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
          <span className="text-[#9CA3AF]">{e.name}:</span>
          <span className="font-bold text-[#E5E7EB]">{e.value}</span>
        </div>
      ))}
    </div>
  );
};

const TABS = ['trend', 'response', 'distribution'] as const;

export function AnalyticsPanel() {
  const [tab, setTab] = useState<typeof TABS[number]>('trend');
  const data = mockAnalytics.slice(-7);

  return (
    <div className="h-full bg-[#111827] border border-[#1F2937] rounded-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2937] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <BarChart2 style={{ width: 16, height: 16 }} className="text-[#8B5CF6]" />
          </div>
          <span className="text-[14px] font-semibold text-[#E5E7EB]">Analytics</span>
        </div>
        <div className="flex items-center bg-[#1F2937] rounded-xl p-1.5 gap-1">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-3.5 py-2 text-[11px] font-semibold rounded-lg capitalize transition-all',
                tab === t ? 'bg-[#8B5CF6] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#9CA3AF]'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="flex-1 p-6 min-h-0">
        {tab === 'trend' && (
          <motion.div key="trend" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col gap-4">
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
                <defs>
                  <linearGradient id="gNeeds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 10 }} tickFormatter={v => v.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<TIP />} />
                <Area type="monotone" dataKey="needs"    name="Reported" stroke="#EF4444" strokeWidth={2} fill="url(#gNeeds)"    dot={false} />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} fill="url(#gResolved)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6">
              {[{ color:'#EF4444', label:'Reported' }, { color:'#10B981', label:'Resolved' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 rounded-full" style={{ background: l.color }} />
                  <span className="text-[11px] text-[#6B7280]">{l.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'response' && (
          <motion.div key="response" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col gap-4">
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 10 }} tickFormatter={v => v.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<TIP />} />
                <Bar dataKey="responseTime" name="Response (min)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B7280]">
              <Clock style={{ width: 12, height: 12 }} /> Average response time in minutes
            </div>
          </motion.div>
        )}

        {tab === 'distribution' && (
          <motion.div key="dist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center gap-6">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius="52%" outerRadius="78%" paddingAngle={3} dataKey="value">
                  {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {PIE_DATA.map(d => (
                <div key={d.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className="text-[12px] text-[#9CA3AF]">{d.name}</span>
                    </div>
                    <span className="text-[12px] font-bold text-[#E5E7EB]">{d.value}</span>
                  </div>
                  <div className="h-1 rounded-full bg-[#1F2937] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(d.value / 11) * 100}%`, background: d.color, opacity: 0.7 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
