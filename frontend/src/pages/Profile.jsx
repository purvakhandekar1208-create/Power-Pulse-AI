import { useState, useEffect } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaBolt, FaHome, FaUsers } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useBill } from "../context/BillContext";
import { useToast } from "../context/ToastContext";

function loadHomeDetails() {
  try {
    const saved = localStorage.getItem("pp_home_details");
    return saved ? JSON.parse(saved) : { houseType: "Apartment", residents: 3 };
  } catch {
    return { houseType: "Apartment", residents: 3 };
  }
}

function Profile() {
  const { user } = useAuth();
  const { latestBill, energyScore } = useBill();
  const { showToast } = useToast();
  const [homeDetails, setHomeDetails] = useState(loadHomeDetails);

  useEffect(() => {
    localStorage.setItem("pp_home_details", JSON.stringify(homeDetails));
  }, [homeDetails]);

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Home details updated", "success");
  };

  const name = user?.name || "Ayan Sharma";
  const email = user?.email || "ayan@example.com";
  const initial = name.charAt(0);

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="font-display text-2xl font-semibold text-ink">Profile</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-amber p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full bg-amber flex items-center justify-center font-display font-bold text-2xl text-navy">
            {initial}
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">{name}</h3>
            <p className="text-slate text-sm">Member since June 2026</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-sm">
            <FaEnvelope className="text-slate" />
            <span className="text-ink">{email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaMapMarkerAlt className="text-slate" />
            <span className="text-ink">Panvel, Maharashtra</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaBolt className="text-slate" />
            <span className="text-ink">Consumer Number: PP-88213</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
          <div>
            <p className="tabular text-xl font-semibold text-ink">{latestBill.units}</p>
            <p className="text-slate text-xs">kWh this month</p>
          </div>
          <div>
            <p className="tabular text-xl font-semibold text-ink">₹{latestBill.bill.toLocaleString("en-IN")}</p>
            <p className="text-slate text-xs">Current bill</p>
          </div>
          <div>
            <p className="tabular text-xl font-semibold text-ink">{energyScore}</p>
            <p className="text-slate text-xs">Energy score</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-teal p-8">
        <h3 className="font-display text-lg font-semibold text-ink mb-1">Home Details</h3>
        <p className="text-slate text-sm mb-5">
          Helps the AI model factor in your household size and home type when predicting usage.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-ink flex items-center gap-2 mb-1.5">
              <FaHome className="text-slate" /> House Type
            </label>
            <select
              value={homeDetails.houseType}
              onChange={(e) => setHomeDetails((h) => ({ ...h, houseType: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-amber text-sm bg-white"
            >
              <option>Apartment</option>
              <option>Independent House</option>
              <option>Villa</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-ink flex items-center gap-2 mb-1.5">
              <FaUsers className="text-slate" /> Number of Residents
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={homeDetails.residents}
              onChange={(e) => setHomeDetails((h) => ({ ...h, residents: Number(e.target.value) }))}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-amber text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-teal text-navy font-display font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition"
          >
            Save Home Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
