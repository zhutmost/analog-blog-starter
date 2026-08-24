import { type Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { type ReactNode } from "react"

import { ThemeProvider } from "@wrksz/themes/next"

import { Analytics } from "@/components/analytics"
import { BackToTop } from "@/components/site/back-to-top"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { TooltipProvider } from "@/components/ui/shadcn/tooltip"

import "@/app/globals.css"
import { siteConfig } from "@/lib/site/config"

const fontSpaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: "variable",
  subsets: ["latin"],
})

const fontGeist = Geist({
  variable: "--font-geist",
  weight: "variable",
  subsets: ["latin"],
})

const fontGeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: "variable",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.siteTitle,
    template: `%s | ${siteConfig.siteTitle}`,
  },
  description: siteConfig.description,
  authors: { name: siteConfig.author },

  icons: {
    icon: [
      ...(siteConfig.favicon.svg
        ? [
            {
              url: siteConfig.favicon.svg,
              type: "image/svg+xml",
            },
          ]
        : []),
      ...(siteConfig.favicon.ico
        ? [
            {
              url: siteConfig.favicon.ico,
              sizes: "any",
            },
          ]
        : []),
      ...(siteConfig.favicon.png96x96
        ? [
            {
              url: siteConfig.favicon.png96x96,
              type: "image/png",
              sizes: "96x96",
            },
          ]
        : []),
    ],
    apple: siteConfig.favicon.apple
      ? {
          url: siteConfig.favicon.apple,
          sizes: "180x180",
        }
      : undefined,
  },

  alternates: {
    canonical: siteConfig.siteUrl,
    types: {
      "application/rss+xml": new URL("/rss.xml", siteConfig.siteUrl),
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "./",
    title: {
      default: siteConfig.siteTitle,
      template: `%s | ${siteConfig.siteTitle}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.siteTitle,
    locale: siteConfig.locale.replace("-", "_"),
    images: siteConfig.socialShare.defaultImages,
  },

  twitter: {
    card: "summary_large_image",
    title: {
      default: siteConfig.siteTitle,
      template: `%s | ${siteConfig.siteTitle}`,
    },
    description: siteConfig.description,
    site: siteConfig.socialShare.twitterSite,
    images: siteConfig.socialShare.defaultImages,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${fontGeist.variable} ${fontSpaceGrotesk.variable} ${fontGeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider disableTransitionOnChange>
          <TooltipProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex flex-1 flex-col">{children}</main>
              <SiteFooter />
            </div>

            <BackToTop />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
