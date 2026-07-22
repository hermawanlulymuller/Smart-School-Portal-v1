import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Search, 
  Globe, 
  Sparkles, 
  Bell, 
  UserCheck, 
  ChevronRight,
  Menu,
  X,
  Zap,
  FileSpreadsheet
} from 'lucide-react';
import { getScriptUrl } from '../services/googleSheetsApi.js';

export default function Navbar({ onOpenLogin, onOpenSearch, onOpenSheetsConnector, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(3);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkConn = () => {
      setIsConnected(!!getScriptUrl());
    };
    checkConn();
    const interval = setInterval(checkConn, 1500);
    return () => clearInterval(interval);
  }, []);

  const notifications = [
    { id: 1, title: isConnected ? 'Google Sheets Live Connected' : 'Running in Local Offline Mode', time: 'Just now', unread: true },
    { id: 2, title: 'AI Exam Analyzer Updated v2.4', time: '10m ago', unread: true },
    { id: 3, title: 'Class Timetables & E-Books Loaded', time: '1h ago', unread: true },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-[#050816]/85 backdrop-blur-xl border-b border-[#00D4FF]/15 shadow-2xl shadow-[#00D4FF]/5' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00D4FF]/20 via-[#0EA5E9]/10 to-[#00FFC8]/20 border border-[#00D4FF]/40 group-hover:border-[#00FFC8] transition-all duration-300 shadow-glow-cyan">
              <GraduationCap className="w-6 h-6 text-[#00D4FF] group-hover:text-[#00FFC8] transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FFC8] rounded-full animate-ping opacity-75"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FFC8] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#00D4FF] transition-colors">
                  SMARTSCHOOL
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-[#00D4FF]/20 to-[#00FFC8]/20 text-[#00FFC8] border border-[#00FFC8]/30">
                  v1
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider flex items-center gap-1 font-medium">
                <span>By</span>
                <span className="text-[#00D4FF] font-semibold">Luly Agency</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 px-4 py-1.5 rounded-full bg-[#0B1020]/70 border border-white/10 backdrop-blur-md">
            <a href="#hero" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
              {lang === 'EN' ? 'Overview' : 'Beranda'}
            </a>
            <a href="#portals" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
              {lang === 'EN' ? 'Portals & Classes' : 'Portal & Kelas'}
            </a>
            <a href="#ai-features" className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#00FFC8] hover:bg-[#00FFC8]/10 transition-all flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'EN' ? 'AI Tools' : 'Alat AI'}</span>
            </a>
            <a href="#features" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
              {lang === 'EN' ? 'All Features' : 'Fitur Lengkap'}
            </a>
          </nav>

          {/* Utility Tools & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Google Sheets Live Status Badge Indicator */}
            <button
              onClick={onOpenSheetsConnector}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                isConnected 
                  ? 'bg-[#00FFC8]/10 border-[#00FFC8]/40 text-[#00FFC8] hover:bg-[#00FFC8]/20 shadow-glow-turquoise' 
                  : 'bg-yellow-500/10 border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/20'
              }`}
              title="Google Sheets Connection Status"
            >
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#00FFC8] animate-ping' : 'bg-yellow-400'}`}></span>
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isConnected ? (lang === 'EN' ? 'Sheets Connected' : 'Terhubung GS') : (lang === 'EN' ? 'Local Mode' : 'Mode Lokal')}
              </span>
            </button>

            {/* Quick Search Button */}
            <button 
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1020]/80 border border-white/10 hover:border-[#00D4FF]/50 text-slate-400 hover:text-white text-xs transition-all"
              title="Search (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="hidden md:inline">{lang === 'EN' ? 'Quick Search...' : 'Cari Fitur...'}</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 text-slate-300 rounded border border-white/10">⌘K</kbd>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'EN' ? 'ID' : 'EN')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0B1020]/80 border border-white/10 hover:border-[#00FFC8]/50 text-slate-300 text-xs font-semibold transition-all"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#00FFC8]" />
              <span>{lang}</span>
            </button>

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-xl bg-[#0B1020]/80 border border-white/10 hover:border-[#00D4FF]/40 text-slate-300 hover:text-white transition-all"
              >
                <Bell className="w-4 h-4 text-slate-300" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#00D4FF] rounded-full animate-pulse"></span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-[#0B1020] border border-[#00D4FF]/30 p-4 shadow-2xl backdrop-blur-2xl z-50">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#00FFC8]" />
                      {lang === 'EN' ? 'System Updates' : 'Pemberitahuan System'}
                    </h4>
                    <button 
                      onClick={() => setUnreadNotifs(0)}
                      className="text-[10px] text-[#00D4FF] hover:underline font-medium"
                    >
                      {lang === 'EN' ? 'Mark read' : 'Tandai Dibaca'}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs">
                        <p className="font-medium text-slate-200">{n.title}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main CTA Login Portal */}
            <button
              onClick={() => onOpenLogin('Student')}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00D4FF] via-[#0EA5E9] to-[#00FFC8] hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md"
            >
              <UserCheck className="w-4 h-4 text-slate-950" />
              <span>{lang === 'EN' ? 'Portal Login' : 'Masuk Portal'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-950" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#0B1020] border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-5 rounded-2xl bg-[#0B1020]/95 border border-[#00D4FF]/30 backdrop-blur-2xl space-y-3 animate-in fade-in slide-in-from-top-4">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 hover:text-[#00D4FF]"
            >
              {lang === 'EN' ? 'Overview' : 'Beranda'}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSheetsConnector();
              }}
              className="w-full text-left py-2 text-sm font-semibold text-[#00FFC8] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Google Sheets DB Connector</span>
              </span>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#00FFC8]' : 'bg-yellow-400'}`}></span>
            </button>
            <a 
              href="#portals" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 hover:text-[#00D4FF]"
            >
              {lang === 'EN' ? 'Portals' : 'Portal Login'}
            </a>
          </div>
        )}

      </div>
    </header>
  );
}
