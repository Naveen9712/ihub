import React, { useState, useEffect } from 'react';
import './onboarding.css';
import Welcome from '../welcome/welcome';
import Signup from '../signup/signup';
import Verification from '../verification/verification';
import ImmigrationInfo from '../Immigrationinfo/Immigrationinfo';
import ChatOnboarding from '../Chatonboarding/chatonboarding';
import Interests from '../Interests/Interests';
import Password from '../password/password';

const ImmiHubOnboarding = () => {
  const [step, setStep] = useState('welcome'); // welcome, signup, verification, immigrationInfo, chatOnboarding, interests, password
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
  
  // Chat responses states
  const [chatResponses, setChatResponses] = useState({});
  
  // Interests states
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  // Password states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Auto-fill OTP timer
  useEffect(() => {
    if (step === 'verification' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);
  
  // Auto-select interests based on chat responses
  useEffect(() => {
    if (Object.keys(chatResponses).length > 0) {
      const autoSelectedInterests = [];
      
      if (chatResponses.hasUpcomingTravel === 'Yes') {
        autoSelectedInterests.push('travelOutsideUS');
      }
      
      if (chatResponses.employerChange === 'Yes') {
        autoSelectedInterests.push('employerChange');
      }
      
      if (chatResponses.workLocation === 'Remote' || chatResponses.workLocation === 'Hybrid') {
        autoSelectedInterests.push('clientSite');
      }
      
      // Merge with existing interests
      if (autoSelectedInterests.length > 0) {
        setSelectedInterests(prev => {
          const merged = [...new Set([...prev, ...autoSelectedInterests])];
          return merged;
        });
      }
    }
  }, [chatResponses]);

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
      setStep('chatOnboarding');
    } else if (step === 'chatOnboarding') {
      setStep('interests');
    } else if (step === 'interests') {
      setStep('password');
    } else if (step === 'password') {
      // Complete onboarding - could submit data here
      console.log('Onboarding complete!', {
        formData,
        documents,
        deadlines,
        chatResponses,
        selectedInterests,
        password
      });
    }
  };

  const handleBack = () => {
    if (step === 'password') {
      setStep('interests');
    } else if (step === 'interests') {
      setStep('chatOnboarding');
    } else if (step === 'chatOnboarding') {
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
  
  const handleChatComplete = (responses) => {
    setChatResponses(responses);
    // Auto-advance to interests page after chat completes
    setStep('interests');
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
    
    case 'chatOnboarding':
      return (
        <ChatOnboarding 
          userInfo={{
            fullName: formData.fullName,
            location: 'Dallas, TX, USA' // You can make this dynamic based on formData
          }}
          onComplete={handleChatComplete}
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
    
    default:
      return null;
  }
};

export default ImmiHubOnboarding;

