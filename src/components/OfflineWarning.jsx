import { useState, useEffect } from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';

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
    <div className="fixed bottom-28 right-8 z-[110] animate-bounce">
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-xl shadow-2xl">
        <div className="relative">
          <WifiOff size={18} className="text-red-500" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-red-200">Offline Mode</span>
          <span className="text-[10px] text-red-400/80 font-medium leading-none mt-0.5">Cloud sync suspended</span>
        </div>
      </div>
    </div>
  );
};

export default OfflineWarning;
