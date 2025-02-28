/* eslint-disable no-undef */
import { GluBreadcrumb } from './breadcrumb'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-breadcrumb', () => {
  it('renders without crashing', async () => {
    const page = await newSpecPage({
      components: [GluBreadcrumb],
      html: '<glu-breadcrumb></glu-breadcrumb>'
    })

    expect(page.root).toBeTruthy()
  })

  it('renders a slot', async () => {
    const page = await newSpecPage({
      components: [GluBreadcrumb],
      html: '<glu-breadcrumb>Home</glu-breadcrumb>'
    })

    expect(page.root.textContent).toContain('Home')
  })

  it('renders an anchor when href is provided', async () => {
    const page = await newSpecPage({
      components: [GluBreadcrumb],
      html: '<glu-breadcrumb href="/home">Home</glu-breadcrumb>'
    })

    await page.waitForChanges()

    const anchor = page.root?.shadowRoot?.querySelector('a')

    expect(anchor).not.toBeNull()

    expect(anchor?.getAttribute('href')).toBe('/home')
  })
})
