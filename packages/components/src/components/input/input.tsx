import { Attributes, inheritAttributes } from '@utils/helpers'

import { InputChangeEventDetail, InputType } from './input.types'

import { Component, Element, Event, EventEmitter, Fragment, h, Host, Prop, State } from '@stencil/core'

/**
 * A composite input component that supports a label, helper text and advanced input features
 * such as prefix/suffix elements, custom input types, and error states.
 *
 * Any extra attributes (except those explicitly defined) set on `<glu-input>` are forwarded
 * to the inner native `<input>` element.
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
  // ---------------------------
  // Field (wrapper) properties
  // ---------------------------
  /**
   * Optional label text displayed above the input field.
   * @prop {string} label - The label text.
   * @readonly
   */
  @Prop() readonly label: string

  /**
   * The error message to display below the input.
   * When non-empty, the component enters an error state and a default error icon is used.
   * @prop {string} error - The error message.
   * @readonly
   */
  @Prop() readonly error: string

  /**
   * Supplemental helper text displayed below the input.
   * @prop {string} helperText - Additional guidance or context.
   * @readonly
   */
  @Prop() readonly helperText: string

  /**
   * The name of the helper icon displayed alongside the helper text.
   * If an error exists, a default error icon is shown instead.
   * @prop {string} helperIcon - The helper icon identifier.
   * @readonly
   */
  @Prop() readonly helperIcon: string

  /**
   * Specifies the visual variant for the helper icon.
   * Allowed values: 'solid' or 'outline'.
   * @prop {'solid' | 'outline'} helperIconVariant - The helper icon style.
   * @default 'outline'
   * @readonly
   */
  @Prop() readonly helperIconVariant: 'solid' | 'outline' = 'outline'

  // ---------------------------
  // Base input properties
  // ---------------------------
  /**
   * Determines the type of the input field.
   * Supported types include 'generic', 'currency', 'phone', 'password', 'date', 'url', 'search', 'number'
   * or any valid InputType. This setting affects both the native input type and UI behavior.
   * @prop {'text' | 'currency' | 'phone' | 'password' | 'date' | 'url' | 'search' | 'number' | InputType} type - The input type.
   * @default 'text'
   * @readonly
   */
  @Prop() readonly type: 'text' | 'currency' | 'phone' | 'password' | 'date' | 'url' | 'search' | 'number' | InputType = 'text'

  /**
   * The name of the suffix icon displayed on the right side of the input.
   * @prop {string} suffixIcon - The suffix icon identifier.
   * @readonly
   */
  @Prop() readonly suffixIcon: string

  /**
   * Defines the visual variant for the suffix icon.
   * Allowed values: 'solid' or 'outline'.
   * @prop {'solid' | 'outline'} suffixIconVariant - The suffix icon style.
   * @default 'outline'
   * @readonly
   */
  @Prop() readonly suffixIconVariant: 'solid' | 'outline' = 'outline'

  /**
   * The name of the prefix icon displayed on the left side of the input.
   * @prop {string} prefixIcon - The prefix icon identifier.
   * @readonly
   */
  @Prop() readonly prefixIcon: string

  /**
   * Defines the visual variant for the prefix icon.
   * Allowed values: 'solid' or 'outline'.
   * @prop {'solid' | 'outline'} prefixIconVariant - The prefix icon style.
   * @default 'outline'
   * @readonly
   */
  @Prop() readonly prefixIconVariant: 'solid' | 'outline' = 'outline'

  /**
   * Optional text displayed as a suffix adjacent to the input field.
   * @prop {string} suffixText - The suffix text content.
   * @readonly
   */
  @Prop() readonly suffixText: string

  /**
   * Optional text displayed as a prefix adjacent to the input field.
   * @prop {string} prefixText - The prefix text content.
   * @readonly
   */
  @Prop() readonly prefixText: string

  /**
   * Renders the input with error styling when true.
   * @prop {boolean} isError - True if the input is in an error state.
   * @default false
   * @readonly
   */
  @Prop() readonly isError: boolean = false

  /**
   * Disables the input field, preventing user interaction.
   * @prop {boolean} disabled - True if the input is disabled.
   * @default false
   * @readonly
   */
  @Prop() readonly disabled: boolean = false

  /**
   * Renders the input field in read-only mode, allowing focus and selection but preventing edits.
   * @prop {boolean} readOnly - True if the input is read-only.
   * @default false
   * @readonly
   */
  @Prop() readonly readOnly: boolean = false

  /**
   * Placeholder text displayed when the input field is empty.
   * @prop {string} placeholder - The placeholder text.
   * @readonly
   */
  @Prop() readonly placeholder: string

  /**
   * The current value of the input field.
   * This property is mutable to support two-way binding.
   * @prop {string} value - The input's value.
   */
  @Prop({ mutable: true, reflect: true }) value

  /**
   * When true and the input type is 'search', displays a clear icon to reset the input.
   * @prop {boolean} showClearIcon - True to display the clear icon.
   * @default false
   * @readonly
   */
  @Prop() readonly showClearIcon: boolean = false

  // ---------------------------
  // Component internal states
  // ---------------------------
  /**
   * Indicates whether the input field currently has focus.
   * @state {boolean} isFocused - True if the input is focused.
   */
  @State() isFocused = false

  /**
   * Toggles the visibility of password text.
   * Only applicable when the input type is 'password'.
   * @state {boolean} showPassword - True if the password is visible.
   */
  @State() showPassword = false

  // ---------------------------
  // References and events
  // ---------------------------
  /**
   * A reference to the host element.
   * @element {HTMLGluInputElement} inputElement - The component's host element.
   */
  // eslint-disable-next-line no-undef
  @Element() inputElement!: HTMLGluInputElement

  /**
   * Emitted when the input value changes.
   * @event {string} gloChanged - The updated value of the input.
   */
  @Event() glChange!: EventEmitter<InputChangeEventDetail>

  /**
   * Emitted when the input element gains focus.
   * @event {string} glFocus
   */
  @Event() glFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input value changes.
   * @event {string} gloChanged
   */
  @Event() glBlur!: EventEmitter<FocusEvent>

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner <input>
    this.inheritedAttributes = { ...inheritAttributes(this.inputElement) }
  }

  // ---------------------------
  // Input event handlers
  // ---------------------------

  private handleInput = (event: Event): void => {
    const input = event.target as HTMLInputElement

    this.value = input.value

    this.glChange.emit({ value: input.value, event })
  }

  private handleFocus = (event: FocusEvent): void => {
    this.isFocused = true

    this.glFocus.emit(event)
  }

  private handleBlur = (event): void => {
    this.isFocused = false

    this.glBlur.emit(event)
  }

  private togglePasswordVisibility = (): void => {
    this.showPassword = !this.showPassword
  }

  private clearInput = (): void => {
    this.value = ''
  }

  // ---------------------------
  // Input type and focus helpers
  // ---------------------------

  private getInputType = (): string => {
    // Determine native input type based on the component's type and state.
    switch (this.type) {
      case 'password':
        return this.showPassword ? 'text' : 'password'

      case 'phone':
        return 'tel'

      case 'number':
        return 'number'

      case 'currency':
        return 'text'

      case 'text':
        return 'text'

      default:
        return this.type
    }
  }

  private focusInput = (): void => {
    // Focus the inner native input element
    const input = this.inputElement.shadowRoot?.querySelector('input')

    input?.focus()
  }

  private focusDateInput = (): void => {
    const input = this.inputElement.shadowRoot?.querySelector('input[type="date"]') as HTMLInputElement

    input?.showPicker?.()

    input?.focus?.()
  }

  // ---------------------------
  // Render helpers for prefix/suffix
  // ---------------------------

  private renderPrefix = () => {
    // Render prefix based on input type or custom prefix props
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

  private renderSuffix = () => {
    // Render suffix based on input type or custom suffix props
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

  // ---------------------------
  // Render method
  // ---------------------------

  render() {
    return (
      <Host
        class={{
          'glu-input': true,
          // Apply additional styling if label or helper text is provided
          'glu-input-field': !!this.label || !!this.helperText,
          'is-error': !!this.error || this.isError,
          disabled: this.disabled,
          'read-only': this.readOnly,
          focused: this.isFocused
        }}
      >
        {/* Optional label */}
        {!!this.label && <glu-label>{this.label}</glu-label>}

        <div class="input-wrapper" onClick={this.focusInput}>
          {this.renderPrefix()}
          {/* Inherit additional attributes from host onto the native input */}
          <input
            {...this.inheritedAttributes}
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
        </div>

        {/* Optional helper text */}
        {!!(this.error || this.helperText) && (
          <glu-helper-text
            icon={this.helperIcon ?? undefined}
            iconVariant={this.helperIconVariant}
            is-error={!!this.error}
          >
            {this.error || this.helperText}
          </glu-helper-text>
        )}
      </Host>
    )
  }
}
