// src/app/(dashboard)/incidents/page.tsx

import { IncidentTable } from '@/components/incidents/IncidentTable'
import { IncidentFilters } from '@/components/incidents/IncidentFilters'
import { IncidentStats } from '@/components/incidents/IncidentStats'
import { Button } from '@/components/ui/button'

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Incident Management
          </h1>
          <p className="text-gray-600">
            Monitor, assign, and track all security incidents across Nigeria
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline">
            Export Report
          </Button>
          <Button>
            + New Incident
          </Button>
        </div>
      </div>

      {/* Statistics Overview */}
      <IncidentStats />

      {/* Filters and Search */}
      <IncidentFilters />

      {/* Incidents Table */}
      <IncidentTable />
    </div>
  )
}