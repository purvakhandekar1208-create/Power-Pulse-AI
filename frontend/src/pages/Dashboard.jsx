import { useState, useEffect } from "react";
import { FaMoneyBillWave, FaBolt, FaChartLine, FaFileUpload } from "react-icons/fa";

import SummaryCard from "../components/SummaryCard";
import EnergyScoreRing from "../components/EnergyScoreRing";
import UsageChart from "../components/UsageChart";
import DailyUsageChart from "../components/DailyUsageChart";
import AlertCard from "../components/AlertCard";
import WeatherCard from "../components/WeatherCard";
import AIInsights from "../components/AIInsights";
import Recommendations from "../components/Recommendations";
import BillHistory from "../components/BillHistory";
import ApplianceBreakdown from "../components/ApplianceBreakdown";
import CarbonFootprint from "../components/CarbonFootprint";
import EmptyState from "../components/EmptyState";
import CountUp from "../components/CountUp";
import { SkeletonCard, SkeletonBlock } from "../components/Skeleton";
import { useBill } from "../context/BillContext";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const {
    hasBill,
    bills,
    latestBill,
    trendPercent,
    energyScore,
    predictedBill,
    aiExplanation,
    weatherTemp,
    carbonKg,
    applianceBreakdown,
    faultAlert,
  } = useBill();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonBlock height="h-72" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonBlock height="h-48" />
          <SkeletonBlock height="h-48" />
          <SkeletonBlock height="h-48" />
        </div>
      </div>
    );
  }

  if (!hasBill) {
    return (
      <EmptyState
        icon={<FaFileUpload />}
        title="No bill uploaded yet"
        message="Upload your first electricity bill to see your usage breakdown, AI predictions, and personalized recommendations."
        actionLabel="Upload Your First Bill"
        actionTo="/upload"
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard
          title="Current Bill"
          value={<CountUp end={latestBill.bill} prefix="₹" />}
          icon={<FaMoneyBillWave />}
          accent="amber"
        />
        <SummaryCard
          title="Units Consumed"
          value={<CountUp end={latestBill.units} suffix=" kWh" />}
          icon={<FaBolt />}
          accent="navy"
        />
        <SummaryCard
          title="Predicted Bill"
          value={<CountUp end={predictedBill} prefix="₹" />}
          icon={<FaChartLine />}
          accent="coral"
          trend={{ up: trendPercent > 0, label: `${Math.abs(trendPercent).toFixed(0)}% vs last month` }}
        />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-teal p-6 flex items-center card-lift">
          <EnergyScoreRing score={energyScore} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ApplianceBreakdown data={applianceBreakdown} />
        <AIInsights
          explanation={aiExplanation}
          trendPercent={trendPercent}
          predictedBill={predictedBill}
          weatherTemp={weatherTemp}
          faultAlert={faultAlert}
        />
      </div>

      <AlertCard faultAlert={faultAlert} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsageChart data={bills} />
        <DailyUsageChart latestUnits={latestBill.units} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CarbonFootprint kg={carbonKg} trendPercent={trendPercent} />
        <WeatherCard />
        <Recommendations />
      </div>

      <BillHistory bills={bills} />
    </div>
  );
}

export default Dashboard;
