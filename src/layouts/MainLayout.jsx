import Navbar from '../components/Navbar'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <footer className="border-t border-border bg-card/50 py-8 mt-20">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm text-slate-500">
          <p>© 2024 AI Secure Password Manager · Proyecto ASIX</p>
          <p className="space-x-4">
            <span>React</span>
            <span>Vite</span>
            <span>Tailwind</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
