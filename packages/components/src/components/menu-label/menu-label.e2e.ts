/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-menu-label e2e', () => {
  it('renders an anchor when href is provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-menu-label href="https://example.com">Link Label</glu-menu-label>')

    const element = await page.find('glu-menu-label')

    expect(element).not.toBeNull()

    // Using the shadow piercing selector (>>>)
    const anchor = await page.find('glu-menu-label >>> a')

    expect(anchor).not.toBeNull()

    expect(anchor.getAttribute('href')).toBe('https://example.com')
  })

  it('renders slot content when no href is provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-menu-label>Plain Label</glu-menu-label>')

    const element = await page.find('glu-menu-label')

    expect(element).not.toBeNull()

    // Verify that the default slot content is present in the shadow root
    const slot = await page.find('glu-menu-label >>> slot')

    expect(slot).not.toBeNull()
  })
})
