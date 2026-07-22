import React from 'react';
import { GraduationCap, Heart, ArrowUp, Send, CheckCircle } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="relative bg-[#050816] text-slate-400 border-t border-[#00D4FF]/15 pt-16 pb-12 overflow-hidden">
      
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/40 text-[#00D4FF]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                SmartSchool <span className="gradient-text-cyan">Portal v1</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {lang === 'EN'
                ? 'The Future of Intelligent School Management. Designed with luxury modern standards and cutting-edge artificial intelligence.'
                : 'Masa Depan Manajemen Sekolah Cerdas Berbasis AI. Dirancang dengan standar modern mewah dan kecerdasan buatan mutakhir.'}
            </p>

            {/* Slogan */}
            <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 font-serif italic text-slate-300 text-xs">
              "Empowering Education Through Intelligent Technology"
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-[#00D4FF] transition-colors">Overview</a></li>
              <li><a href="#portals" className="hover:text-[#00D4FF] transition-colors">Login Portals</a></li>
              <li><a href="#ai-features" className="hover:text-[#00FFC8] transition-colors">AI Engine</a></li>
              <li><a href="#features" className="hover:text-[#00D4FF] transition-colors">19 Features</a></li>
              <li><a href="#stats" className="hover:text-[#00D4FF] transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Access Roles</h4>
            <ul className="space-y-2">
              <li><a href="#portals" className="hover:text-[#00D4FF] transition-colors">Student Portal</a></li>
              <li><a href="#portals" className="hover:text-[#0EA5E9] transition-colors">Teacher Portal</a></li>
              <li><a href="#portals" className="hover:text-purple-400 transition-colors">Administrator Portal</a></li>
              <li><a href="#portals" className="hover:text-[#00FFC8] transition-colors">Parent Gateway</a></li>
            </ul>
          </div>

          {/* Newsletter / Luly Agency Credit */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Luly Agency Ecosystem</h4>
            <p className="text-slate-400">Get enterprise updates and AI release notes.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full px-3 py-2 rounded-xl bg-[#0B1020] border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#00D4FF] focus:outline-none"
              />
              <button className="p-2 rounded-xl bg-[#00D4FF] text-slate-950 font-bold hover:bg-[#00D4FF]/90 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-2">
            <span>Designed with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://luly.agency"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#00D4FF] hover:text-[#00FFC8] underline transition-colors"
            >
              Luly Agency
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-[#00FFC8]">
              <CheckCircle className="w-3.5 h-3.5" />
              Vercel Deployed & Verified
            </span>
            <span>© 2026 SmartSchool Portal v1. All rights reserved.</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 rounded-xl bg-[#0B1020] border border-white/10 hover:border-[#00D4FF] text-slate-300 hover:text-white transition-all"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

      </div>
    </footer>
  );
}
