/* eslint-disable no-undef */
import { Attributes, inheritAttributes } from '@utils/helpers/helpers'

import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core'

/**
 * @component
 * @tag glu-toggle
 * @shadow true
 */
@Component({
  tag: 'glu-toggle',
  styleUrl: 'toggle.css',
  shadow: true
})
export class GluToggle {
  /**
   * Optional left label text
   * @prop {string} leftLabel
   */
  @Prop() readonly leftLabel: string

  /**
   * Optional right label text
   * @prop {string} rightLabel
   */
  @Prop() readonly rightLabel: string

  /**
   * Error message to display
   * @prop {string} error
   */
  @Prop() readonly error: string

  /**
   * Disables the toggle
   * @prop {boolean} disabled
   * @default false
   */
  @Prop() readonly disabled: boolean = false

  /**
   * Current state of the toggle
   * @prop {boolean} checked
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) checked = false

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

  @Element() toggleElement!: HTMLGluToggleElement

  @State() isFocused = false

  /**
   * Emitted when toggle state changes
   * @event glChange
   */
  @Event() glChange!: EventEmitter<{ checked: boolean, event: Event }>

  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    this.inheritedAttributes = { ...inheritAttributes(this.toggleElement) }
  }

  private handleToggle = (event: Event): void => {
    if (this.disabled) return

    event.stopPropagation()

    this.checked = !this.checked

    this.glChange.emit({ checked: this.checked, event })
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) return

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()

      this.handleToggle(event)
    }
  }

  private handleFocus = (): void => {
    this.isFocused = true
  }

  private handleBlur = (): void => {
    this.isFocused = false
  }

  render() {
    return (
      <Host
        class={{
          'glu-toggle': true,
          'is-error': !!this.error,
          'is-disabled': this.disabled,
          'is-checked': this.checked,
          'is-focused': this.isFocused
        }}
      >
        <div class="toggle-wrapper" onClick={this.handleToggle}>
          {this.leftLabel && <glu-label class="left-label">{this.leftLabel}</glu-label>}

          <div
            class="toggle-track"
            role="switch"
            aria-checked={String(this.checked)}
            tabindex={this.disabled ? -1 : 0}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <div class="toggle-thumb" />
          </div>

          {this.rightLabel && <glu-label class="right-label">{this.rightLabel}</glu-label>}
        </div>

        {!!(this.error || this.helperText) && (
          <glu-helper-text
            icon={this.helperIcon}
            iconVariant={this.helperIconVariant}
            is-error={!!this.error}
          >
            {this.error || this.helperText}
          </glu-helper-text>
        )}

        <div style={{ display: 'none' }}>
          <input
            type="checkbox"
            checked={this.checked}
            disabled={this.disabled}
            {...this.inheritedAttributes}
          />
        </div>
      </Host>
    )
  }
}
