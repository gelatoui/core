import { Component, h, Prop } from '@stencil/core'

/**
 * A flexible text component that applies design-system-based typography styles.
 *
 * @component
 * @tag glu-text
 * @shadow true
 * @slot - Default slot for text content
 */
@Component({
  tag: 'glu-text',
  styleUrl: 'text.css',
  shadow: true
})
export class GluText {
  /**
   * The HTML element (semantic tag) to render.
   * This allows the text to be rendered as an `<h1>`, `<p>`, `<span>`, etc.
   *
   * @default 'p'
   * @example 'h1'
   * @example 'span'
   */
  @Prop() readonly element:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span' = 'p'

  /**
   * The category of typography, mapping to the Figma design tokens:
   * - `body` for general paragraph text
   * - `display` for large display headings
   * - `heading` for standard headings
   *
   * @default 'body'
   * @example 'heading'
   * @example 'display'
   */
  @Prop({ reflect: true }) readonly type: 'body' | 'display' | 'heading' = 'body'

  /**
   * The size variant for the selected typography category.
   * Typically, each category has multiple size variants in your design system.
   *
   * @default 'medium'
   * @example 'small'
   * @example 'large'
   */
  @Prop({ reflect: true }) readonly size: 'xsmall' | 'small' | 'medium' | 'large' = 'medium'

  /**
   * The font weight to apply.
   * Matches design tokens for `regular` (400), `medium` (600), or `bold` (700).
   *
   * @default 'regular'
   * @example 'medium'
   * @example 'bold'
   */
  @Prop({ reflect: true }) readonly weight: 'regular' | 'medium' | 'bold' = 'regular'

  /**
   * The text alignment property.
   * Controls how inline text is aligned within the container.
   *
   * @default 'left'
   * @example 'center'
   * @example 'justify'
   */
  @Prop({ reflect: true }) readonly align: 'left' | 'center' | 'right' | 'justify' = 'left'

  /**
   * Constructs a set of inline CSS variables based on the selected
   * `type`, `size`, and `weight` properties. These map to the Figma
   * design tokens defined in your global CSS.
   *
   * @private
   * @returns An object of inline style properties (CSS variables).
   */
  private getTypographyVars() {
    const prefix = `${this.type}-${this.size}-${this.weight}`

    return {
      '--font-family': `var(--${prefix}-font-family)`,
      '--font-size': `var(--${prefix}-font-size)`,
      '--font-weight': `var(--${prefix}-font-weight)`,
      '--line-height': `var(--${prefix}-line-height)`
    }
  }

  /**
   * Renders the text with the appropriate typography styles.
   * @returns The configured text element.
   */
  render() {
    const TagType = this.element
    const styles = this.getTypographyVars()

    return (
      <TagType
        style={styles}
        class={{
          'glu-text': true,
          [`glu-text--align-${this.align}`]: true
        }}
      >
        <slot />
      </TagType>
    )
  }
}
