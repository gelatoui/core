// TODO: this component is not ready yet, its just a initial version
import { Component, Element, h, Host, Prop, State } from '@stencil/core'

/**
 * @component
 * @tag glu-menu-item
 * @shadow true
 *
 * @slot - The text of the menu item.
 * @slot right-text - The right text.
 * @slot dropdown-trigger - The trigger slot for dropdown type.
 * @slot dropdown-content - The dropdown content.
 */
@Component({
  tag: 'glu-menu-item',
  styleUrl: 'menu-item.css',
  shadow: true
})
export class GluMenuItem {
  /**
   * Defines the type of menu item.
   * @prop {string} type - The type of the menu item ('label', 'dropdown', 'button').
   */
  @Prop({ reflect: true }) readonly type: 'label' | 'dropdown' | 'button' = 'label'

  /**
   * A reference to the host element.
   */
  // eslint-disable-next-line no-undef
  @Element() menuItemElement!: HTMLGluMenuItemElement

  /**
   * State to track dropdown open/close.
   */
  @State() isOpen = false

  private toggleDropdown = () => {
    this.isOpen = !this.isOpen
  }

  render() {
    return (
      <Host class={`glu-menu-item ${this.type}`}>
        {this.type === 'label' && (
          <glu-label class="label-container" onClick={this.toggleDropdown}>
            <slot></slot>
          </glu-label>
        )}

        {this.type === 'dropdown' && (
          <glu-dropdown isOpen={this.isOpen}>
            <div slot="dropdown-trigger" onClick={this.toggleDropdown} aria-expanded={this.isOpen}>
              <glu-label class="label-container">
                <slot></slot>
                <glu-icon name={this.isOpen ? 'chevron-up' : 'chevron-down'} size={16}></glu-icon>
              </glu-label>
            </div>
            <slot name="dropdown-content"></slot>
          </glu-dropdown>
        )}

        {this.type === 'button' && (
          <glu-button>
            <slot></slot>
          </glu-button>
        )}
      </Host>
    )
  }
}
