// components/privacy-section.tsx
import React from 'react';

export function PrivacySection() {
  return (
    <div className="mt-12 text-center bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Your Data, Your Privacy
      </h2>
      <div className="flex justify-center space-x-8 text-gray-600">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          End-to-End Encryption
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.979 6.708-5.137 8.268A9.97 9.97 0 0012 20a9.97 9.97 0 005.137-1.732C13.979 17.708 12 14.517 12 11z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V3a9 9 0 00-9 9h6a3 3 0 013 3v3a3 3 0 01-3 3h-3a3 3 0 01-3-3" />
          </svg>
          Advanced Machine Learning
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          24/7 Data Protection
        </div>
      </div>
    </div>
  );
}