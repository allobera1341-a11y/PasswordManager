import { History, Shield, Lock, Download } from 'lucide-react'
import { exportEncryptedHistory } from '../utils/exportUtils'

const HistoryPanel = ({ history }) => {
  const formatTime = (createdAt) => {
    if (!createdAt) return '...'
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
    <div className="card-base flex flex-col h-full min-h-[500px]">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/10">
            <History size={14} className="text-slate-400" />
          </div>
          <h2 className="text-[14px] font-bold text-white tracking-tight">Audit Trail</h2>
        </div>
        <button
          onClick={handleExport}
          disabled={history.length === 0}
          className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors flex items-center gap-2"
        >
          <Download size={12} />
          Export
        </button>
      </div>

      <div className="flex-grow overflow-y-auto bg-black/10">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 gap-4 opacity-30">
            <Shield size={24} strokeWidth={1} className="text-slate-500" />
            <p className="text-[12px] font-medium text-slate-500">No records found</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#111] z-10 border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Time</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, idx) => (
                <tr key={entry.id || idx} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-[12px] font-medium text-slate-500 tabular-nums">
                    {formatTime(entry.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block w-2 h-2 rounded-full ${
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
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
          <span>Connected to Vault</span>
          <span>{history.length} items</span>
        </div>
      </div>
    </div>
  )
}

export default HistoryPanel
