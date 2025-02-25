/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-checkbox', () => {
  it('renders and initializes correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-checkbox></glu-checkbox>')

    const element = await page.find('glu-checkbox')

    expect(element).not.toBeNull()

    expect(await element.getProperty('value')).toBe('unchecked')
  })

  it('toggles between checked and unchecked on click', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-checkbox></glu-checkbox>')

    const checkbox = await page.find('glu-checkbox')

    expect(await checkbox.getProperty('value')).toBe('unchecked')

    await checkbox.click()

    await page.waitForChanges()

    expect(await checkbox.getProperty('value')).toBe('checked')

    await checkbox.click()

    await page.waitForChanges()

    expect(await checkbox.getProperty('value')).toBe('unchecked')
  })

  it('supports the indeterminate state if enabled', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-checkbox has-indeterminate></glu-checkbox>')

    const checkbox = await page.find('glu-checkbox')

    expect(await checkbox.getProperty('value')).toBe('unchecked')

    await checkbox.click()

    await page.waitForChanges()

    expect(await checkbox.getProperty('value')).toBe('checked')

    await checkbox.click()

    await page.waitForChanges()

    expect(await checkbox.getProperty('value')).toBe('indeterminate')

    await checkbox.click()

    await page.waitForChanges()

    expect(await checkbox.getProperty('value')).toBe('unchecked')
  })

  it('does not toggle when disabled', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-checkbox disabled></glu-checkbox>')

    const checkbox = await page.find('glu-checkbox')

    expect(await checkbox.getProperty('value')).toBe('unchecked')

    await checkbox.click()

    await page.waitForChanges()

    expect(await checkbox.getProperty('value')).toBe('unchecked') // Value should not change
  })

  it('emits glChange event on state change', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-checkbox></glu-checkbox>')

    const checkbox = await page.find('glu-checkbox')
    const spy = await checkbox.spyOnEvent('glChange')

    await checkbox.click()

    await page.waitForChanges()

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
