// src/app/dashboard/teams/page.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const teams = [
    {
      id: 'team-alpha',
      name: 'Alpha Response Unit',
      status: 'Active',
      location: 'Makurdi, Benue State',
      members: 8,
      leader: 'Inspector Adamu Hassan',
      specialization: 'Rapid Response',
      lastDeployment: '2 hours ago',
      equipment: ['Patrol Vehicle', 'Communication Radio', 'Emergency Kit'],
      incidents: 23,
      successRate: 89,
      icon: '🚔',
      priority: 'high'
    },
    {
      id: 'team-bravo',
      name: 'Bravo Investigation Team',
      status: 'On Mission',
      location: 'Jos, Plateau State',
      members: 6,
      leader: 'Detective Sarah Musa',
      specialization: 'Investigation & Analysis',
      lastDeployment: '4 hours ago',
      equipment: ['Forensic Kit', 'Camera Equipment', 'Documentation Tools'],
      incidents: 31,
      successRate: 94,
      icon: '🔍',
      priority: 'critical'
    },
    {
      id: 'team-charlie',
      name: 'Charlie Patrol Unit',
      status: 'Standby',
      location: 'Kaduna, Kaduna State',
      members: 10,
      leader: 'Sergeant Ibrahim Yusuf',
      specialization: 'Area Patrol & Prevention',
      lastDeployment: '1 day ago',
      equipment: ['Motorcycles', 'GPS Devices', 'First Aid Kit'],
      incidents: 18,
      successRate: 85,
      icon: '🛡️',
      priority: 'medium'
    },
    {
      id: 'team-delta',
      name: 'Delta Emergency Response',
      status: 'Active',
      location: 'Yola, Adamawa State',
      members: 12,
      leader: 'Captain Fatima Bello',
      specialization: 'Emergency & Crisis Management',
      lastDeployment: '30 minutes ago',
      equipment: ['Emergency Vehicles', 'Medical Supplies', 'Heavy Equipment'],
      incidents: 45,
      successRate: 91,
      icon: '🚨',
      priority: 'critical'
    },
    {
      id: 'team-echo',
      name: 'Echo Intelligence Unit',
      status: 'Analyzing',
      location: 'Abuja, FCT',
      members: 5,
      leader: 'Dr. Ahmed Balogun',
      specialization: 'Intelligence & Strategic Planning',
      lastDeployment: '6 hours ago',
      equipment: ['Computers', 'Communication Systems', 'Analysis Software'],
      incidents: 67,
      successRate: 96,
      icon: '🧠',
      priority: 'high'
    },
    {
      id: 'team-foxtrot',
      name: 'Foxtrot Training Unit',
      status: 'Training',
      location: 'Lafia, Nasarawa State',
      members: 15,
      leader: 'Colonel Michael Okafor',
      specialization: 'Training & Development',
      lastDeployment: 'N/A',
      equipment: ['Training Materials', 'Simulation Equipment', 'Educational Resources'],
      incidents: 0,
      successRate: 100,
      icon: '🎯',
      priority: 'low'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500'
      case 'On Mission': return 'bg-yellow-500'
      case 'Standby': return 'bg-blue-500'
      case 'Analyzing': return 'bg-purple-500'
      case 'Training': return 'bg-gray-500'
      default: return 'bg-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-50'
      case 'high': return 'border-l-orange-500 bg-orange-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-green-500 bg-green-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Response Teams Management
          </h1>
          <p className="text-gray-600">
            Monitor and coordinate CSOCCC field response teams across Nigeria
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => console.log('Deploy new team')}
          >
            Deploy Team
          </Button>
          <Button
            onClick={() => console.log('Create new team')}
            className="bg-fmld-green hover:bg-fmld-green-dark"
          >
            Create New Team
          </Button>
        </div>
      </div>

      {/* Teams Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teams</p>
              <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
            </div>
            <div className="w-12 h-12 bg-fmld-green/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Teams</p>
              <p className="text-2xl font-bold text-green-600">
                {teams.filter(t => t.status === 'Active' || t.status === 'On Mission').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🟢</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Officers</p>
              <p className="text-2xl font-bold text-blue-600">
                {teams.reduce((sum, team) => sum + team.members, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👮</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold text-fmld-green">
                {Math.round(teams.reduce((sum, team) => sum + team.successRate, 0) / teams.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-fmld-green/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`bg-white rounded-xl shadow-sm border-l-4 p-6 cursor-pointer transition-all hover:shadow-md ${getPriorityColor(team.priority)} ${
              selectedTeam === team.id ? 'ring-2 ring-fmld-green' : ''
            }`}
            onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
          >
            {/* Team Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{team.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{team.name}</h3>
                  <p className="text-sm text-gray-600">{team.specialization}</p>
                </div>
              </div>

              <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(team.status)}`}>
                {team.status}
              </div>
            </div>

            {/* Team Details */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">📍 Location:</span>
                <span className="ml-2">{team.location}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">👨‍💼 Leader:</span>
                <span className="ml-2">{team.leader}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Members:</span>
                  <span className="ml-1 text-fmld-green font-semibold">{team.members}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Success:</span>
                  <span className="ml-1 text-green-600 font-semibold">{team.successRate}%</span>
                </div>
              </div>

              <div className="text-sm">
                <span className="font-medium text-gray-700">Incidents Handled:</span>
                <span className="ml-1 text-blue-600 font-semibold">{team.incidents}</span>
              </div>

              <div className="text-sm">
                <span className="font-medium text-gray-700">Last Deployment:</span>
                <span className="ml-1 text-gray-600">{team.lastDeployment}</span>
              </div>

              {/* Equipment List */}
              {selectedTeam === team.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-700 mb-2">Equipment & Resources:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {team.equipment.map((item, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-fmld-green rounded-full mr-2"></span>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Team Actions */}
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => console.log(`Contact ${team.name}`)}
                    >
                      Contact Team
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => console.log(`View ${team.name} details`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Team Deployment Map Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Team Deployment Map</h2>
          <Button
            variant="outline"
            onClick={() => console.log('View full map')}
          >
            View Full Map
          </Button>
        </div>

        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="font-medium">Interactive Team Deployment Map</p>
            <p className="text-sm">Shows real-time positions of all CSOCCC teams across Nigeria</p>
          </div>
        </div>
      </div>
    </div>
  )
}