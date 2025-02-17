/* eslint-disable @stylistic/lines-around-comment */
import { IconVariant } from '../../atoms/icon/icon.types'

import { Component, h, Host, Prop } from '@stencil/core'

/**
 * A label component with an optional tooltip icon and character counter.
 *
 * The label text is provided via the default slot.
 *
 * @component
 * @tag glu-label
 * @shadow true
 */
@Component({
  tag: 'glu-label',
  styleUrl: 'label.css',
  shadow: true
})
export class GluLabel {
  /**
   * If true, displays a tooltip icon (using the glu-icon component)
   * right next to the label text.
   * @prop {boolean} showTooltip
   */
  @Prop({ reflect: true }) readonly showTooltip = false

  /**
   * If true, displays a character counter ("0 / 100")
   * at the opposite end (right side) of the label.
   * @prop {boolean} showCharacterCount
   */
  @Prop({ reflect: true }) readonly showCharacterCount = false

  /**
   * If true, displays the icon in its solid variant.
   * @prop {boolean} isSolidIcon
   */
  @Prop({ reflect: true }) readonly isSolidIcon = false

  render() {
    const { showTooltip, showCharacterCount, isSolidIcon } = this

    return (
      <Host>
        <div class="glu-label">
          <span class="label-text">
            <slot></slot>
          </span>
          {showTooltip && (
            <span class="tooltip-icon">
              <glu-icon class="tooltip-icon" name="information-circle" variant={isSolidIcon ? IconVariant.Solid : IconVariant.Outline} size={16}></glu-icon>
              <span class="tooltip-component">
                <slot name="tooltip"></slot>
              </span>
            </span>
          )}
        </div>
        {showCharacterCount && (
          <span class="label-counter">0 / 100</span>
        )}
      </Host>
    )
  }
}
