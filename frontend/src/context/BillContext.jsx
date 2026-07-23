import { createContext, useContext, useState, useEffect } from "react";

const BillContext = createContext(null);

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Dummy weather reading shared with WeatherCard's static display.
// Replace with a real weather API value once the backend is wired up.
const CURRENT_TEMP_C = 32;

const seedBills = [
  { id: 1, month: "January", units: 220, bill: 1800, status: "Normal" },
  { id: 2, month: "February", units: 245, bill: 1950, status: "Normal" },
  { id: 3, month: "March", units: 285, bill: 2300, status: "High" },
  { id: 4, month: "April", units: 310, bill: 2600, status: "High" },
  { id: 5, month: "May", units: 295, bill: 2450, status: "Normal" },
];

function loadBills() {
  try {
    const saved = localStorage.getItem("pp_bills");
    return saved ? JSON.parse(saved) : seedBills;
  } catch {
    return seedBills;
  }
}

export function BillProvider({ children }) {
  const [bills, setBills] = useState(loadBills);
  const [hasBill, setHasBill] = useState(
    () => localStorage.getItem("pp_has_bill") === "true"
  );

  useEffect(() => {
    localStorage.setItem("pp_bills", JSON.stringify(bills));
  }, [bills]);

  const latestBill = bills[bills.length - 1];
  const previousBill = bills.length > 1 ? bills[bills.length - 2] : null;

  const trendPercent = previousBill
    ? ((latestBill.units - previousBill.units) / previousBill.units) * 100
    : 0;

  // Rule-based stand-ins for what the AI/backend team will eventually compute
  // from real historical + weather data. Same shape, real logic replaces this.
  const weatherPenalty = CURRENT_TEMP_C > 30 ? 6 : 0;
  const trendPenalty = Math.max(trendPercent, 0) * 1.4;
  const energyScore = Math.max(0, Math.min(100, Math.round(100 - trendPenalty - weatherPenalty)));

  const predictedBill = Math.round(
    latestBill.bill * (1 + Math.max(trendPercent, 0) / 100 + 0.03)
  );

  let aiExplanation;
  if (!previousBill) {
    aiExplanation = "Upload a few more bills so I can start comparing month-to-month trends.";
  } else if (trendPercent > 3) {
    aiExplanation = `Your bill increased mainly due to a ${trendPercent.toFixed(0)}% rise in consumption${
      weatherPenalty ? ", likely driven by higher temperatures this month" : ""
    }.`;
  } else if (trendPercent < -3) {
    aiExplanation = `Nice work — usage dropped ${Math.abs(trendPercent).toFixed(0)}% compared to last month.`;
  } else {
    aiExplanation = "Your usage has stayed roughly stable compared to last month.";
  }

  // Emission factor is an approximate India grid average (kg CO2 per kWh).
  // Swap for a region-specific/real-time factor once the backend provides one.
  const EMISSION_FACTOR = 0.82;
  const carbonKg = Math.round(latestBill.units * EMISSION_FACTOR);

  // Dummy per-appliance split until real smart-meter/appliance-level data exists.
  const applianceBreakdown = [
    { name: "AC Unit", pct: 42, color: "coral" },
    { name: "Water Heater", pct: 24, color: "amber" },
    { name: "Refrigerator", pct: 15, color: "teal" },
    { name: "Other Appliances", pct: 19, color: "navy" },
  ];

  // Simulated fault detection: flags the same appliance the deck's mockup
  // highlights whenever usage trend crosses a threshold. Replace with real
  // per-appliance anomaly detection once that data is available.
  const faultAlert =
    trendPercent > 8
      ? { appliance: "Water Heater", percent: Math.min(60, Math.round(trendPercent * 2.2)) }
      : null;

  // Simulates what an OCR service would return after reading an uploaded bill.
  function generateExtraction() {
    const nextMonthIndex = (MONTHS.indexOf(latestBill.month) + 1) % 12;
    const variance = 0.9 + Math.random() * 0.3;
    const units = Math.round(latestBill.units * variance);
    const bill = Math.round(units * 8.2);
    return {
      month: MONTHS[nextMonthIndex],
      units,
      bill,
      consumerNumber: "PP-88213",
    };
  }

  function confirmBill(extracted) {
    const status = extracted.units > latestBill.units * 1.08 ? "High" : "Normal";
    const newBill = {
      id: bills.length + 1,
      month: extracted.month,
      units: extracted.units,
      bill: extracted.bill,
      status,
    };
    setBills((prev) => [...prev, newBill]);
    localStorage.setItem("pp_has_bill", "true");
    setHasBill(true);
  }

  return (
    <BillContext.Provider
      value={{
        bills,
        hasBill,
        latestBill,
        previousBill,
        trendPercent,
        energyScore,
        predictedBill,
        aiExplanation,
        weatherTemp: CURRENT_TEMP_C,
        carbonKg,
        applianceBreakdown,
        faultAlert,
        generateExtraction,
        confirmBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
}

export function useBill() {
  const ctx = useContext(BillContext);
  if (!ctx) throw new Error("useBill must be used inside BillProvider");
  return ctx;
}
