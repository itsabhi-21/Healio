import React from 'react';

export default function ContactHero() {
  return (
    <section className="bg-linear-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Contact <span className="text-blue-600">Healio</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or need support? We’re here to help you on your health journey.
          </p>
        </div>
      </section>
  );
}