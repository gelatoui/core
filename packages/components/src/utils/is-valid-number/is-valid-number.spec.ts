/* eslint-disable no-undef */
import { isValidNumber } from '@utils/is-valid-number/is-valid-number'

describe('isValidNumber', () => {
  // Test valid numbers
  it('returns true for finite numbers', () => {
    expect(isValidNumber(42)).toBe(true)

    expect(isValidNumber(0)).toBe(true)

    expect(isValidNumber(-3.14)).toBe(true)
  })

  // Test valid number strings
  it('returns true for valid number strings', () => {
    expect(isValidNumber('42')).toBe(true)

    expect(isValidNumber('0')).toBe(true)

    expect(isValidNumber('-3.14')).toBe(true)

    expect(isValidNumber(' 42 ')).toBe(true) // Whitespace trimmed
  })

  // Test invalid numbers
  it('returns false for non-finite numbers', () => {
    expect(isValidNumber(NaN)).toBe(false)

    expect(isValidNumber(Infinity)).toBe(false)

    expect(isValidNumber(-Infinity)).toBe(false)
  })

  // Test invalid strings
  it('returns false for invalid number strings', () => {
    expect(isValidNumber('')).toBe(false) // Empty string

    expect(isValidNumber('   ')).toBe(false) // Whitespace-only string

    expect(isValidNumber('abc')).toBe(false) // Non-numeric string

    expect(isValidNumber('42abc')).toBe(false) // Partially numeric string
  })

  // Test edge cases
  it('returns false for non-string and non-number inputs', () => {
    expect(isValidNumber(null)).toBe(false)

    expect(isValidNumber(undefined)).toBe(false)

    expect(isValidNumber('{}')).toBe(false)

    expect(isValidNumber('[]')).toBe(false)

    expect(isValidNumber('true')).toBe(false)
  })

  // Test large numbers
  it('handles large numbers correctly', () => {
    expect(isValidNumber(1e23)).toBe(true)

    expect(isValidNumber('1e23')).toBe(true)
  })

  // Test scientific notation
  it('handles scientific notation', () => {
    expect(isValidNumber('1.23e4')).toBe(true)

    expect(isValidNumber('-1.23e-4')).toBe(true)
  })
})
