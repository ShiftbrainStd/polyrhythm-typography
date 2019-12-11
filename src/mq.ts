import invariant from 'tiny-invariant'

import { Breakpoints } from '../types'

export const BREAKPOINTS: Breakpoints = {
  xs: 0,
  sm: '36em', // 576px
  md: '48em', // 768px
  lg: '64em', // 1024px
  xl: '80em', // 1280px
}

export function createMQ<B extends Breakpoints, K extends keyof B>(
  breakpoints = BREAKPOINTS as B
) {
  function get(mq: K): B[K] | never {
    const value = breakpoints[mq]
    invariant(value !== undefined, `Unable to find a media query named "${mq}"`)
    return value
  }

  function from(mq: K) {
    return `@media (min-width: ${get(mq)})`
  }

  function until(mq: K) {
    return `@media not all and (min-width: ${get(mq)})`
  }

  function mq<P extends { from?: K; until?: K }>(options: K | P) {
    const cfg = (typeof options === 'string' ? { from: options } : options) as P
    invariant(
      cfg.from || cfg.until,
      `At least one of "from" or "until" option must be defined`
    )
    const mq = cfg.from ? from(cfg.from) : until(cfg.until as K)
    return (props = {}) => ({ [mq]: props })
  }

  return {
    get,
    from,
    mq,
    until,
  }
}
