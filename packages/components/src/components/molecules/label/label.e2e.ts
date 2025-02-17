/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-label (E2E)', () => {
  it('renders correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-label for="input-id">Label Text</glu-label>')

    const element = await page.find('glu-label')

    expect(element).toHaveClass('hydrated')
  })

  it('associates with input correctly via for attribute', async () => {
    const page = await newE2EPage()

    await page.setContent(`
      <glu-label for="input-id">Label Text</glu-label>
      <input id="input-id" type="text" />
    `)

    const label = await page.find('glu-label')

    expect(label).toHaveAttribute('for')

    expect(await label.getAttribute('for')).toBe('input-id')
  })

  it('renders slotted content correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-label>Custom Label</glu-label>')

    const label = await page.find('glu-label')

    expect(label.innerText).toBe('Custom Label')
  })
})
