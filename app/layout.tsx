import '@/styles/globals.css'
import { Metadata } from 'next'

import { siteConfig } from '@/config/site'

import { languages } from './i18n/settings'
import ProviderWrapper from './provider-wrapper'

export async function generateStaticParams() {
  return languages.map((language) => ({ language }))
}

export const metadata: Metadata = {
  metadataBase: new URL('https://pse.dev'),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params?: any
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <ProviderWrapper>{children}</ProviderWrapper>
}
