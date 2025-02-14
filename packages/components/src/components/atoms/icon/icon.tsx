/* eslint-disable @stylistic/lines-around-comment */
import { IconVariant } from './icon.types'
import { outlineIcons } from './icon-outline'
import { solidIcons } from './icon-solid'

import { Component, h, Prop } from '@stencil/core'

@Component({
  tag: 'glu-icon',
  styleUrl: 'icon.css',
  shadow: true
})
export class GluIcon {
  /** Name of the icon */
  @Prop() readonly name: string

  /** Variant of the icon: 'outline' or 'solid' */
  @Prop() readonly variant: IconVariant = IconVariant.Outline

  /** Size of the icon in pixels (sets both width and height) */
  @Prop() readonly size: number

  /** Custom width of the icon in pixels (overrides size) */
  @Prop() readonly width: number = 24

  /** Custom height of the icon in pixels (overrides size) */
  @Prop() readonly height: number = 24

  private getIconSvg(): string {
    const icons = this.variant === IconVariant.Solid ? solidIcons : outlineIcons

    return icons[this.name] || ''
  }

  render() {
    const svgContent = this.getIconSvg()
    const { size, width, height, name } = this

    if (!svgContent) {
      console.warn(`GluIcon: Icon "${name}" not found.`)

      return null
    }

    return (
      <img
        class={{ 'glu-icon': true }}
        alt={name}
        width={size || width}
        height={size || height}
        src={svgContent}
        part="icon"
      />
    )
  }
}
