/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-flex e2e', () => {
  it('renders flex items in the default slot', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-flex>Flex Item</glu-flex>')

    const element = await page.find('glu-flex')

    expect(element.textContent).toContain('Flex Item')
  })

  it('applies correct inline styles based on props', async () => {
    const page = await newE2EPage()

    await page.setContent(`
      <glu-flex
        direction="column"
        align="flex-end"
        justify="space-between"
        gap="20px">
        Content
      </glu-flex>
    `)

    // Use getComputedStyle to check the CSS custom properties.
    const computedDirection = await page.evaluate(() => {
      const el = document.querySelector('glu-flex')

      return window.getComputedStyle(el).getPropertyValue('--flex-direction').trim()
    })

    expect(computedDirection).toEqual('column')

    const computedAlign = await page.evaluate(() => {
      const el = document.querySelector('glu-flex')

      return window.getComputedStyle(el).getPropertyValue('--flex-align').trim()
    })

    expect(computedAlign).toEqual('flex-end')

    const computedJustify = await page.evaluate(() => {
      const el = document.querySelector('glu-flex')

      return window.getComputedStyle(el).getPropertyValue('--flex-justify').trim()
    })

    expect(computedJustify).toEqual('space-between')

    const computedGap = await page.evaluate(() => {
      const el = document.querySelector('glu-flex')

      return window.getComputedStyle(el).getPropertyValue('--flex-gap').trim()
    })

    expect(computedGap).toEqual('20px')
  })

  it('forces center alignment when isCenter is true', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-flex is-center>Centered Content</glu-flex>')

    const computedAlign = await page.evaluate(() => {
      const el = document.querySelector('glu-flex')

      return window.getComputedStyle(el).getPropertyValue('--flex-align').trim()
    })

    expect(computedAlign).toEqual('center')

    const computedJustify = await page.evaluate(() => {
      const el = document.querySelector('glu-flex')

      return window.getComputedStyle(el).getPropertyValue('--flex-justify').trim()
    })

    expect(computedJustify).toEqual('center')
  })

  it('forwards inherited attributes', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-flex title="test-attr">Content</glu-flex>')

    const element = await page.find('glu-flex')

    // Verify that the title attribute is present on the host element.
    expect(element.getAttribute('title')).toBe('test-attr')
  })
})
