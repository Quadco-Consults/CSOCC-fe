// src/app/dashboard/settings/page.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>('general')
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    emergency: true
  })

  const settingsSections = [
    {
      id: 'general',
      name: 'General Settings',
      icon: '⚙️',
      description: 'Basic system configuration'
    },
    {
      id: 'security',
      name: 'Security & Access',
      icon: '🔒',
      description: 'Authentication and permissions'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: '🔔',
      description: 'Alert and message preferences'
    },
    {
      id: 'teams',
      name: 'Team Management',
      icon: '👥',
      description: 'Team structure and assignments'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: '🔗',
      description: 'External systems and APIs'
    },
    {
      id: 'data',
      name: 'Data Management',
      icon: '💾',
      description: 'Backup and data retention'
    }
  ]

  const systemLanguages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ha', name: 'Hausa', native: 'Hausa' },
    { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
    { code: 'ig', name: 'Igbo', native: 'Asụsụ Igbo' },
    { code: 'ff', name: 'Fulfulde', native: 'Fulfulde' }
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Name
            </label>
            <input
              type="text"
              defaultValue="CSOCCC - Central Strategic Operations Command"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Language
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green">
              {systemLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.native})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green">
              <option value="Africa/Lagos">West Africa Time (WAT)</option>
              <option value="UTC">Coordinated Universal Time (UTC)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green">
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">System Maintenance</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Auto Backup</p>
                  <p className="text-sm text-gray-600">Daily at 2:00 AM WAT</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-fmld-green" />
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">System Updates</p>
                  <p className="text-sm text-gray-600">Auto-install security updates</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-fmld-green" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication & Access Control</h3>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Policy
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green">
                <option value="strict">Strict (12+ chars, special chars required)</option>
                <option value="standard">Standard (8+ chars, mixed case)</option>
                <option value="basic">Basic (6+ chars)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green">
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="480">8 hours</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Security Features</h4>
            {[
              { name: 'Two-Factor Authentication', description: 'Require 2FA for all users', enabled: true },
              { name: 'Login Attempt Monitoring', description: 'Track failed login attempts', enabled: true },
              { name: 'IP Address Restrictions', description: 'Limit access to specific IP ranges', enabled: false },
              { name: 'Device Registration', description: 'Require device approval for new logins', enabled: false }
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{feature.name}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={feature.enabled}
                  className="w-4 h-4 text-fmld-green"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Roles & Permissions</h3>

        <div className="space-y-4">
          {[
            {
              role: 'System Administrator',
              users: 3,
              permissions: ['Full System Access', 'User Management', 'System Configuration'],
              color: 'bg-red-100 text-red-800'
            },
            {
              role: 'Operations Manager',
              users: 8,
              permissions: ['Dashboard Access', 'Team Management', 'Report Generation'],
              color: 'bg-blue-100 text-blue-800'
            },
            {
              role: 'Field Commander',
              users: 24,
              permissions: ['Team Coordination', 'Incident Response', 'Resource Allocation'],
              color: 'bg-green-100 text-green-800'
            },
            {
              role: 'Field Officer',
              users: 156,
              permissions: ['Incident Reporting', 'Status Updates', 'Basic Communications'],
              color: 'bg-yellow-100 text-yellow-800'
            }
          ].map((role, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{role.role}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${role.color}`}>
                    {role.users} users
                  </span>
                </div>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, pIndex) => (
                  <span key={pIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>

        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Notification Channels</h4>
            {[
              {
                key: 'email',
                name: 'Email Notifications',
                description: 'Receive notifications via email',
                icon: '📧'
              },
              {
                key: 'sms',
                name: 'SMS Alerts',
                description: 'Critical alerts via SMS',
                icon: '📱'
              },
              {
                key: 'push',
                name: 'Push Notifications',
                description: 'Browser and mobile push notifications',
                icon: '🔔'
              },
              {
                key: 'emergency',
                name: 'Emergency Alerts',
                description: 'High-priority emergency notifications',
                icon: '🚨'
              }
            ].map((channel) => (
              <div key={channel.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{channel.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{channel.name}</p>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[channel.key as keyof typeof notifications]}
                  onChange={(e) => setNotifications(prev => ({
                    ...prev,
                    [channel.key]: e.target.checked
                  }))}
                  className="w-4 h-4 text-fmld-green"
                />
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Alert Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'New Incident Reports',
                'Team Status Changes',
                'System Maintenance',
                'Security Alerts',
                'Performance Warnings',
                'Resource Shortages',
                'Weather Alerts',
                'Executive Briefings'
              ].map((alertType, index) => (
                <div key={index} className="flex items-center space-x-3 p-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-fmld-green" />
                  <label className="text-sm text-gray-700">{alertType}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Quiet Hours</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  defaultValue="22:00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  defaultValue="06:00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-fmld-green focus:border-fmld-green"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Emergency alerts will override quiet hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings()
      case 'security':
        return renderSecuritySettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'teams':
        return (
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Management Settings</h3>
            <p className="text-gray-600">Team management configuration options coming soon...</p>
          </div>
        )
      case 'integrations':
        return (
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">External Integrations</h3>
            <p className="text-gray-600">Integration settings and API configurations coming soon...</p>
          </div>
        )
      case 'data':
        return (
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
            <p className="text-gray-600">Data backup and retention policies coming soon...</p>
          </div>
        )
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            System Settings
          </h1>
          <p className="text-gray-600">
            Configure CSOCCC system preferences and security options
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => console.log('Reset to defaults')}
          >
            Reset to Defaults
          </Button>
          <Button
            onClick={() => console.log('Save all settings')}
            className="bg-fmld-green hover:bg-fmld-green-dark"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Settings Categories</h2>
            </div>
            <nav className="p-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors mb-1 ${
                    activeSection === section.id
                      ? 'bg-fmld-green text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{section.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{section.name}</p>
                      <p className={`text-xs ${
                        activeSection === section.id ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {section.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600">✅</span>
            </div>
            <h3 className="font-medium text-gray-900">System Health</h3>
            <p className="text-sm text-green-600">All systems operational</p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600">💾</span>
            </div>
            <h3 className="font-medium text-gray-900">Last Backup</h3>
            <p className="text-sm text-gray-600">2 hours ago</p>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-yellow-600">🔄</span>
            </div>
            <h3 className="font-medium text-gray-900">Updates</h3>
            <p className="text-sm text-gray-600">System up to date</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600">📊</span>
            </div>
            <h3 className="font-medium text-gray-900">Performance</h3>
            <p className="text-sm text-gray-600">Optimal</p>
          </div>
        </div>
      </div>
    </div>
  )
}