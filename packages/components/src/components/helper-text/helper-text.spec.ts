/* eslint-disable @stylistic/max-len */
/* eslint-disable no-undef */
import { GluHelperText } from '@components/helper-text/helper-text'
import { GluIcon } from '@components/icon/icon'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-helper-text', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [GluHelperText, GluIcon],
      html: '<glu-helper-text icon="information-circle"></glu-helper-text>'
    })

    expect(page.root).toMatchInlineSnapshot(/* html */`
      <glu-helper-text class="glu-helper-text" icon="information-circle" icon-variant="outline">
        <template shadowrootmode="open">
          <div class="icon">
            <glu-icon class="glu-icon" name="information-circle" variant="outline">
              <template shadowrootmode="open">
                <span aria-label="information-circle" role="img" style="width: 14px; height: 14px; color: inherit;"></span>
              </template>
            </glu-icon>
          </div>
          <div class="text">
            <slot></slot>
          </div>
        </template>
      </glu-helper-text>
    `)
  })

  it('renders a solid icon when icon-variant is "solid"', async () => {
    const page = await newSpecPage({
      components: [GluHelperText, GluIcon],
      html: '<glu-helper-text icon="information-circle" icon-variant="solid"></glu-helper-text>'
    })

    expect(page.root).toMatchInlineSnapshot(/* html */`
      <glu-helper-text class="glu-helper-text" icon="information-circle" icon-variant="solid">
        <template shadowrootmode="open">
          <div class="icon">
            <glu-icon class="glu-icon" name="information-circle" variant="solid">
              <template shadowrootmode="open">
                <span aria-label="information-circle" role="img" style="width: 14px; height: 14px; color: inherit;"></span>
              </template>
            </glu-icon>
          </div>
          <div class="text">
            <slot></slot>
          </div>
        </template>
      </glu-helper-text>
    `)
  })

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [GluHelperText, GluIcon],
      html: '<glu-helper-text icon="information-circle">Helper text goes here</glu-helper-text>'
    })

    expect(page.root.shadowRoot.querySelector('slot')).toBeTruthy()
  })

  it('reflects properties correctly', async () => {
    const page = await newSpecPage({
      components: [GluHelperText],
      html: '<glu-helper-text icon="backward" icon-variant="solid"></glu-helper-text>'
    })

    expect(page.root).toHaveAttribute('icon')

    expect(page.root).toHaveAttribute('icon-variant')
  })

  it('applies error styling when isError is true', async () => {
    const page = await newSpecPage({
      components: [GluHelperText, GluIcon],
      html: '<glu-helper-text icon="information-circle" is-error>Helper text with error</glu-helper-text>'
    })

    expect(page.root).toHaveClass('is-error')
  })
})
