import { useEffect } from 'react'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-8 right-8 z-[200] toast-enter">
      <div
        className="relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-xl"
        style={{
          background: 'var(--surface)',
          border: `1px solid ${isSuccess ? '#b2f2bb' : '#ffc9c9'}`,
          borderLeft: `4px solid ${isSuccess ? 'var(--success)' : 'var(--danger)'}`,
          boxShadow: 'var(--shadow-lg)',
          minWidth: '300px',
          maxWidth: '380px',
        }}
      >
        {/* Barra de progreso */}
        <div
          className="absolute bottom-0 left-0 h-0.5"
          style={{
            width: '100%',
            background: isSuccess ? 'var(--success)' : 'var(--danger)',
            animation: 'shrink 5s linear forwards',
          }}
        />

        {/* Icono */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: isSuccess ? 'var(--success-light)' : 'var(--danger-light)',
            color: isSuccess ? 'var(--success)' : 'var(--danger)',
          }}
        >
          {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
        </div>

        {/* Texto */}
        <div className="flex-grow">
          <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-muted)' }}>
            {isSuccess ? 'Operación completada' : 'Alerta'}
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{message}</p>
        </div>

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="p-1 rounded-md transition-colors flex-shrink-0"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

export default Toast
