import { FaCloudSun, FaTint, FaThermometerHalf } from "react-icons/fa";

function WeatherCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-amber p-6 card-lift">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-amber-soft flex items-center justify-center text-amber text-lg">
          <FaCloudSun />
        </div>
        <h2 className="font-display text-xl font-semibold text-ink">Weather</h2>
      </div>

      <div className="space-y-3 text-base">
        <div className="flex items-center justify-between">
          <span className="text-slate flex items-center gap-2"><FaThermometerHalf /> Temperature</span>
          <span className="tabular font-medium">32°C</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate flex items-center gap-2"><FaTint /> Humidity</span>
          <span className="tabular font-medium">72%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate">Condition</span>
          <span className="font-medium">Cloudy</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
