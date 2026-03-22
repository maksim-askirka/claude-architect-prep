import { renderHook, act, waitFor } from '@testing-library/react'
import { useStudyPlan } from '@/hooks/useStudyPlan'

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

describe('useStudyPlan — initial state', () => {
  it('hydrates to all-false from empty localStorage', async () => {
    const { result } = renderHook(() => useStudyPlan())

    await waitFor(() => {
      expect(Object.keys(result.current.completedWeeks)).toHaveLength(12)
    })

    Object.values(result.current.completedWeeks).forEach((v) => {
      expect(v).toBe(false)
    })
  })

  it('hydrates completed weeks from existing localStorage', async () => {
    const stored = {
      progress: {
        d1: { subtopics: [false, false, false, false], quiz: null },
        d2: { subtopics: [false, false, false, false, false], quiz: null },
        d3: { subtopics: [false, false, false, false], quiz: null },
        d4: { subtopics: [false, false, false, false], quiz: null },
        d5: { subtopics: [false, false, false, false], quiz: null },
      },
      studyPlan: {
        ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false])),
        week4: true,
        week7: true,
      },
      lastVisited: null,
    }
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(stored))

    const { result } = renderHook(() => useStudyPlan())

    await waitFor(() => {
      expect(result.current.completedWeeks.week4).toBe(true)
    })

    expect(result.current.completedWeeks.week7).toBe(true)
    expect(result.current.completedWeeks.week1).toBe(false)
  })
})

describe('useStudyPlan — toggleWeek', () => {
  it('marks a week complete when called with true', async () => {
    const { result } = renderHook(() => useStudyPlan())

    await waitFor(() => {
      expect(Object.keys(result.current.completedWeeks)).toHaveLength(12)
    })

    act(() => { result.current.toggleWeek('week5', true) })

    expect(result.current.completedWeeks.week5).toBe(true)
  })

  it('marks a week incomplete when called with false', async () => {
    const { result } = renderHook(() => useStudyPlan())

    await waitFor(() => {
      expect(Object.keys(result.current.completedWeeks)).toHaveLength(12)
    })

    act(() => { result.current.toggleWeek('week5', true) })
    expect(result.current.completedWeeks.week5).toBe(true)

    act(() => { result.current.toggleWeek('week5', false) })
    expect(result.current.completedWeeks.week5).toBe(false)
  })

  it('does not affect other weeks', async () => {
    const { result } = renderHook(() => useStudyPlan())

    await waitFor(() => {
      expect(Object.keys(result.current.completedWeeks)).toHaveLength(12)
    })

    act(() => { result.current.toggleWeek('week2', true) })

    expect(result.current.completedWeeks.week2).toBe(true)
    expect(result.current.completedWeeks.week1).toBe(false)
    expect(result.current.completedWeeks.week3).toBe(false)
  })

  it('persists the toggled value to localStorage', async () => {
    const { result } = renderHook(() => useStudyPlan())

    await waitFor(() => {
      expect(Object.keys(result.current.completedWeeks)).toHaveLength(12)
    })

    act(() => { result.current.toggleWeek('week6', true) })

    const raw = localStorageMock.getItem(STORAGE_KEY)
    expect(raw).not.toBeNull()
    const saved = JSON.parse(raw!)
    expect(saved.studyPlan.week6).toBe(true)
  })

  it('persists false back to localStorage', async () => {
    const stored = {
      progress: {
        d1: { subtopics: [false, false, false, false], quiz: null },
        d2: { subtopics: [false, false, false, false, false], quiz: null },
        d3: { subtopics: [false, false, false, false], quiz: null },
        d4: { subtopics: [false, false, false, false], quiz: null },
        d5: { subtopics: [false, false, false, false], quiz: null },
      },
      studyPlan: {
        ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false])),
        week8: true,
      },
      lastVisited: null,
    }
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(stored))

    const { result } = renderHook(() => useStudyPlan())

    await waitFor(() => {
      expect(result.current.completedWeeks.week8).toBe(true)
    })

    act(() => { result.current.toggleWeek('week8', false) })

    const saved = JSON.parse(localStorageMock.getItem(STORAGE_KEY)!)
    expect(saved.studyPlan.week8).toBe(false)
  })
})
