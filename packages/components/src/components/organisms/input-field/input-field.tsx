import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core'

/**
 * A composite input field component that combines a label, an input, and helper text.
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
  /**
   * The label text displayed above the input.
   * @prop {string} label
   * @default ''
   */
  @Prop() readonly label = ''

  /**
   * The placeholder text for the input.
   * @prop {string} placeholder
   * @default ''
   */
  @Prop() readonly placeholder = ''

  /**
   * The value of the input field.
   * @prop {string} value
   * @default ''
   */
  @Prop({ mutable: true, reflect: true }) value = ''

  /**
   * Indicates if the input field is in an error state.
   * @prop {boolean} error
   * @default false
   */
  @Prop() readonly error = false

  /**
   * The helper text displayed below the input.
   * @prop {string} helperText
   * @default ''
   */
  @Prop() readonly helperText = ''

  /**
   * The icon name to display in the helper text.
   * @prop {string} helperIcon
   * @default ''
   */
  @Prop() readonly helperIcon = ''

  /**
   * If true, applies error styling to the helper text.
   * @prop {boolean} helperIsError
   * @default false
   */
  @Prop() readonly helperIsError = false

  /**
   * Event emitted when the input value changes.
   */
  @Event() valueChanged: EventEmitter<string>

  private onInputChange = (event: Event): void => {
    const input = event.target as HTMLInputElement

    this.value = input.value

    this.valueChanged.emit(this.value)
  }

  render() {
    return (
      <Host>
        <glu-label>{this.label}</glu-label>
        <glu-input
          placeholder={this.placeholder}
          value={this.value}
          error={this.error}
          onInput={this.onInputChange}
        >
        </glu-input>
        <glu-helper-text icon={this.helperIcon} is-error={this.helperIsError}>
          {this.helperText}
        </glu-helper-text>
      </Host>
    )
  }
}
