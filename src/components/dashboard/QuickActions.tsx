// src/components/dashboard/QuickActions.tsx

import { Button } from '@/components/ui/button'

export function QuickActions() {
  const actions = [
    {
      title: 'Generate Briefing',
      description: 'Create daily operations report',
      icon: '📄',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Generate briefing')
    },
    {
      title: 'Deploy Team',
      description: 'Quick team deployment',
      icon: '🚁',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Deploy team')
    },
    {
      title: 'Emergency Alert',
      description: 'Broadcast emergency message',
      icon: '🚨',
      color: 'bg-red-500 hover:bg-red-600',
      action: () => console.log('Emergency alert')
    },
    {
      title: 'System Status',
      description: 'Check system health',
      icon: '⚙️',
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('System status')
    }
  ]

  const systemStats = [
    { label: 'Uptime', value: '99.9%', status: 'good' },
    { label: 'Response Teams', value: '24/26', status: 'good' },
    { label: 'Mobile Apps', value: '156', status: 'good' },
    { label: 'Data Sync', value: 'Live', status: 'good' }
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900">
              Quick Actions
            </h2>
            <p className="text-sm text-gray-600">
              Common operations
            </p>
          </div>
          <div className="text-2xl">⚡</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-4 rounded-lg text-white text-left transition-colors ${action.color}`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="font-medium text-sm mb-1">{action.title}</div>
              <div className="text-xs opacity-90">{action.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900">
              System Health
            </h2>
            <p className="text-sm text-gray-600">
              Real-time status
            </p>
          </div>
          <div className="flex items-center text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>

        <div className="space-y-3">
          {systemStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="text-sm font-medium text-gray-700">{stat.label}</div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                <div className={`w-2 h-2 rounded-full ${
                  stat.status === 'good' ? 'bg-green-500' :
                  stat.status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full">
            View Detailed Status →
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-600">
              Last 30 minutes
            </p>
          </div>
          <div className="text-2xl">🕐</div>
        </div>

        <div className="space-y-3">
          {[
            { time: '2 min ago', event: 'Team Alpha deployed to Benue', type: 'deployment' },
            { time: '5 min ago', event: 'New incident reported in Plateau', type: 'incident' },
            { time: '12 min ago', event: 'INC-2024-045 marked as resolved', type: 'resolution' },
            { time: '18 min ago', event: 'Daily briefing generated', type: 'system' },
            { time: '25 min ago', event: 'Emergency alert acknowledged', type: 'alert' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'incident' ? 'bg-red-500' :
                activity.type === 'deployment' ? 'bg-blue-500' :
                activity.type === 'resolution' ? 'bg-green-500' :
                activity.type === 'alert' ? 'bg-yellow-500' :
                'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">{activity.event}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="ghost" size="sm" className="w-full">
            View Activity Log →
          </Button>
        </div>
      </div>
    </div>
  )
}