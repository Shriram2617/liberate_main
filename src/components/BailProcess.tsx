import React from 'react';
import { FileText, Search, Users, Gavel, CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface BailProcessProps {
  language: string;
}

const BailProcess: React.FC<BailProcessProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Bail Application Process & Flow',
      subtitle: 'Understanding the complete bail application journey from FIR analysis to court decision',
      step1Title: 'Upload FIR',
      step1Desc: 'Upload your FIR document for AI-powered analysis and bail score calculation',
      step2Title: 'AI Analysis',
      step2Desc: 'Our system analyzes IPC sections, calculates bail probability, and generates recommendations',
      step3Title: 'Lawyer Connection',
      step3Desc: 'Connect with qualified lawyers specializing in bail matters and criminal law',
      step4Title: 'Application Review',
      step4Desc: 'Lawyer reviews your case, prepares bail application, and provides legal guidance',
      step5Title: 'Court Filing',
      step5Desc: 'Bail application is filed in appropriate court with all necessary documentation',
      step6Title: 'Court Decision',
      step6Desc: 'Court hearing scheduled, arguments presented, and bail decision announced',
      processFlow: 'Process Flow',
      timelineTitle: 'Expected Timeline',
      timeline1: 'FIR Analysis: Instant',
      timeline2: 'Lawyer Review: 1-2 days',
      timeline3: 'Court Filing: 2-3 days',
      timeline4: 'Court Hearing: 7-14 days',
      keyFeatures: 'Key Features',
      feature1: 'AI-powered FIR analysis',
      feature2: 'Real-time bail score calculation',
      feature3: 'Expert lawyer network',
      feature4: 'Complete application tracking',
      feature5: 'Multi-language support',
      feature6: 'Secure document handling',
      importantNote: 'Important Note',
      noteText: 'This platform provides legal assistance and guidance. For complex cases, always consult with qualified legal professionals. Bail approval depends on various factors including case severity, court discretion, and legal precedents.'
    },
    hi: {
      title: 'जमानत आवेदन प्रक्रिया और प्रवाह',
      subtitle: 'एफआईआर विश्लेषण से लेकर न्यायालय के निर्णय तक पूर्ण जमानत आवेदन यात्रा को समझना',
      step1Title: 'एफआईआर अपलोड करें',
      step1Desc: 'AI-संचालित विश्लेषण और जमानत स्कोर गणना के लिए अपना एफआईआर दस्तावेज़ अपलोड करें',
      step2Title: 'AI विश्लेषण',
      step2Desc: 'हमारा सिस्टम IPC धाराओं का विश्लेषण करता है, जमानत संभावना की गणना करता है, और सिफारिशें उत्पन्न करता है',
      step3Title: 'वकील कनेक्शन',
      step3Desc: 'जमानत मामलों और आपराधिक कानून में विशेषज्ञता रखने वाले योग्य वकीलों से जुड़ें',
      step4Title: 'आवेदन समीक्षा',
      step4Desc: 'वकील आपके मामले की समीक्षा करता है, जमानत आवेदन तैयार करता है, और कानूनी मार्गदर्शन प्रदान करता है',
      step5Title: 'न्यायालय फाइलिंग',
      step5Desc: 'सभी आवश्यक दस्तावेजों के साथ उपयुक्त न्यायालय में जमानत आवेदन दाखिल किया जाता है',
      step6Title: 'न्यायालय निर्णय',
      step6Desc: 'न्यायालय सुनवाई निर्धारित, तर्क प्रस्तुत, और जमानत निर्णय की घोषणा',
      processFlow: 'प्रक्रिया प्रवाह',
      timelineTitle: 'अपेक्षित समयसीमा',
      timeline1: 'एफआईआर विश्लेषण: तत्काल',
      timeline2: 'वकील समीक्षा: 1-2 दिन',
      timeline3: 'न्यायालय फाइलिंग: 2-3 दिन',
      timeline4: 'न्यायालय सुनवाई: 7-14 दिन',
      keyFeatures: 'मुख्य विशेषताएं',
      feature1: 'AI-संचालित एफआईआर विश्लेषण',
      feature2: 'रियल-टाइम जमानत स्कोर गणना',
      feature3: 'विशेषज्ञ वकील नेटवर्क',
      feature4: 'पूर्ण आवेदन ट्रैकिंग',
      feature5: 'बहु-भाषा समर्थन',
      feature6: 'सुरक्षित दस्तावेज़ हैंडलिंग',
      importantNote: 'महत्वपूर्ण नोट',
      noteText: 'यह प्लेटफॉर्म कानूनी सहायता और मार्गदर्शन प्रदान करता है। जटिल मामलों के लिए, हमेशा योग्य कानूनी पेशेवरों से सलाह लें। जमानत अनुमोदन मामले की गंभीरता, न्यायालय के विवेक, और कानूनी मिसालों सहित विभिन्न कारकों पर निर्भर करता है।'
    },
    ta: {
      title: 'ஜாமீன் விண்ணப்ப செயல்முறை மற்றும் ஓட்டம்',
      subtitle: 'FIR பகுப்பாய்விலிருந்து நீதிமன்ற முடிவு வரை முழுமையான ஜாமீன் விண்ணப்ப பயணத்தைப் புரிந்துகொள்ளுதல்',
      step1Title: 'FIR பதிவேற்றம்',
      step1Desc: 'AI-இயங்கும் பகுப்பாய்வு மற்றும் ஜாமீன் மதிப்பெண் கணக்கீட்டிற்காக உங்கள் FIR ஆவணத்தைப் பதிவேற்றுங்கள்',
      step2Title: 'AI பகுப்பாய்வு',
      step2Desc: 'எங்கள் அமைப்பு IPC பிரிவுகளை பகுப்பாய்வு செய்கிறது, ஜாமீன் நிகழ்தகவை கணக்கிடுகிறது, மற்றும் பரிந்துரைகளை உருவாக்குகிறது',
      step3Title: 'வழக்கறிஞர் இணைப்பு',
      step3Desc: 'ஜாமீன் விஷயங்கள் மற்றும் குற்றவியல் சட்டத்தில் நிபுணத்துவம் பெற்ற தகுதிவாய்ந்த வழக்கறிஞர்களுடன் இணையுங்கள்',
      step4Title: 'விண்ணப்ப மதிப்பாய்வு',
      step4Desc: 'வழக்கறிஞர் உங்கள் வழக்கை மதிப்பாய்வு செய்கிறார், ஜாமீன் விண்ணப்பத்தை தயாரிக்கிறார், மற்றும் சட்ட வழிகாட்டுதலை வழங்குகிறார்',
      step5Title: 'நீதிமன்ற தாக்கல்',
      step5Desc: 'அனைத்து தேவையான ஆவணங்களுடன் பொருத்தமான நீதிமன்றத்தில் ஜாமீன் விண்ணப்பம் தாக்கல் செய்யப்படுகிறது',
      step6Title: 'நீதிமன்ற முடிவு',
      step6Desc: 'நீதிமன்ற விசாரணை திட்டமிடப்பட்டது, வாதங்கள் முன்வைக்கப்பட்டன, மற்றும் ஜாமீன் முடிவு அறிவிக்கப்பட்டது',
      processFlow: 'செயல்முறை ஓட்டம்',
      timelineTitle: 'எதிர்பார்க்கப்படும் காலவரிசை',
      timeline1: 'FIR பகுப்பாய்வு: உடனடி',
      timeline2: 'வழக்கறிஞர் மதிப்பாய்வு: 1-2 நாட்கள்',
      timeline3: 'நீதிமன்ற தாக்கல்: 2-3 நாட்கள்',
      timeline4: 'நீதிமன்ற விசாரணை: 7-14 நாட்கள்',
      keyFeatures: 'முக்கிய அம்சங்கள்',
      feature1: 'AI-இயங்கும் FIR பகுப்பாய்வு',
      feature2: 'நிகழ்நேர ஜாமீன் மதிப்பெண் கணக்கீடு',
      feature3: 'நிபுணர் வழக்கறிஞர் நெட்வொர்க்',
      feature4: 'முழுமையான விண்ணப்ப கண்காணிப்பு',
      feature5: 'பல மொழி ஆதரவு',
      feature6: 'பாதுகாப்பான ஆவண கையாளுதல்',
      importantNote: 'முக்கியமான குறிப்பு',
      noteText: 'இந்த தளம் சட்ட உதவி மற்றும் வழிகாட்டுதலை வழங்குகிறது. சிக்கலான வழக்குகளுக்கு, எப்போதும் தகுதிவாய்ந்த சட்ட நிபுணர்களை அணுகவும். ஜாமீன் ஒப்புதல் வழக்கின் தீவிரம், நீதிமன்ற விவேகம், மற்றும் சட்ட முன்னுதாரணங்கள் உள்ளிட்ட பல்வேறு காரணிகளைப் பொறுத்தது.'
    }
  };

  const t = translations[language as keyof typeof translations];

  const steps = [
    {
      icon: FileText,
      title: t.step1Title,
      description: t.step1Desc,
      color: 'bg-blue-500'
    },
    {
      icon: Search,
      title: t.step2Title,
      description: t.step2Desc,
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: t.step3Title,
      description: t.step3Desc,
      color: 'bg-purple-500'
    },
    {
      icon: CheckCircle,
      title: t.step4Title,
      description: t.step4Desc,
      color: 'bg-orange-500'
    },
    {
      icon: Clock,
      title: t.step5Title,
      description: t.step5Desc,
      color: 'bg-red-500'
    },
    {
      icon: Gavel,
      title: t.step6Title,
      description: t.step6Desc,
      color: 'bg-gray-700'
    }
  ];

  const features = [
    t.feature1,
    t.feature2,
    t.feature3,
    t.feature4,
    t.feature5,
    t.feature6
  ];

  const timeline = [
    t.timeline1,
    t.timeline2,
    t.timeline3,
    t.timeline4
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">{t.processFlow}</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">{step.title}</h4>
                    <p className="text-gray-600 text-sm text-center leading-relaxed">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline and Features */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Expected Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 text-blue-600 mr-3" />
              {t.timelineTitle}
            </h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              {t.keyFeatures}
            </h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-3" />
            {t.importantNote}
          </h3>
          <p className="text-yellow-700 leading-relaxed">{t.noteText}</p>
        </div>
      </div>
    </section>
  );
};

export default BailProcess;