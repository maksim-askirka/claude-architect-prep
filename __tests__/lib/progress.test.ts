// __tests__/lib/progress.test.ts
import {
  getProgress,
  saveProgress,
  resetProgress,
  setSubtopicComplete,
  setQuizResult,
  setWeekComplete,
  setLastVisited,
  getDomainCompletion,
} from '@/lib/progress'

import { localStorageMock } from '../helpers/mockLocalStorage'

beforeEach(() => localStorageMock.clear())

describe('getProgress', () => {
  it('returns default data when nothing stored', () => {
    const data = getProgress()
    expect(data.progress.d1.subtopics).toEqual([false, false, false, false])
    expect(data.progress.d2.subtopics).toEqual([false, false, false, false, false])
    expect(data.progress.d1.quiz).toBeNull()
    expect(data.studyPlan.week1).toBe(false)
    expect(data.lastVisited).toBeNull()
  })

  it('returns parsed data when stored', () => {
    const d = getProgress()
    d.lastVisited = '/domains/agentic-architecture'
    saveProgress(d)
    expect(getProgress().lastVisited).toBe('/domains/agentic-architecture')
  })
})

describe('setSubtopicComplete', () => {
  it('marks subtopic at index as true', () => {
    setSubtopicComplete('d1', 0)
    expect(getProgress().progress.d1.subtopics[0]).toBe(true)
    expect(getProgress().progress.d1.subtopics[1]).toBe(false)
  })

  it('does not affect other domains', () => {
    setSubtopicComplete('d1', 0)
    expect(getProgress().progress.d2.subtopics[0]).toBe(false)
  })
})

describe('setQuizResult', () => {
  it('stores correct and total for a domain', () => {
    setQuizResult('d3', 4, 5)
    expect(getProgress().progress.d3.quiz).toEqual({ correct: 4, total: 5 })
  })

  it('overwrites previous result', () => {
    setQuizResult('d3', 3, 5)
    setQuizResult('d3', 5, 5)
    expect(getProgress().progress.d3.quiz).toEqual({ correct: 5, total: 5 })
  })
})

describe('setWeekComplete', () => {
  it('marks a week complete', () => {
    setWeekComplete('week3', true)
    expect(getProgress().studyPlan.week3).toBe(true)
  })

  it('can unmark a week', () => {
    setWeekComplete('week3', true)
    setWeekComplete('week3', false)
    expect(getProgress().studyPlan.week3).toBe(false)
  })
})

describe('setLastVisited', () => {
  it('stores the path', () => {
    setLastVisited('/practice')
    expect(getProgress().lastVisited).toBe('/practice')
  })
})

describe('getDomainCompletion', () => {
  it('returns 0 when no subtopics complete', () => {
    expect(getDomainCompletion('d1')).toBe(0)
  })

  it('returns 0.5 when half complete (d1 has 4)', () => {
    setSubtopicComplete('d1', 0)
    setSubtopicComplete('d1', 1)
    expect(getDomainCompletion('d1')).toBe(0.5)
  })

  it('returns 1 when all complete', () => {
    ;[0, 1, 2, 3].forEach((i) => setSubtopicComplete('d1', i))
    expect(getDomainCompletion('d1')).toBe(1)
  })
})

describe('resetProgress', () => {
  it('clears all stored progress back to defaults', () => {
    setSubtopicComplete('d1', 0)
    setQuizResult('d2', 3, 4)
    setWeekComplete('week5', true)
    resetProgress()
    const data = getProgress()
    expect(data.progress.d1.subtopics[0]).toBe(false)
    expect(data.progress.d2.quiz).toBeNull()
    expect(data.studyPlan.week5).toBe(false)
    expect(data.lastVisited).toBeNull()
  })
})
