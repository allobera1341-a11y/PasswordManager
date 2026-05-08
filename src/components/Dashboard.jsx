import PasswordCard from './PasswordCard'
import SecurityPanel from './SecurityPanel'
import HistoryPanel from './HistoryPanel'
import SecurityBadges from './SecurityBadges'

const Dashboard = ({ password, analysis, history, onGenerate, isSaving }) => {
  return (
    <section className="container mx-auto px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <PasswordCard 
            password={password} 
            onGenerate={onGenerate}
            analysis={analysis}
            isSaving={isSaving}
          />
          <SecurityPanel analysis={analysis} />
          
          {/* New Phase 3 Component */}
          <SecurityBadges />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 h-full">
          <HistoryPanel history={history} />
        </div>

      </div>
    </section>
  )
}

export default Dashboard
