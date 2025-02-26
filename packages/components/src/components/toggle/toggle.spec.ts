/* eslint-disable no-undef */
import { GluToggle } from './toggle'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-toggle', () => {
  it('should render the component', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle></glu-toggle>'
    })

    expect(page.root).toBeTruthy()
  })

  it('should have the default value "unchecked"', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle></glu-toggle>'
    })

    expect(page.rootInstance.checked).toBe(false)
  })

  it('should toggle value on click', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle></glu-toggle>'
    })

    const toggleWrapper = page.root.shadowRoot.querySelector('.toggle-wrapper') as HTMLElement
    const hiddenInput = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement

    // Initial state
    expect(page.rootInstance.checked).toBe(false)

    expect(hiddenInput.checked).toBe(false)

    // First click: unchecked -> checked
    toggleWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.checked).toBe(true)

    expect(hiddenInput.checked).toBe(true)

    // Second click: checked -> unchecked
    toggleWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.checked).toBe(false)

    expect(hiddenInput.checked).toBe(false)
  })

  it('should not toggle value when disabled', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle disabled></glu-toggle>'
    })

    const toggleWrapper = page.root.shadowRoot.querySelector('.toggle-wrapper') as HTMLElement

    toggleWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.checked).toBe(false)
  })

  it('should emit glChange event on value change', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle></glu-toggle>'
    })

    const glChangeHandler = jest.fn()

    page.root.addEventListener('glChange', glChangeHandler)

    const toggleWrapper = page.root.shadowRoot.querySelector('.toggle-wrapper') as HTMLElement

    toggleWrapper.click()

    await page.waitForChanges()

    expect(glChangeHandler).toHaveBeenCalled()

    const eventDetail = glChangeHandler.mock.calls[0][0].detail

    expect(eventDetail.checked).toBe(true)
  })

  it('should toggle value on keyDown event with Space key', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle></glu-toggle>'
    })

    const toggleTrack = page.root.shadowRoot.querySelector('.toggle-track') as HTMLElement
    const spaceKeyEvent = new KeyboardEvent('keydown', { key: ' ' })

    toggleTrack.dispatchEvent(spaceKeyEvent)

    await page.waitForChanges()

    expect(page.rootInstance.checked).toBe(true)
  })

  it('should toggle value on keyDown event with Enter key', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle></glu-toggle>'
    })

    const toggleTrack = page.root.shadowRoot.querySelector('.toggle-track') as HTMLElement
    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' })

    toggleTrack.dispatchEvent(enterKeyEvent)

    await page.waitForChanges()

    expect(page.rootInstance.checked).toBe(true)
  })

  it('should update aria-checked attribute based on the value', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle></glu-toggle>'
    })

    const toggleTrack = page.root.shadowRoot.querySelector('.toggle-track') as HTMLElement

    // Initially, value is unchecked
    expect(toggleTrack.getAttribute('aria-checked')).toBe('false')

    // Set value to checked
    page.rootInstance.checked = true

    await page.waitForChanges()

    expect(toggleTrack.getAttribute('aria-checked')).toBe('true')
  })

  it('should set isFocused to true on focus and false on blur', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle></glu-toggle>'
    })

    const toggleTrack = page.root.shadowRoot.querySelector('.toggle-track') as HTMLElement

    // Simulate focus event
    toggleTrack.dispatchEvent(new Event('focus'))

    await page.waitForChanges()

    expect(page.rootInstance.isFocused).toBe(true)

    // Simulate blur event
    toggleTrack.dispatchEvent(new Event('blur'))

    await page.waitForChanges()

    expect(page.rootInstance.isFocused).toBe(false)
  })

  it('should not toggle value on keyDown when disabled', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle disabled></glu-toggle>'
    })

    const toggleTrack = page.root.shadowRoot.querySelector('.toggle-track') as HTMLElement
    const keyDownEvent = new KeyboardEvent('keydown', { key: 'Enter' })

    toggleTrack.dispatchEvent(keyDownEvent)

    await page.waitForChanges()

    expect(page.rootInstance.checked).toBe(false)
  })

  it('should render left and right labels correctly', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle left-label="Left Label" right-label="Right Label"></glu-toggle>'
    })

    const leftLabelEl = page.root.shadowRoot.querySelector('glu-label.left-label')
    const rightLabelEl = page.root.shadowRoot.querySelector('glu-label.right-label')

    expect(leftLabelEl).toBeTruthy()

    expect(rightLabelEl).toBeTruthy()

    expect(leftLabelEl.textContent).toBe('Left Label')

    expect(rightLabelEl.textContent).toBe('Right Label')
  })

  it('should render error text if error prop is provided', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle error="Error occurred" helper-text="Helper text" helper-icon="shield-exclamation" helper-icon-variant="solid"></glu-toggle>'
    })

    const helperTextEl = page.root.shadowRoot.querySelector('glu-helper-text')

    expect(helperTextEl).toBeTruthy()

    expect(helperTextEl.textContent).toBe('Error occurred')

    expect(helperTextEl.attributes.getNamedItem('is-error')).toBeTruthy()

    expect(helperTextEl.getAttribute('icon')).toBe('shield-exclamation')
  })

  it('should render helper text if only helperText prop is provided', async () => {
    const page = await newSpecPage({
      components: [GluToggle],
      html: '<glu-toggle helper-text="Just a helper" helper-icon="information-circle" helper-icon-variant="outline"></glu-toggle>'
    })

    const helperTextEl = page.root.shadowRoot.querySelector('glu-helper-text')

    expect(helperTextEl).toBeTruthy()

    expect(helperTextEl.textContent).toBe('Just a helper')

    expect(helperTextEl.attributes.getNamedItem('is-error')).toBeFalsy()

    expect(helperTextEl.getAttribute('icon')).toBe('information-circle')
  })
})
