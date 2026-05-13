import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const OfflineWarning = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[110]">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: 'var(--surface)',
          border: '1px solid #ffc9c9',
          borderLeft: '3px solid var(--danger)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <WifiOff size={16} style={{ color: 'var(--danger)', flexShrink: 0 }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Sin conexión</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sincronización en pausa</p>
        </div>
      </div>
    </div>
  );
};

export default OfflineWarning;
