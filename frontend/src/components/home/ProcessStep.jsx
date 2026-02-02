import React from 'react';

export default function ProcessStep({ number, title, description, color }) {
  const colorClasses = {
    blue: "bg-blue-600",
    purple: "bg-purple-600", 
    green: "bg-green-600"
  };

  return (
    <div className="text-center space-y-6">
      <div className={`w-16 h-16 ${colorClasses[color]} rounded-full flex items-center justify-center mx-auto`}>
        <span className="text-2xl font-bold text-white">{number}</span>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}