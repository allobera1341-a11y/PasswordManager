import { Shield, Lock, Activity } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-8">
        <div className="max-w-3xl">
          {/* Simple Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[11px] font-bold tracking-tight">
            <Shield size={12} strokeWidth={2.5} />
            <span>Phase 5 Production Ready</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Secure Credential Management. <br />
            <span className="text-slate-500">Simple, local and intelligent.</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
            A minimalist vault for generating and analyzing passwords. 
            Designed with a zero-knowledge architecture to keep your data private and local.
          </p>

          <div className="flex items-center gap-8 py-6 border-t border-white/[0.05]">
            <div className="flex items-center gap-2.5">
              <Lock size={14} className="text-slate-600" />
              <span className="text-[13px] font-medium text-slate-400">AES-256 Hashing</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Activity size={14} className="text-slate-600" />
              <span className="text-[13px] font-medium text-slate-400">Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
