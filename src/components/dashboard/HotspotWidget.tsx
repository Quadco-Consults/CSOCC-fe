// src/components/dashboard/HotspotWidget.tsx

import { mockMetrics } from '@/data/mockData'

export function HotspotWidget() {
  const { hotspots } = mockMetrics

  const severityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-gray-900">
            Top Hotspots
          </h2>
          <p className="text-sm text-gray-600">
            High-incident areas requiring attention
          </p>
        </div>
        <div className="text-2xl">🗺️</div>
      </div>

      {/* Hotspots List */}
      <div className="space-y-4">
        {hotspots.slice(0, 5).map((hotspot, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {/* Rank */}
              <div className="w-6 h-6 rounded-full bg-fmld-green text-white text-xs font-bold flex items-center justify-center">
                {index + 1}
              </div>

              {/* Location Info */}
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {hotspot.locationName}
                </div>
                <div className="text-xs text-gray-600">
                  {hotspot.state} State
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Incident Count */}
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {hotspot.incidentCount}
                </div>
                <div className="text-xs text-gray-600">
                  incidents
                </div>
              </div>

              {/* Severity Badge */}
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${severityColors[hotspot.severity]}`}>
                {hotspot.severity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis */}
      <div className="mt-6 p-4 bg-fmld-gray-100 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-lg">💡</div>
          <div>
            <div className="font-semibold text-gray-900 text-sm mb-1">
              Analysis
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">
              Benue and Plateau states show increased activity this week.
              Consider deploying additional resources to these areas during peak hours.
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="p-2 text-xs font-medium text-fmld-green border border-fmld-green rounded-lg hover:bg-fmld-green hover:text-white transition-colors">
          Deploy Teams
        </button>
        <button className="p-2 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Generate Alert
        </button>
      </div>
    </div>
  )
}