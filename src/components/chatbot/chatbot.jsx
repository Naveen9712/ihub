import React, { useEffect, useRef } from 'react';
import './chatbot.css';

const Chatbot = ({ 
  messages, 
  currentInput, 
  onInputChange, 
  onSendMessage, 
  isLoading,
  questions,
  onBack
}) => {
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed-layout-container flex items-center justify-center bg-gray-100">
      <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-6 shadow-lg relative">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute left-6 top-6 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Go back"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-center font-poppins">Complete Your Profile</h1>
          <p className="text-center text-blue-100 text-sm mt-1 font-inter">
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
                className={`max-w-[75%] px-4 py-3 rounded-2xl font-inter ${
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
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm font-inter">
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
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
              placeholder="Type your answer..."
              className="flex-1 border-2 border-blue-300 rounded-full px-5 py-3 focus:outline-none focus:border-blue-500 text-gray-800 font-inter"
              disabled={isLoading}
            />
            <button
              onClick={onSendMessage}
              disabled={isLoading || !currentInput.trim()}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap font-inter"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

