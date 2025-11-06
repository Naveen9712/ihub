import React, { useState, useEffect, useRef } from 'react';

const ImmiHubOnboarding = () => {
  const [step, setStep] = useState('welcome'); // welcome, signup, verification, chatbot
  const [formData, setFormData] = useState({
    phoneNo: '+1 | 551-580-2970',
    email: 'nashvallapu@gmail.com',
    fullName: 'Nishanth Vallapu',
    visaStatus: 'F1 Visa - Pursuing Masters (or F1 Visa - OPT)'
  });
  const [otp, setOtp] = useState(['5', '4', '5', '0', '5', '5']);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [timer, setTimer] = useState(45);
  
  // Chatbot states
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const messagesEndRef = useRef(null);

  const questions = [
    "What is your college or university name?",
    "What is your date of birth? (MM/DD/YYYY)",
    "What is your field of study or major?",
    "What are your career interests or goals?",
    "Do you have any work authorization concerns?"
  ];

  // Auto-fill OTP timer
  useEffect(() => {
    if (step === 'verification' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chatbot with first question
  useEffect(() => {
    if (step === 'chatbot' && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          type: 'bot',
          text: "Hi! I'm your ImmiHub assistant. I'll help you complete your profile. Let's get started!"
        }, {
          type: 'bot',
          text: questions[0]
        }]);
      }, 500);
    }
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleNext = () => {
    if (step === 'welcome') {
      setStep('signup');
    } else if (step === 'signup') {
      setStep('verification');
    } else if (step === 'verification') {
      setStep('chatbot');
    }
  };

  const sendMessageToGemini = async (userMessage) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAaAVH1P5vHbjHWRFZm3rOWYTUU1FngycE`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an immigration assistant helping a user complete their profile. The user just answered: "${userMessage}". 
                Previous context: ${messages.map(m => m.text).join(' ')}
                
                Acknowledge their answer briefly and professionally. Then ask the next question: "${questions[currentQuestion + 1] || 'Thank you for completing your profile!'}"
                
                Keep your response concise and friendly.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        (currentQuestion < questions.length - 1 ? questions[currentQuestion + 1] : "Thank you for completing your profile! We'll process your information and get back to you soon.");

      return botResponse;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Fallback response
      if (currentQuestion < questions.length - 1) {
        return questions[currentQuestion + 1];
      } else {
        return "Thank you for completing your profile! We'll process your information and get back to you soon.";
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');

    // Get bot response
    const botResponse = await sendMessageToGemini(currentInput);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setCurrentQuestion(prev => prev + 1);
    }, 500);
  };

  // Welcome Screen
  if (step === 'welcome') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-[380px] min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-500 relative overflow-hidden">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-3">
            <span className="text-sm text-gray-800">01:34 PM</span>
            <div className="flex gap-1.5 items-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 20h5V10H2v10zm7 0h5V4H9v16zm7 0h5v-6h-5v6z"/>
              </svg>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <div className="w-6 h-3 bg-gray-800 rounded-sm"></div>
            </div>
          </div>

          {/* Image */}
          <div className="flex items-center justify-center mt-2 px-6">
            <div className="w-full relative">
              <img 
                src="/images/immi-image2.png" 
                alt="ImmiHub"
                className="w-full h-auto rounded-lg object-cover"
                style={{ height: '100%' }}
              />
            </div>
          </div>

          {/* Welcome Content */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-1">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
              <h2 className="text-4xl font-bold text-white mb-6">to Immihub</h2>
              <p className="text-white text-1xl leading-relaxed">
                Stay Informed, Stay Compliant –<br />
                Track Your Immigration Journey!
              </p>
            </div>

            {/* Join Button */}
            <button
              onClick={handleNext}
              className="w-full bg-white text-gray-900 text-lg font-semibold py-2 rounded-full shadow-lg mb-6"
            >
              Join now
            </button>

            {/* Login Link */}
            <div className="text-center text-white text-sm">
              Already have an account?{' '}
              <span className="text-cyan-300 font-medium cursor-pointer">Login</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signup Screen
  if (step === 'signup') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-[380px] min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-500 overflow-y-auto">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-3">
            <span className="text-sm text-gray-800">01:34 PM</span>
            <div className="flex gap-1.5 items-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 20h5V10H2v10zm7 0h5V4H9v16zm7 0h5v-6h-5v6z"/>
              </svg>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <div className="w-6 h-3 bg-gray-800 rounded-sm"></div>
            </div>
          </div>

          {/* Image */}
          <div className="px-6 mt-4">
            <div className="w-full relative flex items-center justify-center">
              <img 
                src="/images/immi-image2.png" 
                alt="ImmiHub"
                className="w-full h-auto rounded-lg object-cover"
                style={{ width: "100%" , height: "300px" }}
              />
            </div>
          </div>

          {/* Signup Form */}
          <div className="pb-8">
            <div className="bg-blue-500 rounded-3xl px-6 py-8 shadow-xl">
              <h2 className="text-2xl text-white text-center mb-8">Signup Form</h2>

              {/* Phone Number */}
              <div className="mb-6">
                <label className="text-white text-sm font-medium mb-2 block">Phone No</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-2 border-white rounded-full px-5 py-1 text-white placeholder-white/70 focus:outline-none focus:border-white"
                />
              </div>

              {/* Email ID */}
              <div className="mb-6">
                <label className="text-white text-sm font-medium mb-2 block">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-2 border-white rounded-full px-5 py-1 text-white placeholder-white/70 focus:outline-none focus:border-white"
                />
              </div>

              {/* Full Name */}
              <div className="mb-6">
                <label className="text-white text-sm font-medium mb-2 block">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-2 border-white rounded-full px-5 py-1 text-white placeholder-white/70 focus:outline-none focus:border-white"
                />
              </div>

              {/* Visa Status */}
              <div className="mb-8">
                <label className="text-white text-sm font-medium mb-2 block">Visa Status</label>
                <div className="relative">
                  <select
                    name="visaStatus"
                    value={formData.visaStatus}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-2 border-white rounded-full px-5 py-1 text-white focus:outline-none focus:border-white appearance-none cursor-pointer pr-10"
                  >
                    <option value="F1 Visa - Pursuing Masters (or F1 Visa - OPT)" className="text-gray-800">
                      F1 Visa - Pursuing Masters (or F1 Visa - OPT)
                    </option>
                    <option value="H1B Visa" className="text-gray-800">H1B Visa</option>
                    <option value="L1 Visa" className="text-gray-800">L1 Visa</option>
                    <option value="Green Card" className="text-gray-800">Green Card</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full bg-white text-gray-900 text-lg font-semibold py-2 rounded-full shadow-lg mb-5"
              >
                Next
              </button>

              {/* Login Link */}
              <div className="text-center text-white text-sm">
                Already have an account?{' '}
                <span className="text-cyan-300 font-medium cursor-pointer">Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verification Screen
  if (step === 'verification') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-[380px] min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-500 overflow-y-auto">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-3">
            <span className="text-sm text-gray-800">01:34 PM</span>
            <div className="flex gap-1.5 items-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 20h5V10H2v10zm7 0h5V4H9v16zm7 0h5v-6h-5v6z"/>
              </svg>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <div className="w-6 h-3 bg-gray-800 rounded-sm"></div>
            </div>
          </div>

          {/* Image */}
          <div className="px-6 mt-4 mb-8">
            <div className="w-full relative">
              <img 
                src="/images/immi-image2.png" 
                alt="ImmiHub"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Verification Form */}
          <div className="px-6 pb-8">
            <div className="bg-blue-500 rounded-3xl px-6 py-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white text-center mb-8">Verification</h2>

              {/* Phone Number */}
              <div className="mb-8">
                <label className="text-white text-sm font-medium mb-2 block">Phone No</label>
                <input
                  type="text"
                  value={formData.phoneNo}
                  disabled
                  className="w-full bg-transparent border-2 border-white rounded-full px-5 py-1 text-white"
                />
              </div>

              {/* OTP Input */}
              <div className="mb-6">
                <div className="flex gap-2 justify-center mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className={`w-5 h-5 text-center text-sm font-bold rounded-lg ${
                        index === 5 ? 'bg-yellow-200' : 'bg-white'
                      } text-gray-900 focus:outline-none focus:ring-2 focus:ring-white`}
                    />
                  ))}
                </div>
                <p className="text-center text-cyan-300 text-sm font-medium">
                  Get another code in {timer} seconds
                </p>
              </div>

              {/* Keep Signed In */}
              <div className="mb-8 mt-10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="w-5 h-5 mt-0.5 accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-white font-semibold text-base mb-1">Keep me signed in</div>
                    <div className="text-white text-sm">
                      Uncheck if using a public device.{' '}
                      <span className="text-cyan-300 font-medium cursor-pointer">More</span>
                    </div>
                  </div>
                </label>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full bg-white text-gray-900 text-lg font-semibold py-2 rounded-full shadow-lg mb-4"
              >
                Next
              </button>

              {/* Alternative Link */}
              <div className="text-center text-white text-sm">
                Code not working?{' '}
                <span className="text-cyan-300 font-medium cursor-pointer">Try another way</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chatbot Screen
  if (step === 'chatbot') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-[428px] h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
          {/* Header */}
          <div className="bg-blue-500 text-white px-6 py-6 shadow-lg">
            <h1 className="text-2xl font-bold text-center">Complete Your Profile</h1>
            <p className="text-center text-blue-100 text-sm mt-1">
              Let's gather some information to personalize your experience
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your answer..."
                className="flex-1 border-2 border-blue-300 rounded-full px-5 py-3 focus:outline-none focus:border-blue-500 text-gray-800"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !currentInput.trim()}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ImmiHubOnboarding;