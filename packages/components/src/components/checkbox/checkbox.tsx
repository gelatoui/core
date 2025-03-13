import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core'

/**
 * @component
 * @tag glu-checkbox
 * @shadow true
 */
@Component({
  tag: 'glu-checkbox',
  styleUrl: 'checkbox.css',
  shadow: true
})
export class GluCheckbox {
  /**
   * Optional left label text displayed adjacent to the checkbox.
   * Rendered using the glu-label component.
   * @prop {string} leftLabel
   */
  @Prop() readonly leftLabel: string

  /**
   * Optional right label text displayed adjacent to the checkbox.
   * Rendered using the glu-label component.
   * @prop {string} rightLabel
   */
  @Prop() readonly rightLabel: string

  /**
   * The error message to display.
   * When non-empty, the component enters an error state.
   * @prop {string} error
   */
  @Prop() readonly error: string

  /**
   * Disables the checkbox, preventing user interaction.
   * @prop {boolean} disabled
   * @default false
   */
  @Prop() readonly disabled: boolean = false

  /**
   * The current value (state) of the checkbox.
   * Supported values:
   * - 'unchecked'
   * - 'checked'
   * - 'indeterminate'
   *
   * This property is mutable to support two-way binding.
   * @prop {'unchecked' | 'checked' | 'indeterminate'} value
   * @default 'unchecked'
   */
  @Prop({ mutable: true, reflect: true }) value: 'unchecked' | 'checked' | 'indeterminate' = 'unchecked'

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

  /**
   * Specifies whether the checkbox has an indeterminate state.
   * If false (default), the checkbox toggles only between "unchecked" and "checked".
   * @prop {boolean} hasIndeterminate - Whether the checkbox supports an indeterminate state.
   * @default false
   * @readonly
   */
  @Prop() readonly hasIndeterminate: boolean = false

  /**
   * Indicates whether the checkbox currently has focus.
   * @state {boolean} isFocused
   */
  @State() isFocused = false

  /**
   * Emitted when the checkbox value changes.
   * @event {string} glChange - The updated value of the checkbox.
   */
  @Event() glChange!: EventEmitter<{ value: 'unchecked' | 'checked' | 'indeterminate', event: Event }>

  private handleToggle = (event: Event): void => {
    if (this.disabled) return

    // Prevent event bubbling to avoid duplicate events from nested elements.
    event.stopPropagation()

    this.toggleValue(event)
  }

  private toggleValue(event: Event): void {
    let newValue: 'unchecked' | 'checked' | 'indeterminate'

    if (this.value === 'unchecked') {
      newValue = 'checked'
    } else if (this.value === 'checked') {
      newValue = this.hasIndeterminate ? 'indeterminate' : 'unchecked'
    } else if (this.value === 'indeterminate') {
      newValue = 'unchecked'
    }

    this.value = newValue

    this.glChange.emit({ value: newValue, event })
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) return

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()

      this.toggleValue(event)
    }
  }

  private handleFocus = (): void => {
    this.isFocused = true
  }

  private handleBlur = (): void => {
    this.isFocused = false
  }

  /**
   * Returns the proper aria-checked value:
   * - 'true' for checked
   * - 'false' for unchecked
   * - 'mixed' for indeterminate
   */
  private getAriaChecked(): string {
    if (this.value === 'checked') return 'true'

    if (this.value === 'indeterminate') return 'mixed'

    return 'false'
  }

  render() {
    return (
      <Host
        class={{
          'glu-checkbox': true,
          'is-error': !!this.error,
          'is-disabled': this.disabled,
          'is-checked': this.value === 'checked',
          'is-indeterminate': this.value === 'indeterminate',
          'is-focused': this.isFocused
        }}
      >
        <div class="checkbox-wrapper" onClick={this.handleToggle}>
          {/* Left label */}
          {this.leftLabel && <glu-label class="left-label">{this.leftLabel}</glu-label>}

          {/* Custom checkbox element with ARIA attributes */}
          <div
            class="checkbox-container"
            role="checkbox"
            tabindex={this.disabled ? -1 : 0}
            aria-checked={this.getAriaChecked()}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <div class="checkbox-box">
              {this.value === 'checked' && (
                <glu-icon name="check" size={16} />
              )}
              {this.value === 'indeterminate' && (
                <glu-icon name="minus" size={16} />
              )}
            </div>
          </div>

          {/* Right label */}
          {this.rightLabel && <glu-label class="right-label">{this.rightLabel}</glu-label>}
        </div>

        {/* Optional helper text */}
        {!!(this.error || this.helperText) && (
          <glu-helper-text
            icon={this.helperIcon}
            iconVariant={this.helperIconVariant}
            isError={!!this.error}
          >
            {this.error || this.helperText}
          </glu-helper-text>
        )}

        {/* Hidden input for HTML form compatibility */}
        <input type="hidden" name="checkbox" value={this.value} />
      </Host>
    )
  }
}
