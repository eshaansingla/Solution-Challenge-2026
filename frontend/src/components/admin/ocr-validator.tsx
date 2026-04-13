'use client';

import { useState } from 'react';
import { 
  FileText, Clock, AlertTriangle, CheckCircle, 
  ArrowRight, Search, Eye, Edit3, Trash2, 
  Check, X, RotateCw, BarChart2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const REPORTS = [
  { id: '#R1', type: 'OCR', status: 'Pending', date: '12/04/26', location: 'Sector 7 Camp', confidence: 91, urgency: 'Critical' },
  { id: '#R2', type: 'OCR', status: 'Approved', date: '13/04/26', location: 'Okhla Zone', confidence: 87, urgency: 'High' },
  { id: '#R3', type: 'OCR', status: 'Pending', date: '13/04/26', location: 'Yamuna Flood Zone', confidence: 74, urgency: 'Medium' },
];

export function OCRValidator() {
  const [selected, setSelected] = useState(REPORTS[0]);

  return (
    <div className="flex h-[calc(100vh-240px)] gap-6">
      
      {/* ── Panel 1: Queue (Fixed 300px) ── */}
      <div className="w-[300px] flex flex-col bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden shrink-0">
        <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
          <p className="text-sm font-semibold capitalize">Report Queue</p>
          <Badge variant="ghost" className="text-gray-500">{REPORTS.length}</Badge>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[#1F2937]">
          {REPORTS.map(r => (
            <button key={r.id} onClick={() => setSelected(r)}
              className={cn(
                'w-full text-left p-4 hover:bg-white/[0.02] transition-colors group relative',
                selected.id === r.id && 'bg-[#3B82F6]/5'
              )}>
              {selected.id === r.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3B82F6]" />}
              <div className="flex items-center gap-2 mb-1">
                <span className={cn('w-1.5 h-1.5 rounded-full', r.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500')} />
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{r.status} · {r.type}</p>
              </div>
              <p className="text-xs font-semibold text-white truncate mb-1">{r.location}</p>
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span>{r.date}</span>
                <span className={cn('font-bold', r.confidence > 90 ? 'text-emerald-400' : 'text-amber-400')}>{r.confidence}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Panel 2: Raw OCR Output ── */}
      <div className="flex-1 flex flex-col bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between bg-[#111827]">
          <div className="flex items-center gap-2">
            <FileText style={{ width: 14, height: 14 }} className="text-gray-500" />
            <p className="text-sm font-semibold">Raw OCR Output</p>
          </div>
          <p className="text-[10px] text-gray-500 font-mono italic">Source: Field_Report_S7.img</p>
        </div>
        <div className="flex-1 p-6 overflow-y-auto font-mono text-xs leading-relaxed text-gray-400">
          <p className="mb-4">DATE: 12/04/26</p>
          <p className="mb-4">LOCATION: Sector 7 Camp, North Delhi</p>
          <p className="mb-4">ISSUE: Food shortage - families without food 3 days</p>
          <p className="mb-4">NUMBER AFFECTED: approx 850 families</p>
          <p className="mb-4 text-white">SEVERITY: URGENT - children and elderly at risk</p>
          <p className="mb-4">REPORTED BY: Field Officer Priya Sharma</p>
          <div className="h-px bg-[#1F2937] my-6" />
          <p className="italic bg-[#3B82F6]/10 p-4 rounded border border-[#3B82F6]/20 text-[#3B82F6]">
            [SYSTEM_NOTE]: Confidence score high. Mapping to Sector 7 Grid.
          </p>
        </div>
      </div>

      {/* ── Panel 3: Extracted Data ── */}
      <div className="flex-1 flex flex-col bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between bg-[#111827]">
          <div className="flex items-center gap-2">
            <CheckCircle style={{ width: 14, height: 14 }} className="text-emerald-500" />
            <p className="text-sm font-semibold">Extracted Data</p>
          </div>
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{selected.confidence}% Match</p>
        </div>
        
        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Category</label>
            <div className="px-4 py-2 bg-[#0B0F1A] border border-[#1F2937] rounded-lg text-sm">Food & Nutrition</div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Urgency</label>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0B0F1A] border border-[#1F2937] rounded-lg text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Critical Impact</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Description</label>
            <textarea className="w-full bg-[#0B0F1A] border border-[#1F2937] rounded-lg p-4 text-xs text-gray-300 resize-none h-32 focus:outline-none" 
              defaultValue="Food shortage in Sector 7 Camp. Approximately 850 families without food for 3 days." />
          </div>

          <div className="pt-6 mt-auto border-t border-[#1F2937] flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">Reject</Button>
            <Button variant="primary" size="sm" className="px-6">Approve & Dispatch</Button>
          </div>
        </div>
      </div>

    </div>
  );
}
