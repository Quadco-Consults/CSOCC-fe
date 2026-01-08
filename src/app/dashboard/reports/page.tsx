// src/app/dashboard/reports/page.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>('incident-summary')
  const [dateRange, setDateRange] = useState<string>('30-days')
  const [filterState, setFilterState] = useState<string>('all')

  const reportTypes = [
    {
      id: 'incident-summary',
      name: 'Incident Summary Report',
      description: 'Overview of all incidents by type, location, and status',
      icon: '📊',
      category: 'Operations'
    },
    {
      id: 'team-performance',
      name: 'Team Performance Report',
      description: 'Response times, success rates, and team efficiency metrics',
      icon: '👥',
      category: 'Performance'
    },
    {
      id: 'geographic-analysis',
      name: 'Geographic Analysis',
      description: 'Incident hotspots and geographical distribution patterns',
      icon: '🗺️',
      category: 'Analytics'
    },
    {
      id: 'monthly-executive',
      name: 'Monthly Executive Summary',
      description: 'High-level overview for executive briefings',
      icon: '📈',
      category: 'Executive'
    },
    {
      id: 'resource-utilization',
      name: 'Resource Utilization Report',
      description: 'Equipment deployment and resource allocation analysis',
      icon: '⚙️',
      category: 'Resources'
    },
    {
      id: 'trend-analysis',
      name: 'Trend Analysis Report',
      description: 'Historical patterns and predictive insights',
      icon: '📉',
      category: 'Analytics'
    }
  ]

  const quickStats = [
    {
      label: 'Total Incidents',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      label: 'Avg Response Time',
      value: '18.5 min',
      change: '-8%',
      trend: 'down',
      period: 'vs last month'
    },
    {
      label: 'Resolution Rate',
      value: '94.2%',
      change: '+3%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      label: 'Active Teams',
      value: '24/26',
      change: '0%',
      trend: 'stable',
      period: 'vs last month'
    }
  ]

  const recentReports = [
    {
      id: 'rpt-001',
      name: 'Weekly Incident Summary - Week 52',
      type: 'Incident Summary',
      generatedBy: 'System',
      date: '2024-12-30',
      status: 'Ready',
      fileSize: '2.3 MB'
    },
    {
      id: 'rpt-002',
      name: 'December Team Performance Review',
      type: 'Performance Report',
      generatedBy: 'Dr. Ahmed Balogun',
      date: '2024-12-29',
      status: 'Ready',
      fileSize: '1.8 MB'
    },
    {
      id: 'rpt-003',
      name: 'Q4 2024 Geographic Analysis',
      type: 'Geographic Analysis',
      generatedBy: 'Intelligence Unit',
      date: '2024-12-28',
      status: 'Processing',
      fileSize: '5.2 MB'
    },
    {
      id: 'rpt-004',
      name: 'Monthly Executive Brief - December',
      type: 'Executive Summary',
      generatedBy: 'Captain Fatima Bello',
      date: '2024-12-27',
      status: 'Ready',
      fileSize: '892 KB'
    }
  ]

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800'
      case 'Processing': return 'bg-yellow-100 text-yellow-800'
      case 'Error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      case 'stable': return '→'
      default: return '→'
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Generate comprehensive reports and analyze CSOCCC operational data
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => console.log('Schedule report')}
          >
            Schedule Report
          </Button>
          <Button
            onClick={() => console.log('Generate custom report')}
            className="bg-fmld-green hover:bg-fmld-green-dark"
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
              <span className={`text-lg ${getTrendColor(stat.trend)}`}>
                {getTrendIcon(stat.trend)}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center text-sm">
                <span className={`font-medium ${getTrendColor(stat.trend)}`}>
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">{stat.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Generation Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate New Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green"
                >
                  <option value="7-days">Last 7 Days</option>
                  <option value="30-days">Last 30 Days</option>
                  <option value="90-days">Last 90 Days</option>
                  <option value="6-months">Last 6 Months</option>
                  <option value="1-year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State Filter
                </label>
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green"
                >
                  <option value="all">All States</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state.toLowerCase().replace(' ', '-')}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Format
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green">
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV Data</option>
                  <option value="powerpoint">PowerPoint Presentation</option>
                </select>
              </div>
            </div>

            {/* Report Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedReport === report.id
                      ? 'border-fmld-green bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{report.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{report.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {report.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Button className="bg-fmld-green hover:bg-fmld-green-dark">
                Generate Report
              </Button>
              <Button variant="outline">
                Save as Template
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
              <Button variant="ghost" size="sm">
                View All →
              </Button>
            </div>

            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">{report.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-600">
                    <p><span className="font-medium">Type:</span> {report.type}</p>
                    <p><span className="font-medium">Generated by:</span> {report.generatedBy}</p>
                    <p><span className="font-medium">Date:</span> {report.date}</p>
                    <p><span className="font-medium">Size:</span> {report.fileSize}</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Download
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs">
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Reports */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scheduled Reports</h2>

            <div className="space-y-3">
              {[
                { name: 'Daily Incident Brief', schedule: 'Daily at 8:00 AM', next: 'Tomorrow 8:00 AM' },
                { name: 'Weekly Performance Summary', schedule: 'Mondays at 9:00 AM', next: 'Monday 9:00 AM' },
                { name: 'Monthly Executive Report', schedule: 'First of each month', next: 'Jan 1, 2025' }
              ].map((scheduled, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{scheduled.name}</p>
                    <p className="text-xs text-gray-600">{scheduled.schedule}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Next run:</p>
                    <p className="text-xs font-medium text-gray-900">{scheduled.next}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              Manage Schedules
            </Button>
          </div>
        </div>
      </div>

      {/* Report Preview/Insights */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Data Insights</h2>
          <span className="text-sm text-gray-500">Updated 5 minutes ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl text-blue-600 mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Incident Trends</h3>
            <p className="text-sm text-gray-600 mt-1">Livestock theft incidents increased 15% this month</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl text-green-600 mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Top Performance</h3>
            <p className="text-sm text-gray-600 mt-1">Echo Intelligence Unit achieved 96% success rate</p>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl text-orange-600 mb-2">🗺️</div>
            <h3 className="font-semibold text-gray-900">Hotspot Alert</h3>
            <p className="text-sm text-gray-600 mt-1">Plateau State shows increased activity patterns</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl text-purple-600 mb-2">⏱️</div>
            <h3 className="font-semibold text-gray-900">Response Time</h3>
            <p className="text-sm text-gray-600 mt-1">Average response time improved by 8% this month</p>
          </div>
        </div>
      </div>
    </div>
  )
}