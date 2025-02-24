/* eslint-disable no-undef */
import { inheritAttributes } from './helpers' // Adjust the import path accordingly

describe('inheritAttributes', () => {
  let hostElement: HTMLElement

  beforeEach(() => {
    // Create a host element for testing
    hostElement = document.createElement('div')
  })

  it('inherits specified attributes from the host element', () => {
    // Set attributes on the host element
    hostElement.setAttribute('title', 'Host Title')

    hostElement.setAttribute('data-custom', 'Custom Data')

    // Call the inheritAttributes function
    const inherited = inheritAttributes(hostElement, ['title', 'data-custom'])

    // Assertions
    expect(inherited).toEqual({
      title: 'Host Title',
      'data-custom': 'Custom Data'
    })
  })

  it('removes inherited attributes from the host element', () => {
    hostElement.setAttribute('title', 'Host Title')

    // Call the inheritAttributes function
    inheritAttributes(hostElement, ['title'])

    // Assertions
    expect(hostElement.hasAttribute('title')).toBe(false)
  })

  it('returns an empty object when no attributes are inherited', () => {
    // Call the inheritAttributes function with no attributes
    const inherited = inheritAttributes(hostElement, ['non-existent-attribute'])

    // Assertions
    expect(inherited).toEqual({})
  })

  it('handles multiple attributes correctly', () => {
    hostElement.setAttribute('title', 'Host Title')

    hostElement.setAttribute('data-first', 'First Data')

    hostElement.setAttribute('data-second', 'Second Data')

    // Call the inheritAttributes function
    const inherited = inheritAttributes(hostElement, ['title', 'data-first', 'data-second'])

    // Assertions
    expect(inherited).toEqual({
      title: 'Host Title',
      'data-first': 'First Data',
      'data-second': 'Second Data'
    })

    // Check that the attributes were removed
    expect(hostElement.hasAttribute('title')).toBe(false)

    expect(hostElement.hasAttribute('data-first')).toBe(false)

    expect(hostElement.hasAttribute('data-second')).toBe(false)
  })
})
