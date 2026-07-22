import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, School, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function StatsSection({ lang }) {
  const stats = [
    {
      id: 1,
      number: '12,000+',
      label: lang === 'EN' ? 'Active Students' : 'Siswa Aktif',
      icon: GraduationCap,
      color: 'text-[#00D4FF]',
      border: 'border-[#00D4FF]/30'
    },
    {
      id: 2,
      number: '850+',
      label: lang === 'EN' ? 'Certified Teachers' : 'Guru Bersertifikasi',
      icon: Users,
      color: 'text-[#0EA5E9]',
      border: 'border-[#0EA5E9]/30'
    },
    {
      id: 3,
      number: '240+',
      label: lang === 'EN' ? 'Partner Schools' : 'Sekolah Mitra',
      icon: School,
      color: 'text-[#00FFC8]',
      border: 'border-[#00FFC8]/30'
    },
    {
      id: 4,
      number: '99.9%',
      label: lang === 'EN' ? 'Server Uptime SLA' : 'Uptime Server',
      icon: Activity,
      color: 'text-purple-400',
      border: 'border-purple-500/30'
    }
  ];

  return (
    <section id="stats" className="relative py-20 bg-[#050816] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className={`p-8 rounded-3xl bg-[#0B1020]/90 border ${item.border} backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 group text-center relative overflow-hidden`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    <IconComp className={`w-8 h-8 ${item.color}`} />
                  </div>
                </div>
                <h3 className={`text-4xl font-extrabold mb-2 tracking-tight ${item.color}`}>
                  {item.number}
                </h3>
                <p className="text-slate-300 text-sm font-semibold">
                  {item.label}
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  REALTIME SYNCHRONIZED
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
