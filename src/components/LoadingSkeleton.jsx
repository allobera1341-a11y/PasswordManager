const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'insights') {
    return (
      <div className="card-base p-8 animate-pulse border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-32 bg-white/5 rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-3 w-full bg-white/5 rounded" />
          <div className="h-3 w-5/6 bg-white/5 rounded" />
          <div className="h-3 w-4/6 bg-white/5 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="h-12 rounded-xl bg-white/5" />
          <div className="h-12 rounded-xl bg-white/5" />
        </div>
      </div>
    )
  }

  return (
    <div className="card-base p-8 animate-pulse border-white/5 bg-white/[0.02]">
      <div className="flex justify-between mb-8">
        <div className="h-4 w-40 bg-white/5 rounded" />
        <div className="h-4 w-20 bg-white/5 rounded" />
      </div>
      <div className="h-20 w-full bg-white/5 rounded-xl mb-8" />
      <div className="grid grid-cols-4 gap-4">
        <div className="h-10 bg-white/5 rounded" />
        <div className="h-10 bg-white/5 rounded" />
        <div className="h-10 bg-white/5 rounded" />
        <div className="h-10 bg-white/5 rounded" />
      </div>
    </div>
  )
}

export default LoadingSkeleton
