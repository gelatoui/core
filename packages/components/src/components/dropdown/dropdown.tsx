import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core'

/**
 * @component
 * @tag glu-dropdown
 * @shadow true
 */
@Component({
  tag: 'glu-dropdown',
  styleUrl: 'dropdown.css',
  shadow: true
})
export class GluDropdown {
  /**
   * The id of the element(s) that will trigger this dropdown.
   * If provided, any element with this id will open/close the dropdown.
   * @prop {string} trigger
   */
  @Prop() readonly trigger?: string

  /**
   * Optional default trigger text. Only shown if no external trigger is provided.
   * @prop {string} text
   */
  @Prop() readonly text = 'Toggle Dropdown'

  /**
   * Internal state to track whether the dropdown is open.
   * @state {boolean} isOpen
   */
  @State() isOpen = false

  // eslint-disable-next-line no-undef
  @Element() el!: HTMLGluDropdownElement

  /**
   * Emitted when the dropdown is toggled.
   * @event dropdownToggle
   */
  @Event() dropdownToggle!: EventEmitter<boolean>

  /**
   * Toggles the dropdown open/closed.
   */
  private toggleDropdown = (): void => {
    this.isOpen = !this.isOpen

    this.dropdownToggle.emit(this.isOpen)
  }

  componentDidLoad() {
    // If a trigger id is provided, attach the click event listener to all matching elements.
    if (this.trigger) {
      const triggerEls = document.querySelectorAll(`#${this.trigger}`)

      triggerEls.forEach(triggerEl => {
        triggerEl.addEventListener('click', this.toggleDropdown)
      })
    }
  }

  disconnectedCallback() {
    // Clean up the event listeners on disconnect.
    if (this.trigger) {
      const triggerEls = document.querySelectorAll(`#${this.trigger}`)

      triggerEls.forEach(triggerEl => {
        triggerEl.removeEventListener('click', this.toggleDropdown)
      })
    }
  }

  render() {
    return (
      <div class="dropdown-container">
        {/* If no external trigger is provided, render a default trigger button */}
        {!this.trigger && (
          <glu-button class="dropdown-trigger" onClick={this.toggleDropdown}>
            {this.text}
          </glu-button>
        )}
        {this.isOpen && (
          <div class="dropdown-content">
            <slot></slot>
          </div>
        )}
      </div>
    )
  }
}
