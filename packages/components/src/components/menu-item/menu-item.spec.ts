/* eslint-disable no-undef */
import { GluMenuItem } from './menu-item'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-menu-item', () => {
  it('renders correctly as a label', async () => {
    const page = await newSpecPage({
      components: [GluMenuItem],
      html: '<glu-menu-item type="label">Label Item</glu-menu-item>'
    })

    expect(page.root).toMatchSnapshot()

    expect(page.root).toHaveClass('glu-menu-item')

    const label = page.root.ShadowRoot.querySelector('glu-label')

    expect(label).toBeTruthy()
  })

  it('renders correctly as a button', async () => {
    const page = await newSpecPage({
      components: [GluMenuItem],
      html: '<glu-menu-item type="button">Click Me</glu-menu-item>'
    })

    expect(page.root).toMatchSnapshot()

    expect(page.root).toHaveClass('glu-menu-item')

    const button = page.root.ShadowRoot.querySelector('glu-button')

    expect(button).toBeTruthy()
  })
})
