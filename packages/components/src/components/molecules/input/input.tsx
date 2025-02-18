/* eslint-disable no-undef */
import { InputType } from './input.types'

import { Component, Element, h, Host, Prop, State } from '@stencil/core'

/**
 * Custom input component supporting different types, prefix/suffix elements, and validation states.
 */
@Component({
  tag: 'glu-input',
  styleUrl: 'input.css',
  shadow: true
})
export class GluInput {
  /** The type of input. */
  @Prop() readonly type: 'generic' | 'currency' | 'phone' | InputType = 'generic'

  /** Whether to show a suffix icon. */
  @Prop() readonly showSuffixIcon = false

  /** The name of the suffix icon (if `showSuffixIcon` is true). */
  @Prop() readonly suffixIcon = ''

  /** Whether to show a prefix icon. */
  @Prop() readonly showPrefixIcon = false

  /** The name of the prefix icon (if `showPrefixIcon` is true). */
  @Prop() readonly prefixIcon = ''

  /** Whether to show suffix text. */
  @Prop() readonly showSuffixText = false

  /** Text displayed as a suffix. */
  @Prop() readonly suffixText = ''

  /** Whether to show prefix text. */
  @Prop() readonly showPrefixText = false

  /** Text displayed as a prefix. */
  @Prop() readonly prefixText = ''

  /** Whether the input should be displayed with an error state. */
  @Prop() readonly error = false

  /** Whether the input is disabled. */
  @Prop() readonly disabled = false

  /** Whether the input is read-only. */
  @Prop() readonly readOnly = false

  /** Placeholder text for the input. */
  @Prop() readonly placeholder = ''

  /** The input's value. This prop is mutable, allowing it to be updated internally. */

  @Prop({ mutable: true }) value = ''

  /** Whether to show a clear (✖) icon in the input for clearing its value. */
  @Prop() readonly showClearIcon = true

  /** Tracks whether the input is currently focused. */
  @State() isFocused = false

  /** Controls the visibility of the password input type. */
  @State() showPassword = false

  @Element() el!: HTMLGluInputElement

  /**
   * Handles input event and updates the internal value and the mutable prop.
   * @param event The input event.
   */
  private handleInput = (event: Event): void => {
    const input = event.target as HTMLInputElement

    this.value = input.value
  }

  /** Handles focus event, setting `isFocused` to `true`. */
  private handleFocus = (): void => {
    this.isFocused = true
  }

  /** Handles blur event, setting `isFocused` to `false`. */
  private handleBlur = (): void => {
    this.isFocused = false
  }

  /** Toggles password visibility for password inputs. */
  private togglePasswordVisibility = (): void => {
    this.showPassword = !this.showPassword
  }

  /** Clears the input field by resetting `internalValue` and the mutable prop. */
  private clearInput = (): void => {
    this.value = ''
  }

  /**
   * Determines the appropriate input type.
   * @returns The correct input type (`text`, `password`, `date`, etc.).
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
        // For generic or currency inputs, we use a standard text input.
        return 'text'
    }
  }

  /** Focus the input when the host is clicked. */
  private focusInput = (): void => {
    const input = this.el.shadowRoot?.querySelector('input') as HTMLInputElement

    if (input) {
      input.focus()
    }
  }

  /** Focus the date input and try to open the date picker if available. */
  private focusDateInput = (): void => {
    const input = this.el.shadowRoot?.querySelector('input[type="date"]') as HTMLInputElement

    if (input) {
      if (typeof input.showPicker === 'function') {
        input.showPicker()
      } else {
        input.focus()
      }
    }
  }

  /**
   * Renders the prefix icon or text based on the input type and props.
   * @returns JSX for the prefix content.
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
            onClick={this.focusDateInput}
          />
        )

      case 'phone':
        return <glu-icon name="phone" size={18} class="prefix-icon" />

      case 'url':
        return <span class="prefix-text">https://</span>

      default:
        return (this.showPrefixIcon || this.showPrefixText) && (
          <>
            {this.showPrefixIcon && <glu-icon name={this.prefixIcon} size={18} class="prefix-icon" />}
            {this.showPrefixText && <span class="prefix-text">{this.prefixText}</span>}
          </>
        )
    }
  }

  /**
   * Renders the suffix icon or text based on the input type and props.
   * @returns JSX for the suffix content.
   */
  private renderSuffix = () => {
    switch (this.type) {
      case 'password':
        return (
          <glu-icon
            name={this.showPassword ? 'eye-slash' : 'eye'}
            size={18}
            class="suffix-icon cursor-pointer"
            onClick={this.togglePasswordVisibility}
          />
        )

      case 'search':
        return this.value && this.showClearIcon && (
          <glu-icon name="x-circle" size={18} class="suffix-icon cursor-pointer" onClick={this.clearInput} />
        )

      default:
        return (this.showSuffixIcon || this.showSuffixText) && (
          <>
            {this.showSuffixIcon && <glu-icon name={this.suffixIcon} size={18} class="suffix-icon" />}
            {this.showSuffixText && <span class="suffix-text">{this.suffixText}</span>}
          </>
        )
    }
  }

  /** Renders the component. */
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
