// src/components/landing/Hero.tsx

'use client'

import { Button } from '@/components/ui/button'
import { APP_CONFIG } from '@/lib/constants'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg">
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 tracking-tight">
            <span className="block">CENTRAL STRATEGIC</span>
            <span className="block">OPERATIONS</span>
            <span className="block text-fmld-gold">COMMAND AND CONTROL</span>
            <span className="block">CENTER</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
            {APP_CONFIG.tagline}
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            {APP_CONFIG.subtagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-fmld-green hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link href="/dashboard">Access Command Center</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-fmld-green font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link href="#mobile-app">Download Mobile App</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-fmld-gold">36</div>
              <div className="text-sm md:text-base text-white/80">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-fmld-gold">&lt;8min</div>
              <div className="text-sm md:text-base text-white/80">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-fmld-gold">500+</div>
              <div className="text-sm md:text-base text-white/80">Officers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-fmld-gold">24/7</div>
              <div className="text-sm md:text-base text-white/80">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Preview (Placeholder) */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
          <div className="w-64 h-40 bg-gradient-to-br from-fmld-green/20 to-fmld-green-dark/20 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-white/60">
              <span className="text-sm">Interactive Map Preview</span>
            </div>
            {/* Animated Incident Markers */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-12 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-16 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-6 right-8 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
          <div className="mt-2 text-xs text-white/70">
            Real-time incident monitoring across Nigeria
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}