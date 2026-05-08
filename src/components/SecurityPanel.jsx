import { ShieldCheck, Check, Activity, Info, AlertTriangle } from 'lucide-react'

const SecurityPanel = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="card-base opacity-50 grayscale pointer-events-none transition-all duration-500">
        <div className="card-header">
          <div className="flex items-center gap-3">
            <Activity size={14} className="text-slate-400" />
            <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.1em]">
              Security Analysis Engine
            </h2>
          </div>
        </div>
        <div className="card-body py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Esperando generación de datos...
        </div>
      </div>
    )
  }

  const getLevelColor = () => {
    if (analysis.level === 'WEAK') return 'text-red-600 bg-red-50 border-red-100'
    if (analysis.level === 'MEDIUM') return 'text-amber-600 bg-amber-50 border-amber-100'
    return 'text-emerald-700 bg-emerald-50 border-emerald-100'
  }

  const getProgressColor = () => {
    if (analysis.level === 'WEAK') return 'bg-red-500'
    if (analysis.level === 'MEDIUM') return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  return (
    <div className="card-base animate-in fade-in duration-500">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-slate-400" />
          <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.1em]">
            Protocolo de Análisis Heurístico
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Trust Index</span>
          <div className={`text-[11px] font-black px-2 py-0.5 rounded border transition-colors duration-500 ${getLevelColor()}`}>
            {analysis.score.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="label-tech">Nivel de Confianza</span>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${getLevelColor().split(' ')[0]}`}>
                  {analysis.level}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${getProgressColor()}`} 
                  style={{ width: `${analysis.score * 10}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded bg-slate-50 border border-slate-200 border-l-4 border-l-slate-400 transition-all">
              <Info size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-slate-500 leading-normal font-medium">
                {analysis.score > 8 
                  ? "La credencial actual cumple con los requisitos del estándar NIST SP 800-63B para alta seguridad."
                  : "Se recomienda regenerar la contraseña para alcanzar parámetros óptimos de entropía."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {analysis.metrics.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded bg-white border border-slate-100 transition-all">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">{item.label}</span>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500 ${item.ok ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {item.ok ? <Check size={10} strokeWidth={4} /> : <AlertTriangle size={10} strokeWidth={4} />}
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
