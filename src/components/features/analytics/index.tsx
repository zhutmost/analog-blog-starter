import type * as React from 'react'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

import UmamiAnalytics, { type UmamiAnalyticsProps } from './umami'

const isProduction = process.env.NODE_ENV === 'production'

export interface AnalyticsConfig {
  umamiAnalytics?: UmamiAnalyticsProps
  googleAnalytics?: React.ComponentProps<typeof GoogleAnalytics>
  googleTagManager?: React.ComponentProps<typeof GoogleTagManager>
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
