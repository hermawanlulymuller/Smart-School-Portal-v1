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
  CheckSquare,
  Plus,
  ExternalLink,
  Search,
  Megaphone,
  Activity,
  Layers
} from 'lucide-react';
import { 
  INITIAL_CLASSES, 
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS, 
  INITIAL_SCHEDULES, 
  INITIAL_LIBRARY_BOOKS, 
  INITIAL_EXTRACURRICULARS, 
  INITIAL_ANNOUNCEMENTS 
} from '../data/schoolData.js';
import { 
  addLibraryBookToSheets, 
  addAnnouncementToSheets, 
  recordAttendanceToSheets 
} from '../services/googleSheetsApi.js';

export default function PortalDashboardModal({ role, onClose, lang }) {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // overview, students, teachers, schedule, library, extras, announcements
  
  // Data States
  const [selectedClassId, setSelectedClassId] = useState('10-A');
  const [studentsList, setStudentsList] = useState(INITIAL_STUDENTS);
  const [teachersList, setTeachersList] = useState(INITIAL_TEACHERS);
  const [libraryBooks, setLibraryBooks] = useState(INITIAL_LIBRARY_BOOKS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [announcementScope, setAnnouncementScope] = useState('General'); // General or Class

  // Form Modals
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: 'Science & AI', readUrl: '', description: '' });

  const [showAddAnnModal, setShowAddAnnModal] = useState(false);
  const [newAnn, setNewAnn] = useState({ scope: 'General', targetClassId: '10-A', title: '', content: '', priority: 'General' });

  // Handle Add E-Book Link
  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.readUrl) return;

    const created = {
      id: `LIB-${Date.now()}`,
      title: newBook.title,
      author: newBook.author || 'Guest Author',
      category: newBook.category,
      readUrl: newBook.readUrl,
      coverBg: 'from-[#00D4FF]/20 to-[#00FFC8]/20',
      description: newBook.description || 'Digital reference resource.'
    };

    setLibraryBooks(prev => [created, ...prev]);
    await addLibraryBookToSheets(created);
    setShowAddBookModal(false);
    setNewBook({ title: '', author: '', category: 'Science & AI', readUrl: '', description: '' });
  };

  // Handle Add Announcement
  const handleAddAnnSubmit = async (e) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) return;

    const created = {
      id: `ANN-${Date.now()}`,
      scope: newAnn.scope,
      targetClassId: newAnn.scope === 'Class' ? newAnn.targetClassId : 'All',
      title: newAnn.title,
      content: newAnn.content,
      date: new Date().toLocaleDateString(),
      priority: newAnn.priority,
      createdBy: `${role} Portal User`
    };

    setAnnouncements(prev => [created, ...prev]);
    await addAnnouncementToSheets(created);
    setShowAddAnnModal(false);
    setNewAnn({ scope: 'General', targetClassId: '10-A', title: '', content: '', priority: 'General' });
  };

  const filteredStudents = studentsList.filter(s => s.classId === selectedClassId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#050816]/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in">
      
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#0B1020] border border-[#00D4FF]/40 shadow-2xl p-6 sm:p-8 overflow-hidden min-h-[640px] flex flex-col justify-between my-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
              {role === 'Student' ? <GraduationCap className="w-6 h-6" /> :
               role === 'Teacher' ? <Presentation className="w-6 h-6" /> :
               <ShieldCheck className="w-6 h-6 text-purple-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {role} Workspace - SmartSchool v1
                </h3>
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#00FFC8]/10 text-[#00FFC8] border border-[#00FFC8]/30">
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {role === 'Student' ? 'Alex Rivera (ID: STU-1001 • Class 10-A Science)' :
                 role === 'Teacher' ? 'Dr. Evelyn Reed (ID: TCH-001 • Advanced Physics)' :
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

        {/* Sub-tab Navigation - Fully Functional Modules */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'overview' ? 'bg-[#00D4FF] text-slate-950 font-bold shadow-glow-cyan' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {lang === 'EN' ? 'Overview' : 'Ringkasan'}
          </button>

          <button
            onClick={() => setActiveSubTab('students')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'students' ? 'bg-[#00D4FF] text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            👨‍🎓 {lang === 'EN' ? 'Students Roster' : 'Data Murid tiap Kelas'}
          </button>

          <button
            onClick={() => setActiveSubTab('teachers')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'teachers' ? 'bg-[#0EA5E9] text-white font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            👩‍🏫 {lang === 'EN' ? 'Subject Teachers' : 'Guru tiap Mapel'}
          </button>

          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'schedule' ? 'bg-[#00FFC8] text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            📅 {lang === 'EN' ? 'Class Timetable' : 'Jadwal Pelajaran'}
          </button>

          <button
            onClick={() => setActiveSubTab('library')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'library' ? 'bg-purple-500 text-white font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            📚 {lang === 'EN' ? 'Digital Library' : 'Perpustakaan Digital'}
          </button>

          <button
            onClick={() => setActiveSubTab('extras')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'extras' ? 'bg-yellow-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            🏆 {lang === 'EN' ? 'Extracurriculars' : 'Kegiatan Eskul'}
          </button>

          <button
            onClick={() => setActiveSubTab('announcements')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'announcements' ? 'bg-pink-500 text-white font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            📢 {lang === 'EN' ? 'Announcements' : 'Halaman Pengumuman'}
          </button>
        </div>

        {/* ================= MODULE CONTENT ================= */}
        <div className="flex-1 space-y-6 overflow-y-auto max-h-[550px] pr-1">
          
          {/* TAB 1: OVERVIEW */}
          {activeSubTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#00D4FF]/20 space-y-2">
                <span className="text-xs text-slate-400">Total Registered Students</span>
                <h4 className="text-3xl font-extrabold text-white">{studentsList.length} Active Students</h4>
                <p className="text-xs text-[#00FFC8]">Distributed in 6 Main Classes</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#00FFC8]/20 space-y-2">
                <span className="text-xs text-slate-400">Subject Teachers</span>
                <h4 className="text-3xl font-extrabold text-white">{teachersList.length} Teachers</h4>
                <p className="text-xs text-slate-300">All Core Subjects Covered</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-purple-500/20 space-y-2">
                <span className="text-xs text-slate-400">Digital Library Vault</span>
                <h4 className="text-3xl font-extrabold text-white">{libraryBooks.length} E-Books</h4>
                <p className="text-xs text-purple-300">Direct Web Link Access Enabled</p>
              </div>

              <div className="md:col-span-3 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#00D4FF]" />
                  Latest School Announcement:
                </h4>
                <div className="p-4 rounded-xl bg-[#050816] border border-[#00D4FF]/30">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00D4FF]/20 text-[#00D4FF] uppercase">
                    {announcements[0]?.priority} • {announcements[0]?.scope}
                  </span>
                  <h5 className="text-sm font-bold text-white mt-2">{announcements[0]?.title}</h5>
                  <p className="text-xs text-slate-300 mt-1">{announcements[0]?.content}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATA MURID TIAP KELAS */}
          {activeSubTab === 'students' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#050816] p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">Pilih Kelas:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {INITIAL_CLASSES.map(cls => (
                      <button
                        key={cls.id}
                        onClick={() => setSelectedClassId(cls.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedClassId === cls.id 
                            ? 'bg-[#00D4FF] text-slate-950 shadow-glow-cyan' 
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {cls.id}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-[#00FFC8] font-bold">
                  {filteredStudents.length} Murid Terdaftar di Kelas {selectedClassId}
                </span>
              </div>

              <div className="rounded-2xl bg-[#050816] border border-white/10 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#121B2F] text-[10px] uppercase font-bold text-[#00D4FF] border-b border-white/10">
                    <tr>
                      <th className="p-3">ID Student</th>
                      <th className="p-3">Nama Lengkap</th>
                      <th className="p-3">NISN</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">IPK (GPA)</th>
                      <th className="p-3">Kehadiran</th>
                      <th className="p-3">Nama Wali</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    {filteredStudents.map(st => (
                      <tr key={st.studentId} className="hover:bg-white/[0.02]">
                        <td className="p-3 text-[#00FFC8] font-bold">{st.studentId}</td>
                        <td className="p-3 font-sans font-bold text-white">{st.name}</td>
                        <td className="p-3 text-slate-400">{st.nisn}</td>
                        <td className="p-3 text-[#00D4FF] font-bold">{st.classId}</td>
                        <td className="p-3 text-yellow-400 font-bold">{st.gpa}</td>
                        <td className="p-3 text-green-400">{st.attendance}</td>
                        <td className="p-3 font-sans text-slate-300">{st.parentName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: GURU MATA PELAJARAN */}
          {activeSubTab === 'teachers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teachersList.map(t => (
                <div key={t.teacherId} className="p-5 rounded-2xl bg-[#050816] border border-[#0EA5E9]/30 space-y-2 hover:border-[#00D4FF] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/30">
                      {t.teacherId}
                    </span>
                    <span className="text-[10px] text-green-400 font-mono">STATUS: {t.status}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-[#00FFC8] font-semibold">{t.subject}</p>
                  <div className="pt-2 text-[11px] text-slate-400 space-y-1 font-mono border-t border-white/5">
                    <p>📧 {t.email}</p>
                    <p>📍 {t.room}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: JADWAL PELAJARAN */}
          {activeSubTab === 'schedule' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#050816] border border-white/10">
                <h4 className="text-sm font-bold text-white mb-1">Jadwal Pelajaran Mingguan (Timetable)</h4>
                <p className="text-xs text-slate-400">Jadwal tatap muka, praktikum lab, dan sesi AI interaktif.</p>
              </div>

              <div className="space-y-3">
                {INITIAL_SCHEDULES.map(sch => (
                  <div key={sch.id} className="p-4 rounded-2xl bg-[#121B2F] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00FFC8]/10 text-[#00FFC8]">
                          {sch.day}
                        </span>
                        <span className="text-xs font-mono text-slate-300">{sch.time}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{sch.subject}</h4>
                      <p className="text-xs text-slate-400">Pengajar: {sch.teacher} • {sch.room}</p>
                    </div>
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
                      Kelas {sch.classId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PERPUSTAKAAN DIGITAL (WITH ADD LINK FORM) */}
          {activeSubTab === 'library' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#050816] p-4 rounded-2xl border border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-white">Digital Library Vault</h4>
                  <p className="text-xs text-slate-400">Akses buku digital, jurnal ilmiah, dan link e-book online.</p>
                </div>
                <button
                  onClick={() => setShowAddBookModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00FFC8] text-slate-950 hover:bg-[#00FFC8]/90 transition-all flex items-center gap-1.5 shadow-glow-turquoise"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Link E-Book</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {libraryBooks.map(bk => (
                  <div key={bk.id} className="p-5 rounded-2xl bg-[#121B2F] border border-white/10 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                          {bk.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{bk.id}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{bk.title}</h4>
                      <p className="text-xs text-[#00D4FF] mt-0.5">Penulis: {bk.author}</p>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{bk.description}</p>
                    </div>

                    <a
                      href={bk.readUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#00D4FF] text-slate-950 hover:bg-[#00D4FF]/90 transition-all shadow-glow-cyan"
                    >
                      <span>Buka & Baca E-Book</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: KEGIATAN ESKUL */}
          {activeSubTab === 'extras' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_EXTRACURRICULARS.map(ex => (
                <div key={ex.id} className="p-5 rounded-2xl bg-[#050816] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${ex.badgeColor}`}>
                      {ex.membersCount} Anggota Active
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{ex.id}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{ex.name}</h4>
                  <p className="text-xs text-slate-300">Pembina: {ex.supervisor}</p>
                  <div className="pt-2 text-xs text-[#00FFC8] font-mono border-t border-white/5 space-y-1">
                    <p>🕒 {ex.scheduleDay}</p>
                    <p>📍 {ex.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: HALAMAN PENGUMUMAN UMUM & KELAS */}
          {activeSubTab === 'announcements' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#050816] p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">Filter Scope:</span>
                  <button
                    onClick={() => setAnnouncementScope('General')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      announcementScope === 'General' ? 'bg-[#00D4FF] text-slate-950 shadow-glow-cyan' : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    Pengumuman Umum (Seluruh Sekolah)
                  </button>
                  <button
                    onClick={() => setAnnouncementScope('Class')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      announcementScope === 'Class' ? 'bg-purple-500 text-white shadow-glow-purple' : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    Pengumuman Tiap Kelas
                  </button>
                </div>

                <button
                  onClick={() => setShowAddAnnModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00FFC8] text-slate-950 hover:bg-[#00FFC8]/90 transition-all flex items-center gap-1.5 shadow-glow-turquoise"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Buat Pengumuman Baru</span>
                </button>
              </div>

              <div className="space-y-3">
                {announcements.filter(a => announcementScope === 'General' ? a.scope === 'General' : a.scope === 'Class').map(ann => (
                  <div key={ann.id} className="p-5 rounded-2xl bg-[#121B2F] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00D4FF]/20 text-[#00D4FF]">
                          {ann.priority}
                        </span>
                        <span className="text-slate-400 font-mono">{ann.date}</span>
                      </div>
                      <span className="text-xs font-bold text-[#00FFC8]">Target: {ann.targetClassId}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{ann.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
                    <p className="text-[10px] text-slate-400 font-mono pt-2 border-t border-white/5">Oleh: {ann.createdBy}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>SmartSchool Portal v1 • Powered by Luly Agency Engine</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#00D4FF] text-slate-950 font-bold hover:bg-[#00D4FF]/90 transition-all shadow-glow-cyan"
          >
            Tutup Portal
          </button>
        </div>

      </div>

      {/* FORM MODAL: ADD DIGITAL E-BOOK LINK */}
      {showAddBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#0B1020] border border-[#00FFC8]/40 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Tambah Link E-Book Perpustakaan Digital</h3>
            <form onSubmit={handleAddBookSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Judul Buku / Jurnal:</label>
                <input
                  type="text"
                  required
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="Contoh: Modern Physics 2026"
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">URL Link Web E-Book:</label>
                <input
                  type="url"
                  required
                  value={newBook.readUrl}
                  onChange={(e) => setNewBook({ ...newBook, readUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Penulis:</label>
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  placeholder="Dr. Evelyn"
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddBookModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-xs text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#00FFC8] text-slate-950 font-bold text-xs shadow-glow-turquoise">Simpan ke GS & Portal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL: ADD ANNOUNCEMENT */}
      {showAddAnnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#0B1020] border border-purple-500/40 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Buat Pengumuman Baru</h3>
            <form onSubmit={handleAddAnnSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Cakupan Pengumuman:</label>
                <select
                  value={newAnn.scope}
                  onChange={(e) => setNewAnn({ ...newAnn, scope: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-xs text-white"
                >
                  <option value="General">General (Seluruh Sekolah)</option>
                  <option value="Class">Khusus Kelas Tertentu</option>
                </select>
              </div>

              {newAnn.scope === 'Class' && (
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Pilih Target Kelas:</label>
                  <select
                    value={newAnn.targetClassId}
                    onChange={(e) => setNewAnn({ ...newAnn, targetClassId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-xs text-white"
                  >
                    {INITIAL_CLASSES.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs text-slate-300 block mb-1">Judul Pengumuman:</label>
                <input
                  type="text"
                  required
                  value={newAnn.title}
                  onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Isi Pengumuman:</label>
                <textarea
                  required
                  rows={3}
                  value={newAnn.content}
                  onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-xs text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddAnnModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-xs text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#00D4FF] text-slate-950 font-bold text-xs shadow-glow-cyan">Kirim Pengumuman</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
