import { getSizesValue } from '@utils/get-size-value/get-size-value'
import { Attributes, inheritAttributes } from '@utils/helpers/helpers'

import { outlineIcons } from './icon-outline'
import { solidIcons } from './icon-solid'

import { Component, Element, h, Host, Prop } from '@stencil/core'

/**
 * @component
 * @tag glu-icon
 * @shadow true
 */
@Component({
  tag: 'glu-icon',
  styleUrl: 'icon.css',
  shadow: true
})
export class GluIcon {
  /**
   * The name of the icon to display
   * @prop {string} name - The kebab-case name of the icon
   * @required
   * @readonly
   * @example "arrow-up"
   * @example "chevron-right"
   */
  @Prop({ reflect: true }) readonly name!: string

  /**
   * The visual variant style of the icon
   * @prop {('solid' | 'outline')} variant - The styling variant to use
   * @default "outline"
   * @readonly
   */
  @Prop({ reflect: true }) readonly variant: 'solid' | 'outline' = 'outline'

  /**
   * Uniform size of the icon in pixels (takes precedence over width and height)
   * @prop {number | string} size - When set, overrides both width and height
   * @readonly
   */
  @Prop() readonly size?: number | string

  /**
   * Custom width of the icon in pixels
   * @prop {number | string} width - Specific width in pixels
   * @default 24
   * @readonly
   */
  @Prop() readonly width: number | string = 24

  /**
   * Custom height of the icon in pixels
   * @prop {number | string} height - Specific height in pixels
   * @default 24
   * @readonly
   */
  @Prop() readonly height: number | string = 24

  /**
   * Custom color for the SVG icon.
   * Para que este cambio tenga efecto, asegúrate de que el SVG use `currentColor` en sus atributos.
   * @prop {string} color - Color en cualquier formato CSS (hex, rgb, etc.)
   */
  @Prop() readonly color?: string

  /**
   * A reference to the host element.
   * @element {HTMLGluIconElement} linkElement - The component's host element.
   */
  // eslint-disable-next-line no-undef
  @Element() iconElement!: HTMLGluIconElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner element
    this.inheritedAttributes = { ...inheritAttributes(this.iconElement) }
  }

  /**
   * Retrieves the SVG content for the configured icon
   * @private
   * @returns {string} SVG markup or empty string if icon not found
   */
  private getIconSvg(): string {
    const icons = this.variant === 'solid' ? solidIcons : outlineIcons

    return icons[this.name] || ''
  }

  /**
   * Renders the icon component inline, allowing CSS color changes
   * @returns {JSX.Element} The rendered icon element
   */
  render() {
    const svgContent = this.getIconSvg()
    const { width, height } = getSizesValue({ width: this.size || this.width, height: this.size || this.height })

    if (!this.name) return null

    if (!svgContent) {
      console.error(`[GluIcon]: Icon "${this.name}" not found.`)

      return null
    }

    // If the content is a data URI, decode it to get the inline SVG
    const svgMarkup = svgContent?.startsWith?.('data:image') ?
      atob(svgContent.split(',')[1]) :
      svgContent

    const style = { width, height, color: this.color || 'inherit' }

    return (
      <Host class="glu-icon">
        <span
          {...this.inheritedAttributes}
          style={style}
          role="img"
          aria-label={this.name}
          innerHTML={svgMarkup}
        />
      </Host>
    )
  }
}
