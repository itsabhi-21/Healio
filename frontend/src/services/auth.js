import apiService from './api';

class AuthService {
  // Register new user
  async signup(userData) {
    try {
      const response = await apiService.post('/auth/signup', userData, { auth: false });
      
      if (response.token) {
        apiService.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials, { auth: false });
      
      if (response.token) {
        apiService.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  // Logout user
  logout() {
    apiService.removeAuthToken();
    // Clear any other user data from localStorage
    localStorage.removeItem('healio_user');
  }

  // Get current user profile
  async getProfile() {
    try {
      return await apiService.get('/auth/profile');
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch profile');
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      return await apiService.put('/auth/profile', profileData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!apiService.getAuthToken();
  }

  // Get stored user data
  getCurrentUser() {
    const userData = localStorage.getItem('healio_user');
    return userData ? JSON.parse(userData) : null;
  }

  // Store user data
  setCurrentUser(user) {
    localStorage.setItem('healio_user', JSON.stringify(user));
  }

  // Clear user data
  clearCurrentUser() {
    localStorage.removeItem('healio_user');
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;