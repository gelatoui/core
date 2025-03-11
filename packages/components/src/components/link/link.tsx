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
   * Specifies where to open the linked document (`_self`, `_blank`, etc.).
   * @prop {string} target - Where to open the link.
   * @default '_self'
   */
  @Prop() readonly target: '_self' | '_blank' | '_parent' | '_top' = '_self'

  /**
   * Specifies the relationship between the current document and the linked document.
   * @prop {string} rel - The rel attribute for the link.
   */
  @Prop() readonly rel?: string

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
    this.inheritedAttributes = { ...inheritAttributes(this.linkElement) }
  }

  render() {
    const { size, target, rel, href } = this

    return (
      <Host
        class={{
          'glu-link': true,
          [`glu-link--size-${size}`]: !!size
        }}
      >
        <a {...this.inheritedAttributes} href={href} target={target} rel={rel}>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
