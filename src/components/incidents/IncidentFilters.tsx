// src/components/incidents/IncidentFilters.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { INCIDENT_TYPES, NIGERIA_STATES } from '@/lib/constants'

export function IncidentFilters() {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    priority: '',
    status: '',
    state: '',
    dateRange: '',
    assigned: ''
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      priority: '',
      status: '',
      state: '',
      dateRange: '',
      assigned: ''
    })
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-gray-900">
          Filters & Search
        </h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
          >
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {/* Search */}
        <div className="xl:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search incidents..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
          />
        </div>

        {/* Incident Type */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
          >
            <option value="">All Types</option>
            {Object.entries(INCIDENT_TYPES).map(([key, type]) => (
              <option key={key} value={key}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
          >
            <option value="">All Priorities</option>
            <option value="critical">🚨 Critical</option>
            <option value="warning">⚠️ Warning</option>
            <option value="resolved">✅ Resolved</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="reported">Reported</option>
            <option value="assigned">Assigned</option>
            <option value="en_route">En Route</option>
            <option value="on_scene">On Scene</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
          >
            <option value="">All States</option>
            {NIGERIA_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-fmld-green focus:border-transparent"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week</option>
            <option value="last_week">Last Week</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs font-medium text-gray-700 mr-2">Quick Filters:</span>

        <button
          onClick={() => handleFilterChange('priority', filters.priority === 'critical' ? '' : 'critical')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            filters.priority === 'critical'
              ? 'bg-red-100 text-red-800 border border-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-red-50'
          }`}
        >
          🚨 Critical Only
        </button>

        <button
          onClick={() => handleFilterChange('status', filters.status === 'reported' ? '' : 'reported')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            filters.status === 'reported'
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
          }`}
        >
          📢 Unassigned
        </button>

        <button
          onClick={() => handleFilterChange('dateRange', filters.dateRange === 'today' ? '' : 'today')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            filters.dateRange === 'today'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-green-50'
          }`}
        >
          📅 Today Only
        </button>

        <button
          onClick={() => {
            setFilters({
              search: '',
              type: 'cattle_rustling',
              priority: 'critical',
              status: '',
              state: '',
              dateRange: 'this_week',
              assigned: ''
            })
          }}
          className="px-3 py-1 rounded-full text-xs font-medium bg-fmld-green text-white hover:bg-fmld-green-dark transition-colors"
        >
          🎯 High Priority This Week
        </button>
      </div>

      {/* Applied Filters */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 p-3 bg-fmld-gray-100 rounded-lg">
          <div className="text-xs font-medium text-gray-700 mb-2">Applied Filters:</div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null

              let displayValue = value
              if (key === 'type' && INCIDENT_TYPES[value as keyof typeof INCIDENT_TYPES]) {
                displayValue = INCIDENT_TYPES[value as keyof typeof INCIDENT_TYPES].label
              }

              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-white border border-gray-200 rounded text-xs"
                >
                  <span className="capitalize">{key}:</span>
                  <span className="ml-1 font-medium">{displayValue}</span>
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}