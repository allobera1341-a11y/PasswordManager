import { Lock, Activity, ShieldCheck } from 'lucide-react'
import SecurityStatus from './SecurityStatus'

const Hero = () => {
  return (
    <section className="pt-12 pb-10" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <SecurityStatus />

          <h1 className="text-3xl font-bold mt-4 mb-3 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Gestión segura de contraseñas
          </h1>

          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', maxWidth: '520px' }}>
            Genera y analiza contraseñas con cifrado local AES-256.
            Arquitectura de conocimiento cero para mantener tus datos privados.
          </p>

          <div className="flex items-center gap-6">
            {[
              { icon: <Lock size={13} />, text: 'Cifrado AES-256' },
              { icon: <Activity size={13} />, text: 'Análisis en tiempo real' },
              { icon: <ShieldCheck size={13} />, text: 'Conocimiento cero' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
