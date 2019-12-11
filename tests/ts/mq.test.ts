import { createMQ, BREAKPOINTS } from '../../src/mq'

const mq = createMQ()

describe('mq module', () => {
  describe('mq.get', () => {
    test('should fail for undefined media queries', () => {
      expect(() => {
        mq.get('undefined')
      }).toThrow()

      expect(mq.get('md')).toBe(BREAKPOINTS.md)
    })
  })

  describe('mq.from', () => {
    test('outputs a min-width query', () => {
      const query = mq.from('md')
      const expected = `@media (min-width: ${BREAKPOINTS.md})`
      expect(query).toBe(expected)
    })
  })

  describe('mq.until', () => {
    test('outputs a negative min-width query', () => {
      const query = mq.until('md')
      const expected = `@media not all and (min-width: ${BREAKPOINTS.md})`
      expect(query).toBe(expected)
    })
  })

  describe('mq.mq', () => {
    test('outputs a min-width query styles block (string param)', () => {
      const md = mq.mq('md')
      const style = {
        fontSize: 10,
      }
      const expected = {
        [`@media (min-width: ${BREAKPOINTS.md})`]: style,
      }
      expect(md(style)).toEqual(expected)
    })

    test('outputs a min-width query styles block (from object param)', () => {
      const md = mq.mq({ from: 'md' })
      const style = {
        fontSize: 10,
      }
      const expected = {
        [`@media (min-width: ${BREAKPOINTS.md})`]: style,
      }
      expect(md(style)).toEqual(expected)
    })

    test('outputs a negative min-width query styles block (until object param)', () => {
      const md = mq.mq({ until: 'md' })
      const style = {
        fontSize: 10,
      }
      const expected = {
        [`@media not all and (min-width: ${BREAKPOINTS.md})`]: style,
      }
      expect(md(style)).toEqual(expected)
    })
  })

  test('media queries', () => {
    const MY_MQS = {
      tablet: '48rem',
    }
    const customMq = createMQ(MY_MQS)

    expect(customMq.get('tablet')).toBe(MY_MQS.tablet)
  })
})
