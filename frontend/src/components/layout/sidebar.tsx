'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, ShieldCheck, Activity,
  Map, ChevronLeft, Zap, Bell, Settings, AlertTriangle, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';

const navItems = [
  {
    group: 'Platform',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'NGO Dashboard', badge: '3', badgeColor: 'bg-red-500/20 text-red-400' },
      { href: '/volunteer', icon: Users,           label: 'Volunteer App', badge: null, badgeColor: '' },
      { href: '/admin',     icon: ShieldCheck,     label: 'Admin Panel',   badge: '2', badgeColor: 'bg-amber-500/20 text-amber-400' },
    ],
  },
  {
    group: 'Views',
    items: [
      { href: '/dashboard', icon: Activity, label: 'Analytics', badge: null, badgeColor: '' },
      { href: '/dashboard', icon: Map,      label: 'Heatmap',   badge: null, badgeColor: '' },
    ],
  },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const expanded = mobile ? true : sidebarOpen;

  return (
    <motion.aside
      initial={false}
      animate={{ width: expanded ? 240 : 64 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'flex-shrink-0 h-full bg-[#0B0F1A] border-r border-[#1F2937] flex flex-col z-40',
        mobile && 'fixed inset-y-0 left-0 shadow-2xl shadow-black/60'
      )}
    >
      {/* ── Logo ───────────────────────────────── */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-[#1F2937] flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-[#3B82F6] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/10">
          <Zap className="text-white fill-white" style={{ width: 16, height: 16 }} />
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div key="logo-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }} className="flex flex-col min-w-0 flex-1">
              <span className="text-[14px] font-bold text-white leading-tight whitespace-nowrap">VolunteerIQ</span>
              <span className="text-[10px] text-[#A1A1AA] whitespace-nowrap font-medium">Resource Platform</span>
            </motion.div>
          )}
        </AnimatePresence>
        {mobile && (
          <button onClick={onClose} className="ml-auto text-[#6B7280] hover:text-white transition-colors p-1">
            <X style={{ width: 18, height: 18 }} />
          </button>
        )}
      </div>

      {/* ── Nav ─────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6 min-h-0">
        {navItems.map(group => (
          <div key={group.group}>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.p key="lbl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                  {group.group}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-1">
              {group.items.map(item => {
                const active = pathname === item.href;
                return (
                  <Link key={`${item.href}-${item.label}`} href={item.href}
                    onClick={mobile ? onClose : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md transition-all group',
                      active
                        ? 'bg-[#3B82F6]/10 text-[#3B82F6]'
                        : 'text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white'
                    )}
                  >
                    <item.icon style={{ width: 18, height: 18 }}
                      className={cn('flex-shrink-0', active ? 'text-[#3B82F6]' : 'text-[#71717A] group-hover:text-[#A1A1AA]')} />
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="text-sm font-medium flex-1 whitespace-nowrap">{item.label}</motion.span>
                      )}
                    </AnimatePresence>
                    {expanded && item.badge && (
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', item.badgeColor)}>{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* ── Alert ───────────────────────────────── */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div key="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} className="pt-2 overflow-hidden flex-shrink-0">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle style={{ width: 14, height: 14 }} className="text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-red-500 leading-tight">2 Critical Needs</p>
                    <p className="text-[10px] text-red-500/40 mt-0.5 uppercase font-bold tracking-tight">Immediate Action</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>



      {/* ── Bottom ──────────────────────────────── */}
      <div className="border-t border-[#1F2937] p-4 space-y-1 flex-shrink-0">
        {[
          { icon: Bell,     label: 'Notifications' },
          { icon: Settings, label: 'Settings' },
        ].map(({ icon: Icon, label }) => (
          <button key={label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-white/[0.04] hover:text-white transition-all">
            <Icon style={{ width: 18, height: 18 }} className="flex-shrink-0" />
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.span key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-sm font-medium whitespace-nowrap">{label}</motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
        {!mobile && (
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white transition-all">
            <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.2 }}>
              <ChevronLeft style={{ width: 18, height: 18 }} className="flex-shrink-0" />
            </motion.div>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-sm font-medium whitespace-nowrap">Collapse</motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </motion.aside>
  );
}
