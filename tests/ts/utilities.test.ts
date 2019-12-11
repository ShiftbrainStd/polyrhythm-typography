import { textTransform, stringifyArray } from '../../src/utilities'

describe('Utilities', () => {
  describe('textTransform', () => {
    test.each([
      ['all-caps', 'uppercase'],
      ['all-lowercase', 'lowercase'],
    ])(`textTransform(%s)`, (a, b) => {
      expect(textTransform(a).textTransform).toBe(b)
    })

    test('small-caps', () => {
      const expected = {
        textTransform: 'uppercase',
        '@supports (font-variant-caps: "small-caps")': {
          fontVariantCaps: 'small-caps',
          textTransform: 'none',
        },
      }
      expect(textTransform('small-caps')).toEqual(expected)
    })

    test('all-small-caps', () => {
      const expected = {
        textTransform: 'uppercase',
        '@supports (font-variant-caps: "small-caps")': {
          fontVariantCaps: 'small-caps',
          textTransform: 'lowercase',
        },
      }
      expect(textTransform('all-small-caps')).toEqual(expected)
    })

    test('all-small-caps', () => {
      const expected = {
        textTransform: 'uppercase',
        '@supports (font-variant-caps: "small-caps")': {
          fontVariantCaps: 'small-caps',
          textTransform: 'lowercase',
        },
      }
      expect(textTransform('all-small-caps')).toEqual(expected)
    })
  })

  describe('stringifyArray', () => {
    test('stringifies an array of strings', () => {
      const arr = ['hello', 'with space']
      expect(stringifyArray(arr)).toBe('hello, "with space"')
    })
  })
})
