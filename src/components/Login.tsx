import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  language: string;
  onBack: () => void;
  onLogin: (lawyerData: any) => void;
}

const Login: React.FC<LoginProps> = ({ language, onBack, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      title: 'Lawyer Login',
      subtitle: 'Access your legal practice dashboard',
      email: 'Email Address',
      password: 'Password',
      login: 'Login',
      backToHome: 'Back to Home',
      invalidCredentials: 'Invalid email or password',
      loggingIn: 'Logging in...',
      emailPlaceholder: 'Enter your email address',
      passwordPlaceholder: 'Enter your password'
    },
    hi: {
      title: 'वकील लॉगिन',
      subtitle: 'अपने कानूनी अभ्यास डैशबोर्ड तक पहुंचें',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      login: 'लॉगिन',
      backToHome: 'होम पर वापस जाएं',
      invalidCredentials: 'अमान्य ईमेल या पासवर्ड',
      loggingIn: 'लॉगिन हो रहे हैं...',
      emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें'
    },
    ta: {
      title: 'வழக்கறிஞர் உள்நுழைவு',
      subtitle: 'உங்கள் சட்ட நடைமுறை டாஷ்போர்டை அணுகுங்கள்',
      email: 'மின்னஞ்சல் முகவரி',
      password: 'கடவுச்சொல்',
      login: 'உள்நுழைய',
      backToHome: 'வீட்டிற்கு திரும்பு',
      invalidCredentials: 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்',
      loggingIn: 'உள்நுழைகிறது...',
      emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்',
      passwordPlaceholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடுங்கள்'
    }
  };

  const t = translations[language as keyof typeof translations];

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
        onLogin(lawyerData);
      } else {
        setError(t.invalidCredentials);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? t.loggingIn : t.login}
            </button>
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
  );
};

export default Login;