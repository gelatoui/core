/* eslint-disable no-undef */
import { ButtonGlu } from './button'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-button', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [ButtonGlu],
      html: '<glu-button></glu-button>'
    })

    expect(page.root).toEqualHtml(/* html */ `
      <glu-button
        appearance="filled"
        button-type="primary"
        class="glu-button glu-button--appearance-filled glu-button--primary glu-button--size-medium"
        size="medium"
      >
        <mock:shadow-root>
          <button type="button">
            <slot name="icon-only"></slot>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </button>
        </mock:shadow-root>
      </glu-button>
    `)
  })

  it('renders an anchor when href is provided', async () => {
    const page = await newSpecPage({
      components: [ButtonGlu],
      html: '<glu-button href="https://example.com"></glu-button>'
    })

    expect(page.root).toEqualHtml(/* html */ `
      <glu-button
        appearance="filled"
        button-type="primary"
        class="glu-button glu-button--appearance-filled glu-button--primary glu-button--size-medium"
        href="https://example.com"
        size="medium"
      >
        <mock:shadow-root>
          <a href="https://example.com">
            <slot name="icon-only"></slot>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </a>
        </mock:shadow-root>
      </glu-button>
    `)
  })

  it('reflects properties correctly', async () => {
    const page = await newSpecPage({
      components: [ButtonGlu],
      html: '<glu-button appearance="outline" size="small" button-type="secondary"></glu-button>'
    })

    expect(page.root).toHaveAttribute('appearance')

    expect(page.root).toHaveAttribute('size')

    expect(page.root).toHaveAttribute('button-type')
  })

  it('applies disabled attribute correctly', async () => {
    const page = await newSpecPage({
      components: [ButtonGlu],
      html: '<glu-button disabled="true"></glu-button>'
    })

    expect(page.root.shadowRoot.querySelector('button')).toHaveAttribute('disabled')
  })

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [ButtonGlu],
      html: '<glu-button><span>Click me</span></glu-button>'
    })

    expect(page.root.shadowRoot.querySelector('slot')).toBeTruthy()
  })
})
