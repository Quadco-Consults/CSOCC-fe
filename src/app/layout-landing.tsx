// src/app/(landing)/layout.tsx

import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}