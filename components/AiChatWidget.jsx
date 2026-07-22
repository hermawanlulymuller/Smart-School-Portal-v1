import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, Minimize2, RefreshCw } from 'lucide-react';

export default function AiChatWidget({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: lang === 'EN'
        ? 'Hello! I am SmartSchool AI Assistant designed by Luly Agency. How can I help you today?'
        : 'Halo! Saya Asisten AI SmartSchool yang dirancang oleh Luly Agency. Ada yang bisa saya bantu hari ini?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = lang === 'EN'
        ? `I have processed your inquiry regarding "${text}". Everything is synced with your SmartSchool Portal v1 database!`
        : `Saya telah memproses pertanyaan Anda mengenai "${text}". Semua data telah tersinkronisasi dengan SmartSchool Portal v1!`;

      if (text.toLowerCase().includes('schedule') || text.toLowerCase().includes('jadwal')) {
        replyText = lang === 'EN'
          ? 'Your next class is Physics & AI Simulation at 10:30 AM in Lab 4A. Professor Evelyn Reed is the instructor.'
          : 'Jadwal kelas Anda berikutnya adalah Simulasi Fisika & AI jam 10:30 WIB di Lab 4A.';
      } else if (text.toLowerCase().includes('grade') || text.toLowerCase().includes('nilai')) {
        replyText = lang === 'EN'
          ? 'Your current GPA is 3.94 (A+ Grade). Midterm exam auto-scoring is completed.'
          : 'IPK Anda saat ini adalah 3.94 (Grade A+). Penilaian ujian tengah semester telah selesai.';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: replyText }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Trigger Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#0EA5E9] to-[#00FFC8] text-slate-950 shadow-glow-cyan hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          title="Open AI Chat Assistant"
        >
          <Bot className="w-7 h-7 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00FFC8] rounded-full border-2 border-[#050816] animate-pulse"></span>
        </button>
      )}

      {/* Floating Glass Chat Modal */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] rounded-3xl bg-[#0B1020]/95 border border-[#00D4FF]/40 shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0B1020] to-[#121B2F] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>SmartSchool AI</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono bg-[#00FFC8]/10 text-[#00FFC8] rounded border border-[#00FFC8]/30">
                    Luly v2.4
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Online • Instant Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[#00D4FF]" />
                  </div>
                )}
                <div className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#00D4FF] text-slate-950 font-medium rounded-tr-none'
                    : 'bg-[#121B2F] text-slate-100 border border-white/10 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-400 italic">
                <Bot className="w-4 h-4 text-[#00FFC8] animate-bounce" />
                <span>AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Prompt Shortcuts */}
          <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02] flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSendMessage(lang === 'EN' ? 'Show Class Schedule' : 'Lihat Jadwal')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#00D4FF]/20 text-slate-300 hover:text-[#00D4FF] border border-white/10 shrink-0"
            >
              📅 {lang === 'EN' ? 'Schedule' : 'Jadwal'}
            </button>
            <button
              onClick={() => handleSendMessage(lang === 'EN' ? 'Check Exam Grades' : 'Cek Nilai Ujian')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#00FFC8]/20 text-slate-300 hover:text-[#00FFC8] border border-white/10 shrink-0"
            >
              🎓 {lang === 'EN' ? 'Grades' : 'Nilai'}
            </button>
            <button
              onClick={() => handleSendMessage(lang === 'EN' ? 'AI Quiz Assistance' : 'Bantuan Kuis AI')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 border border-white/10 shrink-0"
            >
              ⚡ {lang === 'EN' ? 'AI Quiz' : 'Kuis AI'}
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#050816] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={lang === 'EN' ? 'Ask AI assistant...' : 'Tanyakan ke AI...'}
              className="flex-1 px-3 py-2 rounded-xl bg-[#0B1020] border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#00D4FF] focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 rounded-xl bg-[#00D4FF] text-slate-950 font-bold hover:bg-[#00D4FF]/90 transition-all shadow-glow-cyan"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
