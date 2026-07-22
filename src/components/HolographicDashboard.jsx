import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Bell, 
  CheckCircle, 
  BrainCircuit, 
  BarChart3, 
  FileText,
  Award,
  ChevronRight
} from 'lucide-react';

export default function HolographicDashboard({ lang }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [livePulse, setLivePulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-[#0B1020]/40 overflow-hidden border-y border-[#00D4FF]/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Intro */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xs font-bold text-[#00D4FF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'EN' ? 'LIVE HOLOGRAPHIC PREVIEW' : 'PRATINJAU HOLOGRAFIK LIVE'}</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {lang === 'EN' ? 'Intelligent Real-Time Control Center' : 'Pusat Kontrol Real-Time Cerdas'}
            </h2>
            
            <p className="text-slate-300 text-base leading-relaxed">
              {lang === 'EN'
                ? 'Experience next-level school management with holographic metrics, live AI attendance tracking, automated student score predictions, and seamless schedule synchronization.'
                : 'Rasakan manajemen sekolah tingkat lanjut dengan metrik holografik, pelacakan presensi AI live, prediksi nilai siswa otomatis, dan sinkronisasi jadwal mulus.'}
            </p>

            <div className="space-y-3 pt-2">
              {[
                lang === 'EN' ? 'Live AI Attendance & Facial Recognition Log' : 'Log Presensi AI & Pengenalan Wajah Live',
                lang === 'EN' ? 'Real-time Class Schedule & Room Management' : 'Jadwal Kelas Real-Time & Manajemen Ruangan',
                lang === 'EN' ? 'Automated Academic Performance Line Graphs' : 'Grafik Performa Akademik Siswa Otomatis',
                lang === 'EN' ? 'Instant AI Assistant Suggestions & Alerts' : 'Rekomendasi & Peringatan Asisten AI Instan'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-[#00FFC8]/10 border border-[#00FFC8]/40 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00FFC8]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Interactive Tab Selector */}
            <div className="flex flex-wrap gap-2 pt-4">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'analytics' 
                    ? 'bg-[#00D4FF] text-slate-950 shadow-glow-cyan' 
                    : 'bg-[#121B2F] text-slate-300 hover:bg-white/10'
                }`}
              >
                {lang === 'EN' ? 'Student Analytics' : 'Analitik Siswa'}
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'attendance' 
                    ? 'bg-[#00FFC8] text-slate-950 shadow-glow-turquoise' 
                    : 'bg-[#121B2F] text-slate-300 hover:bg-white/10'
                }`}
              >
                {lang === 'EN' ? 'Attendance' : 'Presensi QR'}
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'schedule' 
                    ? 'bg-[#0EA5E9] text-white shadow-glow-blue' 
                    : 'bg-[#121B2F] text-slate-300 hover:bg-white/10'
                }`}
              >
                {lang === 'EN' ? 'Class Schedule' : 'Jadwal'}
              </button>
            </div>

          </div>

          {/* Right Floating Holographic Dashboard Mockup */}
          <div className="lg:col-span-7 relative">
            
            {/* Glowing Backdrop Frame */}
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#00D4FF] via-[#0EA5E9] to-[#00FFC8] opacity-30 blur-2xl animate-pulse"></div>

            <div className="relative rounded-3xl bg-[#0B1020]/90 border border-[#00D4FF]/40 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
              
              {/* Top Bar of Mock Dashboard */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">SmartSchool_Core_v1.0.4 // Live_Node</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#00FFC8]/10 text-[#00FFC8] border border-[#00FFC8]/30">
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#00FFC8] ${livePulse ? 'animate-ping' : ''}`}></span>
                    AI Engine Syncing
                  </span>
                </div>
              </div>

              {/* Grid Widgets Inside Holographic Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                
                {/* Widget 1: Attendance Rate */}
                <div className="p-4 rounded-2xl bg-[#121B2F]/80 border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">Daily Attendance</span>
                    <Activity className="w-4 h-4 text-[#00D4FF]" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">98.6%</span>
                    <span className="text-xs font-bold text-[#00FFC8] flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +2.4%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#00D4FF] to-[#00FFC8] h-full rounded-full w-[98.6%] animate-pulse"></div>
                  </div>
                </div>

                {/* Widget 2: AI Performance Prediction */}
                <div className="p-4 rounded-2xl bg-[#121B2F]/80 border border-[#00FFC8]/20 hover:border-[#00FFC8]/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">AI Student Performance</span>
                    <BrainCircuit className="w-4 h-4 text-[#00FFC8]" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">A+ High</span>
                    <span className="text-xs font-medium text-slate-400">Predicted GPA: 3.94</span>
                  </div>
                  <p className="text-[10px] text-[#00FFC8] mt-2 font-mono">
                    94% Mastery in Physics & Calculus
                  </p>
                </div>

              </div>

              {/* Holographic Performance Line Chart */}
              <div className="p-5 rounded-2xl bg-[#121B2F]/90 border border-white/10 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#00D4FF]" />
                    Academic Growth Index (2026)
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">Updated 2m ago</span>
                </div>

                {/* Animated SVG Line Chart */}
                <div className="h-32 w-full relative flex items-end justify-between gap-2 pt-4 px-2">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#00D4FF" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,80 Q 80,20 160,50 T 320,15 T 400,30"
                      fill="none"
                      stroke="#00D4FF"
                      strokeWidth="3"
                    />
                    <path
                      d="M 0,80 Q 80,20 160,50 T 320,15 T 400,30 L 400,100 L 0,100 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>

                  {/* Sample Glowing Data Points */}
                  {[
                    { month: 'Jan', val: '88%' },
                    { month: 'Feb', val: '91%' },
                    { month: 'Mar', val: '94%' },
                    { month: 'Apr', val: '97%' },
                    { month: 'May', val: '99%' }
                  ].map((pt, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center group">
                      <div className="w-3 h-3 rounded-full bg-[#00FFC8] border-2 border-[#050816] shadow-glow-turquoise group-hover:scale-125 transition-transform cursor-pointer"></div>
                      <span className="text-[10px] text-slate-400 mt-2 font-mono">{pt.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Today's Schedule & AI Assistant Prompt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Schedule Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200">Advanced AI & Robotics</p>
                      <span className="text-[10px] text-slate-400">Lab 3B • 10:30 AM - 12:00 PM</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00D4FF]/20 text-[#00D4FF]">Live</span>
                </div>

                {/* AI Tutor Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00D4FF]/10 to-[#00FFC8]/10 border border-[#00FFC8]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#00FFC8]/20 text-[#00FFC8]">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">AI Grading Ready</p>
                      <span className="text-[10px] text-slate-300">42 Essays Auto-Scored</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#00FFC8]" />
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
