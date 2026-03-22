import { pad2, isExternal } from '@/lib/utils'

describe('pad2', () => {
  it('pads single-digit numbers with a leading zero', () => {
    expect(pad2(5)).toBe('05')
    expect(pad2(0)).toBe('00')
    expect(pad2(9)).toBe('09')
  })

  it('does not pad two-digit numbers', () => {
    expect(pad2(10)).toBe('10')
    expect(pad2(99)).toBe('99')
  })
})

describe('isExternal', () => {
  it('returns true for https URLs', () => {
    expect(isExternal('https://example.com')).toBe(true)
  })

  it('returns true for http URLs', () => {
    expect(isExternal('http://example.com')).toBe(true)
  })

  it('returns false for relative paths', () => {
    expect(isExternal('/relative/path')).toBe(false)
    expect(isExternal('relative/path')).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(isExternal('')).toBe(false)
  })
})
