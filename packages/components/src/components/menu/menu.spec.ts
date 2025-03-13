/* eslint-disable no-undef */
import { GluMenu } from './menu'

import { newSpecPage } from '@stencil/core/testing'

const ResizeObserverMock = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

global.ResizeObserver = ResizeObserverMock

describe('glu-menu', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu></glu-menu>'
    })

    expect(page.root).toMatchSnapshot()

    expect(page.root).toHaveClass('glu-menu')
  })

  it('renders correctly with logo prop', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu logo="logo.png"></glu-menu>'
    })

    expect(page.root).toMatchSnapshot()

    expect(page.root.shadowRoot.querySelector('img')).toHaveAttribute('src')
  })

  it('renders slots correctly', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: `
        <glu-menu>
          <span slot="logo">Logo Slot</span>
          <span slot="menu-items">Menu Items</span>
          <span slot="right-actions">Right Actions</span>
        </glu-menu>`
    })

    expect(page.root).toMatchSnapshot()

    expect(page.root.querySelector('[slot="logo"]').textContent).toBe('Logo Slot')

    expect(page.root.querySelector('[slot="menu-items"]').textContent).toBe('Menu Items')

    expect(page.root.querySelector('[slot="right-actions"]').textContent).toBe('Right Actions')
  })

  it('applies isSticky class when prop is set', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu is-sticky></glu-menu>'
    })

    expect(page.root).toHaveClass('glu-menu--sticky')
  })

  it('sets mobile view when isResponsive and width < 768px', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu is-responsive></glu-menu>'
    })

    Object.defineProperty(page.win, 'innerWidth', {
      configurable: true,
      value: 500
    })

    page.win.dispatchEvent(new Event('resize'))

    await page.waitForChanges()

    expect(page.root).toHaveClass('glu-menu--mobile')
  })

  it('toggles mobile menu open/close on button click', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu is-responsive></glu-menu>'
    })

    Object.defineProperty(page.win, 'innerWidth', {
      configurable: true,
      value: 500
    })

    page.win.dispatchEvent(new Event('resize'))

    await page.waitForChanges()

    const toggleButton = page.root.shadowRoot.querySelector('.glu-menu__mobile-toggle') as HTMLElement

    expect(toggleButton).toBeTruthy()

    // First click to open
    toggleButton.click()

    await page.waitForChanges()

    expect(page.root).toHaveClass('glu-menu--mobile-open')

    // Second click to close
    toggleButton.click()

    await page.waitForChanges()

    expect(page.root).not.toHaveClass('glu-menu--mobile-open')
  })

  it('renders logo-center layout when type is set to logo-center', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu type="logo-center"></glu-menu>'
    })

    await page.waitForChanges()

    expect(page.root).toHaveClass('glu-menu--logo-center')

    expect(page.root.shadowRoot.querySelector('.glu-menu__container--logo-center')).toBeTruthy()
  })

  it('renders menu-center layout when type is set to menu-center', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu type="menu-center"></glu-menu>'
    })

    await page.waitForChanges()

    expect(page.root).toHaveClass('glu-menu--menu-center')

    expect(page.root.shadowRoot.querySelector('.glu-menu__container--menu-center')).toBeTruthy()
  })

  it('uses slot for logo when logo prop is not set', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: `
      <glu-menu>
        <span slot="logo">Logo Slot</span>
      </glu-menu>
    `
    })

    await page.waitForChanges()

    expect(page.root.querySelector('[slot="logo"]').textContent).toBe('Logo Slot')
  })

  it('updates mobile view on window resize', async () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1000 })

    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu is-responsive></glu-menu>'
    })

    await page.waitForChanges()

    expect(page.root).not.toHaveClass('glu-menu--mobile')

    // Simulate window resize
    window.innerWidth = 500

    window.dispatchEvent(new Event('resize'))

    await page.waitForChanges()

    expect(page.root).toHaveClass('glu-menu--mobile')
  })

  it('applies sticky and mobile classes when both isSticky and isResponsive are set', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu is-sticky is-responsive></glu-menu>'
    })

    Object.defineProperty(page.win, 'innerWidth', {
      configurable: true,
      value: 500
    })

    page.win.dispatchEvent(new Event('resize'))

    await page.waitForChanges()

    expect(page.root).toHaveClass('glu-menu--sticky')

    expect(page.root).toHaveClass('glu-menu--mobile')
  })
})
