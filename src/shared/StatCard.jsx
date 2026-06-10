function StatCard({ label, value, subtext, subtextColor = 'text-stone-400' }) {
  return (
    <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl shadow-sm hover:border-stone-700 transition-all">
      <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider">
        {label}
      </h3>
      <p className="text-4xl font-bold mt-2 text-white tracking-tight">
        {value}
      </p>
      {subtext && (
        <p className={`text-xs mt-2 ${subtextColor} font-medium`}>{subtext}</p>
      )}
    </div>
  )
}

export default StatCard
