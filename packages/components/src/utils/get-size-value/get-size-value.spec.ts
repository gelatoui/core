/* eslint-disable no-undef */
import { getSizesValue } from '@utils/get-size-value/get-size-value'

describe('getSizesValue', () => {
  // Test valid number inputs
  it('converts valid numbers to pixel strings', () => {
    const result = getSizesValue({ width: 100, height: 200 })

    expect(result).toEqual({ width: '100px', height: '200px' })
  })

  // Test valid number strings
  it('converts valid number strings to pixel strings', () => {
    const result = getSizesValue({ width: '150', height: '300' })

    expect(result).toEqual({ width: '150px', height: '300px' })
  })

  // Test non-numeric strings
  it('returns non-numeric strings as-is', () => {
    const result = getSizesValue({ width: 'auto', height: '100%' })

    expect(result).toEqual({ width: 'auto', height: '100%' })
  })

  // Test mixed inputs
  it('handles mixed numeric and non-numeric inputs', () => {
    const result = getSizesValue({ width: 250, height: '50%' })

    expect(result).toEqual({ width: '250px', height: '50%' })
  })

  // Test invalid number inputs
  it('handles invalid number inputs', () => {
    const result = getSizesValue({ width: NaN, height: Infinity })

    expect(result).toEqual({ width: 'NaN', height: 'Infinity' })
  })

  // Test edge cases
  it('handles edge cases', () => {
    expect(getSizesValue({ width: '', height: '   ' })).toEqual({ width: '', height: '   ' })

    expect(getSizesValue({ width: '100px', height: '200px' })).toEqual({ width: '100px', height: '200px' })

    expect(getSizesValue({ width: '1e3', height: '1.5e2' })).toEqual({ width: '1000px', height: '150px' })
  })

  // Test scientific notation
  it('handles scientific notation', () => {
    const result = getSizesValue({ width: '1.5e3', height: '2e2' })

    expect(result).toEqual({ width: '1500px', height: '200px' })
  })

  // Test zero values
  it('handles zero values', () => {
    const result = getSizesValue({ width: 0, height: '0' })

    expect(result).toEqual({ width: '0px', height: '0px' })
  })

  // Test negative values
  it('handles negative values', () => {
    const result = getSizesValue({ width: -100, height: '-200' })

    expect(result).toEqual({ width: '-100px', height: '-200px' })
  })
})
