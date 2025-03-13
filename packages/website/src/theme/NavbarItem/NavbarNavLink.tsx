import React, { type ReactNode } from 'react'

import isInternalUrl from '@docusaurus/isInternalUrl'
import Link from '@docusaurus/Link'
import { isRegexpStringMatch } from '@docusaurus/theme-common'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { GluMenuLabel } from '@gelato-ui/react'
import IconExternalLink from '@theme/Icon/ExternalLink'
import type { Props } from '@theme/NavbarItem/NavbarNavLink'

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  ...props
}: Props): ReactNode {
  const toUrl = useBaseUrl(to)
  const activeBaseUrl = useBaseUrl(activeBasePath)
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true })
  const isExternalLink = label && href && !isInternalUrl(href)

  // Link content is set through html XOR label
  const linkContentProps = html ?
    { dangerouslySetInnerHTML: { __html: html } } :
    {
      children: (
        <>
          {label}
          {isExternalLink && (
            <IconExternalLink
              {...(isDropdownLink && { width: 12, height: 12 })}
            />
          )}
        </>
      )
    }

  if (href) {
    return (
      <GluMenuLabel>
        <Link
          href={prependBaseUrlToHref ? normalizedHref : href}
          {...props}
          {...linkContentProps}
        />
      </GluMenuLabel>
    )
  }

  return (
    <GluMenuLabel>
      <Link
        to={toUrl}
        isNavLink
        {...((activeBasePath || activeBaseRegex) && {
          isActive: (_match, location) => activeBaseRegex ?
            isRegexpStringMatch(activeBaseRegex, location.pathname) :
            location.pathname.startsWith(activeBaseUrl)
        })}
        {...props}
        {...linkContentProps}
      />
    </GluMenuLabel>
  )
}
