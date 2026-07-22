import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Bot, 
  BrainCircuit,
  Zap,
  Play,
  Layers
} from 'lucide-react';

export default function Hero({ onOpenLogin, lang }) {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      
      {/* Background Aurora Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#00D4FF]/20 via-[#0EA5E9]/15 to-[#00FFC8]/15 rounded-full blur-[140px] pointer-events-none animate-aurora"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#00D4FF]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Container - Centered */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Top Pill Badge: Powered by Luly Agency */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1020]/90 border border-[#00D4FF]/30 shadow-glow-cyan mb-8 backdrop-blur-xl group hover:border-[#00FFC8] transition-all">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFC8]"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {lang === 'EN' ? 'Enterprise Next-Gen Platform' : 'Platform Enterprise Generasi Baru'}
            </span>
            <span className="text-slate-600">•</span>
            <a href="https://luly.agency" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#00D4FF] hover:text-[#00FFC8] transition-colors flex items-center gap-1">
              <span>Powered by Luly Agency</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Centered Modern Graduation Cap Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative group cursor-pointer">
              {/* Glowing Ambient Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF] via-[#0EA5E9] to-[#00FFC8] rounded-3xl blur-md opacity-65 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
              
              <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#0B1020] border border-[#00D4FF]/50 shadow-2xl backdrop-blur-xl transform group-hover:scale-105 transition-all duration-300">
                <GraduationCap className="w-12 h-12 sm:w-14 sm:h-14 text-[#00D4FF] group-hover:text-[#00FFC8] transition-colors duration-300 drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
                <div className="absolute bottom-2 px-2 py-0.5 rounded-full bg-[#050816] text-[10px] font-mono font-bold text-[#00FFC8] border border-[#00FFC8]/30">
                  AI v1
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight sm:leading-none">
            <span className="block mb-2">SmartSchool</span>
            <span className="gradient-text-cyan block">Portal v1</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-6 max-w-2xl mx-auto tracking-wide">
            {lang === 'EN' ? 'The Future of Intelligent School Management' : 'Masa Depan Manajemen Sekolah Cerdas Berbasis AI'}
          </p>

          {/* Small Description */}
          <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            {lang === 'EN' 
              ? 'One unified platform to connect students, teachers, administrators, parents, and school management with AI-powered education tools.'
              : 'Satu platform terpadu untuk menghubungkan siswa, guru, administrator, orang tua, dan manajemen sekolah dengan alat pendidikan bertenaga kecerdasan buatan.'
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            
            {/* CTA 1: Login Now */}
            <button
              onClick={() => onOpenLogin('Student')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-[#00D4FF] via-[#0EA5E9] to-[#00FFC8] hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl group"
            >
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
              <span>{lang === 'EN' ? 'Login Now' : 'Masuk Sekarang'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CTA 2: Explore Features */}
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-[#0B1020]/90 hover:bg-[#121B2F] border border-[#00D4FF]/30 hover:border-[#00FFC8] transition-all duration-300 shadow-lg backdrop-blur-xl group"
            >
              <Layers className="w-5 h-5 text-[#00D4FF] group-hover:text-[#00FFC8] transition-colors" />
              <span>{lang === 'EN' ? 'Explore Features' : 'Eksplorasi Fitur'}</span>
            </a>

            {/* Secondary CTA: AI Sandbox */}
            <a
              href="#ai-features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-[#00FFC8] hover:bg-[#00FFC8]/10 border border-[#00FFC8]/20 transition-all duration-300"
            >
              <BrainCircuit className="w-5 h-5 text-[#00FFC8]" />
              <span>{lang === 'EN' ? 'AI Playground' : 'Uji Coba AI'}</span>
            </a>

          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-3xl bg-[#0B1020]/60 border border-white/10 backdrop-blur-xl">
            <div className="p-3 text-center border-r border-white/5 last:border-0">
              <span className="block text-2xl font-extrabold text-[#00D4FF]">99.9%</span>
              <span className="text-xs text-slate-400 font-medium">Uptime Guarantee</span>
            </div>
            <div className="p-3 text-center border-r border-white/5 last:border-0">
              <span className="block text-2xl font-extrabold text-[#00FFC8]">10+</span>
              <span className="text-xs text-slate-400 font-medium">AI Tools Built-in</span>
            </div>
            <div className="p-3 text-center border-r border-white/5 last:border-0">
              <span className="block text-2xl font-extrabold text-[#0EA5E9]">Sub-Second</span>
              <span className="text-xs text-slate-400 font-medium">QR/Face Auth</span>
            </div>
            <div className="p-3 text-center">
              <span className="block text-2xl font-extrabold text-purple-400">Enterprise</span>
              <span className="text-xs text-slate-400 font-medium">Luly Design System</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
