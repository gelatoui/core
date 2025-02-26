/**
 * Checks if a value is a valid number.
 * - For numbers: Returns `true` if the value is finite.
 * - For strings: Returns `true` if the trimmed string can be converted to a finite number.
 * - For other types: Returns `false`.
 *
 * @param {string | number} value - The value to check.
 * @returns {boolean} `true` if the value is a valid number, otherwise `false`.
 */
export const isValidNumber = (value: string | number): boolean => {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim()

    return trimmedValue !== '' && !isNaN(Number(trimmedValue))
  }

  return false
}
