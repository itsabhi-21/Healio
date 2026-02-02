import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopCard from '../components/dashboard/TopCard';
import SymptomSection from '../components/dashboard/SymptomSection';
import Safety from '../components/dashboard/Safety';
import dashboardService from '../services/dashboard';

export default function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getOverview();
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout 
        userName={user?.firstName || 'User'}
        subtitle="Loading your health overview..."
        showNewCheckButton={true}
      >
        <div className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout 
        userName={user?.firstName || 'User'}
        subtitle="Error loading dashboard"
        showNewCheckButton={true}
      >
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Unable to load dashboard</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      userName={user?.firstName || 'User'}
      subtitle="Here's a quick overview of your health check-ins and safety alerts."
      showNewCheckButton={true}
    >
      <div className="p-8 space-y-8">
        <TopCard dashboardData={dashboardData} />
        
        {/* Symptom Checker Section */}
        <SymptomSection dashboardData={dashboardData} />

        {/* Red Flags & Safety */}
        <Safety dashboardData={dashboardData} />
      </div>
    </DashboardLayout>
  );
}
