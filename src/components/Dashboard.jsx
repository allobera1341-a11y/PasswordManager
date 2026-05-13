import PasswordCard from './PasswordCard'
import SecurityPanel from './SecurityPanel'
import HistoryPanel from './HistoryPanel'
import SecurityBadges from './SecurityBadges'
import SecurityInsights from './SecurityInsights'
import AnalyticsPanel from './AnalyticsPanel'
import PasswordOptions from './PasswordOptions'
import DemoMode from './DemoMode'

const Dashboard = ({
  password, analysis, history, onGenerate,
  isSaving, isAILoading, aiInsights,
  config, setConfig, onPopulateDemo, isGuest
}) => {
  return (
    <section className="container mx-auto px-6 py-10 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Banner de demo */}
        <DemoMode onPopulate={onPopulateDemo} isGuest={isGuest} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Columna principal */}
          <div className="lg:col-span-8 space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="label-section">1. Configuración</h3>
                <PasswordOptions config={config} setConfig={setConfig} />
              </div>
              <div className="space-y-3">
                <h3 className="label-section">2. Generación</h3>
                <PasswordCard
                  password={password}
                  onGenerate={onGenerate}
                  analysis={analysis}
                  isSaving={isSaving}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="label-section">Análisis inteligente</h3>
              <div className="space-y-4">
                <SecurityPanel analysis={analysis} />
                <SecurityInsights insights={aiInsights} isLoading={isAILoading} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="label-section">Analíticas del sistema</h3>
              <AnalyticsPanel history={history} />
            </div>

            <div className="space-y-3">
              <h3 className="label-section">Estándares de seguridad</h3>
              <SecurityBadges />
            </div>
          </div>

          {/* Columna lateral — Auditoría */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-3">
              <h3 className="label-section">Auditoría y verificación</h3>
              <HistoryPanel history={history} isGuest={isGuest} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Dashboard
