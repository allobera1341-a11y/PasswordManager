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
  config, setConfig, onPopulateDemo
}) => {
  return (
    <section className="container mx-auto px-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Simplified Header Bar */}
        <DemoMode onPopulate={onPopulateDemo} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="label-section">1. Configuration</h3>
                <PasswordOptions config={config} setConfig={setConfig} />
              </div>

              <div className="space-y-4">
                <h3 className="label-section">2. Generation</h3>
                <PasswordCard 
                  password={password} 
                  onGenerate={onGenerate}
                  analysis={analysis}
                  isSaving={isSaving}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="label-section">Intelligent Analysis</h3>
              <div className="grid grid-cols-1 gap-6">
                <SecurityPanel analysis={analysis} />
                <SecurityInsights insights={aiInsights} isLoading={isAILoading} />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="label-section">System Analytics</h3>
              <AnalyticsPanel history={history} />
            </div>

            <div className="space-y-6">
              <h3 className="label-section">Security Standards</h3>
              <SecurityBadges />
            </div>
          </div>

          {/* Side Audit Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <h3 className="label-section">Audit & Verification</h3>
              <HistoryPanel history={history} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Dashboard
