// src/components/landing/Footer.tsx

import Link from 'next/link'
import Image from 'next/image'
import { APP_CONFIG, FMLD_CONTACT, LOGO_URLS } from '@/lib/constants'

export function Footer() {
  const quickLinks = [
    { name: 'About FMLD', href: '/about' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resources', href: '/resources' },
    { name: 'Careers', href: '/careers' },
    { name: 'Procurement', href: '/procurement' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Data Protection', href: '/data-protection' },
    { name: 'Accessibility', href: '/accessibility' },
  ]

  return (
    <footer className="bg-fmld-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ministry Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative h-12 w-12">
                <Image
                  src={LOGO_URLS.emblem}
                  alt="FMLD Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-heading font-bold text-white">
                  {APP_CONFIG.name}
                </div>
                <div className="text-sm text-gray-400">
                  FMLD, Nigeria
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              The Federal Ministry of Livestock Development is committed to developing sustainable livestock systems that enhance food security, create wealth, and promote peaceful coexistence in Nigeria.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-400">
                <span className="font-semibold">Minister:</span> Hon. Idi Mukhtar Maiha
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-semibold">Permanent Secretary:</span> Dr. Chinyere Ijeoma Akujobi
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-fmld-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-fmld-gold mb-1">Headquarters</div>
                <div className="text-gray-300 text-sm">
                  {FMLD_CONTACT.address}
                </div>
              </div>
              <div>
                <div className="font-semibold text-fmld-gold mb-1">Email</div>
                <div className="text-gray-300 text-sm">
                  <a href={`mailto:${FMLD_CONTACT.email}`} className="hover:text-white transition-colors">
                    {FMLD_CONTACT.email}
                  </a>
                </div>
              </div>
              <div>
                <div className="font-semibold text-fmld-gold mb-1">Emergency Hotline</div>
                <div className="text-gray-300 text-sm">
                  <a href="tel:199" className="hover:text-white transition-colors text-lg font-bold">
                    199
                  </a>
                </div>
                <div className="text-gray-400 text-xs">Available 24/7</div>
              </div>
              <div>
                <div className="font-semibold text-fmld-gold mb-1">Website</div>
                <div className="text-gray-300 text-sm">
                  <a href={FMLD_CONTACT.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {FMLD_CONTACT.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Services & Support */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Services & Support</h3>
            <div className="space-y-4">
              <div>
                <Link href="/dashboard" className="block bg-fmld-green hover:bg-fmld-green-dark transition-colors rounded-lg p-3 text-center text-white font-semibold text-sm">
                  Access Command Center
                </Link>
              </div>
              <div>
                <Link href="#mobile-app" className="block border border-gray-600 hover:border-fmld-gold transition-colors rounded-lg p-3 text-center text-gray-300 hover:text-fmld-gold font-semibold text-sm">
                  Download Mobile App
                </Link>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Follow Updates</div>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-fmld-gold transition-colors">
                    <span className="sr-only">Facebook</span>
                    📘
                  </a>
                  <a href="#" className="text-gray-400 hover:text-fmld-gold transition-colors">
                    <span className="sr-only">Twitter</span>
                    🐦
                  </a>
                  <a href="#" className="text-gray-400 hover:text-fmld-gold transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    💼
                  </a>
                  <a href="#" className="text-gray-400 hover:text-fmld-gold transition-colors">
                    <span className="sr-only">YouTube</span>
                    📺
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Federal Ministry of Livestock Development, Nigeria. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-fmld-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Government Footer */}
        <div className="py-4 bg-fmld-gray-800 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center text-center">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <span className="text-lg">🇳🇬</span>
                <span className="text-xs text-gray-400">
                  An official website of the Federal Republic of Nigeria
                </span>
              </div>
              <div className="sm:ml-4 text-xs text-gray-500">
                Secure • Verified • Trusted
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}