/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-menu-label (E2E)', () => {
  it('renders correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-menu-label type="label">Label Item</glu-menu-label>')

    const element = await page.find('glu-menu-label')

    expect(element).toHaveClass('hydrated')

    const label = element.shadowRoot.querySelector('glu-label')

    expect(label).toBeTruthy()
  })
})
