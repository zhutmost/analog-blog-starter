import * as React from 'react'

import GithubCalendar from '@/components/homepage/github-calendar'
import ScrolledGreetings from '@/components/homepage/scrolled-greetings'
import SmartLink from '@/components/smart-link'
import Twemojify from '@/components/twemoji'
import homepageGreetings from '@/data/homepage-greetings'
import siteConfig from '@/lib/site-config'

export type HomepageGreetingsItem = string | React.ReactNode

export interface HomepageGreetings {
  weOrI: 'I' | 'We'
  fixed: HomepageGreetingsItem[]
  scrolled: HomepageGreetingsItem[]
}

export default function HomepageIntro() {
  const greetingWeOrI: string =
    homepageGreetings.weOrI === 'I' ? 'Hi, folks! I am ' : 'Hi, folks! We are '

  return (
    <>
      <h1 className="mb-8 text-5xl font-extrabold leading-[60px] tracking-tight text-foreground/70 lg:text-6xl lg:leading-[86px]">
        {greetingWeOrI}
        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {siteConfig.author}
        </span>
        <Twemojify size={'lg'} className="ml-6">
          👋
        </Twemojify>
      </h1>
      <div className="text-lg text-muted-foreground">
        {homepageGreetings.fixed.map((item, index) => (
          <Twemojify key={index}>
            <p>{item}</p>
          </Twemojify>
        ))}

        {homepageGreetings.scrolled.length && (
          <ScrolledGreetings greetings={homepageGreetings.scrolled} />
        )}

        {siteConfig.homepage.githubCalendar && (
          <div className="space-y-4 py-4">
            <p>
              I also go by&nbsp;
              <SmartLink
                href={`https://github.com/${siteConfig.homepage.githubCalendar}`}
                className="inline text-primary hover:text-primary/80 hover:underline hover:underline-offset-2"
              >
                @{siteConfig.homepage.githubCalendar}
              </SmartLink>
              &nbsp;when coding. Catch me on GitHub!
            </p>
            <div className="py-8">
              <GithubCalendar username={siteConfig.homepage.githubCalendar} />
            </div>
          </div>
        )}

        <p>
          <Twemojify>Happy reading!&nbsp;🍻</Twemojify>
        </p>
      </div>
    </>
  )
}
