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
   * URL to navigate to when clicking the menu item (used for 'label' and 'button' types).
   */
  @Prop() readonly href?: string

  /**
   * Specifies where to open the linked document. Only applicable if `href` is set.
   */
  @Prop() readonly target?: '_self' | '_blank' | '_parent' | '_top'

  /**
   * Specifies the relationship between the current document and the linked document. Only applicable if `href` is set.
   */
  @Prop() readonly rel?: string

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
      <Host class={`glu-menu-item glu-menu-item--${this.type}`} part="menu-item">
        {this.type === 'label' && (
          <glu-label class="label-container" onClick={this.toggleDropdown}>
            {this.href ?
              (
                <a href={this.href} target={this.target} rel={this.rel} class="label-container">
                  <slot></slot>
                </a>
              ) :
              (
                <slot></slot>
              )}
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
          <glu-button href={this.href} target={this.target} rel={this.rel}>
            <slot></slot>
          </glu-button>
        )}
      </Host>
    )
  }
}
