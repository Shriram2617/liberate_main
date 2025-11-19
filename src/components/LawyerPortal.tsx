import React from 'react';
import { ArrowLeft, Users, Scale, FileText, Phone, MapPin, Award, Inbox, Clock, CheckCircle, Eye, Mail, Lock, EyeOff } from 'lucide-react';

interface LawyerPortalProps {
  language: string;
  onBack: () => void;
  onLogin?: (lawyerData: any) => void;
}

const LawyerPortal: React.FC<LawyerPortalProps> = ({ language, onBack, onLogin }) => {
  const [activeTab, setActiveTab] = React.useState<'lawyers' | 'applications'>('lawyers');
  const [bailApplications, setBailApplications] = React.useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // Load bail applications from localStorage
    const submissions = JSON.parse(localStorage.getItem('bailSubmissions') || '[]');
    // Filter applications for Priya Sharma only
    const priyaApplications = submissions.filter((app: any) => app.lawyerName === 'Adv. Priya Sharma');
    setBailApplications(priyaApplications);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'priyasharma@gmail.com' && password === 'priya@123') {
        const lawyerData = {
          name: 'Adv. Priya Sharma',
          email: 'priyasharma@gmail.com',
          experience: '12 years',
          specialization: 'Bail Matters, Family Law',
          phone: '+91 98765 43211',
          location: 'Madras High Court',
          type: 'Criminal Lawyer'
        };
        if (onLogin) {
          onLogin(lawyerData);
        }
      } else {
        setError(t.invalidCredentials);
      }
      setIsLoading(false);
    }, 1500);
  };

  const translations = {
    en: {
      title: 'Lawyer Portal',
      subtitle: 'Professional legal services and client management',
      backToHome: 'Back to Home',
      availableLawyers: 'Available Lawyers',
      contact: 'Contact',
      experience: 'Experience',
      specialization: 'Specialization',
      court: 'Court',
      type: 'Type',
      bailApplications: 'Bail Applications',
      viewApplications: 'View Applications',
      availableLawyers: 'Available Lawyers',
      noApplications: 'No bail applications submitted yet',
      pending: 'Pending Review',
      reviewed: 'Reviewed',
      approved: 'Approved',
      viewDetails: 'View Details',
      firNumber: 'FIR Number',
      policeStation: 'Police Station',
      sections: 'Sections',
      bailScore: 'Bail Score',
      submittedOn: 'Submitted On',
      bailForm: 'Bail Application Form',
      accept: 'Accept Application',
      reject: 'Reject Application',
      close: 'Close',
      applicationAccepted: 'Application Accepted',
      applicationRejected: 'Application Rejected',
      notificationSent: 'Notification sent to applicant',
      loginTitle: 'Lawyer Login',
      loginSubtitle: 'Access your legal practice dashboard',
      email: 'Email Address',
      password: 'Password',
      login: 'Login',
      loggingIn: 'Logging in...',
      emailPlaceholder: 'Enter your email address',
      passwordPlaceholder: 'Enter your password',
      invalidCredentials: 'Invalid email or password',
      loginToAccess: 'Login to Access Applications'
    },
    hi: {
      title: 'वकील पोर्टल',
      subtitle: 'पेशेवर कानूनी सेवाएं और ग्राहक प्रबंधन',
      backToHome: 'होम पर वापस जाएं',
      availableLawyers: 'उपलब्ध वकील',
      contact: 'संपर्क करें',
      experience: 'अनुभव',
      specialization: 'विशेषज्ञता',
      court: 'न्यायालय',
      type: 'प्रकार',
      bailApplications: 'जमानत आवेदन',
      viewApplications: 'आवेदन देखें',
      availableLawyers: 'उपलब्ध वकील',
      noApplications: 'अभी तक कोई जमानत आवेदन जमा नहीं किया गया',
      pending: 'समीक्षा लंबित',
      reviewed: 'समीक्षा की गई',
      approved: 'अनुमोदित',
      viewDetails: 'विवरण देखें',
      firNumber: 'एफआईआर संख्या',
      policeStation: 'पुलिस स्टेशन',
      sections: 'धाराएं',
      bailScore: 'जमानत स्कोर',
      submittedOn: 'जमा किया गया',
      bailForm: 'जमानत आवेदन फॉर्म',
      accept: 'आवेदन स्वीकार करें',
      reject: 'आवेदन अस्वीकार करें',
      close: 'बंद करें',
      applicationAccepted: 'आवेदन स्वीकार किया गया',
      applicationRejected: 'आवेदन अस्वीकार किया गया',
      notificationSent: 'आवेदक को सूचना भेजी गई',
      loginTitle: 'वकील लॉगिन',
      loginSubtitle: 'अपने कानूनी अभ्यास डैशबोर्ड तक पहुंचें',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      login: 'लॉगिन',
      loggingIn: 'लॉगिन हो रहे हैं...',
      emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      invalidCredentials: 'अमान्य ईमेल या पासवर्ड',
      loginToAccess: 'आवेदन एक्सेस करने के लिए लॉगिन करें'
    },
    ta: {
      title: 'வழக்கறிஞர் போர்ட்டல்',
      subtitle: 'தொழில்முறை சட்ட சேவைகள் மற்றும் வாடிக்கையாளர் மேலாண்மை',
      backToHome: 'வீட்டிற்கு திரும்பு',
      availableLawyers: 'கிடைக்கும் வழக்கறிஞர்கள்',
      contact: 'தொடர்பு கொள்ளுங்கள்',
      experience: 'அனுபவம்',
      specialization: 'நிபுணத்துவம்',
      court: 'நீதிமன்றம்',
      type: 'வகை',
      bailApplications: 'ஜாமீன் விண்ணப்பங்கள்',
      viewApplications: 'விண்ணப்பங்களைப் பார்க்கவும்',
      availableLawyers: 'கிடைக்கும் வழக்கறிஞர்கள்',
      noApplications: 'இன்னும் ஜாமீன் விண்ணப்பங்கள் சமர்ப்பிக்கப்படவில்லை',
      pending: 'மதிப்பாய்வு நிலுவையில்',
      reviewed: 'மதிப்பாய்வு செய்யப்பட்டது',
      approved: 'அங்கீகரிக்கப்பட்டது',
      viewDetails: 'விவரங்களைப் பார்க்கவும்',
      firNumber: 'FIR எண்',
      policeStation: 'காவல் நிலையம்',
      sections: 'பிரிவுகள்',
      bailScore: 'ஜாமீன் மதிப்பெண்',
      submittedOn: 'சமர்ப்பிக்கப்பட்ட தேதி',
      bailForm: 'ஜாமீன் விண்ணப்ப படிவம்',
      accept: 'விண்ணப்பத்தை ஏற்கவும்',
      reject: 'விண்ணப்பத்தை நிராகரிக்கவும்',
      close: 'மூடு',
      applicationAccepted: 'விண்ணப்பம் ஏற்கப்பட்டது',
      applicationRejected: 'விண்ணப்பம் நிராகரிக்கப்பட்டது',
      notificationSent: 'விண்ணப்பதாரருக்கு அறிவிப்பு அனுப்பப்பட்டது',
      loginTitle: 'வழக்கறிஞர் உள்நுழைவு',
      loginSubtitle: 'உங்கள் சட்ட நடைமுறை டாஷ்போர்டை அணுகுங்கள்',
      email: 'மின்னஞ்சல் முகவரி',
      password: 'கடவுச்சொல்',
      login: 'உள்நுழைய',
      loggingIn: 'உள்நுழைகிறது...',
      emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்',
      passwordPlaceholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடுங்கள்',
      invalidCredentials: 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்',
      loginToAccess: 'விண்ணப்பங்களை அணுக உள்நுழையுங்கள்'
    }
  };

  const t = translations[language as keyof typeof translations];

  const lawyers = [
    {
      name: 'Adv. Rajesh Kumar',
      experience: '15 years',
      specialization: 'Criminal Law, Bail Matters',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@lawfirm.com',
      location: 'Chennai High Court',
      type: 'Senior Advocate',
      cases: '500+ cases handled',
      rating: '4.8/5'
    },
    {
      name: 'Adv. Priya Sharma',
      experience: '12 years',
      specialization: 'Bail Matters, Family Law',
      phone: '+91 98765 43211',
      email: 'priya.sharma@legalaid.com',
      location: 'Madras High Court',
      type: 'Criminal Lawyer',
      cases: '350+ cases handled',
      rating: '4.7/5'
    },
    {
      name: 'Adv. Suresh Patel',
      experience: '18 years',
      specialization: 'IPC Cases, Constitutional Law',
      phone: '+91 98765 43212',
      email: 'suresh.patel@supremecourt.in',
      location: 'Supreme Court',
      type: 'Senior Advocate',
      cases: '800+ cases handled',
      rating: '4.9/5'
    },
    {
      name: 'Adv. Meera Nair',
      experience: '10 years',
      specialization: 'Women Rights & Criminal Law',
      phone: '+91 98765 43213',
      email: 'meera.nair@womenrights.org',
      location: 'Chennai Sessions Court',
      type: 'Advocate',
      cases: '250+ cases handled',
      rating: '4.6/5'
    },
    {
      name: 'Adv. Arjun Reddy',
      experience: '20 years',
      specialization: 'Constitutional & Criminal Law',
      phone: '+91 98765 43214',
      email: 'arjun.reddy@constitutionallaw.in',
      location: 'Supreme Court',
      type: 'Senior Advocate',
      cases: '1000+ cases handled',
      rating: '4.9/5'
    },
    {
      name: 'Adv. Kavitha Menon',
      experience: '14 years',
      specialization: 'Cyber Crime, Criminal Law',
      phone: '+91 98765 43215',
      email: 'kavitha.menon@cybercrime.law',
      location: 'Kerala High Court',
      type: 'Criminal Lawyer',
      cases: '400+ cases handled',
      rating: '4.7/5'
    }
  ];

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleAcceptReject = (applicationId: number, action: 'accept' | 'reject') => {
    // Remove the application from the list after accept/reject
    const updatedApplications = bailApplications.filter(app => app.id !== applicationId);
    setBailApplications(updatedApplications);
    localStorage.setItem('bailSubmissions', JSON.stringify(updatedApplications));
    
    // Store notification for user
    const notifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    notifications.push({
      id: Date.now(),
      message: action === 'accept' ? t.applicationAccepted : t.applicationRejected,
      timestamp: new Date().toISOString(),
      type: action === 'accept' ? 'success' : 'error'
    });
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
    
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const bailFormContent = `BAIL PETITION

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

Bail Conditions: The petitioner is willing to abide by any conditions imposed by the Honourable Court to secure bail, including furnishing sureties, regular attendance in court, and refraining from any contact with the complainant or witnesses.

Previous Cases: [Mention if the petitioner has any prior criminal record. If this is a first-time offense, this must be emphasized.]

Therefore, it is most humbly prayed that:

Considering the aforementioned facts and circumstances, this Honourable Court may be pleased to grant bail to the petitioner under Section 439 Cr.P.C. The petitioner undertakes to cooperate fully with the investigation and trial proceedings and will abide by all conditions imposed by the Court.

Dated: [Date]

Petitioner's Signature

Advocate's Signature

Note: This is a draft bail petition. Specific details from the FIR and the accused's case must be meticulously filled in. Legal advice from a qualified lawyer is crucial before filing the petition. The lawyer should investigate the evidence and the merits of the case before proceeding. This template is for informational purposes only and is not a substitute for legal representation.`;

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
          
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => setActiveTab('lawyers')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'lawyers'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t.availableLawyers}
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {t.loginToAccess}
            </button>
          </div>
        </div>

        {activeTab === 'lawyers' && (
          <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.availableLawyers}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-red-600 p-3 rounded-full">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{lawyer.name}</h3>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {lawyer.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700"><strong>{t.experience}:</strong> {lawyer.experience}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-gray-500 mt-1" />
                    <span className="text-gray-700"><strong>{t.specialization}:</strong> {lawyer.specialization}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700"><strong>{t.court}:</strong> {lawyer.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{lawyer.cases}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-gray-700">{lawyer.rating}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600 font-medium">{lawyer.phone}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{lawyer.email}</p>
                </div>

                <button className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  {t.contact}
                </button>
              </div>
            ))}
          </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.bailApplications}</h2>
            {bailApplications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Inbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Applications for Priya Sharma</h3>
                <p className="text-gray-500">Applications submitted to Adv. Priya Sharma will appear here for review.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {bailApplications.map((application) => (
                  <div key={application.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {application.applicantName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span><strong>{t.firNumber}:</strong> {application.firNumber}</span>
                          <span><strong>{t.policeStation}:</strong> {application.policeStation}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === 'Pending Review' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : application.status === 'Reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          <Clock className="w-4 h-4 inline mr-1" />
                          {application.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">{t.sections}:</span>
                        <p className="text-gray-900">{application.sections.join(', ')}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">{t.bailScore}:</span>
                        <p className="text-green-600 font-bold text-lg">{application.bailScore}%</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">{t.submittedOn}:</span>
                        <p className="text-gray-900">{new Date(application.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleViewDetails(application)}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t.viewDetails}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.loginTitle}</h2>
                <p className="text-gray-600">{t.loginSubtitle}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.email}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? t.loggingIn : t.login}
                  </button>
                </div>
              </form>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Demo Credentials:</strong><br />
                  Email: priyasharma@gmail.com<br />
                  Password: priya@123
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bail Application Details Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{t.bailForm}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">Applicant:</span>
                    <p className="text-gray-900">{selectedApplication.applicantName}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">{t.firNumber}:</span>
                    <p className="text-gray-900">{selectedApplication.firNumber}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">{t.policeStation}:</span>
                    <p className="text-gray-900">{selectedApplication.policeStation}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">{t.bailScore}:</span>
                    <p className="text-green-600 font-bold text-lg">{selectedApplication.bailScore}%</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.bailForm}</h3>
                <div className="bg-gray-50 p-6 rounded-lg border max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
                    {bailFormContent}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleAcceptReject(selectedApplication.id, 'reject')}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>{t.reject}</span>
                </button>
                <button
                  onClick={() => handleAcceptReject(selectedApplication.id, 'accept')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{t.accept}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerPortal;