import { Settings } from 'lucide-react'
import { SECURITY_MODES } from '../utils/passwordGenerator'

const modeLabels = {
  STANDARD: 'Estándar',
  HIGH: 'Alta',
  MAXIMUM: 'Máxima',
};

const toggleOptions = [
  { id: 'useNumbers', label: 'Números' },
  { id: 'useSymbols', label: 'Símbolos' },
  { id: 'useUpper', label: 'Mayúsculas' },
  { id: 'excludeAmbiguous', label: 'Sin ambiguos' },
];

const PasswordOptions = ({ config, setConfig }) => {
  const modes = ['STANDARD', 'HIGH', 'MAXIMUM'];

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
      excludeAmbiguous: config.excludeAmbiguous,
    });
  };

  return (
    <div className="card-base">
      <div className="card-header">
        <div className="flex items-center gap-2.5">
          <div className="icon-box">
            <Settings size={13} />
          </div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Configuración</h2>
        </div>
      </div>

      <div className="card-body space-y-6">

        {/* Presets de seguridad */}
        <div>
          <label className="label-section">Nivel de seguridad</label>
          <div
            className="grid grid-cols-3 gap-1 p-1 rounded-lg"
            style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}
          >
            {modes.map((modeId) => (
              <button
                key={modeId}
                onClick={() => applyMode(modeId)}
                className="py-1.5 px-2 rounded-md text-xs font-semibold transition-all"
                style={{
                  background: config.mode === modeId ? 'var(--surface)' : 'transparent',
                  color: config.mode === modeId ? 'var(--accent)' : 'var(--text-muted)',
                  boxShadow: config.mode === modeId ? 'var(--shadow-sm)' : 'none',
                  border: config.mode === modeId ? '1px solid var(--border)' : '1px solid transparent',
                }}
              >
                {modeLabels[modeId]}
              </button>
            ))}
          </div>
        </div>

        {/* Slider de longitud */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <div className="flex justify-between items-center mb-3">
            <label className="label-section mb-0">Longitud</label>
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{config.length}</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={config.length}
            onChange={(e) => updateConfig('length', parseInt(e.target.value))}
            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
            style={{ background: 'var(--border)' }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>8</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>64</span>
          </div>
        </div>

        {/* Toggles */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <label className="label-section">Opciones</label>
          <div className="grid grid-cols-2 gap-2">
            {toggleOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateConfig(opt.id, !config[opt.id])}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
                style={{
                  background: config[opt.id] ? 'var(--accent-light)' : 'var(--surface-3)',
                  border: `1px solid ${config[opt.id] ? '#bfdbfe' : 'var(--border)'}`,
                  color: config[opt.id] ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                <span>{opt.label}</span>
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: config[opt.id] ? 'var(--accent)' : 'var(--border-strong)' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordOptions
