// src/components/intelligence/SeasonalPatterns.tsx

'use client'

import { useState } from 'react'

export function SeasonalPatterns() {
  const [selectedYear, setSelectedYear] = useState('2024')

  // Mock seasonal data
  const seasonalData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    currentYear: [8, 12, 15, 22, 28, 35, 42, 38, 31, 26, 18, 14],
    previousYear: [6, 10, 12, 18, 24, 30, 38, 35, 28, 22, 15, 11],
    predictions: [null, null, null, null, null, null, null, null, null, 29, 21, 16]
  }

  const maxValue = Math.max(...seasonalData.currentYear, ...seasonalData.previousYear)

  const seasons = [
    { name: 'Dry Season', months: 'Nov - Mar', incidents: '↑ Higher risk', color: 'bg-red-100 text-red-800' },
    { name: 'Wet Season', months: 'Apr - Oct', incidents: '↓ Lower risk', color: 'bg-green-100 text-green-800' },
    { name: 'Migration Period', months: 'Nov - Jan', incidents: '⚠️ Peak activity', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Planting Season', months: 'Mar - May', incidents: '📈 Rising tension', color: 'bg-blue-100 text-blue-800' }
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-gray-900">
            Seasonal Patterns Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Historical trends and future predictions
          </p>
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="flex items-end space-x-2 h-48 p-4 bg-gray-50 rounded-lg">
          {seasonalData.months.map((month, index) => {
            const currentHeight = (seasonalData.currentYear[index] / maxValue) * 100
            const previousHeight = (seasonalData.previousYear[index] / maxValue) * 100
            const prediction = seasonalData.predictions[index]

            return (
              <div key={month} className="flex-1 flex flex-col items-center">
                <div className="flex items-end space-x-1 w-full">
                  {/* Previous Year Bar */}
                  <div
                    className="bg-gray-400 rounded-t opacity-50 flex-1"
                    style={{ height: `${previousHeight}%` }}
                  ></div>

                  {/* Current Year Bar */}
                  <div
                    className={`rounded-t flex-1 ${
                      index >= 9 ? 'bg-blue-500' : 'bg-fmld-green'
                    }`}
                    style={{ height: `${currentHeight}%` }}
                  ></div>

                  {/* Prediction Bar */}
                  {prediction && (
                    <div
                      className="bg-orange-400 rounded-t flex-1 opacity-75 border-2 border-orange-600 border-dashed"
                      style={{ height: `${(prediction / maxValue) * 100}%` }}
                    ></div>
                  )}
                </div>

                {/* Month Label */}
                <div className="text-xs text-gray-600 mt-2 text-center">
                  {month}
                </div>

                {/* Value */}
                <div className="text-xs font-medium text-gray-900">
                  {seasonalData.currentYear[index]}
                </div>
              </div>
            )
          })}
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded opacity-50"></div>
            <span>2023</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-fmld-green rounded"></div>
            <span>2024 (Actual)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-400 rounded border border-orange-600 border-dashed"></div>
            <span>2024 (Predicted)</span>
          </div>
        </div>
      </div>

      {/* Seasonal Breakdown */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Seasonal Risk Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasons.map((season, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${season.color}`}>
                {season.name}
              </div>
              <div className="text-sm text-gray-600 mb-2">{season.months}</div>
              <div className="text-sm font-medium text-gray-900">{season.incidents}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-lg">⚠️</div>
            <div>
              <div className="font-semibold text-yellow-900 text-sm mb-1">Upcoming Risk Period</div>
              <div className="text-sm text-yellow-800">
                Historical data shows a 40% increase in incidents during November-January (migration season).
                Recommend increased patrols and early warning alerts.
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-lg">📊</div>
            <div>
              <div className="font-semibold text-blue-900 text-sm mb-1">Trend Analysis</div>
              <div className="text-sm text-blue-800">
                Overall incidents have increased by 15% compared to last year. Key factors include climate change effects
                and economic pressures. Consider climate-adaptive resource management strategies.
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-lg">✅</div>
            <div>
              <div className="font-semibold text-green-900 text-sm mb-1">Successful Interventions</div>
              <div className="text-sm text-green-800">
                Early warning system has reduced response times by 35%. Continue expanding mobile app adoption
                and community engagement programs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}