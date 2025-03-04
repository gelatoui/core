import { Component, h, Host, Prop } from '@stencil/core'

/**
 * @component
 * @tag glu-menu-label
 * @shadow true
 *
 * @slot - The text content of the menu label.
 */
@Component({
  tag: 'glu-menu-label',
  styleUrl: 'menu-label.css',
  shadow: true
})
export class GluMenuLabel {
  /**
   * URL to navigate to when clicking the label.
   */
  @Prop() readonly href?: string

  /**
   * Specifies where to open the linked document. Only applicable if `href` is set.
   */
  @Prop() readonly target?: '_self' | '_blank' | '_parent' | '_top'

  /**
   * Specifies the relationship between the current document and the linked document. Only applicable if `href` is set.
   */
  @Prop() readonly rel?: string

  render() {
    return (
      <Host class="glu-menu-label" part="menu-label">
        {this.href ?
          (
            <a href={this.href} target={this.target} rel={this.rel} class="label-container">
              <slot></slot>
            </a>
          ) :
          (
            <span class="label-container">
              <slot></slot>
            </span>
          )}
      </Host>
    )
  }
}
