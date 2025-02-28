import { Component, h, Host, Prop } from '@stencil/core'

/**
 * @component
 * @tag glu-breadcrumb
 * @shadow true
 *
 * @slot - The default slot for the breadcrumb label or content.
 * @slot separator - An optional slot for customizing the separator between breadcrumb items. Defaults to an `glu-icon` with `name="arrow-right"`.
 */
@Component({
  tag: 'glu-breadcrumb',
  styleUrl: 'breadcrumb.css',
  shadow: true
})
export class GluBreadcrumb {
  /**
   * Optional URL for the breadcrumb. If provided, the breadcrumb becomes a clickable link.
   * @prop {string} href
   */
  @Prop() readonly href?: string

  render() {
    const clickable = !!this.href

    return (
      <Host>
        {clickable ?
          (
            <a href={this.href} class={clickable ? 'clickable' : 'disabled'}>
              <slot></slot>
            </a>
          ) :
          (
            <slot></slot>
          )}
        <span class="separator">
          <slot name="separator">
            <glu-icon name="arrow-right"></glu-icon>
          </slot>
        </span>
      </Host>
    )
  }
}
