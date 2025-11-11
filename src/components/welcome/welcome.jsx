import React from 'react';
import './welcome.css';

const Welcome = ({ onNext }) => {
  return (
    <div className="fixed-layout-container bg-gradient-to-b from-blue-200 via-blue-300 to-blue-500 flex items-center justify-center bg-gray-100">
      <div className="w-full h-full min-h-screen relative overflow-hidden flex flex-col">
        {/* Image */}
        <div className="flex items-center justify-center mt-8 px-6">
          <div className="w-full relative">
            <img 
              src="/images/immi-image2.png" 
              alt="ImmiHub"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Welcome Content */}
        <div className="absolute left-0 right-0 bottom-0 px-8 pb-8">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-medium text-white mb-2 font-poppins">Welcome <br/>to Immihub</h1>
            
            <p className="text-white text-1xl leading-relaxed font-inter">
              Stay Informed, Stay Compliant –<br />
              Track Your Immigration Journey!
            </p>
          </div>

          {/* Join Button */}
          <button
            onClick={onNext}
            className="w-full bg-white text-gray-900 text-md font-semibold py-2.5 rounded-full shadow-lg mb-6 font-inter"
          >
            Join now
          </button>

          {/* Login Link */}
          <div className="text-center text-white text-sm font-inter">
            Already have an account?{' '}
            <span className="text-cyan-300 font-medium cursor-pointer">Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

