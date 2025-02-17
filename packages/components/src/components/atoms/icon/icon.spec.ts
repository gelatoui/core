/* eslint-disable no-undef */
import academicCapOutline from 'heroicons/24/outline/academic-cap.svg'
import academicCapSolid from 'heroicons/24/solid/academic-cap.svg'

import { GluIcon } from './icon'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-icon', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap"></glu-icon>'
    })

    expect(page.root).toEqualHtml(/* html */ `
      <glu-icon name="academic-cap" variant="outline">
        <mock:shadow-root>
          <img
            alt="academic-cap"
            class="glu-icon"
            height="24"
            src="${academicCapOutline}"
            width="24"
            role="img"
          />
        </mock:shadow-root>
      </glu-icon>
    `)
  })

  it('uses size prop correctly', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" size="32"></glu-icon>'
    })

    const img = page.root.shadowRoot.querySelector('img')

    expect(img.width).toBe(32)

    expect(img.height).toBe(32)
  })

  it('prioritizes size over width/height', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" size="32" width="40" height="20"></glu-icon>'
    })

    const img = page.root.shadowRoot.querySelector('img')

    expect(img.width).toBe(32)

    expect(img.height).toBe(32)
  })

  it('shows error for missing icon', async () => {
    const consoleError = jest.spyOn(console, 'error')

    await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="missing-icon"></glu-icon>'
    })

    expect(consoleError).toHaveBeenCalledWith(
      '[GluIcon]: Icon "missing-icon" not found.'
    )
  })

  it('reflects properties correctly', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" variant="solid" size="40" width="50" height="60"></glu-icon>'
    })

    expect(page.root).toHaveAttribute('name')

    expect(page.root).toHaveAttribute('variant')

    expect(page.root).toHaveAttribute('size')

    expect(page.root).toHaveAttribute('width')

    expect(page.root).toHaveAttribute('height')
  })

  it('renders nothing when icon is missing', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="missing-icon"></glu-icon>'
    })

    expect(page.root.shadowRoot.querySelector('img')).toBeNull()
  })

  it('renders solid variant icons', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" variant="solid"></glu-icon>'
    })

    expect(page.root).toEqualHtml(/* html */ `
    <glu-icon name="academic-cap" variant="solid">
      <mock:shadow-root>
        <img
          alt="academic-cap"
          class="glu-icon"
          height="24"
          src="${academicCapSolid}"
          width="24"
          role="img"
        />
      </mock:shadow-root>
    </glu-icon>
  `)
  })

  it('uses width without size', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" width="40"></glu-icon>'
    })

    const img = page.root.shadowRoot.querySelector('img')

    expect(img.width).toBe(40)

    expect(img.height).toBe(24) // Default height
  })

  it('uses height without size', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" height="30"></glu-icon>'
    })

    const img = page.root.shadowRoot.querySelector('img')

    expect(img.width).toBe(24) // Default width

    expect(img.height).toBe(30)
  })
})
