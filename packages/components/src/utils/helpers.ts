export type Attributes = Record<string, unknown>

/**
 * Inherits specified global attributes from the host element to be applied
 * to inner elements. For example, the inner input of a web component may need
 * to inherit attributes such as `title` that were set on the host element.
 *
 * This helper function should be invoked in the `componentWillLoad` lifecycle method
 * and its result stored in a variable for later use during rendering.
 *
 * Note: This function does not need to be reactive, as changes to host element attributes
 * do not trigger a re-render.
 *
 * @param hostElement - The host HTMLElement from which to inherit attributes.
 * @param attributeNames - An array of attribute names to be inherited.
 * @returns An object mapping attribute names to their corresponding values.
 */
export const inheritAttributes = (
  hostElement: HTMLElement,
  attributeNames: string[] = []
): Attributes => {
  const inheritedAttributes: Attributes = {}

  attributeNames.forEach(attributeName => {
    if (hostElement.hasAttribute(attributeName)) {
      const attributeValue = hostElement.getAttribute(attributeName)

      if (attributeValue !== null) {
        inheritedAttributes[attributeName] = attributeValue
      }

      hostElement.removeAttribute(attributeName)
    }
  })

  return inheritedAttributes
}
