import { Component, h, Host } from '@stencil/core'

/**
 * @component
 * @tag glu-breadcrumbs
 * @shadow true
 */
@Component({
  tag: 'glu-breadcrumbs',
  styleUrl: 'breadcrumbs.css',
  shadow: true
})
export class GluBreadcrumbs {
  render() {
    return (
      <Host class="glu-breadcrumbs">
        <nav aria-label="Breadcrumb">
          <ul class="breadcrumb-list">
            <slot></slot>
          </ul>
        </nav>
      </Host>
    )
  }
}
