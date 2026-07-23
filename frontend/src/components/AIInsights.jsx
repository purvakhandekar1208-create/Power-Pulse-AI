import { FaRobot, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const tagStyles = {
  high: { wrap: "bg-coral-soft text-coral", icon: <FaExclamationTriangle /> },
  warn: { wrap: "bg-amber-soft text-amber", icon: <FaExclamationTriangle /> },
  info: { wrap: "bg-teal-soft text-teal", icon: <FaInfoCircle /> },
  good: { wrap: "bg-teal-soft text-teal", icon: <FaCheckCircle /> },
};

function AIInsights({ explanation, trendPercent, predictedBill, weatherTemp, faultAlert }) {
  const insights = [
    {
      text: explanation,
      tag: trendPercent > 3 ? "high" : trendPercent < -3 ? "good" : "warn",
    },
    faultAlert && {
      text: `${faultAlert.appliance} usage ${faultAlert.percent}% above normal — possible fault.`,
      tag: "high",
    },
    weatherTemp > 30 && {
      text: `High outdoor temperature detected (${weatherTemp}°C)`,
      tag: "warn",
    },
    {
      text: `Predicted next bill: ₹${predictedBill.toLocaleString("en-IN")}`,
      tag: "info",
    },
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-navy p-6 card-lift">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center text-amber text-lg">
          <FaRobot />
        </div>
        <h2 className="font-display text-xl font-semibold text-ink">AI Analysis</h2>
      </div>

      <ul className="space-y-3">
        {insights.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-base">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${tagStyles[item.tag].wrap}`}>
              {tagStyles[item.tag].icon}
            </span>
            <span className="text-ink">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AIInsights;
