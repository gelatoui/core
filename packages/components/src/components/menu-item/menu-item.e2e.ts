/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-menu-item (E2E)', () => {
  it('renders correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-menu-item type="label">Label Item</glu-menu-item>')

    const element = await page.find('glu-menu-item')

    expect(element).toHaveClass('hydrated')

    const label = element.shadowRoot.querySelector('glu-label')

    expect(label).toBeTruthy()
  })

  it('renders button type correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-menu-item type="button">Click Me</glu-menu-item>')

    const element = await page.find('glu-menu-item')
    const button = element.shadowRoot.querySelector('glu-button')

    expect(button).toBeTruthy()
  })
})
