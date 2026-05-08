import { useEffect } from 'react'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded shadow-xl border ${
        type === 'success' ? 'bg-white border-emerald-100 text-emerald-800' : 'bg-white border-red-100 text-red-800'
      }`}>
        {type === 'success' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <AlertCircle size={18} className="text-red-500" />}
        <span className="text-xs font-bold uppercase tracking-tight">{message}</span>
        <button onClick={onClose} className="ml-2 text-slate-300 hover:text-slate-500 transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

export default Toast
