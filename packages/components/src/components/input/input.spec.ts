/* eslint-disable no-undef */
import { GluIcon } from '@components/icon/icon'
import { GluInput } from '@components/input/input'

import { newSpecPage } from '@stencil/core/testing'

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

    // The mutable prop "value" should update
    expect(page.root.value).toBe('Test value')
  })

  it('applies error styling when error prop is true', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input is-error></glu-input>'
    })

    expect(page.root).toHaveClass('is-error')
  })

  it('renders prefix element when prefixIcon is provided', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input prefix-icon="user"></glu-input>'
    })

    const prefixIcon = page.root.shadowRoot.querySelector('.prefix-icon')

    expect(prefixIcon).not.toBeNull()

    expect(prefixIcon.getAttribute('name')).toBe('user')
  })

  it('renders suffix element when suffixText is provided', async () => {
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

    // Assuming the clear icon is rendered with the "x-circle" icon name
    expect(clearIcon.getAttribute('name')).toBe('x-circle')
  })

  it('toggles password visibility when password toggle icon is clicked', async () => {
    const page = await newSpecPage({
      components: [GluInput, GluIcon],
      html: '<glu-input type="password" value="secret"></glu-input>'
    })

    const inputEl = page.root.shadowRoot.querySelector('input') as HTMLInputElement

    // Initially, the native input type should be "password"
    expect(inputEl.getAttribute('type')).toBe('password')

    // Simulate clicking the password toggle icon (rendered as suffix icon)
    const toggleIcon = page.root.shadowRoot.querySelector('.suffix-icon') as HTMLElement

    toggleIcon.click()

    await page.waitForChanges()

    // Now, the input type should switch to "text"
    expect(inputEl.getAttribute('type')).toBe('text')
  })
})
