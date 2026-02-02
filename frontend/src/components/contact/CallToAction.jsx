import React from 'react';

export default function ContactHero() {
    return(
        <section className="bg-linear-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold">Still Have Questions?</h2>
          <p className="mt-4 text-blue-100">
            Start your symptom check or reach out to our team — we’re here for you.
          </p>

          <button className="mt-8 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition">
            Start Symptom Check →
          </button>
        </div>
      </section>
    )
}