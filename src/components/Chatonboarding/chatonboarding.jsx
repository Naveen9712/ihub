import React, { useState, useEffect, useRef } from 'react';
import './chatonboarding.css';

const ChatOnboarding = ({ 
  userInfo,
  onComplete, 
  onBack 
}) => {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [responses, setResponses] = useState({});
  const messagesEndRef = useRef(null);

  // Chat conversation flow
  const conversationFlow = [
    {
      type: 'bot',
      text: `Great to meet you ${userInfo.fullName}! What's your current location?`,
      id: 'greeting'
    },
    {
      type: 'user',
      text: userInfo.location || 'Dallas, TX, USA',
      id: 'location-response'
    },
    {
      type: 'bot',
      text: `Perfect! We'll help you stay compliant with immigration requirements in your area. 🎯`,
      id: 'location-confirm'
    },
    {
      type: 'bot',
      text: `Quick question - Do you have any upcoming international travel planned in the next 6 months?`,
      id: 'travel-question',
      requiresResponse: true,
      responseKey: 'hasUpcomingTravel'
    },
    {
      type: 'bot',
      text: `Got it! Are you currently working on-site at your employer's location or remotely?`,
      id: 'work-location-question',
      requiresResponse: true,
      responseKey: 'workLocation',
      customButtons: ['On-site', 'Remote', 'Hybrid']
    },
    {
      type: 'bot',
      text: `Thank you! One more thing - Are you planning to change employers or transfer your H-1B in the near future?`,
      id: 'employer-change-question',
      requiresResponse: true,
      responseKey: 'employerChange'
    },
    {
      type: 'bot',
      text: `Excellent! Based on your responses, we'll personalize your experience. Let's continue with your preferences! ✨`,
      id: 'completion'
    }
  ];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typing animation effect
  const typeMessage = (message) => {
    return new Promise((resolve) => {
      setIsTyping(true);
      const words = message.text.split(' ');
      let currentText = '';
      let wordIndex = 0;

      const typingInterval = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.id === message.id) {
              newMessages[newMessages.length - 1] = {
                ...message,
                text: currentText,
                isComplete: false
              };
            } else {
              newMessages.push({
                ...message,
                text: currentText,
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
              ...message,
              isComplete: true
            };
            return newMessages;
          });
          setIsTyping(false);
          resolve();
        }
      }, 100); // Typing speed: 100ms per word
    });
  };

  // Process next message in conversation
  const processNextMessage = async () => {
    if (currentMessageIndex >= conversationFlow.length) {
      // Conversation complete
      setTimeout(() => {
        onComplete(responses);
      }, 1000);
      return;
    }

    const message = conversationFlow[currentMessageIndex];

    if (message.type === 'user') {
      // User message appears instantly
      setMessages(prev => [...prev, { ...message, isComplete: true }]);
      setCurrentMessageIndex(prev => prev + 1);
    } else {
      // Bot message types out
      await typeMessage(message);
      
      if (message.requiresResponse) {
        setShowButtons(true);
      } else {
        setCurrentMessageIndex(prev => prev + 1);
      }
    }
  };

  // Handle user response
  const handleResponse = (response) => {
    const currentMessage = conversationFlow[currentMessageIndex];
    
    // Add user response to messages
    setMessages(prev => [...prev, {
      type: 'user',
      text: response,
      id: `response-${currentMessage.responseKey}`,
      isComplete: true
    }]);

    // Save response
    setResponses(prev => ({
      ...prev,
      [currentMessage.responseKey]: response
    }));

    setShowButtons(false);
    setCurrentMessageIndex(prev => prev + 1);
  };

  // Start conversation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      processNextMessage();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Continue conversation when index changes
  useEffect(() => {
    if (currentMessageIndex > 0 && currentMessageIndex < conversationFlow.length) {
      const timer = setTimeout(() => {
        processNextMessage();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  const currentMessage = conversationFlow[currentMessageIndex];
  const buttons = currentMessage?.customButtons || ['Yes', 'No'];

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

      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4">
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
        <div className="flex-1 overflow-y-auto px-4 pb-24">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.id}-${index}`}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.type === 'bot' && (
                    <div className="flex items-start gap-2 mb-1">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white ml-auto'
                        : 'bg-white text-gray-800 shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed font-inter">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
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
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[380px] bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
            <div className="flex gap-3">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleResponse(button)}
                  className="flex-1 bg-white border-2 border-blue-500 text-blue-500 font-semibold py-3 rounded-full hover:bg-blue-50 transition-colors font-inter"
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatOnboarding;