function Skeleton({ type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl animate-pulse space-y-4">
        <div className="h-4 bg-stone-800 rounded w-1/3" />
        <div className="h-8 bg-stone-800 rounded w-1/2" />
        <div className="h-3 bg-stone-800 rounded w-2/3" />
      </div>
    )
  }

  if (type === 'chart') {
    return (
      <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl animate-pulse space-y-4 mt-6">
        <div className="h-5 bg-stone-800 rounded w-1/4 mb-6" />
        <div className="h-48 bg-stone-950 rounded-xl border border-stone-800/40 flex items-end p-4 space-x-3">
          <div className="h-12 bg-stone-800 w-full rounded" />
          <div className="h-24 bg-stone-800 w-full rounded" />
          <div className="h-36 bg-stone-800 w-full rounded" />
          <div className="h-16 bg-stone-800 w-full rounded" />
        </div>
      </div>
    )
  }

  return null
}

export default Skeleton
