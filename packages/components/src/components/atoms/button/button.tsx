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
  /** Reference to the host element */
  @Element() el!: HTMLElement

  /** Determines the visual style of the button */
  @Prop({ reflect: true }) appearance: ButtonAppearance = ButtonAppearance.FILLED

  /** Defines the size of the button */
  @Prop({ reflect: true }) size: ButtonSize = ButtonSize.MEDIUM

  /** Specifies the type of button */
  @Prop({ reflect: true }) buttonType: ButtonType = ButtonType.PRIMARY

  /** If `true`, the user cannot interact with the button */
  @Prop({ reflect: true }) disabled = false

  /** Contains a URL or a URL fragment that the hyperlink points to. If set, an anchor tag will be rendered. */
  @Prop() href?: string

  /** Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). */
  @Prop() rel?: string

  /** Specifies where to display the linked URL. Only applies when an `href` is provided. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`. */
  @Prop() target?: string

  /** The type of the button. */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button'

  /** The HTML form element or form element id. Used to submit a form when the button is not a child of the form. */
  @Prop() form?: string | HTMLFormElement

  render() {
    const { buttonType, type, disabled, rel, target, size, href, appearance } = this
    // Determine if the component should render as a button or anchor tag
    const TagType = href === undefined ? 'button' : 'a'
    // Define attributes dynamically based on the tag type
    const attrs = TagType === 'button' ? { type, disabled } : { href, rel, target }

    return (
      <Host
        class={{
          button: true,
          [`button--${buttonType}`]: !!buttonType,
          [`button--size-${size}`]: !!size,
          [`button--appearance-${appearance}`]: !!appearance,
          'button--disabled': disabled
        }}
      >
        <TagType {...attrs}>
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
