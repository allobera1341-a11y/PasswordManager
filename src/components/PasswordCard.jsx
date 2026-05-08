import { useState } from 'react'
import { Copy, RefreshCw, Lock, Check, Shield } from 'lucide-react'

const PasswordCard = ({ password, onGenerate, analysis, isSaving }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <Lock size={14} className="text-slate-400" />
          <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.1em]">
            Vault Generation Engine
          </h2>
        </div>
        <button 
          onClick={onGenerate}
          disabled={isSaving}
          className="text-[10px] font-black text-slate-400 hover:text-slate-900 flex items-center gap-2 transition-all uppercase tracking-widest group disabled:opacity-50"
        >
          <RefreshCw size={12} strokeWidth={3} className={`group-active:rotate-180 transition-transform duration-500 ${isSaving ? 'animate-spin' : ''}`} />
          {isSaving ? 'Encrypting & Saving...' : 'Generate Secure Password'}
        </button>
      </div>

      <div className="card-body">
        <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
          <div className="flex-grow font-mono text-xl tracking-[0.25em] text-slate-800 select-all px-6 py-4 bg-slate-50 border border-slate-200 rounded w-full border-dashed min-h-[64px] flex items-center relative overflow-hidden">
            {password || <span className="text-slate-300">•••• •••• •••• ••••</span>}
            {isSaving && <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center animate-pulse" />}
          </div>
          <button 
            onClick={handleCopy}
            disabled={!password || isSaving}
            className={`w-full lg:w-auto btn-primary flex items-center justify-center gap-2 min-w-[180px] ${copied ? 'bg-emerald-600' : ''}`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 border-t border-slate-100 pt-6">
          {[
            { label: 'Complexity', value: password ? `${password.length} CHARS` : '--' },
            { label: 'Entropy', value: analysis ? `${analysis.entropy} BITS` : '--' },
            { label: 'Encryption', value: 'AES-256-CBC' },
            { label: 'Storage', value: isSaving ? 'SAVING...' : (password ? 'ENCRYPTED' : '--') },
          ].map((item, idx) => (
            <div key={idx} className="px-4 py-2">
              <p className="label-tech">{item.label}</p>
              <p className="value-tech">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PasswordCard
