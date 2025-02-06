export enum ButtonAppearance {
  FILLED = 'filled',
  OUTLINE = 'outline',
  GHOST = 'ghost'
}

export enum ButtonSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small'
}

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive'
}

export enum ButtonAttribute {
  APPEARANCE = 'appearance',
  SIZE = 'size',
  TYPE = 'type',
  DISABLED = 'disabled',
  ID = 'id',
  NAME = 'name',
  VALUE = 'value',
  AUTOFOCUS = 'autofocus',
  FORM = 'form',
  FORMACTION = 'formaction',
  FORMENCTYPE = 'formenctype',
  FORMMETHOD = 'formmethod',
  FORMNOVALIDATE = 'formnovalidate',
  FORMTARGET = 'formtarget'
}

export enum ButtonBooleanAttribute {
  AUTOFOCUS = ButtonAttribute.AUTOFOCUS,
  DISABLED = ButtonAttribute.DISABLED,
  FORMNOVALIDATE = ButtonAttribute.FORMNOVALIDATE
}

export interface ButtonAttributes {
  [ButtonAttribute.APPEARANCE]?: ButtonAppearance
  [ButtonAttribute.SIZE]?: ButtonSize
  [ButtonAttribute.TYPE]?: ButtonType
  [ButtonAttribute.DISABLED]?: boolean
  [ButtonAttribute.ID]?: string
  [ButtonAttribute.NAME]?: string
  [ButtonAttribute.VALUE]?: string
  [ButtonAttribute.AUTOFOCUS]?: boolean
  [ButtonAttribute.FORM]?: string
  [ButtonAttribute.FORMACTION]?: string
  [ButtonAttribute.FORMENCTYPE]?: string
  [ButtonAttribute.FORMMETHOD]?: string
  [ButtonAttribute.FORMNOVALIDATE]?: boolean
  [ButtonAttribute.FORMTARGET]?: string
}
