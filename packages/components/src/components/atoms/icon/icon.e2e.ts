/* eslint-disable no-undef */
import { newE2EPage } from '@stencil/core/testing'

const academicCap = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIiBhcmlhLWhpZGRlbj0idHJ1ZSIgZGF0YS1zbG90PSJpY29uIj4KICA8cGF0aCBkPSJNMTEuNyAyLjgwNWEuNzUuNzUgMCAwIDEgLjYgMEE2MC42NSA2MC42NSAwIDAgMSAyMi44MyA4LjcyYS43NS43NSAwIDAgMS0uMjMxIDEuMzM3IDQ5Ljk0OCA0OS45NDggMCAwIDAtOS45MDIgMy45MTJsLS4wMDMuMDAyYy0uMTE0LjA2LS4yMjcuMTE5LS4zNC4xOGEuNzUuNzUgMCAwIDEtLjcwNyAwQTUwLjg4IDUwLjg4IDAgMCAwIDcuNSAxMi4xNzN2LS4yMjRjMC0uMTMxLjA2Ny0uMjQ4LjE3Mi0uMzExYTU0LjYxNSA1NC42MTUgMCAwIDEgNC42NTMtMi41Mi43NS43NSAwIDAgMC0uNjUtMS4zNTIgNTYuMTIzIDU2LjEyMyAwIDAgMC00Ljc4IDIuNTg5IDEuODU4IDEuODU4IDAgMCAwLS44NTkgMS4yMjggNDkuODAzIDQ5LjgwMyAwIDAgMC00LjYzNC0xLjUyNy43NS43NSAwIDAgMS0uMjMxLTEuMzM3QTYwLjY1MyA2MC42NTMgMCAwIDEgMTEuNyAyLjgwNVoiLz4KICA8cGF0aCBkPSJNMTMuMDYgMTUuNDczYTQ4LjQ1IDQ4LjQ1IDAgMCAxIDcuNjY2LTMuMjgyYy4xMzQgMS40MTQuMjIgMi44NDMuMjU1IDQuMjg0YS43NS43NSAwIDAgMS0uNDYuNzExIDQ3Ljg3IDQ3Ljg3IDAgMCAwLTguMTA1IDQuMzQyLjc1Ljc1IDAgMCAxLS44MzIgMCA0Ny44NyA0Ny44NyAwIDAgMC04LjEwNC00LjM0Mi43NS43NSAwIDAgMS0uNDYxLS43MWMuMDM1LTEuNDQyLjEyMS0yLjg3LjI1NS00LjI4Ni45MjEuMzA0IDEuODMuNjM0IDIuNzI2Ljk5djEuMjdhMS41IDEuNSAwIDAgMC0uMTQgMi41MDhjLS4wOS4zOC0uMjIyLjc1My0uMzk3IDEuMTEuNDUyLjIxMy45MDEuNDM0IDEuMzQ2LjY2YTYuNzI3IDYuNzI3IDAgMCAwIC41NTEtMS42MDcgMS41IDEuNSAwIDAgMCAuMTQtMi42N3YtLjY0NWE0OC41NDkgNDguNTQ5IDAgMCAxIDMuNDQgMS42NjcgMi4yNSAyLjI1IDAgMCAwIDIuMTIgMFoiLz4KICA8cGF0aCBkPSJNNC40NjIgMTkuNDYyYy40Mi0uNDE5Ljc1My0uODkgMS0xLjM5NS40NTMuMjE0LjkwMi40MzUgMS4zNDcuNjYyYTYuNzQyIDYuNzQyIDAgMCAxLTEuMjg2IDEuNzk0Ljc1Ljc1IDAgMCAxLTEuMDYtMS4wNloiLz4KPC9zdmc+Cg=='

describe('glu-icon (E2E)', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  it('renders correctly and hydrates', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-icon name="academic-cap"></glu-icon>')

    const element = await page.find('glu-icon')

    expect(element).toHaveClass('hydrated')
  })

  it('loads correct variant icon', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-icon name="academic-cap" variant="solid"></glu-icon>')

    const img = await page.find('glu-icon >>> img')

    expect(await img.getProperty('src')).toContain(academicCap)
  })

  it('applies size correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-icon name="academic-cap" size="32"></glu-icon>')

    const img = await page.find('glu-icon >>> img')

    expect(await img.getAttribute('width')).toBe('32')

    expect(await img.getAttribute('height')).toBe('32')
  })

  it('prioritizes size over width/height', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-icon name="academic-cap" size="32" width="40" height="20"></glu-icon>')

    const img = await page.find('glu-icon >>> img')

    expect(await img.getAttribute('width')).toBe('32')

    expect(await img.getAttribute('height')).toBe('32')
  })

  it('uses width/height when size not provided', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-icon name="academic-cap" width="40" height="20"></glu-icon>')

    const img = await page.find('glu-icon >>> img')

    expect(await img.getAttribute('width')).toBe('40')

    expect(await img.getAttribute('height')).toBe('20')
  })

  it('doesnt render image for missing icon', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-icon name="invalid-icon"></glu-icon>')

    const img = await page.find('glu-icon >>> img')

    expect(img).toBeNull()
  })

  it('reflects attributes correctly', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-icon name="academic-cap" variant="solid" size="40"></glu-icon>')

    const element = await page.find('glu-icon')

    expect(element).toHaveAttribute('name')

    expect(element).toHaveAttribute('variant')

    expect(element).toHaveAttribute('size')
  })

  it('sets proper alt text', async () => {
    const page = await newE2EPage()

    await page.setContent('<glu-icon name="academic-cap"></glu-icon>')

    const img = await page.find('glu-icon >>> img')

    expect(await img.getAttribute('alt')).toBe('academic-cap')
  })
})
