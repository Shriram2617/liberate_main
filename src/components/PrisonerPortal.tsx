import React, { useState } from 'react';
import { Upload, FileText, BarChart3, Users, ArrowLeft, AlertCircle, CheckCircle, Download, Send, Bell, X } from 'lucide-react';
import BailTimeline from './BailTimeline';

interface PrisonerPortalProps {
  language: string;
  onBack: () => void;
}

const PrisonerPortal: React.FC<PrisonerPortalProps> = ({ language, onBack }) => {
  const [firFile, setFirFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [submittedApplicationId, setSubmittedApplicationId] = useState<number | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  React.useEffect(() => {
    // Load notifications
    const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    setNotifications(userNotifications);
    
    // Check if there's a submitted application
    const submissions = JSON.parse(localStorage.getItem('bailSubmissions') || '[]');
    if (submissions.length > 0) {
      setSubmittedApplicationId(submissions[submissions.length - 1].id);
    }
  }, []);

  const translations = {
    en: {
      title: 'Prisoner Portal',
      subtitle: 'Upload FIR, get bail score analysis, and access legal assistance',
      uploadFir: 'Upload FIR Document',
      uploadDesc: 'Upload your FIR copy from the police station for analysis',
      dragDrop: 'Drag & drop your FIR document here, or click to select',
      analyze: 'Analyze FIR',
      analyzing: 'Analyzing...',
      bailScore: 'Bail Score',
      riskScore: 'Risk Score',
      recommendation: 'Recommendation',
      sections: 'Sections Identified',
      applyBail: 'Apply for Bail',
      viewPunishments: 'View Potential Punishments',
      connectLawyer: 'Connect with Lawyer',
      highChance: 'High chance of bail approval',
      lowChance: 'Low chance of bail approval - review punishments',
      backToHome: 'Back to Home',
      bailForm: 'Bail Application Form',
      downloadForm: 'Download Bail Form',
      submitToLawyer: 'Submit to Lawyer',
      selectLawyer: 'Select a Lawyer',
      submitting: 'Submitting...',
      submitted: 'Application submitted successfully!',
      notifications: 'Notifications',
      noNotifications: 'No notifications',
      invalidFir: 'Invalid FIR - Please upload Kilpauk or Tirunelveli FIR only',
      applicationTimeline: 'Application Timeline',
      notifications: 'Notifications',
      clearAll: 'Clear All'
    },
    hi: {
      title: 'कैदी पोर्टल',
      subtitle: 'एफआईआर अपलोड करें, जमानत स्कोर विश्लेषण प्राप्त करें, और कानूनी सहायता तक पहुंचें',
      uploadFir: 'एफआईआर दस्तावेज अपलोड करें',
      uploadDesc: 'विश्लेषण के लिए पुलिस स्टेशन से अपनी एफआईआर कॉपी अपलोड करें',
      dragDrop: 'अपना एफआईआर दस्तावेज यहां खींचें और छोड़ें, या चयन करने के लिए क्लिक करें',
      analyze: 'एफआईआर का विश्लेषण करें',
      analyzing: 'विश्लेषण कर रहे हैं...',
      bailScore: 'जमानत स्कोर',
      riskScore: 'जोखिम स्कोर',
      recommendation: 'सिफारिश',
      sections: 'पहचानी गई धाराएं',
      applyBail: 'जमानत के लिए आवेदन करें',
      viewPunishments: 'संभावित दंड देखें',
      connectLawyer: 'वकील से जुड़ें',
      highChance: 'जमानत अनुमोदन की उच्च संभावना',
      lowChance: 'जमानत अनुमोदन की कम संभावना - दंड की समीक्षा करें',
      backToHome: 'होम पर वापस जाएं',
      bailForm: 'जमानत आवेदन फॉर्म',
      downloadForm: 'जमानत फॉर्म डाउनलोड करें',
      submitToLawyer: 'वकील को भेजें',
      selectLawyer: 'एक वकील चुनें',
      submitting: 'भेज रहे हैं...',
      submitted: 'आवेदन सफलतापूर्वक भेजा गया!',
      notifications: 'सूचनाएं',
      noNotifications: 'कोई सूचना नहीं',
      invalidFir: 'अमान्य एफआईआर - कृपया केवल किलपॉक या तिरुनेलवेली एफआईआर अपलोड करें',
      applicationTimeline: 'आवेदन समयसीमा',
      notifications: 'सूचनाएं',
      clearAll: 'सभी साफ़ करें'
    },
    ta: {
      title: 'கைதி போர்ட்டல்',
      subtitle: 'FIR பதிவேற்றம், ஜாமீன் மதிப்பெண் பகுப்பாய்வு மற்றும் சட்ட உதவியைப் பெறுங்கள்',
      uploadFir: 'FIR ஆவணத்தைப் பதிவேற்றுங்கள்',
      uploadDesc: 'பகுப்பாய்வுக்காக காவல் நிலையத்திலிருந்து உங்கள் FIR நகலைப் பதிவேற்றுங்கள்',
      dragDrop: 'உங்கள் FIR ஆவணத்தை இங்கே இழுத்து விடுங்கள், அல்லது தேர்ந்தெடுக்க கிளிக் செய்யுங்கள்',
      analyze: 'FIR ஐ பகுப்பாய்வு செய்யுங்கள்',
      analyzing: 'பகுப்பாய்வு செய்கிறது...',
      bailScore: 'ஜாமீன் மதிப்பெண்',
      riskScore: 'இடர் மதிப்பெண்',
      recommendation: 'பரிந்துரை',
      sections: 'அடையாளம் காணப்பட்ட பிரிவுகள்',
      applyBail: 'ஜாமீனுக்கு விண்ணப்பிக்கவும்',
      viewPunishments: 'சாத்தியமான தண்டனைகளைப் பார்க்கவும்',
      connectLawyer: 'வழக்கறிஞருடன் இணையுங்கள்',
      highChance: 'ஜாமீன் ஒப்புதலுக்கான அதிக வாய்ப்பு',
      lowChance: 'ஜாமீன் ஒப்புதலுக்கான குறைந்த வாய்ப்பு - தண்டனைகளை மதிப்பாய்வு செய்யுங்கள்',
      backToHome: 'வீட்டிற்கு திரும்பு',
      bailForm: 'ஜாமீன் விண்ணப்ப படிவம்',
      downloadForm: 'ஜாமீன் படிவத்தை பதிவிறக்கவும்',
      submitToLawyer: 'வழக்கறிஞருக்கு அனுப்பவும்',
      selectLawyer: 'ஒரு வழக்கறிஞரைத் தேர்ந்தெடுக்கவும்',
      submitting: 'அனுப்புகிறது...',
      submitted: 'விண்ணப்பம் வெற்றிகரமாக அனுப்பப்பட்டது!',
      notifications: 'அறிவிப்புகள்',
      noNotifications: 'அறிவிப்புகள் இல்லை',
      invalidFir: 'தவறான FIR - தயவுசெய்து கில்பாக் அல்லது திருநெல்வேலி FIR மட்டுமே பதிவேற்றுங்கள்',
      applicationTimeline: 'விண்ணப்ப காலவரிசை',
      notifications: 'அறிவிப்புகள்',
      clearAll: 'அனைத்தையும் அழிக்கவும்'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFirFile(file);
      setAnalysis(null); // Reset analysis when new file is uploaded
    }
  };

  const analyzeFIR = async () => {
    if (!firFile) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      // Determine FIR type based on file name or content simulation
      const fileName = firFile.name.toLowerCase();
      let detectedSections: string[];
      let firDetails: any;
      
      if (fileName.includes('kilpauk') || fileName.includes('fir_kilpauk') || fileName.includes('fir kilpauk')) {
        // Kilpauk FIR - sections 294(b), 323, 447
        detectedSections = ['294', '323', '447'];
        firDetails = {
          firNumber: '229/2023',
          policeStation: 'Kilpauk Police Station',
          district: 'Chennai',
          date: '12-10-2023',
          complainant: 'Mukesh Ananth'
        };
      } else if (fileName.includes('tirunelveli') || fileName.includes('tirunellveli') || fileName.includes('image')) {
        // Tirunelveli FIR - sections 323, 324, 326, 506(1)
        detectedSections = ['323', '324', '326', '506'];
        firDetails = {
          firNumber: '1/2023',
          policeStation: 'Tirunelveli Police Station',
          district: 'Tirunelveli',
          date: '17-04-2023',
          complainant: 'Subashe'
        };
      } else {
        // Invalid FIR - any other file
        setAnalysis({
          error: true,
          message: 'Invalid FIR - Please upload only Kilpauk or Tirunelveli FIR documents'
        });
        setIsAnalyzing(false);
        return;
      }
      
      // Calculate bail score based on bailable nature of sections
      let bailableCount = 0;
      let totalSections = detectedSections.length;
      let hasNonBailableOffense = false;
      
      const offenses = detectedSections.map(section => {
        // Define section details with bailable status
        const sectionDetails: {[key: string]: any} = {
          '294': { 
            name: 'Obscene acts and songs', 
            punishment: 'Up to 3 months, or fine, or both',
            bailable: true,
            cognizable: true,
            triableBy: 'Any Magistrate'
          },
          '323': { 
            name: 'Voluntarily causing hurt', 
            punishment: 'Up to 1 year, or fine up to ₹1,000, or both',
            bailable: true,
            cognizable: true,
            triableBy: 'Any Magistrate'
          },
          '324': { 
            name: 'Hurt by dangerous weapons', 
            punishment: 'Up to 3 years, or fine, or both',
            bailable: true,
            cognizable: true,
            triableBy: 'Magistrate of the first class'
          },
          '326': { 
            name: 'Grievous hurt by dangerous weapons', 
            punishment: 'Life imprisonment or up to 10 years + fine',
            bailable: false,
            cognizable: true,
            triableBy: 'Court of Session'
          },
          '447': { 
            name: 'Criminal trespass', 
            punishment: 'Up to 3 months, or fine up to ₹500, or both',
            bailable: true,
            cognizable: true,
            triableBy: 'Any Magistrate'
          },
          '506': { 
            name: 'Criminal intimidation', 
            punishment: 'Up to 2 years, or fine, or both',
            bailable: true,
            cognizable: false,
            triableBy: 'Any Magistrate'
          }
        };
        
        const details = sectionDetails[section];
        const isBailable = details?.bailable || false;
        
        if (isBailable) bailableCount++;
        if (!isBailable) hasNonBailableOffense = true;
        
        return {
          section: section === '294' ? '294(b)' : section,
          name: details?.name || 'Unknown offense',
          bailable: isBailable,
          punishment: details?.punishment || 'Punishment varies',
          cognizable: details?.cognizable || false,
          triableBy: details?.triableBy || 'Court'
        };
      });
      
      // Calculate bail score: Low if any non-bailable offense, high otherwise
      let bailScore: number;
      let riskScore: number;
      
      if (hasNonBailableOffense) {
        // Non-bailable offense present - low bail score
        bailScore = Math.floor(Math.random() * 16) + 15; // 15-30%
        riskScore = Math.floor(Math.random() * 16) + 70; // 70-85%
      } else {
        // All bailable offenses - set specific scores for Kilpauk
        if (fileName.includes('kilpauk') || fileName.includes('fir_kilpauk') || fileName.includes('fir kilpauk')) {
          // Kilpauk FIR - set specific scores
          bailScore = 90;
          riskScore = 10;
        } else {
          // Other bailable cases
          bailScore = Math.floor(Math.random() * 21) + 75; // 75-95%
          riskScore = Math.floor(Math.random() * 21) + 10; // 10-30%
        }
      }
      
      const mockResult = {
        bailScore,
        riskScore,
        sections: detectedSections.map(s => s === '294' ? '294(b)' : s),
        offenses,
        firDetails,
        hasNonBailableOffense
      };
      
      setAnalysis(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateBailApplication = () => {
    const bailContent = `
BAIL PETITION

In the Court of [Name of Court]

Case No: [Insert Case Number]

Petitioner: [Name of Accused], son/daughter of [Father's Name], resident of [Address of Accused]

Versus

State of Tamil Nadu

Bail Petition under Section 439 Cr.P.C.

Most Respectfully Sheweth:

1. Offenses: The petitioner is accused in FIR No. 229/2023, registered at Kilpauk Police Station, Chennai, on 12-10-2023. The alleged offence occurred on 11-10-2023 at approximately 22:00 hours at Halls Road near Vijaya Towers Medplus Pharmacy, Kilpauk, Chennai-10. The complainant, Mukesh Ananth, alleges that the accused committed the offences detailed below.

2. Accused Background: The petitioner, [Name of Accused], is [age] years old, and [Educational Qualification/Profession]. [Add any other relevant background information, such as family details, employment history, etc. If the accused is a first-time offender, this should be highlighted.]

3. Legal Sections Applicable: The petitioner is charged under the following sections of the Indian Penal Code, 1860:

Section 294(b) IPC: This section pertains to obscene acts and songs in public. A conviction under this section carries a punishment of imprisonment for up to three months, or a fine, or both. The FIR suggests the petitioner engaged in obscene acts or sang obscene songs in a public place.

Section 323 IPC: This section deals with voluntarily causing hurt. Punishment under this section is imprisonment for up to one year, or a fine up to 1,000, or both. The FIR suggests the petitioner caused hurt to the complainant.

Section 447 IPC: This section addresses criminal trespass. The punishment for this offence is imprisonment up to three months, or a fine up to 500, or both. The FIR implies the petitioner trespassed onto the complainant's property or a place where he had no right to be.

4. Court Jurisdiction: The Court of [Name of Court] has jurisdiction to hear this bail petition as the alleged offenses took place within its territorial jurisdiction.

5. Additional Factors:

Arrest/Remand Details: [Mention the date of arrest and whether remanded to judicial custody. If remanded, specify the date of remand].

Involvement of the Accused: The FIR names the petitioner as an accused.

Claims of Innocence: [If the accused claims innocence, state the grounds for this claim. Mention any alibi or contradictory evidence. If there is any prior enmity between the accused and complainant, mention it here.]

Bail Conditions: The petitioner is willing to abide by any conditions imposed by the Honourable Court to secure bail, including furnishing:

sureties, regular attendance in court, and refraining from any contact with the complainant or witnesses.

Previous Cases: [Mention if the petitioner has any prior criminal record. If this is a first-time offense, this must be emphasized.]

Therefore, it is most humbly prayed that:

Considering the aforementioned facts and circumstances, this Honourable Court may be pleased to grant bail to the petitioner under Section 439 Cr.P.C. The petitioner undertakes to cooperate fully with the investigation and trial proceedings and will abide by all conditions imposed by the Court.

Dated: [Date]

Petitioner's Signature

Advocate's Signature

Note: This is a draft bail petition. Specific details from the FIR and the accused's case must be meticulously filled in. Legal advice from a qualified lawyer is crucial before filing the petition. The lawyer should investigate the evidence and the merits of the case before proceeding. This template is for informational purposes only and is not a substitute for legal representation.
`;

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
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      
      // Store submission in localStorage for lawyer portal
      const submissions = JSON.parse(localStorage.getItem('bailSubmissions') || '[]');
      const newSubmission = {
        id: Date.now(),
        lawyerName: 'Adv. Priya Sharma', // Always submit to Priya Sharma
        applicantName: 'Mukesh Ananth',
        firNumber: '229/2023',
        policeStation: 'Kilpauk Police Station',
        sections: ['294(b)', '323', '447'],
        bailScore: 90,
        submittedAt: new Date().toISOString(),
        status: 'Pending Review'
      };
      submissions.push(newSubmission);
      localStorage.setItem('bailSubmissions', JSON.stringify(submissions));
      // Store initial timeline entry
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
    }, 2000);
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('userNotifications');
  };

  const lawyers = [
    { name: 'Adv. Rajesh Kumar', experience: '15 years', specialization: 'Criminal Law', phone: '+91 98765 43210', location: 'Chennai High Court', type: 'Senior Advocate' },
    { name: 'Adv. Priya Sharma', experience: '12 years', specialization: 'Bail Matters', phone: '+91 98765 43211', location: 'Madras High Court', type: 'Criminal Lawyer' },
    { name: 'Adv. Suresh Patel', experience: '18 years', specialization: 'IPC Cases', phone: '+91 98765 43212', location: 'Supreme Court', type: 'Senior Advocate' },
    { name: 'Adv. Meera Nair', experience: '10 years', specialization: 'Women Rights & Criminal Law', phone: '+91 98765 43213', location: 'Chennai Sessions Court', type: 'Advocate' },
    { name: 'Adv. Arjun Reddy', experience: '20 years', specialization: 'Constitutional & Criminal Law', phone: '+91 98765 43214', location: 'Supreme Court', type: 'Senior Advocate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Top-right Notifications */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{t.notifications}</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
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
                      className={`p-4 border-b border-gray-100 ${
                        notification.type === 'success'
                          ? 'bg-green-50 border-l-4 border-l-green-500'
                          : 'bg-red-50 border-l-4 border-l-red-500'
                      }`}
                    >
                      <p className={`font-medium ${
                        notification.type === 'success' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
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

        {/* Timeline Component */}
        {submittedApplicationId && (
          <div className="mb-8">
            <BailTimeline language={language} applicationId={submittedApplicationId} />
          </div>
        )}
        {!analysis || analysis.error ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.uploadFir}</h2>
            <p className="text-gray-600 mb-6">{t.uploadDesc}</p>

            {analysis?.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">{analysis.message}</p>
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
                    <p className="text-sm text-green-600">
                      {(firFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
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
        ) : (
          <div className="space-y-8">
            {/* Analysis Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl text-white">
                  <BarChart3 className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">{t.bailScore}</h3>
                  <p className="text-3xl font-bold">{analysis.bailScore}%</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-400 to-red-600 p-6 rounded-xl text-white">
                  <AlertCircle className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">{t.riskScore}</h3>
                  <p className="text-3xl font-bold">{analysis.riskScore}%</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.recommendation}</h3>
                {analysis.bailScore >= 80 ? (
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

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.sections}</h3>
                <div className="space-y-3">
                  {analysis.offenses.map((offense: any, index: number) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          Section {offense.section} - {offense.name}
                        </h4>
                        <span className={`px-2 py-1 rounded text-sm ${
                          offense.bailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {offense.bailable ? 'Bailable' : 'Non-bailable'}
                        </span>
                      </div>
                      <p className="text-gray-600">Maximum Punishment: {offense.punishment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bail Application Form Display */}
              {!analysis.hasNonBailableOffense && analysis.bailScore >= 75 && (
                <div className="bg-white border border-gray-200 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.bailForm}</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
{`BAIL PETITION

In the Court of [Name of Court]

Case No: [Insert Case Number]

Petitioner: [Name of Accused], son/daughter of [Father's Name], resident of [Address of Accused]

Versus

State of Tamil Nadu

Bail Petition under Section 439 Cr.P.C.

Most Respectfully Sheweth:

1. Offenses: The petitioner is accused in FIR No. ${analysis.firDetails.firNumber}, registered at ${analysis.firDetails.policeStation}, ${analysis.firDetails.district}, on ${analysis.firDetails.date}. The complainant, ${analysis.firDetails.complainant}, alleges that the accused committed the offences detailed below.

2. Accused Background: The petitioner, [Name of Accused], is [age] years old, and [Educational Qualification/Profession]. [Add any other relevant background information, such as family details, employment history, etc. If the accused is a first-time offender, this should be highlighted.]

3. Legal Sections Applicable: The petitioner is charged under the following sections of the Indian Penal Code, 1860:${analysis.offenses.map((offense: any) => `

Section ${offense.section} IPC: ${offense.name}. ${offense.punishment}.`).join('')}
4. Court Jurisdiction: The Court of [Name of Court] has jurisdiction to hear this bail petition as the alleged offenses took place within its territorial jurisdiction.

5. Additional Factors:

Arrest/Remand Details: [Mention the date of arrest and whether remanded to judicial custody. If remanded, specify the date of remand].

Involvement of the Accused: The FIR names the petitioner as an accused.

Claims of Innocence: [If the accused claims innocence, state the grounds for this claim. Mention any alibi or contradictory evidence. If there is any prior enmity between the accused and complainant, mention it here.]

Bail Conditions: The petitioner is willing to abide by any conditions imposed by the Honourable Court to secure bail, including furnishing sureties, regular attendance in court, and refraining from any contact with the complainant or witnesses.

Previous Cases: [Mention if the petitioner has any prior criminal record. If this is a first-time offense, this must be emphasized.]

Therefore, it is most humbly prayed that:

Considering the aforementioned facts and circumstances, this Honourable Court may be pleased to grant bail to the petitioner under Section 439 Cr.P.C. The petitioner undertakes to cooperate fully with the investigation and trial proceedings and will abide by all conditions imposed by the Court.

Dated: [Date]

Petitioner's Signature

Advocate's Signature

Note: This is a draft bail petition. Specific details from the FIR and the accused's case must be meticulously filled in. Legal advice from a qualified lawyer is crucial before filing the petition. The lawyer should investigate the evidence and the merits of the case before proceeding. This template is for informational purposes only and is not a substitute for legal representation.`}
                    </pre>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <button 
                      onClick={generateBailApplication}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>{t.downloadForm}</span>
                    </button>
                    
                    <div className="flex-1">
                      <select
                        value={selectedLawyer}
                        onChange={(e) => setSelectedLawyer(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent mb-2"
                      >
                        <option value="">{t.selectLawyer}</option>
                        {lawyers.map((lawyer, index) => (
                          <option key={index} value={lawyer.name}>
                            {lawyer.name} - {lawyer.specialization}
                          </option>
                        ))}
                      </select>
                      
                      {submissionSuccess ? (
                        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg font-semibold">
                          ✅ {t.submitted}
                        </div>
                      ) : (
                        <button
                          onClick={submitToLawyer}
                          disabled={!selectedLawyer || isSubmitting}
                          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
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
              {analysis.hasNonBailableOffense && (
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Bail Not Available</h3>
                  <p className="text-red-700 mb-4">
                    Your case contains non-bailable offenses (Section 326 - Grievous hurt by dangerous weapons). Regular bail is not available for these offenses.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Alternative Legal Options:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Apply for Anticipatory Bail (Section 438 CrPC) before arrest</li>
                      <li>File bail application in Sessions Court</li>
                      <li>Approach High Court for bail under Section 439 CrPC</li>
                      <li>Consult with a senior criminal lawyer immediately</li>
                    </ul>
                  </div>
                </div>
              )}

              {!analysis.hasNonBailableOffense && (
                <div className="flex flex-col md:flex-row gap-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    {t.connectLawyer}
                  </button>
                </div>
              )}
            </div>

            {/* Bail Application Notice - Only for bailable cases */}
            {!analysis.hasNonBailableOffense && (
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Bail Application Recommended</h3>
                <p className="text-green-700 mb-4">
                  Based on the analysis, all sections ({analysis.sections.join(', ')}) are bailable offenses. You have a high chance of getting bail approved.
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Download the bail application form above</li>
                    <li>Fill in your personal details and case information</li>
                    <li>Contact one of the recommended lawyers below</li>
                    <li>Submit the application through your lawyer</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Lawyer Recommendations - Only for bailable cases */}
            {!analysis.hasNonBailableOffense && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Lawyers</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lawyers.map((lawyer, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{lawyer.name}</h3>
                          <p className="text-sm text-blue-600">{lawyer.type}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <p className="text-gray-700"><span className="font-medium">Experience:</span> {lawyer.experience}</p>
                        <p className="text-gray-700"><span className="font-medium">Specialization:</span> {lawyer.specialization}</p>
                        <p className="text-gray-700"><span className="font-medium">Court:</span> {lawyer.location}</p>
                        <p className="text-sm text-blue-600 font-medium">{lawyer.phone}</p>
                      </div>
                      <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                        Contact
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrisonerPortal;