import React, { type ReactNode } from 'react'

import { Components } from '@gelato-ui/components'
import { GluMenuDropdown, GluMenuLabel } from '@gelato-ui/react'
import type {
  DesktopOrMobileNavBarItemProps,
  Props
} from '@theme/NavbarItem/DropdownNavbarItem'
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink'

const DropdownNavbarItemDesktop = ({
  items,
  position,
  className,
  onClick,
  ...props
}: DesktopOrMobileNavBarItemProps) => (
  <GluMenuDropdown>
    <GluMenuLabel>{props.children ?? props.label}</GluMenuLabel>
    <div slot="dropdown-content">
      {items.map((childItemProps, i) => (
        <NavbarNavLink
          key={i}
          href={childItemProps.to ? undefined : '#'}
          target={childItemProps.target as Components.GluMenuLabel['target']}
          {...childItemProps}
        >
          {childItemProps.label}
        </NavbarNavLink>
      ))}
    </div>
  </GluMenuDropdown>
)

export default function DropdownNavbarItem({
  // TODO: Mobile will be useful in the future
  // mobile = false,
  ...props
}: Props): ReactNode {
  const Comp = DropdownNavbarItemDesktop

  return <Comp {...props} />
}
