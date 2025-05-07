import pluginTwTypography from '@tailwindcss/typography'
import pluginTwAnimate from 'tailwindcss-animate'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import { createThemes } from 'tw-colors'

import type { Config as TwConfig } from 'tailwindcss'

const pluginTwColors = createThemes({
  light: {
    background: colors.white,
    foreground: colors.slate['950'],
    card: colors.white,
    'card-foreground': colors.slate['950'],
    popover: colors.white,
    'popover-foreground': colors.slate['950'],
    primary: colors.violet['600'],
    'primary-foreground': colors.slate['50'],
    secondary: colors.slate['100'],
    'secondary-foreground': colors.slate['900'],
    muted: colors.slate['100'],
    'muted-foreground': colors.slate['500'],
    accent: colors.slate['100'],
    'accent-foreground': colors.slate['900'],
    destructive: colors.red['500'],
    'destructive-foreground': colors.slate['50'],
    border: colors.slate['200'],
    input: colors.slate['200'],
    ring: colors.violet['600'],
    chart: {
      '1': '#e76e50',
      '2': '#2a9d90',
      '3': '#274754',
      '4': '#e8c468',
      '5': '#f4a462',
    },
  },
  dark: {
    background: colors.slate['950'],
    foreground: colors.slate['50'],
    card: colors.slate['950'],
    'card-foreground': colors.slate['50'],
    popover: colors.slate['950'],
    'popover-foreground': colors.slate['50'],
    primary: colors.violet['700'],
    'primary-foreground': colors.slate['50'],
    secondary: colors.slate['800'],
    'secondary-foreground': colors.slate['50'],
    muted: colors.slate['800'],
    'muted-foreground': colors.slate['400'],
    accent: colors.slate['800'],
    'accent-foreground': colors.slate['50'],
    destructive: colors.red['900'],
    'destructive-foreground': colors.slate['50'],
    border: colors.slate['800'],
    input: colors.slate['800'],
    ring: colors.violet['700'],
    chart: {
      '1': '#2662d9',
      '2': '#2eb88a',
      '3': '#e88c30',
      '4': '#af57db',
      '5': '#e23670',
    },
  },
})

const userDataDir = process.env.USER_DATA_DIR ?? 'data-demo'

const config: TwConfig = {
  plugins: [pluginTwTypography, pluginTwAnimate, pluginTwColors],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    `./${userDataDir}/**/*.{js,ts,jsx,tsx,mdx}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-space-grotesk)',
          'var(--font-noto-sans-sc)',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['var(--font-jetbrains-mono)', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  darkMode: 'class',
}
export default config
