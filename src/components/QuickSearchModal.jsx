import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, BookOpen, GraduationCap, Presentation, ShieldCheck } from 'lucide-react';

export default function QuickSearchModal({ isOpen, onClose, onOpenLogin, lang }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'Student Portal Login', icon: GraduationCap, role: 'Student' },
    { title: 'Teacher Portal Login', icon: Presentation, role: 'Teacher' },
    { title: 'Administrator Portal Login', icon: ShieldCheck, role: 'Administrator' },
    { title: '10 Special AI Tools & Sandbox', icon: Sparkles, section: '#ai-features' },
    { title: '19 Smart School Features', icon: BookOpen, section: '#features' },
  ];

  const filtered = quickLinks.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-[#050816]/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl rounded-3xl bg-[#0B1020] border border-[#00D4FF]/40 p-4 shadow-2xl overflow-hidden">
        
        {/* Search Bar */}
        <div className="relative flex items-center border-b border-white/10 pb-3">
          <Search className="w-5 h-5 text-[#00D4FF] ml-2 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'EN' ? 'Search features, portals, tools...' : 'Cari fitur, portal, alat AI...'}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="py-3 space-y-1 max-h-72 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  onClick={() => {
                    onClose();
                    if (item.role) onOpenLogin(item.role);
                    else if (item.section) {
                      const el = document.querySelector(item.section);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-[#121B2F] border border-transparent hover:border-[#00D4FF]/30 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-transform" />
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-500 text-center py-6">No matching results found.</p>
          )}
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>Press ESC to close</span>
          <span>SmartSchool v1 Search Engine</span>
        </div>

      </div>
    </div>
  );
}
