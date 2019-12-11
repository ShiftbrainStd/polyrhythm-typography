const TYPE_CASE_MATRIX: Record<string, string> = {
  'all-lowercase': 'lowercase',
  'all-caps': 'uppercase',
  'small-caps': 'uppercase',
  'all-small-caps': 'uppercase',
}

export function textTransform(value: string) {
  const ret = {} as any
  ret.textTransform = TYPE_CASE_MATRIX[value] || value

  if (value === 'small-caps' || value === 'all-small-caps') {
    ret['@supports (font-variant-caps: "small-caps")'] = {
      fontVariantCaps: 'small-caps',
      textTransform: value === 'small-caps' ? 'none' : 'lowercase',
    }
  }
  return ret
}
