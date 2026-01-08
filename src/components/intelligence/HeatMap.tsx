// src/components/intelligence/HeatMap.tsx

'use client'

import { useState } from 'react'
import { mockIncidents } from '@/data/mockData'

export function HeatMap() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [incidentType, setIncidentType] = useState<'all' | 'cattle_rustling' | 'violent_clash'>('all')

  const heatMapData = [
    { region: 'Benue North', incidents: 12, intensity: 'high', coordinates: { x: 30, y: 40 } },
    { region: 'Plateau Central', incidents: 8, intensity: 'high', coordinates: { x: 40, y: 30 } },
    { region: 'Kaduna South', incidents: 6, intensity: 'medium', coordinates: { x: 35, y: 20 } },
    { region: 'Taraba East', incidents: 4, intensity: 'medium', coordinates: { x: 60, y: 50 } },
    { region: 'Nasarawa West', incidents: 3, intensity: 'low', coordinates: { x: 25, y: 35 } },
    { region: 'FCT Abuja', incidents: 2, intensity: 'low', coordinates: { x: 30, y: 30 } },
  ]

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'rgba(220, 38, 38, 0.8)'
      case 'medium': return 'rgba(245, 158, 11, 0.6)'
      case 'low': return 'rgba(16, 185, 129, 0.4)'
      default: return 'rgba(156, 163, 175, 0.3)'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-gray-900">
            Incident Heat Map
          </h2>
          <p className="text-sm text-gray-600">
            Geographic incident density analysis
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          {/* Incident Type */}
          <select
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
          >
            <option value="all">All Incidents</option>
            <option value="cattle_rustling">Cattle Rustling</option>
            <option value="violent_clash">Violent Clashes</option>
          </select>
        </div>
      </div>

      {/* Heat Map Visualization */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 h-80 overflow-hidden">
        {/* Map Container */}
        <svg viewBox="0 0 100 70" className="w-full h-full">
          {/* Nigeria outline */}
          <path
            d="M10,35 Q20,25 30,28 Q40,25 50,26 Q60,28 70,30 L72,40 Q65,50 55,52 Q45,54 35,53 Q25,52 15,50 Q10,45 10,35 Z"
            fill="rgba(0, 135, 81, 0.1)"
            stroke="rgba(0, 135, 81, 0.3)"
            strokeWidth="0.5"
          />

          {/* Heat zones */}
          {heatMapData.map((zone, index) => (
            <g key={index}>
              <circle
                cx={zone.coordinates.x}
                cy={zone.coordinates.y}
                r={Math.max(3, zone.incidents / 2)}
                fill={getIntensityColor(zone.intensity)}
                className="cursor-pointer transition-opacity hover:opacity-80"
              />
              <text
                x={zone.coordinates.x}
                y={zone.coordinates.y + 8}
                textAnchor="middle"
                fontSize="3"
                fill="black"
                className="pointer-events-none"
              >
                {zone.incidents}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-gray-200 p-3 text-xs">
          <div className="font-semibold text-gray-900 mb-2">Incident Intensity</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(220, 38, 38, 0.8)' }}></div>
              <span>High (8+ incidents)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(245, 158, 11, 0.6)' }}></div>
              <span>Medium (4-7 incidents)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(16, 185, 129, 0.4)' }}></div>
              <span>Low (1-3 incidents)</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="absolute top-4 right-4 bg-white rounded-lg border border-gray-200 p-3 text-xs">
          <div className="font-semibold text-gray-900 mb-2">Analysis</div>
          <div className="space-y-1">
            <div>Total Hotspots: <span className="font-bold">6</span></div>
            <div>High Risk Areas: <span className="font-bold text-red-600">2</span></div>
            <div>Trend: <span className="font-bold text-yellow-600">↗️ Increasing</span></div>
          </div>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="mt-6">
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Regional Breakdown
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {heatMapData.map((region, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div>
                <div className="font-medium text-gray-900 text-sm">{region.region}</div>
                <div className="text-xs text-gray-600">{region.incidents} incidents</div>
              </div>
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: getIntensityColor(region.intensity) }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-lg">🧠</div>
          <div>
            <div className="font-semibold text-blue-900 text-sm mb-1">AI Insights</div>
            <div className="text-sm text-blue-800">
              Incident concentration in Benue and Plateau states has increased by 23% compared to the previous {timeRange}.
              Consider increasing patrol frequency in these high-risk zones.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}