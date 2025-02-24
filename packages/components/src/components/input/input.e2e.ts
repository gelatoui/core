/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-input (E2E)', () => {
  it('renders and hydrates', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input placeholder="Enter text"></glu-input>')

    const element = await page.find('glu-input')

    expect(element).toHaveClass('hydrated')
  })

  it('applies error styling when error prop is true', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input is-error error="Error occurred"></glu-input>')

    const element = await page.find('glu-input')

    expect(element).toHaveClass('is-error')
  })

  it('renders label and helper text when provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input label="Username" helper-text="Enter your username"></glu-input>')

    const labelEl = await page.find('glu-input >>> glu-label')
    const helperTextEl = await page.find('glu-input >>> glu-helper-text')

    expect(labelEl).not.toBeNull()

    expect(labelEl.textContent).toBe('Username')

    expect(helperTextEl).not.toBeNull()

    expect(helperTextEl.textContent).toContain('Enter your username')
  })

  it('focuses input when host is clicked', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input placeholder="Focus me"></glu-input>')

    const host = await page.find('glu-input')
    const input = await page.find('glu-input >>> input')

    // Click on the host element.
    await host.click()

    await page.waitForChanges()

    // Evaluate the active element inside the host's shadow root.
    const activeElementTag = await page.evaluate(() => {
      const hostEl = document.querySelector('glu-input')

      return hostEl?.shadowRoot?.activeElement?.tagName
    })

    // The active element should be the input inside our component.
    expect(activeElementTag).toEqual(input.tagName)
  })

  it('updates value on input event', async () => {
    const expectedValue = 'Hello World'
    const page = await newE2EPage()

    await page.setContent('<glu-input></glu-input>')

    const input = await page.find('glu-input >>> input')

    await input.type(expectedValue)

    await page.waitForChanges()

    const inputValue = await input.getProperty('value')

    expect(inputValue).toBe(expectedValue)
  })

  it('toggles password visibility on clicking the toggle icon', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input type="password" value="secret"></glu-input>')

    const input = await page.find('glu-input >>> input')

    // Initially, the native input type should be "password".
    expect(await input.getProperty('type')).toBe('password')

    // Click the toggle icon (rendered as a suffix icon).
    const toggleIcon = await page.find('glu-input >>> .suffix-icon')

    await toggleIcon.click()

    await page.waitForChanges()

    // The input type should now be "text".
    expect(await input.getProperty('type')).toBe('text')
  })
})
