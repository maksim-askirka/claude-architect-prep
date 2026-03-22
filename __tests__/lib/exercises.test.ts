import { EXERCISES } from '@/lib/exercises'

describe('EXERCISES', () => {
  it('has exactly 4 entries', () => {
    expect(EXERCISES).toHaveLength(4)
  })

  it('each exercise has required fields', () => {
    for (const exercise of EXERCISES) {
      expect(typeof exercise.id).toBe('string')
      expect(typeof exercise.number).toBe('number')
      expect(typeof exercise.title).toBe('string')
      expect(typeof exercise.goal).toBe('string')
      expect(typeof exercise.domain).toBe('string')
      expect(typeof exercise.estimatedTime).toBe('string')
      expect(typeof exercise.starter).toBe('string')
      expect(Array.isArray(exercise.criteria)).toBe(true)
      expect(exercise.criteria.length).toBeGreaterThan(0)
    }
  })

  it('exercise numbers are sequential', () => {
    EXERCISES.forEach((exercise, i) => {
      expect(exercise.number).toBe(i + 1)
    })
  })
})
