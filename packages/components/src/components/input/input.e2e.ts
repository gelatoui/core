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

    await host.click()

    await page.waitForChanges()

    const activeElementTag = await page.evaluate(() => {
      const hostEl = document.querySelector('glu-input')

      return hostEl?.shadowRoot?.activeElement?.tagName
    })

    expect(activeElementTag).toEqual(input.tagName)
  })

  it('updates value on input event', async () => {
    const expectedValue = 'Hello World'
    const page = await newE2EPage()

    await page.setContent('<glu-input value=""></glu-input>')

    const input = await page.find('glu-input >>> input')

    await input.type(expectedValue)

    await page.waitForChanges()

    const element = await page.find('glu-input')

    expect(await element.getProperty('value')).toBe(expectedValue)
  })

  it('toggles password visibility when icon is clicked', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input type="password"></glu-input>')

    const suffixIcon = await page.find('glu-input >>> .suffix-icon')

    await suffixIcon.click()

    await page.waitForChanges()

    const input = await page.find('glu-input >>> input')

    expect(await input.getProperty('type')).toBe('text') // Check if password is visible

    await suffixIcon.click() // Click again to hide

    await page.waitForChanges()

    expect(await input.getProperty('type')).toBe('password') // Check if password is hidden
  })

  it('clears input when clear icon is clicked in search input', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input value="Some text" type="search" show-clear-icon></glu-input>')

    const clearIcon = await page.find('glu-input >>> .suffix-icon')

    await clearIcon.click()

    await page.waitForChanges()

    const element = await page.find('glu-input')

    expect(await element.getProperty('value')).toBe('') // Check if input is cleared
  })

  it('handles disabled state', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input disabled></glu-input>')

    const input = await page.find('glu-input >>> input')

    expect(await input.getProperty('disabled')).toBe(true) // Check if input is disabled
  })

  it('handles readOnly state', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input read-only></glu-input>')

    const input = await page.find('glu-input >>> input')

    expect(await input.getProperty('readOnly')).toBe(true) // Check if input is readOnly
  })

  it('renders prefix and suffix icons correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input prefix-icon="user" suffix-icon="check"></glu-input>')

    const prefixIcon = await page.find('glu-input >>> .prefix-icon')
    const suffixIcon = await page.find('glu-input >>> .suffix-icon')

    expect(prefixIcon).not.toBeNull()

    expect(suffixIcon).not.toBeNull()

    expect(await prefixIcon.getAttribute('name')).toBe('user')

    expect(await suffixIcon.getAttribute('name')).toBe('check')
  })

  it('renders with different input types', async () => {
    const types = ['text', 'email', 'password', 'number', 'date', 'tel']

    for (const type of types) {
      const page = await newE2EPage()

      await page.setContent(`<glu-input type="${type}"></glu-input>`)

      const input = await page.find('glu-input >>> input')

      expect(await input.getProperty('type')).toBe(type) // Check if the type is set correctly
    }
  })

  it('should show error message correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-input is-error error="This is an error message"></glu-input>')

    const errorMessage = await page.find('glu-input >>> glu-helper-text')

    expect(errorMessage).not.toBeNull()

    expect(errorMessage.textContent).toContain('This is an error message')
  })
})
