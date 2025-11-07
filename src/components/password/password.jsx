import React from 'react';
import './password.css';

const Password = ({ 
  password, 
  confirmPassword, 
  onPasswordChange, 
  onConfirmPasswordChange, 
  onNext, 
  onBack 
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
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

      <div className="w-full max-w-[380px] min-h-screen overflow-y-auto px-4 py-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-500 mb-4">Sign up</h1>
          
          {/* Progress Bar */}
          <div className="relative mb-2">
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          {/* Progress Labels */}
          <div className="flex justify-between text-sm text-gray-700">
            <span>Immigration Info</span>
            <span>Interests</span>
            <span className="font-medium">Password</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Choose a New Password Below
          </h2>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label className="absolute left-4 -top-2.5 bg-gray-100 px-2 text-blue-500 text-sm font-medium z-10">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className="w-full border-2 border-blue-500 rounded-full px-5 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 bg-white"
            />
          </div>

          {/* Re-Enter Password Input */}
          <div className="mb-6 relative">
            <label className="absolute left-4 -top-2.5 bg-gray-100 px-2 text-blue-500 text-sm font-medium z-10">
              Re-Enter Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              className="w-full border-2 border-blue-500 rounded-full px-5 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full bg-blue-500 text-white text-lg font-semibold py-3.5 rounded-full shadow-lg mb-6 hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Password;