import { Brain, ShieldAlert, CheckCircle2, Lightbulb } from 'lucide-react'

const SecurityInsights = ({ insights, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card-base p-8 animate-pulse">
        <div className="h-4 w-48 bg-white/5 rounded mb-4" />
        <div className="h-3 w-full bg-white/5 rounded mb-2" />
        <div className="h-3 w-5/6 bg-white/5 rounded" />
      </div>
    )
  }

  if (!insights) return null;

  return (
    <div className="card-base border-blue-500/10">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Brain size={16} className="text-blue-500" />
          </div>
          <h2 className="text-[14px] font-bold text-white tracking-tight">Intelligence Assistant</h2>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1 bg-white/[0.05] rounded border border-white/[0.05]">
          AI Analysis
        </span>
      </div>

      <div className="card-body">
        <div className="space-y-8">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <Lightbulb size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-[14px] text-slate-300 leading-relaxed">
              {insights.explanation}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="label-section flex items-center gap-2">
                <ShieldAlert size={12} />
                Critical Advice
              </h3>
              <ul className="space-y-3">
                {insights.recommendations.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="label-section flex items-center gap-2">
                <CheckCircle2 size={12} />
                Global Standards
              </h3>
              <ul className="space-y-3">
                {insights.bestPractices.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-slate-700 mt-2 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityInsights
