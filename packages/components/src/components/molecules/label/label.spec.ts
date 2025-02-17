/* eslint-disable @stylistic/max-len */
/* eslint-disable no-undef */
import { GluLabel } from './label'

import { GluIcon } from '../../atoms/icon/icon'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-label', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [GluLabel],
      html: '<glu-label>Label Text</glu-label>'
    })

    expect(page.root).toEqualHtml(/* html */`
      <glu-label>
        <mock:shadow-root>
          <div class="glu-label">
            <span class="label-text">
              <slot></slot>
            </span>
          </div>
        </mock:shadow-root>
        Label Text
      </glu-label>
    `)
  })

  it('renders with tooltip icon when showTooltip is true', async () => {
    const page = await newSpecPage({
      components: [GluLabel, GluIcon],
      html: '<glu-label show-tooltip>Label with Tooltip</glu-label>'
    })

    expect(page.root).toMatchInlineSnapshot(/* html */`
      <glu-label show-tooltip="">
        <template shadowrootmode="open">
          <div class="glu-label">
            <span class="label-text">
              <slot></slot>
            </span>
            <span class="tooltip-icon">
              <glu-icon class="tooltip-icon" name="information-circle" variant="outline">
                <template shadowrootmode="open">
                  <img alt="information-circle" class="glu-icon" height="16" role="img" src="[object Object]" width="16">
                </template>
              </glu-icon>
              <span class="tooltip-component">
                <slot name="tooltip"></slot>
              </span>
            </span>
          </div>
        </template>
        Label with Tooltip
      </glu-label>
    `)
  })

  it('renders with a solid tooltip icon when isSolidIcon is true', async () => {
    const page = await newSpecPage({
      components: [GluLabel, GluIcon],
      html: '<glu-label show-tooltip is-solid-icon>Label with Solid Tooltip</glu-label>'
    })

    expect(page.root.shadowRoot.querySelector('glu-icon')).toHaveAttribute('variant')
  })

  it('renders character counter when showCharacterCount is true', async () => {
    const page = await newSpecPage({
      components: [GluLabel],
      html: '<glu-label show-character-count>Label with Counter</glu-label>'
    })

    expect(page.root.shadowRoot.querySelector('.label-counter').textContent).toBe('0 / 100')
  })

  it('reflects properties correctly', async () => {
    const page = await newSpecPage({
      components: [GluLabel],
      html: '<glu-label show-tooltip show-character-count is-solid-icon>Label</glu-label>'
    })

    expect(page.root).toHaveAttribute('show-tooltip')

    expect(page.root).toHaveAttribute('show-character-count')

    expect(page.root).toHaveAttribute('is-solid-icon')
  })
})
