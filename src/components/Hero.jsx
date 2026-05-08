import { ShieldCheck, Server } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-28 pb-14 bg-white border-b border-slate-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 border-l border-slate-100" />
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-8">
            <ShieldCheck size={12} strokeWidth={3} />
            Certified Security Protocol v4.2
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase">
            Gestión Centralizada <br />
            <span className="text-slate-400">de Seguridad Local.</span>
          </h1>

          <p className="text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed font-medium mb-10">
            Plataforma técnica diseñada para la generación, auditoría y análisis de credenciales. 
            Arquitectura de procesamiento aislado para garantizar la integridad absoluta de los datos.
          </p>

          <div className="flex items-center gap-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Server size={14} />
              Local Instance: Running
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-200" />
              API Status: Restricted
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
