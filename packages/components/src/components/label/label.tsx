import { Attributes, inheritAttributes } from '../../utils/helpers/helpers'

import { Component, Element, h, Host, Prop } from '@stencil/core'

/**
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
  @Prop({ reflect: true }) readonly showTooltip: boolean = false

  /**
   * If true, displays a right text like character counter ("0 / 100")
   * at the opposite end (right side) of the label.
   * @prop {boolean} showRightText
   */
  @Prop({ reflect: true }) readonly showRightText: boolean = false

  /**
   * If true, displays the icon in its solid variant.
   * @prop {string} iconVariation
   */
  @Prop({ reflect: true }) readonly iconVariation: 'solid' | 'outline' = 'outline'

  /**
   * If true, displays the icon in its solid variant.
   * @prop {string} tooltipIcon
   */
  @Prop({ reflect: true }) readonly tooltipIcon: string = 'question-mark-circle'

  /**
   * A reference to the host element.
   * @element {HTMLGluLabelElement} labelElement - The component's host element.
   */
  // eslint-disable-next-line no-undef
  @Element() labelElement!: HTMLGluLabelElement

  /** Container for attributes inherited from the host element */
  private inheritedAttributes: Attributes = {}

  componentWillLoad() {
    // Inherit attributes from the host element to forward to the inner element
    this.inheritedAttributes = { ...inheritAttributes(this.labelElement, ['id', 'name', 'for', 'title', 'data-form-type']) }
  }

  render() {
    return (
      <Host class="glu-label">
        <div class="container">
          <label class="label-text" {...this.inheritedAttributes}>
            <slot></slot>
          </label>
          {this.showTooltip && (
            <span class="tooltip-icon">
              <glu-icon class="tooltip-icon" name={this.tooltipIcon} variant={this.iconVariation} size={16}></glu-icon>
              <span class="tooltip-component">
                <slot name="tooltip"></slot>
              </span>
            </span>
          )}
        </div>
        {this.showRightText && (
          <span class="label-right-text">
            <slot name="right-text"></slot>
          </span>
        )}
      </Host>
    )
  }
}
