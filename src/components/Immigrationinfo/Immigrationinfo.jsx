import React from 'react';
import './Immigrationinfo.css';

const ImmigrationInfo = ({ 
  documents, 
  onUploadDocument, 
  deadlines, 
  onDeadlineChange, 
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
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '33.33%' }}></div>
            </div>
          </div>
          
          {/* Progress Labels */}
          <div className="flex justify-between text-sm text-gray-700">
            <span className="font-medium">Immigration Info</span>
            <span>Interests</span>
            <span>Password</span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Upload Securely - Encrypted on Azure Cloud
          </h2>

          {/* Document Upload Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* I-797 Document */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[140px]">
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center mb-1">I-797 Document</p>
              <button
                onClick={() => onUploadDocument('i797')}
                className="text-blue-500 text-sm font-medium flex items-center gap-1"
              >
                Upload
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </button>
            </div>

            {/* Passport Bio Page */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[140px]">
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center mb-1">Passport Bio Page</p>
              <div className="text-blue-500 text-sm font-medium flex items-center gap-1">
                Uploaded
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Recent I-94 */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[140px]">
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center mb-1">Recent I-94</p>
              <button
                onClick={() => onUploadDocument('i94')}
                className="text-blue-500 text-sm font-medium flex items-center gap-1"
              >
                Upload
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </button>
            </div>

            {/* H1B Visa Stamp */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[140px]">
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center mb-1">H1B Visa Stamp (Passport)</p>
              <div className="text-blue-500 text-sm font-medium flex items-center gap-1">
                Uploaded
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Deadlines Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Important Deadlines for Alerts
          </h2>

          {/* Date Inputs Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* H1B Start Date */}
            <div className="relative">
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-blue-500 text-xs font-medium z-10">
                H1B Start Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={deadlines.h1bStartDate}
                  onChange={(e) => onDeadlineChange('h1bStartDate', e.target.value)}
                  className="w-full border-2 border-blue-500 rounded-full px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 pr-10"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* H1B Expiry Date */}
            <div className="relative">
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-blue-500 text-xs font-medium z-10">
                H1B Expiry Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={deadlines.h1bExpiryDate}
                  onChange={(e) => onDeadlineChange('h1bExpiryDate', e.target.value)}
                  className="w-full border-2 border-blue-500 rounded-full px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 pr-10"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* I94 Expiry Date */}
            <div className="relative">
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-blue-500 text-xs font-medium z-10">
                I94 Expiry Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={deadlines.i94ExpiryDate}
                  onChange={(e) => onDeadlineChange('i94ExpiryDate', e.target.value)}
                  className="w-full border-2 border-blue-500 rounded-full px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 pr-10"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Passport Expiry Date */}
            <div className="relative">
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-blue-500 text-xs font-medium z-10">
                Passport Expiry Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={deadlines.passportExpiryDate}
                  onChange={(e) => onDeadlineChange('passportExpiryDate', e.target.value)}
                  className="w-full border-2 border-blue-500 rounded-full px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 pr-10"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
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

export default ImmigrationInfo;