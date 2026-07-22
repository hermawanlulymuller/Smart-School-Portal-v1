/**
 * Smart School Portal v1 - Universal Backend & API Engine
 * Designed by Luly Agency
 * Pattern Architecture: Konveksi Kontrol / Universal Enterprise SaaS
 * 
 * FEATURES:
 * 1. Dual Mode Support:
 *    - Standalone Web App (Opens directly in Google Apps Script)
 *    - Headless REST API Backend (Integrates seamlessly with Vercel / Next.js / Vite React frontend)
 * 2. Automatic Schema Initialization (setupDatabase):
 *    - Creates missing sheets (Students, Teachers, Classes, Attendance, Quizzes, QuizResults, Announcements, Finance, AiLogs)
 *    - Formats headers with dark luxury styling (#0B1020 & #00D4FF)
 * 3. Dynamic Auto-Row & Auto-Sheet Generator:
 *    - Appends data automatically to matching columns
 *    - Auto-creates new sheets on demand if missing
 */

// ==================== DATABASE INITIALIZATION ====================
function setupDatabase() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    ss = SpreadsheetApp.create('SmartSchool_Portal_v1_DB');
    Logger.log('✅ Created new spreadsheet: ' + ss.getName());
  }
  
  Logger.log('🚀 Initializing SmartSchool Database (Konveksi Kontrol Pattern)...');
  
  const schemas = {
    'Students': ['studentId', 'name', 'gender', 'entryYear', 'studentNumber', 'password', 'classId', 'email', 'phone', 'parentName', 'parentPhone', 'status'],
    'Teachers': ['teacherId', 'name', 'gender', 'entryYear', 'teacherNumber', 'password', 'email', 'phone', 'status', 'subject'],
    'Classes': ['classId', 'className', 'gradeLevel', 'homeroomTeacher', 'capacity'],
    'Attendance': ['attendanceId', 'studentId', 'studentName', 'classId', 'date', 'time', 'status', 'location', 'notes'],
    'Quizzes': ['quizId', 'title', 'subject', 'classId', 'dueDate', 'duration', 'createdBy', 'questionsJson'],
    'QuizResults': ['resultId', 'quizId', 'studentId', 'studentName', 'score', 'correctCount', 'wrongCount', 'submittedAt'],
    'Announcements': ['id', 'title', 'content', 'date', 'type', 'createdBy'],
    'Finance': ['invoiceId', 'studentId', 'studentName', 'amount', 'paymentType', 'status', 'date'],
    'AiLogs': ['logId', 'userRole', 'toolName', 'prompt', 'responseSummary', 'timestamp']
  };
  
  for (const [sheetName, headers] of Object.entries(schemas)) {
    createSheetIfNotExists(ss, sheetName, headers);
  }
  
  addSampleDataIfEmpty(ss);
  
  return { 
    success: true, 
    message: 'Database setup complete!', 
    spreadsheetName: ss.getName(),
    spreadsheetUrl: ss.getUrl() 
  };
}

function createSheetIfNotExists(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#0B1020')
               .setFontColor('#00D4FF')
               .setFontWeight('bold')
               .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function addSampleDataIfEmpty(ss) {
  const studentsSheet = ss.getSheetByName('Students');
  if (studentsSheet && studentsSheet.getLastRow() <= 1) {
    studentsSheet.appendRow(['STU-001', 'Alex Rivera', 'Laki-laki', 2026, '24001', 'password123', '10-A', 'alex@smartschool.edu', '08123456789', 'Robert Rivera', '08129876001', 'Active']);
    studentsSheet.appendRow(['STU-002', 'Sarah Chen', 'Perempuan', 2026, '24002', 'password123', '10-A', 'sarah.c@smartschool.edu', '08123456790', 'David Chen', '08129876002', 'Active']);
  }
  
  const teachersSheet = ss.getSheetByName('Teachers');
  if (teachersSheet && teachersSheet.getLastRow() <= 1) {
    teachersSheet.appendRow(['TCH-001', 'Dr. Evelyn Reed', 'Perempuan', 2022, 'T2001', 'teacher123', 'evelyn@smartschool.edu', '08129876543', 'Active', 'Advanced Physics']);
    teachersSheet.appendRow(['TCH-002', 'Prof. Marcus Vance', 'Laki-laki', 2021, 'T2002', 'teacher123', 'marcus@smartschool.edu', '08129876544', 'Active', 'Computer Science']);
  }

  const attendanceSheet = ss.getSheetByName('Attendance');
  if (attendanceSheet && attendanceSheet.getLastRow() <= 1) {
    attendanceSheet.appendRow(['ATT-001', 'STU-001', 'Alex Rivera', '10-A', new Date().toLocaleDateString(), '07:45 AM', 'Present', 'Smart Gate QR', 'On Time']);
  }
}

// ==================== CONTROLLER ROUTER (GET & POST) ====================

function doGet(e) {
  // If request contains API parameter ?action=... return JSON API
  if (e && e.parameter && e.parameter.action) {
    return handleApiRequest(e);
  }
  
  // Otherwise, render HTML Web App Interface if accessed directly
  try {
    const htmlOutput = HtmlService.createHtmlOutput('<!DOCTYPE html><html><head><title>SmartSchool Portal API</title><style>body{background:#050816;color:#00D4FF;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;} .card{background:#0B1020;padding:30px;border-radius:20px;border:1px solid rgba(0,212,255,0.3);text-align:center;max-width:400px;} h1{color:#fff;font-size:22px;} p{color:#94a3b8;font-size:14px;}</style></head><body><div class="card"><h1>SmartSchool Portal v1 API</h1><p>Backend Status: <strong>ONLINE</strong></p><p>Pattern: Konveksi Kontrol Engine</p><p>Powered by Luly Agency</p></div></body></html>');
    return htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch(err) {
    return HtmlService.createHtmlOutput('SmartSchool API Engine Online');
  }
}

function doPost(e) {
  return handleApiRequest(e);
}

function handleApiRequest(e) {
  try {
    let action = '';
    let payload = {};

    if (e && e.parameter && e.parameter.action) {
      action = e.parameter.action;
      payload = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      const parsed = JSON.parse(e.postData.contents);
      action = parsed.action;
      payload = parsed;
    }

    if (!action) action = 'status';

    let result = {};
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      const initRes = setupDatabase();
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    switch (action) {
      case 'setup':
      case 'setupDatabase':
        result = setupDatabase();
        break;

      case 'status':
        result = { success: true, status: 'Online', database: ss ? ss.getName() : 'Active', pattern: 'Konveksi Kontrol' };
        break;

      case 'getStudents':
        result = { success: true, data: readRows(ss, 'Students') };
        break;

      case 'getTeachers':
        result = { success: true, data: readRows(ss, 'Teachers') };
        break;

      case 'getAttendance':
        result = { success: true, data: readRows(ss, 'Attendance') };
        break;

      case 'getFinance':
        result = { success: true, data: readRows(ss, 'Finance') };
        break;

      case 'addStudent':
        result = appendRow(ss, 'Students', payload.data || payload);
        break;

      case 'addTeacher':
        result = appendRow(ss, 'Teachers', payload.data || payload);
        break;

      case 'addAttendance':
        result = appendRow(ss, 'Attendance', payload.data || payload);
        break;

      case 'addAiLog':
        result = appendRow(ss, 'AiLogs', payload.data || payload);
        break;

      case 'addFinance':
        result = appendRow(ss, 'Finance', payload.data || payload);
        break;

      case 'addQuiz':
        result = appendRow(ss, 'Quizzes', payload.data || payload);
        break;

      default:
        result = { success: false, error: 'Invalid action: ' + action };
    }

    return jsonResponse(result);

  } catch (err) {
    return jsonResponse({ success: false, error: err.message, stack: err.stack });
  }
}

// Read rows as JSON array of objects
function readRows(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0];
  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[i][j];
    }
    rows.push(obj);
  }
  return rows;
}

// Append object row dynamically
function appendRow(ss, sheetName, dataObj) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    const headers = Object.keys(dataObj);
    sheet = createSheetIfNotExists(ss, sheetName, headers);
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = headers.map(header => dataObj[header] !== undefined ? dataObj[header] : '');
  
  sheet.appendRow(newRow);
  return { success: true, message: `Data saved to sheet ${sheetName}!`, rowData: dataObj };
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
