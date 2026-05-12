import { History, Shield, Lock, Download, CloudOff } from 'lucide-react'
import { exportEncryptedHistory } from '../utils/exportUtils'

const HistoryPanel = ({ history, isGuest }) => {
  const formatTime = (createdAt) => {
    if (!createdAt) return 'Pending...'
    try {
      const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch (e) {
      return '...'
    }
  }

  const handleExport = () => {
    exportEncryptedHistory(history);
  };

  return (
    <div className="card-base flex flex-col h-full min-h-[500px] border-white/[0.05]">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/10">
            <History size={14} className="text-slate-400" />
          </div>
          <h2 className="text-[14px] font-bold text-white tracking-tight uppercase">Audit Trail</h2>
        </div>
        {!isGuest && history.length > 0 && (
          <button
            onClick={handleExport}
            className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors flex items-center gap-2"
          >
            <Download size={12} />
            Export
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto bg-black/20">
        {isGuest ? (
          <div className="flex flex-col items-center justify-center py-32 px-10 text-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <CloudOff size={28} className="text-amber-500/50" />
            </div>
            <div className="space-y-2">
              <h4 className="text-[14px] font-bold text-white">Vault Sync Disabled</h4>
              <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                Connect your account to enable real-time cloud synchronization and session history.
              </p>
            </div>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-8 gap-4 opacity-30">
            <Shield size={24} strokeWidth={1} className="text-slate-500" />
            <p className="text-[12px] font-medium text-slate-500">No records in cloud vault</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#0a0a0a] z-10 border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] text-center">Security</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] text-right">Metric</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, idx) => (
                <tr key={entry.id || idx} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-[12px] font-medium text-slate-500 tabular-nums">
                    {formatTime(entry.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block w-2 h-2 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)] ${
                      entry.securityLevel === 'STRONG' ? 'bg-blue-600' : 'bg-slate-700'
                    }`} />
                  </td>
                  <td className="px-6 py-4 text-right text-[13px] font-bold text-white tabular-nums">
                    {(entry.securityScore || 0).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="p-6 bg-white/[0.01] border-t border-white/[0.05]">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-600">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isGuest ? 'bg-amber-500/50' : 'bg-emerald-500 animate-pulse'}`} />
            <span>{isGuest ? 'Local Identity' : 'Cloud Sync Active'}</span>
          </div>
          <span>{history.length} Entries</span>
        </div>
      </div>
    </div>
  )
}

export default HistoryPanel
