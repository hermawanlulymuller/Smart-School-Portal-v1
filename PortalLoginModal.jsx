import React, { useState } from 'react';
import { 
  GraduationCap, 
  Presentation, 
  ShieldCheck, 
  X, 
  Lock, 
  Mail, 
  QrCode, 
  Fingerprint, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Globe
} from 'lucide-react';

export default function PortalLoginModal({ role, onClose, onLaunchDashboard, lang }) {
  const [activeRole, setActiveRole] = useState(role || 'Student');
  const [loginMethod, setLoginMethod] = useState('password'); // password, qr, sso, biometric
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(false);

  const getRoleMeta = () => {
    switch (activeRole) {
      case 'Teacher':
        return {
          title: lang === 'EN' ? 'Teacher Portal Login' : 'Login Portal Guru',
          icon: Presentation,
          glow: 'from-[#0EA5E9]/20',
          border: 'border-[#0EA5E9]/50',
          btnBg: 'bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white shadow-glow-blue',
          defaultEmail: 'teacher.sarah@smartschool.edu'
        };
      case 'Administrator':
        return {
          title: lang === 'EN' ? 'Administrator Portal Login' : 'Login Portal Admin',
          icon: ShieldCheck,
          glow: 'from-purple-500/20',
          border: 'border-purple-500/50',
          btnBg: 'bg-gradient-to-r from-purple-500 via-[#00D4FF] to-[#00FFC8] text-slate-950 shadow-glow-purple',
          defaultEmail: 'admin.director@smartschool.edu'
        };
      default:
        return {
          title: lang === 'EN' ? 'Student Portal Login' : 'Login Portal Siswa',
          icon: GraduationCap,
          glow: 'from-[#00D4FF]/20',
          border: 'border-[#00D4FF]/50',
          btnBg: 'bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-slate-950 shadow-glow-cyan',
          defaultEmail: 'student.alex@smartschool.edu'
        };
    }
  };

  const meta = getRoleMeta();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLaunchDashboard(activeRole);
    }, 1000);
  };

  const handleSimulateScan = () => {
    setScanProgress(true);
    setTimeout(() => {
      setScanProgress(false);
      onLaunchDashboard(activeRole);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-xl animate-in fade-in">
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-md rounded-3xl bg-[#0B1020] border ${meta.border} p-6 sm:p-8 shadow-2xl overflow-hidden`}>
        
        {/* Glow backdrop */}
        <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-b ${meta.glow} to-transparent pointer-events-none blur-xl`}></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Role Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#050816] border border-white/10 mb-6">
          {['Student', 'Teacher', 'Administrator'].map((r) => (
            <button
              key={r}
              onClick={() => {
                setActiveRole(r);
                setEmail('');
              }}
              className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all ${
                activeRole === r 
                  ? r === 'Student' ? 'bg-[#00D4FF] text-slate-950 shadow-glow-cyan' :
                    r === 'Teacher' ? 'bg-[#0EA5E9] text-white shadow-glow-blue' :
                    'bg-purple-500 text-white shadow-glow-purple'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-3 text-[#00D4FF]">
            {React.createElement(meta.icon, { className: 'w-7 h-7' })}
          </div>
          <h3 className="text-2xl font-extrabold text-white">{meta.title}</h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'EN' ? 'SmartSchool Enterprise SSO & Biometric System' : 'Sistem SSO & Biometrik Enterprise SmartSchool'}
          </p>
        </div>

        {/* Authentication Methods Tabs */}
        <div className="flex justify-center gap-4 mb-6 border-b border-white/10 pb-3 text-xs font-semibold">
          <button
            onClick={() => setLoginMethod('password')}
            className={`pb-1 transition-all ${loginMethod === 'password' ? 'text-[#00D4FF] border-b-2 border-[#00D4FF]' : 'text-slate-400'}`}
          >
            {lang === 'EN' ? 'Password' : 'Kata Sandi'}
          </button>
          <button
            onClick={() => setLoginMethod('qr')}
            className={`pb-1 transition-all ${loginMethod === 'qr' ? 'text-[#00FFC8] border-b-2 border-[#00FFC8]' : 'text-slate-400'}`}
          >
            QR Login
          </button>
          <button
            onClick={() => setLoginMethod('biometric')}
            className={`pb-1 transition-all ${loginMethod === 'biometric' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400'}`}
          >
            {lang === 'EN' ? 'Biometric' : 'Face ID'}
          </button>
        </div>

        {/* Method 1: Password Form */}
        {loginMethod === 'password' && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                {lang === 'EN' ? 'Email Address' : 'Alamat Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email || meta.defaultEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050816] border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#00D4FF] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                {lang === 'EN' ? 'Password' : 'Kata Sandi'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  defaultValue="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#050816] border border-white/15 text-xs text-white focus:border-[#00D4FF] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-[#050816] text-[#00D4FF]"
                />
                <span>{lang === 'EN' ? 'Remember Me' : 'Ingat Saya'}</span>
              </label>
              <a href="#forgot" className="text-[#00D4FF] hover:underline">
                {lang === 'EN' ? 'Forgot Password?' : 'Lupa Password?'}
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${meta.btnBg}`}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"></span>
                  <span>{lang === 'EN' ? 'Authenticating...' : 'Mengotentikasi...'}</span>
                </>
              ) : (
                <>
                  <span>{lang === 'EN' ? `Enter ${activeRole} Dashboard` : `Masuk Dashboard ${activeRole}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Method 2: QR Code Login */}
        {loginMethod === 'qr' && (
          <div className="text-center py-4 space-y-4">
            <div className="inline-block p-4 rounded-2xl bg-white/5 border border-[#00FFC8]/30 relative">
              <QrCode className="w-36 h-36 text-[#00FFC8]" />
              <div className="absolute inset-0 border-2 border-[#00FFC8] rounded-2xl animate-ping opacity-20 pointer-events-none"></div>
            </div>
            <p className="text-xs text-slate-300">
              {lang === 'EN' ? 'Scan with SmartSchool Mobile App to log in instantly.' : 'Pindai dengan Aplikasi Mobile SmartSchool untuk masuk cepat.'}
            </p>
            <button
              onClick={handleSimulateScan}
              className="w-full py-3 rounded-xl font-bold text-xs bg-[#00FFC8] text-slate-950 hover:bg-[#00FFC8]/90 transition-all shadow-glow-turquoise"
            >
              {scanProgress ? 'Scanning QR Code...' : 'Simulate Mobile Scan'}
            </button>
          </div>
        )}

        {/* Method 3: Biometric Auth */}
        {loginMethod === 'biometric' && (
          <div className="text-center py-6 space-y-4">
            <button
              onClick={handleSimulateScan}
              className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:scale-110 transition-transform shadow-glow-purple mx-auto block"
            >
              <Fingerprint className="w-16 h-16" />
            </button>
            <p className="text-xs text-slate-300">
              {lang === 'EN' ? 'Place finger on reader or look into camera for Face ID' : 'Tempelkan jari atau tatap kamera untuk Face ID'}
            </p>
            <button
              onClick={handleSimulateScan}
              className="w-full py-3 rounded-xl font-bold text-xs bg-purple-500 text-white hover:bg-purple-600 transition-all"
            >
              {scanProgress ? 'Verifying Face ID...' : 'Simulate Face ID Login'}
            </button>
          </div>
        )}

        {/* Footer Brand note */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[10px] text-slate-500 font-mono">
          PROTECTED BY LULY SECURITY KERNEL • 256-BIT ENCRYPTION
        </div>

      </div>
    </div>
  );
}
