import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import authService from '../services/auth';

// Handles the redirect from Google OAuth callback
// URL format: /auth/callback?token=JWT&redirect=/dashboard
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const redirect = params.get('redirect') || '/dashboard';

    if (!token) {
      navigate('/login?error=google_failed', { replace: true });
      return;
    }

    // Store token (same key as email login)
    apiService.setAuthToken(token);

    // Fetch user profile and store it
    authService.getProfile()
      .then(res => {
        authService.setCurrentUser(res.user);
        navigate(redirect, { replace: true });
      })
      .catch(() => {
        // Token invalid — clear and send back to login
        apiService.removeAuthToken();
        navigate('/login?error=google_failed', { replace: true });
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 text-sm">Signing you in...</p>
      </div>
    </div>
  );
}
