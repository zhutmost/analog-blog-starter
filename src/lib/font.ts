import { Geist_Mono, Noto_Sans_SC, Space_Grotesk } from 'next/font/google'

const fontSpaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
})

const fontGeistMono = Geist_Mono({
  variable: '--font-geist-mono',
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
})

const fontNotoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
})

const customFontFamily = {
  heading: [fontSpaceGrotesk, fontNotoSansSC],
  body: [fontSpaceGrotesk, fontNotoSansSC],
  mono: [fontGeistMono],
}

export default customFontFamily
