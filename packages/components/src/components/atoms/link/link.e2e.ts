/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-link', () => {
  it('renders and applies default properties', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-link href="https://example.com">Example</glu-link>')

    const element = await page.find('glu-link')
    const anchor = await page.find('glu-link >>> a')

    expect(element).toHaveClass('hydrated')

    expect(anchor).toEqualAttribute('href', 'https://example.com')

    expect(anchor).toEqualAttribute('target', '_self')
  })

  it('applies custom target and rel attributes', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-link href="https://example.com" target="_blank" rel="noopener">Example</glu-link>')

    const anchor = await page.find('glu-link >>> a')

    expect(anchor).toEqualAttribute('target', '_blank')

    expect(anchor).toEqualAttribute('rel', 'noopener')
  })

  it('applies size class based on property', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-link href="https://example.com" size="large">Example</glu-link>')

    const element = await page.find('glu-link')

    expect(element).toHaveClass('glu-link--size-large')
  })
})
