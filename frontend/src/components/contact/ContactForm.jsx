import React from 'react';

export default function ContactFormSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Card */}
        <div className="bg-slate-900 rounded-3xl p-10 md:p-14 grid md:grid-cols-2 gap-12 items-center shadow-xl">

          {/* LEFT SIDE – INFO */}
          <div className="text-white">
            <p className="text-blue-400 font-semibold mb-4">Support</p>
            <h2 className="text-4xl font-bold leading-tight">
              Get in touch with our team
            </h2>
            <p className="mt-6 text-slate-300 max-w-md">
              Have questions about Healio? Need technical support or have business inquiries? We’re here to help you.
            </p>

            {/* Contact Info */}
            <div className="mt-10 space-y-6">

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">📧</div>
                <div>
                  <p className="text-slate-400 text-sm">Email us</p>
                  <p className="font-semibold">hello@healio.ai</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">📍</div>
                <div>
                  <p className="text-slate-400 text-sm">Visit us</p>
                  <p className="font-semibold">123 Innovation Dr, Tech City</p>
                </div>
              </div>

            </div>
          </div>


          {/* RIGHT SIDE – FORM */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
            <form className="space-y-6">

              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows="5"
                  placeholder="How can we help you?"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
