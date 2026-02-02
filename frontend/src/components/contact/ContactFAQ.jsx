import {React, useState } from "react";

const faqs = [
  {
    question: "Is Healio a replacement for doctors?",
    answer:
      "No. Healio provides informational insights only and does not replace professional medical consultation. Always consult a qualified healthcare provider for diagnosis and treatment.",
  },
  {
    question: "Is my health data secure?",
    answer:
      "Yes. All your data is encrypted using industry‑standard security practices and is never shared with third parties without your consent.",
  },
  {
    question: "How fast do you respond to support requests?",
    answer:
      "Our support team usually replies within 24 hours on business days. Urgent technical issues are prioritized.",
  },
  {
    question: "Can I use Healio for free?",
    answer:
      "Yes. Healio offers a free symptom checker with optional premium features planned for advanced insights in the future.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600">
            Quick answers to common questions about Healio and our support
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-12 space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-gray-800 hover:bg-gray-50 transition"
              >
                <span>{item.question}</span>
                <span className={`text-blue-600 transform transition ${openIndex === index ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
