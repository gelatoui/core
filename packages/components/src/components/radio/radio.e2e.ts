/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-radio', () => {
  it('renders and initializes correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-radio></glu-radio>')

    const element = await page.find('glu-radio')

    expect(element).not.toBeNull()

    expect(await element.getProperty('checked')).toBe(false)
  })

  it('toggles to checked on click', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-radio></glu-radio>')

    const radio = await page.find('glu-radio')

    expect(await radio.getProperty('checked')).toBe(false)

    await radio.click()

    await page.waitForChanges()

    expect(await radio.getProperty('checked')).toBe(true)

    await radio.click()

    await page.waitForChanges()

    expect(await radio.getProperty('checked')).toBe(false)
  })

  it('does not toggle when disabled', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-radio disabled></glu-radio>')

    const radio = await page.find('glu-radio')

    expect(await radio.getProperty('checked')).toBe(false)

    await radio.click()

    await page.waitForChanges()

    expect(await radio.getProperty('checked')).toBe(false) // Value should not change
  })

  it('emits glChange event on state change', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-radio></glu-radio>')

    const radio = await page.find('glu-radio')
    const spy = await radio.spyOnEvent('glChange')

    await radio.click()

    await page.waitForChanges()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  it('supports keyboard interaction (Space and Enter)', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-radio></glu-radio>')

    const radio = await page.find('glu-radio')
    const radioContainer = await page.find('glu-radio >>> .radio-container')

    // Test Space key
    await radioContainer.press('Space')

    await page.waitForChanges()

    expect(await radio.getProperty('checked')).toBe(true)

    // Reset state
    radio.setProperty('checked', false)

    await page.waitForChanges()

    // Test Enter key
    await radioContainer.press('Enter')

    await page.waitForChanges()

    expect(await radio.getProperty('checked')).toBe(true)
  })

  it('does not toggle on key press when disabled', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-radio disabled></glu-radio>')

    const radio = await page.find('glu-radio')
    const radioContainer = await page.find('glu-radio >>> .radio-container')

    await radioContainer.press('Enter')

    await page.waitForChanges()

    expect(await radio.getProperty('checked')).toBe(false)
  })

  it('renders left and right labels correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-radio left-label="Left Label" right-label="Right Label"></glu-radio>')

    const leftLabel = await page.find('glu-radio >>> .left-label')
    const rightLabel = await page.find('glu-radio >>> .right-label')

    expect(leftLabel).toBeTruthy()

    expect(rightLabel).toBeTruthy()

    expect(leftLabel.textContent).toBe('Left Label')

    expect(rightLabel.textContent).toBe('Right Label')
  })

  it('renders helper text if only helperText prop is provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-radio helper-text="Just a helper" helper-icon="information-circle" helper-icon-variant="outline"></glu-radio>')

    const helperText = await page.find('glu-radio >>> glu-helper-text')

    expect(helperText).toBeTruthy()

    expect(helperText.textContent).toBe('Just a helper')

    expect(helperText.getAttribute('is-error')).toBe(null) // No error state

    expect(helperText.getAttribute('icon')).toBe('information-circle')
  })
})
