import { Shield, Settings, LogOut, User as UserIcon, LogIn } from 'lucide-react'
import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'

const Navbar = ({ user, onLoginClick }) => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
      <div className="container mx-auto px-8 h-16 flex items-center justify-between">
        
        {/* Simple Brand */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-all group-hover:bg-blue-500">
            <Shield size={16} className="text-black group-hover:text-white" strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-white tracking-tight uppercase">AI SECURE</span>
            <span className="text-[10px] font-medium text-slate-600 border border-white/[0.1] px-1.5 rounded uppercase tracking-tighter">v5.0</span>
          </div>
        </div>

        {/* Auth & Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
                  <UserIcon size={12} className="text-blue-500" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-[11px] font-bold text-white leading-none">{user.displayName || 'Authorized Agent'}</span>
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Live Sync Active</span>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-[12px] font-bold text-white hover:bg-white/10 transition-all active:scale-95"
            >
              <LogIn size={14} className="text-blue-500" />
              Sign In to Persist
            </button>
          )}

          <div className="flex items-center gap-6">
            {user && (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-[12px] font-bold text-slate-500 hover:text-rose-500 transition-colors"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            
            <button className="flex items-center gap-2 text-[13px] font-bold text-slate-300 hover:text-white transition-colors">
              <Settings size={14} />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
