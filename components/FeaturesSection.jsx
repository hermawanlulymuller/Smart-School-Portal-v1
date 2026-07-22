import React, { useState } from 'react';
import { 
  Bot, 
  QrCode, 
  FileText, 
  HelpCircle, 
  Award, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  Users, 
  MessageSquare, 
  Video, 
  CheckSquare, 
  Sparkles, 
  Activity, 
  TrendingUp, 
  Bell, 
  Calendar, 
  Cloud, 
  BrainCircuit,
  Search,
  ChevronRight,
  X
} from 'lucide-react';

export default function FeaturesSection({ lang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalFeature, setActiveModalFeature] = useState(null);

  const features = [
    {
      id: 1,
      title: 'AI Learning Assistant',
      category: 'AI & Learning',
      icon: Bot,
      desc: lang === 'EN' ? 'Personalized AI tutor assisting students with course materials and doubts 24/7.' : 'Tutor AI personal membantu siswa memahami materi dan pertanyaan 24/7.',
      badge: 'Core AI'
    },
    {
      id: 2,
      title: 'Smart Attendance (QR & Face Recognition)',
      category: 'Security & Auth',
      icon: QrCode,
      desc: lang === 'EN' ? 'Instant student & teacher check-in using facial recognition and encrypted QR codes.' : 'Presensi kilat siswa & guru dengan pengenalan wajah dan QR terenkripsi.',
      badge: 'Sub-Second Scan'
    },
    {
      id: 3,
      title: 'Online Examination System',
      category: 'Academic',
      icon: FileText,
      desc: lang === 'EN' ? 'Secure anti-cheat browser examination portal with automated timing and question randomization.' : 'Ujian online aman dengan proteksi anti-kecurangan dan acak soal otomatis.',
      badge: 'CBT System'
    },
    {
      id: 4,
      title: 'Question Bank Generator',
      category: 'AI & Learning',
      icon: HelpCircle,
      desc: lang === 'EN' ? 'Generate thousands of curriculum-standard questions categorized by difficulty level.' : 'Buat ribuan bank soal standar kurikulum secara otomatis berdasarkan tingkat kesulitan.',
      badge: 'Auto Generation'
    },
    {
      id: 5,
      title: 'AI Essay Scoring',
      category: 'AI & Learning',
      icon: Sparkles,
      desc: lang === 'EN' ? 'Automated grading for subjective essays with grammar, relevance, and feedback points.' : 'Penilaian otomatis esai subjektif dengan analisis tata bahasa dan umpan balik.',
      badge: 'AI Evaluator'
    },
    {
      id: 6,
      title: 'Digital Library & E-Books',
      category: 'Academic',
      icon: BookOpen,
      desc: lang === 'EN' ? 'Unlimited access to digital textbooks, research papers, journals, and interactive media.' : 'Akses ribuan buku digital, jurnal ilmiah, dan e-book interaktif tanpa batas.',
      badge: '24/7 Library'
    },
    {
      id: 7,
      title: 'Student Report Cards (E-Rapor)',
      category: 'Academic',
      icon: GraduationCap,
      desc: lang === 'EN' ? 'Automated digital report card generation with graphs and teacher remarks.' : 'Penerbitan e-rapor otomatis lengkap dengan grafik perkembangan dan catatan wali kelas.',
      badge: 'Auto Calculation'
    },
    {
      id: 8,
      title: 'School Finance & Tuition System',
      category: 'Administration',
      icon: DollarSign,
      desc: lang === 'EN' ? 'Manage tuition fees (SPP), invoices, payment gateways, and financial auditing.' : 'Manajemen SPP, pembukuan keuangan, payment gateway, dan audit laporan keuangan.',
      badge: 'Fintech Ready'
    },
    {
      id: 9,
      title: 'Parent Monitoring Portal',
      category: 'Communication',
      icon: Users,
      desc: lang === 'EN' ? 'Dedicated app for parents to track attendance, grades, announcements, and tuition status.' : 'Aplikasi khusus orang tua memantau presensi, nilai, pengumuman, dan pembayaran SPP.',
      badge: 'Parent Portal'
    },
    {
      id: 10,
      title: 'School Instant Chat',
      category: 'Communication',
      icon: MessageSquare,
      desc: lang === 'EN' ? 'Encrypted real-time messaging between teachers, students, and parent groups.' : 'Pesan instan terenkripsi antara guru, siswa, dan grup wali murid.',
      badge: 'Encrypted'
    },
    {
      id: 11,
      title: 'Video Learning Platform',
      category: 'AI & Learning',
      icon: Video,
      desc: lang === 'EN' ? 'Integrated virtual classrooms, recorded lectures, and interactive video quizzes.' : 'Kelas virtual terintegrasi, rekaman materi, dan kuis video interaktif.',
      badge: 'HD Streaming'
    },
    {
      id: 12,
      title: 'Homework Management',
      category: 'Academic',
      icon: CheckSquare,
      desc: lang === 'EN' ? 'Submit homework online, track deadlines, and receive instant teacher feedback.' : 'Kirim tugas secara online, pantau tenggat waktu, dan dapatkan revisi guru.',
      badge: 'Assignment Hub'
    },
    {
      id: 13,
      title: 'Certificate Generator',
      category: 'Administration',
      icon: Award,
      desc: lang === 'EN' ? 'Issue verifiable digital certificates for graduation, achievements, and extracurriculars.' : 'Penerbitan sertifikat digital terverifikasi untuk kelulusan dan prestasi siswa.',
      badge: 'Verifiable PDF'
    },
    {
      id: 14,
      title: 'Behavior Monitoring & Merit Points',
      category: 'Academic',
      icon: Activity,
      desc: lang === 'EN' ? 'Track student discipline, merit points, counselor notes, and behavioral growth.' : 'Catat poin kedisiplinan, prestasi siswa, dan rekam bimbingan konseling.',
      badge: 'Character Score'
    },
    {
      id: 15,
      title: 'Teacher Performance Analytics',
      category: 'Administration',
      icon: TrendingUp,
      desc: lang === 'EN' ? 'KPI tracking, lesson delivery metrics, and student evaluation feedback for teachers.' : 'Analisis KPI pengajar, efektivitas mengajar, dan evaluasi berkala guru.',
      badge: 'KPI Analytics'
    },
    {
      id: 16,
      title: 'Real-Time Notifications',
      category: 'Communication',
      icon: Bell,
      desc: lang === 'EN' ? 'Instant push notifications for urgent school announcements, exam schedules, and grades.' : 'Notifikasi instan untuk pengumuman mendesak, jadwal ujian, dan pengumuman nilai.',
      badge: 'Push Alerts'
    },
    {
      id: 17,
      title: 'Academic Calendar',
      category: 'Academic',
      icon: Calendar,
      desc: lang === 'EN' ? 'Centralized event calendar for holidays, exams, sports days, and parent meetings.' : 'Kalender akademik terpusat untuk hari libur, jadwal ujian, dan pertemuan wali murid.',
      badge: 'Auto Sync'
    },
    {
      id: 18,
      title: 'Cloud Storage Vault',
      category: 'Security & Auth',
      icon: Cloud,
      desc: lang === 'EN' ? 'Secure cloud repository for storing school documents, curriculum assets, and backups.' : 'Penyimpanan awan aman untuk berkas sekolah, RPP, dan cadangan data terenkripsi.',
      badge: 'Cloud Sync'
    },
    {
      id: 19,
      title: 'AI Recommendation System',
      category: 'AI & Learning',
      icon: BrainCircuit,
      desc: lang === 'EN' ? 'Personalized learning pathways suggesting remedial topics or advanced material.' : 'Rekomendasi materi pembelajaran kustom sesuai kebutuhan remedial atau pengayaan.',
      badge: 'Adaptive Path'
    }
  ];

  const categories = ['All', 'AI & Learning', 'Academic', 'Administration', 'Communication', 'Security & Auth'];

  const filteredFeatures = features.filter(f => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="features" className="relative py-24 bg-[#0B1020]/70 border-t border-[#00D4FF]/10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/30 uppercase tracking-widest">
            {lang === 'EN' ? 'ENTERPRISE CAPABILITIES' : 'KAPABILITAS ENTERPRISE'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            {lang === 'EN' ? '19 Powerful Platform Features' : '19 Fitur Ekosistem Lengkap'}
          </h2>
          <p className="text-slate-300 text-base">
            {lang === 'EN'
              ? 'Everything your school needs to operate with modern efficiency, security, and intelligence.'
              : 'Semua yang dibutuhkan sekolah Anda untuk beroperasi dengan efisiensi, keamanan, dan kecerdasan modern.'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-[#050816]/80 border border-white/10 backdrop-blur-xl">
          
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#00D4FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'EN' ? 'Filter features...' : 'Cari fitur...'}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B1020] border border-white/10 text-xs text-white placeholder-slate-500 focus:border-[#00D4FF] focus:outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#00D4FF] text-slate-950 shadow-glow-cyan'
                    : 'bg-[#121B2F] text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* 19 Rounded 24px Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveModalFeature(feat)}
                className="p-6 rounded-[24px] bg-[#0B1020]/90 border border-white/10 hover:border-[#00D4FF]/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 group-hover:scale-110 group-hover:bg-[#00D4FF] group-hover:text-slate-950 transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-300 bg-white/5 border border-white/10">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#00D4FF] font-semibold group-hover:text-[#00FFC8]">
                  <span>{lang === 'EN' ? 'Explore details' : 'Lihat detail'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Feature Detail Drawer/Modal */}
      {activeModalFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0B1020] border border-[#00D4FF]/40 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveModalFeature(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
                {React.createElement(activeModalFeature.icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00FFC8]">{activeModalFeature.category}</span>
                <h3 className="text-xl font-bold text-white">{activeModalFeature.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeModalFeature.desc}
            </p>
            <div className="p-4 rounded-2xl bg-[#121B2F] border border-white/10 text-xs text-slate-400 space-y-2 mb-6">
              <p className="font-bold text-white">Luly Agency Integration Note:</p>
              <p>Fully compliant with Ministry of Education regulations, customizable RBAC permissions, and real-time WebSocket events.</p>
            </div>
            <button
              onClick={() => setActiveModalFeature(null)}
              className="w-full py-3 rounded-xl font-bold text-xs bg-[#00D4FF] text-slate-950 hover:bg-[#00D4FF]/90 transition-all shadow-glow-cyan"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
