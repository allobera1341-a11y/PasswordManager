const LoadingSkeleton = ({ type = 'card' }) => {
  const bar = (w) => (
    <div
      className="rounded"
      style={{ height: '12px', width: w, background: 'var(--surface-3)' }}
    />
  );

  if (type === 'insights') {
    return (
      <div className="card-base animate-pulse">
        <div className="card-body space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg" style={{ background: 'var(--surface-3)' }} />
            {bar('130px')}
          </div>
          <div className="space-y-2">
            {bar('100%')}
            {bar('83%')}
            {bar('66%')}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="h-10 rounded-lg" style={{ background: 'var(--surface-3)' }} />
            <div className="h-10 rounded-lg" style={{ background: 'var(--surface-3)' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-base animate-pulse">
      <div className="card-body space-y-4">
        <div className="flex justify-between">
          {bar('160px')}
          {bar('80px')}
        </div>
        <div className="h-16 rounded-lg" style={{ background: 'var(--surface-3)' }} />
        <div className="grid grid-cols-4 gap-3">
          {[0,1,2,3].map(i => (
            <div key={i} className="h-9 rounded-lg" style={{ background: 'var(--surface-3)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton
