import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// ─── Reusable UI components ───────────────────────────────────────────────────

function InputField({ label, id, extra, ...props }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {extra}
      </div>
      <input
        id={id}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition"
        {...props}
      />
    </div>
  );
}

function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
      <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
      </svg>
      <p className="text-red-700 text-sm">{message}</p>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate({ email, password }) {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return null;
}

function friendlyError(raw) {
  const msg = raw?.toLowerCase() || "";
  if (msg.includes("invalid") || msg.includes("credentials") || msg.includes("password") || msg.includes("email"))
    return "Invalid email or password.";
  if (msg.includes("network") || msg.includes("fetch"))
    return "Network error. Please check your connection.";
  if (msg.includes("too many") || msg.includes("rate"))
    return "Too many attempts. Please wait a moment.";
  return "Something went wrong. Please try again.";
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(friendlyError(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError("");
    setIsGoogleLoading(true);
    // Store intended destination so Google callback can redirect correctly
    sessionStorage.setItem("login_redirect", from);
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
  };

  const isDisabled = isLoading || isGoogleLoading;

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="w-full max-w-md px-8 py-10">

        {/* Top right link */}
        <div className="absolute top-6 right-8 text-sm text-gray-600">
          New to Healio?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Create account
          </Link>
        </div>

        {/* Secure badge */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1 rounded-full bg-gray-100 text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Login
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 text-center">Welcome back</h2>
        <p className="text-gray-500 text-center mt-2 mb-6">
          Enter your credentials to access your account.
        </p>

        {/* Error */}
        <ErrorMessage message={error} />

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isDisabled}
          className="mt-4 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500" />
              Redirecting...
            </>
          ) : (
            <>
              {/* Google SVG icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <Divider label="OR" />

        {/* Email / Password Form */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <InputField
            label="Email address"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            disabled={isDisabled}
            autoComplete="email"
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            disabled={isDisabled}
            autoComplete="current-password"
            extra={
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            }
          />

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
        </p>

      </div>
    </div>
  );
}
