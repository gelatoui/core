import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core'

/**
 * A composite checkbox component that supports left and right labels, error messaging,
 * and advanced checkbox states such as checked, unchecked, and indeterminate.
 *
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
  // ---------------------------
  // Label properties
  // ---------------------------
  /**
   * Optional left label text displayed adjacent to the checkbox.
   * Rendered using the `glu-label` component.
   * @prop {string} leftLabel
   */
  @Prop() readonly leftLabel: string

  /**
   * Optional right label text displayed adjacent to the checkbox.
   * Rendered using the `glu-label` component.
   * @prop {string} rightLabel
   */
  @Prop() readonly rightLabel: string

  // ---------------------------
  // State and validation properties
  // ---------------------------
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

  // ---------------------------
  // Component internal state
  // ---------------------------
  /**
   * Indicates whether the checkbox currently has focus.
   * @state {boolean} isFocused
   */
  @State() isFocused = false

  // ---------------------------
  // Events
  // ---------------------------
  /**
   * Emitted when the checkbox value changes.
   * @event {string} glChange - The updated value of the checkbox.
   */
  @Event() glChange!: EventEmitter<{ value: 'unchecked' | 'checked' | 'indeterminate', event: Event }>

  // ---------------------------
  // Event handlers
  // ---------------------------
  private handleToggle = (event: Event): void => {
    if (this.disabled) return

    // Prevent event bubbling to avoid duplicate events from nested elements.
    event.stopPropagation()

    this.toggleValue()
  }

  private toggleValue(): void {
    let newValue: 'unchecked' | 'checked' | 'indeterminate'

    switch (this.value) {
      case 'unchecked':
        newValue = 'checked'

        break

      case 'checked':
        newValue = 'indeterminate'

        break

      case 'indeterminate':
        newValue = 'unchecked'

        break
    }

    this.value = newValue

    this.glChange.emit({ value: newValue, event })
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) return

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()

      this.toggleValue()
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

  // ---------------------------
  // Render method
  // ---------------------------
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
                // Display a check icon for the checked state.
                <glu-icon name="check" size={16} />
              )}
              {this.value === 'indeterminate' && (
                // Display a minus icon for the indeterminate state.
                <glu-icon name="minus" size={16} />
              )}
            </div>
          </div>

          {/* Right label */}
          {this.rightLabel && <glu-label class="right-label">{this.rightLabel}</glu-label>}
        </div>

        {/* Error message */}
        {this.error && <glu-helper-text is-error>{this.error}</glu-helper-text>}
      </Host>
    )
  }
}
