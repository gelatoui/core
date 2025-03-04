import React, { type ReactNode } from 'react'

import { GluMenuLabel } from '@gelato-ui/react'
import type {
  Props
} from '@theme/NavbarItem/DefaultNavbarItem'

export default function DefaultNavbarItem({
  ...props
}: Props): ReactNode {
  return (
    <GluMenuLabel href={props.href || props.to}>
      {props.label}
    </GluMenuLabel>
  )
}
