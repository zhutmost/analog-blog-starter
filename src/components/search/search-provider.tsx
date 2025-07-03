'use client'

import * as React from 'react'
import { IconHome, IconInfoCircle, IconUser } from '@tabler/icons-react'
import { Action, KBarProvider } from 'kbar'
import { useRouter } from 'next/navigation'

import KBarModal from '@/components/search/search-modal'
import { allPages } from '@/content-collections'
import allPostsSorted from '@/lib/post-sort'
import siteConfig from '@/lib/site-config'

export default function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const pageActions: Action[] = [
    {
      id: 'home',
      name: 'Home',
      subtitle: 'Go back to the homepage',
      icon: <IconHome />,
      section: 'Pages',
      shortcut: ['h'],
      keywords: 'back',
      perform: () => {
        router.push('/')
      },
      priority: 5,
    },
    {
      id: 'about',
      name: 'About',
      subtitle: 'About me and this blog',
      icon: <IconUser />,
      section: 'Pages',
      shortcut: ['c'],
      keywords: 'email author',
      perform: () => {
        router.push('/about')
      },
      priority: 5,
    },
  ]

  const postActions = allPostsSorted.map((post) => ({
    id: `posts/${post.slug}`,
    name: post.title,
    keywords: post.summary || '',
    section: 'Posts',
    subtitle: post.datePublish.toLocaleDateString(siteConfig.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    perform: () => {
      router.push(`post/${post.slug}`)
    },
    priority: 10,
  }))

  const userPagesActions = allPages.map((page) => ({
    id: `posts/${page.slug}`,
    name: page.title,
    keywords: page.description ?? '',
    subtitle: page.dateUpdate.toLocaleDateString(siteConfig.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    icon: <IconInfoCircle />,
    section: 'Pages',
    perform: () => {
      router.push(`/${page.slug}`)
    },
    priority: 5,
  }))

  return (
    <KBarProvider actions={[...pageActions, ...postActions, ...userPagesActions]}>
      <KBarModal actions={[]} isLoading={false} />
      {children}
    </KBarProvider>
  )
}
