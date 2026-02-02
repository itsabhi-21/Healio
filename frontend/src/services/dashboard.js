import apiService from './api';

class DashboardService {
  // Get dashboard overview data
  async getOverview() {
    try {
      return await apiService.get('/dashboard/overview');
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch dashboard overview');
    }
  }

  // Get health statistics
  async getHealthStats(period = '30') {
    try {
      return await apiService.get(`/dashboard/stats?period=${period}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch health statistics');
    }
  }
}

// Create singleton instance
const dashboardService = new DashboardService();

export default dashboardService;