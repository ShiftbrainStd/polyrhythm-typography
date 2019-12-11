# JavaScript API Usage

<!-- TOC -->

- [Default configuration](#default-configuration)
  - [typesetting parameters](#typesetting-parameters)
- [Custom configuration](#custom-configuration)
  - [Minimal configuration](#minimal-configuration)
  - [Setup size scales](#setup-size-scales)
  - [Use a custom type scaler calculator](#use-a-custom-type-scaler-calculator)
- [Breakpoint modifiers](#breakpoint-modifiers)

<!-- /TOC -->

## Default configuration

`polyrhythm-typography` comes with some opinionated default values and can be be used as-is for prototyping.

Just import the `textstyle` function and use it:

```js
import { textstyle } from 'polyrhythm-typography'

const styles = textstyles({
  typeface: 'sans',
  sizes: [0, 2],
})

console.log(styles)
/*
Logs:
{
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  fontSize: '1rem',
  lineHeight: 1.5,
}
*/
```

The output of the `textstyle` function can be passed to the `styles` property of any DOM element or interpolated into a CSS-in-JS library such as [styled-components](https://www.styled-components.com/).

```js
import styled from 'styled-components'
import { textstyle } from 'polyrhythm-typography'

const styles = textstyles({
  typeface: 'sans',
  sizes: [3, 2],
})

const Title = styled.h1`
  ${styles}
  color: #333
`
```

### typesetting parameters

`textstyle` accepts a configuration object with the following properties:

| name        | type   | description                                                                                            |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------ |
| typeface    | string | Typeface id as defined in `typefaces` (see [below](#custom-configuration))                             |
| sizes       | array  | An array containing a scalar numeric value for the font size and its line-height                       |
| case        | string | Font case. Supported values are `"all-lowercase"`, `"all-caps"`, `"small-caps"` and `"all-small-caps"` |
| tracking    | number | Letter spacing multiplier                                                                              |
| breakpoints | object | Breakpoint modifiers settings. (see [below](#breakpoint-modifiers))                                    |

## Custom configuration

In _real_ projects you'd probably want to set your own configuration for `polyrhythm-typography`.

You can achieve that result by importing the `createTypography` factory function. This function accepts a configuration object and will return a custom `textstyle` function.

### Minimal configuration

First of all setup the project’s typefaces as an object where each key identifies the typeface and its value has the following properties:

- `family` {string[]} - Array of font family strings (required)
- `style` {string} - `font-style` value
- `weight` {string} - `font-weight` value

Example:

```js
const typefaces = {
  sans: {
    family: ['Helvetica Neue', 'Arial', 'sans-serif'],
    style: 'normal',
    weight: 400,
  },
  // ...,
}
```

Then define some CSS breakpoints. `polyrhythm-typography` comes with the following values:

```json
{
  "xs": 0,
  "sm": "36em", // 576px
  "md": "48em", // 768px
  "lg": "64em", // 1024px
  "xl": "80em" // 1280px
}
```

```js
import { createTypography } from 'polyrhythm-typography'

const breakpoints = {
  tablet: '36em',
}

const typefaces = {
  sans: {
    family: ['Helvetica Neue', 'Arial', 'sans-serif'],
    style: 'normal',
    weight: 400,
  },
  // ...,
}

const textstyle = createTypography({
  breakpoints,
  typefaces,
})

const styles = textstyle({
  //...configuration
})
```

### Setup size scales

The default values provided by the library should work pretty fine to enforce a consistent modular scale system across the project.

Anyway, you can can provide your own customized values in the module configuration:

```js
const fontSizes = new Map([
  [2, '2rem'],
  [1, '1.5rem'],
  [0, '1rem,'],
  [-1, '0.5rem'],
])

const lineHeights = new Map([
  [4, 2],
  [3, 1.75],
  [2, 1.5],
  [1, 1.25],
  [0, 1],
])

const textstyle = createTypography({
  fontSizes,
  lineHeights,
})

const styles = textstyles({
  sizes: [1, 3],
})

/*
styles = {
  fontSize: '1.5rem',
  lineHeight: '1.75rem',
}
*/
```

### Use a custom type scaler calculator

By default `polyrhythm-typography` uses an internal function (aka _type scaler_) that matches numeric size scales with the corresponding values on the `fontSizes` and `lineHeights` maps.

If you need more control over the calculation process, you can provide your custom type scaler function.

A type scaler function receives a list with two numeric values (font-size and line-height) and must return a list with valid CSS font-size and line-height (optional) values.

Here is an example:

```js
// utils.js

// input: (1, 3)
export function myScaler(input) {
  return input.map(n => `${n * 10}px`) // (10px, 30px)
}
```

To instruct `polyrhythm-typography` to use your custom type scaler pass it as the module configuration’s `typeScaler` option:

```js
import { myScaler } from './utils'
import { createTypography } from 'polyrhythm-typography'

const textstyle = createTypography({
  typeScaler: myScaler,
})
```

**Note**: `fontSizes` and `lineHeights` configuration options will not have any effect when using a custom type scaler function.

## Breakpoint modifiers

To override certain configuration values for a given breakpoint set the `breakpoints` property:

```js
const textstyleBody = {
  typeface: 'sans',
  sizes: [0, 3],
  tracking: 50,
  breakpoints: {
    md: {
      // change the font size at md
      sizes: [2, 3],
    },
  },
}
```
