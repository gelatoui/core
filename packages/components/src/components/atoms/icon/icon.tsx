/* eslint-disable @stylistic/lines-around-comment */
import { IconVariant } from './icon.types'
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
   * @default IconVariant.Outline
   * @readonly
   */
  @Prop({ reflect: true }) readonly variant: IconVariant = IconVariant.Outline

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
   * Retrieves the SVG content for the configured icon
   * @private
   * @returns {string} SVG markup or empty string if icon not found
   */
  private getIconSvg(): string {
    const icons = this.variant === IconVariant.Solid ? solidIcons : outlineIcons

    return icons[this.name] || ''
  }

  /**
   * Renders the icon component
   * @returns {JSX.Element} The rendered icon element
   */
  render() {
    const svgContent = this.getIconSvg()
    const { size, width, height, name } = this

    if (!svgContent) {
      console.error(`[GluIcon]: Icon "${name}" not found.`)

      return null
    }

    return (
      <img
        class="glu-icon"
        role="img"
        alt={name}
        width={size || width}
        height={size || height}
        src={svgContent}
      />
    )
  }
}
