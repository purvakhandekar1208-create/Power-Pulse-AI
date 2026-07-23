import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBolt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real API call once backend auth is ready
    login({ name: email.split("@")[0] || "Ayan Sharma", email });
    showToast("Logged in successfully", "success");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaBolt className="text-amber text-2xl bolt-pulse" />
          <h1 className="font-display font-bold text-xl text-ink">PowerPulse</h1>
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink mb-1">Welcome back</h2>
        <p className="text-slate text-sm mb-6">Log in to see your electricity insights.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-ink block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-amber text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-1.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-amber text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber text-navy font-display font-semibold py-2.5 rounded-lg hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-slate text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-amber font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
