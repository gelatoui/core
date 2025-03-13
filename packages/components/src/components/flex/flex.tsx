import { Component, h, Host, Prop } from '@stencil/core'

const DEFAULT_GAP = 0

/**
 * A flexible container component built using CSS Flexbox.
 *
 * @component
 * @tag glu-flex
 * @shadow true
 * @slot - Default slot for flex items.
 */
@Component({
  tag: 'glu-flex',
  styleUrl: 'flex.css',
  shadow: true
})
export class GluFlex {
  /**
   * Determines the flex direction.
   *
   * @prop {('row' | 'column' | 'row-reverse' | 'column-reverse')} direction - The flex direction.
   * @default 'row'
   * @readonly
   */
  @Prop({ reflect: true }) readonly direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' = 'row'

  /**
   * Specifies the alignment along the cross axis.
   *
   * @prop {('flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch')} align - The alignment along the cross axis.
   * @default 'center'
   * @readonly
   */
  @Prop({ reflect: true }) readonly align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' = 'center'

  /**
   * Specifies the alignment along the main axis.
   *
   * @prop {('flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly')} justify - The alignment along the main axis.
   * @default 'flex-start'
   * @readonly
   */
  @Prop({ reflect: true }) readonly justify: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start'

  /**
   * Sets the gap between flex items.
   *
   * When a number is provided, it is converted to a CSS variable of the form:
   * `var(--spacing-{gap}, 1rem)`. For example, a value of 200 translates to
   * `'var(--spacing-200, 1rem)'`.
   *
   * You may also pass a full CSS gap value (e.g. "1rem", "10px", etc.) directly.
   *
   * @prop {string | number} gap - The gap between flex items.
   * @default 0
   * @readonly
   */
  @Prop({ reflect: true }) readonly gap: string | number = DEFAULT_GAP

  /**
   * Centers the flex items along both axes if set to true.
   *
   * @prop {boolean} isCenter - If true, both `align` and `justify` will be forced to `center`,
   * overriding any individual values provided.
   * @default false
   * @readonly
   */
  @Prop({ reflect: true }) readonly isCenter: boolean = false

  render() {
    // Convert a numeric gap value to the corresponding CSS variable.
    const gapValue = typeof this.gap === 'number' && this.gap ? `var(--spacing-${this.gap}, 0)` : this.gap

    const hostStyle = {
      '--flex-direction': this.direction,
      '--flex-align': this.isCenter ? 'center' : this.align,
      '--flex-justify': this.isCenter ? 'center' : this.justify,
      '--flex-gap': `${gapValue}`
    }

    return (
      <Host style={hostStyle}>
        <slot></slot>
      </Host>
    )
  }
}
