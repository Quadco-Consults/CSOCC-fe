// src/components/dashboard/IncidentFeed.tsx

'use client'

import { useState } from 'react'
import { mockIncidents } from '@/data/mockData'
import { INCIDENT_TYPES, STATUS_COLORS } from '@/lib/constants'
import { formatRelativeTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function IncidentFeed() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'active'>('all')

  const filteredIncidents = mockIncidents.filter(incident => {
    switch (filter) {
      case 'critical':
        return incident.priority === 'critical'
      case 'warning':
        return incident.priority === 'warning'
      case 'active':
        return incident.status !== 'resolved'
      default:
        return true
    }
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900">
              Recent Incidents
            </h2>
            <p className="text-sm text-gray-600">
              Latest reports from across Nigeria
            </p>
          </div>
          <Button size="sm" variant="outline">
            View All →
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          {[
            { key: 'all', label: 'All', count: mockIncidents.length },
            { key: 'critical' as const, label: 'Critical', count: mockIncidents.filter(i => i.priority === 'critical').length },
            { key: 'warning' as const, label: 'Warning', count: mockIncidents.filter(i => i.priority === 'warning').length },
            { key: 'active' as const, label: 'Active', count: mockIncidents.filter(i => i.status !== 'resolved').length },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === key
                  ? 'bg-fmld-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Incident List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredIncidents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No incidents match the current filter
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredIncidents.slice(0, 10).map((incident) => (
              <div
                key={incident.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  {/* Incident Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg ${
                      incident.priority === 'critical' ? 'bg-red-500' :
                      incident.priority === 'warning' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      {INCIDENT_TYPES[incident.type].icon}
                    </div>
                  </div>

                  {/* Incident Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {incident.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(incident.reportedAt)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {incident.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Location */}
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="mr-1">📍</span>
                          {incident.locationName}, {incident.state}
                        </div>

                        {/* Reporter */}
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="mr-1">👤</span>
                          {incident.reportedBy}
                        </div>
                      </div>

                      {/* Status and Priority */}
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[incident.status]}`}>
                          {incident.status.replace('_', ' ')}
                        </span>

                        {incident.priority === 'critical' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                            🚨 URGENT
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Assigned Team */}
                    {incident.assignedTo && (
                      <div className="mt-2 flex items-center text-xs text-gray-600">
                        <span className="mr-1">👥</span>
                        Assigned to: <span className="font-medium ml-1">{incident.assignedTo}</span>
                        {incident.assignedAt && (
                          <span className="ml-2 text-gray-500">
                            ({formatRelativeTime(incident.assignedAt)})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Evidence Count */}
                    {incident.evidence.length > 0 && (
                      <div className="mt-2 flex items-center text-xs text-blue-600">
                        <span className="mr-1">📎</span>
                        {incident.evidence.length} evidence file(s) attached
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                        Assign
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredIncidents.length > 10 && (
        <div className="p-4 border-t border-gray-200 text-center">
          <Button variant="ghost" size="sm">
            Load More Incidents ({filteredIncidents.length - 10} remaining)
          </Button>
        </div>
      )}
    </div>
  )
}