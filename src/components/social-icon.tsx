import { IconButton } from '@chakra-ui/react'
import { icons } from '@tabler/icons-react'

import SmartLink from '@/components/smart-link'
import { Tooltip } from '@/components/ui/tooltip'

interface SocialIconProps {
  name: string
  icon: string
  href: string
}

function SocialIcon({ name, icon, href }: SocialIconProps) {
  const IconSvg = icon in icons ? icons[icon as keyof typeof icons] : icons.IconFileUnknown

  return (
    <Tooltip showArrow content={name}>
      <IconButton
        asChild
        variant="ghost"
        size="sm"
        css={{
          _icon: {
            width: '6',
            height: '6',
          },
        }}
      >
        <SmartLink href={href}>
          <IconSvg title={name} />
        </SmartLink>
      </IconButton>
    </Tooltip>
  )
}

export default SocialIcon
