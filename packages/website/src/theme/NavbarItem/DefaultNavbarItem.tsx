import React, { type ReactNode } from 'react'

import type {
  Props
} from '@theme/NavbarItem/DefaultNavbarItem'
// import { GluMenuLabel } from '@gelato-ui/react'
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink'

export default function DefaultNavbarItem({
  ...props
}: Props): ReactNode {
  return (
    <NavbarNavLink {...props}>
      {props.label}
    </NavbarNavLink>
  )
}
