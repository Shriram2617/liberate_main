import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatbotProps {
  language: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'bot'}>>([]);
  const [input, setInput] = useState('');

  const translations = {
    en: {
      title: 'Legal Assistant',
      placeholder: 'Ask me about bail, legal procedures, or rights...',
      send: 'Send',
      welcome: 'Hello! I\'m your legal assistant. I can help you with questions about bail procedures, legal rights, and IPC sections. How can I assist you today?'
    },
    hi: {
      title: 'कानूनी सहायक',
      placeholder: 'मुझसे जमानत, कानूनी प्रक्रियाओं, या अधिकारों के बारे में पूछें...',
      send: 'भेजें',
      welcome: 'नमस्ते! मैं आपका कानूनी सहायक हूं। मैं आपको जमानत प्रक्रियाओं, कानूनी अधिकारों और IPC धाराओं के बारे में प्रश्नों में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?'
    },
    ta: {
      title: 'சட்ட உதவியாளர்',
      placeholder: 'ஜாமீன், சட்ட நடைமுறைகள் அல்லது உரிமைகள் பற்றி என்னிடம் கேளுங்கள்...',
      send: 'அனுப்பு',
      welcome: 'வணக்கம்! நான் உங்கள் சட்ட உதவியாளர். ஜாமீன் நடைமுறைகள், சட்ட உரிமைகள் மற்றும் IPC பிரிவுகள் பற்றிய கேள்விகளில் நான் உங்களுக்கு உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?'
    }
  };

  const t = translations[language as keyof typeof translations];

  const responses: {[key: string]: string} = {
    en: {
      bail: 'Bail is a temporary release of an accused person awaiting trial, sometimes on condition that a sum of money is lodged to guarantee their appearance in court. The bail amount depends on various factors including the severity of the offense, flight risk, and previous criminal record.',
      rights: 'Every accused person has the right to legal representation, the right to remain silent, the right to be informed of charges, and the right to apply for bail (except in certain non-bailable offenses). You also have the right to a fair and speedy trial.',
      ipc: 'The Indian Penal Code (IPC) is the main criminal code in India. It covers various offenses and their punishments. Some common sections include: 302 (Murder), 379 (Theft), 420 (Cheating), 506 (Criminal intimidation). Each section defines the offense and prescribes the punishment.',
      default: 'I understand you have a legal question. Could you please be more specific? I can help with information about bail procedures, legal rights, IPC sections, or court processes. For complex legal advice, I recommend consulting with a qualified lawyer.'
    },
    hi: {
      bail: 'जमानत एक आरोपी व्यक्ति की अस्थायी रिहाई है जो मुकदमे का इंतजार कर रहा है, कभी-कभी इस शर्त पर कि अदालत में उनकी उपस्थिति की गारंटी के लिए एक राशि जमा की जाती है। जमानत राशि अपराध की गंभीरता, भागने का जोखिम और पिछले आपराधिक रिकॉर्ड सहित विभिन्न कारकों पर निर्भर करती है।',
      rights: 'हर आरोपी व्यक्ति को कानूनी प्रतिनिधित्व का अधिकार, चुप रहने का अधिकार, आरोपों की जानकारी का अधिकार, और जमानत के लिए आवेदन करने का अधिकार है (कुछ गैर-जमानती अपराधों को छोड़कर)। आपको निष्पक्ष और त्वरित सुनवाई का भी अधिकार है।',
      ipc: 'भारतीय दंड संहिता (IPC) भारत में मुख्य आपराधिक संहिता है। यह विभिन्न अपराधों और उनकी सजाओं को शामिल करता है। कुछ सामान्य धाराएं हैं: 302 (हत्या), 379 (चोरी), 420 (धोखाधड़ी), 506 (आपराधिक धमकी)। प्रत्येक धारा अपराध को परिभाषित करती है और सजा निर्धारित करती है।',
      default: 'मैं समझता हूं कि आपका कानूनी प्रश्न है। क्या आप कृपया अधिक विशिष्ट हो सकते हैं? मैं जमानत प्रक्रियाओं, कानूनी अधिकारों, IPC धाराओं, या न्यायालय प्रक्रियाओं के बारे में जानकारी के साथ मदद कर सकता हूं। जटिल कानूनी सलाह के लिए, मैं योग्य वकील से परामर्श करने की सलाह देता हूं।'
    },
    ta: {
      bail: 'ஜாமீன் என்பது விசாரணைக்கு காத்திருக்கும் ஒரு குற்றம் சாட்டப்பட்ட நபரின் தற்காலிக விடுதலை ஆகும், சில நேரங்களில் நீதிமன்றத்தில் அவர்களின் ஆஜராகுவதற்கு உத்தரவாதம் அளிக்க ஒரு தொகை செலுத்தப்பட வேண்டும். ஜாமீன் தொகை குற்றத்தின் தீவிரம், தப்பிச்செல்லும் ஆபத்து மற்றும் முந்தைய குற்றவியல் பதிவு உள்ளிட்ட பல்வேறு காரணிகளைப் பொறுத்தது.',
      rights: 'ஒவ்வொரு குற்றம் சாட்டப்பட்ட நபருக்கும் சட்ட பிரதிநிधித்துவ உரிமை, மௌனமாக இருக்கும் உரிமை, குற்றச்சாட்டுகள் குறித்து அறிவிக்கப்படும் உரிமை மற்றும் ஜாமீனுக்கு விண்ணப்பிக்கும் உரிமை உள்ளது (சில ஜாமீன் பெற முடியாத குற்றங்களைத் தவிர). நியாயமான மற்றும் விரைவான விசாரணைக்கான உரிமையும் உங்களுக்கு உள்ளது.',
      ipc: 'இந்திய தண்டனைச் சட்டம் (IPC) இந்தியாவின் முக்கிய குற்றவியல் சட்டம் ஆகும். இது பல்வேறு குற்றங்கள் மற்றும் அவற்றின் தண்டனைகளை உள்ளடக்கியது. சில பொதுவான பிரிவுகள்: 302 (கொலை), 379 (திருட்டு), 420 (ஏமாற்றுதல்), 506 (குற்றவியல் மிரட்டல்). ஒவ்வொரு பிரிவும் குற்றத்தை வரையறுத்து தண்டனையை விதிக்கிறது.',
      default: 'உங்களுக்கு சட்ட கேள்வி இருப்பதை நான் புரிந்துகொள்கிறேன். தயவுசெய்து மேலும் குறிப்பிட்டு சொல்ல முடியுமா? ஜாமீன் நடைமுறைகள், சட்ட உரிமைகள், IPC பிரிவுகள் அல்லது நீதிமன்ற செயல்முறைகள் பற்றிய தகவல்களுடன் நான் உதவ முடியும். சிக்கலான சட்ட ஆலோசனைக்கு, தகுதிவாய்ந்த வழக்கறிஞரை அணுக பரிந்துரைக்கிறேன்.'
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    let botResponse = responses[language]?.default || responses.en.default;
    
    const query = input.toLowerCase();
    if (query.includes('bail') || query.includes('জামিন') || query.includes('ஜாமீன்')) {
      botResponse = responses[language]?.bail || responses.en.bail;
    } else if (query.includes('right') || query.includes('अधिकार') || query.includes('உரிமை')) {
      botResponse = responses[language]?.rights || responses.en.rights;
    } else if (query.includes('ipc') || query.includes('section') || query.includes('धारा') || query.includes('பிரிவு')) {
      botResponse = responses[language]?.ipc || responses.en.ipc;
    }

    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, text: botResponse, sender: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: t.welcome,
        sender: 'bot' as const
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          initializeChat();
        }}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">{t.title}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-red-700 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="w-4 h-4 mt-1" />}
                    {message.sender === 'user' && <User className="w-4 h-4 mt-1" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;