import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, FileText, User, Calendar, ArrowRight } from 'lucide-react';

interface BailTimelineProps {
  language: string;
  applicationId?: number;
}

const BailTimeline: React.FC<BailTimelineProps> = ({ language, applicationId }) => {
  const [timeline, setTimeline] = useState<any[]>([]);

  useEffect(() => {
    const timelineData = JSON.parse(localStorage.getItem('bailTimeline') || '[]');
    if (applicationId) {
      const appTimeline = timelineData.filter((item: any) => item.applicationId === applicationId);
      setTimeline(appTimeline);
    } else {
      setTimeline(timelineData);
    }
  }, [applicationId]);

  const translations = {
    en: {
      title: 'Bail Application Timeline',
      submitted: 'Application Submitted',
      underReview: 'Under Review by Lawyer',
      accepted: 'Accepted by Lawyer',
      rejected: 'Rejected by Lawyer',
      courtHearing: 'Court Hearing Scheduled',
      bailGranted: 'Bail Granted',
      bailRejected: 'Bail Rejected by Court',
      noTimeline: 'No timeline updates available',
      currentStatus: 'Current Status',
      nextSteps: 'Next Steps',
      lawyerReview: 'Lawyer Review',
      courtProcess: 'Court Process'
    },
    hi: {
      title: 'जमानत आवेदन समयसीमा',
      submitted: 'आवेदन जमा किया गया',
      underReview: 'वकील द्वारा समीक्षाधीन',
      accepted: 'वकील द्वारा स्वीकृत',
      rejected: 'वकील द्वारा अस्वीकृत',
      courtHearing: 'न्यायालय सुनवाई निर्धारित',
      bailGranted: 'जमानत मंजूर',
      bailRejected: 'न्यायालय द्वारा जमानत अस्वीकृत',
      noTimeline: 'कोई समयसीमा अपडेट उपलब्ध नहीं',
      currentStatus: 'वर्तमान स्थिति',
      nextSteps: 'अगले कदम',
      lawyerReview: 'वकील समीक्षा',
      courtProcess: 'न्यायालय प्रक्रिया'
    },
    ta: {
      title: 'ஜாமீன் விண்ணப்ப காலவரிசை',
      submitted: 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது',
      underReview: 'வழக்கறிஞரால் மதிப்பாய்வில்',
      accepted: 'வழக்கறிஞரால் ஏற்கப்பட்டது',
      rejected: 'வழக்கறிஞரால் நிராகரிக்கப்பட்டது',
      courtHearing: 'நீதிமன்ற விசாரணை திட்டமிடப்பட்டது',
      bailGranted: 'ஜாமீன் வழங்கப்பட்டது',
      bailRejected: 'நீதிமன்றத்தால் ஜாமீன் நிராகரிக்கப்பட்டது',
      noTimeline: 'காலவரிசை புதுப்பிப்புகள் எதுவும் கிடைக்கவில்லை',
      currentStatus: 'தற்போதைய நிலை',
      nextSteps: 'அடுத்த படிகள்',
      lawyerReview: 'வழக்கறிஞர் மதிப்பாய்வு',
      courtProcess: 'நீதிமன்ற செயல்முறை'
    }
  };

  const t = translations[language as keyof typeof translations];

  // Define the complete bail process steps
  const allSteps = [
    { id: 'submitted', label: 'Application Submitted', status: 'completed' },
    { id: 'under_review', label: 'Under Lawyer Review', status: 'current' },
    { id: 'accepted', label: 'Accepted by Lawyer', status: 'future' },
    { id: 'court_filing', label: 'Filed in Court', status: 'future' },
    { id: 'court_hearing', label: 'Court Hearing', status: 'future' },
    { id: 'bail_decision', label: 'Bail Decision', status: 'future' }
  ];

  // Update step statuses based on timeline
  const updateStepStatuses = () => {
    if (timeline.length === 0) return allSteps;
    
    const updatedSteps = [...allSteps];
    const latestUpdate = timeline[timeline.length - 1];
    
    // Mark steps as completed based on latest status
    const stepIndex = updatedSteps.findIndex(step => step.id === latestUpdate.status);
    if (stepIndex !== -1) {
      updatedSteps.forEach((step, index) => {
        if (index <= stepIndex) step.status = 'completed';
        else if (index === stepIndex + 1) step.status = 'current';
        else step.status = 'future';
      });
    }
    
    return updatedSteps;
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'under_review':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'court_hearing':
        return <Calendar className="w-5 h-5 text-purple-600" />;
      case 'bail_granted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'bail_rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'border-blue-500 bg-blue-50';
      case 'under_review':
        return 'border-yellow-500 bg-yellow-50';
      case 'accepted':
        return 'border-green-500 bg-green-50';
      case 'rejected':
        return 'border-red-500 bg-red-50';
      case 'court_hearing':
        return 'border-purple-500 bg-purple-50';
      case 'bail_granted':
        return 'border-green-500 bg-green-50';
      case 'bail_rejected':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getStepIcon = (status: string) => {
    return status === 'completed' ? CheckCircle : status === 'current' ? Clock : AlertCircle;
  };

  if (timeline.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t.title}</h3>
        <div className="text-center py-8">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">{t.noTimeline}</p>
        </div>
      </div>
    );
  }

  const processSteps = updateStepStatuses();

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.title}</h3>
      
      {/* Horizontal Timeline */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ 
                width: `${(processSteps.filter(s => s.status === 'completed').length / processSteps.length) * 100}%` 
              }}
            />
          </div>
          
          {processSteps.map((step, index) => {
            const StepIcon = getStepIcon(step.status);
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  step.status === 'completed' 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : step.status === 'current'
                    ? 'bg-blue-500 border-blue-500 text-white animate-pulse'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <StepIcon className="w-6 h-6" />
                </div>
                <div className="mt-3 text-center max-w-24">
                  <p className={`text-sm font-medium ${
                    step.status === 'completed' ? 'text-green-600' :
                    step.status === 'current' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                  {step.status === 'current' && (
                    <p className="text-xs text-blue-500 mt-1 font-semibold">Current Step</p>
                  )}
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="absolute -right-8 top-4 w-4 h-4 text-gray-400" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Timeline */}
      <div className="space-y-6">
        {timeline.map((item, index) => (
          <div key={item.id} className="relative">
            {index !== timeline.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-300"></div>
            )}
            
            <div className={`flex items-start space-x-4 p-4 rounded-lg border-l-4 ${getStatusColor(item.status)}`}>
              <div className="flex-shrink-0 bg-white p-2 rounded-full border-2 border-current">
                {getStatusIcon(item.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {item.status === 'accepted' ? t.accepted : 
                     item.status === 'rejected' ? t.rejected :
                     item.status === 'submitted' ? t.submitted :
                     item.status === 'under_review' ? t.underReview :
                     item.status === 'court_hearing' ? t.courtHearing :
                     item.status === 'bail_granted' ? t.bailGranted :
                     item.status === 'bail_rejected' ? t.bailRejected : 
                     'Status Update'}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                
                {item.lawyerName && (
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{item.lawyerName}</span>
                  </div>
                )}
                
                <p className="text-gray-700">{item.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Next Steps */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">🔮 Next Steps</h4>
        <div className="space-y-2">
          {processSteps
            .filter(step => step.status === 'future')
            .slice(0, 2)
            .map((step, index) => (
              <div key={step.id} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <p className="text-blue-800">{step.label}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BailTimeline;