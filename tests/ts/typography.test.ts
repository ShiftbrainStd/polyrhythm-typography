import { createTypography } from '../../src/typography'

const breakpoints = {
  sm: '36em',
}

const typefaces = {
  sans: {
    family: ['My Font'],
    style: 'normal',
    weight: 400,
  },
}

const fontSizes = new Map([
  [2, '6rem'],
  [1, '2rem'],
])

const lineHeights = new Map([[1, 4]])

const textstyle = createTypography({
  breakpoints,
  fontSizes,
  lineHeights,
  typefaces,
})

describe('Typography', () => {
  test('should output font rules', () => {
    const settings = {
      typeface: 'sans',
      sizes: [1, 1],
      letterCase: 'all-lowercase',
      breakpoints: {
        sm: {
          sizes: [2, 1],
        },
      },
    }

    const expected = {
      fontFamily: '"My Font"',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '2rem',
      lineHeight: 4,
      textTransform: 'lowercase',

      '@media (min-width: 36em)': {
        fontSize: '6rem',
        lineHeight: 4,
      },
    }

    expect(textstyle(settings)).toEqual(expected)
  })
})
