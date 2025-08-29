import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'

export interface GoogleAnalyticsProps {
  gaId: string
  dataLayerName?: string
  nonce?: string
}

export default function GoogleAnalytics(props: GoogleAnalyticsProps) {
  return <NextGoogleAnalytics {...props} />
}
