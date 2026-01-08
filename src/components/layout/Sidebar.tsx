// src/components/layout/Sidebar.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { APP_CONFIG, LOGO_URLS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Command Center',
    href: '/dashboard',
    icon: '🏠',
    description: 'Main operational dashboard'
  },
  {
    name: 'Incidents',
    href: '/dashboard/incidents',
    icon: '📋',
    description: 'Incident management'
  },
  {
    name: 'Intelligence',
    href: '/dashboard/intelligence',
    icon: '🧠',
    description: 'Analytics & early warning'
  },
  {
    name: 'Teams',
    href: '/dashboard/teams',
    icon: '👥',
    description: 'Response team management'
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: '📊',
    description: 'Reports & briefings'
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: '⚙️',
    description: 'System configuration'
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo and Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="relative h-8 w-8">
            <Image
              src={LOGO_URLS.emblem}
              alt="FMLD Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="font-heading font-bold text-fmld-green text-lg">
              {APP_CONFIG.name}
            </div>
            <div className="text-xs text-gray-600">
              Command Center
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-fmld-green text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-fmld-green'
              )}
            >
              <span className="text-lg mr-3 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <div className="flex-1">
                <div>{item.name}</div>
                <div className={cn(
                  'text-xs mt-0.5',
                  isActive ? 'text-white/80' : 'text-gray-500'
                )}>
                  {item.description}
                </div>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Emergency Section */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <span className="text-lg mr-2">🚨</span>
            <div className="font-semibold text-red-900 text-sm">Emergency Hotline</div>
          </div>
          <div className="text-red-800 font-bold text-lg">199</div>
          <div className="text-red-600 text-xs">Available 24/7</div>
        </div>
      </div>

      {/* System Status */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-600">System Status</div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-600 font-medium">Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}