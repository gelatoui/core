/* eslint-disable no-undef */
import { InputType } from './input.types'

import { Component, Element, Fragment, h, Host, Prop, State } from '@stencil/core'

/**
 * A custom input component that supports various input types, prefix/suffix elements,
 * and validation states.
 *
 * @component
 * @tag glu-input
 * @shadow true
 */
@Component({
  tag: 'glu-input',
  styleUrl: 'input.css',
  shadow: true
})
export class GluInput {
  /**
   * Specifies the input type.
   *
   * Allowed values: 'generic', 'currency', 'phone' or any valid InputType.
   * @prop {string} type
   * @default 'generic'
   */
  @Prop() readonly type: 'generic' | 'currency' | 'phone' | InputType = 'generic'

  /**
   * Name of the suffix icon to display when `showSuffixIcon` is true.
   * @prop {string} suffixIcon
   * @default ''
   */
  @Prop() readonly suffixIcon: string = ''

  /**
   * The visual variant style of the suffix icon.
   * @prop {('solid' | 'outline')} suffixIconVariant
   * @default 'outline'
   */
  @Prop() readonly suffixIconVariant: 'solid' | 'outline' = 'outline'

  /**
   * Name of the prefix icon to display when `showPrefixIcon` is true.
   * @prop {string} prefixIcon
   * @default ''
   */
  @Prop() readonly prefixIcon: string = ''

  /**
   * The visual variant style of the prefix icon.
   * @prop {('solid' | 'outline')} prefixIconVariant
   * @default 'outline'
   */
  @Prop() readonly prefixIconVariant: 'solid' | 'outline' = 'outline'

  /**
   * Text content to display as a suffix.
   * @prop {string} suffixText
   * @default ''
   */
  @Prop() readonly suffixText: string = ''

  /**
   * Text content to display as a prefix.
   * @prop {string} prefixText
   * @default ''
   */
  @Prop() readonly prefixText: string = ''

  /**
   * Sets the input to an error state.
   * @prop {boolean} error
   * @default false
   */
  @Prop() readonly error: boolean = false

  /**
   * Disables the input if true.
   * @prop {boolean} disabled
   * @default false
   */
  @Prop() readonly disabled: boolean = false

  /**
   * Makes the input read-only.
   * @prop {boolean} readOnly
   * @default false
   */
  @Prop() readonly readOnly: boolean = false

  /**
   * Placeholder text for the input.
   * @prop {string} placeholder
   * @default ''
   */
  @Prop() readonly placeholder: string = ''

  /**
   * The input's value. This property is mutable and allows for two-way binding.
   * @prop {string} value
   * @default ''
   */
  @Prop({ mutable: true }) value = ''

  /**
   * Shows a clear (✖) icon to reset the input when true (just search input).
   * @prop {boolean} showClearIcon
   * @default false
   */
  @Prop() readonly showClearIcon: boolean = false

  /**
   * Indicates if the input currently has focus.
   * @state {boolean} isFocused
   */
  @State() isFocused = false

  /**
   * Toggles the visibility of the password text when the input type is 'password'.
   * @state {boolean} showPassword
   */
  @State() showPassword = false

  /**
   * Reference to the host element.
   * @element {HTMLGluInputElement}
   */
  @Element() inputElement!: HTMLGluInputElement

  /**
   * Handles the input event by updating the component's value.
   *
   * @param {Event} event - The input event triggered by user input.
   */
  private handleInput = (event: Event): void => {
    const input = event.target as HTMLInputElement

    this.value = input.value
  }

  /**
   * Sets the focus state to true when the input gains focus.
   */
  private handleFocus = (): void => {
    this.isFocused = true
  }

  /**
   * Sets the focus state to false when the input loses focus.
   */
  private handleBlur = (): void => {
    this.isFocused = false
  }

  /**
   * Toggles the password visibility.
   * Only applicable when the input type is 'password'.
   */
  private togglePasswordVisibility = (): void => {
    this.showPassword = !this.showPassword
  }

  /**
   * Clears the input field by resetting its value.
   */
  private clearInput = (): void => {
    this.value = ''
  }

  /**
   * Determines the correct native input type based on the component's type property.
   *
   * @returns {string} The native input type (e.g., 'text', 'password', 'date', etc.).
   */
  private getInputType = (): string => {
    switch (this.type) {
      case 'password':
        return this.showPassword ? 'text' : 'password'

      case 'date':
        return 'date'

      case 'phone':
        return 'tel'

      case 'url':
        return 'url'

      case 'search':
        return 'search'

      case 'number':
        return 'number'

      default:
        // For 'generic' and 'currency', use a standard text input.
        return 'text'
    }
  }

  /**
   * Focuses the native input element when the component's host is clicked.
   */
  private focusInput = (): void => {
    const input = this.inputElement.shadowRoot?.querySelector('input')

    input?.focus()
  }

  /**
   * Specifically focuses a date input and attempts to open the date picker if supported.
   */
  private focusDateInput = (): void => {
    const input: HTMLInputElement = this.inputElement.shadowRoot?.querySelector('input[type="date"]')

    // If the browser supports showPicker(), open the date picker; otherwise, just focus the input.
    if (typeof input.showPicker === 'function') {
      input?.showPicker()
    } else {
      input?.focus()
    }
  }

  /**
   * Renders the prefix element (icon or text) based on the input type and provided properties.
   *
   * @returns {JSX.Element | null} The JSX for the prefix element, or null if none is specified.
   */
  private renderPrefix = () => {
    switch (this.type) {
      case 'currency':
        return <span class="prefix-text">$</span>

      case 'search':
        return <glu-icon name="magnifying-glass" size={18} class="prefix-icon" />

      case 'date':
        return (
          <glu-icon
            name="calendar"
            size={18}
            class="prefix-icon cursor-pointer"
            variant={this.prefixIconVariant}
            onClick={this.focusDateInput}
          />
        )

      case 'phone':
        return <glu-icon name="phone" size={18} class="prefix-icon" variant={this.prefixIconVariant} />

      case 'url':
        return <span class="prefix-text">https://</span>

      default:
        // Render custom prefix icon and/or text if enabled.
        return (this.prefixIcon || this.prefixText) && (
          <Fragment>
            {this.prefixIcon && (
              <glu-icon name={this.prefixIcon} size={18} class="prefix-icon" variant={this.prefixIconVariant} />
            )}
            {this.prefixText && <span class="prefix-text">{this.prefixText}</span>}
          </Fragment>
        )
    }
  }

  /**
   * Renders the suffix element (icon or text) based on the input type and provided properties.
   *
   * @returns {JSX.Element | null} The JSX for the suffix element, or null if none is specified.
   */
  private renderSuffix = () => {
    switch (this.type) {
      case 'password':
        return (
          <glu-icon
            name={this.showPassword ? 'eye-slash' : 'eye'}
            size={18}
            variant={this.suffixIconVariant}
            class="suffix-icon cursor-pointer"
            onClick={this.togglePasswordVisibility}
          />
        )

      case 'search':
        return this.value && this.showClearIcon && (
          <glu-icon
            name="x-circle"
            size={18}
            class="suffix-icon cursor-pointer"
            variant={this.suffixIconVariant}
            onClick={this.clearInput}
          />
        )

      default:
        // Render custom suffix icon and/or text if enabled.
        return (this.suffixIcon || this.suffixText) && (
          <Fragment>
            {this.suffixIcon && (
              <glu-icon name={this.suffixIcon} size={18} class="suffix-icon" variant={this.suffixIconVariant} />
            )}
            {this.suffixText && <span class="suffix-text">{this.suffixText}</span>}
          </Fragment>
        )
    }
  }

  /**
   * Renders the component's HTML structure.
   *
   * @returns {JSX.Element} The rendered input component.
   */
  render() {
    return (
      <Host
        class={{
          'glu-input': true,
          error: this.error,
          disabled: this.disabled,
          'read-only': this.readOnly,
          focused: this.isFocused
        }}
        onClick={this.focusInput}
      >
        {this.renderPrefix()}
        <input
          type={this.getInputType()}
          class="native-input"
          placeholder={this.placeholder}
          value={this.value}
          disabled={this.disabled}
          readOnly={this.readOnly}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderSuffix()}
      </Host>
    )
  }
}
