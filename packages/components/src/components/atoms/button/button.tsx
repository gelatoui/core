/* eslint-disable @stylistic/lines-around-comment */
import {
  ButtonAppearance,
  ButtonSize,
  ButtonType
} from './button.types'

import { Component, Element, h, Host, Prop } from '@stencil/core'

h('')

@Component({
  tag: 'glu-button',
  shadow: true,
  styleUrls: ['./button.css']
})
export class ButtonGlu {
  @Element() el!: HTMLElement

  @Prop({ reflect: true }) appearance: ButtonAppearance = ButtonAppearance.FILLED
  @Prop({ reflect: true }) size: ButtonSize = ButtonSize.MEDIUM
  @Prop({ reflect: true }) buttonType: ButtonType = ButtonType.PRIMARY
  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop() href: string | undefined
  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel: string | undefined
  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   */
  @Prop() target: string | undefined
  /**
   * The type of the button.
   */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button'
  /**
   * The HTML form element or form element id. Used to submit a form when the button is not a child of the form.
   */
  @Prop() form?: string | HTMLFormElement

  render() {
    const {
      buttonType,
      type,
      disabled,
      rel,
      target,
      size,
      href,
      appearance
    } = this

    const TagType = href === undefined ? 'button' : 'a'

    const attrs =
      TagType === 'button' ?
        { type } :
        {
          href,
          rel,
          target
        }

    return (
      <Host
        class={{
          [buttonType]: buttonType !== undefined,
          [`${buttonType}--size-${size}`]: size !== undefined,
          [`${buttonType}--appearance-${appearance}`]: appearance !== undefined,
          disabled
        }}
      >
        <TagType disabled={disabled} {...attrs}>
          <span class="button-inner">
            <slot name="icon-only"></slot>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </TagType>
      </Host>
    )
  }
}
