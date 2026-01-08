// src/components/intelligence/AlertsPanel.tsx

'use client'

import { useState } from 'react'
import { mockAlerts } from '@/data/mockData'
import { formatRelativeTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function AlertsPanel() {
  const [filter, setFilter] = useState<'all' | 'high' | 'unacknowledged'>('all')

  const filteredAlerts = mockAlerts.filter(alert => {
    switch (filter) {
      case 'high':
        return alert.severity === 'high'
      case 'unacknowledged':
        return !alert.acknowledged
      default:
        return true
    }
  })

  const handleAcknowledge = (alertId: string) => {
    console.log('Acknowledging alert:', alertId)
  }

  const severityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-green-200 bg-green-50',
  }

  const severityIcons = {
    movement: '🚛',
    buffer_zone: '🚧',
    seasonal: '🌦️',
    pattern: '📊',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900">
              Active Alerts
            </h2>
            <p className="text-sm text-gray-600">
              Early warning system notifications
            </p>
          </div>
          <Button size="sm" variant="outline">
            Configure Alerts
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          {[
            { key: 'all', label: 'All Alerts', count: mockAlerts.length },
            { key: 'high' as const, label: 'High Severity', count: mockAlerts.filter(a => a.severity === 'high').length },
            { key: 'unacknowledged' as const, label: 'Unacknowledged', count: mockAlerts.filter(a => !a.acknowledged).length },
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

      {/* Alerts List */}
      <div className="p-6">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🕊️</div>
            <div className="text-gray-500">No alerts match the current filter</div>
            <div className="text-xs text-gray-400 mt-1">All systems operating normally</div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  alert.acknowledged
                    ? 'border-gray-200 bg-gray-50 opacity-75'
                    : severityColors[alert.severity]
                } ${alert.severity === 'high' && !alert.acknowledged ? 'animate-pulse' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Alert Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        alert.severity === 'high' ? 'bg-red-100' :
                        alert.severity === 'medium' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                        {severityIcons[alert.type]}
                      </div>
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {alert.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.severity} priority
                        </span>
                        {alert.acknowledged && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            ✓ Acknowledged
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-700 mb-2">
                        {alert.message}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-1">⏰</span>
                          {formatRelativeTime(alert.timestamp)}
                        </div>

                        {alert.location && (
                          <div className="flex items-center">
                            <span className="mr-1">📍</span>
                            Alert location
                          </div>
                        )}

                        <div className="flex items-center">
                          <span className="mr-1">🏷️</span>
                          {alert.type.replace('_', ' ')}
                        </div>
                      </div>

                      {alert.acknowledged && (
                        <div className="mt-2 text-xs text-gray-500">
                          Acknowledged by {alert.acknowledgedBy} {alert.acknowledgedAt && `• ${formatRelativeTime(alert.acknowledgedAt)}`}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 ml-4">
                    {!alert.acknowledged ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleAcknowledge(alert.id)}
                          className="bg-fmld-green hover:bg-fmld-green-dark"
                        >
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Statistics */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-600">
              {mockAlerts.filter(a => a.severity === 'high' && !a.acknowledged).length}
            </div>
            <div className="text-xs text-gray-600">High Priority Pending</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {mockAlerts.filter(a => a.severity === 'medium').length}
            </div>
            <div className="text-xs text-gray-600">Medium Priority</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {mockAlerts.filter(a => a.acknowledged).length}
            </div>
            <div className="text-xs text-gray-600">Acknowledged</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {Math.round((mockAlerts.filter(a => a.acknowledged).length / mockAlerts.length) * 100)}%
            </div>
            <div className="text-xs text-gray-600">Response Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}