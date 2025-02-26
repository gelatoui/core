/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-toggle', () => {
  it('renders and initializes correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle></glu-toggle>')

    const element = await page.find('glu-toggle')

    expect(element).not.toBeNull()

    expect(await element.getProperty('checked')).toBe(false)
  })

  it('toggles to checked on click', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle></glu-toggle>')

    const toggle = await page.find('glu-toggle')

    expect(await toggle.getProperty('checked')).toBe(false)

    await toggle.click()

    await page.waitForChanges()

    expect(await toggle.getProperty('checked')).toBe(true)

    await toggle.click()

    await page.waitForChanges()

    expect(await toggle.getProperty('checked')).toBe(false)
  })

  it('does not toggle when disabled', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle disabled></glu-toggle>')

    const toggle = await page.find('glu-toggle')

    expect(await toggle.getProperty('checked')).toBe(false)

    await toggle.click()

    await page.waitForChanges()

    expect(await toggle.getProperty('checked')).toBe(false) // Value should not change
  })

  it('emits glChange event on state change', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle></glu-toggle>')

    const toggle = await page.find('glu-toggle')
    const spy = await toggle.spyOnEvent('glChange')

    await toggle.click()

    await page.waitForChanges()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  it('supports keyboard interaction (Space and Enter)', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle></glu-toggle>')

    const toggle = await page.find('glu-toggle')
    const toggleTrack = await page.find('glu-toggle >>> .toggle-track')

    // Test Space key
    await toggleTrack.press('Space')

    await page.waitForChanges()

    expect(await toggle.getProperty('checked')).toBe(true)

    // Reset state
    toggle.setProperty('checked', false)

    await page.waitForChanges()

    // Test Enter key
    await toggleTrack.press('Enter')

    await page.waitForChanges()

    expect(await toggle.getProperty('checked')).toBe(true)
  })

  it('does not toggle on key press when disabled', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle disabled></glu-toggle>')

    const toggle = await page.find('glu-toggle')
    const toggleTrack = await page.find('glu-toggle >>> .toggle-track')

    await toggleTrack.press('Enter')

    await page.waitForChanges()

    expect(await toggle.getProperty('checked')).toBe(false)
  })

  it('renders left and right labels correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle left-label="Left Label" right-label="Right Label"></glu-toggle>')

    const leftLabel = await page.find('glu-toggle >>> .left-label')
    const rightLabel = await page.find('glu-toggle >>> .right-label')

    expect(leftLabel).toBeTruthy()

    expect(rightLabel).toBeTruthy()

    expect(leftLabel.textContent).toBe('Left Label')

    expect(rightLabel.textContent).toBe('Right Label')
  })

  it('renders helper text if only helperText prop is provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle helper-text="Just a helper" helper-icon="information-circle" helper-icon-variant="outline"></glu-toggle>')

    const helperText = await page.find('glu-toggle >>> glu-helper-text')

    expect(helperText).toBeTruthy()

    expect(helperText.textContent).toBe('Just a helper')

    expect(helperText.getAttribute('is-error')).toBe(null) // No error state

    expect(helperText.getAttribute('icon')).toBe('information-circle')
  })

  it('renders error text if error prop is provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-toggle error="Error occurred" helper-text="Helper text" helper-icon="shield-exclamation" helper-icon-variant="solid"></glu-toggle>')

    const helperText = await page.find('glu-toggle >>> glu-helper-text')

    expect(helperText).toBeTruthy()

    expect(helperText.textContent).toBe('Error occurred')

    expect(helperText).toHaveClass('is-error')

    expect(helperText.getAttribute('icon')).toBe('shield-exclamation')
  })
})
