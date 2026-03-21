// lib/progress.ts
import { DomainKey, DomainProgress, ProgressData } from '@/types'

const STORAGE_KEY = 'architect-prep'

const DEFAULT: ProgressData = {
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
  lastVisited: null,
}

function cloneDefault(): ProgressData {
  return JSON.parse(JSON.stringify(DEFAULT)) as ProgressData
}

export function getProgress(): ProgressData {
  if (typeof window === 'undefined') return cloneDefault()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : cloneDefault()
  } catch {
    return cloneDefault()
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function setSubtopicComplete(domain: DomainKey, index: number): void {
  const data = getProgress()
  data.progress[domain].subtopics[index] = true
  saveProgress(data)
}

export function setQuizResult(domain: DomainKey, correct: number, total: number): void {
  const data = getProgress()
  data.progress[domain].quiz = { correct, total }
  saveProgress(data)
}

export function setWeekComplete(week: string, complete: boolean): void {
  const data = getProgress()
  data.studyPlan[week] = complete
  saveProgress(data)
}

export function setLastVisited(path: string): void {
  const data = getProgress()
  data.lastVisited = path
  saveProgress(data)
}

export function getDomainCompletion(domain: DomainKey): number {
  const data = getProgress()
  const subtopics = data.progress[domain].subtopics
  return subtopics.filter(Boolean).length / subtopics.length
}
