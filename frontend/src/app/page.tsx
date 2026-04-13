'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, ArrowRight, BarChart2, Users, ShieldCheck,
  CheckCircle, Target, Clock, Activity, Heart
} from 'lucide-react';

const STATS = [
  { value: '2,847', label: 'People Helped', icon: Heart },
  { value: '94',    label: 'Tasks Active',  icon: Target },
  { value: '38min', label: 'Avg Response',  icon: Clock },
  { value: '98.2%', label: 'Match Success', icon: Activity },
];

const MODULES = [
  {
    href: '/dashboard',
    title: 'NGO Dashboard',
    desc: 'The mission control for crisis response. Real-time heatmaps, predictive analytics, and automated task pipelines.',
    icon: BarChart2,
    features: ['Real-time Heatmapping', 'Automated Triage', 'Impact Forecasting'],
  },
  {
    href: '/volunteer',
    title: 'Volunteer App',
    desc: 'Seamless field operations. AI-matched tasks, smart routing, and instant evidence-of-work protocols.',
    icon: Users,
    features: ['Dynamic Skill Matching', 'Live Task Feed', 'Impact Reputation'],
  },
  {
    href: '/admin',
    title: 'Admin Intelligence',
    desc: 'Unified oversight and data integrity. High-precision OCR report processing and secure systems management.',
    icon: ShieldCheck,
    features: ['OCR Validation', 'Bulk Ingestion', 'Audit Logging'],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white font-sans selection:bg-[#3B82F6]/30">
      {/* ── Nav ──────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1F2937] bg-[#0B0F1A]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center flex-shrink-0">
              <Zap style={{ width: 16, height: 16 }} className="text-white fill-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">VolunteerIQ</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-opacity">Login</Link>
            <Link href="/dashboard" className="flex items-center gap-2 h-9 px-4 rounded-md bg-[#3B82F6] text-white text-sm font-semibold hover:bg-blue-600 transition-colors">
              Launch App <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="min-h-screen flex flex-col items-center justify-center py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
                Smart Resource <span className="text-[#3B82F6]">Allocation</span> for Social Impact
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Unifying NGOs and volunteers through a secure, high-intelligence platform. 
                Turn community data into rapid triage and life-saving coordination.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#3B82F6] text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/10">
                  Explore Dashboard
                </Link>
                <Link href="/volunteer" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#111827] border border-[#1F2937] text-white font-semibold hover:bg-[#1C2636] transition-colors">
                  Volunteer Portal
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-24 border-y border-[#1F2937] bg-[#0B0F1A]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <div key={s.label} className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col items-center gap-2">
                  <s.icon className="w-5 h-5 text-[#3B82F6]" />
                  <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-24 bg-[#0B0F1A]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold tracking-tight">Enterprise Infrastructure</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Coordinate disaster relief and volunteer networks at scale with precision-engineered tools.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {MODULES.map((mod) => (
                <Link key={mod.href} href={mod.href} className="group flex flex-col outline-none overflow-hidden">
                  <div className="flex-1 bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:scale-[1.02] transition-all duration-200 flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mb-6 text-[#3B82F6]">
                      <mod.icon style={{ width: 22, height: 22 }} />
                    </div>

                    <h3 className="text-xl font-semibold mb-3">{mod.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{mod.desc}</p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {mod.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                          <CheckCircle style={{ width: 14, height: 14 }} className="text-[#3B82F6] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6]">
                      Launch Module <ArrowRight style={{ width: 14, height: 14 }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="py-12 border-t border-[#1F2937] bg-[#0B0F1A]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#3B82F6] flex items-center justify-center">
              <Zap style={{ width: 12, height: 12 }} className="text-white fill-white" />
            </div>
            <span className="text-base font-semibold tracking-tight">VolunteerIQ</span>
          </div>
          
          <p className="text-sm text-gray-500">© 2026 VolunteerIQ Platform. All rights reserved.</p>

          <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/5 border border-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
