/* eslint-disable no-undef */
import { Attributes, inheritAttributes } from '@utils/helpers/helpers'

import { Component, Element, h, Host, Prop } from '@stencil/core'

/**
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
    './button-primary.css',
    './button-secondary.css',
    './button-destructive.css'
  ]
})
export class GluButton {
  /**
   * Determines the visual style of the button
   * @prop {ButtonAppearance} appearance - Visual style of the button
   * @default ButtonAppearance.FILLED
   * @readonly
   */
  @Prop({ reflect: true }) readonly appearance: 'filled' | 'outline' | 'ghost' = 'filled'

  /**
   * Defines the size of the button.
   * @prop {ButtonSize} size - The size of the button.
   * @default medium
   * @readonly
   */
  @Prop({ reflect: true }) readonly size: 'small' | 'medium' | 'large' = 'medium'

  /**
   * Specifies the type of button.
   * @prop {ButtonType} buttonType - The type of button.
   * @default primary
   * @readonly
   */
  @Prop({ reflect: true }) readonly buttonType: 'primary' | 'secondary' | 'destructive' = 'primary'

  /**
   * If `true`, the user cannot interact with the button.
   * @prop {boolean} disabled - Disables the button when set to `true`.
   * @default false
   * @readonly
   */
  @Prop({ reflect: true }) readonly disabled = false

  /**
   * Contains a URL or a URL fragment that the hyperlink points to. If set, an anchor tag will be rendered.
   * @prop {string} [href] - URL the button should navigate to.
   */
  @Prop() readonly href?: string

  /**
   * Specifies the relationship of the target object to the link object.
   * @prop {string} [rel] - Space-separated list of link types.
   */
  @Prop() readonly rel?: string

  /**
   * Specifies where to display the linked URL. Only applies when an `href` is provided.
   * @prop {string} [target] - Specifies where to open the linked document (`_self`, `_blank`, etc.).
   */
  @Prop() readonly target?: string

  /**
   * The type of the button.
   * @prop {'submit' | 'reset' | 'button'} type - Specifies the native button type.
   * @default button
   * @readonly
   */
  @Prop() readonly type: 'submit' | 'reset' | 'button' = 'button'

  /**
   * A reference to the host element.
   * @element {HTMLGluButtonElement} buttonElement - The component's host element.
   */

  @Element() buttonElement!: HTMLGluButtonElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner <input>
    this.inheritedAttributes = { ...inheritAttributes(this.buttonElement) }
  }

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
        <TagType {...this.inheritedAttributes} {...attrs}>
          <slot name="icon-only"></slot>
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </TagType>
      </Host>
    )
  }
}
