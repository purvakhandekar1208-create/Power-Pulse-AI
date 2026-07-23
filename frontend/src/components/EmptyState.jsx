import { Link } from "react-router-dom";

function EmptyState({ icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full bg-amber-soft flex items-center justify-center text-amber text-2xl mb-4">
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-ink mb-1">{title}</h3>
      <p className="text-slate text-sm mb-6 max-w-sm">{message}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="bg-amber text-navy font-display font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
