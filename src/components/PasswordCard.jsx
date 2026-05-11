import { useState } from 'react'
import { Copy, RefreshCw, Lock, Check, ShieldCheck, Activity } from 'lucide-react'

const PasswordCard = ({ password, onGenerate, analysis, isSaving }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getHealthColor = (score) => {
    if (score < 4) return 'bg-red-500';
    if (score < 7) return 'bg-amber-500';
    return 'bg-blue-600';
  };

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/10">
            <Lock size={14} className="text-slate-400" strokeWidth={2} />
          </div>
          <h2 className="text-[14px] font-bold text-white tracking-tight">Generator</h2>
        </div>
        <button
          onClick={onGenerate}
          disabled={isSaving}
          className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-[12px] font-bold"
        >
          <RefreshCw size={13} className={isSaving ? 'animate-spin' : ''} />
          {isSaving ? 'Generating...' : 'Refresh'}
        </button>
      </div>

      <div className="card-body space-y-8">
        
        {/* Simple Password Box */}
        <div className="relative group">
          <div
            className={`w-full px-6 py-8 rounded-xl font-mono text-2xl tracking-wider transition-all flex items-center justify-center min-h-[90px] border ${
              password 
                ? 'bg-black border-white/10 text-white' 
                : 'bg-white/[0.02] border-white/5 text-slate-700'
            }`}
          >
            {password || '•••• •••• •••• ••••'}
          </div>

          <button
            onClick={handleCopy}
            disabled={!password || isSaving}
            className={`absolute right-3 top-3 flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${
              copied
                ? 'bg-blue-600 text-white'
                : 'bg-white text-black hover:bg-slate-200'
            }`}
          >
            {copied ? <Check size={12} strokeWidth={3}/> : <Copy size={12} strokeWidth={2.5}/>}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Simplified Health Meter */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Strength Score</span>
            <span className="text-[14px] font-bold text-white">
              {analysis ? Math.round(analysis.score * 10) : 0}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ${getHealthColor(analysis?.score || 0)}`}
              style={{ width: `${(analysis?.score || 0) * 10}%` }}
            />
          </div>
        </div>

        {/* Minimal Specs */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Entropy', value: analysis ? `${analysis.entropy} bits` : '0', icon: <Activity size={12}/> },
            { label: 'Standard', value: 'AES-256', icon: <Lock size={12}/> },
          ].map((item, idx) => (
            <div key={idx} className="metric-block">
              <p className="label-tech">{item.label}</p>
              <p className="text-[13px] font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onGenerate}
          disabled={isSaving}
          className="btn-primary w-full"
        >
          {isSaving ? 'Processing...' : 'Generate New Identity'}
        </button>
      </div>
    </div>
  )
}

export default PasswordCard
