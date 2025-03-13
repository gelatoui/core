/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-menu e2e', () => {
  it('renders the default component', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-menu></glu-menu>')

    const element = await page.find('glu-menu')

    expect(element).not.toBeNull()

    expect(element).toHaveClass('glu-menu')
  })

  it('renders the logo prop correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-menu logo="https://placehold.co/600x400"></glu-menu>')

    // Query the image inside the shadow DOM
    const img = await page.find('glu-menu >>> .glu-menu__logo-img')

    expect(img).not.toBeNull()

    expect(img.getAttribute('src')).toBe('https://placehold.co/600x400')
  })

  it('applies the sticky class when is-sticky is set', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-menu is-sticky></glu-menu>')

    const element = await page.find('glu-menu')

    expect(element).toHaveClass('glu-menu--sticky')
  })

  it('applies the mobile class when is-responsive is set and viewport is mobile', async () => {
    const page = await newE2EPage()

    // Set viewport to a mobile size (width < 768px)
    await page.setViewport({ width: 500, height: 800 })

    await page.setContent('<glu-menu is-responsive></glu-menu>')

    await page.waitForChanges()

    const element = await page.find('glu-menu')

    expect(element).toHaveClass('glu-menu--mobile')
  })
})
