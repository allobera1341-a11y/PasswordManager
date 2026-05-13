import { Check, Activity, Info, AlertCircle } from 'lucide-react'

const getScoreStyle = (score) => {
  if (score >= 8) return { color: 'var(--success)', bg: 'var(--success-light)', border: '#b2f2bb', label: 'Fuerte' };
  if (score >= 4) return { color: 'var(--warning)', bg: 'var(--warning-light)', border: '#ffd8a8', label: 'Media' };
  return { color: 'var(--danger)', bg: 'var(--danger-light)', border: '#ffc9c9', label: 'Débil' };
};

const SecurityPanel = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="card-base" style={{ opacity: 0.6 }}>
        <div className="card-header">
          <div className="flex items-center gap-2.5">
            <div className="icon-box">
              <Activity size={13} />
            </div>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Análisis de seguridad</h2>
          </div>
        </div>
        <div className="card-body flex items-center justify-center py-10">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Genera una contraseña para ver el análisis</p>
        </div>
      </div>
    )
  }

  const style = getScoreStyle(analysis.score);

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-2.5">
          <div className="icon-box">
            <Activity size={13} />
          </div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Análisis de seguridad</h2>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-md"
          style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
        >
          {style.label} · {analysis.score.toFixed(1)}/10
        </span>
      </div>

      <div className="card-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mensaje de estado */}
          <div
            className="flex items-start gap-3 p-4 rounded-lg"
            style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}
          >
            <Info size={15} style={{ color: 'var(--text-muted)', marginTop: '1px', flexShrink: 0 }} />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {analysis.score >= 8
                ? 'Esta contraseña cumple con los requisitos de alta seguridad para entornos empresariales.'
                : 'Considera aumentar la longitud o la complejidad para alcanzar una entropía óptima.'}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {analysis.metrics.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg"
                style={{
                  background: 'var(--surface-3)',
                  border: '1px solid var(--border)',
                }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                <div style={{ color: item.ok ? 'var(--success)' : 'var(--danger)' }}>
                  {item.ok
                    ? <Check size={14} strokeWidth={2.5} />
                    : <AlertCircle size={14} />
                  }
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
