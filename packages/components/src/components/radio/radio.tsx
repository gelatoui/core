/* eslint-disable no-undef */
import { Attributes, inheritAttributes } from '@utils/helpers'

import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core'

/**
 * A radio button component that supports left and right labels, error messaging,
 * and integrates with radio groups for single selection behavior.
 *
 * @component
 * @tag glu-radio
 * @shadow true
 */
@Component({
  tag: 'glu-radio',
  styleUrl: 'radio.css',
  shadow: true
})
export class GluRadio {
  // ---------------------------
  // Label properties
  // ---------------------------
  /**
   * Optional left label text displayed adjacent to the radio.
   * @prop {string} leftLabel
   */
  @Prop() readonly leftLabel: string

  /**
   * Optional right label text displayed adjacent to the radio.
   * @prop {string} rightLabel
   */
  @Prop() readonly rightLabel: string

  // ---------------------------
  // State and validation properties
  // ---------------------------
  /**
   * The error message to display.
   * @prop {string} error
   */
  @Prop() readonly error: string

  /**
   * Disables the radio button
   * @prop {boolean} disabled
   * @default false
   */
  @Prop() readonly disabled: boolean = false

  /**
   * Whether the radio is currently selected
   * @prop {boolean} checked
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) checked = false

  /**
   * Name attribute for radio group association
   * @prop {string} name
   */
  @Prop() readonly name: string

  /**
   * Supplemental helper text
   * @prop {string} helperText
   */
  @Prop() readonly helperText: string

  /**
   * Helper icon name
   * @prop {string} helperIcon
   */
  @Prop() readonly helperIcon: string

  /**
   * Helper icon variant
   * @prop {'solid' | 'outline'} helperIconVariant
   * @default 'outline'
   */
  @Prop() readonly helperIconVariant: 'solid' | 'outline' = 'outline'

  @Element() radioElement!: HTMLGluRadioElement

  // ---------------------------
  // Component state
  // ---------------------------
  @State() isFocused = false

  // ---------------------------
  // Events
  // ---------------------------
  /**
   * Emitted when the radio is selected
   * @event glChange
   */
  @Event() glChange!: EventEmitter<{ value: boolean, event: Event }>

  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    this.inheritedAttributes = { ...inheritAttributes(this.radioElement) }
  }

  // ---------------------------
  // Event handlers
  // ---------------------------
  private handleSelect = (event: Event): void => {
    if (this.disabled) return

    event.stopPropagation()

    this.checked = !this.checked

    this.glChange.emit({ value: !this.checked, event })
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) return

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()

      this.handleSelect(event)
    }
  }

  private handleFocus = (): void => {
    this.isFocused = true
  }

  private handleBlur = (): void => {
    this.isFocused = false
  }

  // ---------------------------
  // Render method
  // ---------------------------
  render() {
    return (
      <Host
        class={{
          'glu-radio': true,
          'is-error': !!this.error,
          'is-disabled': this.disabled,
          'is-checked': this.checked,
          'is-focused': this.isFocused
        }}
      >
        <div class="radio-wrapper" onClick={this.handleSelect}>
          {this.leftLabel && <glu-label class="left-label">{this.leftLabel}</glu-label>}

          <div
            class="radio-container"
            role="radio"
            aria-checked={String(this.checked)}
            tabindex={this.disabled ? -1 : 0}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <div class="radio-dot" />
          </div>

          {this.rightLabel && <glu-label class="right-label">{this.rightLabel}</glu-label>}
        </div>

        {!!(this.error || this.helperText) && (
          <glu-helper-text
            icon={this.helperIcon ?? undefined}
            iconVariant={this.helperIconVariant}
            is-error={!!this.error}
          >
            {this.error || this.helperText}
          </glu-helper-text>
        )}

        <div style={{ display: 'none' }}>
          <input
            type="radio"
            name={this.name}
            checked={this.checked}
            disabled={this.disabled}
            {...this.inheritedAttributes}
          />
        </div>
      </Host>
    )
  }
}
