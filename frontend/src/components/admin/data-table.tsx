'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Trash2, ChevronUp, ChevronDown, MoreHorizontal, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { cn, urgencyConfig, categoryConfig } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockNeeds } from '@/lib/mock-data';

type SortField = 'urgencyScore' | 'affectedCount' | 'reportedAt' | 'category';
type SortDir   = 'asc' | 'desc';

export function DataTable() {
  const [search,  setSearch]  = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('urgencyScore');
  const [sortDir,   setSortDir]   = useState<SortDir>('desc');
  const [urgFilter, setUrgFilter] = useState('all');

  const handleSort = (f: SortField) => {
    if (sortField === f) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(f); setSortDir('desc'); }
  };

  let filtered = mockNeeds.filter(n =>
    (urgFilter === 'all' || n.urgency === urgFilter) &&
    (n.description.toLowerCase().includes(search.toLowerCase()) || n.location.name.toLowerCase().includes(search.toLowerCase()))
  );
  filtered = [...filtered].sort((a, b) => {
    let av: any = a[sortField as keyof typeof a];
    let bv: any = b[sortField as keyof typeof b];
    if (typeof av === 'string') { av = av.toLowerCase(); bv = (b[sortField as keyof typeof b] as string).toLowerCase(); }
    return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });

  const allSel   = selected.size === filtered.length && filtered.length > 0;
  const toggleAll = () => setSelected(allSel ? new Set() : new Set(filtered.map(n => n.id)));
  const toggle    = (id: string) => setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField !== field
      ? <ArrowUpDown style={{ width: 11, height: 11 }} className="text-[#374151]" />
      : sortDir === 'asc'
        ? <ChevronUp   style={{ width: 11, height: 11 }} className="text-[#3B82F6]" />
        : <ChevronDown style={{ width: 11, height: 11 }} className="text-[#3B82F6]" />;

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 px-6 py-5 border-b border-[#1F2937]">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search style={{ width: 14, height: 14 }} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search needs or locations…"
            className="w-full h-10 pl-10 pr-4 bg-[#1F2937] border border-[#374151] rounded-xl text-[12px] text-[#E5E7EB] placeholder-[#6B7280] outline-none focus:border-[#3B82F6]/50 transition-colors" />
        </div>

        {/* Urgency filter chips */}
        <div className="flex items-center gap-1.5 bg-[#1F2937] rounded-xl p-1.5">
          {['all', 'critical', 'high', 'medium', 'low'].map(u => (
            <button key={u} onClick={() => setUrgFilter(u)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all',
                urgFilter === u
                  ? u === 'all' ? 'bg-[#3B82F6] text-white' : `${urgencyConfig[u as keyof typeof urgencyConfig]?.bg} ${urgencyConfig[u as keyof typeof urgencyConfig]?.color}`
                  : 'text-[#6B7280] hover:text-[#9CA3AF]'
              )}>
              {u}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 ml-auto">
          <AnimatePresence>
            {selected.size > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center gap-2.5">
                <span className="text-[12px] text-[#9CA3AF]">{selected.size} selected</span>
                <Button variant="danger" size="xs" icon={<Trash2 style={{ width: 12, height: 12 }} />}>Delete</Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="secondary" size="sm" icon={<Download style={{ width: 14, height: 14 }} />}>Export</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1F2937]">
              <th className="w-12 px-6 py-3.5">
                <input type="checkbox" checked={allSel} onChange={toggleAll}
                  className="w-4 h-4 rounded border border-[#374151] bg-transparent accent-[#3B82F6] cursor-pointer" />
              </th>
              {[
                { label: 'Description',     field: null              },
                { label: 'Category',        field: 'category' as SortField       },
                { label: 'Urgency',         field: null              },
                { label: 'Score',           field: 'urgencyScore' as SortField   },
                { label: 'Affected',        field: 'affectedCount' as SortField  },
                { label: 'Location',        field: null              },
                { label: 'Reported',        field: 'reportedAt' as SortField     },
                { label: '',                field: null              },
              ].map(({ label, field }) => (
                <th key={label} className="px-4 py-3.5 text-left text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                  {field ? (
                    <button onClick={() => handleSort(field)} className="flex items-center gap-1.5 hover:text-[#9CA3AF] transition-colors">
                      {label} <SortIcon field={field} />
                    </button>
                  ) : label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F2937]">
            <AnimatePresence>
              {filtered.map((n, i) => {
                const cfg    = urgencyConfig[n.urgency];
                const catCfg = categoryConfig[n.category];
                const isSel  = selected.has(n.id);
                return (
                  <motion.tr key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className={cn('group transition-colors', isSel ? 'bg-[#3B82F6]/5' : 'hover:bg-[#1F2937]/50')}>
                    <td className="w-12 px-6 py-4">
                      <input type="checkbox" checked={isSel} onChange={() => toggle(n.id)}
                        className="w-4 h-4 rounded border border-[#374151] bg-transparent accent-[#3B82F6] cursor-pointer" />
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-[12px] font-medium text-[#E5E7EB] max-w-[240px] truncate">{n.description}</p>
                      <p className="text-[11px] text-[#6B7280] mt-1">by {n.reportedBy}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
                        {catCfg.icon} {catCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="urgency" urgency={n.urgency} dot>{cfg.label}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn('text-[15px] font-black tabular-nums', cfg.color)}>{n.urgencyScore}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[13px] font-semibold text-[#E5E7EB] tabular-nums">{n.affectedCount.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-[12px] text-[#9CA3AF]">{n.location.name}</p>
                      <p className="text-[11px] text-[#6B7280] mt-0.5">{n.location.area}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-[11px] text-[#6B7280]">{new Date(n.reportedAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg hover:bg-[#374151] flex items-center justify-center">
                        <MoreHorizontal style={{ width: 14, height: 14 }} className="text-[#6B7280]" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#1F2937]">
        <span className="text-[12px] text-[#6B7280]">{filtered.length} of {mockNeeds.length} records</span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map(p => (
            <button key={p} className={cn('w-9 h-9 rounded-xl text-[12px] font-semibold transition-all',
              p === 1 ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-[#6B7280] hover:bg-[#1F2937]')}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
