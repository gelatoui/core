/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-breadcrumbs', () => {
  it('renders breadcrumbs and their content', async () => {
    const page = await newE2EPage()

    await page.setContent(`
      <glu-breadcrumbs>
        <glu-breadcrumb href="/home">Home</glu-breadcrumb>
        <glu-breadcrumb href="/products">Products</glu-breadcrumb>
      </glu-breadcrumbs>
    `)

    const breadcrumbs = await page.find('glu-breadcrumbs')

    expect(breadcrumbs).not.toBeNull()

    const items = await page.findAll('glu-breadcrumb')

    expect(items.length).toBe(2)

    const firstItem = await items[0].shadowRoot.querySelector('a')

    expect(firstItem).not.toBeNull()

    expect(await firstItem.href).toContain('/home')
  })

  it('ensures accessibility attributes are present', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-breadcrumbs></glu-breadcrumbs>')

    const navElement = await page.find('glu-breadcrumbs >>> nav')

    expect(navElement).not.toBeNull()

    expect(await navElement.getAttribute('aria-label')).toBe('Breadcrumb')
  })
})
