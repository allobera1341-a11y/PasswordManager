import Navbar from '../components/Navbar'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t border-white/5 bg-black py-12 mt-20">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-slate-600 font-medium">
          <p>© 2026 AI SECURE · Enterprise Identity Protection Platform</p>
          <div className="flex items-center gap-8">
            <span className="hover:text-white transition-colors cursor-pointer">Documentation</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security Standards</span>
            <span className="hover:text-white transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
