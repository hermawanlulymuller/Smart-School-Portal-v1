import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar as CalendarIcon, 
  Clock, 
  Megaphone, 
  Bell, 
  ChevronRight, 
  Sparkles,
  MapPin
} from 'lucide-react';

export default function SmartWidgets({ lang }) {
  const news = [
    { id: 1, title: 'SmartSchool Wins National EdTech Innovation Award 2026', date: 'Jul 20, 2026', category: 'Achievement' },
    { id: 2, title: 'Luly Agency AI Tutor v2.4 Integration Completed', date: 'Jul 18, 2026', category: 'System' },
    { id: 3, title: 'Annual STEM Robotics Fair & AI Exhibition Registration Open', date: 'Jul 15, 2026', category: 'Event' }
  ];

  const events = [
    { id: 1, title: 'Final Semester Examinations (CBT)', date: 'Aug 10 - Aug 18', location: 'Hall A & Digital Rooms' },
    { id: 2, title: 'Parent-Teacher Strategic Conference', date: 'Aug 22, 2026', location: 'Auditorium Main' },
    { id: 3, title: 'National Science Olympiad Briefing', date: 'Sep 05, 2026', location: 'Online Streaming' }
  ];

  const todaySchedule = [
    { time: '08:00 - 09:30 AM', subject: 'Advanced Physics & AI Simulation', room: 'Lab 4A', teacher: 'Dr. Evelyn Reed' },
    { time: '09:45 - 11:15 AM', subject: 'Computer Science & Algorithms', room: 'Cyber Room', teacher: 'Prof. Marcus Vance' },
    { time: '11:30 - 01:00 PM', subject: 'Mathematics & Calculus', room: 'Room 204', teacher: 'Mrs. Sarah Lin' }
  ];

  return (
    <section className="relative py-20 bg-[#050816] overflow-hidden border-t border-[#00D4FF]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/30 uppercase tracking-widest">
            {lang === 'EN' ? 'LIVE CAMPUS FEED' : 'INFORMASI KAMPUS REAL-TIME'}
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3">
            {lang === 'EN' ? 'School News, Schedule & Events' : 'Berita, Jadwal & Agenda Sekolah'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: School Announcements & News */}
          <div className="p-6 rounded-3xl bg-[#0B1020]/80 border border-[#00D4FF]/20 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-[#00D4FF]" />
                {lang === 'EN' ? 'Recent School News' : 'Berita & Pengumuman'}
              </h3>
              <span className="text-[10px] font-mono text-[#00D4FF]">LIVE TICKER</span>
            </div>

            <div className="space-y-4">
              {news.map(item => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#00D4FF]/10 text-[#00D4FF] font-bold">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-[#00D4FF] transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Today's Class Schedule */}
          <div className="p-6 rounded-3xl bg-[#0B1020]/80 border border-[#00FFC8]/20 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00FFC8]" />
                {lang === 'EN' ? 'Today\'s Schedule' : 'Jadwal Hari Ini'}
              </h3>
              <span className="text-[10px] font-mono text-[#00FFC8]">ACTIVE SESSION</span>
            </div>

            <div className="space-y-3">
              {todaySchedule.map((sched, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#121B2F]/80 border border-white/5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#00FFC8] block mb-0.5">{sched.time}</span>
                    <h4 className="text-xs font-bold text-white">{sched.subject}</h4>
                    <span className="text-[10px] text-slate-400 block mt-1">{sched.teacher} • {sched.room}</span>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-[#00FFC8]/10 text-[#00FFC8]">On Track</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Upcoming Academic Calendar Events */}
          <div className="p-6 rounded-3xl bg-[#0B1020]/80 border border-purple-500/20 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-purple-400" />
                {lang === 'EN' ? 'Upcoming Events' : 'Agenda Mendatang'}
              </h3>
              <span className="text-[10px] font-mono text-purple-400">CALENDAR</span>
            </div>

            <div className="space-y-3">
              {events.map(ev => (
                <div key={ev.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-purple-300 block mb-0.5">{ev.date}</span>
                  <h4 className="text-xs font-bold text-slate-100">{ev.title}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
