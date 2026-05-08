import { Shield, Terminal } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-8 h-14 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white shadow-sm">
              <Shield size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[11px] font-black tracking-[0.15em] text-slate-900 uppercase leading-none">
                AI SECURE
              </h1>
              <span className="text-[8px] uppercase tracking-[0.25em] text-slate-400 font-black mt-0.5">
                Enterprise Vault
              </span>
            </div>
          </div>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="hidden lg:flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <Terminal size={12} />
            Node: 01_Isolated
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-50/50 border border-emerald-100 text-[9px] font-black text-emerald-700 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Encryption Active
          </div>
          
          <div className="flex items-center gap-6">
            <button className="nav-link">Security</button>
            <button className="nav-link">Audit</button>
            <button className="btn-primary">
              Control Panel
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
