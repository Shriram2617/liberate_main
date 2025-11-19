import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portals from './components/Portals';
import IPCIdentifier from './components/IPCIdentifier';
import Chatbot from './components/Chatbot';
import JudgePortal from './components/JudgePortal';
import PrisonerPortal from './components/PrisonerPortal';
import LawyerPortal from './components/LawyerPortal';
import LawyerDashboard from './components/LawyerDashboard';
import Footer from './components/Footer';
import BailProcess from './components/BailProcess';

// Translation object
const translations = {
  en: {
    backToHome: 'Back to Home'
  },
  hi: {
    backToHome: 'घर वापस जाएं'
  },
  ta: {
    backToHome: 'வீட்டிற்கு திரும்பு'
  }
};

function App() {
  const [language, setLanguage] = useState('en');
  const [currentView, setCurrentView] = useState('home');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleBack = () => {
    setCurrentView('home');
    setLoggedInUser(null);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handlePortalSelect = (portal: string) => {
    // Open portals in new tab
    if (portal !== 'home') {
      window.open(`#${portal}`, '_blank');
    }
    setCurrentView(portal);
  };

  const handleLogin = () => {
  }
  const handleLoginSuccess = (lawyerData: any) => {
    setLoggedInUser(lawyerData);
    setCurrentView('lawyer-dashboard');
  };

  // Render different views based on currentView
  if (currentView === 'lawyer-dashboard' && loggedInUser) {
    return (
      <LawyerDashboard 
        onBack={handleBack}
        lawyerData={loggedInUser}
        language={language}
        translations={translations}
      />
    );
  }

  if (currentView === 'judge') {
    return (
      <JudgePortal 
        onBack={handleBack}
        language={language}
        translations={translations}
      />
    );
  }

  if (currentView === 'prisoner') {
    return (
      <PrisonerPortal 
        onBack={handleBack}
        language={language}
        translations={translations}
      />
    );
  }

  if (currentView === 'lawyer') {
    return (
      <LawyerPortal 
        onBack={handleBack}
        language={language}
        onLogin={handleLoginSuccess}
        translations={translations}
      />
    );
  }

  // Home page view
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={handleNavigate}
        currentView={currentView}
      />
      <Hero language={language} />
      <Portals 
        language={language}
        onPortalSelect={handlePortalSelect}
      />
      <IPCIdentifier language={language} />
      <BailProcess language={language} />
      <Chatbot language={language} />
      <Footer language={language} />
    </div>
  );
}

export default App;