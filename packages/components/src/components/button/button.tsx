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
   * A reference to the host element.
   * @element {HTMLGluButtonElement} buttonElement - The component's host element.
   */

  // eslint-disable-next-line no-undef
  @Element() buttonElement!: HTMLGluButtonElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner element
    this.inheritedAttributes = { ...inheritAttributes(this.buttonElement, ['type', 'disabled', 'rel', 'target', 'href']) }
  }

  /**
   * Render method to generate the component's HTML.
   * @returns {JSX.Element} The rendered HTML of the button.
   */
  render() {
    // Determine if the component should render as a button or anchor tag
    const TagType = this.href === undefined ? 'button' : 'a'

    return (
      <Host
        class={{
          'glu-button': true,
          [`glu-button--${this.buttonType}`]: !!this.buttonType,
          [`glu-button--size-${this.size}`]: !!this.size,
          [`glu-button--appearance-${this.appearance}`]: !!this.appearance,
          'glu-button--disabled': this.disabled
        }}
      >
        <TagType {...this.inheritedAttributes}>
          <slot name="icon-only"></slot>
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </TagType>
      </Host>
    )
  }
}
