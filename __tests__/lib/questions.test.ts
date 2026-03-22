import { QUESTIONS, getQuestionsByDomain } from '@/lib/questions'
import type { DomainKey } from '@/types'

describe('QUESTIONS', () => {
  it('is non-empty', () => {
    expect(QUESTIONS.length).toBeGreaterThan(0)
  })

  it('each question has required fields', () => {
    for (const q of QUESTIONS) {
      expect(typeof q.id).toBe('string')
      expect(q.domain).toMatch(/^d[1-5]$/)
      expect(typeof q.question).toBe('string')
      expect(Array.isArray(q.options)).toBe(true)
      expect(q.options.length).toBeGreaterThan(1)
      expect(typeof q.correct).toBe('number')
      expect(q.correct).toBeGreaterThanOrEqual(0)
      expect(q.correct).toBeLessThan(q.options.length)
      expect(typeof q.explanation).toBe('string')
    }
  })

  it('has questions for all 5 domains', () => {
    const keys: DomainKey[] = ['d1', 'd2', 'd3', 'd4', 'd5']
    for (const key of keys) {
      expect(QUESTIONS.some(q => q.domain === key)).toBe(true)
    }
  })
})

describe('getQuestionsByDomain', () => {
  it('returns only questions matching the domain', () => {
    const result = getQuestionsByDomain('d1')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every(q => q.domain === 'd1')).toBe(true)
  })

  it('returns all questions when passed "all"', () => {
    const result = getQuestionsByDomain('all')
    expect(result).toHaveLength(QUESTIONS.length)
  })

  it('returns empty array for unknown domain key', () => {
    const result = getQuestionsByDomain('d9' as never)
    expect(result).toHaveLength(0)
  })
})
