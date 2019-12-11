export type FontSize = string | number
export type TypeScaler = (
  fontSize: number | [number, number?],
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
  sizes: [number, number]
  typeface: string
  tracking: number
  letterCase: string
  breakpoints: Record<string, TypeSetting>
}

export interface TypeStyles {
  fontFamily: string[]
  fontStyle: string
  fontWeight: string | number
  fontSize: number | string
  lineHeight: number
  letterSpacing: string
  textTransform: string
  [key: string]: any
}
