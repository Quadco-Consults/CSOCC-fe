// src/components/dashboard/IncidentMap.tsx

'use client'

import { useState } from 'react'
import { mockIncidents } from '@/data/mockData'
import { INCIDENT_TYPES, PRIORITY_COLORS } from '@/lib/constants'
import { formatRelativeTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function IncidentMap() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)
  const [mapView, setMapView] = useState<'incidents' | 'teams' | 'heatmap'>('incidents')

  // Nigeria map boundaries (approximate)
  const nigeriaBounds = {
    north: 13.8,
    south: 4.3,
    east: 14.6,
    west: 2.7
  }

  // Convert coordinates to SVG positions
  const coordToSVG = (lat: number, lng: number) => {
    const x = ((lng - nigeriaBounds.west) / (nigeriaBounds.east - nigeriaBounds.west)) * 800
    const y = ((nigeriaBounds.north - lat) / (nigeriaBounds.north - nigeriaBounds.south)) * 400
    return { x, y }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-gray-900">
            Real-Time Incident Map
          </h2>
          <p className="text-sm text-gray-600">
            Live monitoring across Nigeria
          </p>
        </div>

        {/* Map Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant={mapView === 'incidents' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('incidents')}
          >
            📍 Incidents
          </Button>
          <Button
            variant={mapView === 'teams' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('teams')}
          >
            👥 Teams
          </Button>
          <Button
            variant={mapView === 'heatmap' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('heatmap')}
          >
            🌡️ Heat Map
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 h-96 overflow-hidden">
        {/* SVG Map */}
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
        >
          {/* Nigeria outline (simplified) */}
          <path
            d="M100,200 Q200,150 300,160 Q400,140 500,150 Q600,160 700,180 L720,250 Q650,300 550,320 Q450,340 350,330 Q250,320 150,300 Q100,250 100,200 Z"
            fill="rgba(0, 135, 81, 0.1)"
            stroke="rgba(0, 135, 81, 0.3)"
            strokeWidth="2"
          />

          {/* State boundaries (simplified) */}
          <g stroke="rgba(0, 135, 81, 0.2)" strokeWidth="1" fill="none">
            <line x1="200" y1="150" x2="200" y2="320" />
            <line x1="300" y1="140" x2="300" y2="330" />
            <line x1="400" y1="150" x2="400" y2="340" />
            <line x1="500" y1="160" x2="500" y2="320" />
            <line x1="600" y1="180" x2="600" y2="300" />
          </g>

          {/* Incident Markers */}
          {mapView === 'incidents' && mockIncidents.map((incident) => {
            const { x, y } = coordToSVG(incident.location.lat, incident.location.lng)
            const isSelected = selectedIncident === incident.id

            return (
              <g key={incident.id}>
                {/* Marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 8 : 6}
                  className={`cursor-pointer transition-all ${
                    incident.priority === 'critical'
                      ? 'fill-red-500 animate-pulse'
                      : incident.priority === 'warning'
                      ? 'fill-yellow-500'
                      : 'fill-green-500'
                  }`}
                  stroke="white"
                  strokeWidth="2"
                  onClick={() => setSelectedIncident(isSelected ? null : incident.id)}
                />

                {/* Pulse effect for critical incidents */}
                {incident.priority === 'critical' && (
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="none"
                    stroke="rgba(220, 38, 38, 0.4)"
                    strokeWidth="2"
                    className="animate-ping"
                  />
                )}

                {/* Info popup */}
                {isSelected && (
                  <g>
                    <rect
                      x={x + 10}
                      y={y - 30}
                      width="200"
                      height="60"
                      fill="white"
                      stroke="gray"
                      strokeWidth="1"
                      rx="4"
                      className="drop-shadow-lg"
                    />
                    <text x={x + 15} y={y - 15} fontSize="12" fontWeight="bold" fill="black">
                      {incident.title.substring(0, 25)}...
                    </text>
                    <text x={x + 15} y={y - 5} fontSize="10" fill="gray">
                      {incident.locationName}, {incident.state}
                    </text>
                    <text x={x + 15} y={y + 8} fontSize="10" fill="gray">
                      {formatRelativeTime(incident.reportedAt)}
                    </text>
                    <text x={x + 15} y={y + 20} fontSize="10" fill="gray">
                      Status: {incident.status.replace('_', ' ')}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Team Markers */}
          {mapView === 'teams' && (
            <g>
              {/* Example team positions */}
              <circle cx="250" cy="200" r="5" fill="blue" stroke="white" strokeWidth="2" />
              <circle cx="350" cy="180" r="5" fill="blue" stroke="white" strokeWidth="2" />
              <circle cx="450" cy="220" r="5" fill="blue" stroke="white" strokeWidth="2" />
              <circle cx="550" cy="240" r="5" fill="green" stroke="white" strokeWidth="2" />
              <circle cx="400" cy="280" r="5" fill="green" stroke="white" strokeWidth="2" />
            </g>
          )}

          {/* Heat Map */}
          {mapView === 'heatmap' && (
            <g opacity="0.6">
              <circle cx="250" cy="200" r="40" fill="rgba(220, 38, 38, 0.3)" />
              <circle cx="450" cy="220" r="30" fill="rgba(245, 158, 11, 0.3)" />
              <circle cx="350" cy="280" r="25" fill="rgba(245, 158, 11, 0.3)" />
              <circle cx="550" cy="180" r="20" fill="rgba(16, 185, 129, 0.3)" />
            </g>
          )}
        </svg>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-gray-200 p-3 text-xs">
          <div className="font-semibold text-gray-900 mb-2">Legend</div>
          {mapView === 'incidents' && (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Critical Incident</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Warning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Resolved</span>
              </div>
            </div>
          )}
          {mapView === 'teams' && (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Team Deployed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Team Available</span>
              </div>
            </div>
          )}
          {mapView === 'heatmap' && (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span>High Activity</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Medium Activity</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Low Activity</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Assign Panel */}
        {selectedIncident && (
          <div className="absolute top-4 right-4 bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
            <div className="text-sm font-semibold text-gray-900 mb-2">Quick Actions</div>
            <div className="space-y-2">
              <Button size="sm" className="w-full">
                Assign Team
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                View Details
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Update Status
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Map Stats */}
      <div className="mt-4 grid grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-red-600">
            {mockIncidents.filter(i => i.priority === 'critical').length}
          </div>
          <div className="text-xs text-gray-600">Critical</div>
        </div>
        <div>
          <div className="text-lg font-bold text-yellow-600">
            {mockIncidents.filter(i => i.priority === 'warning').length}
          </div>
          <div className="text-xs text-gray-600">Warning</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">
            {mockIncidents.filter(i => i.status === 'resolved').length}
          </div>
          <div className="text-xs text-gray-600">Resolved</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-600">
            {mockIncidents.filter(i => i.status !== 'resolved').length}
          </div>
          <div className="text-xs text-gray-600">Active</div>
        </div>
      </div>
    </div>
  )
}