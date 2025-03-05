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
 * @prop {boolean} isCenter - If true, both align and justify will be set to 'center'. Optional. Default is false.
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

  /**
   * If true, both align and justify are set to center.
   */
  @Prop() readonly isCenter = false

  render() {
    const flexStyle = {
      display: 'flex',
      flexDirection: this.direction,
      alignItems: this.isCenter ? 'center' : this.align,
      justifyContent: this.isCenter ? 'center' : this.justify,
      gap: this.gap
    }

    return (
      <Host style={flexStyle}>
        <slot></slot>
      </Host>
    )
  }
}
