// src/components/intelligence/MovementTracker.tsx

export function MovementTracker() {
  const movements = [
    {
      id: 'mv-001',
      type: 'Cattle Herd',
      size: '~500 head',
      direction: 'South → North',
      speed: '12 km/day',
      lastSeen: '2 hours ago',
      risk: 'medium',
      location: 'Border: Benue/Nasarawa'
    },
    {
      id: 'mv-002',
      type: 'Large Group',
      size: '~200 people',
      direction: 'East → West',
      speed: '8 km/day',
      lastSeen: '6 hours ago',
      risk: 'high',
      location: 'Plateau State'
    },
    {
      id: 'mv-003',
      type: 'Vehicle Convoy',
      size: '5 vehicles',
      direction: 'North → South',
      speed: '45 km/h',
      lastSeen: '12 hours ago',
      risk: 'low',
      location: 'Kaduna-FCT Highway'
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-gray-900">
            Movement Tracking
          </h2>
          <p className="text-sm text-gray-600">
            Real-time movement pattern analysis
          </p>
        </div>
        <div className="text-2xl">📡</div>
      </div>

      {/* Movements List */}
      <div className="space-y-4">
        {movements.map((movement) => (
          <div key={movement.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{movement.type}</h3>
                <p className="text-sm text-gray-600">{movement.location}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(movement.risk)}`}>
                {movement.risk} risk
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-gray-500">Size</div>
                <div className="font-medium">{movement.size}</div>
              </div>
              <div>
                <div className="text-gray-500">Direction</div>
                <div className="font-medium">{movement.direction}</div>
              </div>
              <div>
                <div className="text-gray-500">Speed</div>
                <div className="font-medium">{movement.speed}</div>
              </div>
              <div>
                <div className="text-gray-500">Last Seen</div>
                <div className="font-medium">{movement.lastSeen}</div>
              </div>
            </div>

            {movement.risk === 'high' && (
              <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                ⚠️ High risk movement detected. Consider deploying monitoring teams.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analysis Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{movements.length}</div>
          <div className="text-xs text-gray-600">Active Movements</div>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
          <div className="text-lg font-bold text-red-600">
            {movements.filter(m => m.risk === 'high').length}
          </div>
          <div className="text-xs text-red-600">High Risk</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">
            {Math.round((movements.filter(m => m.risk !== 'high').length / movements.length) * 100)}%
          </div>
          <div className="text-xs text-green-600">Safe Movements</div>
        </div>
      </div>
    </div>
  )
}