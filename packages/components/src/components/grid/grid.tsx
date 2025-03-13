import { Component, h, Host, Prop } from '@stencil/core'

const DEFAULT_GAP = 0

/**
 * A grid container component built using CSS Grid.
 *
 * @component
 * @tag glu-grid
 * @shadow true
 * @slot - Default slot for grid items.
 *
 * @prop {number} columns - The number of grid columns. Default is 3.
 * @prop {string | number} gap - The gap between grid items.
 *  When a number is provided, it is converted to a CSS variable of the form:
 *  `var(--spacing-{gap}, 1rem)`. For example, a value of 200 translates to `'var(--spacing-200, 1rem)'`.
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
  @Prop({ reflect: true }) readonly columns: number = 3

  /**
   * Gap between grid items.
   */
  @Prop({ reflect: true }) readonly gap: string | number = DEFAULT_GAP

  render() {
    // Compute gridTemplateColumns and gap value using CSS variables.
    const gridTemplateColumns = `repeat(${this.columns}, 1fr)`

    const gapValue =
      typeof this.gap === 'number' && this.gap ?
        `var(--spacing-${this.gap}, 1rem)` :
        this.gap

    // Set CSS variables for grid-template-columns and gap.
    const hostStyle = {
      '--grid-template-columns': gridTemplateColumns,
      '--grid-gap': `${gapValue}`
    }

    return (
      <Host style={hostStyle}>
        <slot></slot>
      </Host>
    )
  }
}
