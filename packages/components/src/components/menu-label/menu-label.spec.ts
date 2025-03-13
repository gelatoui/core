/* eslint-disable no-undef */
import { GluMenuLabel } from './menu-label'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-menu-label', () => {
  it('renders slot content when no href is provided', async () => {
    const page = await newSpecPage({
      components: [GluMenuLabel],
      html: '<glu-menu-label>Test Label</glu-menu-label>'
    })

    // In shadow DOM, the default slot is rendered automatically.
    expect(page.root).toEqualHtml(`
      <glu-menu-label class="glu-menu-label">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Test Label
      </glu-menu-label>
    `)
  })

  it('renders an anchor tag when href is provided', async () => {
    const page = await newSpecPage({
      components: [GluMenuLabel],
      html: '<glu-menu-label href="https://example.com">Link Label</glu-menu-label>'
    })

    const anchor = page.root.shadowRoot.querySelector('a')

    expect(anchor).not.toBeNull()

    expect(anchor.getAttribute('href')).toBe('https://example.com')
  })

  it('forwards inherited attributes to the inner anchor element', async () => {
    const page = await newSpecPage({
      components: [GluMenuLabel],
      html: '<glu-menu-label href="https://example.com" title="Test Title">Link Label</glu-menu-label>'
    })

    const anchor = page.root.shadowRoot.querySelector('a')

    expect(anchor).not.toBeNull()

    // Verify that the title attribute is forwarded (assuming inheritAttributes works as expected)
    expect(anchor.getAttribute('title')).toBe('Test Title')
  })
})
