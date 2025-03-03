import { Component, Element, Fragment, h, Host, Prop, State, Watch } from '@stencil/core'

/**
 * @component
 * @tag glu-menu
 * @shadow true
 *
 * Responsive menu component with multiple layout options.
 *
 * @slot logo - The logo content (when not using the logo prop)
 * @slot menu-items - The menu items to be displayed
 * @slot right-actions - The right actions (optional)
 */
@Component({
  tag: 'glu-menu',
  styleUrl: 'menu.css',
  shadow: true
})
export class GluMenu {
  /**
   * Defines the menu layout type
   * - logo-left: Logo on left, menu items in center, right actions on right
   * - logo-center: Menu items on left, logo in center, right actions on right
   * - menu-center: Logo on left, menu items in center, right actions on right
   */
  @Prop({ reflect: true }) readonly type: 'logo-left' | 'logo-center' | 'menu-center' = 'logo-left'

  /**
   * URL for the logo image (alternative to using the logo slot)
   */
  @Prop() readonly logo: string

  /**
   * Whether to make the menu isSticky at the top of the viewport
   */
  @Prop() readonly isSticky = false

  /**
   * Whether to collapse the menu on small screens
   */
  @Prop() readonly isResponsive = false

  /**
   * Reference to host element
   */
  // eslint-disable-next-line no-undef
  @Element() hostElement: HTMLGluMenuElement

  /**
   * Track if logo slot has content
   */
  @State() hasLogoSlot = false

  /**
   * Track if menu is in mobile mode
   */
  @State() isMobileView = false

  /**
   * Track if mobile menu is open
   */
  @State() isMobileMenuOpen = false

  /**
   * Observe screen size changes
   */
  private resizeObserver: ResizeObserver

  connectedCallback() {
    if (this.isResponsive) {
      this.resizeObserver = new ResizeObserver(() => this.checkViewportSize())

      this.resizeObserver.observe(document.body)
    }
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  componentWillLoad() {
    this.hasLogoSlot = !!this.hostElement.querySelector('[slot="logo"]')

    this.checkViewportSize()
  }

  @Watch('isResponsive')
  responsiveChanged() {
    if (this.isResponsive) {
      this.checkViewportSize()
    } else {
      this.isMobileView = false
    }
  }

  /**
   * Check if viewport is mobile size
   */
  private checkViewportSize() {
    this.isMobileView = this.isResponsive && window.innerWidth < 768
  }

  /**
   * Toggle mobile menu state
   */
  private toggleMobileMenu = () => {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  /**
   * Render the logo based on prop or slot
   */
  private renderLogo() {
    if (this.logo) {
      return <img src={this.logo} alt="Logo" class="glu-menu__logo-img" />
    }

    return (
      <div part="logo-wrapper">
        <slot name="logo"></slot>
      </div>
    )
  }

  /**
   * Render mobile menu toggle button
   */
  private renderMobileToggle() {
    return (
      <button
        class="glu-menu__mobile-toggle"
        onClick={this.toggleMobileMenu}
        aria-expanded={this.isMobileMenuOpen ? 'true' : 'false'}
        aria-label="Toggle menu"
      >
        <span class="glu-menu__mobile-toggle-icon"></span>
      </button>
    )
  }

  /**
   * Render logo-left layout
   */
  private renderLogoLeft() {
    return (
      <div class="glu-menu__container glu-menu__container--logo-left">
        <div class="glu-menu__logo-wrapper">{this.renderLogo()}</div>
        <div class="glu-menu__items-wrapper"><slot name="menu-items"></slot></div>
        <div class="glu-menu__actions-wrapper"><slot name="right-actions"></slot></div>
      </div>
    )
  }

  /**
   * Render logo-center layout
   */
  private renderLogoCenter() {
    return (
      <div class="glu-menu__container glu-menu__container--logo-center">
        <div class="glu-menu__items-wrapper"><slot name="menu-items"></slot></div>
        <div class="glu-menu__logo-wrapper">{this.renderLogo()}</div>
        <div class="glu-menu__actions-wrapper"><slot name="right-actions"></slot></div>
      </div>
    )
  }

  /**
   * Render menu-center layout
   */
  private renderMenuCenter() {
    return (
      <div class="glu-menu__container glu-menu__container--menu-center">
        <div class="glu-menu__logo-wrapper">{this.renderLogo()}</div>
        <div class="glu-menu__items-wrapper"><slot name="menu-items"></slot></div>
        <div class="glu-menu__actions-wrapper"><slot name="right-actions"></slot></div>
      </div>
    )
  }

  /**
   * Render mobile menu
   */
  private renderMobileMenu() {
    return (
      <div
        class={{
          'glu-menu__mobile-menu': true,
          'glu-menu__mobile-menu--open': this.isMobileMenuOpen
        }}
      >
        <div class="glu-menu__mobile-items">
          <slot name="menu-items"></slot>
        </div>
        <div class="glu-menu__mobile-actions">
          <slot name="right-actions"></slot>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Host
        class={{
          'glu-menu': true,
          [`glu-menu--${this.type}`]: true,
          'glu-menu--sticky': this.isSticky,
          'glu-menu--mobile': this.isMobileView,
          'glu-menu--mobile-open': this.isMobileView && this.isMobileMenuOpen
        }}
      >
        <nav class="glu-menu__nav" role="navigation">
          {this.isMobileView ?
            (
              <div class="glu-menu__mobile-header">
                <div class="glu-menu__logo-wrapper">{this.renderLogo()}</div>
                {this.renderMobileToggle()}
              </div>
            ) :
            (
              <Fragment>
                {this.type === 'logo-left' && this.renderLogoLeft()}
                {this.type === 'logo-center' && this.renderLogoCenter()}
                {this.type === 'menu-center' && this.renderMenuCenter()}
              </Fragment>
            )}

          {this.isMobileView && this.renderMobileMenu()}
        </nav>
      </Host>
    )
  }
}
