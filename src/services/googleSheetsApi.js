/**
 * SmartSchool Portal v1 - Google Sheets Database Service
 * Handles automatic row creation, sheet creation, and API sync with Google Sheets.
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

/**
 * Execute request to Google Apps Script Web App
 */
async function callSheetsApi(action, payload = {}) {
  const scriptUrl = getScriptUrl();
  if (!scriptUrl) {
    console.warn(`[GoogleSheetsAPI] No Script URL configured. Action "${action}" simulated locally.`);
    return { success: true, simulated: true, action, payload };
  }

  try {
    // We send payload as URL params or JSON body
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

/**
 * Run 1-Click Database Setup on Google Sheets
 */
export async function setupGoogleSheetDatabase() {
  return await callSheetsApi('setupDatabase');
}

/**
 * Get Students from Google Sheets
 */
export async function fetchStudentsFromSheets() {
  return await callSheetsApi('getStudents');
}

/**
 * Get Teachers from Google Sheets
 */
export async function fetchTeachersFromSheets() {
  return await callSheetsApi('getTeachers');
}

/**
 * Get Attendance log from Google Sheets
 */
export async function fetchAttendanceFromSheets() {
  return await callSheetsApi('getAttendance');
}

/**
 * Add Attendance Row automatically to Google Sheets
 */
export async function recordAttendanceToSheets(attendanceObj) {
  const data = {
    attendanceId: `ATT-${Date.now()}`,
    studentId: attendanceObj.studentId || 'STU-001',
    studentName: attendanceObj.studentName || 'Alex Rivera',
    classId: attendanceObj.classId || '10-A',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    status: attendanceObj.status || 'Present',
    location: attendanceObj.location || 'Smart Gate QR',
    notes: attendanceObj.notes || 'Automated Sync'
  };
  return await callSheetsApi('addAttendance', { data });
}

/**
 * Add AI Log Row automatically to Google Sheets
 */
export async function recordAiLogToSheets(aiLogObj) {
  const data = {
    logId: `LOG-${Date.now()}`,
    userRole: aiLogObj.userRole || 'Student',
    toolName: aiLogObj.toolName || 'AI Quiz Generator',
    prompt: aiLogObj.prompt || '',
    responseSummary: aiLogObj.responseSummary || 'Generated Successfully',
    timestamp: new Date().toISOString()
  };
  return await callSheetsApi('addAiLog', { data });
}

/**
 * Add Student Row automatically to Google Sheets
 */
export async function addStudentToSheets(studentObj) {
  const data = {
    studentId: `STU-${Date.now()}`,
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

/**
 * Add Teacher Row automatically to Google Sheets
 */
export async function addTeacherToSheets(teacherObj) {
  const data = {
    teacherId: `TCH-${Date.now()}`,
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
