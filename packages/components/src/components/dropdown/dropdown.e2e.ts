/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-dropdown e2e tests', () => {
  it('renders and hydrates', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-dropdown></glu-dropdown>')

    const element = await page.find('glu-dropdown')

    expect(element).toHaveClass('hydrated')
  })

  it('dismisses on backdrop click when isBackdropDismiss is true', async () => {
    const page = await newE2EPage()

    // Using property binding to set booleans correctly
    await page.setContent('<glu-dropdown is-backdrop-dismiss is-open show-backdrop="false"></glu-dropdown>')

    const dropdown = await page.find('glu-dropdown')
    const backdrop = await page.find('glu-dropdown >>> .dropdown-backdrop')

    expect(backdrop).not.toBeNull()

    await backdrop.click()

    await page.waitForChanges()

    expect(await dropdown.getProperty('is-open')).toBeUndefined()
  })

  it('renders backdrop with invisible style when showBackdrop is false but isBackdropDismiss is true', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-dropdown is-backdrop-dismiss is-open show-backdrop="false"></glu-dropdown>')

    const backdrop = await page.find('glu-dropdown >>> .dropdown-backdrop')

    expect(backdrop).not.toBeNull()

    const classList = await backdrop.getProperty('className')

    expect(classList).toContain('invisible-backdrop')
  })

  it('does not set dropdown content width in auto mode', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-dropdown size="auto"></glu-dropdown>')

    const trigger = await page.find('glu-dropdown >>> .dropdown-trigger')

    await trigger.click()

    await page.waitForChanges()

    const content = await page.find('glu-dropdown >>> .dropdown-content')

    expect(await content.getAttribute('style')).toBe(null)
  })

  it('renders arrow when hasArrow is true', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-dropdown has-arrow></glu-dropdown>')

    const arrow = await page.find('glu-dropdown >>> .dropdown-arrow')

    expect(arrow).not.toBeNull()
  })
})
