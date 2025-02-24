/* eslint-disable no-undef */
import { GluIcon } from '@components/icon/icon'
import { GluInput } from '@components/input/input'

import { newSpecPage } from '@stencil/core/testing'

// TODO: Refactor this test into multiples tests
describe('glu-input', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input placeholder="Enter text"></glu-input>'
    })

    expect(page.root).toMatchSnapshot()
  })

  it('updates value on input event', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement

    inputEl.value = 'Test value'

    inputEl.dispatchEvent(new Event('input'))

    await page.waitForChanges()

    expect(page.root.value).toBe('Test value')
  })

  it('applies error styling when error prop is true', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input is-error></glu-input>'
    })

    expect(page.root).toHaveClass('is-error')
  })

  it('renders prefix icon when provided', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input prefix-icon="user"></glu-input>'
    })

    const prefixIcon = page.root.shadowRoot.querySelector('.prefix-icon')

    expect(prefixIcon).not.toBeNull()

    expect(prefixIcon.getAttribute('name')).toBe('user')
  })

  it('renders suffix text when provided', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input suffix-text="USD"></glu-input>'
    })

    const suffixText = page.root.shadowRoot.querySelector('.suffix-text')

    expect(suffixText).not.toBeNull()

    expect(suffixText.textContent).toBe('USD')
  })

  it('renders clear icon for search input when showClearIcon is true and value is present', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="search" show-clear-icon value="search term"></glu-input>'
    })

    const clearIcon = page.root.shadowRoot.querySelector('.suffix-icon')

    expect(clearIcon).not.toBeNull()

    expect(clearIcon.getAttribute('name')).toBe('x-circle')
  })

  it('toggles password visibility when password toggle icon is clicked', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="password" value="secret"></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement

    expect(inputEl.getAttribute('type')).toBe('password')

    const toggleIcon = page.root.shadowRoot.querySelector('.suffix-icon') as HTMLElement

    toggleIcon.click()

    await page.waitForChanges()

    expect(inputEl.getAttribute('type')).toBe('text')
  })

  it('triggers focus and blur events correctly', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement
    const spyFocus = jest.fn()
    const spyBlur = jest.fn()

    // Attach event listeners directly to the input element
    inputEl.addEventListener('focus', spyFocus)

    inputEl.addEventListener('blur', spyBlur)

    // Use .focus() and .blur() instead of dispatching an event manually
    inputEl.focus()

    await page.waitForChanges()

    expect(spyFocus).toHaveBeenCalled()

    inputEl.blur()

    await page.waitForChanges()

    expect(spyBlur).toHaveBeenCalled()
  })

  it('disables input when disabled prop is set', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input disabled></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement

    expect(inputEl.hasAttribute('disabled')).toBe(true)
  })

  it('renders placeholder correctly', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input placeholder="Enter text"></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement

    expect(inputEl.getAttribute('placeholder')).toBe('Enter text')
  })

  it('clears the input value when the clear icon is clicked', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="search" show-clear-icon value="search term"></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement
    const clearIcon = page.root.shadowRoot.querySelector('.suffix-icon') as HTMLElement

    expect(inputEl.value).toBe('search term')

    clearIcon.click()

    await page.waitForChanges()

    expect(page.root.value).toBe('')
  })

  it('triggers keydown event when Enter key is pressed', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement
    const spyKeyDown = jest.fn()

    inputEl.addEventListener('keydown', spyKeyDown)

    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    await page.waitForChanges()

    expect(spyKeyDown).toHaveBeenCalled()
  })
})

describe('glu-input prefix and suffix', () => {
  it('renders correctly with type "currency"', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="currency" prefix-text="$"></glu-input>'
    })

    const prefixText = page.root.shadowRoot.querySelector('.prefix-text')

    expect(prefixText).not.toBeNull()

    expect(prefixText.textContent).toBe('$')
  })

  it('renders correctly with type "search" and shows clear icon when value is present', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="search" show-clear-icon value="search term"></glu-input>'
    })

    const clearIcon = page.root.shadowRoot.querySelector('.suffix-icon')

    expect(clearIcon).not.toBeNull()

    expect(clearIcon.getAttribute('name')).toBe('x-circle')
  })

  it('toggles visibility for password input when toggle icon is clicked', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="password" value="secret"></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement

    expect(inputEl.getAttribute('type')).toBe('password')

    const toggleIcon = page.root.shadowRoot.querySelector('.suffix-icon') as HTMLElement

    toggleIcon.click()

    await page.waitForChanges()

    expect(inputEl.getAttribute('type')).toBe('text')

    // Toggle back to password visibility
    toggleIcon.click()

    await page.waitForChanges()

    expect(inputEl.getAttribute('type')).toBe('password')
  })

  it('renders URL input with prefix text "https://"', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="url" prefix-text="https://"></glu-input>'
    })

    const prefixText = page.root.shadowRoot.querySelector('.prefix-text')

    expect(prefixText).not.toBeNull()

    expect(prefixText.textContent).toBe('https://')
  })

  it('renders phone input correctly with appropriate attributes', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="phone"></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input[type="tel"]') as HTMLInputElement

    expect(inputEl).not.toBeNull()

    expect(inputEl.getAttribute('type')).toBe('tel')
  })

  it('renders suffix icon for password input', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="password"></glu-input>'
    })

    const suffixIcon = page.root.shadowRoot.querySelector('.suffix-icon')

    expect(suffixIcon).not.toBeNull()
  })
})
