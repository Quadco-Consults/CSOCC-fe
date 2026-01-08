// src/components/landing/MobileAppSection.tsx

import { Button } from '@/components/ui/button'

export function MobileAppSection() {
  return (
    <section id="mobile-app" className="py-20 bg-fmld-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile App Mockup */}
          <div className="relative">
            <div className="mx-auto w-64 lg:w-80">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-black rounded-[2rem] p-1">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-gray-900 h-8 flex items-center justify-between px-6 text-white text-xs">
                      <span>CSOCCC</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>

                    {/* App Interface */}
                    <div className="p-4 h-96">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Welcome, Officer Adamu</div>
                          <div className="text-xs text-gray-600">Zone: Benue State</div>
                        </div>
                        <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🔔</span>
                        </div>
                      </div>

                      {/* Emergency Button */}
                      <div className="bg-red-500 rounded-lg p-4 mb-6 text-center">
                        <div className="text-white font-bold text-lg mb-1">🚨 EMERGENCY ALERT</div>
                        <div className="text-red-100 text-xs">TAP TO REPORT</div>
                      </div>

                      {/* Incident Types Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-100 rounded-lg p-3 text-center">
                          <div className="text-lg mb-1">🐄</div>
                          <div className="text-xs font-semibold">Cattle Rustling</div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 text-center">
                          <div className="text-lg mb-1">🗺️</div>
                          <div className="text-xs font-semibold">Boundary Dispute</div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 text-center">
                          <div className="text-lg mb-1">⚔️</div>
                          <div className="text-xs font-semibold">Violent Clash</div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 text-center">
                          <div className="text-lg mb-1">🔥</div>
                          <div className="text-xs font-semibold">Fire Outbreak</div>
                        </div>
                      </div>

                      {/* Voice Button */}
                      <div className="mt-4 bg-fmld-green rounded-lg p-3 text-center">
                        <div className="text-white text-sm font-semibold">🎤 Voice Report</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-lg p-3 shadow-lg border border-gray-200">
                <div className="text-xs text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Works Offline
                </div>
              </div>
              <div className="absolute top-20 -right-8 bg-white rounded-lg p-3 shadow-lg border border-gray-200">
                <div className="text-xs text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  GPS Enabled
                </div>
              </div>
              <div className="absolute -bottom-4 -right-6 bg-white rounded-lg p-3 shadow-lg border border-gray-200">
                <div className="text-xs text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Voice Input
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              CSOCCC Field App
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Empower field officers and community members with our comprehensive mobile application designed for rapid incident reporting and coordination.
            </p>

            {/* Key Features */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-xs">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Report incidents in under 60 seconds</h3>
                  <p className="text-gray-600 text-sm">Streamlined interface for quick reporting with minimal steps</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-xs">📱</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Works offline with auto-sync</h3>
                  <p className="text-gray-600 text-sm">Continue reporting even without internet connectivity</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-xs">🎤</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Voice input for easy reporting</h3>
                  <p className="text-gray-600 text-sm">Support for multiple Nigerian languages including Hausa, Yoruba, and Igbo</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-xs">🌍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Available in local languages</h3>
                  <p className="text-gray-600 text-sm">User interface supports English, Hausa, Yoruba, Igbo, and Fulfulde</p>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8"
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </div>
              </Button>

              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8"
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </div>
              </Button>
            </div>

            {/* App Info */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Size:</span> &lt; 50MB
              </div>
              <div>
                <span className="font-semibold">Requirements:</span> Android 8.0+ / iOS 12+
              </div>
              <div>
                <span className="font-semibold">License:</span> Free for authorized personnel
              </div>
              <div>
                <span className="font-semibold">Updates:</span> Automatic OTA updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}