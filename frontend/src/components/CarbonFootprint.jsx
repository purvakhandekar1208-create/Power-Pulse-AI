import { FaLeaf } from "react-icons/fa";
import CountUp from "./CountUp";

function CarbonFootprint({ kg, trendPercent }) {
  const isBelow = trendPercent <= 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-teal p-6 card-lift">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-teal-soft flex items-center justify-center text-teal text-lg shrink-0">
          <FaLeaf />
        </div>
        <h2 className="font-display text-xl font-semibold text-ink">Carbon Footprint</h2>
      </div>

      <div className="flex items-center justify-between">
        <p className="tabular text-3xl font-semibold text-ink">
          <CountUp end={kg} suffix=" kg CO₂" />
        </p>
        <p className={`text-sm font-medium whitespace-nowrap ${isBelow ? "text-teal" : "text-coral"}`}>
          {isBelow ? "▼" : "▲"} {Math.abs(trendPercent).toFixed(0)}%
        </p>
      </div>
    </div>
  );
}

export default CarbonFootprint;
