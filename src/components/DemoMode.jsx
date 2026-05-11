import { Database, Zap } from 'lucide-react'

const DemoMode = ({ onPopulate }) => {
  return (
    <div className="card-base border-blue-500/10 bg-blue-500/[0.02]">
      <div className="card-body flex flex-col md:flex-row items-center justify-between gap-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Zap size={16} className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-white tracking-tight">Demo Controller</h3>
            <p className="text-[11px] text-slate-500 font-medium">Quickly populate the vault with simulation data.</p>
          </div>
        </div>

        <button
          onClick={onPopulate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-[13px] font-bold hover:bg-blue-500 transition-all active:scale-95"
        >
          <Database size={14} />
          Initialize Simulation
        </button>
      </div>
    </div>
  )
}

export default DemoMode
