import { Database } from 'lucide-react'

const DemoMode = ({ onPopulate, isGuest }) => {
  return (
    <div
      className="rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          <Database size={14} />
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Modo demostración</h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {isGuest
              ? 'Inicia sesión para cargar datos de demostración en el vault.'
              : 'Carga datos de ejemplo para explorar las analíticas del sistema.'
            }
          </p>
        </div>
      </div>

      <button
        onClick={onPopulate}
        disabled={isGuest}
        className="btn-secondary text-sm flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Inicializar demo
      </button>
    </div>
  )
}

export default DemoMode
