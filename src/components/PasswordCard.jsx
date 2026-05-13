import { useState } from 'react'
import { Copy, RefreshCw, Lock, Check, Activity } from 'lucide-react'

const getScoreColor = (score) => {
  if (score >= 8) return 'var(--success)';
  if (score >= 4) return 'var(--warning)';
  return 'var(--danger)';
};

const getScoreBg = (score) => {
  if (score >= 8) return 'var(--success-light)';
  if (score >= 4) return 'var(--warning-light)';
  return 'var(--danger-light)';
};

const getLevelLabel = (level) => {
  if (level === 'STRONG') return 'Fuerte';
  if (level === 'MEDIUM') return 'Media';
  return 'Débil';
};

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
        <div className="flex items-center gap-2.5">
          <div className="icon-box">
            <Lock size={13} />
          </div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Generador</h2>
        </div>
        <button
          onClick={onGenerate}
          disabled={isSaving}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <RefreshCw size={12} className={isSaving ? 'animate-spin' : ''} />
          {isSaving ? 'Guardando...' : 'Nueva'}
        </button>
      </div>

      <div className="card-body space-y-6">

        {/* Área de contraseña */}
        <div className="relative">
          <div
            className="w-full px-4 py-5 rounded-lg font-mono text-base tracking-wider leading-relaxed min-h-[72px] flex items-center"
            style={{
              background: 'var(--surface-3)',
              border: '1px solid var(--border)',
              color: password ? 'var(--text-primary)' : 'var(--text-muted)',
              wordBreak: 'break-all'
            }}
          >
            {password || '•••• •••• •••• ••••'}
          </div>

          {password && (
            <button
              onClick={handleCopy}
              disabled={isSaving}
              className="absolute right-2.5 top-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
              style={{
                background: copied ? 'var(--success)' : 'var(--surface)',
                color: copied ? '#fff' : 'var(--text-primary)',
                border: `1px solid ${copied ? 'var(--success)' : 'var(--border)'}`,
              }}
            >
              {copied ? <Check size={11} strokeWidth={3} /> : <Copy size={11} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          )}
        </div>

        {/* Puntuación de seguridad */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="label-section mb-0">Puntuación</span>
            {analysis && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-md"
                style={{
                  background: getScoreBg(analysis.score),
                  color: getScoreColor(analysis.score),
                }}
              >
                {getLevelLabel(analysis.level)} · {Math.round(analysis.score * 10)}%
              </span>
            )}
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(analysis?.score || 0) * 10}%`,
                background: getScoreColor(analysis?.score || 0),
              }}
            />
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Entropía', value: analysis ? `${analysis.entropy} bits` : '—', icon: <Activity size={12} /> },
            { label: 'Estándar', value: 'AES-256', icon: <Lock size={12} /> },
          ].map((item, idx) => (
            <div key={idx} className="metric-block">
              <div className="flex items-center gap-1.5 mb-1.5" style={{ color: 'var(--text-muted)' }}>
                {item.icon}
                <p className="label-tech mb-0">{item.label}</p>
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onGenerate}
          disabled={isSaving}
          className="btn-primary w-full"
        >
          {isSaving ? 'Procesando...' : 'Generar nueva contraseña'}
        </button>
      </div>
    </div>
  )
}

export default PasswordCard
