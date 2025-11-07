import React from 'react';
import './signup.css';

const Signup = ({ formData, onInputChange, onNext, onBack }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
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
      <div className="w-full max-w-[380px] min-h-screen flex flex-col">
        {/* Image */}
        <div className="px-6 mt-4 mb-3 flex-shrink-0">
          <div className="w-85 h-55 relative flex items-center justify-center">
            <img 
              src="/images/immi-image2.png" 
              alt="ImmiHub"
              className="w-full h-auto rounded-lg object-cover"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Spacer to push form to bottom */}
        <div className="flex-1"></div>

        {/* Signup Form - Fixed to bottom */}
        <div className="flex-shrink-0">
          <div className="bg-blue-400 px-6 py-2 shadow-xl">
            <h2 className="text-1.5xl font-semibold text-white text-center mb-2 font-poppins">Signup Form</h2>

            {/* Phone Number */}
            <div className="mb-4 relative">
              <label className="absolute left-5 -top-2.5 bg-blue-400 px-2 text-white text-sm font-medium font-inter">
                Phone No
              </label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={onInputChange}
                className="w-full bg-transparent border-1 border-white rounded-full px-5 py-1.5 text-white placeholder-white/70 focus:outline-none focus:border-white font-inter"
              />
            </div>

            {/* Email ID */}
            <div className="mb-4 relative">
              <label className="absolute left-5 -top-2.5 bg-blue-400 px-2 text-white text-sm font-medium font-inter">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                className="w-full bg-transparent border-1 border-white rounded-full px-5 py-1.5 text-white placeholder-white/70 focus:outline-none focus:border-white font-inter"
              />
            </div>

            {/* Full Name */}
            <div className="mb-4 relative">
              <label className="absolute left-5 -top-2.5 bg-blue-400 px-2 text-white text-sm font-medium font-inter">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onInputChange}
                className="w-full bg-transparent border-1 border-white rounded-full px-5 py-1.5 text-white placeholder-white/70 focus:outline-none focus:border-white font-inter"
              />
            </div>

            {/* Visa Status */}
            <div className="mb-4 relative">
              <label className="absolute left-5 -top-2.5 bg-blue-400 px-2 text-white text-sm font-medium font-inter z-10">
                Visa Status
              </label>
              <div className="relative">
                <select
                  name="visaStatus"
                  value={formData.visaStatus}
                  onChange={onInputChange}
                  className="w-full bg-transparent border-1 border-white rounded-full px-5 py-1.5 text-white focus:outline-none focus:border-white appearance-none cursor-pointer pr-10 font-inter"
                >
                  <option value="F1 Visa - Pursuing Masters (or F1 Visa - OPT)" className="text-gray-800">
                    F1 Visa - Pursuing Masters (or F1 Visa - OPT)
                  </option>
                  <option value="H1B Visa" className="text-gray-800">H1B Visa</option>
                  <option value="L1 Visa" className="text-gray-800">L1 Visa</option>
                  <option value="Green Card" className="text-gray-800">Green Card</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={onNext}
              className="w-full bg-white text-gray-900 text-sm font-semibold py-2 rounded-full shadow-lg mb-5 mt-3 font-inter"
            >
              Next
            </button>

            {/* Login Link */}
            <div className="text-center text-white text-sm font-inter">
              Already have an account?{' '}
              <span className="text-cyan-300 font-medium cursor-pointer">Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;