import React from 'react';
import DashboardPreview from './DashboardPreview';
import SymptomsAnalyse from '../../pages/SymptomsAnalyse';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3"/>
              </svg>
            </div>
            AI-Powered Health Assistant
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health,
              <br />
              <span className="text-blue-600">Understood</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Check your symptoms and understand possible health conditions with AI-powered insights. Healio helps you make informed decisions about your health.
            </p>
          </div>

          {/* Warning Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-orange-800">Important:</span>
              <span className="text-orange-700"> Healio does not diagnose medical conditions. Always consult with healthcare professionals for medical advice.</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/symptomsanalyse" 
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
              Start Symptom Check</Link>
            
            <Link className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
            to="/about">
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium">100% Private</span>
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium">Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium">24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Right Content - Dashboard Preview */}
        <DashboardPreview />
      </div>
    </div>
  );
}