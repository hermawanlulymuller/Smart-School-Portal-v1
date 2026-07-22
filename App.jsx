import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PortalCards from './components/PortalCards.jsx';
import HolographicDashboard from './components/HolographicDashboard.jsx';
import AiSection from './components/AiSection.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import StatsSection from './components/StatsSection.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import SmartWidgets from './components/SmartWidgets.jsx';
import AiChatWidget from './components/AiChatWidget.jsx';
import PortalLoginModal from './components/PortalLoginModal.jsx';
import PortalDashboardModal from './components/PortalDashboardModal.jsx';
import QuickSearchModal from './components/QuickSearchModal.jsx';
import GoogleSheetsConnector from './components/GoogleSheetsConnector.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [lang, setLang] = useState('EN'); // EN or ID
  const [selectedRole, setSelectedRole] = useState(null); // 'Student', 'Teacher', 'Administrator'
  const [activeDashboardRole, setActiveDashboardRole] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSheetsConnectorOpen, setIsSheetsConnectorOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050816] text-slate-100 overflow-x-hidden selection:bg-[#00D4FF]/30 selection:text-[#00FFC8]">
      
      {/* Interactive Mouse Glow Light */}
      <div 
        className="mouse-glow hidden md:block" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>

      {/* Navigation Header */}
      <Navbar 
        onOpenLogin={(role) => setSelectedRole(role || 'Student')} 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSheetsConnector={() => setIsSheetsConnectorOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onOpenLogin={(role) => setSelectedRole(role || 'Student')} 
          lang={lang} 
        />

        {/* 3 Floating Login Portal Cards */}
        <PortalCards 
          onOpenLogin={(role) => setSelectedRole(role)} 
          lang={lang} 
        />

        {/* Right Side Floating Visual - Holographic Dashboard */}
        <HolographicDashboard lang={lang} />

        {/* 10 Special AI Features & Live AI Sandbox */}
        <AiSection lang={lang} />

        {/* 19 Smart Platform Features with Category Filters */}
        <FeaturesSection lang={lang} />

        {/* Animated Counters Statistics */}
        <StatsSection lang={lang} />

        {/* 9 Pillars Timeline - Why Choose Us */}
        <WhyChooseUs lang={lang} />

        {/* Today's Schedule, News & Upcoming Events */}
        <SmartWidgets lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating AI Chat Assistant */}
      <AiChatWidget lang={lang} />

      {/* Quick Search Modal (Cmd + K) */}
      <QuickSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenLogin={(role) => setSelectedRole(role)}
        lang={lang}
      />

      {/* Google Sheets Database Connector Modal */}
      <GoogleSheetsConnector
        isOpen={isSheetsConnectorOpen}
        onClose={() => setIsSheetsConnectorOpen(false)}
        lang={lang}
      />

      {/* Portal Login Modal */}
      {selectedRole && (
        <PortalLoginModal 
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
          onLaunchDashboard={(role) => {
            setSelectedRole(null);
            setActiveDashboardRole(role);
          }}
          lang={lang}
        />
      )}

      {/* Full Simulated Role Dashboard Modal */}
      {activeDashboardRole && (
        <PortalDashboardModal 
          role={activeDashboardRole}
          onClose={() => setActiveDashboardRole(null)}
          lang={lang}
        />
      )}

    </div>
  );
}
