import { History, Shield, Lock } from 'lucide-react'

const HistoryPanel = ({ history }) => {
  const formatTime = (createdAt) => {
    if (!createdAt) return 'Recent';
    // Handle Firestore timestamp
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  return (
    <div className="card-base flex flex-col h-full overflow-hidden">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <History size={14} className="text-slate-400" />
          <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.1em]">
            Secure Audit Log
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 text-[8px] font-black text-white rounded uppercase tracking-widest">
          <Lock size={8} />
          Encrypted
        </div>
      </div>

      <div className="card-body flex-grow overflow-y-auto custom-scrollbar">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-50">
            <Shield size={32} strokeWidth={1} />
            <p className="text-[10px] font-bold uppercase tracking-widest text-center leading-relaxed">
              Waiting for encrypted <br /> records...
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="grid grid-cols-3 px-3 py-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 mb-2">
              <span>Timestamp</span>
              <span className="text-center">Encryption</span>
              <span className="text-right">Score</span>
            </div>
            
            {history.map((entry) => (
              <div 
                key={entry.id} 
                className="grid grid-cols-3 items-center px-3 py-3 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0 group animate-in slide-in-from-right-4 duration-300"
              >
                <span className="text-[10px] font-bold text-slate-500 font-mono">
                  {formatTime(entry.createdAt)}
                </span>
                <div className="flex justify-center">
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter border transition-colors flex items-center gap-1 ${
                    entry.securityLevel === 'STRONG' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' :
                    entry.securityLevel === 'MEDIUM' ? 'text-amber-700 bg-amber-50 border-amber-100' :
                    'text-red-700 bg-red-50 border-red-100'
                  }`}>
                    <Shield size={8} />
                    AES-256
                  </span>
                </div>
                <span className="text-[10px] font-black text-slate-700 font-mono text-right">
                  {(entry.securityScore || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-3 text-[8px] font-bold text-slate-400 uppercase tracking-widest justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Connection: Firestore
        </div>
        <button className="w-full py-2 bg-white border border-slate-200 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all disabled:opacity-30" disabled={history.length === 0}>
          View Security Audit Trail
        </button>
      </div>
    </div>
  )
}

export default HistoryPanel
