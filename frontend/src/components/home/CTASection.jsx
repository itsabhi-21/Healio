import React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Understand Your Health?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Start your symptom check today and get AI-powered insights in minutes. It's free, private, and available 24/7.
        </p>
        
        <Link className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-3 mx-auto mb-6"
        to="/symptomsanalyse"
        >
          Start Your Symptom Check
        </Link>
        
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Your data is encrypted and never shared with third parties
        </div>
      </div>
    </div>
  );
}