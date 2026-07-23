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
  RefreshCw,
  FileSpreadsheet,
  Zap,
  HelpCircle,
  Phone,
  Mail,
  User,
  Clock
} from 'lucide-react';
import { 
  INITIAL_CLASSES, 
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS, 
  INITIAL_SUBJECTS,
  INITIAL_QUIZZES,
  INITIAL_SCHEDULES, 
  INITIAL_LIBRARY_BOOKS, 
  INITIAL_EXTRACURRICULARS, 
  INITIAL_ANNOUNCEMENTS 
} from '../data/schoolData.js';
import { 
  addLibraryBookToSheets, 
  addAnnouncementToSheets, 
  recordAttendanceToSheets,
  addStudentToSheets,
  addTeacherToSheets,
  addSubjectToSheets,
  addQuizToSheets,
  fetchStudentsFromSheets,
  fetchTeachersFromSheets,
  fetchSubjectsFromSheets,
  fetchAttendanceFromSheets,
  fetchLibraryFromSheets,
  fetchAnnouncementsFromSheets
} from '../services/googleSheetsApi.js';

export default function PortalDashboardModal({ role, onClose, lang }) {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // overview, students, teachers, subjects, schedule, library, extras, announcements, cbt-quiz
  
  // Master Data States
  const [selectedClassId, setSelectedClassId] = useState('10-A');
  const [studentsList, setStudentsList] = useState(INITIAL_STUDENTS);
  const [teachersList, setTeachersList] = useState(INITIAL_TEACHERS);
  const [subjectsList, setSubjectsList] = useState(INITIAL_SUBJECTS);
  const [quizzesList, setQuizzesList] = useState(INITIAL_QUIZZES);
  const [libraryBooks, setLibraryBooks] = useState(INITIAL_LIBRARY_BOOKS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [announcementScope, setAnnouncementScope] = useState('General');
  const [syncStatusMsg, setSyncStatusMsg] = useState('');
  const [isPullingData, setIsPullingData] = useState(false);

  // Form Modals
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ 
    name: '', gender: 'Laki-laki', entryYear: 2026, studentNumber: '', classId: '10-A', 
    email: '', phone: '', parentName: '', parentPhone: '' 
  });

  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ 
    name: '', gender: 'Perempuan', entryYear: 2026, teacherNumber: '', 
    subject: 'Advanced Physics & Quantum Science', email: '', phone: '', room: 'Physics Lab 3A' 
  });

  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ subjectName: '', category: 'Science & AI', teacherName: 'Dr. Evelyn Reed', weeklyHours: 4 });

  const [showAddQuizModal, setShowAddQuizModal] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: '', subject: 'Advanced Physics & Quantum Science', classId: '10-A', duration: '30 mins', dueDate: '2026-08-15' });

  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: 'Science & AI', readUrl: '', description: '' });

  const [showAddAnnModal, setShowAddAnnModal] = useState(false);
  const [newAnn, setNewAnn] = useState({ scope: 'General', targetClassId: '10-A', title: '', content: '', priority: 'General' });

  // CBT Test State
  const [activeTestQuiz, setActiveTestQuiz] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // PULL LIVE DATA FROM GOOGLE SHEETS
  const handlePullDataFromSheets = async () => {
    setIsPullingData(true);
    setSyncStatusMsg('Menarik data terbaru dari Google Sheets...');

    const resStudents = await fetchStudentsFromSheets();
    const resTeachers = await fetchTeachersFromSheets();
    const resAnn = await fetchAnnouncementsFromSheets();

    setIsPullingData(false);
    
    if (resStudents.success && Array.isArray(resStudents.data) && resStudents.data.length > 0) {
      setStudentsList(resStudents.data);
    }
    if (resTeachers.success && Array.isArray(resTeachers.data) && resTeachers.data.length > 0) {
      setTeachersList(resTeachers.data);
    }

    setSyncStatusMsg('✅ Data berhasil ditarik dari Google Sheets!');
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  // REGISTER NEW STUDENT (WITH GENDER, PHONE, PARENT PHONE, EMAIL)
  const handleAddStudentSubmit = async (e) => {
    e.preventDefault();
    if (!newStudent.name) return;

    const created = {
      studentId: `STU-${Date.now().toString().slice(-4)}`,
      name: newStudent.name,
      gender: newStudent.gender,
      entryYear: Number(newStudent.entryYear) || 2026,
      studentNumber: newStudent.studentNumber || `2400${Math.floor(Math.random() * 90 + 10)}`,
      classId: newStudent.classId,
      email: newStudent.email || `${newStudent.name.toLowerCase().replace(/\s+/g, '.')}@smartschool.edu`,
      phone: newStudent.phone || '0812-0000-1111',
      parentName: newStudent.parentName || 'Orang Tua Siswa',
      parentPhone: newStudent.parentPhone || '0812-9999-0000',
      status: 'Active',
      gpa: 3.85,
      attendance: '100%'
    };

    setStudentsList(prev => [created, ...prev]);
    await addStudentToSheets(created);
    setShowAddStudentModal(false);
    setNewStudent({ name: '', gender: 'Laki-laki', entryYear: 2026, studentNumber: '', classId: '10-A', email: '', phone: '', parentName: '', parentPhone: '' });
    setSyncStatusMsg(`✅ Siswa "${created.name}" terdaftar & tersimpan di Google Sheets (Students)!`);
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  // REGISTER NEW TEACHER (WITH GENDER, PHONE, EMAIL, SUBJECT, ENTRY YEAR)
  const handleAddTeacherSubmit = async (e) => {
    e.preventDefault();
    if (!newTeacher.name) return;

    const created = {
      teacherId: `TCH-${Date.now().toString().slice(-3)}`,
      name: newTeacher.name,
      gender: newTeacher.gender,
      entryYear: Number(newTeacher.entryYear) || 2026,
      teacherNumber: newTeacher.teacherNumber || `T200${Math.floor(Math.random() * 9 + 1)}`,
      subject: newTeacher.subject,
      email: newTeacher.email || `${newTeacher.name.toLowerCase().replace(/\s+/g, '.')}@smartschool.edu`,
      phone: newTeacher.phone || '0812-9876-0000',
      status: 'Active',
      room: newTeacher.room || 'Lab Center'
    };

    setTeachersList(prev => [created, ...prev]);
    await addTeacherToSheets(created);
    setShowAddTeacherModal(false);
    setNewTeacher({ name: '', gender: 'Perempuan', entryYear: 2026, teacherNumber: '', subject: 'Advanced Physics & Quantum Science', email: '', phone: '', room: 'Physics Lab 3A' });
    setSyncStatusMsg(`✅ Guru "${created.name}" terdaftar & tersimpan di Google Sheets (Teachers)!`);
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  // ADD SUBJECT
  const handleAddSubjectSubmit = async (e) => {
    e.preventDefault();
    if (!newSubject.subjectName) return;

    const created = {
      subjectId: `SUB-${Date.now().toString().slice(-3)}`,
      subjectName: newSubject.subjectName,
      category: newSubject.category,
      teacherName: newSubject.teacherName,
      weeklyHours: Number(newSubject.weeklyHours) || 3
    };

    setSubjectsList(prev => [created, ...prev]);
    await addSubjectToSheets(created);
    setShowAddSubjectModal(false);
    setNewSubject({ subjectName: '', category: 'Science & AI', teacherName: 'Dr. Evelyn Reed', weeklyHours: 4 });
    setSyncStatusMsg(`✅ Mata Pelajaran "${created.subjectName}" tersimpan di Google Sheets (Subjects)!`);
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  // CREATE NEW CBT EXAM
  const handleAddQuizSubmit = async (e) => {
    e.preventDefault();
    if (!newQuiz.title) return;

    const created = {
      quizId: `QZ-${Date.now().toString().slice(-3)}`,
      title: newQuiz.title,
      subject: newQuiz.subject,
      classId: newQuiz.classId,
      dueDate: newQuiz.dueDate,
      duration: newQuiz.duration,
      createdBy: `${role} (${role === 'Teacher' ? 'Dr. Evelyn' : 'Admin'})`,
      questionsCount: 5
    };

    setQuizzesList(prev => [created, ...prev]);
    await addQuizToSheets(created);
    setShowAddQuizModal(false);
    setNewQuiz({ title: '', subject: 'Advanced Physics & Quantum Science', classId: '10-A', duration: '30 mins', dueDate: '2026-08-15' });
    setSyncStatusMsg(`✅ Ujian CBT "${created.title}" terdaftar & tersimpan di Google Sheets (Quizzes)!`);
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  // ADD E-BOOK
  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.readUrl) return;

    const created = {
      id: `LIB-${Date.now()}`,
      title: newBook.title,
      author: newBook.author || 'Guest Author',
      category: newBook.category,
      readUrl: newBook.readUrl,
      description: newBook.description || 'Digital reference resource.'
    };

    setLibraryBooks(prev => [created, ...prev]);
    await addLibraryBookToSheets(created);
    setShowAddBookModal(false);
    setNewBook({ title: '', author: '', category: 'Science & AI', readUrl: '', description: '' });
    setSyncStatusMsg(`✅ E-Book "${created.title}" tersimpan di Google Sheets (Library)!`);
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  // POST ANNOUNCEMENT
  const handleAddAnnSubmit = async (e) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) return;

    const created = {
      id: `ANN-${Date.now()}`,
      scope: newAnn.scope,
      targetClassId: newAnn.scope === 'Class' ? newAnn.targetClassId : 'All',
      title: newAnn.title,
      content: newAnn.content,
      date: new Date().toLocaleDateString('id-ID'),
      priority: newAnn.priority,
      createdBy: `${role} Portal User`
    };

    setAnnouncements(prev => [created, ...prev]);
    await addAnnouncementToSheets(created);
    setShowAddAnnModal(false);
    setNewAnn({ scope: 'General', targetClassId: '10-A', title: '', content: '', priority: 'General' });
    setSyncStatusMsg(`✅ Pengumuman tersimpan di Google Sheets (Announcements)!`);
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  // SUBMIT SAMPLE CBT QUIZ
  const handleCbtQuizSubmit = async () => {
    let score = 0;
    if (selectedAnswers[1] === 'photon') score += 50;
    if (selectedAnswers[2] === 'speed') score += 50;
    
    setQuizScore(score);
    await recordAttendanceToSheets({
      studentId: 'STU-1001',
      studentName: 'Alex Rivera',
      status: `Ujian CBT Finished (Score: ${score}/100)`,
      notes: 'Realtime CBT Sync'
    });
    setSyncStatusMsg(`✅ Nilai Ujian CBT (${score}/100) terkirim & tersimpan di Google Sheets!`);
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  const filteredStudents = studentsList.filter(s => s.classId === selectedClassId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#050816]/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in">
      
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#0B1020] border border-[#00D4FF]/40 shadow-2xl p-6 sm:p-8 overflow-hidden min-h-[640px] flex flex-col justify-between my-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-4 border-b border-white/10">
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
                  REALTIME GS SYNCED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {role === 'Student' ? 'Alex Rivera (STU-1001 • Class 10-A Science)' :
                 role === 'Teacher' ? 'Dr. Evelyn Reed (TCH-001 • Advanced Physics)' :
                 'Dr. Raymond Vance (Administrator General)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePullDataFromSheets}
              disabled={isPullingData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30 text-xs font-bold transition-all shadow-glow-cyan"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPullingData ? 'animate-spin' : ''}`} />
              <span>{isPullingData ? 'Tarik Data...' : '🔄 Tarik Data Sheets'}</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Tutup Portal</span>
            </button>
          </div>
        </div>

        {/* Sync Status Toast Banner */}
        {syncStatusMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-[#00FFC8]/10 border border-[#00FFC8]/40 text-[#00FFC8] text-xs font-bold flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>{syncStatusMsg}</span>
            </span>
          </div>
        )}

        {/* Sub-tab Navigation */}
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
            👨‍🎓 Data Murid ({studentsList.length})
          </button>

          <button
            onClick={() => setActiveSubTab('teachers')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'teachers' ? 'bg-[#0EA5E9] text-white font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            👩‍🏫 Guru ({teachersList.length})
          </button>

          <button
            onClick={() => setActiveSubTab('subjects')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'subjects' ? 'bg-[#00FFC8] text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            📖 Daftar Pelajaran ({subjectsList.length})
          </button>

          <button
            onClick={() => setActiveSubTab('cbt-quiz')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'cbt-quiz' ? 'bg-yellow-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            ⚡ Ujian CBT ({quizzesList.length})
          </button>

          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'schedule' ? 'bg-purple-500 text-white font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            📅 Jadwal Pelajaran
          </button>

          <button
            onClick={() => setActiveSubTab('library')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'library' ? 'bg-indigo-500 text-white font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            📚 Perpustakaan ({libraryBooks.length})
          </button>

          <button
            onClick={() => setActiveSubTab('announcements')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'announcements' ? 'bg-pink-500 text-white font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            📢 Pengumuman ({announcements.length})
          </button>
        </div>

        {/* ================= MODULE CONTENT ================= */}
        <div className="flex-1 space-y-6 overflow-y-auto max-h-[520px] pr-1">
          
          {/* TAB 1: OVERVIEW */}
          {activeSubTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#00D4FF]/20 space-y-2">
                <span className="text-xs text-slate-400">Total Registered Students</span>
                <h4 className="text-3xl font-extrabold text-white">{studentsList.length} Active Students</h4>
                <p className="text-xs text-[#00FFC8]">Google Sheets Table: Students</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-[#00FFC8]/20 space-y-2">
                <span className="text-xs text-slate-400">Subject Teachers</span>
                <h4 className="text-3xl font-extrabold text-white">{teachersList.length} Teachers</h4>
                <p className="text-xs text-slate-300">Google Sheets Table: Teachers</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121B2F] border border-purple-500/20 space-y-2">
                <span className="text-xs text-slate-400">CBT Online Exams</span>
                <h4 className="text-3xl font-extrabold text-white">{quizzesList.length} Exams Ready</h4>
                <p className="text-xs text-purple-300">Google Sheets Table: Quizzes</p>
              </div>

              <div className="md:col-span-3 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#00D4FF]" />
                  Pengumuman Sekolah Terbaru (Google Sheets: Announcements):
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

          {/* TAB 2: DATA MURID (WITH FULL GENDER, PHONE, PARENT PHONE, EMAIL) */}
          {activeSubTab === 'students' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#050816] p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">Filter Kelas:</span>
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

                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00FFC8] text-slate-950 hover:bg-[#00FFC8]/90 transition-all flex items-center gap-1.5 shadow-glow-turquoise"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Registrasi Siswa Baru</span>
                </button>
              </div>

              <div className="rounded-2xl bg-[#050816] border border-white/10 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#121B2F] text-[10px] uppercase font-bold text-[#00D4FF] border-b border-white/10">
                    <tr>
                      <th className="p-3">ID Student</th>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3">NISN</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Email Siswa</th>
                      <th className="p-3">No. HP Siswa</th>
                      <th className="p-3">Nama Orang Tua</th>
                      <th className="p-3">No. HP Orang Tua</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    {filteredStudents.map(st => (
                      <tr key={st.studentId} className="hover:bg-white/[0.02]">
                        <td className="p-3 text-[#00FFC8] font-bold">{st.studentId}</td>
                        <td className="p-3 font-sans font-bold text-white">{st.name}</td>
                        <td className="p-3 text-slate-300">{st.gender || 'Laki-laki'}</td>
                        <td className="p-3 text-slate-400">{st.studentNumber || st.nisn}</td>
                        <td className="p-3 text-[#00D4FF] font-bold">{st.classId}</td>
                        <td className="p-3 text-slate-300 font-sans">{st.email}</td>
                        <td className="p-3 text-slate-300">{st.phone || '0812-3456-7890'}</td>
                        <td className="p-3 font-sans text-slate-200">{st.parentName || 'Ortu'}</td>
                        <td className="p-3 text-[#00FFC8]">{st.parentPhone || '0812-9876-0001'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DATA GURU (WITH GENDER, PHONE, EMAIL, SUBJECT, ENTRY YEAR) */}
          {activeSubTab === 'teachers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#050816] p-4 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-white">Daftar Guru Pengajar (Google Sheets: Teachers)</h4>
                <button
                  onClick={() => setShowAddTeacherModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 transition-all flex items-center gap-1.5 shadow-glow-blue"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Registrasi Guru Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachersList.map(t => (
                  <div key={t.teacherId} className="p-5 rounded-2xl bg-[#050816] border border-[#0EA5E9]/30 space-y-2 hover:border-[#00D4FF] transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/30">
                        {t.teacherId} • {t.gender || 'Perempuan'}
                      </span>
                      <span className="text-[10px] text-green-400 font-mono">Tahun Masuk: {t.entryYear || 2022}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-[#00FFC8] font-semibold">{t.subject}</p>
                    <div className="pt-2 text-[11px] text-slate-300 space-y-1 font-mono border-t border-white/5">
                      <p>📧 Email: {t.email}</p>
                      <p>📞 Phone: {t.phone}</p>
                      <p>📍 Ruang Lab: {t.room || 'Physics Lab'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DAFTAR MATA PELAJARAN LENGKAP */}
          {activeSubTab === 'subjects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#050816] p-4 rounded-2xl border border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-white">Daftar Mata Pelajaran Kurikulum 2026</h4>
                  <p className="text-xs text-slate-400">Seluruh mata pelajaran wajib, sains, AI, dan bahasa.</p>
                </div>
                <button
                  onClick={() => setShowAddSubjectModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00FFC8] text-slate-950 hover:bg-[#00FFC8]/90 transition-all flex items-center gap-1.5 shadow-glow-turquoise"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Mata Pelajaran</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subjectsList.map(sub => (
                  <div key={sub.subjectId} className="p-5 rounded-2xl bg-[#121B2F] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00FFC8]/10 text-[#00FFC8]">
                        {sub.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{sub.subjectId}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{sub.subjectName}</h4>
                    <p className="text-xs text-[#00D4FF]">Pengajar Utama: {sub.teacherName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">Beban Belajar: {sub.weeklyHours} Jam / Minggu</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HALAMAN UJIAN ONLINE CBT (+ BUAT UJIAN BARU) */}
          {activeSubTab === 'cbt-quiz' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#050816] p-4 rounded-2xl border border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-white">Ujian Online CBT (Computer Based Test)</h4>
                  <p className="text-xs text-slate-400">Portal ujian online dengan hasil skor otomatis ke Google Sheets.</p>
                </div>
                <button
                  onClick={() => setShowAddQuizModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-yellow-500 text-slate-950 hover:bg-yellow-400 transition-all flex items-center gap-1.5 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Buat Ujian CBT Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzesList.map(qz => (
                  <div key={qz.quizId} className="p-5 rounded-2xl bg-[#121B2F] border border-yellow-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                        Target Kelas: {qz.classId}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{qz.quizId}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{qz.title}</h4>
                    <p className="text-xs text-[#00FFC8]">Mata Pelajaran: {qz.subject}</p>
                    <div className="text-[11px] text-slate-300 font-mono flex items-center justify-between border-t border-white/10 pt-2">
                      <span>⏱️ Durasi: {qz.duration}</span>
                      <span>📅 Tanggal: {qz.dueDate}</span>
                    </div>
                    <button
                      onClick={() => setActiveTestQuiz(qz)}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-yellow-500 text-slate-950 hover:bg-yellow-400 transition-all"
                    >
                      Mulai Kerjakan Ujian ini
                    </button>
                  </div>
                ))}
              </div>

              {/* ACTIVE TEST SIMULATION MODAL */}
              {activeTestQuiz && (
                <div className="p-6 rounded-2xl bg-[#050816] border border-yellow-500/40 space-y-4 mt-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-base font-bold text-white">Simulation: {activeTestQuiz.title}</h4>
                    <button onClick={() => setActiveTestQuiz(null)} className="text-xs text-slate-400 hover:text-white">Tutup Test</button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="p-4 rounded-xl bg-[#121B2F] space-y-2">
                      <p className="font-bold text-white">1. Apakah nama partikel dasar cahaya?</p>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input type="radio" name="simQ1" onChange={() => setSelectedAnswers({ ...selectedAnswers, 1: 'photon' })} />
                        <span>A) Photon</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input type="radio" name="simQ1" onChange={() => setSelectedAnswers({ ...selectedAnswers, 1: 'proton' })} />
                        <span>B) Proton</span>
                      </label>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121B2F] space-y-2">
                      <p className="font-bold text-white">2. Kecepatan gelombang elektromagnetik adalah...</p>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input type="radio" name="simQ2" onChange={() => setSelectedAnswers({ ...selectedAnswers, 2: 'speed' })} />
                        <span>A) 3 x 10^8 m/s</span>
                      </label>
                    </div>

                    <button
                      onClick={handleCbtQuizSubmit}
                      className="w-full py-3 rounded-xl font-bold text-xs bg-yellow-500 text-slate-950 hover:bg-yellow-400 transition-all"
                    >
                      Kirim Jawaban & Auto-Save Nilai ke Google Sheets
                    </button>
                    {quizScore !== null && (
                      <p className="text-center font-bold text-[#00FFC8] text-sm mt-2">
                        Skor Akhir: {quizScore}/100 (Tersimpan di Google Sheets!)
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: JADWAL PELAJARAN */}
          {activeSubTab === 'schedule' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#050816] border border-white/10">
                <h4 className="text-sm font-bold text-white mb-1">Jadwal Pelajaran Mingguan</h4>
                <p className="text-xs text-slate-400">Jadwal tatap muka dan praktikum lab.</p>
              </div>

              <div className="space-y-3">
                {INITIAL_SCHEDULES.map(sch => (
                  <div key={sch.id} className="p-4 rounded-2xl bg-[#121B2F] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#00FFC8] font-mono">{sch.day} • {sch.time}</span>
                      <h4 className="text-sm font-bold text-white">{sch.subject}</h4>
                      <p className="text-xs text-slate-400">{sch.teacher} • {sch.room}</p>
                    </div>
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#00D4FF]/10 text-[#00D4FF]">
                      Kelas {sch.classId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PERPUSTAKAAN DIGITAL */}
          {activeSubTab === 'library' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#050816] p-4 rounded-2xl border border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-white">Digital Library Vault</h4>
                  <p className="text-xs text-slate-400">E-book dan jurnal ilmiah dengan link web aktif.</p>
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
                      <h4 className="text-base font-bold text-white">{bk.title}</h4>
                      <p className="text-xs text-[#00D4FF]">Penulis: {bk.author}</p>
                      <p className="text-xs text-slate-400 mt-2">{bk.description}</p>
                    </div>
                    <a
                      href={bk.readUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-[#00D4FF] text-slate-950 hover:bg-[#00D4FF]/90 transition-all"
                    >
                      <span>Buka & Baca E-Book</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: HALAMAN PENGUMUMAN */}
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
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00D4FF]/20 text-[#00D4FF]">{ann.priority}</span>
                      <span className="text-xs font-bold text-[#00FFC8]">Target: {ann.targetClassId}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{ann.title}</h4>
                    <p className="text-xs text-slate-300">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>SmartSchool Portal v1 • Realtime Google Sheets Engine Active</span>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-[#00D4FF] text-slate-950 font-bold hover:bg-[#00D4FF]/90 transition-all shadow-glow-cyan">
            Tutup Portal
          </button>
        </div>

      </div>

      {/* FORM MODAL 1: ADD STUDENT (GENDER, PHONE, PARENT PHONE, EMAIL, CLASS, ENTRY YEAR) */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#0B1020] border border-[#00FFC8]/40 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Registrasi Siswa Baru (Auto-Save ke Sheets)</h3>
            <form onSubmit={handleAddStudentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Nama Lengkap Siswa:</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Contoh: Rian Hidayat"
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Jenis Kelamin (Gender):</label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Pilih Kelas:</label>
                  <select
                    value={newStudent.classId}
                    onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  >
                    {INITIAL_CLASSES.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">NISN / No. Induk:</label>
                  <input
                    type="text"
                    value={newStudent.studentNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, studentNumber: e.target.value })}
                    placeholder="2400109"
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Tahun Masuk (Entry Year):</label>
                  <input
                    type="number"
                    value={newStudent.entryYear}
                    onChange={(e) => setNewStudent({ ...newStudent, entryYear: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Email Siswa:</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="siswa@smartschool.edu"
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">No. HP Siswa:</label>
                  <input
                    type="text"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="0812-3456-7890"
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Nama Orang Tua / Wali:</label>
                  <input
                    type="text"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                    placeholder="Nama Ayah/Ibu"
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">No. HP Orang Tua:</label>
                  <input
                    type="text"
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                    placeholder="0812-9876-0001"
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#00FFC8] text-slate-950 font-bold shadow-glow-turquoise">Daftarkan & Auto-Save GS</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL 2: ADD TEACHER (GENDER, PHONE, EMAIL, SUBJECT, ENTRY YEAR) */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#0B1020] border border-[#0EA5E9]/40 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Registrasi Guru Baru (Auto-Save ke Sheets)</h3>
            <form onSubmit={handleAddTeacherSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Nama Lengkap Guru & Gelar:</label>
                <input
                  type="text"
                  required
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder="Dr. Evelyn Reed"
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Jenis Kelamin (Gender):</label>
                  <select
                    value={newTeacher.gender}
                    onChange={(e) => setNewTeacher({ ...newTeacher, gender: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  >
                    <option value="Perempuan">Perempuan</option>
                    <option value="Laki-laki">Laki-laki</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Tahun Masuk (Entry Year):</label>
                  <input
                    type="number"
                    value={newTeacher.entryYear}
                    onChange={(e) => setNewTeacher({ ...newTeacher, entryYear: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Mata Pelajaran Utama:</label>
                <input
                  type="text"
                  required
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                  placeholder="Advanced Physics & Quantum Science"
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Email Guru:</label>
                  <input
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    placeholder="guru@smartschool.edu"
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">No. Telepon/HP:</label>
                  <input
                    type="text"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    placeholder="0812-9876-5431"
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowAddTeacherModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#0EA5E9] text-white font-bold shadow-glow-blue">Daftarkan & Auto-Save GS</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL 3: ADD SUBJECT */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#0B1020] border border-[#00FFC8]/40 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Tambah Mata Pelajaran Baru</h3>
            <form onSubmit={handleAddSubjectSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Nama Mata Pelajaran:</label>
                <input
                  type="text"
                  required
                  value={newSubject.subjectName}
                  onChange={(e) => setNewSubject({ ...newSubject, subjectName: e.target.value })}
                  placeholder="Biotechnology & Quantum Chemistry"
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Kategori Mapel:</label>
                  <select
                    value={newSubject.category}
                    onChange={(e) => setNewSubject({ ...newSubject, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  >
                    <option value="Science & AI">Science & AI</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Technology">Technology</option>
                    <option value="Language">Language</option>
                    <option value="Social Science">Social Science</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Jam / Minggu:</label>
                  <input
                    type="number"
                    value={newSubject.weeklyHours}
                    onChange={(e) => setNewSubject({ ...newSubject, weeklyHours: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddSubjectModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#00FFC8] text-slate-950 font-bold shadow-glow-turquoise">Simpan Mapel GS</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL 4: CREATE CBT QUIZ EXAM */}
      {showAddQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#0B1020] border border-yellow-500/40 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Buat Ujian CBT Baru (Quizzes)</h3>
            <form onSubmit={handleAddQuizSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Judul Ujian CBT:</label>
                <input
                  type="text"
                  required
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  placeholder="Ujian Tengah Semester Fisika Kuantum"
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Pilih Mapel:</label>
                  <select
                    value={newQuiz.subject}
                    onChange={(e) => setNewQuiz({ ...newQuiz, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  >
                    {INITIAL_SUBJECTS.map(s => <option key={s.subjectId} value={s.subjectName}>{s.subjectName}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Target Kelas:</label>
                  <select
                    value={newQuiz.classId}
                    onChange={(e) => setNewQuiz({ ...newQuiz, classId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  >
                    {INITIAL_CLASSES.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Durasi Ujian:</label>
                  <input
                    type="text"
                    value={newQuiz.duration}
                    onChange={(e) => setNewQuiz({ ...newQuiz, duration: e.target.value })}
                    placeholder="30 mins"
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Tanggal Ujian:</label>
                  <input
                    type="date"
                    value={newQuiz.dueDate}
                    onChange={(e) => setNewQuiz({ ...newQuiz, dueDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddQuizModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-yellow-500 text-slate-950 font-bold shadow-lg">Terbitkan Ujian CBT</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL 5: ADD E-BOOK */}
      {showAddBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#0B1020] border border-purple-500/40 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Tambah Link E-Book Perpustakaan Digital</h3>
            <form onSubmit={handleAddBookSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Judul Buku / Jurnal:</label>
                <input
                  type="text"
                  required
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="Quantum Physics 2026"
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">URL Link Web E-Book:</label>
                <input
                  type="url"
                  required
                  value={newBook.readUrl}
                  onChange={(e) => setNewBook({ ...newBook, readUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddBookModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#00FFC8] text-slate-950 font-bold shadow-glow-turquoise">Simpan ke GS & Portal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL 6: ADD ANNOUNCEMENT */}
      {showAddAnnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#0B1020] border border-[#00D4FF]/40 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Buat Pengumuman Baru</h3>
            <form onSubmit={handleAddAnnSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Cakupan Pengumuman:</label>
                <select
                  value={newAnn.scope}
                  onChange={(e) => setNewAnn({ ...newAnn, scope: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                >
                  <option value="General">General (Seluruh Sekolah)</option>
                  <option value="Class">Khusus Kelas Tertentu</option>
                </select>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Judul Pengumuman:</label>
                <input
                  type="text"
                  required
                  value={newAnn.title}
                  onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Isi Pengumuman:</label>
                <textarea
                  required
                  rows={3}
                  value={newAnn.content}
                  onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#050816] border border-white/15 text-white resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddAnnModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#00D4FF] text-slate-950 font-bold shadow-glow-cyan">Kirim Pengumuman GS</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
