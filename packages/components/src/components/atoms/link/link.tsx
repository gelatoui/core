/* eslint-disable @stylistic/lines-around-comment */
import { LinkSize, LinkTarget } from './link.types'

import { Component, h, Host, Prop } from '@stencil/core'

/**
 * A flexible link component supporting different appearances and behaviors.
 *
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
  @Prop() readonly target: LinkTarget = LinkTarget.SELF

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
  @Prop() readonly size?: LinkSize = LinkSize.MEDIUM

  render() {
    const { size, target, rel, href } = this

    return (
      <Host
        class={{
          'glu-button': true,
          [`glu-link--size-${size}`]: !!size
        }}
      >
        <a href={href} target={target} rel={rel}>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
