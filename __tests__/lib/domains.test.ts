import { DOMAINS, getDomainBySlug, getDomainByKey } from '@/lib/domains'

describe('DOMAINS', () => {
  it('has exactly 5 entries', () => {
    expect(DOMAINS).toHaveLength(5)
  })

  it('each domain has required fields', () => {
    for (const domain of DOMAINS) {
      expect(domain.key).toMatch(/^d[1-5]$/)
      expect(typeof domain.slug).toBe('string')
      expect(typeof domain.number).toBe('string')
      expect(typeof domain.title).toBe('string')
      expect(typeof domain.weight).toBe('number')
      expect(Array.isArray(domain.subtopics)).toBe(true)
      expect(domain.subtopics.length).toBeGreaterThan(0)
      expect(typeof domain.questionCount).toBe('number')
    }
  })

  it('weights sum to 100', () => {
    const total = DOMAINS.reduce((sum, d) => sum + d.weight, 0)
    expect(total).toBe(100)
  })
})

describe('getDomainBySlug', () => {
  it('returns the correct domain for a known slug', () => {
    const domain = getDomainBySlug('prompt-engineering')
    expect(domain).toBeDefined()
    expect(domain!.key).toBe('d4')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getDomainBySlug('nonexistent')).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    expect(getDomainBySlug('')).toBeUndefined()
  })
})

describe('getDomainByKey', () => {
  it('returns the correct domain for a known key', () => {
    const domain = getDomainByKey('d1')
    expect(domain).toBeDefined()
    expect(domain!.slug).toBe('agentic-architecture')
  })

  it('returns undefined for an unknown key', () => {
    expect(getDomainByKey('d9' as never)).toBeUndefined()
  })
})
