import apiService from './api';

class SymptomsService {
  // Analyze symptoms
  async analyzeSymptoms(symptomData) {
    try {
      return await apiService.post('/ai/symptoms/analyze', symptomData);
    } catch (error) {
      throw new Error(error.message || 'Failed to analyze symptoms');
    }
  }

  // Get symptom session details
  async getSession(sessionId) {
    try {
      return await apiService.get(`/ai/symptoms/session/${sessionId}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch symptom session');
    }
  }

  // Submit feedback for a session
  async submitFeedback(sessionId, feedback) {
    try {
      return await apiService.post(`/ai/symptoms/session/${sessionId}/feedback`, feedback);
    } catch (error) {
      throw new Error(error.message || 'Failed to submit feedback');
    }
  }

  // Get user's symptom history
  async getHistory(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const endpoint = `/ai/symptoms/history${queryParams ? `?${queryParams}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch symptom history');
    }
  }

  // Get common symptoms for suggestions
  getCommonSymptoms() {
    return [
      'Headache',
      'Fever',
      'Cough',
      'Nausea',
      'Fatigue',
      'Sore Throat',
      'Dizziness',
      'Back Pain',
      'Stomach Pain',
      'Runny Nose',
      'Muscle Aches',
      'Shortness of Breath'
    ];
  }

  // Get severity options
  getSeverityOptions() {
    return [
      { value: 'Mild', label: 'Mild - Barely noticeable, doesn\'t interfere with daily activities' },
      { value: 'Moderate', label: 'Moderate - Noticeable but manageable, some interference with activities' },
      { value: 'Severe', label: 'Severe - Significant discomfort, major interference with daily activities' }
    ];
  }

  // Get duration options
  getDurationOptions() {
    return [
      { value: 'Less than 1 day', label: 'Less than 1 day' },
      { value: '1-2 days', label: '1-2 days' },
      { value: '3-5 days', label: '3-5 days' },
      { value: '1 week', label: '1 week' },
      { value: 'More than 1 week', label: 'More than 1 week' }
    ];
  }
}

// Create singleton instance
const symptomsService = new SymptomsService();

export default symptomsService;