import React from 'react';
import { Scale, Globe, Home, Users, Gavel, UserCheck } from 'lucide-react';

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onNavigate, currentView }) => {
  const translations = {
    en: {
      language: 'Language',
      home: 'Home',
      lawyer: 'Lawyer',
      judge: 'Judge',
      prisoner: 'Prisoner'
    },
    hi: {
      language: 'भाषा',
      home: 'होम',
      lawyer: 'वकील',
      judge: 'न्यायाधीश',
      prisoner: 'कैदी'
    },
    ta: {
      language: 'மொழி',
      home: 'வீடு',
      lawyer: 'வழக்கறிஞர்',
      judge: 'நீதிபதி',
      prisoner: 'கைதி'
    }
  };

  const t = translations[language as keyof typeof translations];

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'lawyer', label: t.lawyer, icon: Users },
    { id: 'judge', label: t.judge, icon: Gavel },
    { id: 'prisoner', label: t.prisoner, icon: UserCheck }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Scale className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">LIBERATE</h1>
          </div>
          
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                      currentView === item.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-gray-600" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;