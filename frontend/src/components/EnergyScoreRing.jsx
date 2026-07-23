import { useEffect, useState } from "react";
import CountUp from "./CountUp";

function EnergyScoreRing({ score = 82 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimatedScore(score));
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div className="flex items-center gap-5">
      <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="#E5E7EB" strokeWidth="9" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#2DD4BF"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div>
        <p className="tabular text-4xl font-semibold text-ink">
          <CountUp end={score} duration={1000} />
        </p>
        <p className="text-slate text-sm">Energy Score / 100</p>
      </div>
    </div>
  );
}

export default EnergyScoreRing;
