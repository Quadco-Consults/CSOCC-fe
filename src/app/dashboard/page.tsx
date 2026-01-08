// src/app/(dashboard)/page.tsx

import { MetricsCards } from '@/components/dashboard/MetricsCards'
import { IncidentMap } from '@/components/dashboard/IncidentMap'
import { IncidentFeed } from '@/components/dashboard/IncidentFeed'
import { HotspotWidget } from '@/components/dashboard/HotspotWidget'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { mockMetrics } from '@/data/mockData'

export default function CommandCenterDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Command Center Overview
        </h1>
        <p className="text-gray-600">
          Real-time monitoring and response coordination for Nigeria's livestock security
        </p>
      </div>

      {/* Metrics Row */}
      <MetricsCards metrics={mockMetrics} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map and Incident Feed - Takes 2 columns */}
        <div className="xl:col-span-2 space-y-6">
          {/* Interactive Map */}
          <IncidentMap />

          {/* Recent Incidents Feed */}
          <IncidentFeed />
        </div>

        {/* Sidebar Widgets - Takes 1 column */}
        <div className="space-y-6">
          {/* Hotspots */}
          <HotspotWidget />

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  )
}