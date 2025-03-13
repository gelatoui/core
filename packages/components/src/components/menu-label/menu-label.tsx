import { Attributes, inheritAttributes } from '@utils/helpers/helpers'

import { Component, Element, h, Host, Prop } from '@stencil/core'

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
   * @prop {string} href - Specifies the native button type.
   * @default undefined
   * @readonly
   */
  @Prop() readonly href?: string

  /**
   * A reference to the host element.
   *
   * @element {HTMLGluMenuLabelElement} MenuLabelElement - The component's host element.
   */
  // eslint-disable-next-line no-undef
  @Element() menuLabelElement!: HTMLGluMenuLabelElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner element.
    this.inheritedAttributes = { ...inheritAttributes(this.menuLabelElement, ['target', 'rel']) }
  }

  render() {
    return (
      <Host class="glu-menu-label">
        {this.href ?
          (
            <a href={this.href} {...this.inheritedAttributes}>
              <slot></slot>
            </a>
          ) :
          <slot></slot>}
      </Host>
    )
  }
}
