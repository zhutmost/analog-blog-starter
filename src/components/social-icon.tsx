import { icons } from '@tabler/icons-react'

import SmartLink from '@/components/smart-link'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface SocialIconProps {
  name: string
  icon: string
  href: string
}

export default function SocialIcon({ name, icon, href }: SocialIconProps) {
  const IconSvg = icon in icons ? icons[icon as keyof typeof icons] : icons.IconFileUnknown

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SmartLink
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'text-accent-foreground/80'
            )}
            href={href}
          >
            <span className="sr-only">{name}</span>
            <IconSvg title={name} />
          </SmartLink>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
