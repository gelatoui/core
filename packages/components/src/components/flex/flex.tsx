import { Component, h, Host, Prop } from '@stencil/core'

/**
 * @component
 * @tag glu-flex
 * @shadow true
 *
 * @slot - Default slot for flex items.
 *
 * @prop {string} direction - The flex direction (e.g., 'row', 'column'). Default is 'row'.
 * @prop {string} align - Alignment along the cross axis (e.g., 'center', 'flex-start', 'flex-end'). Default is 'center'.
 * @prop {string} justify - Alignment along the main axis (e.g., 'flex-start', 'center', 'space-between'). Default is 'flex-start'.
 * @prop {string} gap - The gap between flex items. Default is 'var(--spacing-200, 1rem)'.
 */
@Component({
  tag: 'glu-flex',
  styleUrl: 'flex.css',
  shadow: true
})
export class GluFlex {
  /**
   * Defines the flex direction.
   */
  @Prop() readonly direction = 'row'

  /**
   * Defines the alignment along the cross axis.
   */
  @Prop() readonly align = 'center'

  /**
   * Defines the alignment along the main axis.
   */
  @Prop() readonly justify = 'flex-start'

  /**
   * Defines the gap between flex items.
   */
  @Prop() readonly gap = 'var(--spacing-200, 1rem)'

  render() {
    const flexStyle = {
      display: 'flex',
      flexDirection: this.direction,
      alignItems: this.align,
      justifyContent: this.justify,
      gap: this.gap
    }

    return (
      <Host style={flexStyle}>
        <slot></slot>
      </Host>
    )
  }
}
