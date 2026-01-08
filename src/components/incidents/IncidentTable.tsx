// src/components/incidents/IncidentTable.tsx

'use client'

import { useState } from 'react'
import { mockIncidents, mockTeams } from '@/data/mockData'
import { INCIDENT_TYPES, STATUS_COLORS, PRIORITY_COLORS } from '@/lib/constants'
import { formatRelativeTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function IncidentTable() {
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>([])
  const [sortField, setSortField] = useState<'reportedAt' | 'priority' | 'status'>('reportedAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null)

  // Sort incidents
  const sortedIncidents = [...mockIncidents].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1

    if (sortField === 'reportedAt') {
      return (new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime()) * multiplier
    }

    if (sortField === 'priority') {
      const priorityOrder = { critical: 3, warning: 2, resolved: 1 }
      return (priorityOrder[a.priority] - priorityOrder[b.priority]) * multiplier
    }

    return a[sortField].localeCompare(b[sortField]) * multiplier
  })

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const toggleSelection = (incidentId: string) => {
    setSelectedIncidents(prev =>
      prev.includes(incidentId)
        ? prev.filter(id => id !== incidentId)
        : [...prev, incidentId]
    )
  }

  const selectAll = () => {
    setSelectedIncidents(
      selectedIncidents.length === sortedIncidents.length
        ? []
        : sortedIncidents.map(i => i.id)
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Table Header Actions */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedIncidents.length > 0 && (
                <span className="font-medium text-fmld-green">
                  {selectedIncidents.length} selected
                </span>
              )}
            </span>

            {selectedIncidents.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  Bulk Assign
                </Button>
                <Button size="sm" variant="outline">
                  Update Status
                </Button>
                <Button size="sm" variant="outline">
                  Export Selected
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <button
              onClick={() => handleSort('reportedAt')}
              className={`px-2 py-1 rounded ${sortField === 'reportedAt' ? 'bg-fmld-green text-white' : 'hover:bg-gray-100'}`}
            >
              Date {sortField === 'reportedAt' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('priority')}
              className={`px-2 py-1 rounded ${sortField === 'priority' ? 'bg-fmld-green text-white' : 'hover:bg-gray-100'}`}
            >
              Priority {sortField === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('status')}
              className={`px-2 py-1 rounded ${sortField === 'status' ? 'bg-fmld-green text-white' : 'hover:bg-gray-100'}`}
            >
              Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIncidents.length === sortedIncidents.length}
                  onChange={selectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Incident
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reported
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedIncidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-50 transition-colors">
                {/* Checkbox */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedIncidents.includes(incident.id)}
                    onChange={() => toggleSelection(incident.id)}
                    className="rounded border-gray-300"
                  />
                </td>

                {/* Incident Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      incident.priority === 'critical' ? 'bg-red-100' :
                      incident.priority === 'warning' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      <span className="text-lg">{INCIDENT_TYPES[incident.type].icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {incident.id}
                      </div>
                      <div className="text-xs text-gray-500">
                        {INCIDENT_TYPES[incident.type].label}
                      </div>
                      {incident.priority === 'critical' && (
                        <div className="text-xs text-red-600 font-medium animate-pulse">
                          🚨 URGENT
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {incident.locationName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {incident.state} State, {incident.lga} LGA
                  </div>
                </td>

                {/* Priority */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${PRIORITY_COLORS[incident.priority]}`}>
                    {incident.priority}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[incident.status]}`}>
                    {incident.status.replace('_', ' ')}
                  </span>
                </td>

                {/* Assigned To */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {incident.assignedTo ? (
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {incident.assignedTo}
                      </div>
                      {incident.assignedAt && (
                        <div className="text-xs text-gray-500">
                          {formatRelativeTime(incident.assignedAt)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAssignModal(incident.id)}
                      className="text-sm text-fmld-green hover:text-fmld-green-dark font-medium"
                    >
                      Assign Team
                    </button>
                  )}
                </td>

                {/* Reported */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatRelativeTime(incident.reportedAt)}
                  </div>
                  <div className="text-xs text-gray-500">
                    by {incident.reportedBy}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                      Edit
                    </Button>
                    {incident.evidence.length > 0 && (
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                        📎 {incident.evidence.length}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedIncidents.length}</span> of{' '}
            <span className="font-medium">{sortedIncidents.length}</span> incidents
          </div>

          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" disabled>
              Previous
            </Button>
            <span className="px-3 py-1 text-sm bg-fmld-green text-white rounded">1</span>
            <Button size="sm" variant="outline" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
              Assign Team to {showAssignModal}
            </h3>

            <div className="space-y-3 mb-6">
              {mockTeams.filter(t => t.status === 'available').map((team) => (
                <button
                  key={team.id}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{team.name}</div>
                  <div className="text-sm text-gray-600">
                    Leader: {team.leader} • {team.memberCount} members
                  </div>
                  <div className="text-xs text-gray-500">Zone: {team.zone}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAssignModal(null)}
              >
                Cancel
              </Button>
              <Button onClick={() => setShowAssignModal(null)}>
                Assign Team
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}