import React, { useState, useEffect } from 'react';
import { ArrowLeft, Scale, FileText, Phone, MapPin, Award, Inbox, Clock, CheckCircle, Eye, X, User, Calendar } from 'lucide-react';

interface LawyerDashboardProps {
  language: string;
  lawyerData: any;
  onBack: () => void;
  onLogout: () => void;
}

const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ language, lawyerData, onBack, onLogout }) => {
  const [bailApplications, setBailApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load bail applications for this specific lawyer
    const submissions = JSON.parse(localStorage.getItem('bailSubmissions') || '[]');
    const lawyerApplications = submissions.filter((app: any) => app.lawyerName === lawyerData.name);
    setBailApplications(lawyerApplications);
  }, [lawyerData.name]);

  const translations = {
    en: {
      title: 'Lawyer Dashboard',
      welcome: 'Welcome back',
      logout: 'Logout',
      backToHome: 'Back to Home',
      bailApplications: 'Bail Applications',
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
      applicantName: 'Applicant Name',
      experience: 'Experience',
      specialization: 'Specialization',
      phone: 'Phone',
      location: 'Location'
    },
    hi: {
      title: 'वकील डैशबोर्ड',
      welcome: 'वापस स्वागत है',
      logout: 'लॉगआउट',
      backToHome: 'होम पर वापस जाएं',
      bailApplications: 'जमानत आवेदन',
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
      applicantName: 'आवेदक का नाम',
      experience: 'अनुभव',
      specialization: 'विशेषज्ञता',
      phone: 'फोन',
      location: 'स्थान'
    },
    ta: {
      title: 'வழக்கறிஞர் டாஷ்போர்ட்',
      welcome: 'மீண்டும் வரவேற்கிறோம்',
      logout: 'வெளியேறு',
      backToHome: 'வீட்டிற்கு திரும்பு',
      bailApplications: 'ஜாமீன் விண்ணப்பங்கள்',
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
      applicantName: 'விண்ணப்பதாரர் பெயர்',
      experience: 'அனுபவம்',
      specialization: 'நிபுணத்துவம்',
      phone: 'தொலைபேசி',
      location: 'இடம்'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleAcceptReject = (applicationId: number, action: 'accept' | 'reject') => {
    // Remove the application from the list after accept/reject
    const updatedApplications = bailApplications.filter(app => app.id !== applicationId);
    setBailApplications(updatedApplications);
    
    // Update localStorage
    const allSubmissions = JSON.parse(localStorage.getItem('bailSubmissions') || '[]');
    const filteredSubmissions = allSubmissions.filter((app: any) => app.id !== applicationId);
    localStorage.setItem('bailSubmissions', JSON.stringify(filteredSubmissions));
    
    // Store notification for user with timeline update
    const notifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    const timelineUpdates = JSON.parse(localStorage.getItem('bailTimeline') || '[]');
    
    const newNotification = {
      id: Date.now(),
      message: action === 'accept' ? t.applicationAccepted : t.applicationRejected,
      timestamp: new Date().toISOString(),
      type: action === 'accept' ? 'success' : 'error'
    };
    
    const timelineUpdate = {
      id: Date.now(),
      applicationId: applicationId,
      status: action === 'accept' ? 'accepted' : 'rejected',
      timestamp: new Date().toISOString(),
      lawyerName: lawyerData.name,
      message: action === 'accept' 
        ? `Your bail application has been accepted by ${lawyerData.name}. Next step: Court hearing scheduled.`
        : `Your bail application has been rejected by ${lawyerData.name}. You may consult another lawyer or approach higher court.`
    };
    
    notifications.push(newNotification);
    timelineUpdates.push(timelineUpdate);
    
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
    localStorage.setItem('bailTimeline', JSON.stringify(timelineUpdates));
    
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
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </button>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {t.logout}
          </button>
        </div>

        {/* Lawyer Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="bg-red-600 p-4 rounded-full">
              <Scale className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.welcome}, {lawyerData.name}
              </h1>
              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>{t.experience}: {lawyerData.experience}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>{t.specialization}: {lawyerData.specialization}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{lawyerData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{lawyerData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bail Applications */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Inbox className="w-6 h-6" />
            <span>{t.bailApplications}</span>
            {bailApplications.length > 0 && (
              <span className="bg-red-600 text-white rounded-full px-3 py-1 text-sm font-bold">
                {bailApplications.length}
              </span>
            )}
          </h2>

          {bailApplications.length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">{t.noApplications}</h3>
              <p className="text-gray-500">Applications submitted to you will appear here for review.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {bailApplications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>{application.applicantName}</span>
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span><strong>{t.firNumber}:</strong> {application.firNumber}</span>
                        <span><strong>{t.policeStation}:</strong> {application.policeStation}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{application.status}</span>
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
                    <div className="bg-blue-50 p-3 rounded-lg flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="text-sm font-semibold text-gray-700">{t.submittedOn}:</span>
                        <p className="text-gray-900">{new Date(application.submittedAt).toLocaleDateString()}</p>
                      </div>
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
      </div>

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
                    <span className="text-sm font-semibold text-gray-700">{t.applicantName}:</span>
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

export default LawyerDashboard;