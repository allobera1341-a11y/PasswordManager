import React, { useMemo } from 'react'
import { BarChart3, ShieldCheck, Activity, Zap } from 'lucide-react'

const AnalyticsPanel = ({ history }) => {
  const stats = useMemo(() => {
    const total = history.length;
    if (total === 0) {
      return { 
        avgScore: 0, 
        total: 0, 
        strongPercentage: 0, 
        strongCount: 0,
        weakCount: 0,
        fairCount: 0,
        distribution: { weak: 0, fair: 0, strong: 0 }
      };
    }

    const scores = history.map(h => h.securityScore || 0);
    const avgScore = scores.reduce((a, b) => a + b, 0) / total;
    
    const weakCount = history.filter(h => h.securityLevel === 'WEAK').length;
    const fairCount = history.filter(h => h.securityLevel === 'FAIR').length;
    const strongCount = history.filter(h => h.securityLevel === 'STRONG').length;

    return {
      avgScore,
      total,
      strongCount,
      weakCount,
      fairCount,
      strongPercentage: (strongCount / total) * 100,
      distribution: {
        weak: (weakCount / total) * 100,
        fair: (fairCount / total) * 100,
        strong: (strongCount / total) * 100
      }
    };
  }, [history]);

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
            { label: 'Avg Health', value: `${(stats.avgScore * 10).toFixed(0)}%`, icon: <Activity size={14}/> },
            { label: 'Vault Items', value: stats.total, icon: <ShieldCheck size={14}/> },
            { label: 'Optimal Ratio', value: `${stats.strongPercentage.toFixed(0)}%`, icon: <Zap size={14}/> },
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

        <div className="mt-8 pt-8 border-t border-white/[0.05] space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <span>Security Distribution</span>
              <div className="flex gap-4">
                <span className="text-emerald-500">{stats.strongCount} Strong</span>
                <span className="text-amber-500">{stats.fairCount} Fair</span>
                <span className="text-rose-500">{stats.weakCount} Weak</span>
              </div>
            </div>
            
            <div className="h-2.5 w-full bg-white/[0.05] rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-rose-500/80 transition-all duration-1000"
                style={{ width: `${stats.distribution.weak}%` }}
              />
              <div 
                className="h-full bg-amber-500/80 transition-all duration-1000"
                style={{ width: `${stats.distribution.fair}%` }}
              />
              <div 
                className="h-full bg-emerald-500/80 transition-all duration-1000"
                style={{ width: `${stats.distribution.strong}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            Analytics are processed locally using your current session history. 
            The health metric represents the cryptographic entropy and pattern complexity of your generated keys.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPanel
