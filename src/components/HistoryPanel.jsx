import { History, Shield, Download, Cloud, CloudOff } from 'lucide-react'
import { exportEncryptedHistory } from '../utils/exportUtils'

const getLevelStyle = (level) => {
  if (level === 'STRONG') return { color: 'var(--success)', bg: 'var(--success-light)', label: 'Fuerte' };
  if (level === 'MEDIUM') return { color: 'var(--warning)', bg: 'var(--warning-light)', label: 'Media' };
  return { color: 'var(--danger)', bg: 'var(--danger-light)', label: 'Débil' };
};

const HistoryPanel = ({ history, isGuest }) => {
  const formatTime = (createdAt) => {
    if (!createdAt) return 'Pendiente...'
    try {
      return new Date(createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    } catch (e) {
      return '...'
    }
  }

  const handleExport = () => {
    exportEncryptedHistory(history);
  };

  return (
    <div className="card-base flex flex-col" style={{ minHeight: '480px' }}>
      <div className="card-header">
        <div className="flex items-center gap-2.5">
          <div className="icon-box">
            <History size={13} />
          </div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Registro de auditoría</h2>
        </div>
        {!isGuest && history.length > 0 && (
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Download size={12} />
            Exportar
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto">
        {isGuest ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}
            >
              <CloudOff size={22} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Sincronización desactivada</h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Inicia sesión para habilitar la sincronización en la nube y el historial de sesión.
              </p>
            </div>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-3">
            <Shield size={22} strokeWidth={1.5} style={{ color: 'var(--border-strong)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Sin registros en el vault</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Hora</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: 'var(--text-muted)' }}>Nivel</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-right" style={{ color: 'var(--text-muted)' }}>Puntuación</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, idx) => {
                const lvl = getLevelStyle(entry.securityLevel);
                return (
                  <tr
                    key={entry.id || idx}
                    style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="px-5 py-3 text-xs font-medium tabular-nums" style={{ color: 'var(--text-muted)' }}>
                      {formatTime(entry.createdAt)}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span
                        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-md"
                        style={{ background: lvl.bg, color: lvl.color }}
                      >
                        {lvl.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-sm font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                      {(entry.securityScore || 0).toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer del panel */}
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}>
        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isGuest ? 'var(--border-strong)' : 'var(--success)' }}
          />
          <span>{isGuest ? 'Sin sesión' : 'Sincronización activa'}</span>
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{history.length} entradas</span>
      </div>
    </div>
  )
}

export default HistoryPanel
