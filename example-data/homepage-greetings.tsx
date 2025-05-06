import * as React from 'react'
import { HomepageGreetings } from '@/components/homepage/homepage-intro'

const homepageGreetings: HomepageGreetings = {
  weOrI: 'I',
  fixed: [
    <>
      I am a dedicated&nbsp;<span className="font-medium">software developer</span>&nbsp;and a tech
      enthusiast.
    </>,
  ],
  scrolled: [
    <>
      I am aliased as <b className="font-medium">Alice</b> at work 💼.
    </>,
    <>
      I live in <b className="font-medium">Shanghai, China 🇨🇳</b>.
    </>,
    <>
      I was born in the beautiful <b className="font-medium">Jiaxing</b> city.
    </>,
    <>
      My first programming language I learned was <b className="font-medium">C++</b>.
    </>,
    <>
      I am focusing on building <b className="font-medium">GPU drivers</b>.
    </>,
    <>
      I work mostly with <b className="font-medium">Javascript/Typescript</b> technologies.
    </>,
    'I am a cat-person🐱.',
    'I am a sporty-guy. I love tennis 🎾 and soccer️ ⚽️.',
    'I love listening piano 🎹 and rap music🎵.',
    'I love playing video game🎮, StarCraft II is my favorite one.',
  ],
}

export default homepageGreetings
