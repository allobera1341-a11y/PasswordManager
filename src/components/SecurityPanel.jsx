import { Check, Activity, Info, AlertCircle } from 'lucide-react'

const SecurityPanel = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="card-base opacity-50">
        <div className="card-header">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/10">
              <Activity size={14} className="text-slate-500" />
            </div>
            <h2 className="text-[14px] font-bold text-white tracking-tight">Security Analysis</h2>
          </div>
        </div>
        <div className="card-body flex items-center justify-center py-12">
          <p className="text-[13px] text-slate-500">Waiting for generation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/10">
            <Activity size={14} className="text-slate-400" />
          </div>
          <h2 className="text-[14px] font-bold text-white tracking-tight">Security Analysis</h2>
        </div>
        <div className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
          analysis.score > 7 
            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }`}>
          Score: {analysis.score.toFixed(1)}
        </div>
      </div>

      <div className="card-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Metric */}
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <Info size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {analysis.score > 8
                  ? 'This credential meets high security requirements for enterprise environments.'
                  : 'Consider increasing length or complexity to reach optimal entropy.'}
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 gap-2">
            {analysis.metrics.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/5 bg-black/40"
              >
                <span className="text-[13px] font-medium text-slate-400">{item.label}</span>
                <div className={item.ok ? 'text-blue-500' : 'text-slate-700'}>
                  {item.ok ? <Check size={14} strokeWidth={3} /> : <AlertCircle size={14} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityPanel
