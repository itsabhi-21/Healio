import React from 'react';

export default function FeatureCard({ icon, title, description, buttonText, buttonColor, bgColor }) {
  const colorClasses = {
    blue: "text-blue-600 hover:text-blue-700",
    purple: "text-purple-600 hover:text-purple-700",
    green: "text-green-600 hover:text-green-700"
  };

  return (
    <div className="text-center space-y-6">
      <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      <button className={`${colorClasses[buttonColor]} font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto`}>
        {buttonText}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}