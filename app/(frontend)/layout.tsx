import { cn } from '@/src/lib/utils'
import Navbar from '@/src/modules/shared/components/Navbar'
import { Providers } from '@/src/lib/providers'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mvacoimbra.dev.br'),
  title: {
    default: 'mvacoimbra',
    template: '%s | mvacoimbra',
  },
  description: 'teste de metadados',
  openGraph: {
    title: 'mvacoimbra',
    description: 'teste de open graph',
    url: 'https://mvacoimbra.dev.br',
    siteName: 'mvacoimbra portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'nem tenho twitter',
    card: 'summary_large_image',
  },
  verification: {
    google: '',
    yandex: '',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6',
          fontSans.variable,
        )}
      >
        <Providers>
          {children}
          <Navbar />
        </Providers>
      </body>
    </html>
  )
}
