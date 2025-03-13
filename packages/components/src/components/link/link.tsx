import { Attributes, inheritAttributes } from '@utils/helpers/helpers'

import { Component, Element, h, Host, Prop } from '@stencil/core'

/**
 * @component
 * @tag glu-link
 * @shadow true
 */
@Component({
  tag: 'glu-link',
  shadow: true,
  styleUrl: 'link.css'
})
export class GluLink {
  /**
   * The URL that the hyperlink points to.
   * @prop {string} href - The URL of the link.
   */
  @Prop() readonly href!: string

  /**
   * The size of the link.
   * @prop {string} size - The size of the link.
   * @default 'medium'
   */
  @Prop() readonly size?: 'large' | 'medium' | 'small' = 'medium'

  /**
   * A reference to the host element.
   * @element {HTMLGluLinkElement} linkElement - The component's host element.
   */
  // eslint-disable-next-line no-undef
  @Element() linkElement!: HTMLGluLinkElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner element
    this.inheritedAttributes = { ...inheritAttributes(this.linkElement, ['target', 'rel']) }
  }

  render() {
    return (
      <Host
        class={{
          'glu-link': true,
          [`glu-link--size-${this.size}`]: !!this.size
        }}
      >
        <a {...this.inheritedAttributes} href={this.href}>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
