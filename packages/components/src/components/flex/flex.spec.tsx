/* eslint-disable no-undef */
import { GluFlex } from './flex'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-flex', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [GluFlex],
      html: '<glu-flex>Flex Item</glu-flex>'
    })

    const host = page.root
    const style = host.getAttribute('style') || ''

    // Check default inline styles
    expect(style).toContain('--flex-direction: row')

    expect(style).toContain('--flex-align: center')

    expect(style).toContain('--flex-justify: flex-start')

    expect(style).toContain('--flex-gap: 0')

    // Verify that the default slot content is rendered.
    expect(host.innerHTML).toContain('Flex Item')
  })

  it('renders with numeric gap and converts to CSS variable', async () => {
    // When gap is a non-zero number, it should convert to the CSS variable format.
    const page = await newSpecPage({
      components: [GluFlex],
      html: '<glu-flex gap="200">Content</glu-flex>'
    })

    const host = page.root
    const style = host.getAttribute('style') || ''

    expect(style).toContain('--flex-direction: row; --flex-align: center; --flex-justify: flex-start; --flex-gap: 200;')
  })

  it('renders with string gap directly', async () => {
    const page = await newSpecPage({
      components: [GluFlex],
      html: '<glu-flex gap="1rem">Content</glu-flex>'
    })

    const host = page.root
    const style = host.getAttribute('style') || ''

    expect(style).toContain('--flex-gap: 1rem')
  })

  it('forces center alignment when isCenter is true', async () => {
    const page = await newSpecPage({
      components: [GluFlex],
      html: '<glu-flex is-center>Centered Content</glu-flex>'
    })

    const host = page.root
    const style = host.getAttribute('style') || ''

    // Both align and justify should be forced to center.
    expect(style).toContain('--flex-align: center')

    expect(style).toContain('--flex-justify: center')
  })

  it('forwards inherited attributes', async () => {
    const page = await newSpecPage({
      components: [GluFlex],
      html: '<glu-flex title="test-attr">Content</glu-flex>'
    })

    const host = page.root

    // The title attribute should be forwarded to the Host element.
    expect(host.getAttribute('title')).toBe('test-attr')
  })
})
