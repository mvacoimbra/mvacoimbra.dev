import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Inter as FontSans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { type Locale, routing } from '@/src/i18n/routing'
import {
  getNavbarItems,
  getOpenGraph,
  getProfile,
} from '@/src/lib/fetch-data'
import { Providers } from '@/src/lib/providers'
import { cn } from '@/src/lib/utils'
import Navbar from '@/src/modules/shared/components/Navbar'
import '../globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  'pt-BR': 'pt_BR',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const safeLocale = (
    routing.locales.includes(locale as Locale) ? locale : 'en'
  ) as Locale
  const [profile, og] = await Promise.all([
    getProfile(safeLocale),
    getOpenGraph(safeLocale),
  ])
  return {
    metadataBase: new URL('https://mvacoimbra.dev.br'),
    title: {
      default: 'mvacoimbra',
      template: `%s | ${profile.name}`,
    },
    description: og.description,
    openGraph: {
      title: og.title,
      description: og.description,
      url: 'https://mvacoimbra.dev.br',
      siteName: `${profile.name} portfolio`,
      locale: OG_LOCALE[locale] ?? 'en_US',
      type: 'website',
      images: [
        {
          url: og.imageUrl,
          width: 1200,
          height: 630,
          alt: og.title,
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
      title: og.title,
      description: og.description,
      card: 'summary_large_image',
      images: [og.imageUrl],
    },
    verification: {
      google: '',
      yandex: '',
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicon/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: '/favicon/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      apple: [{ url: '/favicon/apple-touch-icon.png' }],
      other: [
        {
          rel: 'manifest',
          url: '/favicon/site.webmanifest',
        },
      ],
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const navbarItems = await getNavbarItems(locale as Locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider>
          <Providers>
            {children}
            <Navbar items={navbarItems} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
