// src/app/(dashboard)/intelligence/page.tsx

import { AlertsPanel } from '@/components/intelligence/AlertsPanel'
import { HeatMap } from '@/components/intelligence/HeatMap'
import { SeasonalPatterns } from '@/components/intelligence/SeasonalPatterns'
import { MovementTracker } from '@/components/intelligence/MovementTracker'

export default function IntelligencePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Intelligence & Early Warning
        </h1>
        <p className="text-gray-600">
          AI-powered analytics and predictive insights for proactive incident prevention
        </p>
      </div>

      {/* Alerts Panel */}
      <AlertsPanel />

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Heat Map */}
        <HeatMap />

        {/* Movement Tracker */}
        <MovementTracker />
      </div>

      {/* Seasonal Patterns */}
      <SeasonalPatterns />
    </div>
  )
}