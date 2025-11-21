import { cn } from '@/src/lib/utils'
import Navbar from '@/src/modules/shared/components/Navbar'
import { Providers } from '@/src/lib/providers'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { getNavbarItems, getProfile } from '@/src/lib/fetch-data'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile()
  return {
    metadataBase: new URL('https://mvacoimbra.dev.br'),
    title: {
      default: 'mvacoimbra',
      template: `%s | ${profile.name}`,
    },
    description: profile.description,
    openGraph: {
      title: profile.name,
      description: profile.description,
      url: 'https://mvacoimbra.dev.br',
      siteName: `${profile.name} portfolio`,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: profile.avatarUrl,
          width: 800,
          height: 600,
          alt: profile.name,
        },
      ],
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
      title: profile.name,
      card: 'summary_large_image',
      images: [profile.avatarUrl],
    },
    verification: {
      google: '',
      yandex: '',
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/favicon/apple-touch-icon.png' },
      ],
      other: [
        {
          rel: 'manifest',
          url: '/favicon/site.webmanifest',
        },
      ],
    }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navbarItems = await getNavbarItems()

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
          <Navbar items={navbarItems} />
        </Providers>
      </body>
    </html>
  )
}
