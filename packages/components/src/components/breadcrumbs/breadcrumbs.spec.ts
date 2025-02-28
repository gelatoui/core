/* eslint-disable no-undef */
import { GluBreadcrumbs } from './breadcrumbs'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-breadcrumbs', () => {
  it('renders properly', async () => {
    const page = await newSpecPage({
      components: [GluBreadcrumbs],
      html: '<glu-breadcrumbs></glu-breadcrumbs>'
    })

    expect(page.root).toEqualHtml(`
      <glu-breadcrumbs class="glu-breadcrumbs">
        <mock:shadow-root>
          <nav aria-label="Breadcrumb">
            <ul class="breadcrumb-list">
              <slot></slot>
            </ul>
          </nav>
        </mock:shadow-root>
      </glu-breadcrumbs>
    `)
  })

  it('renders child breadcrumb elements', async () => {
    const page = await newSpecPage({
      components: [GluBreadcrumbs],
      html: `
        <glu-breadcrumbs>
          <glu-breadcrumb href="/home">Home</glu-breadcrumb>
          <glu-breadcrumb href="/products">Products</glu-breadcrumb>
        </glu-breadcrumbs>
      `
    })

    expect(page.root.querySelectorAll('glu-breadcrumb').length).toBe(2)
  })
})
