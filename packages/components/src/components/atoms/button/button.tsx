/* eslint-disable @stylistic/lines-around-comment */
import {
  ButtonAppearance,
  ButtonSize,
  ButtonType
} from './button.types'

import { Component, Element, h, Host, Prop } from '@stencil/core'

h('')

/**
 * A customizable button component with support for different appearances, sizes, and types.
 *
 * @component
 * @tag glu-button
 * @shadow true
 * @slot - Default content placed between the `start` and `end` slots.
 * @slot icon-only - Content placed in the center of the button, typically used for icons.
 * @slot start - Content placed at the beginning of the button, before the default slot.
 * @slot end - Content placed at the end of the button, after the default slot.
 */
@Component({
  tag: 'glu-button',
  shadow: true,
  styleUrls: [
    './button.css',
    './button.primary.css',
    './button.secondary.css',
    './button.destructive.css'
  ]
})
export class ButtonGlu {
  /**
   * Reference to the host element.
   * @type {HTMLElement}
   */
  @Element() el!: HTMLElement

  /**
   * Determines the visual style of the button.
   * @type {ButtonAppearance}
   * @default ButtonAppearance.FILLED
   */
  @Prop({ reflect: true }) appearance: ButtonAppearance = ButtonAppearance.FILLED

  /**
   * Defines the size of the button.
   * @type {ButtonSize}
   * @default ButtonSize.MEDIUM
   */
  @Prop({ reflect: true }) size: ButtonSize = ButtonSize.MEDIUM

  /**
   * Specifies the type of button.
   * @type {ButtonType}
   * @default ButtonType.PRIMARY
   */
  @Prop({ reflect: true }) buttonType: ButtonType = ButtonType.PRIMARY

  /**
   * If `true`, the user cannot interact with the button.
   * @type {boolean}
   * @default false
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * Contains a URL or a URL fragment that the hyperlink points to. If set, an anchor tag will be rendered.
   * @type {string}
   */
  @Prop() href?: string

  /**
   * Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   * @type {string}
   */
  @Prop() rel?: string

  /**
   * Specifies where to display the linked URL. Only applies when an `href` is provided. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   * @type {string}
   */
  @Prop() target?: string

  /**
   * The type of the button.
   * @type {'submit' | 'reset' | 'button'}
   * @default 'button'
   */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button'

  /**
   * Render method to generate the component's HTML.
   * @returns {JSX.Element} The rendered HTML of the button.
   */
  render() {
    const { buttonType, type, disabled, rel, target, size, href, appearance } = this
    // Determine if the component should render as a button or anchor tag
    const TagType = href === undefined ? 'button' : 'a'
    // Define attributes dynamically based on the tag type
    const attrs = TagType === 'button' ? { type, disabled } : { href, rel, target }

    return (
      <Host
        class={{
          'glu-button': true,
          [`glu-button--${buttonType}`]: !!buttonType,
          [`glu-button--size-${size}`]: !!size,
          [`glu-button--appearance-${appearance}`]: !!appearance,
          'glu-button--disabled': disabled
        }}
      >
        <TagType {...attrs}>
          <slot name="icon-only"></slot>
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </TagType>
      </Host>
    )
  }
}
