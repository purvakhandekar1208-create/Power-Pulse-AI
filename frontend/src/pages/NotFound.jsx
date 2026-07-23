import { Link } from "react-router-dom";
import { FaBolt } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 text-center">
      <FaBolt className="text-amber text-4xl bolt-pulse mb-4" />
      <h1 className="font-display text-3xl font-bold text-white mb-2">404</h1>
      <p className="text-gray-300 mb-6">This page doesn't exist — the circuit's broken here.</p>
      <Link
        to="/"
        className="bg-amber text-navy font-display font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
