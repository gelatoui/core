import { Component, h, Host, State } from '@stencil/core'

/**
 * @component
 * @tag glu-menu-dropdown
 * @shadow true
 *
 * @slot - The text content for the dropdown trigger.
 * @slot dropdown-content - The content to display inside the dropdown.
 */
@Component({
  tag: 'glu-menu-dropdown',
  styleUrl: 'menu-dropdown.css',
  shadow: true
})
export class GluMenuDropdown {
  /**
   * Tracks whether the dropdown is open.
   */
  @State() isOpen = false

  private toggleDropdown = () => {
    this.isOpen = !this.isOpen
  }

  render() {
    return (
      <Host class="glu-menu-dropdown" part="menu-dropdown">
        <glu-dropdown isOpen={this.isOpen} trigger-action="hover" is-backdrop-dismiss>
          <div
            slot="dropdown-trigger"
            onClick={this.toggleDropdown}
            aria-expanded={this.isOpen.toString()}
            class="dropdown-trigger"
          >
            <div class="label-container">
              <slot></slot>
              <glu-icon name={this.isOpen ? 'chevron-up' : 'chevron-down'} size={16}></glu-icon>
            </div>
          </div>
          <slot name="dropdown-content"></slot>
        </glu-dropdown>
      </Host>
    )
  }
}
