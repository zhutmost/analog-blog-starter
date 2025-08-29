import Script from 'next/script'

/**
 * Props for the Umami component. Read more at https://umami.is/docs/tracker-configuration
 */
export interface UmamiAnalyticsProps {
  /** Source URL for the Umami script. Defaults to the official CDN. */
  src?: string
  /** The unique Umami website ID. */
  websiteId: string
  /** The Umami host URL. */
  hostUrl?: string
  /** Enable or disable automatic tracking. Defaults to true. */
  autoTrack?: boolean
  /** A comma-separated list of domains to limit tracking to. */
  domains?: string
  /** Tag to identify the script. */
  tag?: string
  /** Exclude URL query parameters from tracking. Defaults to false. */
  excludeSearch?: boolean
  /** Exclude hash fragments from tracking. Defaults to false. */
  excludeHash?: boolean
  /** Whether to respect the user's Do Not Track setting. Defaults to false. */
  doNotTrack?: boolean
}

const propToDataAttributeMap: Record<Exclude<keyof UmamiAnalyticsProps, 'src'>, string> = {
  websiteId: 'data-website-id',
  hostUrl: 'data-host-url',
  autoTrack: 'data-auto-track',
  domains: 'data-domains',
  tag: 'data-tag',
  excludeSearch: 'data-exclude-search',
  excludeHash: 'data-exclude-hash',
  doNotTrack: 'data-do-not-track',
}

export default function UmamiAnalytics({
  src = 'https://analytics.umami.is/script.js',
  ...props
}: UmamiAnalyticsProps) {
  const dataAttributes = Object.keys(props).reduce<Record<string, string>>((acc, key) => {
    const propKey = key as Exclude<keyof UmamiAnalyticsProps, 'src'>
    const dataKey = propToDataAttributeMap[propKey]
    const propValue = props[propKey]

    // Skip src and undefined values
    if (dataKey !== 'src' && propValue !== undefined) {
      acc[dataKey] = propValue.toString()
    }
    return acc
  }, {})

  return <Script async defer src={src} {...dataAttributes} />
}
