/* eslint-disable @stylistic/lines-around-comment */
import { IconVariant } from '../../atoms/icon/icon.types'

import { Component, h, Host, Prop } from '@stencil/core'

/**
 * A helper text component that displays an icon on the left and text on the right.
 *
 * The icon is rendered using the glu-icon component, and the text is passed via the default slot.
 *
 * @component
 * @tag glu-helper-text
 * @shadow true
 */
@Component({
  tag: 'glu-helper-text',
  styleUrl: 'helper-text.css',
  shadow: true
})
export class GluHelperText {
  /**
   * The name of the icon to display.
   * Accepts any available icon in glu-icon.
   * @prop {string} icon
   */
  @Prop({ reflect: true }) readonly icon!: string

  /**
   * If true, displays the icon in its solid variant.
   * @prop {boolean} isSolidIcon
   */
  @Prop({ reflect: true }) readonly isSolidIcon = false

  render() {
    const { icon, isSolidIcon } = this

    return (
      <Host class="glu-helper-text">
        <div class="icon">
          <glu-icon name={icon} variant={isSolidIcon ? IconVariant.Solid : IconVariant.Outline} size={14}></glu-icon>
        </div>
        <div class="text">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
