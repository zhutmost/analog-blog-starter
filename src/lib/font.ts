import { Geist_Mono, Noto_Sans_SC, Space_Grotesk } from 'next/font/google'

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const fontGeistMono = Geist_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

const fontNotoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-sc',
})

const customFontFamily = {
  heading: [fontSpaceGrotesk, fontNotoSansSC],
  body: [fontSpaceGrotesk, fontNotoSansSC],
  mono: [fontGeistMono],
}

export default customFontFamily
