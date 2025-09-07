import { createSystem, defaultConfig } from '@chakra-ui/react'

// import customFontFamily from '@/lib/font'
const fontsFallback =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
const fontsMonoFallback =
  'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'

const chakraSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        slate: {
          50: { value: '#f8fafc' },
          100: { value: '#f1f5f9' },
          200: { value: '#e2e8f0' },
          300: { value: '#cbd5e1' },
          400: { value: '#94a3b8' },
          500: { value: '#64748b' },
          600: { value: '#475569' },
          700: { value: '#334155' },
          800: { value: '#1e293b' },
          900: { value: '#0f172a' },
          950: { value: '#0f172a' },
        },
        gray: {
          50: { value: '{colors.slate.50}' },
          100: { value: '{colors.slate.100}' },
          200: { value: '{colors.slate.200}' },
          300: { value: '{colors.slate.300}' },
          400: { value: '{colors.slate.400}' },
          500: { value: '{colors.slate.500}' },
          600: { value: '{colors.slate.600}' },
          700: { value: '{colors.slate.700}' },
          800: { value: '{colors.slate.800}' },
          900: { value: '{colors.slate.900}' },
          950: { value: '{colors.slate.950}' },
        },
      },
      fonts: {
        // Due to the [import-is-undefined] error when typegen, we need to set font families' value manually.
        heading: {
          value: `Space Grotesk, Noto Sans SC, ${fontsFallback}`,
          // value: customFontFamily.heading.map((font) => font.style.fontFamily).join(', '),
        },
        body: {
          value: `Space Grotesk, Noto Sans SC, ${fontsFallback}`,
          // value: customFontFamily.body.map((font) => font.style.fontFamily).join(', '),
        },
        mono: {
          value: `Geist Mono, ${fontsMonoFallback}`,
          // value: customFontFamily.mono.map((font) => font.style.fontFamily).join(', '),
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          // Actually, only DEFAULT and contrast are used
          DEFAULT: { value: '{colors.teal.solid}' },
          fg: { value: '{colors.teal.fg}' },
          muted: { value: '{colors.teal.muted}' },
          subtle: { value: '{colors.teal.subtle}' },
          emphasized: { value: '{colors.teal.emphasized}' },
          solid: { value: '{colors.teal.solid}' },
          contrast: { value: '{colors.teal.contrast}' },
          focusRing: { value: '{colors.teal.focusRing}' },
        },
        fg: {
          muted: { value: { base: '{colors.gray.500}', _dark: '{colors.gray.400}' } },
        },
        bg: {
          muted: { value: { base: '{colors.gray.100}', _dark: '{colors.gray.800}' } },
        },
        chart1: { value: { base: '#e76e50', _dark: '#2662d9' } },
        chart2: { value: { base: '#2a9d90', _dark: '#2eb88a' } },
        chart3: { value: { base: '#274754', _dark: '#e88c30' } },
        chart4: { value: { base: '#e8c468', _dark: '#af57db' } },
        chart5: { value: { base: '#f4a462', _dark: '#e23670' } },
      },
    },
  },
})

export default chakraSystem
