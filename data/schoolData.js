/**
 * SmartSchool Portal v1 - Centralized Master Database & Dummy Data
 * Includes full student rosters per class, teachers for all subjects,
 * weekly class timetables, digital e-book library, extracurriculars,
 * and general & class-specific announcements.
 */

export const INITIAL_CLASSES = [
  { id: '10-A', name: '10-A Science & AI', grade: 10, homeroom: 'Dr. Evelyn Reed', capacity: 32 },
  { id: '10-B', name: '10-B Social & Business', grade: 10, homeroom: 'Prof. Marcus Vance', capacity: 30 },
  { id: '11-A', name: '11-A Advanced Physics & STEM', grade: 11, homeroom: 'Mrs. Sarah Lin', capacity: 32 },
  { id: '11-B', name: '11-B Humanities & Tech', grade: 11, homeroom: 'Mr. David Miller', capacity: 28 },
  { id: '12-A', name: '12-A Robotics & BioTech', grade: 12, homeroom: 'Dr. Raymond Vance', capacity: 34 },
  { id: '12-B', name: '12-B Economics & Global Studies', grade: 12, homeroom: 'Ms. Clara Oswald', capacity: 30 }
];

export const INITIAL_STUDENTS = [
  // Class 10-A
  { studentId: 'STU-1001', name: 'Alex Rivera', classId: '10-A', nisn: '2400101', email: 'alex.r@smartschool.edu', status: 'Active', gpa: 3.94, attendance: '99.2%', parentName: 'Robert Rivera' },
  { studentId: 'STU-1002', name: 'Sarah Chen', classId: '10-A', nisn: '2400102', email: 'sarah.c@smartschool.edu', status: 'Active', gpa: 3.98, attendance: '100%', parentName: 'David Chen' },
  { studentId: 'STU-1003', name: 'Budi Santoso', classId: '10-A', nisn: '2400103', email: 'budi.s@smartschool.edu', status: 'Active', gpa: 3.75, attendance: '97.5%', parentName: 'Ahmad Santoso' },
  { studentId: 'STU-1004', name: 'Citra Dewi', classId: '10-A', nisn: '2400104', email: 'citra.d@smartschool.edu', status: 'Active', gpa: 3.88, attendance: '98.0%', parentName: 'Hendra Dewi' },

  // Class 10-B
  { studentId: 'STU-1005', name: 'Jordan Smith', classId: '10-B', nisn: '2400201', email: 'jordan.s@smartschool.edu', status: 'Active', gpa: 3.65, attendance: '96.4%', parentName: 'Michael Smith' },
  { studentId: 'STU-1006', name: 'Dian Sastro', classId: '10-B', nisn: '2400202', email: 'dian.s@smartschool.edu', status: 'Active', gpa: 3.82, attendance: '98.5%', parentName: 'Rudi Sastro' },
  { studentId: 'STU-1007', name: 'Fajar Pratama', classId: '10-B', nisn: '2400203', email: 'fajar.p@smartschool.edu', status: 'Active', gpa: 3.58, attendance: '95.0%', parentName: 'Bambang Pratama' },

  // Class 11-A
  { studentId: 'STU-1101', name: 'Evelyn Taylor', classId: '11-A', nisn: '2300101', email: 'evelyn.t@smartschool.edu', status: 'Active', gpa: 3.92, attendance: '99.0%', parentName: 'James Taylor' },
  { studentId: 'STU-1102', name: 'Gita Gutawa', classId: '11-A', nisn: '2300102', email: 'gita.g@smartschool.edu', status: 'Active', gpa: 3.90, attendance: '98.8%', parentName: 'Erwin Gutawa' },
  { studentId: 'STU-1103', name: 'Hendra Wijaya', classId: '11-A', nisn: '2300103', email: 'hendra.w@smartschool.edu', status: 'Active', gpa: 3.79, attendance: '97.2%', parentName: 'Surya Wijaya' },

  // Class 12-A
  { studentId: 'STU-1201', name: 'Kevin Durant', classId: '12-A', nisn: '2200101', email: 'kevin.d@smartschool.edu', status: 'Active', gpa: 4.00, attendance: '100%', parentName: 'Wayne Durant' },
  { studentId: 'STU-1202', name: 'Indah Permata', classId: '12-A', nisn: '2200102', email: 'indah.p@smartschool.edu', status: 'Active', gpa: 3.95, attendance: '99.5%', parentName: 'Agus Permata' }
];

export const INITIAL_TEACHERS = [
  { teacherId: 'TCH-001', name: 'Dr. Evelyn Reed', subject: 'Advanced Physics & Quantum Science', email: 'evelyn.reed@smartschool.edu', phone: '0812-9876-5431', status: 'Active', room: 'Physics Lab 3A' },
  { teacherId: 'TCH-002', name: 'Prof. Marcus Vance', subject: 'Computer Science & AI Algorithms', email: 'marcus.vance@smartschool.edu', phone: '0812-9876-5432', status: 'Active', room: 'Cyber Lab 1' },
  { teacherId: 'TCH-003', name: 'Mrs. Sarah Lin, M.Sc', subject: 'Mathematics & Calculus', email: 'sarah.lin@smartschool.edu', phone: '0812-9876-5433', status: 'Active', room: 'Math Hall 204' },
  { teacherId: 'TCH-004', name: 'Mr. David Miller', subject: 'English & Global Communication', email: 'david.miller@smartschool.edu', phone: '0812-9876-5434', status: 'Active', room: 'Language Room B' },
  { teacherId: 'TCH-005', name: 'Dr. Raymond Vance', subject: 'Biotechnology & Organic Chemistry', email: 'raymond.vance@smartschool.edu', phone: '0812-9876-5435', status: 'Active', room: 'Bio Chem Lab' },
  { teacherId: 'TCH-006', name: 'Ms. Clara Oswald', subject: 'Economics & Financial Literacy', email: 'clara.oswald@smartschool.edu', phone: '0812-9876-5436', status: 'Active', room: 'Economics Room 102' },
  { teacherId: 'TCH-007', name: 'Bapak Bambang Hidayat', subject: 'Indonesian Language & Literature', email: 'bambang.h@smartschool.edu', phone: '0812-9876-5437', status: 'Active', room: 'Indonesian Hall' },
  { teacherId: 'TCH-008', name: 'Ibu Ratna Pertiwi', subject: 'World History & Social Sciences', email: 'ratna.p@smartschool.edu', phone: '0812-9876-5438', status: 'Active', room: 'History Room 105' },
  { teacherId: 'TCH-009', name: 'Coach Alexandro Silva', subject: 'Physical Education & Health', email: 'alex.silva@smartschool.edu', phone: '0812-9876-5439', status: 'Active', room: 'Sports Arena' }
];

export const INITIAL_SCHEDULES = [
  { id: 'SCH-01', day: 'Monday', time: '08:00 - 09:30 AM', subject: 'Advanced Physics & AI', classId: '10-A', teacher: 'Dr. Evelyn Reed', room: 'Physics Lab 3A' },
  { id: 'SCH-02', day: 'Monday', time: '09:45 - 11:15 AM', subject: 'Computer Science & AI', classId: '10-A', teacher: 'Prof. Marcus Vance', room: 'Cyber Lab 1' },
  { id: 'SCH-03', day: 'Monday', time: '11:30 - 01:00 PM', subject: 'Mathematics & Calculus', classId: '10-A', teacher: 'Mrs. Sarah Lin', room: 'Room 204' },
  
  { id: 'SCH-04', day: 'Tuesday', time: '08:00 - 09:30 AM', subject: 'Biotechnology', classId: '10-A', teacher: 'Dr. Raymond Vance', room: 'Bio Chem Lab' },
  { id: 'SCH-05', day: 'Tuesday', time: '09:45 - 11:15 AM', subject: 'English Communication', classId: '10-A', teacher: 'Mr. David Miller', room: 'Language Room B' },
  
  { id: 'SCH-06', day: 'Wednesday', time: '08:00 - 09:30 AM', subject: 'Economics & Finance', classId: '10-B', teacher: 'Ms. Clara Oswald', room: 'Room 102' },
  { id: 'SCH-07', day: 'Wednesday', time: '09:45 - 11:15 AM', subject: 'Indonesian Literature', classId: '10-B', teacher: 'Bapak Bambang Hidayat', room: 'Room 104' }
];

export const INITIAL_LIBRARY_BOOKS = [
  {
    id: 'LIB-001',
    title: 'Quantum Computing & Machine Learning 2026',
    author: 'Dr. Evelyn Reed',
    category: 'Science & AI',
    readUrl: 'https://arxiv.org/abs/2301.00001',
    coverBg: 'from-[#00D4FF]/20 to-[#00FFC8]/20',
    description: 'Comprehensive guide on quantum neural networks, qubit entanglement, and modern AI algorithms.'
  },
  {
    id: 'LIB-002',
    title: 'Data Structures & Algorithms in Modern JavaScript',
    author: 'Prof. Marcus Vance',
    category: 'Computer Science',
    readUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    coverBg: 'from-[#0EA5E9]/20 to-[#00D4FF]/20',
    description: 'Master binary trees, dynamic programming, and sub-second sorting algorithms.'
  },
  {
    id: 'LIB-003',
    title: 'Multivariable Calculus & Physics Applications',
    author: 'Mrs. Sarah Lin',
    category: 'Mathematics',
    readUrl: 'https://openstax.org/details/books/calculus-volume-3',
    coverBg: 'from-purple-500/20 to-[#00D4FF]/20',
    description: 'Vector calculus, partial derivatives, and electromagnetic wave field integrals.'
  },
  {
    id: 'LIB-004',
    title: 'Global Macroeconomics & Digital Currencies',
    author: 'Ms. Clara Oswald',
    category: 'Economics',
    readUrl: 'https://www.worldbank.org/en/publication/global-economic-prospects',
    coverBg: 'from-yellow-500/20 to-[#00FFC8]/20',
    description: 'Analysis of central bank digital assets, inflation models, and fintech ecosystem.'
  }
];

export const INITIAL_EXTRACURRICULARS = [
  {
    id: 'EX-01',
    name: 'AI & Robotics Club',
    supervisor: 'Prof. Marcus Vance',
    scheduleDay: 'Every Tuesday & Thursday (15:30 - 17:00)',
    location: 'Cyber Robotics Lab 2',
    membersCount: 42,
    badgeColor: 'text-[#00D4FF] bg-[#00D4FF]/10 border-[#00D4FF]/30'
  },
  {
    id: 'EX-02',
    name: 'STEM Science Olympiad Squad',
    supervisor: 'Dr. Evelyn Reed',
    scheduleDay: 'Every Wednesday (15:30 - 17:30)',
    location: 'Physics Lab 3A',
    membersCount: 28,
    badgeColor: 'text-[#00FFC8] bg-[#00FFC8]/10 border-[#00FFC8]/30'
  },
  {
    id: 'EX-03',
    name: 'Basketball & Athletics League',
    supervisor: 'Coach Alexandro Silva',
    scheduleDay: 'Every Monday & Friday (16:00 - 18:00)',
    location: 'Indoor Sports Arena',
    membersCount: 55,
    badgeColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
  },
  {
    id: 'EX-04',
    name: 'English Debating & Model UN',
    supervisor: 'Mr. David Miller',
    scheduleDay: 'Every Thursday (15:30 - 17:00)',
    location: 'Auditorium Hall',
    membersCount: 34,
    badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30'
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ANN-001',
    scope: 'General', // General (Whole School) or Class Specific
    targetClassId: 'All',
    title: 'Pengumuman Pelaksanaan Ujian CBT Semester Genap 2026',
    content: 'Seluruh siswa diharapkan mempersiapkan perangkat akun SmartSchool Portal v1 untuk pelaksanaan Ujian Online CBT yang akan dimulai tanggal 10 Agustus 2026.',
    date: '22 Juli 2026',
    priority: 'Urgent',
    createdBy: 'Headmaster Office'
  },
  {
    id: 'ANN-002',
    scope: 'General',
    targetClassId: 'All',
    title: 'Peluncuran Fitur Google Sheets Realtime Auto-Sync',
    content: 'Seluruh data presensi QR, nilai kuis AI, dan modul ajar kini tersinkronisasi otomatis secara dua arah dengan Google Sheets database sekolah.',
    date: '21 Juli 2026',
    priority: 'General',
    createdBy: 'System Administrator'
  },
  {
    id: 'ANN-003',
    scope: 'Class',
    targetClassId: '10-A',
    title: 'Pengumpulan Tugas Lab Fisika Kuantum (Kelas 10-A)',
    content: 'Khusus kelas 10-A, laporan praktikum simulasi fisika kuantum wajib diunggah ke portal paling lambat hari Jumat pukul 23:59 WIB.',
    date: '22 Juli 2026',
    priority: 'Academic',
    createdBy: 'Dr. Evelyn Reed'
  },
  {
    id: 'ANN-004',
    scope: 'Class',
    targetClassId: '10-B',
    title: 'Jadwal Presentasi Riset Ekonomi Mikro (Kelas 10-B)',
    content: 'Kelompok 1-4 kelas 10-B dipersiapkan untuk mempresentasikan hasil analisis pasar mikro di Room 102.',
    date: '20 Juli 2026',
    priority: 'Academic',
    createdBy: 'Ms. Clara Oswald'
  }
];
