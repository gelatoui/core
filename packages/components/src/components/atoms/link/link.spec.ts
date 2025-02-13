/* eslint-disable no-undef */
import { GluLink } from './link'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-link', () => {
  it('renders with default properties', async () => {
    const page = await newSpecPage({
      components: [GluLink],
      html: '<glu-link href="https://example.com">Test Link</glu-link>'
    })

    expect(page.root).toEqualHtml(/* html */ `
      <glu-link href="https://example.com" class="glu-button glu-link--size-medium">
        <mock:shadow-root>
          <a href="https://example.com" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Test Link
      </glu-link>
    `)
  })

  it('renders with custom target and size', async () => {
    const page = await newSpecPage({
      components: [GluLink],
      html: '<glu-link href="https://example.com" target="_blank" size="large">Test Link</glu-link>'
    })

    expect(page.root).toEqualHtml(/* html */ `
      <glu-link href="https://example.com" class="glu-button glu-link--size-large" target="_blank" size="large">
        <mock:shadow-root>
          <a href="https://example.com" target="_blank">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Test Link
      </glu-link>
    `)
  })

  it('applies rel attribute if provided', async () => {
    const page = await newSpecPage({
      components: [GluLink],
      html: '<glu-link href="https://example.com" rel="noopener noreferrer">Test Link</glu-link>'
    })

    expect(page.root).toEqualHtml(/* html */ `
      <glu-link href="https://example.com" rel="noopener noreferrer" class="glu-button  glu-link--size-medium">
        <mock:shadow-root>
          <a href="https://example.com" target="_self" rel="noopener noreferrer">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Test Link
      </glu-link>
    `)
  })
})
