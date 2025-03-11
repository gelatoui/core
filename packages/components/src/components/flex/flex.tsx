import { Attributes, inheritAttributes } from '@utils/helpers/helpers'

import { Component, Element, h, Host, Prop } from '@stencil/core'

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
   * @default 200 (which translates to 'var(--spacing-200, 1rem)')
   * @readonly
   */
  @Prop({ reflect: true }) readonly gap: string | number = 200

  /**
   * Centers the flex items along both axes if set to true.
   *
   * @prop {boolean} isCenter - If true, both `align` and `justify` will be forced to `center`,
   * overriding any individual values provided.
   * @default false
   * @readonly
   */
  @Prop({ reflect: true }) readonly isCenter: boolean = false

  /**
   * A reference to the host element.
   *
   * @element {HTMLGluFlexElement} flexElement - The component's host element.
   */
  // eslint-disable-next-line no-undef
  @Element() flexElement!: HTMLGluFlexElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner element.
    this.inheritedAttributes = { ...inheritAttributes(this.flexElement) }
  }

  /**
   * Render method to generate the component's HTML.
   *
   * @returns {JSX.Element} The rendered HTML of the component.
   */
  render() {
    // Convert a numeric gap value to the corresponding CSS variable.
    const gapValue = typeof this.gap === 'number' ? `var(--spacing-${this.gap}, 1rem)` : this.gap

    const flexStyle = {
      display: 'flex',
      flexDirection: this.direction,
      alignItems: this.isCenter ? 'center' : this.align,
      justifyContent: this.isCenter ? 'center' : this.justify,
      gap: gapValue
    }

    return (
      <Host {...this.inheritedAttributes} style={flexStyle}>
        <slot></slot>
      </Host>
    )
  }
}
