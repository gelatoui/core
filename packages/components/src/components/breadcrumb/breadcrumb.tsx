import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core'

/**
 * @component
 * @tag glu-breadcrumb
 * @shadow true
 */
@Component({
  tag: 'glu-breadcrumb',
  styleUrl: 'breadcrumb.css',
  shadow: true
})
export class GluBreadcrumb {
  /**
   * Optional URL for the breadcrumb. If provided, the breadcrumb becomes a clickable link.
   * @prop {string} href
   */
  @Prop() readonly href?: string

  /**
   * Emitted when the breadcrumb is clicked.
   * @event {CustomEvent<void>} gluBreadcrumbClick
   */
  @Event() gluBreadcrumbClick: EventEmitter<Event>

  private handleClick = (event: Event) => {
    this.gluBreadcrumbClick.emit(event)
  }

  render() {
    const clickable = !!this.href

    const content = (
      <glu-label class={clickable ? 'clickable' : 'disabled'}>
        <slot></slot>
      </glu-label>
    )

    return (
      <Host>
        {clickable ?
          (
            <a href={this.href} onClick={this.handleClick}>
              {content}
            </a>
          ) :
          (
            content
          )}
        <span class="separator">
          <slot name="separator">
            <glu-icon name="arrow-right"></glu-icon>
          </slot>
        </span>
      </Host>
    )
  }
}
