'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ZoomIn, ZoomOut, RotateCcw, X, AlertTriangle } from 'lucide-react';
import { cn, urgencyConfig } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { mockNeeds } from '@/lib/mock-data';

const VIEWBOX_W = 700;
const VIEWBOX_H = 460;

function latLngToSVG(lat: number, lng: number) {
  const x = ((lng - 76.85) / (77.45 - 76.85)) * VIEWBOX_W;
  const y = VIEWBOX_H - ((lat - 28.40) / (28.85 - 28.40)) * VIEWBOX_H;
  return { x, y };
}

export function HeatmapPanel() {
  const { mapView, setMapView, selectedNeed, setSelectedNeed } = useAppStore();
  const [zoom, setZoom] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const views = ['heatmap', 'clusters', 'points'] as const;

  return (
    <div className="flex flex-col h-full bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden">
      {/* ── Header ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2937] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Layers style={{ width: 16, height: 16 }} className="text-[#3B82F6]" />
          </div>
          <span className="text-[14px] font-semibold text-[#E5E7EB]">Needs Heatmap</span>
          <span className="text-[11px] text-[#6B7280] bg-[#1F2937] px-2.5 py-0.5 rounded-full">Delhi NCR</span>
        </div>

        <div className="flex items-center bg-[#1F2937] rounded-xl p-1.5 gap-1">
          {views.map(v => (
            <button
              key={v}
              onClick={() => setMapView(v)}
              className={cn(
                'px-3.5 py-2 text-[11px] font-semibold rounded-lg capitalize transition-all',
                mapView === v
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-[#9CA3AF]'
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ── Map canvas ───────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden bg-[#0d1117]">
        {/* Grid */}
        <div className="absolute inset-0 map-grid opacity-60" />

        {/* SVG */}
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="w-full h-full"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* District outlines */}
          <path d="M100,80 L250,60 L420,90 L500,150 L480,300 L360,360 L180,365 L70,290 Z"
            fill="rgba(59,130,246,0.03)" stroke="rgba(59,130,246,0.12)" strokeWidth="1.5" />
          <path d="M250,60 L360,48 L430,90 L390,185 L270,165 Z"
            fill="rgba(139,92,246,0.03)" stroke="rgba(139,92,246,0.12)" strokeWidth="1" />
          <path d="M390,185 L480,160 L510,250 L440,290 L360,260 Z"
            fill="rgba(56,189,248,0.02)" stroke="rgba(56,189,248,0.10)" strokeWidth="1" />

          {/* Heatmap blobs */}
          {mapView === 'heatmap' && mockNeeds.map(n => {
            const { x, y } = latLngToSVG(n.location.lat, n.location.lng);
            const color = urgencyConfig[n.urgency].hex;
            const r     = 28 + (n.urgencyScore / 100) * 60;
            return (
              <g key={n.id + '-heat'}>
                <circle cx={x} cy={y} r={r * 1.6} fill={color} opacity={0.04} />
                <circle cx={x} cy={y} r={r}        fill={color} opacity={0.08} />
                <circle cx={x} cy={y} r={r * 0.5}  fill={color} opacity={0.15} />
              </g>
            );
          })}

          {/* Markers */}
          {mockNeeds.map(n => {
            const { x, y } = latLngToSVG(n.location.lat, n.location.lng);
            const color   = urgencyConfig[n.urgency].hex;
            const isHov   = hoveredId === n.id;
            const isSel   = selectedNeed?.id === n.id;
            const r       = isSel || isHov ? 11 : 8;

            return (
              <g
                key={n.id}
                onClick={() => setSelectedNeed(isSel ? null : n)}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Critical pulse ring */}
                {n.urgency === 'critical' && (
                  <circle cx={x} cy={y} r={14} fill="none" stroke={color} strokeWidth="1.5" opacity={0.5}>
                    <animate attributeName="r" values="10;26" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Selection ring */}
                {isSel && <circle cx={x} cy={y} r={r + 5} fill="none" stroke={color} strokeWidth="1.5" opacity={0.6} />}

                {/* Main dot */}
                <circle
                  cx={x} cy={y} r={r}
                  fill={color}
                  stroke="rgba(11,15,26,0.9)"
                  strokeWidth="2.5"
                  style={{ transition: 'r 0.15s ease' }}
                />

                {/* Score label */}
                <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="middle"
                  fill="white" fontSize="7.5" fontWeight="800" style={{ pointerEvents: 'none' }}>
                  {n.urgencyScore}
                </text>

                {/* Hover tooltip */}
                {isHov && !isSel && (
                  <g>
                    <rect x={x + 14} y={y - 22} width={140} height={44}
                      rx="8" fill="#111827" stroke={color} strokeWidth="1" opacity={0.97} />
                    <text x={x + 21} y={y - 7} fill="#E5E7EB" fontSize="9.5" fontWeight="700">{n.location.name}</text>
                    <text x={x + 21} y={y + 8}  fill="#9CA3AF" fontSize="8.5">
                      {n.affectedCount.toLocaleString()} affected
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* ── Zoom controls ─────────────────────────── */}
        <div className="absolute bottom-5 right-5 flex flex-col gap-2">
          {[
            { icon: ZoomIn,    onClick: () => setZoom(z => Math.min(3, z + 0.35)) },
            { icon: ZoomOut,   onClick: () => setZoom(z => Math.max(0.5, z - 0.35)) },
            { icon: RotateCcw, onClick: () => setZoom(1) },
          ].map(({ icon: Icon, onClick }, i) => (
            <button
              key={i}
              onClick={onClick}
              className="w-9 h-9 rounded-xl bg-[#111827]/90 border border-[#1F2937] flex items-center justify-center text-[#9CA3AF] hover:text-[#E5E7EB] hover:border-[#374151] transition-all backdrop-blur-sm"
            >
              <Icon style={{ width: 14, height: 14 }} />
            </button>
          ))}
        </div>

        {/* ── Legend ───────────────────────────────── */}
        <div className="absolute bottom-5 left-5 bg-[#111827]/90 border border-[#1F2937] rounded-xl px-4 py-3 backdrop-blur-sm space-y-2">
          {(Object.entries(urgencyConfig) as [string, typeof urgencyConfig[keyof typeof urgencyConfig]][]).map(([k, cfg]) => (
            <div key={k} className="flex items-center gap-2.5">
              <div className={cn('w-2 h-2 rounded-full', cfg.dot)} />
              <span className="text-[11px] text-[#9CA3AF]">{cfg.label}</span>
            </div>
          ))}
        </div>

        {/* ── Selected panel ───────────────────────── */}
        <AnimatePresence>
          {selectedNeed && (
            <motion.div
              initial={{ opacity: 0, x: 16, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute top-5 right-5 w-72 bg-[#111827]/95 border border-[#1F2937] rounded-2xl p-5 backdrop-blur-sm shadow-2xl shadow-black/40"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#E5E7EB] truncate">{selectedNeed.location.name}</p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">{selectedNeed.location.area}</p>
                </div>
                <button onClick={() => setSelectedNeed(null)} className="text-[#6B7280] hover:text-[#E5E7EB] transition-colors flex-shrink-0 mt-0.5">
                  <X style={{ width: 15, height: 15 }} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#6B7280]">Urgency Score</span>
                  <span className="text-[13px] font-black" style={{ color: urgencyConfig[selectedNeed.urgency].hex }}>
                    {selectedNeed.urgencyScore}/100
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#6B7280]">Affected</span>
                  <span className="text-[13px] font-bold text-[#E5E7EB]">{selectedNeed.affectedCount.toLocaleString()}</span>
                </div>
                <div className="h-px bg-[#1F2937]" />
                <div className="flex items-start gap-1.5">
                  <AlertTriangle style={{ width: 12, height: 12 }} className="text-[#6B7280] mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed line-clamp-3">{selectedNeed.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
