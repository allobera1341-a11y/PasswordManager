import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react'

const SecurityBadges = () => {
  const badges = [
    { icon: <ShieldCheck size={14} />, text: "Local Generation", desc: "No network data" },
    { icon: <Lock size={14} />, text: "AES-256 Encrypted", desc: "Zero-knowledge" },
    { icon: <EyeOff size={14} />, text: "No Plaintext", desc: "Secure storage" },
    { icon: <Server size={14} />, text: "Encrypted Cloud", desc: "Firestore backup" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {badges.map((badge, idx) => (
        <div key={idx} className="flex flex-col gap-2 p-4 rounded bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="text-emerald-600">
              {badge.icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">{badge.text}</span>
          </div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight ml-5">
            {badge.desc}
          </p>
        </div>
      ))}
    </div>
  )
}

export default SecurityBadges
