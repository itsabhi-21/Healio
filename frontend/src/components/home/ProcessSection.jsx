import React from 'react';
import ProcessStep from './ProcessStep';

export default function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Describe Symptoms",
      description: "Tell Healio about your symptoms in your own words. Our AI understands natural language and medical terminology.",
      color: "blue"
    },
    {
      number: "2", 
      title: "AI Analysis",
      description: "Advanced algorithms analyze your symptoms against a vast medical knowledge base to identify possible conditions.",
      color: "purple"
    },
    {
      number: "3",
      title: "Get Insights",
      description: "Receive clear explanations, possible conditions, and guidance on next steps for your health journey.",
      color: "green"
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple. Fast. Accurate.</h2>
          <p className="text-xl text-gray-600">
            Get health insights in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ProcessStep key={index} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}