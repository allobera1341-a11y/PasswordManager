import { BarChart3, ShieldCheck, Activity, Zap } from 'lucide-react'

const AnalyticsPanel = ({ history }) => {
  const total = history.length;
  const scores = history.map(h => h.securityScore || 0);
  const avgScore = total > 0 ? scores.reduce((a, b) => a + b, 0) / total : 0;
  
  const strongCount = history.filter(h => h.securityLevel === 'STRONG').length;
  const strongPercentage = total > 0 ? (strongCount / total) * 100 : 0;

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center border border-white/10">
            <BarChart3 size={14} className="text-slate-400" />
          </div>
          <h2 className="text-[14px] font-bold text-white tracking-tight">System Analytics</h2>
        </div>
      </div>

      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Avg Health', value: `${(avgScore * 10).toFixed(0)}%`, icon: <Activity size={14}/> },
            { label: 'Vault Items', value: total, icon: <ShieldCheck size={14}/> },
            { label: 'Optimal Ratio', value: `${strongPercentage.toFixed(0)}%`, icon: <Zap size={14}/> },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-slate-500">{stat.icon}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/[0.05] space-y-4">
          <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <span>Overall Distribution</span>
            <span className="text-white">{strongCount} Strong / {total} Total</span>
          </div>
          <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-1000"
              style={{ width: `${strongPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPanel
