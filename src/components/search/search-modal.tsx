import * as React from 'react'
import { IconSearch } from '@tabler/icons-react'
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
  useRegisterActions,
} from 'kbar'

import { cn } from '@/lib/utils'

function Kbd({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <kbd
      className={cn(
        'rounded-lg border border-input px-2 py-1 text-sm font-semibold text-muted-foreground shadow-xs',
        className
      )}
      {...rest}
    />
  )
}

export default function KBarModal({
  actions,
  isLoading,
}: {
  actions: Action[]
  isLoading: boolean
}) {
  useRegisterActions(actions, [actions])

  return (
    <KBarPortal>
      <KBarPositioner className="bg-background/50 p-4 backdrop-blur-sm backdrop-filter dark:bg-background/50">
        <KBarAnimator className="w-full max-w-xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center space-x-4 p-4">
              <span className="block w-5">
                <IconSearch className="text-muted-foreground" />
              </span>
              <KBarSearch className="h-8 w-full bg-transparent text-foreground placeholder-muted-foreground focus:outline-hidden" />
              <Kbd>ESC</Kbd>
            </div>
            {!isLoading && <RenderResults />}
            {isLoading && (
              <div className="block border-t border-border px-4 py-8 text-center text-muted-foreground">
                Loading...
              </div>
            )}
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}

const RenderResults = () => {
  const { results } = useMatches()

  if (results.length) {
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) => (
          <div>
            {typeof item === 'string' ? (
              <div className="block border-t border-border px-4 pb-2 pt-4 text-xs font-semibold uppercase text-primary">
                {item}
              </div>
            ) : (
              <div
                className={cn(
                  'flex cursor-pointer justify-between px-4 py-2',
                  active ? 'bg-primary text-primary-foreground' : 'bg-transparent text-foreground'
                )}
              >
                <div className={'flex space-x-3'}>
                  {item.icon && (
                    <div
                      className={cn(
                        'self-center',
                        active ? 'text-primary-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {item.icon}
                    </div>
                  )}
                  <div className="block">
                    <div className={active ? 'text-primary-foreground' : 'text-card-foreground/70'}>
                      {item.name}
                    </div>
                    {item.subtitle && (
                      <div
                        className={cn(
                          active ? 'text-primary-foreground' : 'text-muted-foreground',
                          'text-xs'
                        )}
                      >
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>
                {item.shortcut?.length ? (
                  <div aria-hidden className="flex flex-row items-center justify-center gap-x-2">
                    {item.shortcut.map((sc) => (
                      <Kbd
                        key={sc}
                        className={cn('uppercase', active && 'text-primary-foreground')}
                      >
                        {sc}
                      </Kbd>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      />
    )
  } else {
    return (
      <div className="block border-t border-border px-4 py-8 text-center text-muted-foreground">
        No results for your search...
      </div>
    )
  }
}
