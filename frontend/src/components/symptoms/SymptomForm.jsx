import SeveritySelector from "./SeveritySelector";


export default function SymptomForm() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-8">
            <div>
                <div className="flex justify-between items-center mb-2">
                <label className="font-semibold text-gray-800">Symptoms and concerns</label>
                <span className="text-sm text-gray-400">0 / 600 characters</span>
                </div>
                <textarea
                rows="6"
                placeholder='Example: "For the last 3 days I’ve had a sore throat, mild fever around 38°C, and feel very tired."'
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Quick details</p>
                <div className="flex flex-wrap gap-3">
                {['Fever', 'Headache', 'Cough', 'Shortness of breath', 'Nausea'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-slate-100 rounded-full text-sm cursor-pointer hover:bg-blue-100">
                {tag}
                </span>
                ))}
                </div>
            </div>

            <div className="mt-8">
                <p className="text-sm font-medium text-gray-700 mb-3">Symptom severity (overall)</p>
                <SeveritySelector />
            </div>

            <div className="mt-8 flex items-center justify-between gap-6">
                <p className="text-xs text-gray-500 max-w-md">
                Healio provides educational information only and does not diagnose or treat conditions. For emergencies, contact local emergency services.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                Analyze symptoms →
                </button>
            </div>
        </div>
    );
}