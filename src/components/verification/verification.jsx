import React from 'react';
import './verification.css';

const Verification = ({ formData, otp, onOtpChange, keepSignedIn, onKeepSignedInChange, timer, onNext, onBack }) => {
  return (
    <div className="fixed-layout-container flex items-center justify-center bg-gray-100 relative">
      {/* Back Button - Positioned outside content container */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
        aria-label="Go back"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="w-100 h-150 relative">
        {/* Image */}
        <div className="px-6 mt-4 mb-8 flex-shrink-0">
          <div className="w-85 h-55 relative">
            <img 
              src="/images/immi-image2.png" 
              alt="ImmiHub"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Spacer to push form to bottom */}
        <div className="flex-1"></div>

        {/* Verification Form - Fixed to bottom */}
        <div className="flex-shrink-0 verification-form">
          <div className="bg-blue-500 px-6 py-2 shadow-xl">
            <h2 className="font-bold text-white text-center font-poppins pt-5">Verification</h2>

            {/* Phone Number */}
            <div className="mb-4 mt-2 relative">
              <label className="absolute left-5 -top-2.5 bg-blue-500 px-2 text-white text-sm font-medium font-inter">
                Phone No
              </label>
              <input
                type="text"
                value={formData.phoneNo}
                disabled
                className="w-full bg-transparent border-1 border-white rounded-full px-5 py-1.5 text-white font-inter"
              />
            </div>

            {/* OTP Input */}
            <div className="mb-2">
              <div className="flex gap-2 justify-center mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => onOtpChange(index, e.target.value)}
                    className={`w-10 h-10 text-center text-sm font-bold rounded font-inter ${
                      index === 5 ? 'bg-yellow-200' : 'bg-white'
                    } text-gray-900 focus:outline-none focus:ring-2 focus:ring-white`}
                  />
                ))}
              </div>
              <p className="text-center text-cyan-300 text-sm font-medium font-inter">
                Get another code in {timer} seconds
              </p>
            </div>

            {/* Keep Signed In */}
            <div className="mb-5">
              <label className="flex items-start gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => onKeepSignedInChange(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-cyan-400 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-white font-semibold text-base mb-1 font-inter">Keep me signed in</div>
                  <div className="text-white text-sm font-inter">
                    Uncheck if using a public device.{' '}
                    <span className="text-cyan-300 font-medium cursor-pointer">More</span>
                  </div>
                </div>
              </label>
            </div>

            {/* Next Button */}
            <button
              onClick={onNext}
              className="w-full bg-white text-gray-900 text-sm font-semibold py-2 rounded-full shadow-lg mb-4 font-inter"
            >
              Next
            </button>

            {/* Alternative Link */}
            <div className="text-center text-white text-sm font-inter pb-8">
              Code not working?{' '}
              <span className="text-cyan-300 font-medium cursor-pointer">Try another way</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;