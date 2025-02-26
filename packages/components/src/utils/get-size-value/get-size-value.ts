import { isValidNumber } from '@utils/is-valid-number/is-valid-number'

/**
 * Converts width and height values to pixel-based strings if they are valid numbers.
 * If the values are already strings, they are returned as-is.
 *
 * @param {Object} dimensions - An object containing width and height values.
 * @param {string | number} dimensions.width - The width value.
 * @param {string | number} dimensions.height - The height value.
 * @returns {Object} An object with width and height as strings.
 */
export const getSizesValue = (
  { width, height }: { width: string | number, height: string | number }
): { width: string, height: string } => ({
  width: isValidNumber(width) ? `${Number(width)}px` : `${width}`,
  height: isValidNumber(height) ? `${Number(height)}px` : `${height}`
})
