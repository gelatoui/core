import { Attributes, inheritAttributes } from '@utils/helpers/helpers'

import { Component, Element, h, Host, Prop } from '@stencil/core'

/**
 * @component
 * @tag glu-helper-text
 * @shadow true
 *
 * @example
 * <glu-helper-text icon="information-circle" icon-variant="outline" is-error>
 *   This is an error message.
 * </glu-helper-text>
 */
@Component({
  tag: 'glu-helper-text',
  styleUrl: 'helper-text.css',
  shadow: true
})
export class GluHelperText {
  /**
   * The name of the icon to display.
   * The provided value should correspond to a valid icon in the `glu-icon` component.
   *
   * @prop {string} icon
   */
  @Prop({ reflect: true }) readonly icon: string

  /**
   * Specifies the visual style variant of the icon.
   * Possible values:
   * - `solid`: renders the solid version of the icon.
   * - `outline`: renders the outlined version of the icon.
   *
   * @prop {('solid' | 'outline')} iconVariant
   * @default 'outline'
   */
  @Prop({ reflect: true }) readonly iconVariant: 'solid' | 'outline' = 'outline'

  /**
   * When set to true, applies error styling to the helper text.
   *
   * @prop {boolean} isError
   * @default false
   */
  @Prop({ reflect: true }) readonly isError = false

  /**
   * A reference to the host element.
   * @element {HTMLGluHelperTextElement} helperTextElement - The component's host element.
   */
  // eslint-disable-next-line no-undef
  @Element() helperTextElement!: HTMLGluHelperTextElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner <input>
    this.inheritedAttributes = { ...inheritAttributes(this.helperTextElement) }
  }

  render() {
    return (
      <Host class={{ 'glu-helper-text': true, 'is-error': this.isError }}>
        {!!this.icon && (
          <div class="icon">
            <glu-icon
              name={this.icon}
              variant={this.iconVariant}
              size={14}
            />
          </div>
        )}
        <div class="text" {...this.inheritedAttributes}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
