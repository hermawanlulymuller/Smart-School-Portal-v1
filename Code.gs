/**
 * Smart School Portal v1 - Complete Google Sheets Backend & REST API
 * Designed by Luly Agency
 * 
 * SETUP INSTRUCTIONS FOR GOOGLE SHEETS:
 * 1. Open Google Sheets -> Extensions -> Apps Script
 * 2. Delete all existing code and paste this entire Code.gs
 * 3. Click "Save" (Ctrl + S)
 * 4. Run setupDatabase() once to create all sheets automatically!
 * 5. Deploy -> New deployment -> Select type: "Web app"
 * 6. Execute as: "Me" | Who has access: "Anyone"
 * 7. Deploy and copy the Web App URL into SmartSchool Portal v1 UI!
 */

// ==================== DATABASE SETUP ====================
function setupDatabase() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    ss = SpreadsheetApp.create('SmartSchool_Portal_v1_DB');
    Logger.log('✅ Created new spreadsheet: ' + ss.getName());
  }
  
  Logger.log('🚀 Setting up SmartSchool Portal v1 Database...');
  
  // Default schemas & sheets
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
  
  // Add sample data if sheets are empty
  addSampleDataIfEmpty(ss);
  
  return { success: true, message: 'Database setup complete!', spreadsheetUrl: ss.getUrl() };
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
    attendanceSheet.appendRow(['ATT-001', 'STU-001', 'Alex Rivera', '10-A', new Date().toLocaleDateString(), '07:45 AM', 'Present', 'Main Gate QR Scan', 'On Time']);
  }
}

// ==================== REST API ENDPOINTS (GET & POST) ====================

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
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

    if (!action) {
      action = 'status';
    }

    let result = {};
    const ss = SpreadsheetApp.getActiveSpreadsheet() || setupDatabase();

    switch (action) {
      case 'setup':
      case 'setupDatabase':
        result = setupDatabase();
        break;

      case 'status':
        result = { success: true, status: 'Online', database: ss.getName(), url: ss.getUrl() };
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

      default:
        result = { success: false, error: 'Unknown action: ' + action };
    }

    return jsonResponse(result);

  } catch (err) {
    return jsonResponse({ success: false, error: err.message, stack: err.stack });
  }
}

// Helper to read all rows from a sheet as objects
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

// Helper to append a object row automatically
function appendRow(ss, sheetName, dataObj) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    // Automatically create sheet if it doesn't exist yet!
    const headers = Object.keys(dataObj);
    sheet = createSheetIfNotExists(ss, sheetName, headers);
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = headers.map(header => dataObj[header] !== undefined ? dataObj[header] : '');
  
  sheet.appendRow(newRow);
  return { success: true, message: `Row appended to sheet ${sheetName} successfully!`, rowData: dataObj };
}

// Helper to create JSON response with CORS
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
