import { css } from 'emotion'
import { textstyle } from '../src'

const body = {
  typeface: 'serif',
  sizes: [0, 3],
  breakpoints: {
    md: {
      // change the font size at md
      sizes: [2, 3],
    },
  },
}

// /* prettier-ignore */
const heading1 = {
  typeface: 'sans-bold',
  sizes: [4, 1],
  case: 'all-small-caps',
  tracking: 50,
}

document.body.className = css`
  ${textstyle(body)}
`

const h1 = document.querySelector('h1')
console.log(h1)
if (h1) {
  h1.className = css`
    ${textstyle(heading1)}
  `
}
