import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core'

/**
 * @component
 * @tag glu-dropdown
 * @shadow true
 *
 * @slot - The default slot for the dropdown content.
 * @slot dropdown-trigger - The default slot for the dropdown trigger.
 */
@Component({
  tag: 'glu-dropdown',
  styleUrl: 'dropdown.css',
  shadow: true
})
export class GluDropdown {
  /**
   * Optional default trigger text. Only shown if no trigger content is provided.
   * @prop {string} text
   */
  @Prop() readonly text: string = 'Dropdown'

  /**
   * Controls whether the dropdown is open.
   * @prop {boolean} isOpen
   */
  @Prop({ mutable: true, reflect: true }) isOpen = false

  /**
   * If true, an arrow will be displayed that points at the trigger.
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
   * @prop {boolean} showBackdrop
   */
  @Prop() readonly showBackdrop: boolean = false

  /**
   * Describes which side of the trigger to position the dropdown.
   * @prop {string} side
   */
  @Prop() readonly side: 'top' | 'bottom' | 'left' | 'right' = 'bottom'

  /**
   * Describes how to calculate the dropdown width.
   * If "cover", the width matches the trigger element.
   * If "auto", the width is based solely on the content.
   * @prop {string} size
   */
  @Prop() readonly size: 'cover' | 'auto' = 'auto'

  /**
   * Defines the type of interaction that triggers the dropdown.
   * 'click' toggles on left-click.
   * 'hover' opens on mouse enter and closes on mouse leave.
   * 'context-menu' toggles on right-click (preventing the default context menu).
   * @prop {string} triggerAction
   */
  @Prop() readonly triggerAction: 'click' | 'hover' | 'context-menu' = 'click'

  // eslint-disable-next-line no-undef
  @Element() el!: HTMLGluDropdownElement

  /**
   * Emitted when the dropdown is toggled.
   * @event dropdownToggle
   */
  @Event() dropdownToggle!: EventEmitter<boolean>

  // Reference to the trigger element provided in the slot.
  private triggerRef?: HTMLElement

  @Watch('isOpen')
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      // Ensure the dropdown content is rendered before positioning.
      requestAnimationFrame(() => this.positionDropdown())
    }
  }

  /**
   * Position the dropdown based on the trigger element.
   */
  private positionDropdown(): void {
    if (!this.isOpen) return

    const content = this.el.shadowRoot?.querySelector('.dropdown-content') as HTMLElement

    if (!content) return

    // In "cover" mode, adjust the dropdown width to match the trigger.
    if (this.triggerRef && this.size === 'cover') {
      content.style.width = `${this.triggerRef.getBoundingClientRect().width}px`
    } else {
      content.style.width = ''
    }
  }

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
   * Handles a context menu trigger by preventing the default and toggling the dropdown.
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
      this.isOpen = false

      this.dropdownToggle.emit(this.isOpen)
    }
  }

  private getTriggerEvents = (triggerAction: string) => {
    switch (triggerAction) {
      case 'click':
        return { onClick: this.toggleDropdown }

      case 'hover':
        return { onMouseEnter: this.openDropdown, onMouseLeave: this.closeDropdown }

      case 'context-menu':
        return { onContextMenu: this.handleContextMenu }

      default:
        return {}
    }
  }

  render() {
    // Render backdrop if dropdown is open and either backdrop is shown or dismissal is enabled.
    const shouldRenderBackdrop = this.isOpen && (this.showBackdrop || this.isBackdropDismiss)

    return (
      <Host class={{ 'is-open': this.isOpen, 'dropdown-container': true, 'glu-dropdown': true }}>
        {shouldRenderBackdrop && (
          <div
            class={{
              'dropdown-backdrop': true,
              'invisible-backdrop': !this.showBackdrop
            }}
            onClick={this.onBackdropClick}
          >
          </div>
        )}
        {/* Dropdown trigger: uses a named slot with a default fallback */}
        <div class="dropdown-trigger" {...this.getTriggerEvents(this.triggerAction)} ref={el => (this.triggerRef = el)}>
          <slot name="dropdown-trigger">
            <glu-button>{this.text}</glu-button>
          </slot>
        </div>
        {/* Dropdown content */}
        <div class={`dropdown-content ${this.isOpen ? 'open' : 'closed'} ${this.side} ${this.size}`}>
          {this.hasArrow && <div class="dropdown-arrow"></div>}
          <slot></slot>
        </div>
      </Host>
    )
  }
}
