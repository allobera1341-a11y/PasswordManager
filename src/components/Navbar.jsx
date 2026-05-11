import { Shield, Lock, Settings } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
      <div className="container mx-auto px-8 h-16 flex items-center justify-between">
        
        {/* Simple Brand */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-all group-hover:bg-blue-500">
            <Shield size={16} className="text-black group-hover:text-white" strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-white tracking-tight">AI SECURE</span>
            <span className="text-[10px] font-medium text-slate-600 border border-white/[0.1] px-1.5 rounded uppercase tracking-tighter">v5.0</span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-[13px] font-medium text-slate-500 hover:text-white transition-colors">Vault</a>
          <a href="#" className="text-[13px] font-medium text-slate-500 hover:text-white transition-colors">Audit Trail</a>
          <a href="#" className="text-[13px] font-medium text-slate-500 hover:text-white transition-colors">Documentation</a>
          <div className="w-px h-4 bg-white/10 mx-2" />
          <button className="flex items-center gap-2 text-[13px] font-bold text-slate-300 hover:text-white transition-colors">
            <Settings size={14} />
            Settings
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
