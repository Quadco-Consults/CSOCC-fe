// src/components/landing/CallToAction.tsx

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-fmld-green to-fmld-green-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 1000\"><defs><pattern id=\"grid\" width=\"50\" height=\"50\" patternUnits=\"userSpaceOnUse\"><path d=\"M 50 0 L 0 0 0 50\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(%23grid)\"/></svg>')] opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to Secure Nigeria's Livestock Future?
          </h2>
          <p className="text-xl md:text-2xl text-fmld-cream mb-8 leading-relaxed">
            Join the nationwide effort to protect our livestock sector and ensure peaceful coexistence between farmers and herders across Nigeria.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-white text-fmld-green hover:bg-fmld-cream font-bold px-10 py-4 text-lg shadow-lg"
              asChild
            >
              <Link href="/dashboard">Access Command Center</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-fmld-green font-bold px-10 py-4 text-lg"
              asChild
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl mb-3">📞</div>
              <div className="font-semibold mb-2">Emergency Hotline</div>
              <div className="text-fmld-cream">199</div>
              <div className="text-sm text-fmld-cream/80">Available 24/7</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">📧</div>
              <div className="font-semibold mb-2">General Inquiries</div>
              <div className="text-fmld-cream">info@fmld.gov.ng</div>
              <div className="text-sm text-fmld-cream/80">Response within 24 hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">📍</div>
              <div className="font-semibold mb-2">Headquarters</div>
              <div className="text-fmld-cream">3 Arms Zone, Maitama</div>
              <div className="text-sm text-fmld-cream/80">Abuja, Nigeria</div>
            </div>
          </div>

          {/* Quick Access for Different User Types */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">👮</div>
              <div className="font-semibold text-white mb-2">Security Personnel</div>
              <div className="text-fmld-cream text-sm mb-4">Access command dashboard and monitoring tools</div>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-fmld-green w-full"
                asChild
              >
                <Link href="/login">Login to Dashboard</Link>
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">📱</div>
              <div className="font-semibold text-white mb-2">Field Officers</div>
              <div className="text-fmld-cream text-sm mb-4">Download mobile app for incident reporting</div>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-fmld-green w-full"
                asChild
              >
                <Link href="#mobile-app">Download App</Link>
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🤝</div>
              <div className="font-semibold text-white mb-2">Community Leaders</div>
              <div className="text-fmld-cream text-sm mb-4">Partner with us for community safety</div>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-fmld-green w-full"
                asChild
              >
                <Link href="#contact">Get Involved</Link>
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">📰</div>
              <div className="font-semibold text-white mb-2">Media & Press</div>
              <div className="text-fmld-cream text-sm mb-4">Access press releases and media resources</div>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-fmld-green w-full"
                asChild
              >
                <Link href="/media">Media Center</Link>
              </Button>
            </div>
          </div>

          {/* Final Message */}
          <div className="mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl mr-4">🇳🇬</div>
              <div className="text-left">
                <div className="text-xl font-bold text-white">Federal Ministry of Livestock Development</div>
                <div className="text-fmld-cream">Protecting Nigeria's Livestock Sector Since 2019</div>
              </div>
            </div>
            <p className="text-fmld-cream text-center max-w-2xl mx-auto">
              CSOCCC is more than technology—it's a commitment to peace, prosperity, and progress for all Nigerians involved in livestock production and agriculture.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}