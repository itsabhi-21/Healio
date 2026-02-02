export default function TopCard({ dashboardData }) {
  const healthSummary = dashboardData?.healthSummary || {};
  const recentSessions = dashboardData?.recentSessions || [];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'attention_needed':
        return 'bg-red-100 text-red-800';
      case 'no_urgent_issues':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'attention_needed':
        return 'Attention needed';
      case 'no_urgent_issues':
        return 'No urgent issues';
      default:
        return 'Status unknown';
    }
  };

  const formatLastUpdated = (date) => {
    if (!date) return 'No recent activity';
    
    const now = new Date();
    const lastUpdate = new Date(date);
    const diffInMinutes = Math.floor((now - lastUpdate) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Health Summary Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Health summary</h2>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(healthSummary.status)}`}>
            {getStatusText(healthSummary.status)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Last updated: {formatLastUpdated(healthSummary.lastUpdated)}
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          {recentSessions.length > 0 ? (
            <>
              <p className="text-sm text-gray-700 mb-2">
                Your recent checks show{' '}
                <span className="font-medium">
                  {recentSessions[0]?.condition || 'ongoing monitoring'}
                </span>{' '}
                {healthSummary.urgentIssues > 0 ? 'with some concerns requiring attention.' : 'with no red-flag patterns.'}
              </p>
              <div className="flex gap-4 text-xs text-gray-600">
                <span>Total sessions: {healthSummary.totalSessions || 0}</span>
                <span>Urgent issues: {healthSummary.urgentIssues || 0}</span>
                <span>Recent severity: {recentSessions[0]?.severity || 'Unknown'}</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-700">
              No recent health checks. Start by describing your symptoms to get personalized insights.
            </p>
          )}
        </div>
      </div>

      {/* Privacy & Safety Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Privacy & safety</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Private by design
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">You control your health information</p>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            Your checks are <span className="font-medium">end-to-end encrypted</span> and stored securely. You can delete them any time.
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <span>Local processing</span>
            <span>No ad sharing</span>
            <span>HIPAA compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}