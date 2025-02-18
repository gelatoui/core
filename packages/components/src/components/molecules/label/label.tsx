import { Component, h, Host, Prop } from '@stencil/core'

/**
 * A label component with an optional tooltip icon and character counter.
 *
 * The label text is provided via the default slot.
 *
 * @component
 * @tag glu-label
 * @shadow true
 * @slot - The label text.
 * @slot tooltip - The tooltip text.
 * @slot right-text - The right text.
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
   * If true, displays a right text like character counter ("0 / 100")
   * at the opposite end (right side) of the label.
   * @prop {boolean} showRightText
   */
  @Prop({ reflect: true }) readonly showRightText = false

  /**
   * If true, displays the icon in its solid variant.
   * @prop {boolean} isSolidIcon
   */
  @Prop({ reflect: true }) readonly isSolidIcon = false

  render() {
    const { showTooltip, showRightText, isSolidIcon } = this

    return (
      <Host class="glu-label">
        <div class="container">
          <label class="label-text">
            <slot></slot>
          </label>
          {showTooltip && (
            <span class="tooltip-icon">
              <glu-icon class="tooltip-icon" name="information-circle" variant={isSolidIcon ? 'solid' : 'outline'} size={16}></glu-icon>
              <span class="tooltip-component">
                <slot name="tooltip"></slot>
              </span>
            </span>
          )}
        </div>
        {showRightText && (
          <span class="label-right-text">
            <slot name="right-text"></slot>
          </span>
        )}
      </Host>
    )
  }
}
