import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Cloud, 
  BrainCircuit, 
  Smile, 
  Layout, 
  Smartphone, 
  Monitor, 
  Building2,
  CheckCircle
} from 'lucide-react';

export default function WhyChooseUs({ lang }) {
  const reasons = [
    {
      title: 'Fast',
      icon: Zap,
      desc: lang === 'EN' ? 'Sub-second response times, lightning cached data, and zero latency UI.' : 'Waktu respon sub-detik, pengenalan data kilat, dan UI tanpa delay.',
      glow: 'border-[#00D4FF]/40 text-[#00D4FF]'
    },
    {
      title: 'Secure',
      icon: ShieldCheck,
      desc: lang === 'EN' ? 'Bank-grade AES-256 encryption, biometrics, and Granular Role-Based Access.' : 'Enkripsi AES-256 standar bank, otentikasi biometrik, dan akses terisolasi.',
      glow: 'border-green-500/40 text-green-400'
    },
    {
      title: 'Cloud Based',
      icon: Cloud,
      desc: lang === 'EN' ? 'Zero hardware setup needed. Access seamlessly from anywhere worldwide.' : 'Tanpa perlu server lokal. Akses kapan saja dari seluruh dunia via cloud.',
      glow: 'border-[#0EA5E9]/40 text-[#0EA5E9]'
    },
    {
      title: 'AI Powered',
      icon: BrainCircuit,
      desc: lang === 'EN' ? 'Integrated Luly AI engine for automated grading, tutoring, and analytics.' : 'Kecerdasan buatan terintegrasi untuk penilaian, tutor, dan analisis.',
      glow: 'border-[#00FFC8]/40 text-[#00FFC8]'
    },
    {
      title: 'Easy to Use',
      icon: Smile,
      desc: lang === 'EN' ? 'Intuitive workflow requires zero training for teachers, students, or parents.' : 'Alur kerja intuitif tanpa perlu pelatihan rumit untuk guru dan orang tua.',
      glow: 'border-yellow-500/40 text-yellow-400'
    },
    {
      title: 'Modern Interface',
      icon: Layout,
      desc: lang === 'EN' ? 'Apple + Vercel + Linear level aesthetic, dark mode glassmorphism UI.' : 'Estetika setingkat Apple + Vercel + Linear dengan glassmorphism UI.',
      glow: 'border-purple-500/40 text-purple-400'
    },
    {
      title: 'Responsive',
      icon: Smartphone,
      desc: lang === 'EN' ? 'Pixel-perfect layout adapting seamlessly to mobile, tablet, and desktop.' : 'Tampilan responsif presisi piksel di HP, tablet, maupun laptop.',
      glow: 'border-pink-500/40 text-pink-400'
    },
    {
      title: 'Multi Device',
      icon: Monitor,
      desc: lang === 'EN' ? 'Simultaneous multi-tab sync across iOS, Android, macOS, and Windows.' : 'Sinkronisasi multi-perangkat bersamaan di iOS, Android, Mac, & Windows.',
      glow: 'border-cyan-400/40 text-cyan-300'
    },
    {
      title: 'Enterprise Ready',
      icon: Building2,
      desc: lang === 'EN' ? 'Designed for scaling to hundreds of campuses with multi-tenant architecture.' : 'Siap untuk skala ratusan kampus dengan arsitektur multi-tenant.',
      glow: 'border-indigo-500/40 text-indigo-400'
    }
  ];

  return (
    <section id="why-us" className="relative py-24 bg-[#0B1020]/60 border-t border-[#00D4FF]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-[#00FFC8] bg-[#00FFC8]/10 border border-[#00FFC8]/30 uppercase tracking-widest">
            {lang === 'EN' ? 'UNMATCHED ADVANTAGES' : 'KEUNGGULAN UTAMA'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            {lang === 'EN' ? 'Why Choose SmartSchool Portal v1?' : 'Mengapa Memilih SmartSchool Portal v1?'}
          </h2>
          <p className="text-slate-300 text-base">
            {lang === 'EN'
              ? 'Engineered by Luly Agency with 9 foundational pillars of educational excellence.'
              : 'Dirancang oleh Luly Agency dengan 9 pilar utama keunggulan teknologi pendidikan.'}
          </p>
        </div>

        {/* 9 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-3xl bg-[#050816]/90 border ${item.glow} backdrop-blur-xl shadow-xl hover:-translate-y-2 transition-all duration-300 group flex items-start gap-4`}
              >
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 shrink-0 group-hover:scale-110 transition-transform ${item.glow.split(' ')[1]}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00D4FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
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
