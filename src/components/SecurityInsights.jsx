import { Brain, ShieldAlert, CheckCircle2, Lightbulb } from 'lucide-react'

const SecurityInsights = ({ insights, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card-base" style={{ opacity: 0.7 }}>
        <div className="card-body space-y-3 animate-pulse">
          <div className="h-4 w-40 rounded" style={{ background: 'var(--surface-3)' }} />
          <div className="h-3 w-full rounded" style={{ background: 'var(--surface-3)' }} />
          <div className="h-3 w-5/6 rounded" style={{ background: 'var(--surface-3)' }} />
        </div>
      </div>
    )
  }

  if (!insights) return null;

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-2.5">
          <div className="icon-box" style={{ background: 'var(--accent-light)', borderColor: '#bfdbfe', color: 'var(--accent)' }}>
            <Brain size={13} />
          </div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Asistente de inteligencia</h2>
        </div>
        <span
          className="text-xs font-semibold px-2 py-1 rounded-md"
          style={{ background: 'var(--surface-3)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
        >
          Análisis IA
        </span>
      </div>

      <div className="card-body space-y-6">
        {/* Explicación */}
        <div
          className="flex items-start gap-3 p-4 rounded-lg"
          style={{
            background: 'var(--accent-light)',
            border: '1px solid #bfdbfe',
            borderLeft: '3px solid var(--accent)',
          }}
        >
          <Lightbulb size={16} style={{ color: 'var(--accent)', marginTop: '1px', flexShrink: 0 }} />
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {insights.explanation}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recomendaciones */}
          <div>
            <h3 className="label-section flex items-center gap-1.5">
              <ShieldAlert size={11} />
              Recomendaciones clave
            </h3>
            <ul className="space-y-2">
              {insights.recommendations.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--accent)' }} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Buenas prácticas */}
          <div>
            <h3 className="label-section flex items-center gap-1.5">
              <CheckCircle2 size={11} />
              Estándares globales
            </h3>
            <ul className="space-y-2">
              {insights.bestPractices.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--border-strong)' }} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityInsights
