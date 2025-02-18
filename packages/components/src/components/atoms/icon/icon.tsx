import { outlineIcons } from './icon-outline'
import { solidIcons } from './icon-solid'

import { Component, h, Prop } from '@stencil/core'

/**
 * A customizable icon component that renders Heroicons
 *
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
   * @prop {IconVariant} variant - The styling variant to use
   * @default "outline"
   * @readonly
   */
  @Prop({ reflect: true }) readonly variant: 'solid' | 'outline' = 'outline'

  /**
   * Uniform size of the icon in pixels (takes precedence over width and height)
   * @prop {number} size - When set, overrides both width and height
   * @readonly
   */
  @Prop() readonly size?: number

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

    if (!svgContent) {
      console.error(`[GluIcon]: Icon "${this.name}" not found.`)

      return null
    }

    // If the content is a data URI, decode it to get the inline SVG
    const svgMarkup = svgContent.startsWith('data:image') ?
      atob(svgContent.split(',')[1]) :
      svgContent

    // Compute final dimensions
    const finalWidth = this.size || this.width
    const finalHeight = this.size || this.height

    const finalWidthStr =
    typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth

    const finalHeightStr =
    typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight

    const style = {
      width: finalWidthStr,
      height: finalHeightStr,
      color: this.color || 'inherit' // Ensure the SVG uses `currentColor`
    }

    return (
      <span
        class="glu-icon"
        style={style}
        role="img"
        aria-label={this.name}
        innerHTML={svgMarkup}
      />
    )
  }
}
