export const format = (first?: string, middle?: string, last?: string): string => (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
