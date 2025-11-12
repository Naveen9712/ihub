import React, { useState, useEffect, useRef } from 'react';
import './chatonboarding.css';

const ChatOnboarding = ({ 
  userInfo,
  onComplete, 
  onBack 
}) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('greeting');
  const [isTyping, setIsTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [responses, setResponses] = useState({});
  const [conversationPath, setConversationPath] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typing animation effect
  const typeMessage = (text) => {
    return new Promise((resolve) => {
      setIsTyping(true);
      const words = text.split(' ');
      let currentText = '';
      let wordIndex = 0;

      const messageId = `bot-${Date.now()}`;
      
      const typingInterval = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.id === messageId) {
              newMessages[newMessages.length - 1] = {
                type: 'bot',
                text: currentText,
                id: messageId,
                isComplete: false
              };
            } else {
              newMessages.push({
                type: 'bot',
                text: currentText,
                id: messageId,
                isComplete: false
              });
            }
            return newMessages;
          });
          wordIndex++;
        } else {
          clearInterval(typingInterval);
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              ...newMessages[newMessages.length - 1],
              isComplete: true
            };
            return newMessages;
          });
          setIsTyping(false);
          resolve();
        }
      }, 80);
    });
  };

  // Add user message instantly
  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      type: 'user',
      text: text,
      id: `user-${Date.now()}`,
      isComplete: true
    }]);
  };

  // Main conversation orchestrator
  const processStep = async (step, data = {}) => {
    setShowButtons(false);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    switch(step) {
      case 'greeting':
        await typeMessage(`Great to meet you, ${userInfo.fullName}! What's your current address?`);
        setShowButtons(true);
        setCurrentStep('select-address');
        break;

      case 'address-confirm':
        setMessages(prev => [...prev, {
          type: 'address-card',
          text: responses.address,
          id: `address-${Date.now()}`,
          isComplete: true
        }]);
        await typeMessage(`Perfect! Is this your correct home address?`);
        setShowButtons(true);
        setCurrentStep('address-confirmed');
        break;

      case 'marketing':
        await typeMessage(`Great news, ${userInfo.fullName.split(' ')[0]}! Our renters in Texas save $$$ when bundling with car!\n\n• Practically covers your renters costs\n• Great prices for safe drivers\n• Terrible prices for terrible drivers ;)\n• Free emergency roadside services\n• Award-winning customer service`);
        setShowButtons(true);
        setCurrentStep('marketing-response');
        break;

      case 'remind-later':
        await typeMessage(`Sure — let's start with your renters quote!\n\nDo you already have a renters policy for this address? I can help you cancel it once this policy becomes active…`);
        setShowButtons(true);
        setCurrentStep('has-existing-policy');
        break;

      case 'has-existing-yes':
        setConversationPath([...conversationPath, 'existing-policy']);
        await typeMessage(`Okay — to help with cancelling when this new policy is active, I'll need a couple details. Who is your current insurer?`);
        setShowButtons(true);
        setCurrentStep('insurer-name');
        break;

      case 'policy-expiry':
        await typeMessage(`Thanks. When does your current policy expire or renew?`);
        setShowButtons(true);
        setCurrentStep('expiry-date');
        break;

      case 'cancellation-help':
        await typeMessage(`If you'd like, we can add a request to cancel your current policy on the day the new policy starts. Do you want me to do that?`);
        setShowButtons(true);
        setCurrentStep('cancellation-request');
        break;

      case 'coverage-match':
        await typeMessage(`Got it. Next — do you want to proceed with a quote that matches your current coverage or explore different coverage levels?`);
        setShowButtons(true);
        setCurrentStep('coverage-preference');
        break;

      case 'has-existing-no':
        setConversationPath([...conversationPath, 'no-policy']);
        await typeMessage(`Perfect — I'll walk you through the quote. First: About how much would it cost to replace everything you own if you had to? (This helps us pick the right coverage.)`);
        setShowButtons(true);
        setCurrentStep('replacement-value');
        break;

      case 'roommates':
        await typeMessage(`Any roommates or other adults living at this address?`);
        setShowButtons(true);
        setCurrentStep('roommates-question');
        break;

      case 'pets':
        await typeMessage(`Do you have pets?`);
        setShowButtons(true);
        setCurrentStep('pets-question');
        break;

      case 'valuables':
        await typeMessage(`Do you own any high-value items we should schedule separately? (jewelry, camera gear, musical instruments, collectibles)`);
        setShowButtons(true);
        setCurrentStep('valuables-question');
        break;

      case 'deductible':
        await typeMessage(`Preferred deductible?`);
        setMessages(prev => [...prev, {
          type: 'bot',
          text: '💡 Higher deductible usually lowers your monthly premium.',
          id: `tip-${Date.now()}`,
          isComplete: true,
          isSubtext: true
        }]);
        setShowButtons(true);
        setCurrentStep('deductible-selection');
        break;

      case 'discounts':
        await typeMessage(`Would you like to see discounts we might apply? (safe driver, multi-policy bundle, security devices, claims-free)`);
        setShowButtons(true);
        setCurrentStep('discounts-question');
        break;

      case 'contact-info':
        await typeMessage(`Almost done! We'll need your contact details to send the quote. Do you prefer we contact you by email or phone?`);
        setShowButtons(true);
        setCurrentStep('contact-preference');
        break;

      case 'summary':
        await typeMessage(`Thanks, ${userInfo.fullName.split(' ')[0]} — here's a summary of your quote inputs:\n\n• Address: ${responses.address}\n• Replacement value: ${responses.replacementValue}\n• Roommates: ${responses.roommates || 'None'}\n• Pets: ${responses.pets || 'None'}\n• Deductible: ${responses.deductible}\n\nWould you like to see estimated monthly premiums or proceed to bind the policy?`);
        setShowButtons(true);
        setCurrentStep('summary-action');
        break;

      case 'show-estimate':
        await typeMessage(`Based on what you told me, an estimated monthly premium is $${calculatePremium()} / month. Want to adjust coverage or proceed with this quote?`);
        setShowButtons(true);
        setCurrentStep('estimate-action');
        break;

      case 'bind-policy':
        await typeMessage(`Great! To bind the policy, we'll need to collect a few more details like date of birth and payment method. Would you like to proceed now or save this quote for later?`);
        setShowButtons(true);
        setCurrentStep('bind-confirm');
        break;

      case 'completion':
        await typeMessage(`Perfect! We'll send you an email with the next steps to complete your policy. You can finish the application and make your first payment there. Sound good?`);
        setShowButtons(true);
        setCurrentStep('final-confirm');
        break;

      case 'done':
        await typeMessage(`Great! You're all set. Click Next to continue.`);
        setShowNextButton(true);
        break;
    }
  };

  // Calculate estimated premium (simple formula)
  const calculatePremium = () => {
    const baseRate = 35;
    const valueMultiplier = parseInt(responses.replacementValue?.replace(/[^0-9]/g, '') || '25000') / 25000;
    const deductibleDiscount = (responses.deductible === '2000') ? 0.9 : (responses.deductible === '1000') ? 0.95 : 1;
    return Math.round(baseRate * valueMultiplier * deductibleDiscount);
  };

  // Handle button responses
  const handleButtonResponse = async (response) => {
    addUserMessage(response);
    setShowButtons(false);
    
    // Save response based on current step
    const newResponses = { ...responses };
    
    switch(currentStep) {
      case 'select-address':
        newResponses.address = response;
        setResponses(newResponses);
        await processStep('address-confirm');
        break;

      case 'address-confirmed':
        if (response === 'Yes, correct') {
          await processStep('marketing');
        } else {
          // Let them select again
          await processStep('greeting');
        }
        break;
        
      case 'marketing-response':
        if (response === 'Remind me later') {
          await processStep('remind-later');
        } else {
          await processStep('remind-later');
        }
        break;
        
      case 'has-existing-policy':
        if (response === 'Yes, I do') {
          await processStep('has-existing-yes');
        } else {
          await processStep('has-existing-no');
        }
        break;

      case 'insurer-name':
        newResponses.currentInsurer = response;
        setResponses(newResponses);
        await processStep('policy-expiry');
        break;

      case 'expiry-date':
        newResponses.policyExpiry = response;
        setResponses(newResponses);
        await processStep('cancellation-help');
        break;

      case 'cancellation-request':
        newResponses.cancelPolicy = response;
        setResponses(newResponses);
        await processStep('coverage-match');
        break;

      case 'coverage-preference':
        newResponses.coveragePreference = response;
        setResponses(newResponses);
        await processStep('roommates');
        break;

      case 'replacement-value':
        newResponses.replacementValue = response;
        setResponses(newResponses);
        await processStep('roommates');
        break;

      case 'roommates-question':
        newResponses.roommates = response;
        setResponses(newResponses);
        await processStep('pets');
        break;

      case 'pets-question':
        newResponses.pets = response;
        setResponses(newResponses);
        await processStep('valuables');
        break;

      case 'valuables-question':
        newResponses.valuables = response;
        setResponses(newResponses);
        await processStep('deductible');
        break;

      case 'deductible-selection':
        newResponses.deductible = response.replace(/[$,]/g, '');
        setResponses(newResponses);
        await processStep('discounts');
        break;

      case 'discounts-question':
        newResponses.showDiscounts = response;
        setResponses(newResponses);
        await processStep('contact-info');
        break;

      case 'contact-preference':
        newResponses.contactPreference = response;
        setResponses(newResponses);
        await processStep('summary');
        break;

      case 'summary-action':
        if (response === 'See estimate') {
          await processStep('show-estimate');
        } else if (response === 'Proceed to bind') {
          await processStep('bind-policy');
        } else {
          await processStep('done');
        }
        break;

      case 'estimate-action':
        if (response === 'Proceed with quote') {
          await processStep('bind-policy');
        } else {
          await processStep('done');
        }
        break;

      case 'bind-confirm':
        if (response === 'Proceed now') {
          await processStep('completion');
        } else {
          await processStep('done');
        }
        break;

      case 'final-confirm':
        await processStep('done');
        break;
    }
  };

  // Get button options for current step
  const getButtonOptions = () => {
    switch(currentStep) {
      case 'select-address':
        return ['5200 Plano Rd, Dallas, TX', '1234 Main St, Dallas, TX', '789 Oak Ave, Dallas, TX'];
      case 'address-confirmed':
        return ['Yes, correct', 'No, change address'];
      case 'marketing-response':
        return ['Remind me later', 'Tell me more'];
      case 'has-existing-policy':
        return ['Yes, I do', 'No, I don\'t'];
      case 'insurer-name':
        return ['State Farm', 'Allstate', 'Geico', 'Progressive', 'Other'];
      case 'expiry-date':
        return ['Ends soon', 'Within 1 month', 'Within 3 months', '3+ months'];
      case 'cancellation-request':
        return ['Yes, please', 'No, I\'ll handle it'];
      case 'coverage-preference':
        return ['Match current', 'Lower deductible', 'Higher coverage'];
      case 'replacement-value':
        return ['$10k', '$25k', '$50k', '$75k'];
      case 'roommates-question':
        return ['Yes — 1', 'Yes — 2+', 'No'];
      case 'pets-question':
        return ['No pets', 'Dog', 'Cat', 'Other'];
      case 'valuables-question':
      case 'discounts-question':
        return ['Yes', 'No'];
      case 'deductible-selection':
        return ['$500', '$1,000', '$2,000'];
      case 'contact-preference':
        return ['Email', 'Phone', 'Either'];
      case 'summary-action':
        return ['See estimate', 'Proceed to bind', 'Save for later'];
      case 'estimate-action':
        return ['Proceed with quote', 'Save for later'];
      case 'bind-confirm':
        return ['Proceed now', 'Save for later'];
      case 'final-confirm':
        return ['Sounds good!'];
      default:
        return ['Yes', 'No'];
    }
  };

  // Start conversation
  useEffect(() => {
    const timer = setTimeout(() => {
      processStep('greeting');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const buttons = getButtonOptions();

  return (
    <div className="fixed-layout-container flex items-center justify-center bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
        aria-label="Go back"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="w-full min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4 bg-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900 font-poppins">About you</h1>
              <div className="w-20 h-1 bg-blue-500 rounded-full mt-1"></div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 font-inter">{userInfo.fullName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 pb-32 bg-gray-100">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'address-card' ? (
                  <div className="w-full max-w-[85%] bg-white rounded-xl p-4 shadow-sm border-2 border-blue-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1 font-inter">Home Address</p>
                        <p className="text-sm font-medium text-gray-900 font-inter">{message.text}</p>
                      </div>
                      <button className="text-blue-500 text-xs font-medium font-inter">Edit</button>
                    </div>
                  </div>
                ) : (
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.type === 'bot' && !message.isSubtext && (
                      <div className="flex items-start gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src="/images/ihub-favicon.jpg" 
                            alt="Chat icon" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white ml-auto'
                          : message.isSubtext
                          ? 'bg-blue-50 text-gray-700 text-xs italic'
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line font-inter">{message.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/images/ihub-favicon.jpg" 
                      alt="Chat icon" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Response Buttons */}
        {showButtons && !isTyping && (
          <div className="bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
            <div className={`grid ${buttons.length > 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonResponse(button)}
                  className="bg-white border-2 border-blue-500 text-blue-500 font-semibold py-3 px-4 rounded-full hover:bg-blue-50 transition-colors text-sm font-inter"
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Next Button (Final) */}
        {showNextButton && (
          <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
            <button
              onClick={() => onComplete(responses)}
              className="w-full bg-blue-500 text-white text-lg font-semibold py-3.5 rounded-full hover:bg-blue-600 transition-colors font-inter"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatOnboarding;