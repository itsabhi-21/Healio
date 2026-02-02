import React from 'react';

export default function ContactHero() {
  return (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">📧</div>
            <h3 className="mt-6 text-xl font-semibold">Email Us</h3>
            <p className="mt-3 text-gray-600">support@healio.com</p>
            <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">📞</div>
            <h3 className="mt-6 text-xl font-semibold">Call Us</h3>
            <p className="mt-3 text-gray-600">+91 98765 43210</p>
            <p className="text-sm text-gray-500 mt-1">Mon – Fri, 9am – 6pm</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl">📍</div>
            <h3 className="mt-6 text-xl font-semibold">Visit Us</h3>
            <p className="mt-3 text-gray-600">New Delhi, India</p>
            <p className="text-sm text-gray-500 mt-1">By appointment only</p>
          </div>

        </div>
      </section>
  );
} 