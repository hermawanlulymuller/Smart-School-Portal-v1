import React, { useState } from 'react';
import { 
  GraduationCap, 
  Presentation, 
  ShieldCheck, 
  X, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  DollarSign, 
  Bell, 
  Bot, 
  LogOut,
  Sparkles,
  BarChart2,
  CheckSquare
} from 'lucide-react';

export default function PortalDashboardModal({ role, onClose, lang }) {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#050816]/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in">
      
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#0B1020] border border-[#00D4FF]/40 shadow-2xl p-6 sm:p-8 overflow-hidden min-h-[600px] flex flex-col justify-between">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
              {role === 'Student' ? <GraduationCap className="w-6 h-6" /> :
               role === 'Teacher' ? <Presentation className="w-6 h-6" /> :
               <ShieldCheck className="w-6 h-6 text-purple-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {role} Portal - {lang === 'EN' ? 'Live Workspace' : 'Area Kerja Live'}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#00FFC8]/10 text-[#00FFC8] border border-[#00FFC8]/30">
                  {lang === 'EN' ? 'Authenticated' : 'Terverifikasi'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {role === 'Student' ? 'Alex Rivera (ID: STU-2026-889)' :
                 role === 'Teacher' ? 'Sarah Jenkins, M.Sc (ID: TCH-102)' :
                 'Dr. Raymond Vance (Administrator General)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'EN' ? 'Exit Portal' : 'Keluar Portal'}</span>
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === 'overview' ? 'bg-[#00D4FF] text-slate-950 shadow-glow-cyan' : 'bg-white/5 text-slate-300'
            }`}
          >
            {lang === 'EN' ? 'Overview' : 'Ringkasan'}
          </button>
          {role === 'Student' && (
            <>
              <button
                onClick={() => setActiveSubTab('courses')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'courses' ? 'bg-[#00D4FF] text-slate-950' : 'bg-white/5 text-slate-300'
                }`}
              >
                {lang === 'EN' ? 'My Courses & E-Books' : 'Mata Pelajaran & E-Book'}
              </button>
              <button
                onClick={() => setActiveSubTab('grades')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'grades' ? 'bg-[#00FFC8] text-slate-950' : 'bg-white/5 text-slate-300'
                }`}
              >
                {lang === 'EN' ? 'Grades & Certificates' : 'Nilai & Sertifikat'}
              </button>
            </>
          )}
          {role === 'Teacher' && (
            <>
              <button
                onClick={() => setActiveSubTab('grading')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'grading' ? 'bg-[#0EA5E9] text-white' : 'bg-white/5 text-slate-300'
                }`}
              >
                {lang === 'EN' ? 'AI Essay Grading' : 'Penilaian AI Esai'}
              </button>
              <button
                onClick={() => setActiveSubTab('rpp')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'rpp' ? 'bg-[#00FFC8] text-slate-950' : 'bg-white/5 text-slate-300'
                }`}
              >
                {lang === 'EN' ? 'AI Lesson Planner (RPP)' : 'RPP AI Auto'}
              </button>
            </>
          )}
          {role === 'Administrator' && (
            <>
              <button
                onClick={() => setActiveSubTab('finance')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'finance' ? 'bg-purple-500 text-white' : 'bg-white/5 text-slate-300'
                }`}
              >
                {lang === 'EN' ? 'School Finance & SPP' : 'Keuangan Sekolah'}
              </button>
              <button
                onClick={() => setActiveSubTab('users')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'users' ? 'bg-[#00D4FF] text-slate-950' : 'bg-white/5 text-slate-300'
                }`}
              >
                {lang === 'EN' ? 'User Permissions (RBAC)' : 'Hak Akses Pengguna'}
              </button>
            </>
          )}
        </div>

        {/* Dashboard Content Areas */}
        <div className="flex-1 space-y-6">
          
          {/* STUDENT OVERVIEW */}
          {role === 'Student' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#00D4FF]/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Current Semester GPA</span>
                  <Award className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">3.94 / 4.00</h4>
                <p className="text-xs text-[#00FFC8]">Top 1% Student Standing</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#00FFC8]/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Attendance Record</span>
                  <CheckCircle className="w-4 h-4 text-[#00FFC8]" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">99.2%</h4>
                <p className="text-xs text-slate-300">0 Absence • 1 Permitted</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>AI Tutor Credits</span>
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">Unlimited</h4>
                <p className="text-xs text-purple-300">Luly Agency Premium Tier</p>
              </div>

              <div className="md:col-span-3 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00D4FF]" />
                  Active Courses & Progress
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#050816] border border-white/10">
                    <div className="flex justify-between mb-1 font-bold text-white">
                      <span>Advanced Physics</span>
                      <span className="text-[#00D4FF]">95%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-[#00D4FF] h-2 rounded-full w-[95%]"></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#050816] border border-white/10">
                    <div className="flex justify-between mb-1 font-bold text-white">
                      <span>Robotics & Computer Science</span>
                      <span className="text-[#00FFC8]">98%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-[#00FFC8] h-2 rounded-full w-[98%]"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TEACHER OVERVIEW */}
          {role === 'Teacher' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#0EA5E9]/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Assigned Classes</span>
                  <Users className="w-4 h-4 text-[#0EA5E9]" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">6 Classes</h4>
                <p className="text-xs text-slate-300">184 Total Students</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#00FFC8]/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>AI Auto-Graded Essays</span>
                  <Sparkles className="w-4 h-4 text-[#00FFC8]" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">142 Pending</h4>
                <p className="text-xs text-[#00FFC8]">Saved ~12 Hours This Week</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Lesson Plans (RPP)</span>
                  <CheckSquare className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">100% Complete</h4>
                <p className="text-xs text-purple-300">Kurikulum Merdeka Standard</p>
              </div>

              <div className="md:col-span-3 p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-bold text-white mb-3">Recent AI Grading Submissions</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#050816] flex justify-between items-center text-slate-200">
                    <span>Physics Essay: "Quantum Entanglement Applications"</span>
                    <span className="text-[#00FFC8] font-bold">Auto-Scored 96/100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#050816] flex justify-between items-center text-slate-200">
                    <span>Mathematics Quiz: "Multivariable Calculus"</span>
                    <span className="text-[#00D4FF] font-bold">Auto-Scored 92/100</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ADMIN OVERVIEW */}
          {role === 'Administrator' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-[#121B2F] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Monthly Tuition Collected</span>
                  <DollarSign className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">$428,500</h4>
                <p className="text-xs text-[#00FFC8]">97.8% Collection Rate</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#00D4FF]/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>System Users</span>
                  <Users className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">12,850</h4>
                <p className="text-xs text-slate-300">Active Students & Teachers</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-green-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Infrastructure Status</span>
                  <BarChart2 className="w-4 h-4 text-green-400" />
                </div>
                <h4 className="text-3xl font-extrabold text-white">Healthy</h4>
                <p className="text-xs text-green-400">Vercel Edge Network 100%</p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>SmartSchool Portal v1 • Designed by Luly Agency</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#00D4FF] text-slate-950 font-bold hover:bg-[#00D4FF]/90 transition-all shadow-glow-cyan"
          >
            Back to Landing Page
          </button>
        </div>

      </div>
    </div>
  );
}
