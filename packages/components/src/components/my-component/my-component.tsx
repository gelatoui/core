/* eslint-disable @stylistic/lines-around-comment */
import { format } from '../../utils/utils'

import { Component, h, Prop } from '@stencil/core'

h('')

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string

  /**
   * The middle name
   */
  @Prop() middle: string

  /**
   * The last name
   */
  @Prop() last: string

  private getText(): string {
    return format(this.first, this.middle, this.last)
  }

  render() {
    return (
      <div>
        {`Hello, World! I'm ${this.getText() || ''}`}
      </div>
    )
  }
}
