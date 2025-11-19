import React from 'react';
import { Gavel, Users, UserCheck, ChevronRight } from 'lucide-react';

interface PortalsProps {
  language: string;
  onPortalSelect: (portal: string) => void;
}

const Portals: React.FC<PortalsProps> = ({ language, onPortalSelect }) => {
  const translations = {
    en: {
      title: 'Choose Your Portal',
      subtitle: 'Access specialized tools and services designed for your role in the legal system',
      judgeTitle: 'Judge Portal',
      judgeSubtitle: 'Judicial Access',
      judgeDesc: 'Access case management, bail decisions, and judicial tools',
      judgeFeatures: ['Case Management', 'Bail Decisions', 'Legal Database', 'Court Scheduling'],
      lawyerTitle: 'Lawyer Portal',
      lawyerSubtitle: 'Legal Professional',
      lawyerDesc: 'Professional legal services, client management, and case preparation',
      lawyerFeatures: ['Client Management', 'Case Preparation', 'Legal Research', 'Bail Applications'],
      prisonerTitle: 'Prisoner Portal',
      prisonerSubtitle: 'Citizen Access',
      prisonerDesc: 'Upload FIR, get bail score analysis, and access legal assistance',
      prisonerFeatures: ['FIR Upload', 'Bail Score', 'Legal Guidance', 'Application Forms'],
      accessPortal: 'Access Portal'
    },
    hi: {
      title: 'अपना पोर्टल चुनें',
      subtitle: 'कानूनी व्यवस्था में अपनी भूमिका के लिए डिज़ाइन किए गए विशेष उपकरणों और सेवाओं तक पहुंचें',
      judgeTitle: 'न्यायाधीश पोर्टल',
      judgeSubtitle: 'न्यायिक पहुंच',
      judgeDesc: 'मामला प्रबंधन, जमानत निर्णय, और न्यायिक उपकरणों तक पहुंच',
      judgeFeatures: ['मामला प्रबंधन', 'जमानत निर्णय', 'कानूनी डेटाबेस', 'न्यायालय अनुसूची'],
      lawyerTitle: 'वकील पोर्टल',
      lawyerSubtitle: 'कानूनी पेशेवर',
      lawyerDesc: 'पेशेवर कानूनी सेवाएं, ग्राहक प्रबंधन, और मामला तैयारी',
      lawyerFeatures: ['ग्राहक प्रबंधन', 'मामला तैयारी', 'कानूनी अनुसंधान', 'जमानत आवेदन'],
      prisonerTitle: 'कैदी पोर्टल',
      prisonerSubtitle: 'नागरिक पहुंच',
      prisonerDesc: 'एफआईआर अपलोड करें, जमानत स्कोर विश्लेषण प्राप्त करें, और कानूनी सहायता तक पहुंचें',
      prisonerFeatures: ['एफआईआर अपलोड', 'जमानत स्कोर', 'कानूनी मार्गदर्शन', 'आवेदन फॉर्म'],
      accessPortal: 'पोर्टल एक्सेस करें'
    },
    ta: {
      title: 'உங்கள் போர்ட்டலை தேர்வு செய்யுங்கள்',
      subtitle: 'சட்ட அமைப்பில் உங்கள் பங்குக்கு வடிவமைக்கப்பட்ட சிறப்பு கருவிகள் மற்றும் சேவைகளை அணுகுங்கள்',
      judgeTitle: 'நீதிபதி போர்ட்டல்',
      judgeSubtitle: 'நீதித்துறை அணுகல்',
      judgeDesc: 'வழக்கு மேலாண்மை, ஜாமீன் முடிவுகள் மற்றும் நீதித்துறை கருவிகளுக்கான அணுகல்',
      judgeFeatures: ['வழக்கு மேலாண்மை', 'ஜாமீன் முடிவுகள்', 'சட்ட தரவுத்தளம்', 'நீதிமன்ற அட்டவணை'],
      lawyerTitle: 'வழக்கறிஞர் போர்ட்டல்',
      lawyerSubtitle: 'சட்ட தொழில்முறை',
      lawyerDesc: 'தொழில்முறை சட்ட சேவைகள், வாடிக்கையாளர் மேலாண்மை மற்றும் வழக்கு தயாரிப்பு',
      lawyerFeatures: ['வாடிக்கையாளர் மேலாண்மை', 'வழக்கு தயாரிப்பு', 'சட்ட ஆராய்ச்சி', 'ஜாமீன் விண்ணப்பங்கள்'],
      prisonerTitle: 'கைதி போர்ட்டல்',
      prisonerSubtitle: 'குடிமகன் அணுகல்',
      prisonerDesc: 'FIR பதிவேற்றம், ஜாமீன் மதிப்பெண் பகுப்பாய்வு மற்றும் சட்ட உதவியைப் பெறுங்கள்',
      prisonerFeatures: ['FIR பதிவேற்றம்', 'ஜாமீன் மதிப்பெண்', 'சட்ட வழிகாட்டுதல்', 'விண்ணப்ப படிவங்கள்'],
      accessPortal: 'போர்ட்டலை அணுகுங்கள்'
    }
  };

  const t = translations[language as keyof typeof translations];

  const portals = [
    {
      id: 'judge',
      title: t.judgeTitle,
      subtitle: t.judgeSubtitle,
      description: t.judgeDesc,
      features: t.judgeFeatures,
      icon: Gavel,
      bgColor: 'bg-gray-900',
      iconBg: 'bg-gray-900'
    },
    {
      id: 'lawyer',
      title: t.lawyerTitle,
      subtitle: t.lawyerSubtitle,
      description: t.lawyerDesc,
      features: t.lawyerFeatures,
      icon: Users,
      bgColor: 'bg-red-600',
      iconBg: 'bg-red-600'
    },
    {
      id: 'prisoner',
      title: t.prisonerTitle,
      subtitle: t.prisonerSubtitle,
      description: t.prisonerDesc,
      features: t.prisonerFeatures,
      icon: UserCheck,
      bgColor: 'bg-red-800',
      iconBg: 'bg-red-800'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <div
                key={portal.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className={`${portal.iconBg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <span className={`${portal.bgColor} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                      {portal.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                    {portal.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {portal.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {portal.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <ChevronRight className="w-5 h-5 text-red-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onPortalSelect(portal.id)}
                    className={`w-full ${portal.bgColor} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2`}
                  >
                    <span>{t.accessPortal}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portals;