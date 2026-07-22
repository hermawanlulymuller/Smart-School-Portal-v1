/**
 * Smart School Portal v1 - Universal Backend & API Engine
 * Designed by Luly Agency
 * Pattern Architecture: Konveksi Kontrol Engine
 */

function setupDatabase() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    ss = SpreadsheetApp.create('SmartSchool_Portal_v1_DB');
  }
  
  const schemas = {
    'Students': ['studentId', 'name', 'gender', 'entryYear', 'studentNumber', 'password', 'classId', 'email', 'phone', 'parentName', 'parentPhone', 'status'],
    'Teachers': ['teacherId', 'name', 'gender', 'entryYear', 'teacherNumber', 'password', 'email', 'phone', 'status', 'subject'],
    'Classes': ['classId', 'className', 'gradeLevel', 'homeroomTeacher', 'capacity'],
    'Attendance': ['attendanceId', 'studentId', 'studentName', 'classId', 'date', 'time', 'status', 'location', 'notes'],
    'Library': ['id', 'title', 'author', 'category', 'readUrl', 'description'],
    'Extracurriculars': ['id', 'name', 'supervisor', 'scheduleDay', 'location', 'membersCount'],
    'Announcements': ['id', 'scope', 'targetClassId', 'title', 'content', 'date', 'priority', 'createdBy'],
    'Quizzes': ['quizId', 'title', 'subject', 'classId', 'dueDate', 'duration', 'createdBy', 'questionsJson'],
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
    studentsSheet.appendRow(['STU-1001', 'Alex Rivera', 'Laki-laki', 2026, '24001', 'password123', '10-A', 'alex@smartschool.edu', '08123456789', 'Robert Rivera', '08129876001', 'Active']);
    studentsSheet.appendRow(['STU-1002', 'Sarah Chen', 'Perempuan', 2026, '24002', 'password123', '10-A', 'sarah.c@smartschool.edu', '08123456790', 'David Chen', '08129876002', 'Active']);
  }
  
  const teachersSheet = ss.getSheetByName('Teachers');
  if (teachersSheet && teachersSheet.getLastRow() <= 1) {
    teachersSheet.appendRow(['TCH-001', 'Dr. Evelyn Reed', 'Perempuan', 2022, 'T2001', 'teacher123', 'evelyn@smartschool.edu', '08129876543', 'Active', 'Advanced Physics & Quantum Science']);
    teachersSheet.appendRow(['TCH-002', 'Prof. Marcus Vance', 'Laki-laki', 2021, 'T2002', 'teacher123', 'marcus@smartschool.edu', '08129876544', 'Active', 'Computer Science & AI Algorithms']);
  }

  const librarySheet = ss.getSheetByName('Library');
  if (librarySheet && librarySheet.getLastRow() <= 1) {
    librarySheet.appendRow(['LIB-001', 'Quantum Computing 2026', 'Dr. Evelyn Reed', 'Science & AI', 'https://arxiv.org', 'Guide on quantum neural networks.']);
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action) {
    return handleApiRequest(e);
  }
  return HtmlService.createHtmlOutput('SmartSchool API Engine Active');
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
    let ss = SpreadsheetApp.getActiveSpreadsheet() || setupDatabase();

    switch (action) {
      case 'setup':
      case 'setupDatabase':
        result = setupDatabase();
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

      case 'getLibrary':
        result = { success: true, data: readRows(ss, 'Library') };
        break;

      case 'getAnnouncements':
        result = { success: true, data: readRows(ss, 'Announcements') };
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

      case 'addLibraryBook':
        result = appendRow(ss, 'Library', payload.data || payload);
        break;

      case 'addAnnouncement':
        result = appendRow(ss, 'Announcements', payload.data || payload);
        break;

      case 'addAiLog':
        result = appendRow(ss, 'AiLogs', payload.data || payload);
        break;

      default:
        result = { success: false, error: 'Invalid action: ' + action };
    }

    return jsonResponse(result);

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

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
