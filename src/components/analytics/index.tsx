import {
  GoogleAnalytics,
  type GoogleAnalyticsProps,
  GoogleTagManager,
  type GoogleTagManagerProps,
} from './google'
import UmamiAnalytics, { type UmamiAnalyticsProps } from './umami'

const isProduction = process.env.NODE_ENV === 'production'

export interface AnalyticsConfig {
  umamiAnalytics?: UmamiAnalyticsProps
  googleAnalytics?: GoogleAnalyticsProps
  googleTagManager?: GoogleTagManagerProps
}

export interface AnalyticsProps {
  analyticsConfig: AnalyticsConfig
}

/**
 * Add website analytics to your site.
 * All components default to the hosted service, but can be configured to use a self-hosted
 * or proxied version of the script by providing the `src` / `apiHost` props.
 *
 * Note: If you want to use an analytics provider you have to add it to the
 * content security policy in the `next.config.js` file.
 */
export default function Analytics({ analyticsConfig }: AnalyticsProps) {
  return (
    <>
      {isProduction && analyticsConfig.umamiAnalytics && (
        <UmamiAnalytics {...analyticsConfig.umamiAnalytics} />
      )}
      {isProduction && analyticsConfig.googleAnalytics && (
        <GoogleAnalytics {...analyticsConfig.googleAnalytics} />
      )}
      {isProduction && analyticsConfig.googleTagManager && (
        <GoogleTagManager {...analyticsConfig.googleTagManager} />
      )}
    </>
  )
}

export type { UmamiAnalyticsProps, GoogleAnalyticsProps, GoogleTagManagerProps }
