import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiService from "../services/api";
import authService from "../services/auth";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get("token");
        const redirect = searchParams.get("redirect") || "/dashboard";

        if (!token) {
          setError("Authentication failed. No token received.");
          setLoading(false);
          return;
        }

        console.log("✅ Token received from backend");

        // Store token with correct key used throughout the app
        apiService.setAuthToken(token);
        console.log("✅ Token stored in localStorage");

        // Fetch user profile from backend
        const profileResponse = await authService.getProfile();
        console.log("✅ User profile fetched:", profileResponse.user);

        // Store full user data
        authService.setCurrentUser(profileResponse.user);
        console.log("✅ User data stored");

        // Redirect to intended destination
        console.log("✅ Redirecting to:", redirect);
        navigate(redirect, { replace: true });
      } catch (err) {
        console.error("❌ Error in Google callback:", err);
        setError(err.message || "Failed to process authentication");
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Completing your sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md w-full mx-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-semibold mb-2">Authentication Failed</p>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
