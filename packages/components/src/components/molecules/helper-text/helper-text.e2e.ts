/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

describe('glu-helper-text (E2E)', () => {
  it('renders correctly and hydrates', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-helper-text icon="info">Helper text</glu-helper-text>')

    const element = await page.find('glu-helper-text')

    expect(element).toHaveClass('hydrated')
  })

  it('renders the correct icon', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-helper-text icon="info"></glu-helper-text>')

    const icon = await page.find('glu-helper-text >>> glu-icon')

    expect(icon).not.toBeNull()

    expect(icon).toHaveAttribute('name')
  })

  it('applies solid variant when isSolidIcon is true', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-helper-text icon="info" isSolidIcon></glu-helper-text>')

    const icon = await page.find('glu-helper-text >>> glu-icon')

    expect(icon).toHaveAttribute('variant')
  })

  it('applies outline variant when isSolidIcon is false', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-helper-text icon="info"></glu-helper-text>')

    const icon = await page.find('glu-helper-text >>> glu-icon')

    expect(icon).toHaveAttribute('variant')
  })

  it('renders slot content correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-helper-text icon="info">This is helper text</glu-helper-text>')

    const text = await page.find('glu-helper-text')

    expect(text).not.toBeNull()

    expect(text.innerText).toBe('This is helper text')
  })
})
