import invariant from 'tiny-invariant'
import { createMQ } from './mq'
import { createTypeScale } from './typescale'
import { textTransform, stringifyArray } from './utilities'
import { PolyTypographyConfig, TypeSetting, TypeStyles } from '../types'

export const TYPEFACES = {
  sans: {
    family: ['Helvetica Neue', 'Arial', 'sans-serif'],
    style: 'normal',
    weight: 400,
  },
  'sans-bold': {
    family: ['Helvetica Neue', 'Arial', 'sans-serif'],
    style: 'normal',
    weight: 700,
  },
  serif: {
    family: ['Georgia', 'serif'],
    style: 'normal',
    weight: 400,
  },
  'serif-italic': {
    family: ['Georgia', 'serif'],
    style: 'italic',
    weight: 400,
  },
  mono: {
    family: ['Menlo', 'monospace'],
    style: 'normal',
    weight: 400,
  },
  system: {
    family: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ],
    style: 'normal',
    weight: 400,
  },
}

export function createTypography(
  {
    breakpoints,
    typefaces = TYPEFACES,
    typeScaler,
    ...tsConfig
  } = {} as Partial<PolyTypographyConfig>
) {
  const mq = createMQ(breakpoints)
  const typeScale = createTypeScale(tsConfig)
  const scaler = typeScaler || typeScale.getSizes

  return function textstyle(settings: Partial<TypeSetting>) {
    const { typeface, sizes, tracking, letterCase, breakpoints } = settings
    const styles: Partial<TypeStyles> = {}

    if (typeface) {
      invariant(typefaces[typeface], `Typeface "${typeface}" not defined.`)

      const { family, style, weight } = typefaces[typeface]

      Object.assign(styles, {
        fontFamily: family && stringifyArray(family),
        fontStyle: style,
        fontWeight: weight,
      })
    }

    if (Array.isArray(sizes)) {
      invariant(
        sizes.length === 2,
        `The "sizes" property must contain two elements.`
      )
      const [fontSize, lineHeight] = scaler(sizes)
      Object.assign(styles, {
        fontSize: fontSize,
        lineHeight: lineHeight,
      })
    }

    if (tracking) {
      styles.letterSpacing = `${0.001 * tracking}em`
    }

    if (letterCase) {
      Object.assign(styles, textTransform(letterCase))
    }

    if (breakpoints) {
      const keys = Object.keys(breakpoints)
      for (let i = 0; i < keys.length; i += 1) {
        styles[mq.from(keys[i])] = textstyle(breakpoints[keys[i]])
      }
    }
    return styles
  }
}
