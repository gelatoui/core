/* eslint-disable no-undef */
import { GluDropdown } from './dropdown'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-dropdown', () => {
  it('renders default trigger if no slot is provided', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      html: '<glu-dropdown></glu-dropdown>'
    })

    const trigger = page.root.shadowRoot.querySelector('.dropdown-trigger')

    expect(trigger).toBeTruthy()

    // Default fallback should render a <glu-button> with default text.
    const button = trigger.querySelector('glu-button')

    expect(button).toBeTruthy()

    expect(button.textContent).toContain('Toggle Dropdown')
  })

  it('toggles dropdown on trigger click when triggerAction is "click"', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      html: '<glu-dropdown triggerAction="click"></glu-dropdown>'
    })

    const dropdown = page.root
    const trigger = page.root.shadowRoot.querySelector('.dropdown-trigger') as HTMLElement

    // Initially closed
    expect(dropdown.isOpen).toBe(false)

    // Click should open dropdown
    trigger.click()

    await page.waitForChanges()

    expect(dropdown.isOpen).toBe(true)

    // Clicking again should close dropdown
    trigger.click()

    await page.waitForChanges()

    expect(dropdown.isOpen).toBe(false)
  })

  it('opens on mouseenter and closes on mouseleave when triggerAction is "hover"', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      html: '<glu-dropdown trigger-action="hover"></glu-dropdown>'
    })

    const dropdown = page.root
    const trigger = page.root.shadowRoot.querySelector('.dropdown-trigger') as HTMLElement

    // Simulate mouseenter event with proper options.
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, cancelable: true }))

    await page.waitForChanges()

    expect(dropdown.isOpen).toBe(true)

    // Simulate mouseleave event.
    trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true, cancelable: true }))

    await page.waitForChanges()

    expect(dropdown.isOpen).toBe(false)
  })

  it('toggles on context-menu event when triggerAction is "context-menu"', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      html: '<glu-dropdown trigger-action="context-menu"></glu-dropdown>'
    })

    const dropdown = page.root
    const trigger = page.root.shadowRoot.querySelector('.dropdown-trigger') as HTMLElement
    // Simulate contextmenu event.
    const contextMenuEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })

    trigger.dispatchEvent(contextMenuEvent)

    await page.waitForChanges()

    expect(dropdown.isOpen).toBe(true)
  })

  it('emits dropdownToggle event on toggle', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      html: '<glu-dropdown></glu-dropdown>'
    })

    const eventSpy = jest.fn()

    page.root.addEventListener('dropdownToggle', eventSpy)

    const trigger = page.root.shadowRoot.querySelector('.dropdown-trigger') as HTMLElement

    trigger.click()

    await page.waitForChanges()

    expect(eventSpy).toHaveBeenCalledTimes(1)

    const emittedEvent = eventSpy.mock.calls[0][0] as CustomEvent

    expect(emittedEvent.detail).toBe(true)
  })

  it('closes dropdown when backdrop is clicked and isBackdropDismiss is true', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      // Using property binding to set boolean props
      html: '<glu-dropdown is-backdrop-dismiss is-open></glu-dropdown>'
    })

    await page.waitForChanges()

    // Backdrop should be rendered since isBackdropDismiss is true.
    const backdrop = page.root.shadowRoot.querySelector('.dropdown-backdrop') as HTMLElement

    expect(backdrop).toBeTruthy()

    // Simulate backdrop click to dismiss dropdown.
    backdrop.click()

    await page.waitForChanges()

    expect(page.root.isOpen).toBe(false)
  })

  it('renders backdrop with invisible style when showBackdrop is false but isBackdropDismiss is true', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      // isBackdropDismiss true, showBackdrop false (default), and dropdown open.
      html: '<glu-dropdown is-backdrop-dismiss is-open></glu-dropdown>'
    })

    await page.waitForChanges()

    const backdrop = page.root.shadowRoot.querySelector('.dropdown-backdrop') as HTMLElement

    expect(backdrop).toBeTruthy()

    expect(backdrop.classList.contains('invisible-backdrop')).toBe(true)
  })

  it('sets dropdown content width in cover mode', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      html: '<glu-dropdown size="cover"></glu-dropdown>'
    })

    // Override getBoundingClientRect on the trigger element.
    const trigger = page.root.shadowRoot.querySelector('.dropdown-trigger') as HTMLElement

    trigger.getBoundingClientRect = () => ({
      width: 250,
      height: 50,
      top: 0,
      left: 0,
      right: 250,
      bottom: 50,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect)

    // Open the dropdown.
    trigger.click()

    await page.waitForChanges()

    // Wait for requestAnimationFrame callback to be invoked.
    await new Promise(resolve => requestAnimationFrame(resolve))

    await page.waitForChanges()

    const content = page.root.shadowRoot.querySelector('.dropdown-content') as HTMLElement

    expect(content.style.width).toBe('250px')
  })

  it('does not set dropdown content width in auto mode', async () => {
    const page = await newSpecPage({
      components: [GluDropdown],
      html: '<glu-dropdown size="auto"></glu-dropdown>'
    })

    const trigger = page.root.shadowRoot.querySelector('.dropdown-trigger') as HTMLElement

    // Open the dropdown.
    trigger.click()

    await page.waitForChanges()

    const content = page.root.shadowRoot.querySelector('.dropdown-content') as HTMLElement

    expect(content.style.width).toBe('')
  })
})
