import { useState } from 'react';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Shield, Loader2, X } from 'lucide-react';

const Login = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err) {
      console.error('Error de autenticación:', err.code, err.message);
      const msg =
        err.code === 'auth/popup-closed-by-user'    ? 'La ventana emergente fue cerrada. Inténtalo de nuevo.' :
        err.code === 'auth/popup-blocked'            ? 'Ventana bloqueada por el navegador. Permite las ventanas emergentes.' :
        err.code === 'auth/cancelled-popup-request'  ? 'Solicitud cancelada. Inténtalo de nuevo.' :
        err.code === 'auth/network-request-failed'   ? 'Error de red. Comprueba tu conexión.' :
        err.code === 'auth/unauthorized-domain'      ? 'Dominio no autorizado en Firebase Console.' :
        `Error de autenticación: ${err.code || err.message}`;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 login-backdrop"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full login-card-enter"
        style={{ maxWidth: '380px' }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Cabecera del modal */}
          <div
            className="px-8 py-5 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <Shield size={14} className="text-white" />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Acceso al vault
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <X size={15} />
            </button>
          </div>

          {/* Cuerpo */}
          <div className="px-8 py-10 flex flex-col items-center text-center gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Iniciar sesión
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Autentícate para guardar y sincronizar tus contraseñas en la nube.
              </p>
            </div>

            {/* Botón de Google */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = 'var(--surface-3)')}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} style={{ color: 'var(--text-muted)' }} />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              {loading ? 'Autenticando...' : 'Continuar con Google'}
            </button>

            {error && (
              <div
                className="w-full p-3 rounded-lg text-sm text-left"
                style={{
                  background: 'var(--danger-light)',
                  border: '1px solid #ffc9c9',
                  color: 'var(--danger)',
                }}
              >
                {error}
              </div>
            )}

            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Al iniciar sesión aceptas que tus contraseñas se almacenarán cifradas en la nube.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
