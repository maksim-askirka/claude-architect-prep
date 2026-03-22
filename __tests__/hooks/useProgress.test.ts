import { renderHook, act, waitFor } from '@testing-library/react'
import { useProgress } from '@/hooks/useProgress'

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

describe('useProgress — initial state', () => {
  it('returns default ProgressData when localStorage is empty', async () => {
    const { result } = renderHook(() => useProgress())

    await waitFor(() => {
      expect(result.current.data.progress.d1.subtopics).toEqual([false, false, false, false])
    })

    expect(result.current.data.progress.d1.quiz).toBeNull()
    expect(result.current.data.studyPlan.week1).toBe(false)
    expect(result.current.data.lastVisited).toBeNull()
  })

  it('all 5 domains present in progress', async () => {
    const { result } = renderHook(() => useProgress())

    await waitFor(() => {
      expect(Object.keys(result.current.data.progress)).toHaveLength(5)
    })
  })

  it('studyPlan defaults to 12 weeks all false', async () => {
    const { result } = renderHook(() => useProgress())

    await waitFor(() => {
      expect(Object.keys(result.current.data.studyPlan)).toHaveLength(12)
    })

    Object.values(result.current.data.studyPlan).forEach((v) => {
      expect(v).toBe(false)
    })
  })
})

describe('useProgress — hydration from localStorage', () => {
  it('reads existing localStorage data on mount', async () => {
    const stored = {
      progress: {
        d1: { subtopics: [true, false, false, false], quiz: null },
        d2: { subtopics: [false, false, false, false, false], quiz: null },
        d3: { subtopics: [false, false, false, false], quiz: null },
        d4: { subtopics: [false, false, false, false], quiz: null },
        d5: { subtopics: [false, false, false, false], quiz: null },
      },
      studyPlan: Object.fromEntries(
        Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false])
      ),
      lastVisited: '/domains/agentic-architecture',
    }
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(stored))

    const { result } = renderHook(() => useProgress())

    await waitFor(() => {
      expect(result.current.data.lastVisited).toBe('/domains/agentic-architecture')
    })

    expect(result.current.data.progress.d1.subtopics[0]).toBe(true)
    expect(result.current.data.progress.d1.subtopics[1]).toBe(false)
  })

  it('reads quiz results from localStorage', async () => {
    const stored = {
      progress: {
        d1: { subtopics: [false, false, false, false], quiz: null },
        d2: { subtopics: [false, false, false, false, false], quiz: { correct: 4, total: 6 } },
        d3: { subtopics: [false, false, false, false], quiz: null },
        d4: { subtopics: [false, false, false, false], quiz: null },
        d5: { subtopics: [false, false, false, false], quiz: null },
      },
      studyPlan: Object.fromEntries(
        Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false])
      ),
      lastVisited: null,
    }
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(stored))

    const { result } = renderHook(() => useProgress())

    await waitFor(() => {
      expect(result.current.data.progress.d2.quiz).toEqual({ correct: 4, total: 6 })
    })
  })
})

describe('useProgress — reset', () => {
  it('clears localStorage and returns state to defaults', async () => {
    const stored = {
      progress: {
        d1: { subtopics: [true, true, false, false], quiz: null },
        d2: { subtopics: [false, false, false, false, false], quiz: null },
        d3: { subtopics: [false, false, false, false], quiz: null },
        d4: { subtopics: [false, false, false, false], quiz: null },
        d5: { subtopics: [false, false, false, false], quiz: null },
      },
      studyPlan: {
        ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false])),
        week3: true,
      },
      lastVisited: '/practice',
    }
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(stored))

    const { result } = renderHook(() => useProgress())

    await waitFor(() => {
      expect(result.current.data.progress.d1.subtopics[0]).toBe(true)
    })

    act(() => {
      result.current.reset()
    })

    await waitFor(() => {
      expect(result.current.data.progress.d1.subtopics[0]).toBe(false)
    })

    expect(result.current.data.studyPlan.week3).toBe(false)
    expect(result.current.data.lastVisited).toBeNull()
    expect(localStorageMock.getItem(STORAGE_KEY)).toBeNull()
  })
})

describe('useProgress — reload', () => {
  it('re-reads localStorage after external write', async () => {
    const { result } = renderHook(() => useProgress())

    await waitFor(() => {
      expect(result.current.data.lastVisited).toBeNull()
    })

    const updated = {
      progress: {
        d1: { subtopics: [false, false, false, false], quiz: null },
        d2: { subtopics: [false, false, false, false, false], quiz: null },
        d3: { subtopics: [false, false, false, false], quiz: null },
        d4: { subtopics: [false, false, false, false], quiz: null },
        d5: { subtopics: [false, false, false, false], quiz: null },
      },
      studyPlan: Object.fromEntries(
        Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false])
      ),
      lastVisited: '/cheatsheet',
    }
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(updated))

    act(() => {
      result.current.reload()
    })

    await waitFor(() => {
      expect(result.current.data.lastVisited).toBe('/cheatsheet')
    })
  })
})
