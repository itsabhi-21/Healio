import FeatureItem from "./FeatureItem";

export default function SignupLeft() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-blue-50 to-indigo-100 px-16 py-16">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          ❤
        </div>
        <span className="text-xl font-semibold">Healio</span>
      </div>

      {/* Main Text */}
      <div className="mt-20">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Your personal AI health assistant.
        </h1>

        <p className="mt-6 text-blue-600 max-w-md">
          Join thousands of users taking control of their health journey with secure, intelligent insights.
        </p>

        {/* Features */}
        <div className="mt-14 space-y-10">
          <FeatureItem
            title="Encrypted & Private"
            desc="Your data is encrypted end-to-end. We never share your personal health details."
          />

          <FeatureItem
            title="Symptom History"
            desc="Keep track of your symptoms over time to spot trends and patterns easily."
          />

          <FeatureItem
            title="Clinician Ready"
            desc="Generate summaries instantly to share with your doctor during visits."
          />
        </div>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500">© 2024 Healio AI Inc.</p>
    </div>
  );
}