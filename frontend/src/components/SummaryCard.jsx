function SummaryCard({ title, value, icon, accent, trend }) {
  const accents = {
    amber: "bg-amber-soft text-amber",
    teal: "bg-teal-soft text-teal",
    coral: "bg-coral-soft text-coral",
    navy: "bg-mist text-navy",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 card-lift">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate text-sm">{title}</p>
          <h3 className="tabular text-3xl font-semibold mt-2 text-ink">{value}</h3>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.up ? "text-coral" : "text-teal"}`}>
              {trend.up ? "▲" : "▼"} {trend.label}
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg ${accents[accent] || accents.navy}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
