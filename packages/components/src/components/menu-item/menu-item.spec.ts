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

    expect(page.root).toHaveClass('label')
  })

  it('renders correctly as a button', async () => {
    const page = await newSpecPage({
      components: [GluMenuItem],
      html: '<glu-menu-item type="button">Click Me</glu-menu-item>'
    })

    expect(page.root).toMatchSnapshot()

    expect(page.root).toHaveClass('glu-menu-item')

    expect(page.root).toHaveClass('button')
  })
})
