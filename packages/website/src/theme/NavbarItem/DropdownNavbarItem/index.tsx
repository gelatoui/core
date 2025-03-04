import React, { type ReactNode } from 'react'

import { Components } from '@gelato-ui/components'
import { GluMenuDropdown, GluMenuLabel } from '@gelato-ui/react'
import type {
  DesktopOrMobileNavBarItemProps,
  Props
} from '@theme/NavbarItem/DropdownNavbarItem'

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
        <GluMenuLabel
          key={i}
          href={childItemProps.to}
          target={childItemProps.target as Components.GluMenuLabel['target']}
        >
          {childItemProps.label}
        </GluMenuLabel>
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
