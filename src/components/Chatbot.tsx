import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Mic, MicOff, Volume2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your EcoWaste assistant. How can I help you with waste management today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const languages = {
    'en': 'English',
    'hi': 'हिंदी',
    'mr': 'मराठी',
    'gu': 'ગુજરાતી',
    'ta': 'தமிழ்',
    'te': 'తెలుగు',
    'kn': 'ಕನ್ನಡ',
    'bn': 'বাংলা'
  };

  const quickReplies = {
    'en': [
      "How to segregate waste?",
      "Schedule pickup",
      "Check rates",
      "Track order",
      "Contact support"
    ],
    'hi': [
      "कचरा कैसे अलग करें?",
      "पिकअप शेड्यूल करें",
      "दरें चेक करें",
      "ऑर्डर ट्रैक करें",
      "सहायता संपर्क"
    ]
  };

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
  recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(inputMessage, selectedLanguage),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        
        // Speak the response
        speakMessage(botResponse.text, selectedLanguage);
      }, 1000);
    }
  };

  const getBotResponse = (userMessage: string, language: string) => {
    const message = userMessage.toLowerCase();
    
    const responses = {
      'en': {
        segregate: "Great question! Here's how to segregate waste:\n\n🟢 Wet Waste: Food scraps, vegetable peels\n🔵 Dry Waste: Paper, plastic, metal\n🔴 Hazardous: Batteries, electronics\n\nWould you like more detailed guidelines?",
        pickup: "I can help you schedule a pickup! Please provide:\n\n📍 Your location\n📅 Preferred date\n⏰ Time slot\n\nOr you can use our mobile app for instant booking!",
        rate: "Current rates per kg:\n\n📰 Paper: ₹8-12\n🍶 Plastic bottles: ₹15-20\n🥫 Metal: ₹25-30\n📱 Electronics: ₹50-100\n\nRates may vary by location. Check our rate list for updates!",
        track: "To track your order:\n\n1. Open our mobile app\n2. Go to 'My Orders'\n3. Enter your order ID\n\nOr share your order ID here and I'll help you track it!",
        contact: "You can reach our support team:\n\n📞 Phone: +91-9876543210\n📧 Email: support@ecowaste.com\n💬 WhatsApp: +91-9876543210\n\nOur team is available 24/7 to assist you!",
        default: "I understand you're asking about waste management. I can help you with:\n\n• Waste segregation guidelines\n• Pickup scheduling\n• Rate information\n• Order tracking\n• General support\n\nWhat would you like to know more about?"
      },
      'hi': {
        segregate: "बहुत अच्छा सवाल! कचरा अलग करने का तरीका:\n\n🟢 गीला कचरा: खाने के टुकड़े, सब्जी के छिलके\n🔵 सूखा कचरा: कागज, प्लास्टिक, धातु\n🔴 खतरनाक: बैटरी, इलेक्ट्रॉनिक्स\n\nक्या आपको और विस्तृत जानकारी चाहिए?",
        pickup: "मैं पिकअप शेड्यूल करने में मदद कर सकता हूं! कृपया बताएं:\n\n📍 आपका स्थान\n📅 पसंदीदा तारीख\n⏰ समय\n\nया तुरंत बुकिंग के लिए हमारा मोबाइल ऐप इस्तेमाल करें!",
        rate: "वर्तमान दरें प्रति किलो:\n\n📰 कागज: ₹8-12\n🍶 प्लास्टिक बोतलें: ₹15-20\n🥫 धातु: ₹25-30\n📱 इलेक्ट्रॉनिक्स: ₹50-100\n\nदरें स्थान के अनुसार अलग हो सकती हैं।",
        track: "अपना ऑर्डर ट्रैक करने के लिए:\n\n1. हमारा मोबाइल ऐप खोलें\n2. 'मेरे ऑर्डर' पर जाएं\n3. अपना ऑर्डर ID डालें\n\nया यहां अपना ऑर्डर ID शेयर करें!",
        contact: "हमारी सहायता टीम से संपर्क करें:\n\n📞 फोन: +91-9876543210\n📧 ईमेल: support@ecowaste.com\n💬 व्हाट्सऐप: +91-9876543210\n\nहमारी टीम 24/7 उपलब्ध है!",
        default: "मैं समझ गया कि आप कचरा प्रबंधन के बारे में पूछ रहे हैं। मैं इनमें मदद कर सकता हूं:\n\n• कचरा अलगाव दिशानिर्देश\n• पिकअप शेड्यूलिंग\n• दर की जानकारी\n• ऑर्डर ट्रैकिंग\n• सामान्य सहायता\n\nआप क्या जानना चाहते हैं?"
      }
    };

  const langResponses = responses[language as keyof typeof responses] || responses['en'];
    
    if (message.includes('segregate') || message.includes('separate') || message.includes('अलग')) {
      return langResponses.segregate;
    } else if (message.includes('pickup') || message.includes('schedule') || message.includes('पिकअप')) {
      return langResponses.pickup;
    } else if (message.includes('rate') || message.includes('price') || message.includes('दर')) {
      return langResponses.rate;
    } else if (message.includes('track') || message.includes('order') || message.includes('ट्रैक')) {
      return langResponses.track;
    } else if (message.includes('contact') || message.includes('support') || message.includes('संपर्क')) {
      return langResponses.contact;
    } else {
      return langResponses.default;
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakMessage = (text: string, language: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      // Try to find a female voice
      const voices = synthRef.current.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.lang.startsWith(language === 'hi' ? 'hi' : 'en') && 
        (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'))
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageCircle className="h-8 w-8" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">EcoWaste Assistant</h3>
                <p className="text-sm text-green-100">Online now</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white/20 text-white text-xs rounded px-2 py-1 border-none outline-none"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code} className="text-gray-900">{name}</option>
                ))}
              </select>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-xs ${
                          message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.sender === 'bot' && (
                          <button
                            onClick={() => speakMessage(message.text, selectedLanguage)}
                            className="text-green-600 hover:text-green-700 transition-colors"
                            disabled={isSpeaking}
                          >
                            <Volume2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isSpeaking && (
              <div className="flex justify-center">
                <button
                  onClick={stopSpeaking}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1"
                >
                  <Volume2 className="h-3 w-3" />
                  <span>Stop Speaking</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
              <div className="flex flex-wrap gap-2">
                {(quickReplies[selectedLanguage as keyof typeof quickReplies] || quickReplies['en']).map((reply: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={selectedLanguage === 'hi' ? 'अपना संदेश टाइप करें...' : 'Type your message...'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {isListening && (
              <p className="text-xs text-center text-gray-500 mt-2 animate-pulse">
                {selectedLanguage === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;