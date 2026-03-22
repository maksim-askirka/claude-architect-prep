import { STUDY_PLAN, TOTAL_HOURS } from '@/lib/study-plan'

describe('STUDY_PLAN', () => {
  it('has exactly 12 weeks', () => {
    expect(STUDY_PLAN).toHaveLength(12)
  })

  it('each week has required fields', () => {
    for (const week of STUDY_PLAN) {
      expect(typeof week.key).toBe('string')
      expect(typeof week.title).toBe('string')
      expect(typeof week.hours).toBe('number')
      expect(week.hours).toBeGreaterThan(0)
      expect(Array.isArray(week.tasks)).toBe(true)
      expect(week.tasks.length).toBeGreaterThan(0)
      expect(Array.isArray(week.resources)).toBe(true)
    }
  })

  it('each resource has label and href', () => {
    for (const week of STUDY_PLAN) {
      for (const resource of week.resources) {
        expect(typeof resource.label).toBe('string')
        expect(typeof resource.href).toBe('string')
      }
    }
  })

  it('week keys are unique', () => {
    const keys = STUDY_PLAN.map(w => w.key)
    expect(new Set(keys).size).toBe(STUDY_PLAN.length)
  })
})

describe('TOTAL_HOURS', () => {
  it('is a positive number', () => {
    expect(typeof TOTAL_HOURS).toBe('number')
    expect(TOTAL_HOURS).toBeGreaterThan(0)
  })

  it('equals the sum of all week hours', () => {
    const sum = STUDY_PLAN.reduce((acc, w) => acc + w.hours, 0)
    expect(TOTAL_HOURS).toBe(sum)
  })
})
