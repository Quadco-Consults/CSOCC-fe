// src/app/layout.tsx

import type { Metadata } from 'next'
import './globals.css'
import { APP_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} - ${APP_CONFIG.fullName}`,
  description: `${APP_CONFIG.description} - ${APP_CONFIG.tagline}. ${APP_CONFIG.subtagline}`,
  keywords: [
    'CSOCCC',
    'Federal Ministry of Livestock Development',
    'Nigeria',
    'Incident Management',
    'Security Operations',
    'Farmer-Herder Conflicts',
    'Cattle Rustling',
    'Emergency Response'
  ],
  authors: [{ name: 'Federal Ministry of Livestock Development' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#008751', // FMLD Green
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://csoccc.fmld.gov.ng',
    siteName: APP_CONFIG.fullName,
    title: `${APP_CONFIG.name} - ${APP_CONFIG.fullName}`,
    description: `${APP_CONFIG.tagline}. ${APP_CONFIG.subtagline}`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CSOCCC - Federal Ministry of Livestock Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_CONFIG.name} - ${APP_CONFIG.fullName}`,
    description: `${APP_CONFIG.tagline}. ${APP_CONFIG.subtagline}`,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-body antialiased">
        {children}
      </body>
    </html>
  )
}