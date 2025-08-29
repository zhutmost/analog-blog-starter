import type * as React from 'react'
import {
  IconAlertTriangle,
  IconBiohazard,
  IconCircleCheck,
  IconFlag3,
  IconInfoCircle,
} from '@tabler/icons-react'

import { Alert } from '@/components/ui/alert'

// GitHub Flavored Markdown (GFM) alert keywords
type GfmAlertKeyword = 'note' | 'tip' | 'important' | 'warning' | 'caution'

export interface GfmAlertProps {
  keyword: GfmAlertKeyword
  title: string
  children: React.ReactNode
}

export default function GfmAlert({ keyword, title, children }: GfmAlertProps) {
  const alertMap: Record<GfmAlertKeyword, { Icon: React.ElementType; colorPalette: string }> = {
    note: { Icon: IconInfoCircle, colorPalette: 'gray' },
    tip: { Icon: IconCircleCheck, colorPalette: 'green' },
    important: { Icon: IconFlag3, colorPalette: 'blue' },
    warning: { Icon: IconAlertTriangle, colorPalette: 'orange' },
    caution: { Icon: IconBiohazard, colorPalette: 'red' },
  }
  const { Icon, colorPalette } = alertMap[keyword]

  return (
    <Alert
      icon={<Icon />}
      title={title}
      colorPalette={colorPalette}
      borderStartWidth="3px"
      borderStartColor="colorPalette.solid"
      my={3}
    >
      {children}
    </Alert>
  )
}
