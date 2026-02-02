import { useNavigate } from 'react-router-dom';

export default function SymptomSection({ dashboardData }) {
  const navigate = useNavigate();
  const recentSessions = dashboardData?.recentSessions || [];
  const lastSession = recentSessions[0];

  const handleCheckSymptoms = () => {
    navigate('/dashboard/symptom-checker');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Symptom checker</h2>
        <span className="text-sm text-gray-500">
          {lastSession ? `Last check: ${lastSession.condition}` : 'No recent checks'}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Describe how you feel and get a possible condition and next steps.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
          <textarea
            placeholder="Tap to describe your current symptoms..."
            className="w-full p-4 border border-gray-200 rounded-lg resize-none h-24 text-sm cursor-pointer"
            defaultValue="e.g. fever, dry cough, body ache"
            onClick={handleCheckSymptoms}
            readOnly
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <select 
              className="w-full p-3 border border-gray-200 rounded-lg text-sm cursor-pointer"
              onClick={handleCheckSymptoms}
            >
              <option>2 days</option>
              <option>1 day</option>
              <option>3-5 days</option>
              <option>1 week</option>
              <option>More than 1 week</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select 
              className="w-full p-3 border border-gray-200 rounded-lg text-sm cursor-pointer"
              onClick={handleCheckSymptoms}
            >
              <option>Moderate</option>
              <option>Mild</option>
              <option>Severe</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-4">
            <span className="font-medium">Important:</span> This tool does not provide a medical diagnosis.
          </p>
          <button 
            onClick={handleCheckSymptoms}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Check symptoms
          </button>
        </div>
      </div>

      {/* What Healio will show */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">What Healio will show</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Possible <span className="font-medium">condition</span> with confidence level.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Suggested <span className="font-medium">questions</span> for your doctor.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Clear <span className="font-medium">red-flag warnings</span> if urgent care is recommended.
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">Not a diagnosis</p>
      </div>
    </div>
  );
}