import React from 'react';
import { 
  GraduationCap, 
  Presentation, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function PortalCards({ onOpenLogin, lang }) {
  const portals = [
    {
      id: 'Student',
      title: lang === 'EN' ? 'Student Portal' : 'Portal Siswa',
      badge: 'LEARNER ECOSYSTEM',
      icon: GraduationCap,
      description: lang === 'EN'
        ? 'Access learning materials, assignments, attendance, grades, schedules, AI tutor, and digital certificates.'
        : 'Akses materi pembelajaran, tugas, presensi, nilai, jadwal, AI tutor, dan sertifikat digital.',
      features: [
        'AI Personalized Tutor 24/7',
        'Digital Certificate Vault',
        'Live Class Schedule & Exam Room',
        'Smart Grade Analytics'
      ],
      buttonText: lang === 'EN' ? 'Login as Student' : 'Masuk sebagai Siswa',
      glowColor: 'cyan',
      cardBorder: 'border-[#00D4FF]/40 hover:border-[#00D4FF]',
      btnBg: 'bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-slate-950 shadow-glow-cyan',
      iconBg: 'bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/30',
      badgeColor: 'text-[#00D4FF] bg-[#00D4FF]/10 border-[#00D4FF]/20'
    },
    {
      id: 'Teacher',
      title: lang === 'EN' ? 'Teacher Portal' : 'Portal Guru',
      badge: 'EDUCATOR DASHBOARD',
      icon: Presentation,
      description: lang === 'EN'
        ? 'Manage classes, attendance, exams, AI grading, lesson plans, assignments, announcements, and student analytics.'
        : 'Kelola kelas, presensi, ujian, penilaian AI, RPP/modul ajar, tugas, pengumuman, dan analitik siswa.',
      features: [
        'Automated AI Essay Scoring',
        '1-Click AI Lesson Planner',
        'Class Attendance & QR Monitor',
        'Student Behavioral Insights'
      ],
      buttonText: lang === 'EN' ? 'Login as Teacher' : 'Masuk sebagai Guru',
      glowColor: 'blue',
      cardBorder: 'border-[#0EA5E9]/40 hover:border-[#0EA5E9]',
      btnBg: 'bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white shadow-glow-blue',
      iconBg: 'bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/30',
      badgeColor: 'text-[#0EA5E9] bg-[#0EA5E9]/10 border-[#0EA5E9]/20'
    },
    {
      id: 'Administrator',
      title: lang === 'EN' ? 'Administrator Portal' : 'Portal Administrator',
      badge: 'ENTERPRISE COMMAND',
      icon: ShieldCheck,
      description: lang === 'EN'
        ? 'Complete school management, finance, HR, academic reports, user management, permissions, and analytics.'
        : 'Manajemen sekolah menyeluruh, keuangan, HR, laporan akademik, manajemen pengguna, hak akses, dan analitik.',
      features: [
        'Real-time Financial Dashboard',
        'HR & Teacher Performance KPI',
        'Role & Permission Control (RBAC)',
        'School-wide Predictive Analytics'
      ],
      buttonText: lang === 'EN' ? 'Login as Administrator' : 'Masuk sebagai Admin',
      glowColor: 'purple',
      cardBorder: 'border-purple-500/40 hover:border-purple-400',
      btnBg: 'bg-gradient-to-r from-purple-500 via-[#00D4FF] to-[#00FFC8] text-slate-950 shadow-glow-purple',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <section id="portals" className="relative py-24 bg-[#050816] overflow-hidden">
      
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1020] border border-[#00D4FF]/30 text-xs font-semibold text-[#00D4FF] mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>{lang === 'EN' ? 'SECURE PORTAL ACCESS' : 'AKSES PORTAL TERPROTEKSI'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            {lang === 'EN' ? 'Choose Your Access Portal' : 'Pilih Portal Akses Anda'}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {lang === 'EN'
              ? 'Role-tailored dashboards equipped with specialized AI tools and real-time enterprise management.'
              : 'Dashboard yang dirancang khusus untuk setiap peran, dilengkapi alat AI cerdas dan manajemen real-time.'}
          </p>
        </div>

        {/* 3 Floating Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <div
                key={portal.id}
                className={`relative rounded-3xl p-8 bg-[#0B1020]/80 border ${portal.cardBorder} backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group`}
              >
                {/* Glow Overlay */}
                <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-b ${
                  portal.glowColor === 'cyan' ? 'from-[#00D4FF]/20' :
                  portal.glowColor === 'blue' ? 'from-[#0EA5E9]/20' :
                  'from-purple-500/20'
                } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-xl`}></div>

                <div>
                  {/* Top Badge & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${portal.badgeColor}`}>
                      {portal.badge}
                    </span>
                    <div className={`p-4 rounded-2xl border ${portal.iconBg} shadow-inner`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {portal.description}
                  </p>

                  {/* Highlight Features Checklist */}
                  <div className="space-y-2.5 mb-8 border-t border-white/10 pt-6">
                    {portal.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00FFC8] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login Button */}
                <div>
                  <button
                    onClick={() => onOpenLogin(portal.id)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${portal.btnBg} group-hover:scale-[1.02]`}
                  >
                    <span>{portal.buttonText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-3 font-mono">
                    2FA Enabled • Biometric & QR Ready
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
