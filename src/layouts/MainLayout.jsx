import Navbar from '../components/Navbar'

const MainLayout = ({ children, user, onLoginClick }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <Navbar user={user} onLoginClick={onLoginClick} />
      <main className="flex-grow">
        {children}
      </main>
      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }} className="py-8 mt-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2026 Password Manager · Gestor de Contraseñas
          </p>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="hover:underline cursor-pointer" style={{ color: 'var(--text-secondary)' }}>Documentación</span>
            <span className="hover:underline cursor-pointer" style={{ color: 'var(--text-secondary)' }}>Seguridad</span>
            <span className="hover:underline cursor-pointer" style={{ color: 'var(--text-secondary)' }}>Soporte</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
