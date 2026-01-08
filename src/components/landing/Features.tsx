// src/components/landing/Features.tsx

export function Features() {
  const features = [
    {
      icon: '🗺️',
      title: 'Real-Time Monitoring',
      description: 'Track all incidents on interactive map with live updates and GPS coordinates.',
      highlights: [
        'Interactive nationwide map',
        'Live incident tracking',
        'GPS-enabled reporting',
        'Multi-layer visualization'
      ]
    },
    {
      icon: '📱',
      title: 'Mobile Reporting',
      description: 'Report incidents from anywhere, even offline with automatic sync when connected.',
      highlights: [
        'Offline-first design',
        'One-tap emergency alerts',
        'Voice input support',
        'Evidence capture (photo/video)'
      ]
    },
    {
      icon: '⚡',
      title: 'Rapid Response',
      description: 'Two-click resource deployment with automated team assignment and routing.',
      highlights: [
        'Instant team deployment',
        'Automated dispatching',
        'Route optimization',
        'Real-time communication'
      ]
    },
    {
      icon: '🔮',
      title: 'Early Warning System',
      description: 'Predict high-risk periods using AI-powered analysis of historical patterns.',
      highlights: [
        'Predictive analytics',
        'Seasonal pattern analysis',
        'Risk assessment algorithms',
        'Proactive alerts'
      ]
    },
    {
      icon: '📊',
      title: 'Intelligence Analytics',
      description: 'Pattern analysis and automated briefings for informed decision making.',
      highlights: [
        'Advanced analytics',
        'Pattern recognition',
        'Automated reporting',
        'Data-driven insights'
      ]
    },
    {
      icon: '🤝',
      title: 'Community Integration',
      description: 'Local language support and community-driven reporting system.',
      highlights: [
        'Multi-language interface',
        'Community involvement',
        'Cultural sensitivity',
        'Local partnerships'
      ]
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            How CSOCCC Protects You
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive security features designed specifically for Nigeria's unique challenges in livestock protection and farmer-herder conflict resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-xl p-8 border border-gray-200 hover:border-fmld-green hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {feature.highlights.map((highlight, highlightIndex) => (
                  <li
                    key={highlightIndex}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 flex-shrink-0"></div>
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-fmld-green/5 to-fmld-green-light/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* Feature highlights section */}
        <div className="mt-16 bg-fmld-gray-100 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-6">
                Built for Nigeria's Unique Challenges
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Multi-Cultural Approach</div>
                    <div className="text-gray-600">Support for Hausa, Yoruba, Igbo, Fulfulde, and English</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Low-Bandwidth Optimization</div>
                    <div className="text-gray-600">Works efficiently even with poor internet connectivity</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Solar-Powered Compatible</div>
                    <div className="text-gray-600">Battery-efficient design for remote locations</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-fmld-green rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Community Integration</div>
                    <div className="text-gray-600">Designed with input from local communities and traditional leaders</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <div className="text-3xl mb-4">🇳🇬</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Proudly Nigerian
                </div>
                <div className="text-gray-600 text-sm">
                  Developed in partnership with the Federal Ministry of Livestock Development to address Nigeria's specific security challenges and cultural context.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}