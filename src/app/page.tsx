// src/app/(landing)/page.tsx

import { Hero } from '@/components/landing/Hero'
import { Statistics } from '@/components/landing/Statistics'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { IncidentTypes } from '@/components/landing/IncidentTypes'
import { MobileAppSection } from '@/components/landing/MobileAppSection'
import { Partners } from '@/components/landing/Partners'
import { CallToAction } from '@/components/landing/CallToAction'

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Key Statistics */}
      <Statistics />

      {/* Core Features */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      {/* Incident Types Covered */}
      <IncidentTypes />

      {/* Mobile App Section */}
      <MobileAppSection />

      {/* Partners */}
      <Partners />

      {/* Call to Action */}
      <CallToAction />
    </div>
  )
}