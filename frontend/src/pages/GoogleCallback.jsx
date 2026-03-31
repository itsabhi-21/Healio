import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const redirect = searchParams.get("redirect") || "/dashboard";

    if (!token) {
      setError("Authentication failed. No token received.");
      setLoading(false);
      return;
    }

    try {
      // Store token in localStorage
      localStorage.setItem("token", token);

      // Decode token to get user info
      const decoded = JSON.parse(atob(token.split(".")[1]));

      // Store in context if needed
      if (setUser) {
        setUser({ id: decoded.userId });
      }

      // Redirect to intended destination
      navigate(redirect, { replace: true });
    } catch (err) {
      console.error("Error processing callback:", err);
      setError("Failed to process authentication. Please try again.");
      setLoading(false);
    }
  }, [searchParams, navigate, setUser]);

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
      <div className="text-center">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
