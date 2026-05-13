import { useMemo } from 'react'
import { BarChart3, ShieldCheck, Activity, TrendingUp } from 'lucide-react'

const AnalyticsPanel = ({ history }) => {
  const stats = useMemo(() => {
    const total = history.length;
    if (total === 0) {
      return { avgScore: 0, total: 0, strongPercentage: 0, strongCount: 0, weakCount: 0, mediumCount: 0, distribution: { weak: 0, medium: 0, strong: 0 } };
    }

    const scores = history.map(h => h.securityScore || 0);
    const avgScore = scores.reduce((a, b) => a + b, 0) / total;
    const weakCount   = history.filter(h => h.securityLevel === 'WEAK').length;
    const mediumCount = history.filter(h => h.securityLevel === 'MEDIUM').length;
    const strongCount = history.filter(h => h.securityLevel === 'STRONG').length;

    return {
      avgScore,
      total,
      strongCount,
      weakCount,
      mediumCount,
      strongPercentage: (strongCount / total) * 100,
      distribution: {
        weak:   (weakCount   / total) * 100,
        medium: (mediumCount / total) * 100,
        strong: (strongCount / total) * 100,
      }
    };
  }, [history]);

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-2.5">
          <div className="icon-box">
            <BarChart3 size={13} />
          </div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Analíticas del sistema</h2>
        </div>
      </div>

      <div className="card-body">
        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Salud media', value: `${(stats.avgScore * 10).toFixed(0)}%`, icon: <Activity size={14} /> },
            { label: 'Entradas',    value: stats.total,                            icon: <ShieldCheck size={14} /> },
            { label: 'Ratio óptimo', value: `${stats.strongPercentage.toFixed(0)}%`, icon: <TrendingUp size={14} /> },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-lg"
              style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--text-muted)' }}>
                {stat.icon}
                <span className="text-xs font-medium uppercase tracking-wide">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Distribución */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="label-section mb-0">Distribución de seguridad</span>
            <div className="flex gap-4 text-xs font-medium">
              <span style={{ color: 'var(--success)' }}>{stats.strongCount} Fuerte</span>
              <span style={{ color: 'var(--warning)' }}>{stats.mediumCount} Media</span>
              <span style={{ color: 'var(--danger)' }}>{stats.weakCount} Débil</span>
            </div>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden flex" style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}>
            <div className="h-full transition-all duration-700" style={{ width: `${stats.distribution.weak}%`,   background: 'var(--danger)' }} />
            <div className="h-full transition-all duration-700" style={{ width: `${stats.distribution.medium}%`, background: 'var(--warning)' }} />
            <div className="h-full transition-all duration-700" style={{ width: `${stats.distribution.strong}%`, background: 'var(--success)' }} />
          </div>
        </div>

        <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Las analíticas se procesan localmente usando el historial de la sesión actual. La métrica de salud representa la entropía criptográfica de las contraseñas generadas.
        </p>
      </div>
    </div>
  )
}

export default AnalyticsPanel
