import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

function AlertCard({ faultAlert }) {
  if (!faultAlert) {
    return (
      <div className="bg-teal-soft border border-teal/30 rounded-xl p-6 flex items-center gap-4 card-lift">
        <div className="w-11 h-11 rounded-lg bg-teal flex items-center justify-center text-white text-lg shrink-0">
          <FaCheckCircle />
        </div>
        <div>
          <p className="font-display font-semibold text-ink text-lg">All Clear</p>
          <p className="text-sm text-ink/80">No unusual appliance activity detected this month.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-coral text-white rounded-xl p-6 flex items-center gap-4 card-lift">
      <div className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center text-white text-lg shrink-0">
        <FaExclamationTriangle />
      </div>
      <div>
        <p className="font-display font-semibold text-lg">Alert</p>
        <p className="text-sm text-white/90">
          {faultAlert.appliance} usage {faultAlert.percent}% above normal — possible fault.
        </p>
      </div>
    </div>
  );
}

export default AlertCard;
