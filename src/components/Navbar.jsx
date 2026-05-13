import { Shield, LogOut, User as UserIcon, LogIn } from 'lucide-react'
import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'

const Navbar = ({ user, onLoginClick }) => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">

        {/* Marca */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--accent)' }}
          >
            <Shield size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            AI Secure
          </span>
          <span
            className="text-xs font-medium px-1.5 py-0.5 rounded"
            style={{ background: 'var(--surface-3)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            v5.0
          </span>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                  <UserIcon size={12} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
                    {user.displayName || 'Usuario'}
                  </span>
                  <span className="text-[10px] leading-none mt-0.5 font-medium" style={{ color: 'var(--success)' }}>
                    Sincronización activa
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.borderColor = '#ffc9c9'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ background: 'var(--accent)', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
            >
              <LogIn size={14} />
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
