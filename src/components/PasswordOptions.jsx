import { Settings, Shield, Zap, Lock } from 'lucide-react'
import { SECURITY_MODES } from '../utils/passwordGenerator'

const PasswordOptions = ({ config, setConfig }) => {
  const modes = [
    { id: 'STANDARD', label: 'Standard' },
    { id: 'HIGH', label: 'High' },
    { id: 'MAXIMUM', label: 'Max' },
  ];

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const applyMode = (modeId) => {
    const mode = SECURITY_MODES[modeId];
    setConfig({
      mode: modeId,
      length: mode.length,
      useNumbers: mode.numbers,
      useSymbols: mode.symbols,
      useUpper: true,
      excludeAmbiguous: config.excludeAmbiguous
    });
  };

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center border border-white/10">
            <Settings size={14} className="text-slate-400" />
          </div>
          <h2 className="text-[14px] font-bold text-white tracking-tight">Configuration</h2>
        </div>
      </div>

      <div className="card-body space-y-8">
        
        {/* Simple Mode Toggle */}
        <div className="space-y-3">
          <label className="label-section text-[10px]">Security Preset</label>
          <div className="grid grid-cols-3 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => applyMode(m.id)}
                className={`py-2 px-3 rounded-lg text-[12px] font-bold border transition-all ${
                  config.mode === m.id 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4 pt-4 border-t border-white/[0.05]">
          <div className="flex justify-between items-center mb-1">
            <label className="label-section text-[10px]">Length</label>
            <span className="text-[13px] font-bold text-white">{config.length}</span>
          </div>
          <input 
            type="range" 
            min="8" 
            max="64" 
            value={config.length}
            onChange={(e) => updateConfig('length', parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Toggles Grid */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/[0.05]">
          {[
            { id: 'useNumbers', label: 'Numbers' },
            { id: 'useSymbols', label: 'Symbols' },
            { id: 'useUpper', label: 'Uppercase' },
            { id: 'excludeAmbiguous', label: 'Simple Chars' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateConfig(opt.id, !config[opt.id])}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                config[opt.id] 
                  ? 'bg-white/[0.03] border-white/10 text-white' 
                  : 'bg-transparent border-white/5 text-slate-600'
              }`}
            >
              <span className="text-[12px] font-medium">{opt.label}</span>
              <div className={`w-2 h-2 rounded-full ${config[opt.id] ? 'bg-blue-500' : 'bg-slate-800'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PasswordOptions
