import React from 'react';
import './Immigrationinfo.css';

const ImmigrationInfo = ({ 
  documents, 
  onUploadDocument, 
  onNext, 
  onBack 
}) => {
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

      <div className="w-full h-full overflow-y-auto  px-4 py-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-1.5xl font-semibold text-blue-500 mb-4 font-poppins">Sign up</h1>
          
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
          <h2 className="text-sm font-bold text-gray-900 mb-6 font-poppins">
            Upload Securely - Encrypted on Azure Cloud
          </h2>

          {/* Document Upload Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* I-797 Document */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center">
              <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center mb-1 font-inter">I-797 Document</p>
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
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center">
              <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center mb-1 font-inter">Passport Bio Page</p>
              <div className="text-blue-500 text-sm font-medium flex items-center gap-1">
                Uploaded
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Recent I-94 */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center">
              <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center mb-1 font-inter">Recent I-94</p>
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
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center">
              <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center mb-1 font-inter">H1B Visa Stamp (Passport)</p>
              <div className="text-blue-500 text-sm font-medium flex items-center gap-1">
                Uploaded
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

          {/* Chat Option Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-sm font-bold text-gray-900 mb-1 font-poppins">
                  Don't have documents ready?
                </h2>
                <p className="text-xs text-gray-600 font-inter">
                  Continue with chat to provide information later
                </p>
              </div>
              <button
                onClick={onNext}
                className="ml-4 bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-blue-600 transition-colors font-inter flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Continue with Chat
              </button>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-full shadow-lg mb-6 hover:bg-blue-600 transition-colors font-inter"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  export default ImmigrationInfo;