import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  FileCheck, 
  BrainCircuit, 
  LineChart, 
  UserCheck, 
  MessageSquare, 
  BarChart, 
  BookOpen, 
  Mic, 
  Play, 
  ArrowRight,
  Send,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function AiSection({ lang }) {
  const [activeAiDemo, setActiveAiDemo] = useState(0);
  const [demoInput, setDemoInput] = useState('Generate a Quiz on Quantum Physics for Grade 12');
  const [demoOutput, setDemoOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const aiFeatures = [
    {
      id: 'homework',
      title: 'AI Homework Assistant',
      icon: Bot,
      desc: lang === 'EN' 
        ? 'Step-by-step problem solver and personalized study tutor for students in any subject.'
        : 'Solusi soal bertahap dan tutor belajar personal untuk siswa dalam semua mata pelajaran.',
      badge: '24/7 Student Tutor'
    },
    {
      id: 'quiz',
      title: 'AI Quiz Generator',
      icon: Sparkles,
      desc: lang === 'EN'
        ? 'Generate custom quizzes, multiple-choice tests, and answer keys in seconds from any curriculum topic.'
        : 'Buat kuis otomatis, soal pilihan ganda, dan kunci jawaban dalam hitungan detik.',
      badge: 'Instant Creation'
    },
    {
      id: 'lesson',
      title: 'AI Lesson Planner',
      icon: BookOpen,
      desc: lang === 'EN'
        ? 'Create comprehensive lesson plans, teaching objectives, and activity timelines aligned with national standards.'
        : 'Susun RPP/Modul ajar lengkap, capaian pembelajaran, dan matriks kegiatan belajar.',
      badge: 'Teacher Saver'
    },
    {
      id: 'exam',
      title: 'AI Exam Analyzer',
      icon: FileCheck,
      desc: lang === 'EN'
        ? 'Automated essay grading, sentiment analysis, and difficulty breakdown for teacher evaluations.'
        : 'Penilaian esai otomatis, analisis tingkat kesulitan soal, dan umpan balik akademis.',
      badge: 'Automated Scoring'
    },
    {
      id: 'prediction',
      title: 'AI Student Performance Prediction',
      icon: BrainCircuit,
      desc: lang === 'EN'
        ? 'Predict student academic trajectories and detect learning gaps before exams occur.'
        : 'Prediksi nilai akhir siswa dan deteksi titik kelemahan belajar sebelum ujian berlangsung.',
      badge: 'Early Intervention'
    },
    {
      id: 'attendance',
      title: 'AI Attendance Insights',
      icon: UserCheck,
      desc: lang === 'EN'
        ? 'Biometric & QR scan anomaly detection to identify patterns in tardiness or absenteeism.'
        : 'Deteksi anomali kehadiran via QR & Face ID untuk analisis pola kedisiplinan siswa.',
      badge: 'Biometric Analytics'
    },
    {
      id: 'chatbot',
      title: 'AI Chatbot Assistant',
      icon: MessageSquare,
      desc: lang === 'EN'
        ? 'Smart conversational assistant answering student questions, school FAQs, and schedule queries.'
        : 'Asisten percakapan cerdas menjawab pertanyaan siswa, informasi sekolah, dan jadwal.',
      badge: 'Multi-lingual Chat'
    },
    {
      id: 'analytics',
      title: 'AI School Analytics',
      icon: BarChart,
      desc: lang === 'EN'
        ? 'Executive dashboard aggregating cross-departmental data into actionable strategic insights.'
        : 'Dashboard eksekutif menggabungkan data lintas departemen menjadi keputusan strategis.',
      badge: 'Executive Level'
    },
    {
      id: 'curriculum',
      title: 'AI Curriculum Planner',
      icon: LineChart,
      desc: lang === 'EN'
        ? 'Optimize course syllabus structures and balance learning loads across semesters.'
        : 'Optimalkan struktur silabus mata pelajaran dan distribusi beban belajar tiap semester.',
      badge: 'Syllabus Optimization'
    },
    {
      id: 'voice',
      title: 'AI Voice Assistant',
      icon: Mic,
      desc: lang === 'EN'
        ? 'Voice-driven commands for quick attendance marking, announcement broadcasts, and audio dictation.'
        : 'Perintah suara untuk pencatatan presensi kilat, siaran pengumuman, dan dikte RPP.',
      badge: 'Hands-free Voice'
    }
  ];

  const handleRunAiDemo = () => {
    setIsGenerating(true);
    setDemoOutput('');
    setTimeout(() => {
      setIsGenerating(false);
      setDemoOutput(
        `✨ [AI ENGINE RESULT - LULY AGENCY KERNEL]\n\nTopic: ${demoInput}\n\nGenerated 5 Questions:\n1. What is the fundamental particle of light? (Ans: Photon)\n2. Explain Heisenberg's Uncertainty Principle in 2 sentences.\n3. Calculate the energy of a photon with wavelength 500nm.\n\nDifficulty Rating: Moderate (Grade 12 Level)\nEstimated Time: 15 minutes`
      );
    }, 1200);
  };

  return (
    <section id="ai-features" className="relative py-24 bg-[#050816] overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#00FFC8]/10 via-[#00D4FF]/10 to-transparent rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FFC8]/10 border border-[#00FFC8]/30 text-xs font-bold text-[#00FFC8] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>POWERED BY ARTIFICIAL INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            {lang === 'EN' ? '10 Special AI Features Built-In' : '10 Fitur Spesial Berbasis AI'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {lang === 'EN'
              ? 'Empower your institution with cutting-edge artificial intelligence designed by Luly Agency.'
              : 'Perkuat institusi pendidikan Anda dengan kecerdasan buatan mutakhir yang dirancang oleh Luly Agency.'}
          </p>
        </div>

        {/* 10 AI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {aiFeatures.map((feat, index) => {
            const IconComp = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveAiDemo(index)}
                className={`p-6 rounded-3xl bg-[#0B1020]/90 border border-white/10 hover:border-[#00FFC8]/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group shadow-xl ${
                  activeAiDemo === index ? 'border-[#00FFC8] shadow-glow-turquoise bg-[#121B2F]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[#00FFC8]/10 text-[#00FFC8] border border-[#00FFC8]/20 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#00FFC8] bg-[#00FFC8]/10 border border-[#00FFC8]/20">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FFC8] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Live AI Playground Box */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0B1020] via-[#121B2F] to-[#050816] border border-[#00FFC8]/40 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold text-[#00FFC8] uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> AI Sandbox Interactive Console
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">
                {aiFeatures[activeAiDemo].title} - {lang === 'EN' ? 'Live Simulator' : 'Simulasi Langsung'}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
              Luly AI Kernel v2.4 Active
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Side */}
            <div className="space-y-4">
              <label className="text-xs font-semibold text-slate-300 block">
                {lang === 'EN' ? 'Enter Prompt or Topic Instruction:' : 'Masukkan Instruksi / Topik Pembelajaran:'}
              </label>
              <textarea
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                rows={4}
                className="w-full p-4 rounded-2xl bg-[#050816] border border-white/15 text-sm text-slate-100 placeholder-slate-500 focus:border-[#00FFC8] focus:outline-none focus:ring-1 focus:ring-[#00FFC8] transition-all resize-none font-sans"
                placeholder="Type prompt..."
              />
              <button
                onClick={handleRunAiDemo}
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-slate-950 bg-[#00FFC8] hover:bg-[#00FFC8]/90 transition-all flex items-center justify-center gap-2 shadow-glow-turquoise disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin"></span>
                    <span>{lang === 'EN' ? 'AI Processing...' : 'AI Memproses...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === 'EN' ? 'Run AI Generator' : 'Jalankan AI Generator'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Side */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#050816]/90 border border-white/10 flex flex-col justify-between font-mono text-xs text-slate-300 min-h-[200px]">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[10px] text-slate-400">
                  <span>TERMINAL_OUTPUT</span>
                  <span className="text-[#00FFC8]">STATUS: 200 OK</span>
                </div>
                {demoOutput ? (
                  <pre className="whitespace-pre-wrap font-mono text-slate-200 text-xs leading-relaxed">
                    {demoOutput}
                  </pre>
                ) : (
                  <p className="text-slate-500 italic py-6 text-center">
                    {lang === 'EN' ? 'Click "Run AI Generator" to preview live output.' : 'Klik "Jalankan AI Generator" untuk melihat simulasi.'}
                  </p>
                )}
              </div>
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                <span>Model: Luly-GPT-4o-School</span>
                <span>Latency: 42ms</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
