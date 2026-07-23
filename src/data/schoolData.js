/**
 * SmartSchool Portal v1 - Master Datasets
 */

export const INITIAL_CLASSES = [
  { id: '10-A', name: '10-A Science & AI', grade: 10, homeroom: 'Dr. Evelyn Reed', capacity: 32 },
  { id: '10-B', name: '10-B Social & Business', grade: 10, homeroom: 'Prof. Marcus Vance', capacity: 30 },
  { id: '11-A', name: '11-A Advanced Physics & STEM', grade: 11, homeroom: 'Mrs. Sarah Lin', capacity: 32 },
  { id: '11-B', name: '11-B Humanities & Tech', grade: 11, homeroom: 'Mr. David Miller', capacity: 28 },
  { id: '12-A', name: '12-A Robotics & BioTech', grade: 12, homeroom: 'Dr. Raymond Vance', capacity: 34 },
  { id: '12-B', name: '12-B Economics & Global Studies', grade: 12, homeroom: 'Ms. Clara Oswald', capacity: 30 }
];

export const INITIAL_SUBJECTS = [
  { subjectId: 'SUB-001', subjectName: 'Advanced Physics & Quantum Science', category: 'Science & AI', teacherName: 'Dr. Evelyn Reed', weeklyHours: 4 },
  { subjectId: 'SUB-002', subjectName: 'Computer Science & AI Algorithms', category: 'Technology', teacherName: 'Prof. Marcus Vance', weeklyHours: 4 },
  { subjectId: 'SUB-003', subjectName: 'Mathematics & Calculus', category: 'Mathematics', teacherName: 'Mrs. Sarah Lin', weeklyHours: 5 },
  { subjectId: 'SUB-004', subjectName: 'Biotechnology & Organic Chemistry', category: 'Science', teacherName: 'Dr. Raymond Vance', weeklyHours: 4 },
  { subjectId: 'SUB-005', subjectName: 'English & Global Communication', category: 'Language', teacherName: 'Mr. David Miller', weeklyHours: 3 },
  { subjectId: 'SUB-006', subjectName: 'Economics & Financial Literacy', category: 'Social Science', teacherName: 'Ms. Clara Oswald', weeklyHours: 3 },
  { subjectId: 'SUB-007', subjectName: 'Bahasa Indonesia & Sastra', category: 'Language', teacherName: 'Bapak Bambang Hidayat', weeklyHours: 3 },
  { subjectId: 'SUB-008', subjectName: 'World History & Culture', category: 'Social Science', teacherName: 'Ibu Ratna Pertiwi', weeklyHours: 2 },
  { subjectId: 'SUB-009', subjectName: 'Physical Education & Health', category: 'Sports', teacherName: 'Coach Alexandro Silva', weeklyHours: 2 }
];

export const INITIAL_STUDENTS = [
  // Class 10-A
  { studentId: 'STU-1001', name: 'Alex Rivera', gender: 'Laki-laki', entryYear: 2026, studentNumber: '2400101', classId: '10-A', email: 'alex.r@smartschool.edu', phone: '0812-3456-7890', parentName: 'Robert Rivera', parentPhone: '0812-9876-0001', status: 'Active', gpa: 3.94, attendance: '99.2%' },
  { studentId: 'STU-1002', name: 'Sarah Chen', gender: 'Perempuan', entryYear: 2026, studentNumber: '2400102', classId: '10-A', email: 'sarah.c@smartschool.edu', phone: '0812-3456-7891', parentName: 'David Chen', parentPhone: '0812-9876-0002', status: 'Active', gpa: 3.98, attendance: '100%' },
  { studentId: 'STU-1003', name: 'Budi Santoso', gender: 'Laki-laki', entryYear: 2026, studentNumber: '2400103', classId: '10-A', email: 'budi.s@smartschool.edu', phone: '0812-3456-7892', parentName: 'Ahmad Santoso', parentPhone: '0812-9876-0003', status: 'Active', gpa: 3.75, attendance: '97.5%' },
  { studentId: 'STU-1004', name: 'Citra Dewi', gender: 'Perempuan', entryYear: 2026, studentNumber: '2400104', classId: '10-A', email: 'citra.d@smartschool.edu', phone: '0812-3456-7893', parentName: 'Hendra Dewi', parentPhone: '0812-9876-0004', status: 'Active', gpa: 3.88, attendance: '98.0%' },

  // Class 10-B
  { studentId: 'STU-1005', name: 'Jordan Smith', gender: 'Laki-laki', entryYear: 2026, studentNumber: '2400201', classId: '10-B', email: 'jordan.s@smartschool.edu', phone: '0812-3456-7894', parentName: 'Michael Smith', parentPhone: '0812-9876-0005', status: 'Active', gpa: 3.65, attendance: '96.4%' },
  { studentId: 'STU-1006', name: 'Dian Sastro', gender: 'Perempuan', entryYear: 2026, studentNumber: '2400202', classId: '10-B', email: 'dian.s@smartschool.edu', phone: '0812-3456-7895', parentName: 'Rudi Sastro', parentPhone: '0812-9876-0006', status: 'Active', gpa: 3.82, attendance: '98.5%' }
];

export const INITIAL_TEACHERS = [
  { teacherId: 'TCH-001', name: 'Dr. Evelyn Reed', gender: 'Perempuan', entryYear: 2022, teacherNumber: 'T2001', subject: 'Advanced Physics & Quantum Science', email: 'evelyn.reed@smartschool.edu', phone: '0812-9876-5431', status: 'Active', room: 'Physics Lab 3A' },
  { teacherId: 'TCH-002', name: 'Prof. Marcus Vance', gender: 'Laki-laki', entryYear: 2021, teacherNumber: 'T2002', subject: 'Computer Science & AI Algorithms', email: 'marcus.vance@smartschool.edu', phone: '0812-9876-5432', status: 'Active', room: 'Cyber Lab 1' },
  { teacherId: 'TCH-003', name: 'Mrs. Sarah Lin, M.Sc', gender: 'Perempuan', entryYear: 2020, teacherNumber: 'T2003', subject: 'Mathematics & Calculus', email: 'sarah.lin@smartschool.edu', phone: '0812-9876-5433', status: 'Active', room: 'Math Hall 204' },
  { teacherId: 'TCH-004', name: 'Mr. David Miller', gender: 'Laki-laki', entryYear: 2023, teacherNumber: 'T2004', subject: 'English & Global Communication', email: 'david.miller@smartschool.edu', phone: '0812-9876-5434', status: 'Active', room: 'Language Room B' },
  { teacherId: 'TCH-005', name: 'Dr. Raymond Vance', gender: 'Laki-laki', entryYear: 2019, teacherNumber: 'T2005', subject: 'Biotechnology & Organic Chemistry', email: 'raymond.vance@smartschool.edu', phone: '0812-9876-5435', status: 'Active', room: 'Bio Chem Lab' }
];

export const INITIAL_QUIZZES = [
  { quizId: 'QZ-001', title: 'Ujian CBT Fisika Kuantum & AI', subject: 'Advanced Physics & Quantum Science', classId: '10-A', dueDate: '2026-08-15', duration: '15 mins', createdBy: 'Dr. Evelyn Reed', questionsCount: 5 },
  { quizId: 'QZ-002', title: 'CBT Midterm Computer Science & Algorithms', subject: 'Computer Science & AI Algorithms', classId: '10-A', dueDate: '2026-08-18', duration: '30 mins', createdBy: 'Prof. Marcus Vance', questionsCount: 10 }
];

export const INITIAL_SCHEDULES = [
  { id: 'SCH-01', day: 'Monday', time: '08:00 - 09:30 AM', subject: 'Advanced Physics & AI', classId: '10-A', teacher: 'Dr. Evelyn Reed', room: 'Physics Lab 3A' },
  { id: 'SCH-02', day: 'Monday', time: '09:45 - 11:15 AM', subject: 'Computer Science & AI', classId: '10-A', teacher: 'Prof. Marcus Vance', room: 'Cyber Lab 1' },
  { id: 'SCH-03', day: 'Monday', time: '11:30 - 01:00 PM', subject: 'Mathematics & Calculus', classId: '10-A', teacher: 'Mrs. Sarah Lin', room: 'Room 204' }
];

export const INITIAL_LIBRARY_BOOKS = [
  {
    id: 'LIB-001',
    title: 'Quantum Computing & Machine Learning 2026',
    author: 'Dr. Evelyn Reed',
    category: 'Science & AI',
    readUrl: 'https://arxiv.org/abs/2301.00001',
    description: 'Comprehensive guide on quantum neural networks, qubit entanglement, and modern AI algorithms.'
  },
  {
    id: 'LIB-002',
    title: 'Data Structures & Algorithms in Modern JavaScript',
    author: 'Prof. Marcus Vance',
    category: 'Computer Science',
    readUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    description: 'Master binary trees, dynamic programming, and sub-second sorting algorithms.'
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
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ANN-001',
    scope: 'General',
    targetClassId: 'All',
    title: 'Pengumuman Pelaksanaan Ujian CBT Semester Genap 2026',
    content: 'Seluruh siswa diharapkan mempersiapkan akun SmartSchool Portal v1 untuk pelaksanaan Ujian Online CBT yang akan dimulai tanggal 10 Agustus 2026.',
    date: '22 Juli 2026',
    priority: 'Urgent',
    createdBy: 'Headmaster Office'
  },
  {
    id: 'ANN-002',
    scope: 'Class',
    targetClassId: '10-A',
    title: 'Pengumpulan Tugas Lab Fisika Kuantum (Kelas 10-A)',
    content: 'Khusus kelas 10-A, laporan praktikum simulasi fisika kuantum wajib diunggah ke portal paling lambat hari Jumat pukul 23:59 WIB.',
    date: '22 Juli 2026',
    priority: 'Academic',
    createdBy: 'Dr. Evelyn Reed'
  }
];
