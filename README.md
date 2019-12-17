# polyrhythm-typography

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/devjam/polyrhythm-typography#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/devjam/polyrhythm-typography/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Polyrhythm Typography Module

A library to create and manage beautiful and consistent typographic rules for your project. Distributes as a Sass and JavaScript module

**This documentation refers to the Sass APIs. To use the library with JavaScript read the [documentation here](docs/javascript-api.md).**

<!-- TOC -->

- [Install](#install)
- [Usage](#usage)
  - [Pre-requisites](#pre-requisites)
  - [Setup](#setup)
  - [Using `textstyle`](#using-textstyle)
  - [Setup size scales](#setup-size-scales)
  - [Use a custom type scaler calculator](#use-a-custom-type-scaler-calculator)
  - [Breakpoint modifiers](#breakpoint-modifiers)
- [Run demo](#run-demo)
- [Run tests](#run-tests)
- [Author](#author)
- [🤝 Contributing](#🤝-contributing)
- [📝 License](#📝-license)

<!-- /TOC -->

## Install

```sh
npm install devjam/polyrhythm-typography#master
```

## Usage

### Pre-requisites

First of all setup the project’s typefaces as a map where each key identifies the typeface and its value has the following properties:

- `family` {list} - List of font family strings (required)
- `style` {string} - `font-style` value
- `weight` {string} - `font-weight` value

Example:

<!-- prettier-ignore-start -->
```scss
$typefaces: (
  "sans": (
    "family": ("Helvetica Neue", "Arial", sans-serif),
    "style": normal,
    "weight": 400,
  ),
  // ...,
);
```

<!-- prettier-ignore-end -->

Then define some CSS breakpoints. `polyrhythm-typography` comes with the following values:

<!-- prettier-ignore-start -->
```scss
$mq-breakpoints: (
  "xs": 0,
  "sm": 36em, // 576px
  "md": 48em, // 768px
  "lg": 64em, // 1024px
  "xl": 80em, // 1280px
);
```
<!-- prettier-ignore-end -->

### Setup

`polyrhythm-typography` uses [Sass modules](http://sass.logdown.com/posts/7858341-the-module-system-is-launched). To import and setup it use the following syntax:

```scss
@use 'polyrhythm-typography' as pt with (
  $typefaces: $typefaces,
  $mq-breakpoints: $mq-breakpoints
);

.component__title {
  @include pt.textstyle(/* configuration */);
}
```

### Using `textstyle`

The module exposes a `textstyle` mixin accepting a configuration map with the following properties:

| name        | type   | description                                                                                            |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------ |
| typeface    | string | Typeface id as defined in `$typefaces`                                                                 |
| sizes       | list   | A list containing a scalar value for the font size (`-2` to `4`) and its line-height (`0` to `4`)      |
| case        | string | Font case. Supported values are `"all-lowercase"`, `"all-caps"`, `"small-caps"` and `"all-small-caps"` |
| tracking    | number | Letter spacing multiplier                                                                              |
| breakpoints | map    | Breakpoint modifiers settings. (see below)                                                             |

**Example:**

<!-- prettier-ignore-start -->
```scss
$textstyle-body: (
  typeface: "sans",
  sizes: (0, 3),
  tracking: 50,
);

.component__body {
  @include pt.textstyle($textstyle-body);
}
```
<!-- prettier-ignore-end -->

### Setup size scales

The default values provided by the library should work pretty fine to enforce a consistent modular scale system across the project.

Anyway, you can can provide your own customized values in the module configuration:

<!-- prettier-ignore-start -->
```scss
$font-sizes: (
  2: 2rem,
  1: 1.5rem,
  0: 1rem,
  -1: 0.5rem,
);

/// Default line heights
/// @type Map
$line-heights: (
  4: 2,
  3: 1.75,
  2: 1.5,
  1: 1.25,
  0: 1,
);

@use "polyrhythm-typography" as pt with (
  // ...
  $font-sizes: $font-sizes,
  $line-heights: $line-heights,
);

$textstyle-body: (
  sizes: (1, 3)
);

.component__body {
  @include pt.textstyle($textstyle-body);

  /*
  outputs:

  font-size: 1.5rem;
  line-height: 1.75rem;

  */
}
```
<!-- prettier-ignore-end -->

### Use a custom type scaler calculator

By default `polyrhythm-typography` uses an internal function (aka _type scaler_) that matches numeric size scales with the corresponding values on the `$font-sizes` and `$line-heights` maps.

If you need more control over the calculation process, you can provide your custom type scaler function.

A type scaler function receives a list with two numeric values (font-size and line-height) and must return a list with valid CSS font-size and line-height (optional) values.

Here is an example:

```scss
// _helpers.scss
@use "sass:list";

// $input: (1, 3)
@function my-scaler($input) {
  $sizes: ();
  @each $i in $input {
    $sizes: list.append($sizes, $i * 10px);
  }
  @return $sizes; // (10px, 30px)
}
```

To instruct `polyrhythm-typography` to use your custom type scaler pass it as the module configuration’s `$type-scaler` option:

```scss
// main.scss
@use "sass:meta";
@use "helpers";

@use "polyrhythm-typography" as pt with (
  //... other configurations
  $type-scaler: meta.get-function("my-scaler", $module: "helpers")
);
```

**Note**: `$font-sizes` and `$line-heights` configuration options will not have any effect when using a custom type scaler function.

### Breakpoint modifiers

To override certain configuration values for a given breakpoint set the `breakpoints` property:

<!-- prettier-ignore-start -->
```scss
$textstyle-body: (
  typeface: "sans",
  sizes: (0, 3),
  tracking: 50,
  breakpoints: (
    md: (
      // change the font size at md
      sizes: (2, 3)
    ),
  )
);
```
<!-- prettier-ignore-end -->

## Run demo

```sh
npm start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Shiftbrain Inc. (https://www.shiftbrain.com/)**

- Twitter: [@shiftbrain](https://twitter.com/shiftbrain)
- Github: [@devjam](https://github.com/devjam)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/devjam/polyrhythm-typography/issues).

## 📝 License

Copyright © 2019 [Shiftbrain Inc. (https://www.shiftbrain.com/)](https://github.com/).

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
