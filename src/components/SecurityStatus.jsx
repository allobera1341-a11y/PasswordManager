const SecurityStatus = () => {
  const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';

  const statusItems = [
    { label: 'AES-256-GCM', active: true },
    { label: 'SSL/TLS', active: isSecure },
    { label: 'Análisis local', active: true },
    { label: 'Conocimiento cero', active: true },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statusItems.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium"
          style={{
            background: item.active ? 'var(--accent-light)' : 'var(--warning-light)',
            color: item.active ? 'var(--accent)' : 'var(--warning)',
            border: `1px solid ${item.active ? '#bfdbfe' : '#ffd8a8'}`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: item.active ? 'var(--accent)' : 'var(--warning)' }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default SecurityStatus;
