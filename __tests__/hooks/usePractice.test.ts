import { renderHook, act } from '@testing-library/react'
import { usePractice } from '@/hooks/usePractice'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => { store[key] = val },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const STORAGE_KEY = 'architect-prep'

beforeEach(() => localStorageMock.clear())

// Question counts per domain: d1=8, d2=6, d3=7, d4=7, d5=7 — total 35

describe('usePractice — initial state', () => {
  it('starts with filter "all"', () => {
    const { result } = renderHook(() => usePractice())
    expect(result.current.filter).toBe('all')
  })

  it('loads all 35 questions when filter is "all"', () => {
    const { result } = renderHook(() => usePractice())
    expect(result.current.questions).toHaveLength(35)
  })

  it('starts with empty answers and zero counts', () => {
    const { result } = renderHook(() => usePractice())
    expect(result.current.answers).toEqual({})
    expect(result.current.answeredCount).toBe(0)
    expect(result.current.correctCount).toBe(0)
  })
})

describe('usePractice — handleFilterChange', () => {
  it('changes filter and loads only matching questions', () => {
    const { result } = renderHook(() => usePractice())

    act(() => { result.current.handleFilterChange('d1') })

    expect(result.current.filter).toBe('d1')
    expect(result.current.questions).toHaveLength(8)
    result.current.questions.forEach((q) => expect(q.domain).toBe('d1'))
  })

  it('resets answers when filter changes', () => {
    const { result } = renderHook(() => usePractice())

    act(() => { result.current.handleAnswer(result.current.questions[0].id, true) })
    expect(result.current.answeredCount).toBe(1)

    act(() => { result.current.handleFilterChange('d2') })

    expect(result.current.answers).toEqual({})
    expect(result.current.answeredCount).toBe(0)
    expect(result.current.correctCount).toBe(0)
  })

  it('switching back to "all" loads all 35 questions', () => {
    const { result } = renderHook(() => usePractice())

    act(() => { result.current.handleFilterChange('d3') })
    expect(result.current.questions).toHaveLength(7)

    act(() => { result.current.handleFilterChange('all') })
    expect(result.current.questions).toHaveLength(35)
  })
})

describe('usePractice — handleAnswer', () => {
  it('records a correct answer', () => {
    const { result } = renderHook(() => usePractice())

    act(() => { result.current.handleAnswer('d1-1', true) })

    expect(result.current.answers['d1-1']).toBe(true)
    expect(result.current.answeredCount).toBe(1)
    expect(result.current.correctCount).toBe(1)
  })

  it('records an incorrect answer', () => {
    const { result } = renderHook(() => usePractice())

    act(() => { result.current.handleAnswer('d1-2', false) })

    expect(result.current.answers['d1-2']).toBe(false)
    expect(result.current.answeredCount).toBe(1)
    expect(result.current.correctCount).toBe(0)
  })

  it('accumulates multiple answers correctly', () => {
    const { result } = renderHook(() => usePractice())

    act(() => {
      result.current.handleAnswer('d1-1', true)
      result.current.handleAnswer('d1-2', true)
      result.current.handleAnswer('d1-3', false)
    })

    expect(result.current.answeredCount).toBe(3)
    expect(result.current.correctCount).toBe(2)
  })
})

describe('usePractice — quiz result persistence', () => {
  it('saves quiz result once all domain questions are answered', () => {
    const { result } = renderHook(() => usePractice())

    act(() => { result.current.handleFilterChange('d2') })
    expect(result.current.questions).toHaveLength(6)

    // Answer 5 of 6 — should NOT save yet
    act(() => {
      result.current.questions.slice(0, 5).forEach((q) => {
        result.current.handleAnswer(q.id, true)
      })
    })

    let raw = localStorageMock.getItem(STORAGE_KEY)
    if (raw) {
      expect(JSON.parse(raw).progress?.d2?.quiz).toBeNull()
    }

    // Answer the last question
    act(() => { result.current.handleAnswer(result.current.questions[5].id, false) })

    raw = localStorageMock.getItem(STORAGE_KEY)
    expect(raw).not.toBeNull()
    const saved = JSON.parse(raw!)
    expect(saved.progress.d2.quiz).toEqual({ correct: 5, total: 6 })
  })

  it('quiz result reflects actual correct count', () => {
    const { result } = renderHook(() => usePractice())

    act(() => { result.current.handleFilterChange('d1') })

    act(() => {
      result.current.questions.forEach((q) => {
        result.current.handleAnswer(q.id, false)
      })
    })

    const saved = JSON.parse(localStorageMock.getItem(STORAGE_KEY)!)
    expect(saved.progress.d1.quiz).toEqual({ correct: 0, total: 8 })
  })
})
