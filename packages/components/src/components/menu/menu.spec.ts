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

    expect(page.root.querySelector('img')).toHaveAttribute('src')
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

  it('applies isResponsive class when prop is set', async () => {
    const page = await newSpecPage({
      components: [GluMenu],
      html: '<glu-menu is-responsive></glu-menu>'
    })

    expect(page.root.shadowRoot).toHaveClass('glu-menu--mobile')
  })
})
