// src/components/layout/Header.tsx

'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const mockAlerts = [
    { id: 1, message: 'Unusual cattle movement detected in Benue State', severity: 'high' },
    { id: 2, message: 'Response Team Alpha deployed to incident INC-2024-047', severity: 'medium' },
    { id: 3, message: 'Weekly briefing report generated', severity: 'low' }
  ]

  const [showAlerts, setShowAlerts] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left side - Current Page Info */}
      <div>
        <h1 className="text-xl font-heading font-bold text-gray-900">
          Command Center Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Central Strategic Operations Command and Control
        </p>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-4">
        {/* Current Time */}
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            {currentTime.toLocaleTimeString('en-US', {
              hour12: false,
              timeZone: 'Africa/Lagos'
            })}
          </div>
          <div className="text-xs text-gray-600">
            {formatDate(currentTime)} (WAT)
          </div>
        </div>

        {/* Alerts */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative"
          >
            <span className="text-lg mr-1">🔔</span>
            Alerts
            {mockAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {mockAlerts.length}
              </span>
            )}
          </Button>

          {/* Alerts Dropdown */}
          {showAlerts && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-200">
                <div className="font-semibold text-gray-900">Active Alerts</div>
                <div className="text-xs text-gray-600">{mockAlerts.length} unread notifications</div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'high' ? 'bg-red-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{alert.message}</div>
                        <div className="text-xs text-gray-600 mt-1">Just now</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <Button variant="ghost" size="sm" className="w-full">
                  View All Alerts
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">
              Commander Yusuf Mohammed
            </div>
            <div className="text-xs text-gray-600">
              Operations Commander
            </div>
          </div>
          <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center text-white font-semibold">
            YM
          </div>
        </div>

        {/* Settings */}
        <Button variant="outline" size="sm">
          <span className="text-lg">⚙️</span>
        </Button>
      </div>

      {/* Click outside to close alerts */}
      {showAlerts && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowAlerts(false)}
        />
      )}
    </header>
  )
}