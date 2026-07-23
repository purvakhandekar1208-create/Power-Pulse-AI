const colorMap = {
  coral: "bg-coral",
  amber: "bg-amber",
  teal: "bg-teal",
  navy: "bg-navy",
};

function ApplianceBreakdown({ data = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-coral p-6 card-lift">
      <h2 className="font-display text-xl font-semibold text-ink mb-5">High-Power Appliances</h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-ink font-medium">{item.name}</span>
              <span className="tabular text-slate">{item.pct}%</span>
            </div>
            <div className="w-full h-2 bg-mist rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${colorMap[item.color]}`}
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplianceBreakdown;
