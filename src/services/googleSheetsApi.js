/**
 * SmartSchool Portal v1 - Realtime Google Sheets Database Service
 * Provides bidirectional real-time sync (Pull data from Sheets & Auto-save to Sheets)
 */

const STORAGE_KEY_URL = 'smartschool_google_script_url';

export const getScriptUrl = () => {
  return localStorage.getItem(STORAGE_KEY_URL) || import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
};

export const setScriptUrl = (url) => {
  if (url) {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_URL);
  }
};

async function callSheetsApi(action, payload = {}) {
  const scriptUrl = getScriptUrl();
  if (!scriptUrl) {
    // Local simulation fallback
    return { success: true, simulated: true, action, payload };
  }

  try {
    const bodyData = { action, ...payload };
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`[GoogleSheetsAPI Error] Action "${action}" failed:`, error);
    return { success: false, error: error.message };
  }
}

// ================= PULL DATA FROM GOOGLE SHEETS =================
export async function setupGoogleSheetDatabase() {
  return await callSheetsApi('setupDatabase');
}

export async function fetchStudentsFromSheets() {
  return await callSheetsApi('getStudents');
}

export async function fetchTeachersFromSheets() {
  return await callSheetsApi('getTeachers');
}

export async function fetchAttendanceFromSheets() {
  return await callSheetsApi('getAttendance');
}

export async function fetchLibraryFromSheets() {
  return await callSheetsApi('getLibrary');
}

export async function fetchAnnouncementsFromSheets() {
  return await callSheetsApi('getAnnouncements');
}

// ================= REALTIME AUTO-SAVE TO GOOGLE SHEETS =================
export async function recordAttendanceToSheets(attendanceObj) {
  const data = {
    attendanceId: `ATT-${Date.now()}`,
    studentId: attendanceObj.studentId || 'STU-1001',
    studentName: attendanceObj.studentName || 'Alex Rivera',
    classId: attendanceObj.classId || '10-A',
    date: new Date().toLocaleDateString('id-ID'),
    time: new Date().toLocaleTimeString('id-ID'),
    status: attendanceObj.status || 'Present',
    location: attendanceObj.location || 'Smart Gate QR',
    notes: attendanceObj.notes || 'Realtime Auto-Sync'
  };
  return await callSheetsApi('addAttendance', { data });
}

export async function recordAiLogToSheets(aiLogObj) {
  const data = {
    logId: `LOG-${Date.now()}`,
    userRole: aiLogObj.userRole || 'Student',
    toolName: aiLogObj.toolName || 'AI Generator',
    prompt: aiLogObj.prompt || '',
    responseSummary: aiLogObj.responseSummary || 'Generated Successfully',
    timestamp: new Date().toLocaleString('id-ID')
  };
  return await callSheetsApi('addAiLog', { data });
}

export async function addStudentToSheets(studentObj) {
  const data = {
    studentId: studentObj.studentId || `STU-${Date.now()}`,
    name: studentObj.name,
    gender: studentObj.gender || 'Laki-laki',
    entryYear: studentObj.entryYear || 2026,
    studentNumber: studentObj.studentNumber || '24001',
    password: studentObj.password || 'password123',
    classId: studentObj.classId || '10-A',
    email: studentObj.email || '',
    phone: studentObj.phone || '',
    parentName: studentObj.parentName || '',
    parentPhone: studentObj.parentPhone || '',
    status: 'Active'
  };
  return await callSheetsApi('addStudent', { data });
}

export async function addTeacherToSheets(teacherObj) {
  const data = {
    teacherId: teacherObj.teacherId || `TCH-${Date.now()}`,
    name: teacherObj.name,
    gender: teacherObj.gender || 'Perempuan',
    entryYear: teacherObj.entryYear || 2026,
    teacherNumber: teacherObj.teacherNumber || 'T2001',
    password: teacherObj.password || 'teacher123',
    email: teacherObj.email || '',
    phone: teacherObj.phone || '',
    status: 'Active',
    subject: teacherObj.subject || 'General'
  };
  return await callSheetsApi('addTeacher', { data });
}

export async function addLibraryBookToSheets(bookObj) {
  const data = {
    id: bookObj.id || `LIB-${Date.now()}`,
    title: bookObj.title,
    author: bookObj.author || 'Guest Author',
    category: bookObj.category || 'General',
    readUrl: bookObj.readUrl || 'https://google.com',
    description: bookObj.description || ''
  };
  return await callSheetsApi('addLibraryBook', { data });
}

export async function addAnnouncementToSheets(annObj) {
  const data = {
    id: annObj.id || `ANN-${Date.now()}`,
    scope: annObj.scope || 'General',
    targetClassId: annObj.targetClassId || 'All',
    title: annObj.title,
    content: annObj.content,
    date: new Date().toLocaleDateString('id-ID'),
    priority: annObj.priority || 'General',
    createdBy: annObj.createdBy || 'Teacher'
  };
  return await callSheetsApi('addAnnouncement', { data });
}
