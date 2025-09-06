import {
  GoogleAnalytics as NextGoogleAnalytics,
  GoogleTagManager as NextGoogleTagManager,
} from '@next/third-parties/google'

export interface GoogleAnalyticsProps {
  gaId: string
  dataLayerName?: string
  nonce?: string
}

export function GoogleAnalytics(props: GoogleAnalyticsProps) {
  return <NextGoogleAnalytics {...props} />
}

export interface GoogleTagManagerProps {
  gtmId: string
  gtmScriptUrl?: string
  dataLayer?: {
    // biome-ignore lint/suspicious/noExplicitAny: JSON value can be any of types
    [key: string]: any
  }
  dataLayerName?: string
  auth?: string
  preview?: string
  nonce?: string
}

export function GoogleTagManager(props: GoogleTagManagerProps) {
  return <NextGoogleTagManager {...props} />
}
