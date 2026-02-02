import React from 'react';
import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Symptom Checker",
      description: "Describe your symptoms in natural language and get instant AI-powered analysis to understand what might be happening.",
      buttonText: "Try it now",
      buttonColor: "blue",
      bgColor: "bg-blue-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Condition Insights",
      description: "Understand possible health conditions with detailed, easy-to-understand explanations powered by medical knowledge.",
      buttonText: "Learn more",
      buttonColor: "purple",
      bgColor: "bg-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Next Steps Guidance",
      description: "Get personalized recommendations on when to seek professional medical care and what to discuss with your doctor.",
      buttonText: "Get guidance",
      buttonColor: "green",
      bgColor: "bg-green-600"
    }
  ];

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How Healio Helps You</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced AI technology to understand your symptoms and provide valuable health insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}