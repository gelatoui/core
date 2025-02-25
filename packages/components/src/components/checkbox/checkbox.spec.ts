/* eslint-disable no-undef */
import { GluCheckbox } from './checkbox'

import { newSpecPage } from '@stencil/core/testing'

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

  it('should toggle value on click', async () => {
    const page = await newSpecPage({
      components: [GluCheckbox],
      html: '<glu-checkbox></glu-checkbox>'
    })

    const checkboxWrapper = page.root.shadowRoot.querySelector('.checkbox-wrapper') as HTMLElement

    // First click: unchecked -> checked
    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('checked')

    // Second click: checked -> indeterminate
    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('indeterminate')

    // Third click: indeterminate -> unchecked
    checkboxWrapper.click()

    await page.waitForChanges()

    expect(page.rootInstance.value).toBe('unchecked')
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
})
