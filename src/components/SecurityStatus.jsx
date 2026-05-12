import React from 'react';

const SecurityStatus = () => {
  const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';

  const statusItems = [
    { label: "AES-256-GCM", active: true },
    { label: "SSL/TLS", active: isSecure },
    { label: "Local Analysis", active: true },
    { label: "Zero-Knowledge", active: true }
  ];

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {statusItems.map((item, i) => (
        <span 
          key={i} 
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono border transition-all ${
            item.active 
              ? 'border-blue-500/20 bg-blue-500/5 text-blue-400' 
              : 'border-amber-500/20 bg-amber-500/5 text-amber-400'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-blue-500' : 'bg-amber-500 animate-pulse'}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default SecurityStatus;
