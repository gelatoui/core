import { Component, h, Host, Prop } from '@stencil/core'

/**
 * @component
 * @tag glu-grid
 * @shadow true
 *
 * @slot - Default slot for grid items.
 *
 * @prop {number} columns - The number of grid columns. Default is 3.
 * @prop {string} gap - The gap between grid items (CSS value). Default is 'var(--spacing-200, 1rem)'.
 */
@Component({
  tag: 'glu-grid',
  styleUrl: 'grid.css',
  shadow: true
})
export class GluGrid {
  /**
   * Number of columns in the grid.
   */
  @Prop() readonly columns = 3

  /**
   * Gap between grid items.
   */
  @Prop() readonly gap = 'var(--spacing-200, 1rem)'

  render() {
    const gridStyle = {
      gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
      gap: this.gap
    }

    return (
      <Host style={gridStyle}>
        <slot></slot>
      </Host>
    )
  }
}
