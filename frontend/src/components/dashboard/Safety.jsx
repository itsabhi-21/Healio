export default function Safety({ dashboardData }) {
  const healthSummary = dashboardData?.healthSummary || {};
  const hasUrgentIssues = healthSummary.urgentIssues > 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Red flags & safety</h2>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          hasUrgentIssues 
            ? 'bg-red-100 text-red-800' 
            : 'bg-orange-100 text-orange-800'
        }`}>
          {hasUrgentIssues ? '⚠️ Attention needed' : '🚨 Emergency info'}
        </span>
      </div>
      
      {hasUrgentIssues && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-medium">
            You have {healthSummary.urgentIssues} recent symptom check{healthSummary.urgentIssues > 1 ? 's' : ''} that may require medical attention.
          </p>
          <button className="mt-2 text-sm text-red-700 hover:text-red-900 underline">
            Review urgent items →
          </button>
        </div>
      )}
      
      <p className="text-sm text-gray-600 mb-4">If any of these happen, seek urgent medical care.</p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <ul className="space-y-2 text-sm text-red-800">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            Chest pain or pressure that doesn't go away.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            Severe breathing difficulty or blue lips/face.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            High fever (39°C / 102°F) for more than 3 days.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            Sudden confusion, slurred speech, or weakness on one side.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            Severe bleeding that won't stop.
          </li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm font-medium text-blue-900">Emergency Contacts</span>
        </div>
        <div className="text-sm text-blue-800">
          <p>Emergency Services: <span className="font-medium">911</span></p>
          <p>Poison Control: <span className="font-medium">1-800-222-1222</span></p>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-4">
        Healio is an information tool only and cannot replace professional medical care. In an emergency, contact your local emergency number immediately.
      </p>
    </div>
  );
}