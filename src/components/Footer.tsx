import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  language: string;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'LIBERATE',
      tagline: 'Your Right Your Bail',
      description: 'Empowering citizens with legal guidance and bail assistance through technology.',
      quickLinks: 'Quick Links',
      home: 'Home',
      lawyer: 'Lawyer Portal',
      judge: 'Judge Portal',
      prisoner: 'Prisoner Portal',
      ipcIdentifier: 'IPC Identifier',
      contact: 'Contact Us',
      address: 'Address',
      addressText: '123 Legal Street, Chennai, Tamil Nadu 600001',
      phone: 'Phone',
      email: 'Email',
      followUs: 'Follow Us',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'Disclaimer',
      copyright: '© 2024 LIBERATE. All rights reserved.',
      disclaimerText: 'This platform provides legal information and assistance. For complex legal matters, consult with qualified legal professionals.'
    },
    hi: {
      title: 'लिबरेट',
      tagline: 'आपका अधिकार आपकी जमानत',
      description: 'प्रौद्योगिकी के माध्यम से नागरिकों को कानूनी मार्गदर्शन और जमानत सहायता प्रदान करना।',
      quickLinks: 'त्वरित लिंक',
      home: 'होम',
      lawyer: 'वकील पोर्टल',
      judge: 'न्यायाधीश पोर्टल',
      prisoner: 'कैदी पोर्टल',
      ipcIdentifier: 'IPC पहचानकर्ता',
      contact: 'संपर्क करें',
      address: 'पता',
      addressText: '123 लीगल स्ट्रीट, चेन्नई, तमिलनाडु 600001',
      phone: 'फोन',
      email: 'ईमेल',
      followUs: 'हमें फॉलो करें',
      legal: 'कानूनी',
      privacy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      disclaimer: 'अस्वीकरण',
      copyright: '© 2024 लिबरेट। सभी अधिकार सुरक्षित।',
      disclaimerText: 'यह प्लेटफॉर्म कानूनी जानकारी और सहायता प्रदान करता है। जटिल कानूनी मामलों के लिए, योग्य कानूनी पेशेवरों से सलाह लें।'
    },
    ta: {
      title: 'லிபரேட்',
      tagline: 'உங்கள் உரிமை உங்கள் ஜாமீன்',
      description: 'தொழில்நுட்பத்தின் மூலம் குடிமக்களுக்கு சட்ட வழிகாட்டுதல் மற்றும் ஜாமீன் உதவியை வழங்குதல்।',
      quickLinks: 'விரைவு இணைப்புகள்',
      home: 'வீடு',
      lawyer: 'வழக்கறிஞர் போர்ட்டல்',
      judge: 'நீதிபதி போர்ட்டல்',
      prisoner: 'கைதி போர்ட்டல்',
      ipcIdentifier: 'IPC அடையாளம்',
      contact: 'தொடர்பு கொள்ளுங்கள்',
      address: 'முகவரி',
      addressText: '123 லீகல் ஸ்ட்ரீட், சென்னை, தமிழ்நாடு 600001',
      phone: 'தொலைபேசி',
      email: 'மின்னஞ்சல்',
      followUs: 'எங்களைப் பின்தொடருங்கள்',
      legal: 'சட்டம்',
      privacy: 'தனியுரிமைக் கொள்கை',
      terms: 'சேவை விதிமுறைகள்',
      disclaimer: 'மறுப்பு',
      copyright: '© 2024 லிபரேட். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      disclaimerText: 'இந்த தளம் சட்ட தகவல் மற்றும் உதவியை வழங்குகிறது. சிக்கலான சட்ட விஷயங்களுக்கு, தகுதிவாய்ந்த சட்ட நிபுணர்களை அணுகவும்.'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-2xl font-bold">{t.title}</h3>
                <p className="text-red-400 text-sm">{t.tagline}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{t.description}</p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">{t.home}</a></li>
              <li><a href="#lawyer" className="text-gray-300 hover:text-white transition-colors">{t.lawyer}</a></li>
              <li><a href="#judge" className="text-gray-300 hover:text-white transition-colors">{t.judge}</a></li>
              <li><a href="#prisoner" className="text-gray-300 hover:text-white transition-colors">{t.prisoner}</a></li>
              <li><a href="#ipc" className="text-gray-300 hover:text-white transition-colors">{t.ipcIdentifier}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <p className="font-medium">{t.address}</p>
                  <p className="text-gray-300 text-sm">{t.addressText}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium">{t.phone}</p>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium">{t.email}</p>
                  <p className="text-gray-300 text-sm">info@liberate.gov.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.legal}</h4>
            <ul className="space-y-2">
              <li><a href="#privacy" className="text-gray-300 hover:text-white transition-colors">{t.privacy}</a></li>
              <li><a href="#terms" className="text-gray-300 hover:text-white transition-colors">{t.terms}</a></li>
              <li><a href="#disclaimer" className="text-gray-300 hover:text-white transition-colors">{t.disclaimer}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t.copyright}</p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0 max-w-md text-center md:text-right">
              {t.disclaimerText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;