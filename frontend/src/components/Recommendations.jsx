import { FaLightbulb, FaCheckCircle } from "react-icons/fa";

const tips = [
  "Set AC to 25°C for optimal savings",
  "Shift laundry to off-peak hours to save an estimated ₹180/month",
  "Switch to LED bulbs where possible",
  "Avoid running heavy appliances at peak hours",
  "Service your refrigerator this month",
];

function Recommendations() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-teal p-6 card-lift">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-teal-soft flex items-center justify-center text-teal text-lg">
          <FaLightbulb />
        </div>
        <h2 className="font-display text-xl font-semibold text-ink">Recommendations</h2>
      </div>

      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-base text-ink">
            <FaCheckCircle className="text-teal mt-0.5 shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
