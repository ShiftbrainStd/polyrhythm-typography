import invariant from 'tiny-invariant'

import { TypeScaleConfig, TypeScaler, FontSize } from '../types'

export const FONT_SIZES = new Map([
  [4, '2rem'],
  [3, '1.6rem'],
  [2, '1.333rem'],
  [1, '1.143rem'],
  [0, '1rem'],
  [-1, '0.889rem'],
  [-2, '0.8rem'],
])

/// Default line heights
/// @type Map
export const LINE_HEIGHTS = new Map([
  [4, 2],
  [3, 1.75],
  [2, 1.5],
  [1, 1.25],
  [0, 1],
])

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createTypeScale(
  { fontSizes = FONT_SIZES, lineHeights = LINE_HEIGHTS } = {} as Partial<
    TypeScaleConfig
  >
) {
  function getSizesLh(scale: number): number {
    invariant(
      lineHeights.has(scale),
      `A valid line height scale "${scale}" is required. Available scales are "${[
        ...lineHeights.keys(),
      ].join(', ')}"`
    )
    return lineHeights.get(scale) as number
  }

  const getSizes: TypeScaler = (fontSize, lineHeight) => {
    let fs: number
    let lh: number | undefined
    if (Array.isArray(fontSize)) {
      ;[fs, lh] = fontSize
    } else {
      fs = fontSize
      lh = lineHeight
    }

    invariant(
      fs !== undefined && fontSizes.has(fs),
      `A valid font-size scale is required. Available values are ${[
        ...fontSizes.keys(),
      ].join(', ')}`
    )

    return [
      fontSizes.get(fs) as FontSize,
      lh !== undefined ? getSizesLh(lh) : lh,
    ]
  }

  return {
    getSizes,
    getSizesLh,
  }
}
