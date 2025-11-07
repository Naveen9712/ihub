import React, { useState, useEffect } from 'react';
import './onboarding.css';
import Welcome from '../welcome/welcome';
import Signup from '../signup/signup';
import Verification from '../verification/verification';
import ImmigrationInfo from '../Immigrationinfo/Immigrationinfo';
import Interests from '../Interests/Interests';
import Password from '../password/password';
import Chatbot from '../chatbot/chatbot';

const ImmiHubOnboarding = () => {
  const [step, setStep] = useState('welcome'); // welcome, signup, verification, immigrationInfo, interests, password, chatbot
  const [formData, setFormData] = useState({
    phoneNo: '+1 | 551-580-2970',
    email: 'nashvallapu@gmail.com',
    fullName: 'Nishanth Vallapu',
    visaStatus: 'F1 Visa - Pursuing Masters (or F1 Visa - OPT)'
  });
  const [otp, setOtp] = useState(['5', '4', '5', '0', '5', '5']);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [timer, setTimer] = useState(45);
  
  // Immigration Info states
  const [documents, setDocuments] = useState({
    i797: false,
    passport: true,
    i94: false,
    h1bVisaStamp: true
  });
  const [deadlines, setDeadlines] = useState({
    h1bStartDate: '',
    h1bExpiryDate: '',
    i94ExpiryDate: '',
    passportExpiryDate: ''
  });
  
  // Interests states
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  // Password states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Chatbot states
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
      setStep('immigrationInfo');
    } else if (step === 'immigrationInfo') {
      setStep('interests');
    } else if (step === 'interests') {
      setStep('password');
    } else if (step === 'password') {
      setStep('chatbot');
    }
  };

  const handleBack = () => {
    if (step === 'chatbot') {
      setStep('password');
    } else if (step === 'password') {
      setStep('interests');
    } else if (step === 'interests') {
      setStep('immigrationInfo');
    } else if (step === 'immigrationInfo') {
      setStep('verification');
    } else if (step === 'verification') {
      setStep('signup');
    } else if (step === 'signup') {
      setStep('welcome');
    }
  };
  
  const handleUploadDocument = (docType) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: !prev[docType]
    }));
  };
  
  const handleDeadlineChange = (field, value) => {
    setDeadlines(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleInterestToggle = (interestId) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };
  
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
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

  const handleInputChangeForChatbot = (value) => {
    setCurrentInput(value);
  };

  // Render based on step
  switch (step) {
    case 'welcome':
      return <Welcome onNext={handleNext} />;
    
    case 'signup':
      return (
        <Signup 
          formData={formData}
          onInputChange={handleInputChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      );
    
    case 'verification':
      return (
        <Verification 
          formData={formData}
          otp={otp}
          onOtpChange={handleOtpChange}
          keepSignedIn={keepSignedIn}
          onKeepSignedInChange={setKeepSignedIn}
          timer={timer}
          onNext={handleNext}
          onBack={handleBack}
        />
      );
    
    case 'immigrationInfo':
      return (
        <ImmigrationInfo 
          documents={documents}
          onUploadDocument={handleUploadDocument}
          deadlines={deadlines}
          onDeadlineChange={handleDeadlineChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      );
    
    case 'interests':
      return (
        <Interests 
          selectedInterests={selectedInterests}
          onInterestToggle={handleInterestToggle}
          onNext={handleNext}
          onBack={handleBack}
        />
      );
    
    case 'password':
      return (
        <Password 
          password={password}
          confirmPassword={confirmPassword}
          onPasswordChange={handlePasswordChange}
          onConfirmPasswordChange={handleConfirmPasswordChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      );
    
    case 'chatbot':
      return (
        <Chatbot 
          messages={messages}
          currentInput={currentInput}
          onInputChange={handleInputChangeForChatbot}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          questions={questions}
          onBack={handleBack}
        />
      );
    
    default:
      return null;
  }
};

export default ImmiHubOnboarding;

