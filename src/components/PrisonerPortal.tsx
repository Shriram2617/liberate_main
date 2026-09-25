import React, { useState, useEffect } from 'react';
import { Upload, FileText, BarChart3, Users, ArrowLeft, AlertCircle, CheckCircle, Download, Send, Bell, X, FileImage, MessageSquare, Eye, Scale, Info } from 'lucide-react';
import BailTimeline from './BailTimeline';

interface PrisonerPortalProps {
  language: string;
  onBack: () => void;
}

type Step = 'upload' | 'optional_explanation' | 'user_input' | 'analyzing' | 'results';

const PrisonerPortal: React.FC<PrisonerPortalProps> = ({ language, onBack }) => {
  const [step, setStep] = useState<Step>('upload');
  const [firFile, setFirFile] = useState<File | null>(null);
  const [firAnalysis, setFirAnalysis] = useState<any>(null);
  const [userAnalysis, setUserAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [submittedApplicationId, setSubmittedApplicationId] = useState<number | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedLawyerDetails, setSelectedLawyerDetails] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);

  // User explanation state
  const [userExplanationMethod, setUserExplanationMethod] = useState<'text' | 'image' | null>(null);
  const [typedExplanation, setTypedExplanation] = useState('');
  const [explanationLanguage, setExplanationLanguage] = useState<'en' | 'hi' | 'ta'>('en');
  const [explanationImages, setExplanationImages] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [hasWitnesses, setHasWitnesses] = useState<'yes' | 'no' | null>(null);
  const [hasDocuments, setHasDocuments] = useState<'yes' | 'no' | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [showUserAnalysis, setShowUserAnalysis] = useState(false);

  useEffect(() => {
    const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    setNotifications(userNotifications);

    const submissions = JSON.parse(localStorage.getItem('bailSubmissions') || '[]');
    if (submissions.length > 0) {
      setSubmittedApplicationId(submissions[submissions.length - 1].id);
    }
  }, []);

  const translations = {
    en: {
      title: 'Prisoner Portal',
      subtitle: 'Upload FIR, get bail score analysis, and access legal assistance',
      uploadFir: 'Upload FIR Document (Required)',
      uploadDesc: 'Upload your FIR copy from the police station for analysis',
      dragDrop: 'Drag & drop your FIR document here, or click to select',
      analyze: 'Analyze FIR',
      analyzing: 'Analyzing...',
      bailScore: 'Bail Score',
      riskScore: 'Risk Score',
      recommendation: 'Recommendation',
      sections: 'Sections Identified',
      backToHome: 'Back to Home',
      notifications: 'Notifications',
      noNotifications: 'No notifications',
      invalidFir: 'Invalid FIR - Please upload only Kilpauk, Tirunelveli, FIR_ADYAR or FIR_METTUR documents',
      applicationTimeline: 'Application Timeline',
      clearAll: 'Clear All',
      proceedToFirAnalysis: 'Proceed to FIR Analysis',
      skipExplanation: 'Skip',
      continueWithAnalysis: 'Continue with Analysis',
      // Optional explanation
      optionalExplanationTitle: 'Would you like to explain your side of the case?',
      optionalExplanationDesc: 'This step is optional. If provided, Liberate will generate an additional analysis based on your explanation.',
      yes: 'Yes',
      skip: 'Skip',
      // User input methods
      explainYourSide: 'Explain Your Side of the Case',
      typeExplanation: 'Type Your Explanation',
      uploadHandwritten: 'Upload Handwritten Explanation',
      supportedLanguages: 'Supported Languages',
      tamil: 'Tamil',
      english: 'English',
      hindi: 'Hindi',
      typePlaceholder: 'Type your explanation here... (minimum 20 words)',
      minWords: 'Minimum 20 words required',
      currentWords: 'words',
      uploadImageDesc: 'Upload JPG, PNG, or JPEG images of your handwritten explanation',
      extractedText: 'Extracted Text',
      editExtracted: 'You can edit the extracted text below',
      wereWitnesses: 'Were there witnesses?',
      supportingDocuments: 'Do you have supporting documents?',
      additionalNotes: 'Additional Notes',
      additionalNotesPlaceholder: 'Any additional information...',
      submitExplanation: 'Submit & Analyze',
      // Analysis cards
      firAnalysisTitle: 'Analysis Based on FIR',
      userAnalysisTitle: 'Analysis Based on Your Explanation',
      userNarrativeSummary: 'Summary of User Narrative',
      importantFacts: 'Important Facts Mentioned',
      mitigatingFactors: 'Mitigating Factors',
      legalConsiderations: 'Potential Legal Considerations',
      suggestedQuestions: 'Suggested Questions for Lawyer',
      bailGuidance: 'Context-Aware Bail Guidance',
      // Disclaimer
      firDisclaimer: 'This analysis is based solely on the FIR document. Final legal decisions depend on investigation and judicial proceedings.',
      userDisclaimer: 'This analysis considers only the information you have provided. Final legal decisions depend on investigation and judicial proceedings.',
      aiDisclaimer: 'AI provides legal assistance only and does not replace lawyers or judicial authorities.',
      // Comparison
      compareBoth: 'Compare Both Analyses',
      comparisonTitle: 'Comparison of Analyses',
      firObservations: 'FIR Observations',
      userObservations: 'User Narrative Observations',
      bailFactors: 'Bail Factors',
      missingInformation: 'Missing Information',
      lawyerDiscussionPoints: 'Suggested Lawyer Discussion Points',
      closeComparison: 'Close Comparison',
      // Other
      downloadForm: 'Download Bail Form',
      submitToLawyer: 'Submit to Lawyer',
      selectLawyer: 'Select a Lawyer',
      submitting: 'Submitting...',
      submitted: 'Application submitted successfully!',
      connectLawyer: 'Connect with Lawyer',
      highChance: 'High chance of bail approval',
      lowChance: 'Low chance of bail approval - review punishments',
      bailForm: 'Bail Application Form',
    },
    hi: {
      title: 'कैदी पोर्टल',
      subtitle: 'एफआईआर अपलोड करें, जमानत स्कोर विश्लेषण प्राप्त करें, और कानूनी सहायता तक पहुंचें',
      uploadFir: 'एफआईआर दस्तावेज अपलोड करें (अनिवार्य)',
      uploadDesc: 'विश्लेषण के लिए पुलिस स्टेशन से अपनी एफआईआर कॉपी अपलोड करें',
      dragDrop: 'अपना एफआईआर दस्तावेज यहां खींचें और छोड़ें, या चयन करने के लिए क्लिक करें',
      analyze: 'एफआईआर का विश्लेषण करें',
      analyzing: 'विश्लेषण कर रहे हैं...',
      bailScore: 'जमानत स्कोर',
      riskScore: 'जोखिम स्कोर',
      recommendation: 'सिफारिश',
      sections: 'पहचानी गई धाराएं',
      backToHome: 'होम पर वापस जाएं',
      notifications: 'सूचनाएं',
      noNotifications: 'कोई सूचना नहीं',
      invalidFir: 'अमान्य एफआईआर - कृपया केवल किलपॉक, तिरुनेलवेली, FIR_ADYAR या FIR_METTUR दस्तावेज़ अपलोड करें',
      applicationTimeline: 'आवेदन समयसीमा',
      clearAll: 'सभी साफ़ करें',
      proceedToFirAnalysis: 'एफआईआर विश्लेषण पर आगे बढ़ें',
      skipExplanation: 'छोड़ें',
      continueWithAnalysis: 'विश्लेषण के साथ जारी रखें',
      optionalExplanationTitle: 'क्या आप अपने केस का अपना पक्ष समझाना चाहेंगे?',
      optionalExplanationDesc: 'यह चरण वैकल्पिक है। यदि प्रदान किया गया, तो लिबरेट आपकी व्याख्या के आधार पर एक अतिरिक्त विश्लेषण तैयार करेगा।',
      yes: 'हाँ',
      skip: 'छोड़ें',
      explainYourSide: 'अपना पक्ष समझाएं',
      typeExplanation: 'अपनी व्याख्या टाइप करें',
      uploadHandwritten: 'हस्तलिखित व्याख्या अपलोड करें',
      supportedLanguages: 'समर्थित भाषाएं',
      tamil: 'तमिल',
      english: 'अंग्रेज़ी',
      hindi: 'हिंदी',
      typePlaceholder: 'यहां अपनी व्याख्या टाइप करें... (न्यूनतम 20 शब्द)',
      minWords: 'न्यूनतम 20 शब्द आवश्यक',
      currentWords: 'शब्द',
      uploadImageDesc: 'अपनी हस्तलिखित व्याख्या की JPG, PNG, या JPEG छवियां अपलोड करें',
      extractedText: 'निकाला गया टेक्स्ट',
      editExtracted: 'आप निकाले गए टेक्स्ट को नीचे संपादित कर सकते हैं',
      wereWitnesses: 'क्या वहां गवाह थे?',
      supportingDocuments: 'क्या आपके पास सहायक दस्तावेज हैं?',
      additionalNotes: 'अतिरिक्त नोट्स',
      additionalNotesPlaceholder: 'कोई अतिरिक्त जानकारी...',
      submitExplanation: 'जमा करें और विश्लेषण करें',
      firAnalysisTitle: 'एफआईआर के आधार पर विश्लेषण',
      userAnalysisTitle: 'आपकी व्याख्या के आधार पर विश्लेषण',
      userNarrativeSummary: 'उपयोगकर्ता कथा सारांश',
      importantFacts: 'उल्लिखित महत्वपूर्ण तथ्य',
      mitigatingFactors: 'शमनकारी कारक',
      legalConsiderations: 'संभावित कानूनी विचार',
      suggestedQuestions: 'वकील के लिए सुझाए गए प्रश्न',
      bailGuidance: 'संदर्भ-जागरूक जमानत मार्गदर्शन',
      firDisclaimer: 'यह विश्लेषण केवल एफआईआर दस्तावेज पर आधारित है। अंतिम कानूनी निर्णय जांच और न्यायिक कार्यवाही पर निर्भर करते हैं।',
      userDisclaimer: 'यह विश्लेषण केवल आपके द्वारा प्रदान की गई जानकारी पर विचार करता है। अंतिम कानूनी निर्णय जांच और न्यायिक कार्यवाही पर निर्भर करते हैं।',
      aiDisclaimer: 'AI केवल कानूनी सहायता प्रदान करता है और वकीलों या न्यायिक अधिकारियों की जगह नहीं लेता है।',
      compareBoth: 'दोनों विश्लेषणों की तुलना करें',
      comparisonTitle: 'विश्लेषणों की तुलना',
      firObservations: 'एफआईआर अवलोकन',
      userObservations: 'उपयोगकर्ता कथा अवलोकन',
      bailFactors: 'जमानत कारक',
      missingInformation: 'ग缺 जानकारी',
      lawyerDiscussionPoints: 'वकील चर्चा बिंदु',
      closeComparison: 'तुलना बंद करें',
      downloadForm: 'जमानत फॉर्म डाउनलोड करें',
      submitToLawyer: 'वकील को भेजें',
      selectLawyer: 'एक वकील चुनें',
      submitting: 'भेज रहे हैं...',
      submitted: 'आवेदन सफलतापूर्वक भेजा गया!',
      connectLawyer: 'वकील से जुड़ें',
      highChance: 'जमानत अनुमोदन की उच्च संभावना',
      lowChance: 'जमानत अनुमोदन की कम संभावना - दंड की समीक्षा करें',
      bailForm: 'जमानत आवेदन फॉर्म',
    },
    ta: {
      title: 'கைதி போர்ட்டல்',
      subtitle: 'FIR பதிவேற்றம், ஜாமீன் மதிப்பெண் பகுப்பாய்வு மற்றும் சட்ட உதவியைப் பெறுங்கள்',
      uploadFir: 'FIR ஆவணத்தைப் பதிவேற்றுங்கள் (கட்டாயம்)',
      uploadDesc: 'பகுப்பாய்வுக்காக காவல் நிலையத்திலிருந்து உங்கள் FIR நகலைப் பதிவேற்றுங்கள்',
      dragDrop: 'உங்கள் FIR ஆவணத்தை இங்கே இழுத்து விடுங்கள், அல்லது தேர்ந்தெடுக்க கிளிக் செய்யுங்கள்',
      analyze: 'FIR ஐ பகுப்பாய்வு செய்யுங்கள்',
      analyzing: 'பகுப்பாய்வு செய்கிறது...',
      bailScore: 'ஜாமீன் மதிப்பெண்',
      riskScore: 'இடர் மதிப்பெண்',
      recommendation: 'பரிந்துரை',
      sections: 'அடையாளம் காணப்பட்ட பிரிவுகள்',
      backToHome: 'வீட்டிற்கு திரும்பு',
      notifications: 'அறிவிப்புகள்',
      noNotifications: 'அறிவிப்புகள் இல்லை',
      invalidFir: 'தவறான FIR - தயவுசெய்து கில்பாக், திருநெல்வேலி, FIR_ADYAR அல்லது FIR_METTUR ஆவணங்களை மட்டுமே பதிவேற்றுங்கள்',
      applicationTimeline: 'விண்ணப்ப காலவரிசை',
      clearAll: 'அனைத்தையும் அழிக்கவும்',
      proceedToFirAnalysis: 'FIR பகுப்பாய்வுக்குச் செல்லவும்',
      skipExplanation: 'தாண்டிச் செல்',
      continueWithAnalysis: 'பகுப்பாய்வுடன் தொடரவும்',
      optionalExplanationTitle: 'உங்கள் வழக்கின் உங்கள் பக்கத்தை விளக்க விரும்புகிறீர்களா?',
      optionalExplanationDesc: 'இந்த படி விருப்பம். வழங்கப்பட்டால், லிபரேட் உங்கள் விளக்கத்தின் அடிப்படையில் கூடுதல் பகுப்பாய்வை உருவாக்கும்.',
      yes: 'ஆம்',
      skip: 'தாண்டிச் செல்',
      explainYourSide: 'உங்கள் பக்கத்தை விளக்குங்கள்',
      typeExplanation: 'உங்கள் விளக்கத்தை தட்டச்சு செய்யுங்கள்',
      uploadHandwritten: 'கையெழுத்து விளக்கத்தைப் பதிவேற்றுங்கள்',
      supportedLanguages: 'ஆதரிக்கப்படும் மொழிகள்',
      tamil: 'தமிழ்',
      english: 'ஆங்கிலம்',
      hindi: 'இந்தி',
      typePlaceholder: 'உங்கள் விளக்கத்தை இங்கே தட்டச்சு செய்யுங்கள்... (குறைந்தது 20 சொற்கள்)',
      minWords: 'குறைந்தது 20 சொற்கள் தேவை',
      currentWords: 'சொற்கள்',
      uploadImageDesc: 'உங்கள் கையெழுத்து விளக்கத்தின் JPG, PNG, அல்லது JPEG படங்களைப் பதிவேற்றுங்கள்',
      extractedText: 'பிரித்தெடுக்கப்பட்ட உரை',
      editExtracted: 'பிரித்தெடுக்கப்பட்ட உரையை நீங்கள் கீழே திருத்தலாம்',
      wereWitnesses: 'சாட்சிகள் இருந்தார்களா?',
      supportingDocuments: 'ஆதரவு ஆவணங்கள் உங்களிடம் உள்ளதா?',
      additionalNotes: 'கூடுதல் குறிப்புகள்',
      additionalNotesPlaceholder: 'எந்த கூடுதல் தகவலும்...',
      submitExplanation: 'சமர்ப்பித்து பகுப்பாய்வு செய்யுங்கள்',
      firAnalysisTitle: 'FIR அடிப்படையிலான பகுப்பாய்வு',
      userAnalysisTitle: 'உங்கள் விளக்கத்தின் அடிப்படையிலான பகுப்பாய்வு',
      userNarrativeSummary: 'பயனர் கதை சுருக்கம்',
      importantFacts: 'குறிப்பிடப்பட்ட முக்கிய உண்மைகள்',
      mitigatingFactors: 'தணிப்பு காரணிகள்',
      legalConsiderations: 'சாத்தியமான சட்ட பரிசீலனைகள்',
      suggestedQuestions: 'வழக்கறிஞருக்கு பரிந்துரைக்கப்பட்ட கேள்விகள்',
      bailGuidance: 'சூழல்-உணர் ஜாமீன் வழிகாட்டுதல்',
      firDisclaimer: 'இந்த பகுப்பாய்வு முழுமையாக FIR ஆவணத்தின் அடிப்படையில் உள்ளது. இறுதி சட்ட முடிவுகள் விசாரணை மற்றும் நீதித்துறை நடவடிக்கைகளைப் பொறுத்தது.',
      userDisclaimer: 'இந்த பகுப்பாய்வு நீங்கள் வழங்கிய தகவலை மட்டுமே கருத்தில் கொள்கிறது. இறுதி சட்ட முடிவுகள் விசாரணை மற்றும் நீதித்துறை நடவடிக்கைகளைப் பொறுத்தது.',
      aiDisclaimer: 'AI சட்ட உதவியை மட்டுமே வழங்குகிறது மற்றும் வழக்கறிஞர்கள் அல்லது நீதித்துறை அதிகாரிகளுக்கு மாற்றாக இல்லை.',
      compareBoth: 'இரு பகுப்பாய்வுகளையும் ஒப்பிடுங்கள்',
      comparisonTitle: 'பகுப்பாய்வுகளின் ஒப்பீடு',
      firObservations: 'FIR அவதானிப்புகள்',
      userObservations: 'பயனர் கதை அவதானிப்புகள்',
      bailFactors: 'ஜாமீன் காரணிகள்',
      missingInformation: 'விடுபட்ட தகவல்',
      lawyerDiscussionPoints: 'வழக்கறிஞர் விவாத புள்ளிகள்',
      closeComparison: 'ஒப்பீட்டை மூடு',
      downloadForm: 'ஜாமீன் படிவத்தை பதிவிறக்கவும்',
      submitToLawyer: 'வழக்கறிஞருக்கு அனுப்பவும்',
      selectLawyer: 'ஒரு வழக்கறிஞரைத் தேர்ந்தெடுக்கவும்',
      submitting: 'அனுப்புகிறது...',
      submitted: 'விண்ணப்பம் வெற்றிகரமாக அனுப்பப்பட்டது!',
      connectLawyer: 'வழக்கறிஞருடன் இணையுங்கள்',
      highChance: 'ஜாமீன் ஒப்புதலுக்கான அதிக வாய்ப்பு',
      lowChance: 'ஜாமீன் ஒப்புதலுக்கான குறைந்த வாய்ப்பு - தண்டனைகளை மதிப்பாய்வு செய்யுங்கள்',
      bailForm: 'ஜாமீன் விண்ணப்ப படிவம்',
    }
  };

  const t = translations[language as keyof typeof translations];

  const lawyers = [
    { name: 'Adv. Rajesh Kumar', experience: '15 years', specialization: 'Criminal Law', phone: '+91 98765 43210', location: 'Chennai High Court', type: 'Senior Advocate' },
    { name: 'Adv. Priya Sharma', experience: '12 years', specialization: 'Bail Matters', phone: '+91 98765 43211', location: 'Madras High Court', type: 'Criminal Lawyer' },
    { name: 'Adv. Suresh Patel', experience: '18 years', specialization: 'IPC Cases', phone: '+91 98765 43212', location: 'Supreme Court', type: 'Senior Advocate' },
    { name: 'Adv. Meera Nair', experience: '10 years', specialization: 'Women Rights & Criminal Law', phone: '+91 98765 43213', location: 'Chennai Sessions Court', type: 'Advocate' },
    { name: 'Adv. Arjun Reddy', experience: '20 years', specialization: 'Constitutional & Criminal Law', phone: '+91 98765 43214', location: 'Supreme Court', type: 'Senior Advocate' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFirFile(file);
      setFirAnalysis(null);
      setUserAnalysis(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setExplanationImages(files);
  };

  const simulateOCR = () => {
    setIsExtracting(true);
    setTimeout(() => {
      // Simulated OCR extraction based on language
      const sampleTexts: Record<string, string> = {
        en: 'I was not present at the location mentioned in the FIR at the time of the alleged incident. I was at my workplace with my colleagues who can vouch for my presence. The claims made in the FIR are incorrect and I have witnesses to prove my innocence.',
        hi: 'मैं कथित घटना के समय एफआईआर में उल्लिखित स्थान पर मौजूद नहीं था। मैं अपने कार्यस्थल पर अपने सहकर्मियों के साथ था जो मेरी उपस्थिति की पुष्टि कर सकते हैं। एफआईआर में किए गए दावे गलत हैं और मेरी निर्दोषता साबित करने के लिए मेरे पास गवाह हैं।',
        ta: 'குற்றச்சாட்டு நிகழ்வு நடந்த நேரத்தில் நான் FIR இல் குறிப்பிடப்பட்ட இடத்தில் இல்லை. என் வேலையிடத்தில் என் சக ஊழியர்களுடன் இருந்தேன், அவர்கள் என் இருப்பை உறுதிப்படுத்த முடியும். FIR இல் செய்யப்பட்ட கூற்றுகள் தவறானவை மற்றும் என் அப்பாவித்தனத்தை நிரூபிக்க எனக்கு சாட்சிகள் உள்ளனர்.'
      };
      setExtractedText(sampleTexts[explanationLanguage]);
      setIsExtracting(false);
    }, 2000);
  };

  const analyzeFIR = async () => {
    if (!firFile) return;
    setStep('analyzing');
    setIsAnalyzing(true);

    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2500));

    const fileName = firFile.name.toLowerCase();
    let detectedSections: string[];
    let firDetails: any;

    if (fileName.includes('kilpauk') || fileName.includes('fir_kilpauk') || fileName.includes('fir kilpauk')) {
      detectedSections = ['294', '323', '447'];
      firDetails = {
        firNumber: '229/2023',
        policeStation: 'Kilpauk Police Station',
        district: 'Chennai',
        date: '12-10-2023',
        complainant: 'Mukesh Ananth'
      };
    } else if (fileName.includes('tirunelveli') || fileName.includes('tirunellveli') || fileName.includes('image')) {
      detectedSections = ['323', '324', '326', '506'];
      firDetails = {
        firNumber: '1/2023',
        policeStation: 'Tirunelveli Police Station',
        district: 'Tirunelveli',
        date: '17-04-2023',
        complainant: 'Subashe'
      };
    } else if (fileName.includes('fir_adyar') || fileName.includes('adyar') || fileName.includes('neelankarai')) {
      detectedSections = ['406', '420', '506'];
      firDetails = {
        firNumber: '1040/2020',
        policeStation: 'Neelankarai Police Station',
        district: 'Adyar',
        date: '04-08-2020',
        complainant: 'Ashok Raj'
      };
    } else if (fileName.includes('fir_mettur') || fileName.includes('mettur')) {
      detectedSections = ['279', '337', '338', '304A'];
      firDetails = {
        firNumber: '11/2017',
        policeStation: 'Mettur Police Station',
        district: 'Salem',
        date: '21-01-2017',
        complainant: 'Manokaran'
      };
    } else {
      setFirAnalysis({
        error: true,
        message: t.invalidFir
      });
      setStep('upload');
      setIsAnalyzing(false);
      return;
    }

    let hasNonBailableOffense = false;

    const sectionDetails: Record<string, any> = {
      '294': { name: 'Obscene acts and songs', punishment: 'Up to 3 months, or fine, or both', bailable: true, cognizable: true, triableBy: 'Any Magistrate' },
      '323': { name: 'Voluntarily causing hurt', punishment: 'Up to 1 year, or fine up to Rs. 1,000, or both', bailable: true, cognizable: true, triableBy: 'Any Magistrate' },
      '324': { name: 'Hurt by dangerous weapons', punishment: 'Up to 3 years, or fine, or both', bailable: true, cognizable: true, triableBy: 'Magistrate of the first class' },
      '326': { name: 'Grievous hurt by dangerous weapons', punishment: 'Life imprisonment or up to 10 years + fine', bailable: false, cognizable: true, triableBy: 'Court of Session' },
      '447': { name: 'Criminal trespass', punishment: 'Up to 3 months, or fine up to Rs. 500, or both', bailable: true, cognizable: true, triableBy: 'Any Magistrate' },
      '506': { name: 'Criminal intimidation', punishment: 'Up to 2 years, or fine, or both', bailable: true, cognizable: false, triableBy: 'Any Magistrate' },
      '406': { name: 'Criminal Breach of Trust', punishment: 'Up to 3 years, or fine, or both', bailable: false, cognizable: true, triableBy: 'Magistrate of the first class' },
      '420': { name: 'Cheating and dishonestly inducing delivery of property', punishment: 'Up to 7 years + fine', bailable: false, cognizable: true, triableBy: 'Magistrate of the first class' },
      '279': { name: 'Rash driving or riding on a public way', punishment: 'Up to 6 months, or fine up to Rs. 1,000, or both', bailable: true, cognizable: true, triableBy: 'Any Magistrate' },
      '337': { name: 'Causing hurt by act endangering life', punishment: 'Up to 6 months, or fine up to Rs. 500, or both', bailable: true, cognizable: true, triableBy: 'Any Magistrate' },
      '338': { name: 'Causing grievous hurt by act endangering life', punishment: 'Up to 2 years, or fine up to Rs. 1,000, or both', bailable: true, cognizable: true, triableBy: 'Any Magistrate' },
      '304A': { name: 'Causing death by negligence', punishment: 'Up to 2 years, or fine, or both', bailable: true, cognizable: true, triableBy: 'Magistrate of the first class' }
    };

    const offenses = detectedSections.map(section => {
      const details = sectionDetails[section];
      if (!details?.bailable) hasNonBailableOffense = true;
      return {
        section: section === '294' ? '294(b)' : section,
        name: details?.name || 'Unknown offense',
        bailable: details?.bailable || false,
        punishment: details?.punishment || 'Punishment varies',
        cognizable: details?.cognizable || false,
        triableBy: details?.triableBy || 'Court'
      };
    });

    let bailScore: number;
    let riskScore: number;

    if (hasNonBailableOffense) {
      if (fileName.includes('fir_adyar') || fileName.includes('adyar') || fileName.includes('neelankarai')) {
        bailScore = 15;
        riskScore = 85;
      } else {
        bailScore = Math.floor(Math.random() * 16) + 15;
        riskScore = Math.floor(Math.random() * 16) + 70;
      }
    } else {
      if (fileName.includes('kilpauk') || fileName.includes('fir_kilpauk') || fileName.includes('fir kilpauk')) {
        bailScore = 90;
        riskScore = 10;
      } else if (fileName.includes('fir_mettur') || fileName.includes('mettur')) {
        bailScore = 92;
        riskScore = 8;
      } else {
        bailScore = Math.floor(Math.random() * 21) + 75;
        riskScore = Math.floor(Math.random() * 21) + 10;
      }
    }

    setFirAnalysis({
      bailScore,
      riskScore,
      sections: detectedSections.map(s => s === '294' ? '294(b)' : s),
      offenses,
      firDetails,
      hasNonBailableOffense,
      observations: [
        'Incident occurred at a public location',
        'Multiple sections invoked in the FIR',
        hasNonBailableOffense ? 'Contains non-bailable offenses' : 'All sections are bailable',
        'Complainant has filed detailed allegations'
      ],
      bailFactors: [
        hasNonBailableOffense ? 'Non-bailable offense requires special consideration' : 'All charges are bailable',
        'Nature of allegations need investigation',
        'Flight risk needs assessment',
        'Previous criminal record (if any) affects decision'
      ],
      missingInfo: [
        'Detailed witness statements',
        'Medical reports (if applicable)',
        ' CCTV footage or physical evidence',
        'Background verification of parties involved'
      ],
      lawyerPoints: [
        'Discuss grounds for bail with your lawyer',
        'Prepare documentation supporting your case',
        'Identify potential witnesses early',
        'Understand the timeline for bail hearing'
      ]
    });

    setIsAnalyzing(false);
    setStep('optional_explanation');
  };

  const analyzeUserExplanation = async () => {
    if (!firAnalysis) return;

    // Generate user-side analysis based on provided information
    const explanationText = userExplanationMethod === 'text' ? typedExplanation : extractedText;

    setUserAnalysis({
      summary: 'The accused claims to have been at a different location during the time of the alleged incident, suggesting a case of mistaken identity or false implication.',
      facts: [
        'Claims alibi - was at workplace during incident time',
        'States colleagues can vouch for presence',
        'Alleges FIR claims are incorrect',
        'Reports having witnesses to prove innocence'
      ],
      mitigatingFactors: [
        'Alibi defense with potential witnesses',
        'Claims presence at workplace - verifiable',
        'Denies involvement in alleged offense',
        'Willingness to cooperate with investigation'
      ],
      legalConsiderations: [
        'Alibi defense requires strong documentary evidence',
        'Workplace attendance records may support claim',
        'Witness testimonies need verification',
        'Timeline verification is crucial'
      ],
      suggestedQuestions: [
        'What documents can prove your presence at workplace?',
        'Who are the witnesses and can they testify?',
        'What was the exact time difference between your alibi and alleged incident?',
        'Do you have workplace attendance records or CCTV footage?'
      ],
      bailGuidance: [
        'Alibi defense may strengthen bail application',
        'Gather workplace attendance records immediately',
        'Identify and prepare witness testimonies',
        'Document any evidence supporting the alibi'
      ],
      witnessInfo: hasWitnesses,
      documentInfo: hasDocuments,
      notes: additionalNotes
    });

    setShowUserAnalysis(true);
    setStep('results');
  };

  const proceedWithoutExplanation = () => {
    setStep('results');
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const isExplanationValid = () => {
    if (userExplanationMethod === 'text') {
      return getWordCount(typedExplanation) >= 20;
    } else if (userExplanationMethod === 'image') {
      return extractedText.trim().length > 0;
    }
    return false;
  };

  const generateBailApplication = () => {
    const bailContent = `BAIL PETITION

In the Court of [Name of Court]

Case No: [Insert Case Number]

Petitioner: [Name of Accused]
Versus
State of Tamil Nadu

Bail Petition under Section 439 Cr.P.C.

...`;
    const blob = new Blob([bailContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bail_application_form.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const submitToLawyer = async () => {
    if (!selectedLawyer) return;
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const submissions = JSON.parse(localStorage.getItem('bailSubmissions') || '[]');
    const newSubmission = {
      id: Date.now(),
      lawyerName: 'Adv. Priya Sharma',
      applicantName: 'Mukesh Ananth',
      firNumber: firAnalysis?.firDetails?.firNumber || '229/2023',
      policeStation: firAnalysis?.firDetails?.policeStation || 'Kilpauk Police Station',
      sections: firAnalysis?.sections || ['294(b)', '323', '447'],
      bailScore: firAnalysis?.bailScore || 90,
      submittedAt: new Date().toISOString(),
      status: 'Pending Review'
    };
    submissions.push(newSubmission);
    localStorage.setItem('bailSubmissions', JSON.stringify(submissions));

    const timeline = JSON.parse(localStorage.getItem('bailTimeline') || '[]');
    timeline.push({
      id: Date.now(),
      applicationId: newSubmission.id,
      status: 'under_review',
      timestamp: new Date().toISOString(),
      lawyerName: 'Adv. Priya Sharma',
      message: `Bail application submitted to Adv. Priya Sharma for review.`
    });
    localStorage.setItem('bailTimeline', JSON.stringify(timeline));

    setSubmittedApplicationId(newSubmission.id);
    setIsSubmitting(false);
    setSubmissionSuccess(true);
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('userNotifications');
  };

  // Render upload step
  const renderUploadStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.uploadFir}</h2>
      <p className="text-gray-600 mb-6">{t.uploadDesc}</p>

      {firAnalysis?.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">{firAnalysis.message}</p>
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-red-400 transition-colors">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">{t.dragDrop}</p>
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx,.jpg,.png"
          className="hidden"
          id="fir-upload"
        />
        <label
          htmlFor="fir-upload"
          className="bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
        >
          Select File
        </label>
      </div>

      {firFile && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">{firFile.name}</p>
              <p className="text-sm text-green-600">{(firFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={analyzeFIR}
          disabled={!firFile || isAnalyzing}
          className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? t.analyzing : t.analyze}
        </button>
      </div>
    </div>
  );

  // Render optional explanation step
  const renderOptionalExplanationStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <MessageSquare className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.optionalExplanationTitle}</h2>
        <p className="text-gray-600 max-w-xl mx-auto">{t.optionalExplanationDesc}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <button
          onClick={() => setStep('user_input')}
          className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
        >
          {t.yes}
        </button>
        <button
          onClick={proceedWithoutExplanation}
          className="flex-1 bg-gray-200 text-gray-800 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-lg"
        >
          {t.skip}
        </button>
      </div>

      {/* Show FIR analysis preview */}
      {firAnalysis && !firAnalysis.error && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Info className="w-4 h-4" />
            <span>FIR analysis has been completed. You can add your explanation for additional insights.</span>
          </div>
        </div>
      )}
    </div>
  );

  // Render user input step
  const renderUserInputStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.explainYourSide}</h2>

      {/* Method Selection */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => {
            setUserExplanationMethod('text');
            setExplanationImages([]);
            setExtractedText('');
          }}
          className={`p-4 rounded-lg border-2 transition-all ${
            userExplanationMethod === 'text'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <FileText className={`w-6 h-6 ${userExplanationMethod === 'text' ? 'text-blue-600' : 'text-gray-400'}`} />
            <div className="text-left">
              <p className="font-semibold text-gray-900">{t.typeExplanation}</p>
              <p className="text-sm text-gray-600">Tamil, English, Hindi</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setUserExplanationMethod('image');
            setTypedExplanation('');
          }}
          className={`p-4 rounded-lg border-2 transition-all ${
            userExplanationMethod === 'image'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <FileImage className={`w-6 h-6 ${userExplanationMethod === 'image' ? 'text-blue-600' : 'text-gray-400'}`} />
            <div className="text-left">
              <p className="font-semibold text-gray-900">{t.uploadHandwritten}</p>
              <p className="text-sm text-gray-600">JPG, PNG, JPEG</p>
            </div>
          </div>
        </button>
      </div>

      {/* Language Selection */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">{t.supportedLanguages}</p>
        <div className="flex flex-wrap gap-2">
          {(['en', 'hi', 'ta'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setExplanationLanguage(lang)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                explanationLanguage === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang === 'en' ? t.english : lang === 'hi' ? t.hindi : t.tamil}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input Method */}
      {userExplanationMethod === 'text' && (
        <div className="mb-6">
          <textarea
            value={typedExplanation}
            onChange={(e) => setTypedExplanation(e.target.value)}
            placeholder={t.typePlaceholder}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          />
          <div className="flex justify-between mt-2">
            <p className={`text-sm ${getWordCount(typedExplanation) >= 20 ? 'text-green-600' : 'text-gray-500'}`}>
              {getWordCount(typedExplanation)} {t.currentWords} {getWordCount(typedExplanation) < 20 && `(${t.minWords})`}
            </p>
          </div>
        </div>
      )}

      {/* Image Upload Method */}
      {userExplanationMethod === 'image' && (
        <div className="mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">{t.uploadImageDesc}</p>
            <input
              type="file"
              onChange={handleImageUpload}
              accept=".jpg,.jpeg,.png"
              multiple
              className="hidden"
              id="explanation-images"
            />
            <label
              htmlFor="explanation-images"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Upload Images
            </label>
          </div>

          {explanationImages.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Uploaded: {explanationImages.length} image(s)</p>
              <button
                onClick={simulateOCR}
                disabled={isExtracting}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isExtracting ? 'Extracting...' : 'Extract Text (OCR)'}
              </button>
            </div>
          )}

          {extractedText && (
            <div className="mt-4">
              <p className="font-semibold text-gray-800 mb-2">{t.extractedText}</p>
              <p className="text-sm text-gray-500 mb-2">{t.editExtracted}</p>
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}
        </div>
      )}

      {/* Additional Questions */}
      {userExplanationMethod && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="font-semibold text-gray-900 mb-3">{t.wereWitnesses}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setHasWitnesses('yes')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    hasWitnesses === 'yes'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.yes}
                </button>
                <button
                  onClick={() => setHasWitnesses('no')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    hasWitnesses === 'no'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-3">{t.supportingDocuments}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setHasDocuments('yes')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    hasDocuments === 'yes'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.yes}
                </button>
                <button
                  onClick={() => setHasDocuments('no')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    hasDocuments === 'no'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-gray-900 mb-3">{t.additionalNotes}</p>
            <input
              type="text"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder={t.additionalNotesPlaceholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={() => setStep('optional_explanation')}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 inline mr-2" />
          Back
        </button>
        <button
          onClick={analyzeUserExplanation}
          disabled={!isExplanationValid()}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {t.submitExplanation}
        </button>
        <button
          onClick={proceedWithoutExplanation}
          className="px-6 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {t.skip}
        </button>
      </div>
    </div>
  );

  // Render analyzing step
  const renderAnalyzingStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <div className="animate-pulse">
        <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.analyzing}</h2>
        <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
          <div className="bg-blue-600 h-3 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );

  // Render FIR Analysis Card
  const renderFirAnalysisCard = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t.firAnalysisTitle}</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">FIR Document</span>
      </div>

      {/* Bail Score and Risk Score */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{t.bailScore}</h3>
            <span className="text-3xl font-bold text-green-600">{firAnalysis.bailScore}%</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-3">
            <div className="bg-green-600 h-3 rounded-full transition-all" style={{ width: `${firAnalysis.bailScore}%` }}></div>
          </div>
        </div>
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{t.riskScore}</h3>
            <span className="text-3xl font-bold text-red-600">{firAnalysis.riskScore}%</span>
          </div>
          <div className="w-full bg-red-200 rounded-full h-3">
            <div className="bg-red-600 h-3 rounded-full transition-all" style={{ width: `${firAnalysis.riskScore}%` }}></div>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gray-50 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.recommendation}</h3>
        {firAnalysis.bailScore >= 80 ? (
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
            <p className="text-green-700 font-medium">{t.highChance}</p>
          </div>
        ) : (
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <p className="text-red-700 font-medium">{t.lowChance}</p>
          </div>
        )}
      </div>

      {/* Sections Identified */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.sections}</h3>
        <div className="space-y-3">
          {firAnalysis.offenses.map((offense: any, index: number) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">Section {offense.section}</span>
                    {offense.bailable ? (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Bailable</span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">Non-Bailable</span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900 mb-1">{offense.name}</p>
                  <p className="text-sm text-gray-600 mb-2">{offense.punishment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-800">{t.firDisclaimer}</p>
        </div>
      </div>
    </div>
  );

  // Render User Analysis Card
  const renderUserAnalysisCard = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t.userAnalysisTitle}</h2>
        <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">User Provided</span>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 p-5 rounded-xl mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">{t.userNarrativeSummary}</h3>
        <p className="text-gray-700">{userAnalysis?.summary}</p>
      </div>

      {/* Important Facts */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">{t.importantFacts}</h3>
        <ul className="space-y-2">
          {userAnalysis?.facts?.map((fact: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mitigating Factors */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">{t.mitigatingFactors}</h3>
        <ul className="space-y-2">
          {userAnalysis?.mitigatingFactors?.map((factor: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{factor}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal Considerations */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">{t.legalConsiderations}</h3>
        <ul className="space-y-2">
          {userAnalysis?.legalConsiderations?.map((item: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Questions */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">{t.suggestedQuestions}</h3>
        <ul className="space-y-2">
          {userAnalysis?.suggestedQuestions?.map((question: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <MessageSquare className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{question}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bail Guidance */}
      <div className="bg-green-50 p-5 rounded-xl mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">{t.bailGuidance}</h3>
        <ul className="space-y-2">
          {userAnalysis?.bailGuidance?.map((guidance: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{guidance}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-800">{t.userDisclaimer}</p>
        </div>
      </div>
    </div>
  );

  // Render Comparison Table
  const renderComparisonTable = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{t.comparisonTitle}</h2>
          <button onClick={() => setShowComparison(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 bg-gray-50 font-semibold text-gray-700">Category</th>
                <th className="text-left py-4 px-4 bg-blue-50 font-semibold text-gray-700">{t.firObservations}</th>
                <th className="text-left py-4 px-4 bg-green-50 font-semibold text-gray-700">{t.userObservations}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 font-semibold text-gray-900">{t.firObservations}</td>
                <td className="py-4 px-4 text-gray-700">
                  <ul className="space-y-1">
                    {firAnalysis?.observations?.map((obs: string, i: number) => (
                      <li key={i} className="text-sm">- {obs}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <ul className="space-y-1">
                    {userAnalysis?.facts?.map((fact: string, i: number) => (
                      <li key={i} className="text-sm">- {fact}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-semibold text-gray-900">{t.bailFactors}</td>
                <td className="py-4 px-4 text-gray-700">
                  <ul className="space-y-1">
                    {firAnalysis?.bailFactors?.map((factor: string, i: number) => (
                      <li key={i} className="text-sm">- {factor}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <ul className="space-y-1">
                    {userAnalysis?.mitigatingFactors?.map((factor: string, i: number) => (
                      <li key={i} className="text-sm">- {factor}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-semibold text-gray-900">{t.missingInformation}</td>
                <td className="py-4 px-4 text-gray-700">
                  <ul className="space-y-1">
                    {firAnalysis?.missingInfo?.map((info: string, i: number) => (
                      <li key={i} className="text-sm">- {info}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <ul className="space-y-1">
                    {userAnalysis?.suggestedQuestions?.slice(0, 3).map((q: string, i: number) => (
                      <li key={i} className="text-sm">- {q}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-gray-900">{t.lawyerDiscussionPoints}</td>
                <td className="py-4 px-4 text-gray-700">
                  <ul className="space-y-1">
                    {firAnalysis?.lawyerPoints?.map((point: string, i: number) => (
                      <li key={i} className="text-sm">- {point}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <ul className="space-y-1">
                    {userAnalysis?.legalConsiderations?.map((item: string, i: number) => (
                      <li key={i} className="text-sm">- {item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Important Note */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              Note: These analyses are independent and do not determine guilt or innocence. The AI does not state who is telling the truth. Final decisions depend on investigation and judicial proceedings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render results step
  const renderResultsStep = () => (
    <div className="space-y-8">
      {/* FIR Analysis - Always shown first */}
      {firAnalysis && !firAnalysis.error && renderFirAnalysisCard()}

      {/* Only show separator if user analysis exists */}
      {userAnalysis && (
        <>
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 font-medium">Independent Analyses</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* User Analysis */}
          {renderUserAnalysisCard()}

          {/* Compare Button */}
          <button
            onClick={() => setShowComparison(true)}
            className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            <Scale className="w-5 h-5" />
            <span>{t.compareBoth}</span>
          </button>
        </>
      )}

      {/* AI Disclaimer */}
      <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-gray-600 mt-0.5 flex-shrink-0" />
          <p className="font-medium text-gray-800">{t.aiDisclaimer}</p>
        </div>
      </div>

      {/* Bail Form and Lawyer Section - Only for bailable cases */}
      {firAnalysis && !firAnalysis.hasNonBailableOffense && firAnalysis.bailScore >= 75 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.bailForm}</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={generateBailApplication}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>{t.downloadForm}</span>
            </button>

            <div className="flex-1">
              <div className="flex gap-2">
                <select
                  value={selectedLawyer}
                  onChange={(e) => setSelectedLawyer(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600"
                >
                  <option value="">{t.selectLawyer}</option>
                  {lawyers.map((lawyer, index) => (
                    <option key={index} value={lawyer.name}>
                      {lawyer.name} - {lawyer.specialization}
                    </option>
                  ))}
                </select>
              </div>

              {submissionSuccess ? (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg font-semibold mt-2">
                  {t.submitted}
                </div>
              ) : (
                <button
                  onClick={submitToLawyer}
                  disabled={!selectedLawyer || isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 mt-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? t.submitting : t.submitToLawyer}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Non-bailable offense warning */}
      {firAnalysis?.hasNonBailableOffense && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-red-800 mb-3">Bail Not Available</h3>
          <p className="text-red-700 mb-4">
            Your case contains non-bailable offenses. Regular bail is not available for these offenses.
          </p>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-gray-900 mb-2">Alternative Legal Options:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Apply for Anticipatory Bail (Section 438 CrPC)</li>
              <li>File bail application in Sessions Court</li>
              <li>Approach High Court under Section 439 CrPC</li>
              <li>Consult with a senior criminal lawyer</li>
            </ul>
          </div>
        </div>
      )}

      {/* Lawyer Recommendations */}
      {!firAnalysis?.hasNonBailableOffense && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Lawyers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{lawyer.name}</h3>
                    <p className="text-sm text-blue-600">{lawyer.type}</p>
                  </div>
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-gray-700">Experience: {lawyer.experience}</p>
                  <p className="text-sm text-gray-700">Spec: {lawyer.specialization}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedLawyerDetails(lawyer)}
                    className="flex-1 text-sm bg-gray-100 text-gray-900 py-2 rounded hover:bg-gray-200 font-medium"
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border max-h-96 overflow-y-auto">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{t.notifications}</h3>
                {notifications.length > 0 && (
                  <button onClick={clearNotifications} className="text-sm text-red-600 hover:text-red-700">
                    {t.clearAll}
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>{t.noNotifications}</p>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b ${
                        notification.type === 'success' ? 'bg-green-50 border-l-4 border-l-green-500' : 'bg-red-50 border-l-4 border-l-red-500'
                      }`}
                    >
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
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

        {/* Timeline */}
        {submittedApplicationId && (
          <div className="mb-8">
            <BailTimeline language={language} applicationId={submittedApplicationId} />
          </div>
        )}

        {/* Main Content */}
        {step === 'upload' && renderUploadStep()}
        {step === 'optional_explanation' && renderOptionalExplanationStep()}
        {step === 'user_input' && renderUserInputStep()}
        {step === 'analyzing' && renderAnalyzingStep()}
        {step === 'results' && renderResultsStep()}

        {/* Lawyer Details Modal */}
        {selectedLawyerDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Lawyer Details</h2>
                <button onClick={() => setSelectedLawyerDetails(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <Users className="w-10 h-10 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedLawyerDetails.name}</h3>
                    <p className="text-sm text-blue-600">{selectedLawyerDetails.type}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Experience</p>
                  <p className="text-gray-900">{selectedLawyerDetails.experience}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Specialization</p>
                  <p className="text-gray-900">{selectedLawyerDetails.specialization}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Court</p>
                  <p className="text-gray-900">{selectedLawyerDetails.location}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
                  <p className="text-blue-600 font-medium">{selectedLawyerDetails.phone}</p>
                </div>

                <button
                  onClick={() => setSelectedLawyerDetails(null)}
                  className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Modal */}
        {showComparison && renderComparisonTable()}
      </div>
    </div>
  );
};

export default PrisonerPortal;
