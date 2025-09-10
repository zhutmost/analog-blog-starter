import type * as React from 'react'
import { Flex, VStack } from '@chakra-ui/react'
import type { Metadata } from 'next'

import Provider from '@/app/provider'
import Analytics from '@/components/analytics'
import BackToTop from '@/components/back-to-top'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import customFontFamily from '@/lib/font'
import siteConfig from '@/lib/site-config'

import '@/styles/twemoji.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.siteTitle,
    template: `%s | ${siteConfig.siteTitle}`,
  },
  description: siteConfig.description,
  authors: { name: siteConfig.author },
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteConfig.seo.openGraph?.title,
    description: siteConfig.seo.openGraph?.description,
    url: new URL(siteConfig.siteUrl),
    siteName: siteConfig.seo.openGraph?.siteName,
    images: siteConfig.seo.openGraph?.images,
    locale: siteConfig.seo.openGraph?.locale,
    type: 'website',
  },
  alternates: {
    canonical: new URL(siteConfig.siteUrl),
    types: {
      'application/rss+xml': new URL('rss.xml', siteConfig.siteUrl),
    },
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
    title: siteConfig.seo.twitter?.title,
    description: siteConfig.seo.twitter?.description,
    card: 'summary_large_image',
    images: siteConfig.seo.twitter?.images,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const customFontVariables: string[] = Object.values(customFontFamily)
    .flat()
    .map((font) => font.variable)

  return (
    <html lang={siteConfig.locale} suppressHydrationWarning>
      <Analytics analyticsConfig={siteConfig.analytics} />
      <body className={`${customFontVariables.join(' ')} antialiased`}>
        <Provider>
          <VStack minH="dvh" bgColor="bg">
            <SiteHeader />
            <Flex
              as="main"
              flexGrow={1}
              w="full"
              maxW="5xl"
              justify="center"
              color="fg.muted"
              px={{ base: 6, xl: 0 }}
              pb={10}
            >
              {children}
            </Flex>
            <SiteFooter />
          </VStack>
          <BackToTop />
        </Provider>
      </body>
    </html>
  )
}
