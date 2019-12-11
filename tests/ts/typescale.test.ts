import { createTypeScale, LINE_HEIGHTS, FONT_SIZES } from '../../src/typescale'

const ts = createTypeScale()

describe('Typescale', () => {
  describe('getSizesLh()', () => {
    test('throws for un-registered scales', () => {
      expect(() => {
        ts.getSizesLh(200)
      }).toThrow()
    })

    test('returns a line-height', () => {
      expect(ts.getSizesLh(1)).toBe(LINE_HEIGHTS.get(1))
    })
  })

  describe('getSizes', () => {
    test('return a size and line height', () => {
      const expected = [FONT_SIZES.get(0), LINE_HEIGHTS.get(1)]
      expect(ts.getSizes(0, 1)).toEqual(expected)
    })

    test('line height is optional', () => {
      const expected = [FONT_SIZES.get(1), undefined]
      expect(ts.getSizes(1)).toEqual(expected)
    })

    test('accepts an array as first argument', () => {
      const expected = [FONT_SIZES.get(1), LINE_HEIGHTS.get(1)]
      expect(ts.getSizes([1, 1])).toEqual(expected)
    })
  })

  test('accepts custom configs', () => {
    const fontSizes = new Map([[0, 200]])
    const lineHeights = new Map([[1, 100]])

    const myTs = createTypeScale({ fontSizes, lineHeights })
    const expected = [200, 100]
    expect(myTs.getSizes(0, 1)).toEqual(expected)
  })
})
