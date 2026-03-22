import { SCENARIOS } from '@/lib/scenarios'

describe('SCENARIOS', () => {
  it('has exactly 6 entries', () => {
    expect(SCENARIOS).toHaveLength(6)
  })

  it('each scenario has required fields', () => {
    for (const scenario of SCENARIOS) {
      expect(typeof scenario.id).toBe('string')
      expect(typeof scenario.number).toBe('number')
      expect(typeof scenario.title).toBe('string')
      expect(typeof scenario.domain).toBe('string')
      expect(typeof scenario.problem).toBe('string')
      expect(Array.isArray(scenario.steps)).toBe(true)
      expect(scenario.steps.length).toBeGreaterThan(0)
      expect(Array.isArray(scenario.examTips)).toBe(true)
    }
  })

  it('each step has stepNumber, title, and detail', () => {
    for (const scenario of SCENARIOS) {
      for (const step of scenario.steps) {
        expect(typeof step.stepNumber).toBe('string')
        expect(typeof step.title).toBe('string')
        expect(typeof step.detail).toBe('string')
      }
    }
  })

  it('scenario numbers are sequential', () => {
    SCENARIOS.forEach((scenario, i) => {
      expect(scenario.number).toBe(i + 1)
    })
  })
})
