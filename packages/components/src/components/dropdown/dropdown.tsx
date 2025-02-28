import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core'

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
  @Prop() readonly text: string = 'Toggle Dropdown'

  /**
   * Controls whether the dropdown is open.
   * If true, the dropdown will open. If false, it will close.
   * Use this for finer grained control over presentation.
   * @prop {boolean} isOpen
   */
  @Prop({ mutable: true, reflect: true }) isOpen = false

  /**
   * If true, an arrow will be displayed that points at the reference element.
   * @prop {boolean} hasArrow
   */
  @Prop() readonly hasArrow: boolean = false

  /**
   * If true, the dropdown will be dismissed when the backdrop is clicked.
   * @prop {boolean} isBackdropDismiss
   */
  @Prop() readonly isBackdropDismiss: boolean = false

  /**
   * If true, a backdrop will be displayed behind the dropdown.
   * This backdrop darkens the screen when the dropdown is open.
   * @prop {boolean} showBackdrop
   */
  @Prop() readonly showBackdrop: boolean = false

  /**
   * Describes which side of the reference point to position the dropdown.
   * Can be either 'start' or 'end'.
   * @prop {string} side
   */
  @Prop() readonly side: 'start' | 'end' = 'start'

  /**
   * Describes how to calculate the dropdown width.
   * If "cover", the width matches the trigger element.
   * If "auto", a static default width is used.
   * @prop {string} size
   */
  @Prop() readonly size: 'cover' | 'auto' = 'auto'

  /**
   * Describes what kind of interaction with the trigger should cause the dropdown to open.
   * If "click", the dropdown is toggled on left-click.
   * If "hover", it opens on mouse enter and closes on mouse leave.
   * If "context-menu", it opens on right-click (and prevents the default context menu).
   * @prop {string} triggerAction
   */
  @Prop() readonly triggerAction: 'click' | 'hover' | 'context-menu' = 'click'

  // Reference to the host element.
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

  /**
   * Opens the dropdown (if not already open).
   */
  private openDropdown = (): void => {
    if (!this.isOpen) {
      this.isOpen = true

      this.dropdownToggle.emit(this.isOpen)
    }
  }

  /**
   * Closes the dropdown (if open).
   */
  private closeDropdown = (): void => {
    if (this.isOpen) {
      this.isOpen = false

      this.dropdownToggle.emit(this.isOpen)
    }
  }

  /**
   * Handles a context menu trigger by preventing the default
   * and toggling the dropdown.
   */
  private handleContextMenu = (event: MouseEvent): void => {
    event.preventDefault()

    this.toggleDropdown()
  }

  /**
   * If the backdrop is clicked and backdrop dismiss is enabled, close the dropdown.
   */
  private onBackdropClick = (): void => {
    if (this.isBackdropDismiss) {
      this.closeDropdown()
    }
  }

  componentDidLoad() {
    // If a trigger id is provided, attach the appropriate event listener(s) to all matching elements.
    if (this.trigger) {
      const triggerEls = document.querySelectorAll(`#${this.trigger}`)

      triggerEls.forEach(triggerEl => {
        switch (this.triggerAction) {
          case 'click':
            triggerEl.addEventListener('click', this.toggleDropdown)

            break

          case 'hover':
            triggerEl.addEventListener('mouseenter', this.openDropdown)

            triggerEl.addEventListener('mouseleave', this.closeDropdown)

            break

          case 'context-menu':
            triggerEl.addEventListener('contextmenu', this.handleContextMenu)

            break
        }
      })
    }
  }

  disconnectedCallback() {
    // Clean up the event listeners on disconnect.
    if (this.trigger) {
      const triggerEls = document.querySelectorAll(`#${this.trigger}`)

      triggerEls.forEach(triggerEl => {
        switch (this.triggerAction) {
          case 'click':
            triggerEl.removeEventListener('click', this.toggleDropdown)

            break

          case 'hover':
            triggerEl.removeEventListener('mouseenter', this.openDropdown)

            triggerEl.removeEventListener('mouseleave', this.closeDropdown)

            break

          case 'context-menu':
            triggerEl.removeEventListener('contextmenu', this.handleContextMenu)

            break
        }
      })
    }
  }

  render() {
    return (
      <div class="dropdown-container">
        {/* Render a backdrop if enabled and dropdown is open */}
        {this.showBackdrop && this.isOpen && (
          <div class="dropdown-backdrop" onClick={this.onBackdropClick}></div>
        )}
        {/* If no external trigger is provided, render a default trigger button */}
        {!this.trigger && (
          <glu-button class="dropdown-trigger" onClick={this.toggleDropdown}>
            {this.text}
          </glu-button>
        )}
        <div class={`dropdown-content ${this.isOpen ? 'open' : 'closed'} ${this.side} ${this.size}`}>
          {this.hasArrow && <div class="dropdown-arrow"></div>}
          <slot></slot>
        </div>
      </div>
    )
  }
}
