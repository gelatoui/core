/* eslint-disable no-undef */
import { Attributes, inheritAttributes } from '@utils/helpers'

import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'

const EXCLUDE_ATTRIBUTES = new Set([
  'label',
  'value',
  'error',
  'helper-text',
  'helper-icon',
  'helper-is-error'
])

/**
 * A composite input field component that combines an optional label, an input, and optional helper text.
 *
 * Any extra attributes set on `<glu-input-field>` (except those explicitly defined) are forwarded
 * to the inner `<glu-input>` component.
 *
 * @see GluInput
 *
 * @component
 * @tag glu-input-field
 * @shadow true
 */
@Component({
  tag: 'glu-input-field',
  styleUrl: 'input-field.css',
  shadow: true
})
export class GluInputField {
  private inheritedAttributes: Attributes = {}

  /**
   * The label text displayed above the input. (Optional)
   * @prop {string} label
   * @default ''
   */
  @Prop() readonly label: string = ''

  /**
   * The value of the input field.
   * @prop {string} value
   * @default ''
   */
  @Prop({ mutable: true, reflect: true }) value = ''

  /**
   * Indicates if the input field is in an error state.
   * @prop {string} error
   * @default ''
   */
  @Prop() readonly error: string = ''

  /**
   * The helper text displayed below the input. (Optional)
   * @prop {string} helperText
   * @default ''
   */
  @Prop() readonly helperText: string = ''

  /**
   * The icon name to display in the helper text.
   * @prop {string} helperIcon
   * @default ''
   */
  @Prop() readonly helperIcon: string = ''

  /**
   * Specifies the visual style variant of the helper icon.
   * Possible values:
   * - `solid`: renders the solid version of the icon.
   * - `outline`: renders the outlined version of the icon.
   *
   * @prop {('solid' | 'outline')} helperIconVariant
   * @default 'outline'
   */
  @Prop() readonly helperIconVariant: 'solid' | 'outline' = 'outline'

  /**
   * Reference to the host element.
   * @element {HTMLGluInputFieldElement}
   */
  @Element() inputFieldElement!: HTMLGluInputFieldElement

  /**
   * Event emitted when the input value changes.
   */
  @Event() valueChanged: EventEmitter<string>

  private onInputChange = (event: Event): void => {
    const input = event.target as HTMLInputElement

    this.value = input.value

    this.valueChanged.emit(this.value)
  }

  componentWillLoad() {
    this.inheritedAttributes = {
      ...inheritAttributes(this.inputFieldElement, [...EXCLUDE_ATTRIBUTES])
    }
  }

  render() {
    return (
      <Host class="glu-input-field">
        {!!this.label && <glu-label>{this.label}</glu-label>}
        <glu-input
          value={this.value}
          error={!!this.error}
          onInput={this.onInputChange}
          {...this.inheritedAttributes}
        />
        {!!this.helperText && (
          <glu-helper-text
            icon={this.error ? 'exclamation-circle' : this.helperIcon}
            iconVariant={this.helperIconVariant}
            is-error={this.error}
          >
            {this.helperText}
          </glu-helper-text>
        )}
      </Host>
    )
  }
}
