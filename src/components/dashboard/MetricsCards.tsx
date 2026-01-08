// src/components/dashboard/MetricsCards.tsx

import { DashboardMetrics } from '@/types'
import { formatDuration } from '@/lib/utils'

interface MetricsCardsProps {
  metrics: DashboardMetrics
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: 'Active Incidents',
      value: metrics.activeIncidents,
      icon: '📋',
      color: 'bg-blue-500',
      change: '+3 since yesterday',
      trend: 'up'
    },
    {
      title: 'Critical',
      value: metrics.criticalCount,
      icon: '🚨',
      color: 'bg-red-500',
      change: '+2 since yesterday',
      trend: 'up'
    },
    {
      title: 'Warning',
      value: metrics.warningCount,
      icon: '⚠️',
      color: 'bg-yellow-500',
      change: '+1 since yesterday',
      trend: 'up'
    },
    {
      title: 'Resolved Today',
      value: metrics.resolvedToday,
      icon: '✅',
      color: 'bg-green-500',
      change: '+7 since yesterday',
      trend: 'up'
    },
    {
      title: 'Avg Response Time',
      value: formatDuration(metrics.avgResponseTime),
      icon: '⏱️',
      color: 'bg-purple-500',
      change: '-2min improvement',
      trend: 'down'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card.color}`}>
              <span className="text-white text-xl">{card.icon}</span>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              card.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {card.trend === 'up' ? '↗️' : '↙️'}
            </div>
          </div>

          {/* Value */}
          <div className="mb-2">
            <div className="text-2xl font-bold text-gray-900">
              {card.value}
            </div>
            <div className="text-sm font-medium text-gray-600">
              {card.title}
            </div>
          </div>

          {/* Change */}
          <div className={`text-xs ${
            card.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {card.change}
          </div>
        </div>
      ))}
    </div>
  )
}