import React from 'react';
import { ArrowLeft, Gavel, Scale, FileText, Phone, MapPin, Award, Calendar } from 'lucide-react';

interface JudgePortalProps {
  language: string;
  onBack: () => void;
}

const JudgePortal: React.FC<JudgePortalProps> = ({ language, onBack }) => {
  const translations = {
    en: {
      title: 'Judge Portal',
      subtitle: 'Judicial access and case management system',
      backToHome: 'Back to Home',
      availableJudges: 'Judicial Officers',
      contact: 'Court Contact',
      experience: 'Experience',
      specialization: 'Jurisdiction',
      court: 'Court',
      type: 'Designation'
    },
    hi: {
      title: 'न्यायाधीश पोर्टल',
      subtitle: 'न्यायिक पहुंच और मामला प्रबंधन प्रणाली',
      backToHome: 'होम पर वापस जाएं',
      availableJudges: 'न्यायिक अधिकारी',
      contact: 'न्यायालय संपर्क',
      experience: 'अनुभव',
      specialization: 'क्षेत्राधिकार',
      court: 'न्यायालय',
      type: 'पदनाम'
    },
    ta: {
      title: 'நீதிபதி போர்ட்டல்',
      subtitle: 'நீதித்துறை அணுகல் மற்றும் வழக்கு மேலாண்மை அமைப்பு',
      backToHome: 'வீட்டிற்கு திரும்பு',
      availableJudges: 'நீதித்துறை அதிகாரிகள்',
      contact: 'நீதிமன்ற தொடர்பு',
      experience: 'அனுபவம்',
      specialization: 'அதிகார வரம்பு',
      court: 'நீதிமன்றம்',
      type: 'பதவி'
    }
  };

  const t = translations[language as keyof typeof translations];

  const judges = [
    {
      name: 'Hon\'ble Justice Rajesh Sharma',
      experience: '25 years',
      specialization: 'Criminal Law, Constitutional Matters',
      court: 'Madras High Court',
      type: 'High Court Judge',
      chamber: 'Chamber No. 15',
      courtHours: '10:30 AM - 4:30 PM',
      phone: '+91 44 2534 1234',
      email: 'hc.madras@nic.in'
    },
    {
      name: 'Hon\'ble Justice Priya Menon',
      experience: '22 years',
      specialization: 'Civil & Criminal Appeals',
      court: 'Kerala High Court',
      type: 'High Court Judge',
      chamber: 'Chamber No. 8',
      courtHours: '10:00 AM - 4:00 PM',
      phone: '+91 484 239 5678',
      email: 'hc.kerala@nic.in'
    },
    {
      name: 'Hon\'ble Justice Suresh Kumar',
      experience: '28 years',
      specialization: 'Constitutional Law, Writ Petitions',
      court: 'Supreme Court of India',
      type: 'Supreme Court Judge',
      chamber: 'Chamber No. 3',
      courtHours: '10:30 AM - 4:00 PM',
      phone: '+91 11 2338 7000',
      email: 'supremecourt@nic.in'
    },
    {
      name: 'Shri. Arjun Patel',
      experience: '18 years',
      specialization: 'Sessions Cases, Bail Matters',
      court: 'Chennai Sessions Court',
      type: 'Sessions Judge',
      chamber: 'Court Hall No. 5',
      courtHours: '10:00 AM - 5:00 PM',
      phone: '+91 44 2851 9876',
      email: 'sessions.chennai@tn.gov.in'
    },
    {
      name: 'Smt. Kavitha Reddy',
      experience: '15 years',
      specialization: 'Magistrate Cases, Criminal Matters',
      court: 'Kilpauk Magistrate Court',
      type: 'Chief Judicial Magistrate',
      chamber: 'Court Room No. 2',
      courtHours: '10:00 AM - 5:30 PM',
      phone: '+91 44 2641 5432',
      email: 'cjm.kilpauk@tn.gov.in'
    },
    {
      name: 'Shri. Ramesh Nair',
      experience: '20 years',
      specialization: 'Family Court, Matrimonial Disputes',
      court: 'Chennai Family Court',
      type: 'Principal Judge',
      chamber: 'Family Court Complex',
      courtHours: '10:00 AM - 4:30 PM',
      phone: '+91 44 2432 7890',
      email: 'family.court.chennai@tn.gov.in'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.availableJudges}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {judges.map((judge, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gray-900 p-3 rounded-full">
                    <Gavel className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{judge.name}</h3>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                      {judge.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700"><strong>{t.experience}:</strong> {judge.experience}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Scale className="w-4 h-4 text-gray-500 mt-1" />
                    <span className="text-gray-700"><strong>{t.specialization}:</strong> {judge.specialization}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700"><strong>{t.court}:</strong> {judge.court}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{judge.chamber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{judge.courtHours}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600 font-medium">{judge.phone}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{judge.email}</p>
                </div>

                <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  {t.contact}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgePortal;