/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-breadcrumb (E2E)', () => {
  it('renders without crashing', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-breadcrumb>Home</glu-breadcrumb>')

    const element = await page.find('glu-breadcrumb')

    expect(element).not.toBeNull()
  })

  it('renders a slot', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-breadcrumb>Home</glu-breadcrumb>')

    const element = await page.find('glu-breadcrumb')

    expect(element).not.toBeNull()

    expect(element.innerText).toBe('Home')
  })

  it('renders an anchor tag when href is provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-breadcrumb href="/home">Home</glu-breadcrumb>')

    const anchor = await page.find('glu-breadcrumb >>> a')

    expect(anchor).not.toBeNull()

    expect(anchor.getAttribute('href')).toBe('/home')
  })

  it('clicking breadcrumb with href navigates to correct URL', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-breadcrumb href="/home">Home</glu-breadcrumb>')

    const anchor = await page.find('glu-breadcrumb >>> a')

    expect(anchor).not.toBeNull()

    const href = await anchor.getAttribute('href')

    expect(href).toBe('/home')

    // Simulate click
    await anchor.click()

    await page.waitForChanges()

    // Check if the page URL updates (assuming navigation is handled correctly)
    const newUrl = page.url()

    expect(newUrl).toContain('/home')
  })

  it('clicking breadcrumb without href does not navigate', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-breadcrumb>Home</glu-breadcrumb>')

    const breadcrumb = await page.find('glu-breadcrumb')

    expect(breadcrumb).not.toBeNull()

    const initialUrl = page.url()

    // Simulate click
    await breadcrumb.click()

    await page.waitForChanges()

    // Ensure the URL remains unchanged
    expect(page.url()).toBe(initialUrl)
  })
})
