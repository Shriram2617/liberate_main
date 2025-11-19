import React from 'react';
import { Upload, BarChart3, FileText } from 'lucide-react';

interface HeroProps {
  language: string;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'LIBERATE',
      subtitle: 'Your Right Your Bail',
      description: 'Empowering citizens with legal guidance and bail assistance through technology. Navigate the legal system with confidence and access justice efficiently.',
      processTitle: 'Step-by-Step Bail Process',
      step1Title: 'Upload FIR',
      step1Desc: 'Submit your FIR copy for analysis',
      step2Title: 'Get Analysis',
      step2Desc: 'Receive bail score and risk assessment',
      step3Title: 'Take Action',
      step3Desc: 'Apply for bail or get legal guidance'
    },
    hi: {
      title: 'लिबरेट',
      subtitle: 'आपका अधिकार आपकी जमानत',
      description: 'प्रौद्योगिकी के माध्यम से नागरिकों को कानूनी मार्गदर्शन और जमानत सहायता प्रदान करना। आत्मविश्वास के साथ कानूनी व्यवस्था का नेविगेट करें और न्याय तक कुशलता से पहुंचें।',
      processTitle: 'चरणबद्ध जमानत प्रक्रिया',
      step1Title: 'एफआईआर अपलोड करें',
      step1Desc: 'विश्लेषण के लिए अपनी एफआईआर कॉपी जमा करें',
      step2Title: 'विश्लेषण प्राप्त करें',
      step2Desc: 'जमानत स्कोर और जोखिम मूल्यांकन प्राप्त करें',
      step3Title: 'कार्रवाई करें',
      step3Desc: 'जमानत के लिए आवेदन करें या कानूनी सहायता लें'
    },
    ta: {
      title: 'லிபரேட்',
      subtitle: 'உங்கள் உரிமை உங்கள் ஜாமீன்',
      description: 'தொழில்நுட்பத்தின் மூலம் குடிமக்களுக்கு சட்ட வழிகாட்டுதல் மற்றும் ஜாமீன் உதவியை வழங்குதல். நம்பிக்கையுடன் சட்ட அமைப்பை நேவிகேட் செய்து திறமையாக நீதியை அணுகுங்கள்.',
      processTitle: 'படிப்படியான ஜாமீன் செயல்முறை',
      step1Title: 'FIR பதிவேற்றம்',
      step1Desc: 'பகுப்பாய்வுக்காக உங்கள் FIR நகலைச் சமர்ப்பிக்கவும்',
      step2Title: 'பகுப்பாய்வு பெறுங்கள்',
      step2Desc: 'ஜாமீன் மதிப்பெண் மற்றும் இடர் மதிப்பீட்டைப் பெறுங்கள்',
      step3Title: 'நடவடிக்கை எடுங்கள்',
      step3Desc: 'ஜாமீனுக்கு விண்ணப்பிக்கவும் அல்லது சட்ட வழிகாட்டுதலைப் பெறுங்கள்'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
        }}
      />
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center text-white px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">
          {t.title}
        </h1>
        <p className="text-2xl md:text-3xl mb-8 drop-shadow-lg">
          {t.subtitle}
        </p>
        <p className="text-lg md:text-xl max-w-4xl mb-16 leading-relaxed drop-shadow-lg">
          {t.description}
        </p>

        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl w-full">
          <h2 className="text-3xl font-bold mb-12">{t.processTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-gray-900" />
              </div>
              <div className="bg-yellow-500 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.step1Title}</h3>
              <p className="text-gray-300">{t.step1Desc}</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-900" />
              </div>
              <div className="bg-yellow-500 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.step2Title}</h3>
              <p className="text-gray-300">{t.step2Desc}</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-900" />
              </div>
              <div className="bg-yellow-500 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.step3Title}</h3>
              <p className="text-gray-300">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;