import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react'

const SecurityBadges = () => {
  const badges = [
    { icon: <ShieldCheck size={16} />, title: "Local Isolation", desc: "Operations are isolated locally." },
    { icon: <Lock size={16} />, title: "AES-256-GCM", desc: "Authenticated encryption." },
    { icon: <EyeOff size={16} />, title: "Zero Knowledge", desc: "No data is shared in plaintext." },
    { icon: <Server size={16} />, title: "Secure Sync", desc: "End-to-end encrypted backup." },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {badges.map((badge, idx) => (
        <div
          key={idx}
          className="p-6 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.02] transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.05] flex items-center justify-center text-slate-500 mb-4">
            {badge.icon}
          </div>
          <h3 className="text-[13px] font-bold text-white mb-1.5">{badge.title}</h3>
          <p className="text-[12px] text-slate-600 leading-relaxed font-medium">{badge.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default SecurityBadges
