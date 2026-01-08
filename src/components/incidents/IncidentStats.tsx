// src/components/incidents/IncidentStats.tsx

import { mockIncidents } from '@/data/mockData'

export function IncidentStats() {
  const stats = {
    total: mockIncidents.length,
    critical: mockIncidents.filter(i => i.priority === 'critical').length,
    warning: mockIncidents.filter(i => i.priority === 'warning').length,
    resolved: mockIncidents.filter(i => i.status === 'resolved').length,
    unassigned: mockIncidents.filter(i => !i.assignedTo).length,
    today: mockIncidents.filter(i => {
      const today = new Date()
      const incidentDate = new Date(i.reportedAt)
      return incidentDate.toDateString() === today.toDateString()
    }).length
  }

  const cards = [
    {
      title: 'Total Incidents',
      value: stats.total,
      icon: '📋',
      color: 'bg-blue-100 text-blue-800',
      change: '+3 today'
    },
    {
      title: 'Critical',
      value: stats.critical,
      icon: '🚨',
      color: 'bg-red-100 text-red-800',
      change: '+2 since yesterday'
    },
    {
      title: 'Warning',
      value: stats.warning,
      icon: '⚠️',
      color: 'bg-yellow-100 text-yellow-800',
      change: '+1 since yesterday'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: '✅',
      color: 'bg-green-100 text-green-800',
      change: '+5 today'
    },
    {
      title: 'Unassigned',
      value: stats.unassigned,
      icon: '📢',
      color: 'bg-purple-100 text-purple-800',
      change: 'Needs attention'
    },
    {
      title: 'Reported Today',
      value: stats.today,
      icon: '📅',
      color: 'bg-indigo-100 text-indigo-800',
      change: 'Current day'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{card.icon}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${card.color}`}>
              {card.value}
            </span>
          </div>

          <div className="text-sm font-medium text-gray-900 mb-1">
            {card.title}
          </div>

          <div className="text-xs text-gray-500">
            {card.change}
          </div>
        </div>
      ))}
    </div>
  )
}