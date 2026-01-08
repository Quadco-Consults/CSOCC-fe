// src/components/landing/HowItWorks.tsx

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Report',
      subtitle: 'Incident Detection',
      description: 'Field officers, community members, or automated systems detect and report incidents via mobile app or call center.',
      details: [
        'Mobile app reporting',
        'Community hotlines',
        'Automated monitoring',
        'GPS location tagging'
      ],
      icon: '📱',
      time: 'Immediate',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: 2,
      title: 'Received',
      subtitle: 'Command Center Alert',
      description: 'CSOCCC command center receives alert with full details, photos, and exact location for immediate assessment.',
      details: [
        'Real-time notifications',
        'Incident classification',
        'Priority assessment',
        'Resource evaluation'
      ],
      icon: '🖥️',
      time: '< 30 seconds',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: 3,
      title: 'Dispatch',
      subtitle: 'Team Deployment',
      description: 'Nearest available response teams are automatically assigned and deployed with optimal routing to incident location.',
      details: [
        'Automated team selection',
        'Route optimization',
        'Resource coordination',
        'Real-time tracking'
      ],
      icon: '🚁',
      time: '< 2 minutes',
      color: 'from-orange-500 to-orange-600'
    },
    {
      number: 4,
      title: 'Resolved',
      subtitle: 'Incident Resolution',
      description: 'Teams arrive on scene, resolve the situation, and submit detailed after-action reports for analysis and improvement.',
      details: [
        'On-scene response',
        'Conflict mediation',
        'Evidence collection',
        'Follow-up reports'
      ],
      icon: '✅',
      time: 'Average 45min',
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-fmld-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Incident Response Flow
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures rapid response to incidents across Nigeria, from initial report to complete resolution.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-32 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-orange-200 to-green-200"></div>

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Step Circle */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto relative z-10 shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <div className="text-sm font-semibold text-fmld-green mb-3">
                      {step.subtitle}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="text-xs text-gray-500 flex items-center justify-center">
                          <div className="w-1 h-1 bg-fmld-green rounded-full mr-2"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-xs font-semibold text-fmld-green">
                        Time: {step.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className={`absolute left-8 top-16 w-0.5 h-24 bg-gradient-to-b ${step.color} opacity-30`}></div>
                )}

                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}>
                    {step.number}
                  </div>

                  <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="text-2xl mr-3">{step.icon}</div>
                      <div>
                        <h3 className="text-lg font-heading font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <div className="text-sm font-semibold text-fmld-green">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="text-xs text-gray-500 flex items-center">
                          <div className="w-1 h-1 bg-fmld-green rounded-full mr-2"></div>
                          {detail}
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="text-xs font-semibold text-fmld-green">
                        Response Time: {step.time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
              Proven Track Record
            </h3>
            <p className="text-gray-600">
              Our systematic approach has delivered measurable results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-fmld-green mb-1">8min</div>
              <div className="text-sm text-gray-600">Average Total Response</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-fmld-green mb-1">89%</div>
              <div className="text-sm text-gray-600">Successful Resolution</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-fmld-green mb-1">24/7</div>
              <div className="text-sm text-gray-600">Continuous Operation</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-fmld-green mb-1">500+</div>
              <div className="text-sm text-gray-600">Response Personnel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}