/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-button (E2E)', () => {
  it('renders correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-button>Click me</glu-button>')

    const element = await page.find('glu-button')

    expect(element).toHaveClass('hydrated')
  })

  it('renders an anchor when href is provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-button href="https://example.com">Go</glu-button>')

    const anchor = await page.find('glu-button >>> a')

    expect(anchor).not.toBeNull()

    expect(anchor).toHaveAttribute('href')
  })

  it('handles disabled state', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-button disabled>Disabled</glu-button>')

    const button = await page.find('glu-button')

    expect(button).toHaveAttribute('disabled')
  })

  it('applies correct classes based on properties', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-button appearance="outline" size="large" button-type="secondary"></glu-button>')

    const element = await page.find('glu-button')

    expect(element).toHaveClass('glu-button--secondary')

    expect(element).toHaveClass('glu-button--size-large')

    expect(element).toHaveClass('glu-button--appearance-outline')
  })

  it('triggers click event when clicked', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-button>Click me</glu-button>')

    const button = await page.find('glu-button >>> button')
    const clickEvent = await button.spyOnEvent('click')

    await button.click()

    expect(clickEvent).toHaveReceivedEvent()
  })
})
