import * as React from 'react'
import { HomepageGreetings } from '@/components/homepage/homepage-intro'

const homepageGreetings: HomepageGreetings = {
  weOrI: 'I',
  fixed: [
    <>
      I am a dedicated&nbsp;<span className="font-medium">silicon designer</span>&nbsp;and a tech
      enthusiast.
    </>,
  ],
  scrolled: [
    <>
      I am currently a <b className="font-medium">post-doctor</b> 🔬 at{' '}
      <b className="font-medium">Fudan University</b>.
    </>,
    <>
      I live in <b className="font-medium">Shanghai, China 🇨🇳</b>.
    </>,
    <>
      I grew up in the picturesque city of <b className="font-medium">Jiaxing</b>.
    </>,
    <>
      My programming journey began with <b className="font-medium">Pascal and C</b>.
    </>,
    <>
      I am passionate about creating cutting-edge <b className="font-medium">AI chips</b>🤖.
    </>,
    <>
      I work mostly with <b className="font-medium">Verilog/Chisel</b> technologies.
    </>,
    <>
      My 🎵 playlist has everything from <b className="font-medium">Jay Chou</b> to{' '}
      <b className="font-medium">JJ Lin</b>.
    </>,
    'I am a video gamer 🎮 in my spare time.',
  ],
}

export default homepageGreetings
