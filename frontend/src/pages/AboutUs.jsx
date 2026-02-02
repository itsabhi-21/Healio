import Footer from '../components/common/Footer';

export default function About() {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              About <span className="text-blue-600">Healio</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Healio is an AI-powered health assistant built to help people understand their symptoms, make informed decisions, and take better control of their health — anytime, anywhere.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                Try Symptom Checker
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Illustration Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
            <p className="mt-4 text-gray-600">
              To make healthcare more accessible, understandable, and proactive by combining modern AI technology with trusted medical knowledge.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-6 text-center">
              <div>
                <h2 className="text-3xl font-bold text-blue-600">50K+</h2>
                <p className="text-sm text-gray-500">Users Helped</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-600">98%</h2>
                <p className="text-sm text-gray-500">Satisfaction</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
                <p className="text-sm text-gray-500">Available</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900">Our Core Values</h2>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Everything we build at Healio is guided by these principles
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-10">

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl">🛡️</div>
              <h3 className="mt-6 text-xl font-semibold">Privacy First</h3>
              <p className="mt-3 text-gray-600">
                Your health data is always encrypted and never shared with third parties without consent.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xl">🧠</div>
              <h3 className="mt-6 text-xl font-semibold">AI with Care</h3>
              <p className="mt-3 text-gray-600">
                We use advanced AI models trained on trusted medical knowledge for reliable insights.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">❤️</div>
              <h3 className="mt-6 text-xl font-semibold">Human-Centered</h3>
              <p className="mt-3 text-gray-600">
                Technology should support people, not replace doctors — we guide, not diagnose.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* How Healio Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900">How Healio Works</h2>

          <div className="mt-14 grid md:grid-cols-3 gap-12">

            <div className="text-center">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">1</div>
              <h3 className="mt-6 text-xl font-semibold">Describe Symptoms</h3>
              <p className="mt-3 text-gray-600">
                Enter your symptoms in natural language just like you would tell a doctor.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">2</div>
              <h3 className="mt-6 text-xl font-semibold">AI Analysis</h3>
              <p className="mt-3 text-gray-600">
                Our AI analyzes your symptoms against a vast medical knowledge base.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-600 text-white text-xl font-bold">3</div>
              <h3 className="mt-6 text-xl font-semibold">Get Guidance</h3>
              <p className="mt-3 text-gray-600">
                Receive clear insights and recommended next steps for your health.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Trust & Disclaimer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Medical Responsibility</h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Healio does not provide medical diagnoses. All insights are for informational purposes only and should not replace professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
          </p>

          <div className="mt-10 flex justify-center gap-10 flex-wrap">
            <div className="flex items-center gap-2 text-green-600 font-medium">🔒 Encrypted Data</div>
            <div className="flex items-center gap-2 text-blue-600 font-medium">🩺 Doctor Recommended</div>
            <div className="flex items-center gap-2 text-purple-600 font-medium">⚡ Real-time AI</div>
          </div>
        </div>
      </section>


      {/* Call To Action */}
      <section className="bg-linear-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold">Ready to Take Control of Your Health?</h2>
          <p className="mt-4 text-blue-100">
            Start your symptom check today and get AI-powered insights in minutes.
          </p>

          <button className="mt-8 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition">
            Start Symptom Check →
          </button>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
