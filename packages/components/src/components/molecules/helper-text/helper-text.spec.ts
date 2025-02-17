/* eslint-disable no-undef */
import { GluHelperText } from './helper-text'

import { GluIcon } from '../../atoms/icon/icon'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-helper-text', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [GluHelperText, GluIcon],
      html: '<glu-helper-text icon="information-circle"></glu-helper-text>'
    })

    expect(page.root).toMatchInlineSnapshot(/* html */`
      <glu-helper-text class="glu-helper-text" icon="information-circle">
        <template shadowrootmode="open">
          <div class="icon">
            <glu-icon name="information-circle" variant="outline">
              <template shadowrootmode="open">
                <img alt="information-circle" class="glu-icon" height="14" role="img" src="[object Object]" width="14">
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

  it('renders a solid icon when is-solid-icon is true', async () => {
    const page = await newSpecPage({
      components: [GluHelperText, GluIcon],
      html: '<glu-helper-text icon="information-circle" is-solid-icon></glu-helper-text>'
    })

    expect(page.root).toMatchInlineSnapshot(/* html */`
      <glu-helper-text class="glu-helper-text" icon="information-circle" is-solid-icon="">
        <template shadowrootmode="open">
          <div class="icon">
            <glu-icon name="information-circle" variant="solid">
              <template shadowrootmode="open">
                <img alt="information-circle" class="glu-icon" height="14" role="img" src="[object Object]" width="14">
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
      html: '<glu-helper-text icon="backward" is-solid-icon></glu-helper-text>'
    })

    expect(page.root).toHaveAttribute('icon')

    expect(page.root).toHaveAttribute('is-solid-icon')
  })
})
