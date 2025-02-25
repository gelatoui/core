/* eslint-disable no-undef */
import { GluCheckbox } from './checkbox'

import { newSpecPage } from '@stencil/core/testing'

// TODO: slice this test into multiple tests
describe('glu-checkbox', () => {
  it('should render the component', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    expect(page.root).toBeTruthy()
  })

  it('should have the default value "unchecked"', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    expect(page.rootInstance.value).toBe('unchecked')
  })

  it('should toggle value on click without indeterminate state (default)', async () => {
    // Default: hasIndeterminate is false.
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    const checkboxWrapper = page.root.shadowRoot.querySelector('.checkbox-wrapper') as HTMLElement
    const hiddenInput = page.root.shadowRoot.querySelector('input[type="hidden"]') as HTMLInputElement

    // Check initial value
    expect(page.rootInstance.value).toBe('unchecked')

    expect(hiddenInput.value).toBe('unchecked')

    // First click: unchecked -> checked
    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('checked')

    expect(hiddenInput.value).toBe('checked')

    // Second click: checked -> unchecked (since indeterminate is not enabled)
    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('unchecked')

    expect(hiddenInput.value).toBe('unchecked')
  })

  it('should toggle value on click with indeterminate state', async () => {
    // Instantiate a component with hasIndeterminate true.
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox has-indeterminate></glu-checkbox>'
    })

    const checkboxWrapper = page.root.shadowRoot.querySelector('.checkbox-wrapper') as HTMLElement
    const hiddenInput = page.root.shadowRoot.querySelector('input[type="hidden"]') as HTMLInputElement

    // First click: unchecked -> checked
    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('checked')

    expect(hiddenInput.value).toBe('checked')

    // Second click: checked -> indeterminate
    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('indeterminate')

    expect(hiddenInput.value).toBe('indeterminate')

    // Third click: indeterminate -> unchecked
    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('unchecked')

    expect(hiddenInput.value).toBe('unchecked')
  })

  it('should not toggle value when disabled', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox disabled value="unchecked"></glu-checkbox>'
    })

    const checkboxWrapper = page.root.shadowRoot.querySelector('.checkbox-wrapper') as HTMLElement

    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('unchecked')
  })

  // TODO: Fix this test
  it.skip('should emit glChange event on value change', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    const glChangeHandler = jest.fn()

    page.root.addEventListener('glChange', glChangeHandler)

    const checkboxWrapper = page.root.shadowRoot.querySelector('.checkbox-wrapper') as HTMLElement

    checkboxWrapper.click()

    await page.waitForChanges()

    expect(glChangeHandler).toHaveBeenCalled()

    // Check that the event detail contains the new value ("checked" on first click)
    const eventDetail = glChangeHandler.mock.calls[0][0].detail

    expect(eventDetail.value).toBe('checked')
  })

  it('should toggle value on keyDown event with Space key', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    const checkboxContainer = page.root.shadowRoot.querySelector('.checkbox-container') as HTMLElement
    const spaceKeyEvent = new KeyboardEvent('keydown', { key: ' ' })

    checkboxContainer.dispatchEvent(spaceKeyEvent)

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('checked')
  })

  it('should toggle value on keyDown event with Enter key', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    const checkboxContainer = page.root.shadowRoot.querySelector('.checkbox-container') as HTMLElement
    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' })

    checkboxContainer.dispatchEvent(enterKeyEvent)

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('checked')
  })

  it('should update aria-checked attribute based on the value', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    const checkboxContainer = page.root.shadowRoot.querySelector('.checkbox-container') as HTMLElement

    // Initially, value is 'unchecked'
    expect(checkboxContainer.getAttribute('aria-checked')).toBe('false')

    // Set value to 'checked'
    page.rootInstance.value = 'checked'

    await page.waitForChanges()

    expect(checkboxContainer.getAttribute('aria-checked')).toBe('true')

    // Set value to 'indeterminate'
    page.rootInstance.value = 'indeterminate'

    await page.waitForChanges()

    expect(checkboxContainer.getAttribute('aria-checked')).toBe('mixed')
  })

  it('should set isFocused to true on focus and false on blur', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    const checkboxContainer = page.root.shadowRoot.querySelector('.checkbox-container') as HTMLElement

    // Simulate focus event
    checkboxContainer.dispatchEvent(new Event('focus'))

    await page.waitForChanges()

    expect(page.rootInstance.isFocused).toBe(true)

    // Simulate blur event
    checkboxContainer.dispatchEvent(new Event('blur'))

    await page.waitForChanges()

    expect(page.rootInstance.isFocused).toBe(false)
  })

  it('should not toggle value on keyDown when disabled', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox disabled value="unchecked"></glu-checkbox>'
    })

    const checkboxContainer = page.root.shadowRoot.querySelector('.checkbox-container') as HTMLElement
    // Create a keydown event (using Enter key)
    const keyDownEvent = new KeyboardEvent('keydown', { key: 'Enter' })

    checkboxContainer.dispatchEvent(keyDownEvent)

    await page.waitForChanges()

    // The value should remain unchanged because the component is disabled.
    expect(page.rootInstance.value).toBe('unchecked')
  })

  it('should render left and right labels correctly', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox left-label="Left Label" right-label="Right Label"></glu-checkbox>'
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
      components: [GluCheckbox],
      html: '<glu-checkbox error="Error occurred" helper-text="Helper text" helper-icon="shield-exclamation" helper-icon-variant="solid"></glu-checkbox>'
    })

    const helperTextEl = page.root.shadowRoot.querySelector('glu-helper-text')

    expect(helperTextEl).toBeTruthy()

    // If error is provided, it takes precedence over helperText.
    expect(helperTextEl.textContent).toBe('Error occurred')

    // is-error should be truthy (Stencil typically renders booleans as strings "true")
    expect(helperTextEl.attributes.getNamedItem('is-error')).toBeTruthy()

    // Check that the helperIcon and helperIconVariant are set correctly.
    expect(helperTextEl.getAttribute('icon')).toBe('shield-exclamation')
  })

  it('should render helper text if only helperText prop is provided', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox helper-text="Just a helper" helper-icon="information-circle" helper-icon-variant="outline"></glu-checkbox>'
    })

    const helperTextEl = page.root.shadowRoot.querySelector('glu-helper-text')

    expect(helperTextEl).toBeTruthy()

    expect(helperTextEl.textContent).toBe('Just a helper')

    // When error is not provided, is-error should be false.
    expect(helperTextEl.attributes.getNamedItem('is-error')).toBeFalsy()

    expect(helperTextEl.getAttribute('icon')).toBe('information-circle')
  })
})
