'use client';

import { Bell, Search, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sidebar } from './sidebar';

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const notifications = [
  { id: 1, text: 'Critical need reported in Sector 7', time: '2m ago',  dot: 'bg-red-500' },
  { id: 2, text: 'Volunteer Riya accepted Task T-002',  time: '14m ago', dot: 'bg-emerald-500' },
  { id: 3, text: 'OCR report pending review',           time: '1h ago',  dot: 'bg-amber-500' },
];

export function Topbar({ title, subtitle, actions }: TopbarProps) {
  const [searchOpen, setSearchOpen]  = useState(false);
  const [notifOpen, setNotifOpen]    = useState(false);
  const [mobileNav, setMobileNav]    = useState(false);

  return (
    <>
      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileNav(false)} className="sidebar-overlay lg:hidden" />
            <motion.div key="drawer" initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <Sidebar mobile onClose={() => setMobileNav(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Topbar */}
      <header className="h-16 border-b border-[#1F2937] flex items-center justify-between px-6 gap-4 flex-shrink-0 bg-[#0B0F1A]/80 backdrop-blur-md z-40">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => setMobileNav(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:bg-white/[0.04] hover:text-white transition-all flex-shrink-0">
            <Menu style={{ width: 18, height: 18 }} />
          </button>
          <div className="min-w-0">
            <h1 className="text-[15px] font-semibold text-white leading-tight truncate">{title}</h1>
            {subtitle && <p className="text-[11px] text-[#6B7280] truncate hidden sm:block">{subtitle}</p>}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Search */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input key="s" initial={{ width: 0, opacity: 0 }} animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.18 }}
                  autoFocus onBlur={() => setSearchOpen(false)}
                  placeholder="Search…"
                  className="absolute right-9 h-8 bg-[#18181B] border border-white/[0.08] rounded-md px-3 text-xs text-white placeholder-[#A1A1AA] outline-none focus:border-[#3B82F6]/50 transition-colors"
                />
              )}
            </AnimatePresence>
            <button onClick={() => setSearchOpen(v => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-white/[0.04] hover:text-white transition-all">
              {searchOpen ? <X style={{ width: 16, height: 16 }} /> : <Search style={{ width: 16, height: 16 }} />}
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setNotifOpen(v => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white transition-all relative">
              <Bell style={{ width: 16, height: 16 }} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div key="n" initial={{ opacity: 0, y: 4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }} transition={{ duration: 0.12 }}
                  className="absolute right-0 top-10 w-80 bg-[#18181B] border border-white/[0.06] rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
                    <span className="text-[13px] font-semibold text-white">Notifications</span>
                    <button className="text-[11px] text-blue-400 hover:underline">Mark all read</button>
                  </div>
                  <div className="divide-y divide-white/[0.04]">
                    {notifications.map(n => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer">
                        <div className={`w-1.5 h-1.5 rounded-full ${n.dot} mt-1.5 flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#E5E7EB] leading-snug">{n.text}</p>
                          <p className="text-[10px] text-[#A1A1AA] mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User */}
          <div className="flex items-center gap-2 pl-3 ml-2 border-l border-white/[0.04] cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-[#18181B] border border-white/[0.08] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">N</div>
            <div className="hidden sm:flex flex-col justify-center">
              <p className="text-xs font-semibold text-white leading-none mb-1">NGO Coordinator</p>
              <p className="text-[10px] text-[#A1A1AA] leading-none">Delhi Relief Fund</p>
            </div>
            <ChevronDown style={{ width: 14, height: 14 }} className="text-[#A1A1AA] hidden sm:block ml-1" />
          </div>

          {actions}
        </div>
      </header>
    </>
  );
}
