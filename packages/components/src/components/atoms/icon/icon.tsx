/* eslint-disable @stylistic/lines-around-comment */
import { IconVariant } from './icon.types'
import { outlineIcons } from './icon-outline'
import { solidIcons } from './icon-solid'

import { Component, h, Prop } from '@stencil/core'

@Component({
  tag: 'glu-icon',
  // styleUrl: 'glu-icon.css',
  shadow: true
})
export class GluIcon {
  /** Name of the icon */
  @Prop() readonly name: string

  /** Variant of the icon: 'outline' or 'solid' */
  @Prop() readonly variant: IconVariant = IconVariant.Outline

  private getIconSvg(): string {
    const icons = this.variant === IconVariant.Solid ? solidIcons : outlineIcons

    return icons[this.name] || ''
  }

  render() {
    const svgContent = this.getIconSvg()

    if (!svgContent) {
      console.warn(`Icon: Icon "${this.name}" not found.`)

      return null
    }

    return <img src={svgContent} alt={this.name} />
  }
}
