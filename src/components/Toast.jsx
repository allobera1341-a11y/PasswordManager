import { useEffect } from 'react'
import { CheckCircle2, AlertCircle, X, Shield } from 'lucide-react'

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right-10 fade-in duration-700">
      <div className={`relative overflow-hidden flex items-center gap-5 px-6 py-5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border backdrop-blur-xl ${
        type === 'success' ? 'bg-black/90 border-emerald-500/20' : 'bg-black/90 border-red-500/20'
      }`}>
        {/* Progress bar simulation */}
        <div className={`absolute bottom-0 left-0 h-0.5 animate-[shrink_5s_linear] ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: '100%' }} />

        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner ${
          type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
        </div>
        
        <div className="flex flex-col gap-1 pr-6">
          <div className="flex items-center gap-2">
            <Shield size={10} className={type === 'success' ? 'text-emerald-500' : 'text-red-500'} />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 leading-none">
              {type === 'success' ? 'Vault Protocol' : 'Security Alert'}
            </p>
          </div>
          <p className="text-[13.5px] font-bold text-white tracking-tight leading-tight">{message}</p>
        </div>

        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-700 hover:text-white hover:bg-white/5 transition-all"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

export default Toast
