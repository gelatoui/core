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
   * @prop {string} gap - The gap between flex items. Accepts any valid CSS gap value.
   * @default 'var(--spacing-200, 1rem)'
   * @readonly
   */
  @Prop({ reflect: true }) readonly gap: string = 'var(--spacing-200, 1rem)'

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
   * Specifies the HTML tag to render the container element.
   *
   * @prop {string} element - The HTML tag used to render the container (e.g., `div`, `section`, `article`).
   * @default 'glu-flex'
   * @readonly
   */
  @Prop({ reflect: true }) readonly element: string

  /**
   * A reference to the host element.
   * @element {HTMLGluButtonElement} buttonElement - The component's host element.
   */

  // eslint-disable-next-line no-undef
  @Element() flexElement!: HTMLGluFlexElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner <input>
    this.inheritedAttributes = { ...inheritAttributes(this.flexElement) }
  }

  /**
   * Render method to generate the component's HTML.
   *
   * @returns {JSX.Element} The rendered HTML of the component.
   */
  render() {
    const flexStyle = {
      display: 'flex',
      flexDirection: this.direction,
      alignItems: this.isCenter ? 'center' : this.align,
      justifyContent: this.isCenter ? 'center' : this.justify,
      gap: this.gap
    }

    // Use the provided element (or default to 'div') as the container tag.
    const TagType = this.element || Host

    return (
      <TagType {...this.inheritedAttributes} style={flexStyle}>
        <slot></slot>
      </TagType>
    )
  }
}
