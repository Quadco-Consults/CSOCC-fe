// src/components/landing/Partners.tsx

export function Partners() {
  const partners = [
    {
      name: 'Federal Ministry of Livestock Development',
      logo: '🇳🇬',
      description: 'Lead ministry overseeing livestock development in Nigeria'
    },
    {
      name: 'Office of the Secretary to the Government',
      logo: '🏛️',
      description: 'Supporting coordination at the federal level'
    },
    {
      name: 'Nigeria Police Force',
      logo: '👮',
      description: 'Primary law enforcement partner'
    },
    {
      name: 'Nigerian Armed Forces',
      logo: '🪖',
      description: 'Security support and coordination'
    },
    {
      name: 'State Governments',
      logo: '🏢',
      description: 'Local implementation and support'
    },
    {
      name: 'Traditional Rulers Council',
      logo: '👑',
      description: 'Community leadership and mediation'
    },
    {
      name: 'World Bank Group',
      logo: '🌍',
      description: 'International development partner'
    },
    {
      name: 'Food and Agriculture Organization (FAO)',
      logo: '🌾',
      description: 'UN agency for food and agriculture'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CSOCCC is a collaborative effort bringing together government agencies, security forces, international organizations, and local communities to ensure comprehensive livestock protection across Nigeria.
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-fmld-green hover:text-white transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {partner.logo}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-white mb-2 text-sm">
                {partner.name}
              </h3>
              <p className="text-xs text-gray-600 group-hover:text-white/90">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partnership Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Government Collaboration */}
          <div className="bg-fmld-gray-100 rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-xl font-heading font-bold text-gray-900">
                Government Collaboration
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                Federal Ministry of Livestock Development leadership
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                State government implementation support
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                Local government area coordination
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                Traditional authority integration
              </li>
            </ul>
          </div>

          {/* Security Partnership */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="text-center mb-6">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-heading font-bold text-gray-900">
                Security Partnership
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                Nigeria Police Force coordination
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                Military support when needed
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                State security services integration
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                Intelligence sharing protocols
              </li>
            </ul>
          </div>

          {/* International Support */}
          <div className="bg-fmld-gray-100 rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-xl font-heading font-bold text-gray-900">
                International Support
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                World Bank technical assistance
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                FAO livestock expertise
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                UN peacekeeping knowledge
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-fmld-green rounded-full mr-3 mt-2"></div>
                Best practice sharing
              </li>
            </ul>
          </div>
        </div>

        {/* Partnership Statement */}
        <div className="mt-16 bg-fmld-green rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
              "Together We Protect Nigeria's Livestock Heritage"
            </h3>
            <p className="text-fmld-cream text-lg leading-relaxed mb-6">
              The success of CSOCCC depends on the strong partnerships we've built across government, security agencies, international organizations, and local communities. Together, we're creating a safer, more secure environment for Nigeria's livestock sector.
            </p>
            <div className="text-fmld-gold font-semibold">
              — Honourable Minister Idi Mukhtar Maiha
            </div>
            <div className="text-fmld-cream text-sm mt-1">
              Federal Minister of Livestock Development
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}