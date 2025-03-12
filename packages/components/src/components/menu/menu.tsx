import { Component, Element, forceUpdate, Fragment, h, Host, Listen, Prop, State, Watch } from '@stencil/core'

/**
 * @component
 * @tag glu-menu
 * @shadow true
 *
 * @slot logo - Slot for custom logo content (used when `logo` prop is not set).
 * @slot menu-items - Slot for the menu items to be displayed.
 * @slot right-actions - Slot for additional actions or buttons aligned to the right.
 */
@Component({
  tag: 'glu-menu',
  styleUrl: 'menu.css',
  shadow: true
})
export class GluMenu {
  /**
   * Defines the menu layout type.
   * - `logo-left`: Logo on the left, menu items in the center, right actions on the right.
   * - `logo-center`: Menu items on the left, logo in the center, right actions on the right.
   * - `menu-center`: Logo on the left, menu items in the center, right actions on the right.
   */
  @Prop({ reflect: true }) readonly type: 'logo-left' | 'logo-center' | 'menu-center' = 'logo-left'

  /**
   * URL for the logo image. If set, it takes precedence over the `logo` slot.
   */
  @Prop() readonly logo?: string

  /**
   * If `true`, the menu will be fixed at the top of the viewport.
   */
  @Prop() readonly isSticky: boolean = false

  /**
   * If `true`, the menu adapts for smaller screens by enabling mobile-friendly behavior.
   */
  @Prop() readonly isResponsive: boolean = false

  /**
   * Reference to the host element.
   */
  // eslint-disable-next-line no-undef
  @Element() hostElement!: HTMLGluMenuElement

  /**
   * Tracks whether the menu is currently in mobile view.
   */
  @State() isMobileView = false

  /**
   * Tracks whether the mobile menu is open.
   */
  @State() isMobileMenuOpen = false

  @Listen('resize', { target: 'window' })
  onResize() {
    forceUpdate(this)
  }

  componentWillLoad() {
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
   * Checks whether the viewport width falls within the mobile threshold.
   * @local This function sets `isMobileView` to true if the window width is less than 768px and if the menu is responsive.
   */
  private checkViewportSize() {
    const width = window.innerWidth

    this.isMobileView = this.isResponsive && width < 768
  }

  /**
   * Toggles the mobile menu open/close state.
   */
  private toggleMobileMenu = () => {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  /**
   * Renders the logo either from the `logo` prop or the `logo` slot.
   */
  private renderLogo() {
    return this.logo ?
      (
        <img src={this.logo} alt="Logo" class="glu-menu__logo-img" />
      ) :
      (
        <slot name="logo"></slot>
      )
  }

  /**
   * Renders the mobile menu toggle button.
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
   * Renders the `logo-left` layout.
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
   * Renders the `logo-center` layout.
   */
  private renderLogoCenter() {
    return (
      <div class="glu-menu__container glu-menu__container--logo-center">
        <div class="glu-menu__items-wrapper left"><slot name="menu-items"></slot></div>
        <div class="glu-menu__logo-wrapper">{this.renderLogo()}</div>
        <div class="glu-menu__actions-wrapper right"><slot name="right-actions"></slot></div>
      </div>
    )
  }

  /**
   * Renders the `menu-center` layout.
   */
  private renderMenuCenter() {
    return (
      <div class="glu-menu__container glu-menu__container--menu-center">
        <div class="glu-menu__logo-wrapper left">{this.renderLogo()}</div>
        <div class="glu-menu__items-wrapper"><slot name="menu-items"></slot></div>
        <div class="glu-menu__actions-wrapper right"><slot name="right-actions"></slot></div>
      </div>
    )
  }

  /**
   * Renders the mobile menu panel.
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
    this.checkViewportSize()

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
