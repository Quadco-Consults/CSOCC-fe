// src/components/landing/IncidentTypes.tsx

import { INCIDENT_TYPES } from '@/lib/constants'

export function IncidentTypes() {
  const incidentTypesList = Object.entries(INCIDENT_TYPES).map(([key, value]) => ({
    key,
    ...value
  }))

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Comprehensive Incident Coverage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CSOCCC is equipped to handle all types of livestock-related security incidents across Nigeria, ensuring no threat goes unaddressed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidentTypesList.map((incident, index) => (
            <div
              key={incident.key}
              className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-fmld-green hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {incident.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-fmld-green transition-colors">
                {incident.label}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {incident.description}
              </p>

              {/* Status indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-medium text-green-600">Active Monitoring</span>
                </div>
                <div className="text-xs text-gray-500">
                  24/7 Coverage
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Coverage Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coverage Areas */}
          <div className="bg-fmld-gray-100 rounded-xl p-8">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">
              Geographic Coverage
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-semibold text-fmld-green">Northern States</div>
                <ul className="space-y-1 text-gray-600">
                  <li>• Borno, Yobe, Adamawa</li>
                  <li>• Kano, Katsina, Kaduna</li>
                  <li>• Sokoto, Kebbi, Zamfara</li>
                  <li>• Jigawa, Bauchi, Gombe</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-fmld-green">Middle Belt</div>
                <ul className="space-y-1 text-gray-600">
                  <li>• Plateau, Benue, Nasarawa</li>
                  <li>• Niger, Kwara, Kogi</li>
                  <li>• FCT Abuja</li>
                  <li>• Taraba</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <strong>Full Coverage:</strong> All 36 states plus FCT with specialized focus on livestock corridors and grazing reserves.
              </div>
            </div>
          </div>

          {/* Response Capabilities */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">
              Response Capabilities
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-xs">🚁</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Air Support</div>
                  <div className="text-sm text-gray-600">Helicopter units for rapid deployment and surveillance</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-xs">🚔</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ground Teams</div>
                  <div className="text-sm text-gray-600">Mobile response units with specialized training</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-xs">🛡️</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Security Forces</div>
                  <div className="text-sm text-gray-600">Coordination with police, military, and local security</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-xs">🤝</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mediation Teams</div>
                  <div className="text-sm text-gray-600">Conflict resolution specialists and community leaders</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Info */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="text-2xl mr-3">🚨</div>
            <h3 className="text-xl font-heading font-bold text-red-900">
              Emergency Reporting
            </h3>
          </div>
          <div className="text-center">
            <p className="text-red-800 mb-4">
              For immediate assistance, contact CSOCCC emergency hotline:
            </p>
            <div className="text-2xl font-bold text-red-900 mb-2">
              199 (Emergency Hotline)
            </div>
            <div className="text-sm text-red-700">
              Available 24/7 • All calls are free • Multi-language support
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}