import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react'

const badges = [
  { icon: <ShieldCheck size={16} />, title: 'Aislamiento local',    desc: 'Las operaciones se ejecutan íntegramente en el navegador.' },
  { icon: <Lock size={16} />,        title: 'AES-256-GCM',          desc: 'Cifrado autenticado con confidencialidad verificada.' },
  { icon: <EyeOff size={16} />,      title: 'Conocimiento cero',    desc: 'Ningún dato se comparte en texto plano.' },
  { icon: <Server size={16} />,      title: 'Sincronización segura', desc: 'Copia de seguridad cifrada de extremo a extremo.' },
];

const SecurityBadges = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {badges.map((badge, idx) => (
        <div
          key={idx}
          className="p-5 rounded-xl transition-colors"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
            style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            {badge.icon}
          </div>
          <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{badge.title}</h3>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{badge.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default SecurityBadges
