import React from 'react';
import './Intersets.css';

const Interests = ({ 
  selectedInterests, 
  onInterestToggle, 
  onNext, 
  onBack 
}) => {
  const interests = [
    { id: 'travelOutsideUS', label: 'Planing to Travel\nOutside the US' },
    { id: 'employerChange', label: 'Considering Employer\nChange/Transfer' },
    { id: 'h1bExpiring', label: 'H-1B Expiring Soon\n(Extension Prep)' },
    { id: 'dependents', label: 'Have Dependents\n(H-4/EAD)' },
    { id: 'addressChange', label: 'Recently Changed\nAddress' },
    { id: 'clientSite', label: 'Working at\nClient Site/Remote' },
    { id: 'visaStamping', label: 'Pending or Recent\nVisa Stamping' },
    { id: 'greenCard', label: 'Started Green Card\nProcess (PERM/I-140)' },
    { id: 'onBench', label: 'On Bench /\nBetween Projects' },
    { id: 'taxPlanning', label: 'Need\nTax / Financial Planning' }
  ];

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

      <div className="w-full h-full overflow-y-auto px-4 py-4 pt-18">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-500 mb-4">Sign up</h1>
          
          {/* Progress Bar */}
          <div className="relative mb-2">
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '66.66%' }}></div>
            </div>
          </div>
          
          {/* Progress Labels */}
          <div className="flex justify-between text-sm text-gray-700">
            <span>Immigration Info</span>
            <span className="font-medium">Interests</span>
            <span>Password</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-6">
          <h2 className="text-md font-bold text-gray-900 mb-3">
            Choose your current H-1B goals
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            We'll personalize reminders, document tracking, and compliance guidance based on your selections.
          </p>

          {/* Checkbox Grid */}
          <div className="grid grid-cols-2 gap-3">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => onInterestToggle(interest.id)}
                className={`relative border-2 rounded-xl p-2 text-left flex items-center transition-all ${
                  selectedInterests.includes(interest.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-300'
                }`}
              >
                <span className="text-blue-900 text-sm font-medium leading-snug pr-8 whitespace-pre-line">
                  {interest.label}
                </span>
                
                {/* Checkbox Icon */}
                <div className="absolute top-4 right-4">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400 bg-white'
                  }`}>
                    {selectedInterests.includes(interest.id) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full bg-blue-500 text-white text-sm font-semibold py-1.5 rounded-full shadow-lg mb-6 hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Interests;