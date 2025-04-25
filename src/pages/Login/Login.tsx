// src/pages/Login/Login.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Network,
  Mail,
  Lock,
  User,
  ChevronRight,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Use the auth context
  const { login, signup } = useAuth();

  // Animation on load
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Animation when switching between login and signup
  const handleSwitchMode = () => {
    setAnimate(false);
    setError("");

    // Reset form fields when switching
    if (isLogin) {
      setEmail("");
    }

    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimate(true);
    }, 200);
  };

  const validateForm = () => {
    if (!username || !password) {
      setError("Please fill in all required fields");
      return false;
    }

    if (!isLogin) {
      if (!email) {
        setError("Email is required");
        return false;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return false;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
        navigate("/home");
      } else {
        await signup(username, email, password);
        navigate("/home");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Gradient background */}
      <div className="gradient-bg"></div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-300px] right-[-300px] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-secondary-600/10 to-primary-700/10 blur-3xl"></div>
        <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary-700/10 to-secondary-600/10 blur-3xl"></div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative">
        <Link
          to="/"
          className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>

        <div
          className={`glass-card-dark border border-white/10 p-8 rounded-2xl w-full max-w-md transition-all duration-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center mb-8">
            <Network className="text-secondary-500" size={36} />
          </div>

          <h1 className="text-2xl font-bold mb-2 text-center text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-white/60 text-center mb-8">
            {isLogin
              ? "Sign in to continue to Knowledge Graph"
              : "Join the Knowledge Graph community"}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-200 text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-white/70 text-sm mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-white/50"
                  size={18}
                />
                <input
                  id="username"
                  type="text"
                  className="w-full bg-dark-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-600/30 transition-all"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="animate-fade-in">
                <label
                  htmlFor="email"
                  className="block text-white/70 text-sm mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-white/50"
                    size={18}
                  />
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-dark-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-600/30 transition-all"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-white/70 text-sm mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-white/50"
                  size={18}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-dark-800/50 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-600/30 transition-all"
                  placeholder={
                    isLogin ? "Enter your password" : "Create a password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-white/50 hover:text-white/80 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-white/40 text-xs mt-1">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="animate-fade-in">
                <label
                  htmlFor="confirmPassword"
                  className="block text-white/70 text-sm mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-white/50"
                    size={18}
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full bg-dark-800/50 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-600/30 transition-all"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-white/50 hover:text-white/80 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-secondary-600 to-primary-700 text-white py-3 px-4 rounded-lg font-medium mt-6 hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              ) : (
                <></>
              )}
              {loading
                ? "Processing..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
              <ChevronRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-white/50">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={handleSwitchMode}
                className="text-secondary-400 hover:text-secondary-300 ml-2 transition-colors focus:outline-none"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <button className="text-secondary-400 hover:text-secondary-300 text-sm transition-colors focus:outline-none">
                Forgot password?
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Brand Side - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-primary-900 relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-[20%] left-[20%] w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-[30%] right-[15%] w-40 h-40 bg-white/5 rounded-full blur-xl"></div>

        {/* Brand content */}
        <div className="flex flex-col justify-center items-center px-16 w-full relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <Network className="text-white" size={40} />
            <span className="text-2xl font-bold text-white">
              KnowledgeGraph
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">
            Discover the power of connected knowledge
          </h2>

          <p className="text-white/80 text-lg mb-8 text-center">
            Connect ideas, discover insights, and visualize relationships in
            your knowledge base like never before.
          </p>

          {/* Feature list */}
          <div className="space-y-4 mb-12">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-white/10 flex-shrink-0 mt-0.5">
                <div className="p-0.5 rounded-full bg-secondary-500">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-white/80">
                Interactive knowledge graph visualization
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-white/10 flex-shrink-0 mt-0.5">
                <div className="p-0.5 rounded-full bg-secondary-500">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-white/80">
                AI-powered semantic connections
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-white/10 flex-shrink-0 mt-0.5">
                <div className="p-0.5 rounded-full bg-secondary-500">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-white/80">
                Collaborative knowledge sharing
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="text-center">
            <p className="text-white/60 uppercase tracking-wider text-sm mb-3">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {["Company A", "Company B", "Company C"].map((company, index) => (
                <div key={index} className="text-white/40 font-medium">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
