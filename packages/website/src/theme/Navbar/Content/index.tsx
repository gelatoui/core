import React, { type ReactNode } from 'react'

import styles from './NavbarContent.module.css'

import { useLocation } from '@docusaurus/router'
import {
  ErrorCauseBoundary,
  useThemeConfig
} from '@docusaurus/theme-common'
import {
  splitNavbarItems
} from '@docusaurus/theme-common/internal'
import { GluButton, GluIcon, GluMenu } from '@gelato-ui/react'
import NavbarLogo from '@theme/Navbar/Logo'
import NavbarSearch from '@theme/Navbar/Search'
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem'
import SearchBar from '@theme/SearchBar'

// TODO temporary casting until ThemeConfig type is improved
const useNavbarItems = () => useThemeConfig().navbar.items as NavbarItemConfig[]

const NavbarItems = ({ items }: { items: NavbarItemConfig[] }): ReactNode => (
  <>
    {items.map((item, index) => (
      <ErrorCauseBoundary
        key={index}
        onError={error => new Error(
          `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`, { cause: error }
        )}
      >
        <NavbarItem {...item} />
      </ErrorCauseBoundary>
    ))}
  </>
)

const NavbarContent = () => {
  const items = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems(items)
  const searchBarItem = items.find(item => item.type === 'search')
  const location = useLocation()
  const isDocsPage = location.pathname.includes('/docs/')

  return (
    <GluMenu type="menu-center" className={isDocsPage ? styles['border-bottom'] : ''} isSticky isResponsive>
      <div slot="logo">
        <NavbarLogo />
      </div>
      {/* Logo can be provided as an image via the slot */}
      {/* <img src="/img/logo.png" slot="logo" alt="Logo" width="120" /> */}

      {/* Menu Items */}
      <div slot="menu-items">
        <NavbarItems items={leftItems} />
      </div>

      {/* TODO: This can be improved using NavbarItems */}
      {/* Right Actions */}
      <div slot="right-actions">
        {rightItems?.map((item, index) => (
          <GluButton href={item.href} size="large" key={index}>
            {(item as unknown as { label: string }).label}
            <span slot="end">
              <GluIcon name="arrow-up-right" size={18}></GluIcon>
            </span>
          </GluButton>
        ))}

        {/* TODO: feature not available yet */}
        {/* <NavbarItems items={rightItems} /> */}
        {/* <NavbarColorModeToggle /> */}
        {!searchBarItem && (
          <NavbarSearch>
            <SearchBar />
          </NavbarSearch>
        )}
      </div>
    </GluMenu>
  )
}

export default NavbarContent
