export default function HowCTA() {
  return (
    <section className="bg-linear-to-br from-blue-50 to-white w-full py-24 border-t">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-gray-900">
          Ready to check your symptoms?
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          It takes less than 2 minutes to get clear educational insights about your health.
        </p>

        <button className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
          Start Symptom Checker
        </button>

        {/* Footer strip */}
        <div className="mt-24 pt-6 border-t flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© 2024 Healio. For informational purposes only.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
          </div>
        </div>

      </div>
    </section>
  );
}
