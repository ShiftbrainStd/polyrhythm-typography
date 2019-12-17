import * as CSS from 'csstype'

export type FontSize = string | number
export type TypeScaler = (
  fontSize: number | number[],
  lineHeight?: number
) => [FontSize, number | undefined]
export interface TypeScaleConfig {
  fontSizes: Map<number, FontSize>
  lineHeights: Map<number, number>
}

export type BreakPoint = number | string
export interface Breakpoints {
  [id: string]: BreakPoint
}

export interface PolyTypographyConfig extends TypeScaleConfig {
  breakpoints: Breakpoints
  typeScaler: TypeScaler
  typefaces: Record<string, any>
}

export interface TypeSetting {
  sizes: number[]
  typeface: string
  tracking: number
  letterCase: string
  breakpoints: Record<string, Partial<TypeSetting>>
}

export interface TypeStyles {
  fontFamily: CSS.Properties['fontFamily']
  fontStyle: CSS.Properties['fontStyle']
  fontWeight: CSS.Properties['fontWeight']
  fontSize: CSS.Properties['fontSize']
  lineHeight: CSS.Properties['lineHeight']
  letterSpacing: CSS.Properties['letterSpacing']
  textTransform: CSS.Properties['textTransform']
  [key: string]: any
}
