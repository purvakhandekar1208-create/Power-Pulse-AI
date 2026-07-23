export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-24 bg-gray-200 rounded" />
        </div>
        <div className="w-11 h-11 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export function SkeletonBlock({ height = "h-64" }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse ${height}`}>
      <div className="h-4 w-32 bg-gray-200 rounded mb-5" />
      <div className="h-full w-full bg-gray-100 rounded" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <tr className="border-b border-gray-50 animate-pulse">
      <td className="py-3.5"><div className="h-3 w-20 bg-gray-200 rounded" /></td>
      <td className="py-3.5"><div className="h-3 w-14 bg-gray-200 rounded" /></td>
      <td className="py-3.5"><div className="h-3 w-14 bg-gray-200 rounded" /></td>
      <td className="py-3.5"><div className="h-5 w-16 bg-gray-200 rounded-full" /></td>
    </tr>
  );
}
