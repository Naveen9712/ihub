import React, { useState } from 'react';
import ChatOnboarding from './chatonboarding';

/**
 * Demo/Preview Component for ChatOnboarding
 * Use this to test the chat interface independently
 */
function ChatDemo() {
  const [showChat, setShowChat] = useState(true);
  const [responses, setResponses] = useState(null);

  // Sample user info
  const userInfo = {
    fullName: 'Nishanth Vallapu',
    location: 'Dallas, TX, USA'
  };

  const handleChatComplete = (chatResponses) => {
    console.log('Chat completed with responses:', chatResponses);
    setResponses(chatResponses);
    setShowChat(false);
  };

  const handleBack = () => {
    console.log('Back button clicked');
    // In real app, this would go to previous page
  };

  // Show results screen after chat completes
  if (!showChat && responses) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Chat Completed! ✅
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">
                Upcoming Travel
              </h3>
              <p className="text-lg text-gray-900">
                {responses.hasUpcomingTravel}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">
                Work Location
              </h3>
              <p className="text-lg text-gray-900">
                {responses.workLocation}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">
                Employer Change Plans
              </h3>
              <p className="text-lg text-gray-900">
                {responses.employerChange}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowChat(true);
              setResponses(null);
            }}
            className="w-full mt-8 bg-blue-500 text-white font-semibold py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ChatOnboarding
      userInfo={userInfo}
      onComplete={handleChatComplete}
      onBack={handleBack}
    />
  );
}

export default ChatDemo;