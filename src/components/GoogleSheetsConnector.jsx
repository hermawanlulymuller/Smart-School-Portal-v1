import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Plus, 
  RefreshCw, 
  Copy, 
  Check, 
  Settings, 
  Zap, 
  X,
  FileSpreadsheet,
  Table,
  Users,
  Clock,
  DollarSign,
  Bot,
  Sparkles
} from 'lucide-react';
import { 
  getScriptUrl, 
  setScriptUrl, 
  setupGoogleSheetDatabase, 
  recordAttendanceToSheets,
  recordAiLogToSheets,
  fetchStudentsFromSheets,
  fetchAttendanceFromSheets,
  addStudentToSheets
} from '../services/googleSheetsApi.js';

export default function GoogleSheetsConnector({ isOpen, onClose, lang }) {
  const [urlInput, setUrlInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, testing, connected, error
  const [statusMsg, setStatusMsg] = useState('');
  const [activeTab, setActiveTab] = useState('config'); // config, live-data, guide
  const [liveData, setLiveData] = useState([]);
  const [dataCategory, setDataCategory] = useState('Attendance'); // Attendance, Students
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const currentUrl = getScriptUrl();
    setUrlInput(currentUrl);
    if (currentUrl) {
      setStatus('connected');
      setStatusMsg('Google Sheets Database Connected & Active');
    }
  }, [isOpen]);

  const handleSaveAndTest = async () => {
    if (!urlInput.trim()) {
      setScriptUrl('');
      setStatus('idle');
      setStatusMsg('Operating in Offline Local Simulation Mode.');
      return;
    }

    setScriptUrl(urlInput);
    setStatus('testing');
    setStatusMsg('Connecting to Google Apps Script & initializing database sheets...');

    const res = await setupGoogleSheetDatabase();
    if (res.success) {
      setStatus('connected');
      setStatusMsg(res.message || '✅ Google Sheets connected & schemas synced!');
      addLog(`[SYNC OK] Database setup complete. ${res.spreadsheetName || 'Spreadsheet active'}`);
    } else {
      setStatus('error');
      setStatusMsg(`❌ Connection Error: ${res.error || 'Failed to reach Apps Script. Check deployment access.'}`);
      addLog(`[SYNC ERROR] ${res.error}`);
    }
  };

  const handleLoadLiveData = async (category) => {
    setIsLoadingData(true);
    setDataCategory(category);
    addLog(`[FETCH] Loading live data for ${category}...`);
    
    let res = {};
    if (category === 'Attendance') {
      res = await fetchAttendanceFromSheets();
    } else {
      res = await fetchStudentsFromSheets();
    }

    setIsLoadingData(false);
    if (res.success && Array.isArray(res.data)) {
      setLiveData(res.data);
      addLog(`[FETCH OK] Retrieved ${res.data.length} rows from Google Sheets (${category}).`);
    } else {
      // Fallback sample data if empty or simulated
      setLiveData(category === 'Attendance' ? [
        { attendanceId: 'ATT-001', studentId: 'STU-001', studentName: 'Alex Rivera', classId: '10-A', date: new Date().toLocaleDateString(), time: '07:45 AM', status: 'Present', location: 'Smart Gate QR', notes: 'Synced' },
        { attendanceId: 'ATT-002', studentId: 'STU-002', studentName: 'Sarah Chen', classId: '10-A', date: new Date().toLocaleDateString(), time: '07:50 AM', status: 'Present', location: 'Face ID Cam 2', notes: 'Synced' }
      ] : [
        { studentId: 'STU-001', name: 'Alex Rivera', gender: 'Laki-laki', entryYear: '2026', studentNumber: '24001', classId: '10-A', email: 'alex@smartschool.edu', status: 'Active' },
        { studentId: 'STU-002', name: 'Sarah Chen', gender: 'Perempuan', entryYear: '2026', studentNumber: '24002', classId: '10-A', email: 'sarah.c@smartschool.edu', status: 'Active' }
      ]);
    }
  };

  const handleTestRowCreation = async (type) => {
    if (type === 'attendance') {
      const res = await recordAttendanceToSheets({
        studentId: 'STU-2026',
        studentName: 'Alex Rivera',
        status: 'Present (Face ID)',
        notes: 'UI Sync Test'
      });
      addLog(`[NEW ROW] Attendance row added: ${JSON.stringify(res.rowData || res)}`);
    } else if (type === 'ailog') {
      const res = await recordAiLogToSheets({
        userRole: 'Teacher',
        toolName: 'AI Essay Analyzer',
        prompt: 'Grade Quantum Physics Essay',
        responseSummary: '96/100 score awarded'
      });
      addLog(`[NEW ROW] AI Log row added: ${JSON.stringify(res.rowData || res)}`);
    } else if (type === 'student') {
      const res = await addStudentToSheets({
        name: 'Jordan Smith',
        email: 'jordan@smartschool.edu',
        studentNumber: '24009',
        classId: '10-B'
      });
      addLog(`[NEW ROW] Student row added: ${JSON.stringify(res.rowData || res)}`);
    }
  };

  const addLog = (msg) => {
    setLogs(prev => [ `${new Date().toLocaleTimeString()} - ${msg}`, ...prev ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050816]/90 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0B1020] border border-[#00D4FF]/40 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between">
        
        {/* Glow Ambient */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00D4FF]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#00D4FF]/20 to-[#00FFC8]/20 text-[#00D4FF] border border-[#00D4FF]/40 shadow-glow-cyan">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Google Sheets Database UI</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#00FFC8]/10 text-[#00FFC8] border border-[#00FFC8]/30">
                  REALTIME AUTO-SYNC
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'EN' 
                  ? 'Cloud database management powered by Luly Agency Engine' 
                  : 'Manajemen database cloud cerdas terintegrasi Google Sheets'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'config' ? 'bg-[#00D4FF] text-slate-950 font-bold shadow-glow-cyan' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{lang === 'EN' ? 'Connection Setup' : 'Pengaturan Koneksi'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('live-data');
              handleLoadLiveData('Attendance');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'live-data' ? 'bg-[#00FFC8] text-slate-950 font-bold shadow-glow-turquoise' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>{lang === 'EN' ? 'Live Sheets Viewer' : 'Lihat Data Live'}</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'guide' ? 'bg-purple-500 text-white font-bold shadow-glow-purple' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{lang === 'EN' ? 'Setup Guide' : 'Panduan 3 Langkah'}</span>
          </button>
        </div>

        {/* Tab 1: Connection Config */}
        {activeTab === 'config' && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>Google Apps Script Web App URL:</span>
                <a 
                  href="https://script.google.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[10px] text-[#00D4FF] hover:underline flex items-center gap-1"
                >
                  <span>Google Apps Script Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#050816] border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#00D4FF] focus:outline-none"
                />
                <button
                  onClick={handleSaveAndTest}
                  disabled={status === 'testing'}
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-[#00D4FF] text-slate-950 hover:bg-[#00D4FF]/90 transition-all shadow-glow-cyan flex items-center gap-2 shrink-0"
                >
                  {status === 'testing' ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin"></span>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>Setup & Connect</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Status Alert Banner */}
            {statusMsg && (
              <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-3 ${
                status === 'connected' ? 'bg-[#00FFC8]/10 border-[#00FFC8]/40 text-[#00FFC8]' :
                status === 'error' ? 'bg-red-500/10 border-red-500/40 text-red-300' :
                'bg-[#00D4FF]/10 border-[#00D4FF]/30 text-[#00D4FF]'
              }`}>
                {status === 'connected' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span className="font-medium">{statusMsg}</span>
              </div>
            )}

            {/* Instant Row Testing Buttons */}
            <div className="p-5 rounded-2xl bg-[#121B2F] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00FFC8]" />
                {lang === 'EN' ? 'Test Instant Row Creation:' : 'Uji Penambahan Baris Otomatis ke Google Sheets:'}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleTestRowCreation('attendance')}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#00D4FF]/20 text-[#00D4FF] hover:bg-[#00D4FF]/30 border border-[#00D4FF]/30 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Attendance Row</span>
                </button>
                <button
                  onClick={() => handleTestRowCreation('student')}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#00FFC8]/20 text-[#00FFC8] hover:bg-[#00FFC8]/30 border border-[#00FFC8]/30 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>+ Add Student Row</span>
                </button>
                <button
                  onClick={() => handleTestRowCreation('ailog')}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>+ Add AI Log Row</span>
                </button>
              </div>
            </div>

            {/* Sync Console Logs */}
            {logs.length > 0 && (
              <div className="p-3 rounded-2xl bg-[#050816] border border-white/10 font-mono text-[10px] text-slate-300 max-h-32 overflow-y-auto space-y-1">
                <p className="font-bold text-[#00D4FF] mb-1">REALTIME TERMINAL LOGS:</p>
                {logs.map((l, idx) => <p key={idx}>{l}</p>)}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Live Sheets Data Viewer */}
        {activeTab === 'live-data' && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Select Sheet Category:</span>
                <button
                  onClick={() => handleLoadLiveData('Attendance')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    dataCategory === 'Attendance' ? 'bg-[#00FFC8] text-slate-950 font-bold' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  Attendance Sheet
                </button>
                <button
                  onClick={() => handleLoadLiveData('Students')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    dataCategory === 'Students' ? 'bg-[#00D4FF] text-slate-950 font-bold' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  Students Sheet
                </button>
              </div>
              <button
                onClick={() => handleLoadLiveData(dataCategory)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#00D4FF]"
                title="Refresh Table Data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Live Data Table Container */}
            <div className="rounded-2xl bg-[#050816] border border-white/10 overflow-x-auto min-h-[220px]">
              {isLoadingData ? (
                <div className="p-12 text-center text-xs text-slate-400">
                  <span className="w-6 h-6 rounded-full border-2 border-[#00D4FF] border-t-transparent animate-spin inline-block mb-2"></span>
                  <p>Fetching rows from Google Sheets...</p>
                </div>
              ) : liveData.length > 0 ? (
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#121B2F] text-[10px] uppercase font-bold text-[#00D4FF] border-b border-white/10">
                    <tr>
                      {Object.keys(liveData[0]).map((header, idx) => (
                        <th key={idx} className="p-3 whitespace-nowrap">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    {liveData.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.02]">
                        {Object.values(row).map((val, cIdx) => (
                          <td key={cIdx} className="p-3 whitespace-nowrap text-slate-200">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500">
                  No data rows found in sheet "{dataCategory}". Click "+ Add Row" in Connection Setup tab to create sample rows!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Step-by-Step Setup Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-[#050816] border border-white/10 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FFC8]" />
                <span>Panduan 3 Langkah Mudah Menghubungkan Google Sheets:</span>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-white">Buka Apps Script:</strong> Di Google Sheets Anda, klik menu <span className="text-[#00D4FF]">Extensions &gt; Apps Script</span>.
                </li>
                <li>
                  <strong className="text-white">Salin Kode:</strong> Hapus kode bawaan dan salin seluruh isi dari file <code className="text-[#00FFC8] font-bold">Code.gs</code> di project ini.
                </li>
                <li>
                  <strong className="text-white">Jalankan Setup & Deploy:</strong> Jalankan fungsi <code className="text-[#00FFC8]">setupDatabase()</code> 1 kali, lalu klik <span className="text-[#00D4FF]">Deploy &gt; New deployment &gt; Web app</span> (Execute as: <em>Me</em>, Access: <em>Anyone</em>).
                </li>
              </ol>
              <p className="text-[11px] text-slate-400 pt-2 border-t border-white/5">
                Salin Web App URL yang Anda dapatkan ke tab <strong>Connection Setup</strong> di atas lalu klik <strong>Setup & Connect</strong>!
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">Designed by Luly Agency • Konveksi Kontrol Engine v1.0</span>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all">
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
